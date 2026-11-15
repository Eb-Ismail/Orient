import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';
import { useToast } from '../../context/ToastContext.jsx';
import { 
  Shield, 
  Lock, 
  User, 
  AlertCircle, 
  ArrowRight, 
  CreditCard, 
  KeyRound,
  CheckCircle2
} from 'lucide-react';

export default function LoginPage() {
  // Mode de connexion : 'ELEVE' (par défaut) ou 'STAFF' (Encadrement / Officiers)
  const [activeTab, setActiveTab] = useState('ELEVE');

  // Champs Espace Élève (strictement deux champs obligatoires : CIN et Matricule)
  const [studentCin, setStudentCin] = useState('');
  const [studentMatricule, setStudentMatricule] = useState('');

  // Champs Espace Encadrement & État-Major
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const { login, loginStudent } = useAuth();
  const { addToast } = useToast();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  // Soumission Authentification Élève (CIN + Matricule)
  const handleStudentSubmit = async (e) => {
    e?.preventDefault();
    setErrorMsg('');
    setLoading(true);

    try {
      const user = await loginStudent(studentCin, studentMatricule);
      addToast({
        title: 'Authentification réussie',
        message: `Bienvenue, Élève Gendarme ${user.prenom} ${user.nom}.`,
        type: 'success'
      });
      navigate('/eleve/dashboard');
    } catch (err) {
      const msg = err.response?.data?.error || "Identifiants militaires invalides ou serveur indisponible.";
      setErrorMsg(msg);
      addToast({
        title: 'Échec de connexion',
        message: msg,
        type: 'error'
      });
    } finally {
      setLoading(false);
    }
  };

  // Soumission Authentification Encadrement (Email/Matricule + Mot de passe)
  const handleStaffSubmit = async (e) => {
    e?.preventDefault();
    setErrorMsg('');
    setLoading(true);

    try {
      const user = await login(identifier, password);
      addToast({
        title: 'Authentification réussie',
        message: `Bienvenue, ${user.prenom} ${user.nom}.`,
        type: 'success'
      });

      if (user.role === 'ADMIN') {
        navigate('/admin/dashboard');
      } else if (user.role === 'COMMISSION') {
        navigate('/commission/dashboard');
      } else {
        navigate('/eleve/dashboard');
      }
    } catch (err) {
      const msg = err.response?.data?.error || "Identifiants militaires invalides ou serveur indisponible.";
      setErrorMsg(msg);
      addToast({
        title: 'Échec de connexion',
        message: msg,
        type: 'error'
      });
    } finally {
      setLoading(false);
    }
  };

  // Remplissage rapide démo (met les valeurs dans les inputs)
  const fillStudentDemo = (cin, matricule) => {
    setActiveTab('ELEVE');
    setStudentCin(cin);
    setStudentMatricule(matricule);
    setErrorMsg('');
  };

  const fillStaffDemo = (id, pwd) => {
    setActiveTab('STAFF');
    setIdentifier(id);
    setPassword(pwd);
    setErrorMsg('');
  };

  // Connexion directe en 1 clic pour les boutons "Accéder" des cartes de démo
  const directStudentLogin = async (cin, matricule) => {
    setActiveTab('ELEVE');
    setStudentCin(cin);
    setStudentMatricule(matricule);
    setErrorMsg('');
    setLoading(true);
    try {
      const user = await loginStudent(cin, matricule);
      addToast({
        title: 'Authentification réussie',
        message: `Bienvenue, Élève Gendarme ${user.prenom} ${user.nom}.`,
        type: 'success'
      });
      navigate('/eleve/dashboard');
    } catch (err) {
      const msg = err.response?.data?.error || "Identifiants militaires invalides ou serveur indisponible.";
      setErrorMsg(msg);
    } finally {
      setLoading(false);
    }
  };

  const directStaffLogin = async (id, pwd) => {
    setActiveTab('STAFF');
    setIdentifier(id);
    setPassword(pwd);
    setErrorMsg('');
    setLoading(true);
    try {
      const user = await login(id, pwd);
      addToast({
        title: 'Authentification réussie',
        message: `Bienvenue, ${user.prenom} ${user.nom}.`,
        type: 'success'
      });
      if (user.role === 'ADMIN') {
        navigate('/admin/dashboard');
      } else if (user.role === 'COMMISSION') {
        navigate('/commission/dashboard');
      } else {
        navigate('/eleve/dashboard');
      }
    } catch (err) {
      const msg = err.response?.data?.error || "Identifiants militaires invalides ou serveur indisponible.";
      setErrorMsg(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full relative flex flex-col justify-center items-center py-6 sm:py-8 px-4 sm:px-6 overflow-x-hidden selection:bg-gold/30">
      {/* Image de fond originale sur toute la page avec position:fixed, inset:0, w-full, h-full, object-fit:cover, object-position:center, z-index:0 */}
      <img 
        src="/images/login-bg.jpg" 
        alt="Arrière-plan Gendarmerie Royale" 
        className="fixed inset-0 w-full h-full object-cover object-center pointer-events-none z-0"
        style={{
          position: 'fixed',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          objectPosition: 'center',
          zIndex: 0
        }}
      />

      {/* En-tête officiel centré au-dessus de la carte avec z-index supérieur */}
      <div className="w-full max-w-md sm:max-w-lg mx-auto text-center mb-2.5 sm:mb-3 relative z-10">
        {/* Blason / Écusson Vert Gendarmerie avec bordure or */}
        <div className="mx-auto w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-[#153B2B] flex items-center justify-center border-2 border-gold/70 shadow-md mb-2">
          <Shield className="w-5 h-5 sm:w-6 sm:h-6 text-gold" />
        </div>

        {/* Badge Pilule institutionnel */}
        <div className="inline-flex items-center px-3 py-1 rounded-full bg-white border border-slate-200 text-[10px] sm:text-[11px] font-bold tracking-widest text-slate-700 uppercase mb-1.5 shadow-2xs">
          ROYAUME DU MAROC • GENDARMERIE ROYALE
        </div>

        {/* Titre Principal */}
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#153B2B] font-serif tracking-tight leading-none mb-1 drop-shadow-xs">
          ORIENT<span className="text-gold">-GR</span>
        </h1>

        {/* Sous-titre */}
        <p className="mt-1 text-xs sm:text-sm text-slate-700 font-medium max-w-sm sm:max-w-md mx-auto leading-snug">
          Système d'Aide à la Décision & d'Orientation Opérationnelle des Élèves Gendarmes
        </p>
      </div>

      {/* Carte centrale d'authentification à fond blanc opaque avec z-index supérieur */}
      <div className="w-full max-w-[480px] sm:max-w-[500px] md:max-w-[520px] mx-auto bg-white rounded-2xl sm:rounded-3xl shadow-xl border border-slate-200/90 p-5 sm:p-7 relative z-10">
        
        {/* Sélecteur d'espace sous forme d'onglets (Espace Élève / Encadrement) */}
        <div className="bg-slate-100 p-1 rounded-xl flex items-center gap-1 mb-4">
          <button
            type="button"
            onClick={() => { setActiveTab('ELEVE'); setErrorMsg(''); }}
            className={`py-2 px-3 text-xs sm:text-sm font-bold rounded-lg transition-all flex items-center justify-center gap-2 flex-1 ${
              activeTab === 'ELEVE'
                ? 'bg-[#153B2B] text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
            }`}
          >
            <User className="w-4 h-4" />
            <span>Espace Élève</span>
          </button>

          <button
            type="button"
            onClick={() => { setActiveTab('STAFF'); setErrorMsg(''); }}
            className={`py-2 px-3 text-xs sm:text-sm font-bold rounded-lg transition-all flex items-center justify-center gap-2 flex-1 ${
              activeTab === 'STAFF'
                ? 'bg-[#153B2B] text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
            }`}
          >
            <Shield className="w-4 h-4" />
            <span>Encadrement</span>
          </button>
        </div>

        {/* Alerte Session Expirée */}
        {searchParams.get('expired') && (
          <div className="mb-4 p-3 rounded-xl bg-amber-50 border border-amber-200 flex items-center gap-2 text-xs text-amber-900">
            <AlertCircle className="w-4 h-4 text-gold flex-shrink-0" />
            <span>Votre session a expiré. Veuillez vous réauthentifier.</span>
          </div>
        )}

        {/* Message d'Erreur */}
        {errorMsg && (
          <div className="mb-4 p-3 rounded-xl bg-rose-50 border border-rose-200 flex items-center gap-2 text-xs text-rose-900">
            <AlertCircle className="w-4 h-4 text-rose-700 flex-shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* ================================================================ */}
        {/* FORMULAIRE 1 : ESPACE ÉLÈVE GENDARME (CIN + MATRICULE) */}
        {/* ================================================================ */}
        {activeTab === 'ELEVE' && (
          <form className="space-y-3.5" onSubmit={handleStudentSubmit}>
            {/* Bannière de notification verte */}
            <div className="p-3 rounded-xl bg-[#EAF7EE] border border-[#BDE8C8] text-[#153B2B] flex items-center gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-[#0E7052] flex-shrink-0" />
              <span className="text-xs font-medium leading-snug">
                Accès réservé aux élèves gendarmes sous contrôle administratif.
              </span>
            </div>

            {/* Champ 1 : Numéro CIN */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider">
                  NUMÉRO CIN <span className="text-rose-600">*</span>
                </label>
                <span className="text-xs text-slate-500 font-medium">Cin / d'Étudiant</span>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <CreditCard className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  required
                  value={studentCin}
                  onChange={(e) => setStudentCin(e.target.value.toUpperCase())}
                  placeholder="Ex : AB123456"
                  autoComplete="off"
                  maxLength={20}
                  className="block w-full pl-10 pr-3.5 py-2.5 sm:py-3 text-xs sm:text-sm font-mono font-bold tracking-wider uppercase border border-slate-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-[#153B2B]/20 focus:border-[#153B2B] text-slate-800 transition"
                />
              </div>
            </div>

            {/* Champ 2 : Matricule militaire */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider">
                  MATRICULE MILITAIRE <span className="text-rose-600">*</span>
                </label>
                <span className="text-xs text-slate-500 font-medium">Incorporation</span>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <User className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  required
                  value={studentMatricule}
                  onChange={(e) => setStudentMatricule(e.target.value.toUpperCase())}
                  placeholder="Ex : 75 / 2025 - 999"
                  autoComplete="off"
                  maxLength={20}
                  className="block w-full pl-10 pr-3.5 py-2.5 sm:py-3 text-xs sm:text-sm font-mono font-bold tracking-wider uppercase border border-slate-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-[#153B2B]/20 focus:border-[#153B2B] text-slate-800 transition"
                />
              </div>
            </div>

            {/* Bouton Principal */}
            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2.5 bg-[#153B2B] hover:bg-[#1A4533] active:scale-[0.99] text-white font-bold py-3 px-4 rounded-xl shadow-xs transition-all flex items-center justify-center gap-2 text-xs sm:text-sm disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span>Connexion en cours...</span>
              ) : (
                <>
                  <span>Accéder à mon Espace Élève</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>

            {/* Notice de sécurité */}
            <div className="text-center pt-1.5">
              <span className="text-xs text-slate-500 flex items-center justify-center gap-1.5 font-medium">
                <Lock className="w-3.5 h-3.5 text-gold" />
                Connexion sécurisée et réservée aux élèves gendarmes
              </span>
            </div>
          </form>
        )}

        {/* ====================================================================== */}
        {/* FORMULAIRE 2 : ENCADREMENT & ÉTAT-MAJOR (OFFICIER & COMMISSIONS) */}
        {/* ====================================================================== */}
        {activeTab === 'STAFF' && (
          <form className="space-y-3.5" onSubmit={handleStaffSubmit}>
            {/* Bannière de notification ambre */}
            <div className="p-3 rounded-xl bg-amber-50 border border-amber-200/80 text-amber-900 flex items-center gap-2.5">
              <Shield className="w-4 h-4 text-amber-700 flex-shrink-0" />
              <span className="text-xs font-medium leading-snug">
                Portail réservé au Commandement et aux Membres de Commissions Spécialisées.
              </span>
            </div>

            {/* Champ 1 : Identifiant */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider">
                  MATRICULE OU E-MAIL <span className="text-rose-600">*</span>
                </label>
                <span className="text-xs text-slate-500 font-medium">Identifiant officiel</span>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <User className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  required
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  placeholder="ex : commandement@orient-gr.gendarmerie.fr"
                  className="block w-full pl-10 pr-3.5 py-2.5 sm:py-3 text-xs sm:text-sm border border-slate-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-[#153B2B]/20 focus:border-[#153B2B] text-slate-800 transition"
                />
              </div>
            </div>

            {/* Champ 2 : Mot de passe */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider">
                  MOT DE PASSE HABILITÉ <span className="text-rose-600">*</span>
                </label>
                <span className="text-xs text-slate-500 font-medium">Chiffré TLS 1.3</span>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <KeyRound className="w-4 h-4" />
                </div>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="block w-full pl-10 pr-3.5 py-2.5 sm:py-3 text-xs sm:text-sm border border-slate-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-[#153B2B]/20 focus:border-[#153B2B] text-slate-800 transition"
                />
              </div>
            </div>

            {/* Bouton Principal */}
            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2.5 bg-[#153B2B] hover:bg-[#1A4533] active:scale-[0.99] text-white font-bold py-3 px-4 rounded-xl shadow-xs transition-all flex items-center justify-center gap-2 text-xs sm:text-sm disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span>Connexion en cours...</span>
              ) : (
                <>
                  <span>Connexion au Portail d'Encadrement</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>

            {/* Notice de sécurité */}
            <div className="text-center pt-1.5">
              <span className="text-xs text-slate-500 flex items-center justify-center gap-1.5 font-medium">
                <Lock className="w-3.5 h-3.5 text-gold" />
                Accès sécurisé réservé aux commissions et officiers d'état-major
              </span>
            </div>
          </form>
        )}

        {/* Séparateur pour les accès rapides de démonstration */}
        <div className="mt-4 pt-3.5 border-t border-slate-100">
          <p className="text-[10px] sm:text-xs font-bold text-slate-500 uppercase tracking-wider text-center mb-2.5">
            ACCÈS RAPIDE DÉMONSTRATION :
          </p>
          <div className="space-y-2">
            {/* Ligne 1 : Élève Gendarme */}
            <div
              onClick={() => fillStudentDemo('AB123456', 'EG-2025-099')}
              className="w-full text-left p-2.5 rounded-xl border border-[#BDE8C8] bg-[#EAF7EE]/70 hover:bg-[#EAF7EE] flex items-center justify-between text-xs transition cursor-pointer"
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="w-8 h-8 rounded-full bg-[#CEEED7] flex items-center justify-center flex-shrink-0 text-[#0E7052]">
                  <User className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <div className="font-bold text-slate-900 text-xs sm:text-sm truncate">
                    1. Élève Gendarme (Julien Moreau)
                  </div>
                  <div className="text-[11px] text-slate-600 truncate">
                    CIN : AB123456 • Matricule : EG-2025-099
                  </div>
                </div>
              </div>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  directStudentLogin('AB123456', 'EG-2025-099');
                }}
                className="ml-2 bg-[#0E7052] hover:bg-[#0C5F45] text-white text-xs font-bold px-3.5 py-1 rounded-full shadow-2xs transition flex-shrink-0"
              >
                Accéder
              </button>
            </div>

            {/* Ligne 2 : Membre Commission Spécialisée */}
            <div
              onClick={() => fillStaffDemo('commission.tech@orient-gr.gendarmerie.fr', 'Gendarme2026!')}
              className="w-full text-left p-2.5 rounded-xl border border-[#BFDBFE] bg-[#EFF6FF]/80 hover:bg-[#EFF6FF] flex items-center justify-between text-xs transition cursor-pointer"
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="w-8 h-8 rounded-full bg-[#DBEAFE] flex items-center justify-center flex-shrink-0 text-[#1E40AF]">
                  <User className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <div className="font-bold text-slate-900 text-xs sm:text-sm truncate">
                    2. Membre Commission Spécialisée (Capitaine Amimi)
                  </div>
                  <div className="text-[11px] text-slate-600 truncate">
                    CIN : 001 • Commission : Informatique & Réseaux
                  </div>
                </div>
              </div>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  directStaffLogin('commission.tech@orient-gr.gendarmerie.fr', 'Gendarme2026!');
                }}
                className="ml-2 bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-bold px-3.5 py-1 rounded-full shadow-2xs transition flex-shrink-0"
              >
                Accéder
              </button>
            </div>

            {/* Ligne 3 : Officier État-Major */}
            <div
              onClick={() => fillStaffDemo('commandement@orient-gr.gendarmerie.fr', 'Gendarme2026!')}
              className="w-full text-left p-2.5 rounded-xl border border-[#FEF08A] bg-[#FEFCE8]/80 hover:bg-[#FEFCE8] flex items-center justify-between text-xs transition cursor-pointer"
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="w-8 h-8 rounded-full bg-[#FEF08A] flex items-center justify-center flex-shrink-0 text-[#854D0E]">
                  <User className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <div className="font-bold text-slate-900 text-xs sm:text-sm truncate">
                    3. Officier État-Major (ADMIN)
                  </div>
                  <div className="text-[11px] text-slate-600 truncate">
                    Commandement • Gestion globale & Décision
                  </div>
                </div>
              </div>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  directStaffLogin('commandement@orient-gr.gendarmerie.fr', 'Gendarme2026!');
                }}
                className="ml-2 bg-[#C9A052] hover:bg-[#B38E46] text-white text-xs font-bold px-3.5 py-1 rounded-full shadow-2xs transition flex-shrink-0"
              >
                Accéder
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mention de bas de page avec z-index supérieur */}
      <div className="mt-4 text-center relative z-10">
        <p className="text-xs font-semibold text-slate-700">
          Système fiable au service de la Gendarmerie Royale
        </p>
        <p className="text-[11px] text-slate-500 mt-0.5">
          ORIENT-GR © 2025 - Gendarmerie Royale du Maroc
        </p>
      </div>
    </div>
  );
}
