import React, { useState, useEffect } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import {
  LayoutDashboard,
  Users,
  GraduationCap,
  Shield,
  Sliders,
  FileCheck2,
  HelpCircle,
  BarChart3,
  GitCompare,
  FileText,
  Settings,
  LogOut,
  Menu,
  X,
  ChevronRight,
  ShieldAlert,
  Wrench,
  UserCheck
} from 'lucide-react';
import Badge from '../components/common/Badge.jsx';

export default function AdminLayout() {
  const { user, logout, quickLogin } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const isCommission = user?.role === 'COMMISSION';

  // Verrouillage du scroll arrière lors de l'ouverture de la sidebar mobile
  useEffect(() => {
    if (sidebarOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [sidebarOpen]);

  const navSections = isCommission
    ? [
        {
          title: 'Commission Spécialisée',
          items: [
            { to: '/commission/dashboard', label: 'Espace Candidats & Évaluations', icon: Shield }
          ]
        }
      ]
    : [
        {
          title: 'Gouvernance & Recrutement',
          items: [
            { to: '/admin/dashboard', label: 'Tableau de bord', icon: LayoutDashboard },
            { to: '/admin/commissions', label: 'Commissions & Recrutement', icon: Users },
            { to: '/admin/resultats', label: 'Résultats & Affectation', icon: BarChart3 },
            { to: '/admin/comparaison', label: 'Comparateur de Profils', icon: GitCompare }
          ]
        },
        {
          title: 'Évaluations',
          items: [
            { to: '/admin/ateliers/supervision', label: 'Supervision & Évaluation', icon: UserCheck },
            { to: '/admin/ateliers', label: 'Ateliers Pratiques', icon: Wrench },
            { to: '/admin/ateliers/analytics', label: 'Analyses & Compétences', icon: BarChart3 },
            { to: '/admin/tests', label: 'Tests & Protocoles', icon: FileCheck2 },
            { to: '/admin/questions', label: 'Banque 140 Questions', icon: HelpCircle }
          ]
        },
        {
          title: 'Élèves & Cohortes',
          items: [
            { to: '/admin/eleves', label: 'Élèves Gendarmes', icon: Users },
            { to: '/admin/promotions', label: 'Promotions', icon: GraduationCap }
          ]
        },
        {
          title: 'Configuration',
          items: [
            { to: '/admin/specialites', label: 'Spécialités', icon: Shield },
            { to: '/admin/eligibilite', label: 'Critères d\'Éligibilité', icon: Sliders },
            { to: '/admin/rapports', label: 'Rapports & PV', icon: FileText },
            { to: '/admin/parametres', label: 'Paramètres', icon: Settings }
          ]
        }
      ];

  return (
    <div className="min-h-[100dvh] bg-[#F7F8F5] flex flex-col md:flex-row font-sans w-full">
      {/* Sidebar Mobile Backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-gendarmerie-darkest/60 z-40 md:hidden backdrop-blur-xs"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar Navigation Épurée */}
      <aside
        className={`fixed md:sticky top-0 left-0 z-50 h-[100dvh] w-64 md:w-68 bg-[#0E291E] text-white flex flex-col transition-transform duration-200 ease-out border-r border-[#1C4E39] shadow-lg ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        {/* Brand / Crest */}
        <div className="h-16 px-4 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-2.5 cursor-pointer" onClick={() => navigate('/admin/dashboard')}>
            <div className="w-8 h-8 rounded-lg bg-gendarmerie flex items-center justify-center border border-gold/40 shadow-xs">
              <Shield className="w-4 h-4 text-gold" />
            </div>
            <div>
              <div className="font-extrabold text-sm tracking-wider text-white">
                ORIENT<span className="text-gold">-GR</span>
              </div>
              <div className="text-[9px] text-slate-300 uppercase tracking-widest font-medium">
                Administration
              </div>
            </div>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="md:hidden text-slate-400 hover:text-white p-1"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation links groupés */}
        <div className="flex-1 overflow-y-auto px-3.5 py-4 space-y-5">
          {navSections.map((section, idx) => (
            <div key={idx} className="space-y-1.5">
              <div className="px-3 text-xs uppercase font-bold tracking-wider text-gold/85">
                {section.title}
              </div>
              {section.items.map((item) => {
                const Icon = item.icon;
                return (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    onClick={() => setSidebarOpen(false)}
                    className={({ isActive }) =>
                      `flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                        isActive
                          ? 'bg-[#153B2B] text-white font-semibold border-l-4 border-gold shadow-xs'
                          : 'text-slate-200 hover:bg-white/10 hover:text-white'
                      }`
                    }
                  >
                    {({ isActive }) => (
                      <>
                        <Icon className={`w-4 h-4 flex-shrink-0 ${isActive ? 'text-gold' : 'text-slate-400'}`} />
                        <span className="truncate">{item.label}</span>
                      </>
                    )}
                  </NavLink>
                );
              })}
            </div>
          ))}
        </div>

        {/* Profil & Actions rapides */}
        <div className="p-3.5 border-t border-white/10 bg-black/25">
          <div className="flex items-center gap-2.5 px-1 mb-2.5">
            <div className="w-8 h-8 rounded-full bg-gold/20 border border-gold/40 flex items-center justify-center text-xs font-bold text-gold">
              {user?.nom?.charAt(0) || (isCommission ? 'C' : 'A')}
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold text-white truncate">
                {user?.prenom} {user?.nom}
              </p>
              <p className="text-xs text-gold-light/90 truncate">
                {isCommission ? 'Membre Commission' : 'État-Major'}
              </p>
            </div>
          </div>

          <div className="flex gap-2 pt-1">
            <button
              onClick={() => {
                quickLogin('ELEVE');
                navigate('/eleve/dashboard');
              }}
              className="flex-1 text-xs py-1.5 px-2.5 rounded-lg bg-white/10 hover:bg-white/20 text-slate-200 text-center transition font-semibold border border-white/10 cursor-pointer"
              title="Basculer en vue Élève"
            >
              Élève
            </button>
            <button
              onClick={() => {
                if (isCommission) {
                  quickLogin('ADMIN');
                  navigate('/admin/dashboard');
                } else {
                  quickLogin('COMMISSION');
                  navigate('/commission/dashboard');
                }
              }}
              className="flex-1 text-xs py-1.5 px-2.5 rounded-lg bg-gold/20 hover:bg-gold/30 text-gold-light text-center transition font-semibold border border-gold/30 cursor-pointer"
              title="Basculer de rôle (ADMIN / COMMISSION)"
            >
              {isCommission ? 'Admin' : 'Commission'}
            </button>
            <button
              onClick={logout}
              className="py-1.5 px-2.5 rounded-lg bg-rose-950/40 text-rose-300 hover:bg-rose-900/60 transition flex items-center justify-center border border-rose-800/30 cursor-pointer"
              title="Se déconnecter"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area en plein écran */}
      <div className="flex-1 flex flex-col min-w-0 overflow-x-hidden w-full">
        {/* Top Navbar */}
        <header className="sticky top-0 z-30 bg-white border-b border-slateSubtle-200 px-4 sm:px-6 md:px-8 py-3.5 flex items-center justify-between shadow-subtle w-full">
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="md:hidden p-2 rounded-xl text-slateSubtle-700 hover:bg-cream-200 min-h-[44px] min-w-[44px] flex items-center justify-center cursor-pointer"
              aria-label="Ouvrir le menu de navigation administration"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div className="hidden sm:block">
              <span className="text-sm font-semibold text-slateSubtle-800">
                Portail Officiel • {isCommission ? 'Commission Spécialisée • Évaluations & Recrutement' : 'Commandement & Recrutement Centralisé'}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Badge
              type={isCommission ? "WARNING" : "ADMIN"}
              label={isCommission ? "Membre Commission" : "Habilitation Officier (Admin)"}
              size="sm"
            />
            <div className="h-4 w-px bg-slateSubtle-300 hidden sm:block" />
            <span className="text-xs font-medium text-slateSubtle-600 hidden sm:inline">
              École Royale de Gendarmerie
            </span>
          </div>
        </header>

        {/* Page Content en pleine largeur */}
        <main className="flex-1 p-3.5 sm:p-5 md:p-6 lg:p-8 w-full min-w-0">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
