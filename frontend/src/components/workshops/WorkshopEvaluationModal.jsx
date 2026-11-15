import React from 'react';
import {
  Award,
  CheckCircle2,
  Clock,
  HardHat,
  FileText,
  Calendar,
  Sparkles,
  Paperclip,
  ShieldCheck,
  ShieldAlert,
  Printer,
  X,
  Compass,
  Star,
  UserCheck
} from 'lucide-react';
import Modal from '../common/Modal.jsx';

// Dictionnaire des spécialités pour affichage humain et valorisant
const SPECIALTY_NAMES = {
  'SPEC-INFO': "Systèmes d'Information & Cybersécurité",
  'SPEC-SEC-INFO': "Sécurité des Systèmes d'Information & Réseaux",
  'SPEC-PJ': "Police Judiciaire & Enquêtes Criminelles",
  'SPEC-MOTARD': "Sécurité Routière & Escadron Motocycliste",
  'SPEC-PSIG': "Peloton de Surveillance et d'Intervention (PSIG)",
  'SPEC-GM': "Maintien de l'Ordre & Gendarmerie Mobile",
  'SPEC-GSI': "Groupe de Sécurité et d'Intervention",
  'SPEC-SEC-ADMIN': "Ressources Humaines & Administration Militaire",
  'SPEC-GEH': "Section Aérienne & Logistique Spécialisée"
};

export default function WorkshopEvaluationModal({
  isOpen,
  onClose,
  assignment
}) {
  if (!isOpen || !assignment) return null;

  const w = assignment.Atelier || {};
  const isRejected = assignment.Statut === 'REJETE' || assignment.ArretSecurite;
  const isNeedsReassessment = assignment.Statut === 'A_REEVALUER' || isRejected;
  const isValidated = assignment.Statut === 'VALIDE' || assignment.Statut === 'EVALUE';
  const isPending = assignment.Statut === 'EN_ATTENTE_VALIDATION';

  const specialtyName = SPECIALTY_NAMES[assignment.RecommandationSpecialite] || assignment.RecommandationSpecialite;

  const getMentionBadge = (mention) => {
    switch (mention) {
      case 'EXCELLENT':
        return { label: 'Excellence Opérationnelle (Mention Très Bien)', stars: 5, color: 'text-gold-light' };
      case 'TRES_BON':
        return { label: 'Très Bon Niveau Technique (Mention Bien)', stars: 4, color: 'text-emerald-300' };
      default:
        return { label: 'Niveau Conforme et Satisfaisant (Mention Assez Bien)', stars: 3, color: 'text-slate-200' };
    }
  };

  const mentionInfo = getMentionBadge(assignment.Mention);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={isValidated ? `Mon Résultat — ${w.Titre || "Atelier Pratique"}` : "Fiche d'Atelier Pratique"}
      subtitle="Fiche certifiée d'aptitude technique de la Gendarmerie Royale"
      size="evaluation"
      footer={
        <div className="w-full flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 sm:gap-3">
          <p className="text-[10px] sm:text-[11px] text-slateSubtle-500 italic truncate">
            Document militaire officiel numérisé • ORIENT-GR — Gendarmerie Royale.
          </p>
          <div className="flex items-center gap-2 self-end sm:self-auto shrink-0">
            <button
              type="button"
              onClick={() => window.print()}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-xl border border-slateSubtle-200 bg-white text-xs font-bold text-slateSubtle-700 hover:bg-cream-100 transition shadow-2xs min-h-[38px] sm:min-h-[40px] cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5 text-gold-dark" />
              <span>Imprimer</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-1.5 sm:px-5 sm:py-2 rounded-xl bg-gendarmerie text-white text-xs font-bold hover:bg-[#1C4E39] transition shadow-xs min-h-[38px] sm:min-h-[40px] cursor-pointer"
            >
              Fermer
            </button>
          </div>
        </div>
      }
    >
      <div className="space-y-4 sm:space-y-5 py-0.5">
        {/* 1. En-tête Institutionnel & Informations Clés */}
        <div className="bg-cream-100/60 p-3.5 sm:p-4 rounded-2xl border border-slateSubtle-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="space-y-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap text-xs">
              <span className="font-mono font-bold text-gendarmerie bg-white px-2 py-0.5 rounded-md border border-slateSubtle-200 shadow-2xs text-[11px]">
                {w.Code || 'ATELIER'}
              </span>
              <span className="text-slate-400">•</span>
              <span className="font-bold text-gendarmerie uppercase tracking-wider text-[10px] sm:text-[11px]">
                {w.Categorie?.intituleFr || w.SousDomaine || 'Atelier Professionnel'}
              </span>
            </div>
            <h3 className="text-base sm:text-lg font-bold text-gendarmerie font-serif leading-snug break-words">
              {w.Titre}
            </h3>
            {w.TitreAr && (
              <p className="text-xs text-slateSubtle-600 font-arabic break-words" dir="rtl">
                {w.TitreAr}
              </p>
            )}
          </div>

          <div className="shrink-0 w-full sm:w-auto text-left sm:text-right bg-white p-2.5 sm:p-3 rounded-xl border border-slateSubtle-200 shadow-2xs space-y-0.5 sm:min-w-[170px]">
            <div className="text-[10px] uppercase font-bold text-slateSubtle-500 tracking-wider flex items-center sm:justify-end gap-1">
              <UserCheck className="w-3.5 h-3.5 text-gold-dark" />
              <span>Évaluateur Référent</span>
            </div>
            <div className="text-xs font-bold text-gendarmerie truncate">
              {assignment.SuperviseurNom || w.SuperviseurParDefaut || 'Membre Commission'}
            </div>
            {assignment.DateValidation && (
              <div className="text-[10px] text-slateSubtle-500">
                Certifié le {new Date(assignment.DateValidation).toLocaleDateString('fr-FR', { day: '2-digit', month: 'long', year: 'numeric' })}
              </div>
            )}
          </div>
        </div>

        {/* Protection si non validé */}
        {!isValidated && (
          <div className="p-4 rounded-2xl bg-indigo-50 border border-indigo-200 text-indigo-900 text-xs flex items-start gap-3">
            <Clock className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <strong className="font-bold text-xs sm:text-sm block">
                {isPending ? "Atelier en attente d'évaluation officielle" : "Atelier en cours de réalisation"}
              </strong>
              <p className="text-indigo-800 leading-relaxed text-[11px] sm:text-xs">
                Votre travail est enregistré. Dès que la commission aura supervisé et validé la manipulation sur le terrain, vos notes sur 20 points, observations et compétences validées apparaîtront ici.
              </p>
            </div>
          </div>
        )}

        {/* Arrêt de sécurité */}
        {assignment.ArretSecurite && (
          <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-300 text-rose-900 text-xs flex items-start gap-2.5">
            <ShieldAlert className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
            <div className="space-y-1 min-w-0">
              <strong className="font-bold uppercase tracking-wide text-rose-800 block text-xs">
                Arrêt d'urgence de sécurité appliqué
              </strong>
              <p className="text-rose-950 font-medium leading-relaxed text-[11px] break-words">
                Motif consigné par l'évaluateur : « {assignment.MotifArretSecurite || 'Comportement non conforme aux règles de sécurité.'} »
              </p>
            </div>
          </div>
        )}

        {/* 2. Hero Certificat : Note Finale /20 & Orientation (Quand validé) */}
        {isValidated && (
          <div className="bg-gradient-to-br from-[#153B2B] via-[#1A4533] to-[#0E291E] text-white rounded-2xl p-4 sm:p-5 shadow-md border-2 border-gold/40 relative overflow-hidden">
            {/* Décoration sobre */}
            <div className="absolute top-0 right-0 w-48 h-48 bg-gold/5 rounded-full blur-2xl pointer-events-none" />

            <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              {/* Note globale */}
              <div className="space-y-1.5 min-w-0">
                <div className="text-[10px] sm:text-[11px] uppercase font-bold text-gold-light tracking-wider flex items-center gap-1.5">
                  <Award className="w-4 h-4 text-gold shrink-0" />
                  <span className="truncate">Note Finale Officielle (Barème 20 Pts)</span>
                </div>

                <div className="flex flex-wrap items-baseline gap-2">
                  <span className="text-3xl sm:text-4xl font-black font-serif text-white tracking-tight">
                    {assignment.ScoreObtenu ?? '—'}
                  </span>
                  <span className="text-base sm:text-lg font-normal text-gold-light">/ {assignment.ScoreTotalMax || 20} pts</span>
                  {assignment.ScorePourcentage !== null && (
                    <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-gold/25 text-gold-light border border-gold/40">
                      {assignment.ScorePourcentage}% de réussite
                    </span>
                  )}
                </div>

                <div className="flex flex-wrap items-center gap-2 pt-0.5 text-xs font-semibold">
                  <div className="flex items-center gap-0.5 text-gold shrink-0">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3.5 h-3.5 ${i < mentionInfo.stars ? 'fill-gold text-gold' : 'text-white/20'}`}
                      />
                    ))}
                  </div>
                  <span className={`${mentionInfo.color} text-[11px] sm:text-xs truncate`}>
                    {mentionInfo.label}
                  </span>
                </div>
              </div>

              {/* Spécialité recommandée valorisée */}
              {specialtyName && (
                <div className="bg-white/10 backdrop-blur-xs p-3 sm:p-3.5 rounded-xl border border-white/20 sm:max-w-[210px] space-y-1 shrink-0">
                  <div className="text-[10px] uppercase font-bold text-gold-light tracking-wider flex items-center gap-1.5">
                    <Compass className="w-3.5 h-3.5 text-gold shrink-0" />
                    <span>Orientation Préconisée</span>
                  </div>
                  <div className="text-xs sm:text-sm font-bold text-white leading-snug break-words">
                    {specialtyName}
                  </div>
                  <p className="text-[10px] text-slate-200 mt-0.5 leading-relaxed">
                    Aptitude technique avérée pour les unités spécialisées.
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* 3. Détail des 4 Critères Réglementaires */}
        {isValidated && (
          <div className="space-y-2.5">
            <div className="flex items-center justify-between pb-1 border-b border-slateSubtle-200">
              <h4 className="text-xs font-bold uppercase tracking-wider text-gendarmerie flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-gold-dark shrink-0" />
                <span>Notation détaillée selon les 4 critères officiels</span>
              </h4>
              <span className="text-[11px] text-slateSubtle-500 font-semibold shrink-0">Total : 20 pts</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {[
                { id: 'CRIT-SEC-METH', name: '1. Sécurité et méthodologie', icon: ShieldCheck, desc: 'Respect des EPI et procédures de sécurité' },
                { id: 'CRIT-DIAG-PREC', name: '2. Précision du diagnostic', icon: Award, desc: 'Exactitude de l\'analyse sans devinette' },
                { id: 'CRIT-EXEC-QUAL', name: '3. Qualité de l\'exécution technique', icon: HardHat, desc: 'Maîtrise du geste et dextérité professionnelle' },
                { id: 'CRIT-TPS-DISC', name: '4. Gestion du temps et discipline militaire', icon: Clock, desc: 'Respect des délais, sang-froid et tenue' }
              ].map((crit) => {
                const noteData = assignment.NotesCriteres?.[crit.id];
                const noteVal = typeof noteData === 'object' ? noteData?.note : noteData;
                const noteComment = typeof noteData === 'object' ? noteData?.commentaire : null;
                const Icon = crit.icon;
                const scoreNumber = parseFloat(noteVal) || 0;

                return (
                  <div
                    key={crit.id}
                    className="p-3 sm:p-3.5 rounded-xl bg-white border border-slateSubtle-200 shadow-2xs space-y-2 hover:border-gendarmerie/30 transition-all"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2.5 min-w-0">
                        <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-cream-200 text-gendarmerie flex items-center justify-center shrink-0">
                          <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                        </div>
                        <div className="min-w-0">
                          <div className="text-xs font-bold text-gendarmerie truncate">
                            {crit.name}
                          </div>
                          <div className="text-[10px] text-slateSubtle-500 truncate">
                            {crit.desc}
                          </div>
                        </div>
                      </div>

                      <div className="shrink-0">
                        <span className="inline-block text-xs font-black text-gendarmerie bg-cream-100 px-2.5 py-0.5 rounded-lg border border-slateSubtle-200 font-mono">
                          {scoreNumber} / 5 pts
                        </span>
                      </div>
                    </div>

                    {/* Petite jauge visuelle sur 5 points */}
                    <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-300 ${
                          scoreNumber >= 4 ? 'bg-emerald-600' : scoreNumber >= 3 ? 'bg-amber-500' : 'bg-rose-500'
                        }`}
                        style={{ width: `${(scoreNumber / 5) * 100}%` }}
                      />
                    </div>

                    {/* Commentaire de la commission */}
                    {noteComment && (
                      <p className="text-[11px] text-slateSubtle-700 leading-relaxed italic bg-cream-50/70 p-2 rounded-lg border border-slateSubtle-200/60 break-words">
                        « {noteComment} »
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* 4. Avis Circonstancié de la Commission */}
        {isValidated && assignment.ObservationsEvaluateur && (
          <div className="p-3.5 sm:p-4 rounded-2xl bg-cream-50 border border-slateSubtle-200 space-y-1.5">
            <div className="flex items-center gap-2 text-xs font-bold text-gendarmerie uppercase tracking-wider">
              <UserCheck className="w-4 h-4 text-gold-dark shrink-0" />
              <span>Appréciation globale de l'évaluateur</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-800 leading-relaxed italic pl-3 sm:pl-4 border-l-2 border-gold font-serif break-words">
              « {assignment.ObservationsEvaluateur} »
            </p>
            <div className="text-[11px] text-slateSubtle-600 text-right pt-0.5 font-semibold">
              — {assignment.SuperviseurNom || 'Membre Évaluateur'}, Commission Spécialisée
            </div>
          </div>
        )}

        {/* 5. Points Forts & Axes de Perfectionnement */}
        {isValidated && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* Points forts */}
            <div className="p-3.5 rounded-xl bg-emerald-50/80 border border-emerald-200 space-y-2">
              <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-900 uppercase tracking-wider">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                <span className="truncate">Points forts démontrés</span>
              </div>
              <ul className="space-y-1.5 text-xs text-emerald-950">
                {(assignment.PointsForts?.length > 0
                  ? assignment.PointsForts
                  : ["Respect rigoureux des procédures de sécurité et des outillages", "Excellente réactivité et compréhension des consignes techniques", "Très bonne posture et tenue militaire"]
                ).map((pf, i) => (
                  <li key={i} className="flex items-start gap-1.5 break-words">
                    <span className="text-emerald-600 font-bold shrink-0">✓</span>
                    <span>{pf}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Axes de perfectionnement */}
            <div className="p-3.5 rounded-xl bg-amber-50/80 border border-amber-200 space-y-2">
              <div className="flex items-center gap-1.5 text-xs font-bold text-amber-900 uppercase tracking-wider">
                <Clock className="w-3.5 h-3.5 text-amber-700 shrink-0" />
                <span className="truncate">Axes de progression</span>
              </div>
              <ul className="space-y-1.5 text-xs text-amber-950">
                {(assignment.AxesAmelioration?.length > 0
                  ? assignment.AxesAmelioration
                  : ["Continuer à approfondir la vitesse d'exécution lors des manipulations", "Synthétiser les comptes-rendus techniques pour le commandement"]
                ).map((ax, i) => (
                  <li key={i} className="flex items-start gap-1.5 break-words">
                    <span className="text-amber-600 font-bold shrink-0">→</span>
                    <span>{ax}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* 6. Compétences Techniques Attestées */}
        {isValidated && (
          <div className="space-y-2 pt-0.5">
            <div className="text-xs font-bold text-gendarmerie uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-gold-dark shrink-0" />
              <span>Compétences techniques validées :</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {(assignment.CompetencesDetectees?.length > 0
                ? assignment.CompetencesDetectees
                : ["Diagnostic méthodique", "Sécurité opérationnelle", "Maîtrise technique"]
              ).map((skill, i) => (
                <span
                  key={i}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-gendarmerie/10 text-gendarmerie text-[11px] font-semibold border border-gendarmerie/20 break-words"
                >
                  <span className="text-gold-dark">★</span>
                  <span>{skill}</span>
                </span>
              ))}
            </div>
          </div>
        )}

        {/* 7. Pièces justificatives / Preuves */}
        {assignment.PreuvesAttachees?.length > 0 && (
          <div className="space-y-2 pt-2 border-t border-slateSubtle-200">
            <div className="text-xs font-bold text-gendarmerie flex items-center gap-1.5">
              <Paperclip className="w-3.5 h-3.5 text-gold-dark shrink-0" />
              <span>Pièces justificatives consignées ({assignment.PreuvesAttachees.length})</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {assignment.PreuvesAttachees.map((p) => (
                <div
                  key={p.id}
                  className="flex items-center gap-2 p-2 rounded-xl bg-cream-50 border border-slateSubtle-200 text-xs min-w-0"
                >
                  <FileText className="w-4 h-4 text-gendarmerie shrink-0" />
                  <span className="font-semibold text-gendarmerie truncate">{p.nomFichier}</span>
                  <span className="text-[10px] text-slateSubtle-500 shrink-0">({p.taille})</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
}
