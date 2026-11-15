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
  UserCheck, 
  CreditCard, 
  GraduationCap,
  KeyRound,
  CheckCircle2
} from 'lucide-react';
import Button from '../../components/common/Button.jsx';

export default function LoginPage() {
  // Mode de connexion : 'ELEVE' (par défaut) ou 'STAFF' (Officiers / Commissions)
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

  // Remplissage rapide démo
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

  return (
    <div className="min-h-screen bg-[#F7F8F5] flex flex-col justify-center py-10 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Motifs décoratifs sobres */}
      <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-gendarmerie via-gold to-gendarmerie-light" />
      <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-gendarmerie/5 pointer-events-none" />

      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        {/* Blason / Emblème Gendarmerie */}
        <div className="mx-auto w-16 h-16 rounded-2xl bg-gendarmerie flex items-center justify-center border-2 border-gold/60 shadow-[0_4px_16px_rgba(201,160,82,0.3)] mb-4">
          <Shield className="w-8 h-8 text-gold" />
        </div>

        <div className="inline-block px-3 py-1 rounded-full bg-cream-100 border border-slateSubtle-200 text-[10px] font-bold tracking-widest text-gendarmerie uppercase mb-2 shadow-2xs">
          ROYAUME DU MAROC • GENDARMERIE ROYALE
        </div>

        <h1 className="text-3xl font-extrabold text-gendarmerie font-serif tracking-tight">
          ORIENT<span className="text-gold">-GR</span>
        </h1>
        <p className="mt-1 text-xs text-slateSubtle-700 max-w-sm mx-auto">
          Système d'Aide à la Décision & d'Orientation Opérationnelle des Élèves Gendarmes
        </p>
      </div>

      <div className="mt-7 sm:mx-auto sm:w-full sm:max-w-md px-4 sm:px-0">
        <div className="bg-white py-8 px-6 sm:px-9 shadow-[0_10px_30px_rgba(21,59,43,0.06)] rounded-2xl border border-slateSubtle-200 animate-fade-slide">
          
          {/* Sélecteur d'espace sous forme d'onglets discrets et élégants */}
          <div className="grid grid-cols-2 gap-1 p-1 bg-cream-100/80 rounded-xl border border-slateSubtle-200 mb-6">
            <button
              type="button"
              onClick={() => { setActiveTab('ELEVE'); setErrorMsg(''); }}
              className={`py-2 px-3 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-1.5 ${
                activeTab === 'ELEVE'
                  ? 'bg-gendarmerie text-gold shadow-sm'
                  : 'text-slateSubtle-700 hover:text-gendarmerie hover:bg-white/50'
              }`}
            >
              <GraduationCap className={`w-4 h-4 ${activeTab === 'ELEVE' ? 'text-gold' : 'text-slateSubtle-500'}`} />
              <span>Espace Élève</span>
            </button>

            <button
              type="button"
              onClick={() => { setActiveTab('STAFF'); setErrorMsg(''); }}
              className={`py-2 px-3 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-1.5 ${
                activeTab === 'STAFF'
                  ? 'bg-gendarmerie text-gold shadow-sm'
                  : 'text-slateSubtle-700 hover:text-gendarmerie hover:bg-white/50'
              }`}
            >
              <Shield className={`w-4 h-4 ${activeTab === 'STAFF' ? 'text-gold' : 'text-slateSubtle-500'}`} />
              <span>Encadrement</span>
            </button>
          </div>

          {searchParams.get('expired') && (
            <div className="mb-5 p-3 rounded-xl bg-amber-50 border border-amber-200 flex items-center gap-2.5 text-xs text-amber-900">
              <AlertCircle className="w-4 h-4 text-gold flex-shrink-0" />
              <span>Votre session a expiré. Veuillez vous réauthentifier.</span>
            </div>
          )}

          {errorMsg && (
            <div className="mb-5 p-3 rounded-xl bg-rose-50 border border-rose-200 flex items-center gap-2.5 text-xs text-rose-900">
              <AlertCircle className="w-4 h-4 text-rose-700 flex-shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* ================================================================ */}
          {/* FORMULAIRE 1 : ESPACE ÉLÈVE GENDARME (EXACTEMENT 2 CHAMPS : CIN + MATRICULE) */}
          {/* ================================================================ */}
          {activeTab === 'ELEVE' && (
            <form className="space-y-4" onSubmit={handleStudentSubmit}>
              <div className="p-2.5 rounded-xl bg-cream-50 border border-slateSubtle-200/80 text-[11px] text-slateSubtle-700 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>Accès réservé aux élèves gendarmes sous contrôle réglementaire.</span>
              </div>

              {/* Champ 1 : Numéro CIN */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-semibold text-slateSubtle-800 uppercase tracking-wider">
                    Numéro CIN <span className="text-rose-600">*</span>
                  </label>
                  <span className="text-[10px] text-slateSubtle-500 font-mono">Carte d'Identité</span>
                </div>
                <div className="relative rounded-xl">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slateSubtle-500">
                    <CreditCard className="w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    required
                    value={studentCin}
                    onChange={(e) => setStudentCin(e.target.value.toUpperCase())}
                    placeholder="ex: AB123456"
                    autoComplete="off"
                    maxLength={20}
                    className="block w-full pl-10 pr-3.5 py-2.5 sm:text-xs font-mono font-bold tracking-wider uppercase border border-slateSubtle-200 rounded-xl bg-cream-50/60 focus:bg-white focus:outline-none focus:ring-2 focus:ring-gold/40 focus:border-gendarmerie text-slateSubtle-800 transition-all duration-200 hover:border-slateSubtle-300"
                  />
                </div>
              </div>

              {/* Champ 2 : Matricule militaire */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-semibold text-slateSubtle-800 uppercase tracking-wider">
                    Matricule Militaire <span className="text-rose-600">*</span>
                  </label>
                  <span className="text-[10px] text-slateSubtle-500 font-mono">Incorporation</span>
                </div>
                <div className="relative rounded-xl">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slateSubtle-500">
                    <User className="w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    required
                    value={studentMatricule}
                    onChange={(e) => setStudentMatricule(e.target.value.toUpperCase())}
                    placeholder="ex: EG-2025-099"
                    autoComplete="off"
                    maxLength={20}
                    className="block w-full pl-10 pr-3.5 py-2.5 sm:text-xs font-mono font-bold tracking-wider uppercase border border-slateSubtle-200 rounded-xl bg-cream-50/60 focus:bg-white focus:outline-none focus:ring-2 focus:ring-gold/40 focus:border-gendarmerie text-slateSubtle-800 transition-all duration-200 hover:border-slateSubtle-300"
                  />
                </div>
              </div>

              <Button
                type="submit"
                variant="primary"
                size="lg"
                className="w-full mt-4 shadow-sm hover:shadow"
                loading={loading}
                icon={ArrowRight}
                iconPosition="right"
              >
                Accéder à mon Espace Élève
              </Button>

              <div className="pt-2 text-center">
                <span className="text-[10px] text-slateSubtle-500 flex items-center justify-center gap-1">
                  <Lock className="w-3 h-3 text-gold" />
                  Concordance d'identité chiffrée • Protection anti-brute force active
                </span>
              </div>
            </form>
          )}

          {/* ====================================================================== */}
          {/* FORMULAIRE 2 : ENCADREMENT & ÉTAT-MAJOR (OFFICIER & COMMISSIONS) */}
          {/* ====================================================================== */}
          {activeTab === 'STAFF' && (
            <form className="space-y-4" onSubmit={handleStaffSubmit}>
              <div className="p-2.5 rounded-xl bg-amber-50/70 border border-amber-200/60 text-[11px] text-amber-900 flex items-center gap-2">
                <Shield className="w-4 h-4 text-gold flex-shrink-0" />
                <span>Portail habilité pour Officiers de commandement et Membres de commissions spécialisées.</span>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slateSubtle-800 uppercase tracking-wider mb-1.5">
                  Matricule militaire ou E-mail <span className="text-rose-600">*</span>
                </label>
                <div className="relative rounded-xl">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slateSubtle-500">
                    <User className="w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    required
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                    placeholder="ex: commandement@orient-gr.gendarmerie.fr"
                    className="block w-full pl-10 pr-3.5 py-2.5 sm:text-xs border border-slateSubtle-200 rounded-xl bg-cream-50/60 focus:bg-white focus:outline-none focus:ring-2 focus:ring-gold/40 focus:border-gendarmerie text-slateSubtle-800 transition-all duration-200 hover:border-slateSubtle-300"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-semibold text-slateSubtle-800 uppercase tracking-wider">
                    Mot de passe habilité <span className="text-rose-600">*</span>
                  </label>
                  <span className="text-[10px] text-slateSubtle-500 font-mono">Chiffré TLS 1.3</span>
                </div>
                <div className="relative rounded-xl">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slateSubtle-500">
                    <KeyRound className="w-4 h-4" />
                  </div>
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="block w-full pl-10 pr-3.5 py-2.5 sm:text-xs border border-slateSubtle-200 rounded-xl bg-cream-50/60 focus:bg-white focus:outline-none focus:ring-2 focus:ring-gold/40 focus:border-gendarmerie text-slateSubtle-800 transition-all duration-200 hover:border-slateSubtle-300"
                  />
                </div>
              </div>

              <Button
                type="submit"
                variant="primary"
                size="lg"
                className="w-full mt-4 shadow-sm hover:shadow"
                loading={loading}
                icon={ArrowRight}
                iconPosition="right"
              >
                Connexion au Portail
              </Button>
            </form>
          )}

          {/* Séparateur pour les accès rapides de démonstration */}
          <div className="mt-6 pt-5 border-t border-slateSubtle-200">
            <p className="text-[10px] font-bold text-slateSubtle-600 uppercase tracking-wider text-center mb-2.5">
              Accès rapide démonstration :
            </p>
            <div className="space-y-2">
              {/* Accès rapide Élève par CIN + Matricule */}
              <button
                type="button"
                onClick={() => fillStudentDemo('AB123456', 'EG-2025-099')}
                className="w-full text-left p-2.5 rounded-xl border border-emerald-300 bg-emerald-50/60 hover:bg-emerald-100/60 flex items-center justify-between text-xs transition-all duration-200 hover:border-emerald-400 active:scale-[0.99]"
              >
                <div>
                  <span className="font-bold text-gendarmerie flex items-center gap-1.5">
                    <GraduationCap className="w-3.5 h-3.5 text-emerald-700" />
                    1. Élève Gendarme (Julien Moreau)
                  </span>
                  <p className="text-[10px] text-slateSubtle-700 ml-5">CIN : AB123456 • Matricule : EG-2025-099</p>
                </div>
                <span className="text-[10px] bg-emerald-700 px-2 py-0.5 rounded-full text-white font-bold shadow-2xs">Remplir</span>
              </button>

              {/* Accès rapide Membre Commission Spécialisée */}
              <button
                type="button"
                onClick={() => fillStaffDemo('commission.tech@orient-gr.gendarmerie.fr', 'Gendarme2026!')}
                className="w-full text-left p-2.5 rounded-xl border border-blue-300 bg-blue-50/70 hover:bg-blue-100/70 flex items-center justify-between text-xs transition-all duration-200 hover:border-blue-400 active:scale-[0.99]"
              >
                <div>
                  <span className="font-bold text-gendarmerie flex items-center gap-1.5">
                    <Shield className="w-3.5 h-3.5 text-blue-700" />
                    2. Membre Commission Spécialisée (Capitaine Alami)
                  </span>
                  <p className="text-[10px] text-slateSubtle-700 ml-5">COMM-001 • Commission Informatique & Réseaux</p>
                </div>
                <span className="text-[10px] bg-blue-700 px-2 py-0.5 rounded-full text-white font-bold shadow-2xs">Remplir</span>
              </button>

              {/* Accès rapide Officier Commandement */}
              <button
                type="button"
                onClick={() => fillStaffDemo('commandement@orient-gr.gendarmerie.fr', 'Gendarme2026!')}
                className="w-full text-left p-2.5 rounded-xl border border-slateSubtle-200 bg-cream-50 hover:bg-cream-100 flex items-center justify-between text-xs transition-all duration-200 hover:border-slateSubtle-300 active:scale-[0.99]"
              >
                <div>
                  <span className="font-bold text-gendarmerie flex items-center gap-1.5">
                    <Shield className="w-3.5 h-3.5 text-gendarmerie" />
                    3. Officier État-Major (ADMIN)
                  </span>
                  <p className="text-[10px] text-slateSubtle-700 ml-5">Commandement • Gestion globale & Décision</p>
                </div>
                <span className="text-[10px] bg-cream-200 text-gendarmerie border border-slateSubtle-200 px-2 py-0.5 rounded-full font-bold">Remplir</span>
              </button>
            </div>
          </div>
        </div>

        {/* Mention réglementaire */}
        <p className="mt-4 text-center text-[10px] text-slateSubtle-600 leading-normal max-w-sm mx-auto">
          Système réservé aux personnels habilités. Toute tentative d'accès non autorisé est passible des sanctions prévues par les dispositions militaires et pénales en vigueur.
        </p>
      </div>
    </div>
  );
}
