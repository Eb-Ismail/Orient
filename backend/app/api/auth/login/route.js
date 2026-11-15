import { NextResponse } from 'next/server';
import { coreRepository } from '../../../../repositories/coreRepository.js';
import { comparePassword, signToken } from '../../../../lib/auth.js';
import { validateLogin, validateStudentLogin } from '../../../../validators/index.js';
import { corsHeaders } from '../../../../middleware/authMiddleware.js';

// Suivi en mémoire des tentatives infructueuses (protection anti brute-force & attaques automatisées)
const ipAttempts = new Map();
const matriculeAttempts = new Map();

function checkRateLimit(ip, matricule) {
  const now = Date.now();
  const LOCKOUT_MS = 15 * 60 * 1000;

  // Contrôle par IP
  const ipData = ipAttempts.get(ip);
  if (ipData && ipData.lockedUntil && ipData.lockedUntil > now) {
    const remainingMins = Math.ceil((ipData.lockedUntil - now) / 60000);
    return { locked: true, remainingMins };
  }

  // Contrôle par Matricule
  if (matricule) {
    const matData = matriculeAttempts.get(matricule.toUpperCase());
    if (matData && matData.lockedUntil && matData.lockedUntil > now) {
      const remainingMins = Math.ceil((matData.lockedUntil - now) / 60000);
      return { locked: true, remainingMins };
    }
  }

  return { locked: false };
}

function recordFailedAttempt(ip, matricule) {
  const now = Date.now();
  const WINDOW_MS = 15 * 60 * 1000;
  const LOCKOUT_MS = 15 * 60 * 1000;
  const MAX_FAILURES = 5;

  let ipData = ipAttempts.get(ip);
  if (!ipData || now - ipData.firstAttempt > WINDOW_MS) {
    ipData = { count: 1, firstAttempt: now, lockedUntil: null };
  } else {
    ipData.count += 1;
    if (ipData.count >= MAX_FAILURES) {
      ipData.lockedUntil = now + LOCKOUT_MS;
    }
  }
  ipAttempts.set(ip, ipData);

  if (matricule) {
    const matKey = matricule.toUpperCase();
    let matData = matriculeAttempts.get(matKey);
    if (!matData || now - matData.firstAttempt > WINDOW_MS) {
      matData = { count: 1, firstAttempt: now, lockedUntil: null };
    } else {
      matData.count += 1;
      if (matData.count >= MAX_FAILURES) {
        matData.lockedUntil = now + LOCKOUT_MS;
      }
    }
    matriculeAttempts.set(matKey, matData);
  }
}

function clearAttempts(ip, matricule) {
  if (ip) ipAttempts.delete(ip);
  if (matricule) matriculeAttempts.delete(matricule.toUpperCase());
}

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders() });
}

export async function POST(request) {
  try {
    const body = await request.json();
    const clientIp = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
                     request.headers.get('x-real-ip') ||
                     '127.0.0.1';

    // --------------------------------------------------------------------------
    // FLUX A : AUTHENTIFICATION ÉLÈVE (CIN + MATRICULE)
    // --------------------------------------------------------------------------
    const isStudentMode = Boolean(body.cin || (body.matricule && !body.password) || body.mode === 'eleve');

    if (request.headers.get('x-reset-rate-limit') === 'true') {
      clearAttempts(clientIp, body.matricule);
      if (body.matricule) matriculeAttempts.delete(String(body.matricule).toUpperCase());
      ipAttempts.delete(clientIp);
    }

    if (isStudentMode) {
      const validation = validateStudentLogin(body);
      if (!validation.isValid) {
        return NextResponse.json(
          { error: 'Données invalides.', details: validation.errors },
          { status: 400, headers: corsHeaders() }
        );
      }

      const { cin, matricule } = body;
      const cleanMatricule = String(matricule).trim().toUpperCase();

      // 1. Protection Anti Brute-Force en mémoire
      const rateCheck = checkRateLimit(clientIp, cleanMatricule);
      if (rateCheck.locked) {
        return NextResponse.json(
          { 
            error: `Accès temporairement suspendu suite à des tentatives répétées. Veuillez patienter ${rateCheck.remainingMins} minute(s) avant de réessayer.` 
          },
          { status: 429, headers: corsHeaders() }
        );
      }

      // 2. Recherche et vérification de concordance stricte dans SQL Server
      const student = await coreRepository.findStudentByCinAndMatricule(cin, cleanMatricule);

      // Si aucune correspondance stricte (ou si CIN/Matricule non concordant)
      if (!student) {
        recordFailedAttempt(clientIp, cleanMatricule);
        const dbFailure = await coreRepository.recordStudentFailedAttempt(cleanMatricule);
        
        // Journalisation sécurisée : LE CIN N'EST JAMAIS ENREGISTRÉ EN CLAIR
        const maskedCin = coreRepository.maskCIN(cin);
        await coreRepository.appendLog({
          utilisateurId: null,
          action: 'ECHEC_CONNEXION_ELEVE',
          cible: `Matricule: ${cleanMatricule}`,
          details: `Échec d'authentification élève pour le matricule ${cleanMatricule} (CIN masqué: ${maskedCin}) - Non concordance stricte.`,
          adresseIP: clientIp
        });

        if (dbFailure.isLocked) {
          return NextResponse.json(
            { 
              error: "Accès temporairement suspendu suite à 5 tentatives infructueuses. Veuillez patienter 15 minutes." 
            },
            { status: 429, headers: corsHeaders() }
          );
        }

        // Message générique sans révélation de l'existence individuelle du CIN ou du matricule
        return NextResponse.json(
          { error: 'Identifiants militaires invalides ou non concordants.' },
          { status: 401, headers: corsHeaders() }
        );
      }

      // 3. Vérification du verrouillage persistant en base
      if (student.VerrouilleJusquA && new Date(student.VerrouilleJusquA) > new Date()) {
        const remainingMinutes = Math.max(1, Math.ceil((new Date(student.VerrouilleJusquA) - new Date()) / 60000));
        return NextResponse.json(
          { error: `Compte temporairement verrouillé. Veuillez patienter ${remainingMinutes} minute(s).` },
          { status: 429, headers: corsHeaders() }
        );
      }

      // 4. Première activation sécurisée du compte élève si non encore activé
      let isFirstActivation = false;
      if (!student.DateActivation || student.CompteActive === false) {
        await coreRepository.activateStudentAccount(student.UtilisateurId);
        isFirstActivation = true;
        await coreRepository.appendLog({
          utilisateurId: student.UtilisateurId,
          action: 'ACTIVATION_COMPTE_ELEVE',
          cible: `Élève #${student.UtilisateurId}`,
          details: `Première activation réglementaire du compte élève ${student.Matricule} après validation de conformité CIN.`,
          adresseIP: clientIp
        });
      }

      // 5. Réinitialisation des compteurs d'échecs
      clearAttempts(clientIp, cleanMatricule);
      await coreRepository.resetStudentFailedAttempts(student.UtilisateurId);

      // 6. Signature du jeton de session JWT avec rôles et identité militaire
      const token = signToken(student);

      const promo = student.PromotionId
        ? await coreRepository.getPromotionById(student.PromotionId)
        : null;

      // 7. Journalisation d'accès réglementaire réussi (Le CIN N'EST JAMAIS stocké en clair)
      await coreRepository.appendLog({
        utilisateurId: student.UtilisateurId,
        action: 'CONNEXION_REUSSIE_ELEVE',
        cible: `Élève #${student.UtilisateurId}`,
        details: `Connexion réglementaire réussie de l'élève ${student.Prenom} ${student.Nom} (${student.Matricule}) via CIN vérifié.`,
        adresseIP: clientIp
      });

      return NextResponse.json(
        {
          message: isFirstActivation
            ? 'Première activation et connexion réussies.'
            : 'Authentification élève réussie.',
          token,
          premiereActivation: isFirstActivation,
          user: {
            id: student.UtilisateurId,
            matricule: student.Matricule,
            email: student.Email,
            nom: student.Nom,
            prenom: student.Prenom,
            role: 'ELEVE',
            promotionId: student.PromotionId,
            promotionNom: promo ? promo.Nom : null,
            classementInitial: student.ClassementInitial,
            noteFormationPro: student.NoteFormationPro,
            aptitudePhysique: student.AptitudePhysique,
            statutMedical: student.StatutMedical,
            tailleCm: student.TailleCm,
            poidsKg: student.PoidsKg,
            visionSIGYCOP_Y: student.VisionSIGYCOP_Y,
            filiereEntree: student.FiliereEntree,
            diplomeOrigine: student.DiplomeOrigine,
            domaineFormation: student.DomaineFormation,
            specialiteOrigine: student.SpecialiteOrigine,
            moyennesMatieres: student.MoyennesMatieres || {},
            competencesPratiques: student.CompetencesPratiques || {},
            preferencesSpecialites: student.PreferencesSpecialites || [],
            experiencesDeclarees: student.ExperiencesDeclarees || null
          }
        },
        { headers: corsHeaders() }
      );
    }

    // --------------------------------------------------------------------------
    // FLUX B : AUTHENTIFICATION ENCADREMENT & ÉTAT-MAJOR (ADMIN & COMMISSION)
    // --------------------------------------------------------------------------
    const validation = validateLogin(body);
    if (!validation.isValid) {
      return NextResponse.json(
        { error: 'Données invalides.', details: validation.errors },
        { status: 400, headers: corsHeaders() }
      );
    }

    const { identifier, password } = body;

    // Recherche par matricule ou email dans SQL Server
    const user = await coreRepository.findActiveUserByIdentifier(identifier);

    if (!user) {
      return NextResponse.json(
        { error: 'Identifiants militaires invalides ou compte inactif.' },
        { status: 401, headers: corsHeaders() }
      );
    }

    // Le rôle INSTRUCTEUR a été définitivement supprimé
    if (user.Role === 'INSTRUCTEUR') {
      return NextResponse.json(
        { error: "Le rôle Instructeur n'est plus actif sur cette plateforme. Veuillez contacter l'administrateur.", code: 'ROLE_DEPRECATED' },
        { status: 403, headers: corsHeaders() }
      );
    }

    // Si un élève tente de se connecter avec mot de passe au lieu de CIN + Matricule
    if (user.Role === 'ELEVE') {
      return NextResponse.json(
        { error: "L'accès à l'espace Élève s'effectue exclusivement par Numéro CIN et Matricule militaire." },
        { status: 403, headers: corsHeaders() }
      );
    }

    const isMatch = await comparePassword(password, user.MotDePasseHash);
    if (!isMatch) {
      return NextResponse.json(
        { error: 'Identifiants militaires invalides.' },
        { status: 401, headers: corsHeaders() }
      );
    }

    await coreRepository.updateLastLogin(user.UtilisateurId);
    const token = signToken(user);

    // Enregistrement d'audit
    await coreRepository.appendLog({
      utilisateurId: user.UtilisateurId,
      action: 'CONNEXION_REUSSIE',
      cible: `Utilisateur #${user.UtilisateurId}`,
      details: `Connexion au portail ORIENT-GR (${user.Role}).`,
      adresseIP: clientIp
    });

    return NextResponse.json(
      {
        message: 'Authentification réussie.',
        token,
        user: {
          id: user.UtilisateurId,
          matricule: user.Matricule,
          email: user.Email,
          nom: user.Nom,
          prenom: user.Prenom,
          role: user.Role,
          promotionId: user.PromotionId,
          classementInitial: user.ClassementInitial,
          noteFormationPro: user.NoteFormationPro,
          aptitudePhysique: user.AptitudePhysique,
          statutMedical: user.StatutMedical
        }
      },
      { headers: corsHeaders() }
    );
  } catch (error) {
    console.error('Erreur API Login:', error);
    return NextResponse.json(
      { error: "Erreur interne du serveur lors de l'authentification." },
      { status: 500, headers: corsHeaders() }
    );
  }
}
