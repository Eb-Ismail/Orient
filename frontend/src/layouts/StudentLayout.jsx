import React, { useState, useEffect } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import {
  Shield,
  User,
  LogOut,
  LayoutDashboard,
  Menu,
  X,
  Compass,
  Wrench,
  UserCheck,
  BookOpen
} from 'lucide-react';

export default function StudentLayout() {
  const { user, logout, quickLogin } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const navLinks = [
    { to: '/eleve/dashboard', label: 'Tableau de bord', icon: LayoutDashboard },
    { to: '/eleve/parcours-intelligent', label: 'Parcours IA', icon: Compass },
    { to: '/eleve/guide', label: 'GUIDE', icon: BookOpen },
    { to: '/eleve/profil', label: 'Mon Profil', icon: User },
  ];

  // Verrouillage du scroll arrière lors de l'ouverture du menu mobile
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  return (
    <div className="min-h-[100dvh] bg-[#F7F8F5] flex flex-col font-sans relative overflow-x-hidden w-full">
      {/* Barre de navigation unique & épurée */}
      <header className="sticky top-0 z-40 bg-[#153B2B] text-white border-b border-[#1C4E39] shadow-sm w-full">
        <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-10 h-16 flex items-center justify-between">
          {/* Logo & Identité */}
          <div className="flex items-center gap-3 sm:gap-6 min-w-0">
            <div className="flex items-center gap-2 cursor-pointer shrink-0" onClick={() => navigate('/eleve/dashboard')}>
              <div className="w-8.5 h-8.5 sm:w-9 sm:h-9 rounded-xl bg-white/10 flex items-center justify-center border border-gold/40 shadow-xs shrink-0">
                <Shield className="w-4 h-4 text-gold" />
              </div>
              <div className="flex items-baseline gap-1.5">
                <span className="font-extrabold text-base tracking-wider text-white">
                  ORIENT<span className="text-gold">-GR</span>
                </span>
                <span className="text-[10px] uppercase tracking-wider text-gold-light/80 font-bold hidden sm:inline">
                  Élève
                </span>
              </div>
            </div>

            {/* Liens de navigation Desktop (visible >= 1024px) */}
            <nav className="hidden lg:flex items-center gap-1.5 xl:gap-2 min-w-0">
              {navLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <NavLink
                    key={link.to}
                    to={link.to}
                    className={({ isActive }) =>
                      `flex items-center gap-2 px-3 xl:px-3.5 py-2 rounded-xl text-sm font-medium transition-all whitespace-nowrap shrink-0 ${
                        isActive
                          ? 'bg-white/15 text-white font-semibold shadow-xs border-b-2 border-gold'
                          : 'text-slate-200 hover:bg-white/10 hover:text-white'
                      }`
                    }
                  >
                    <Icon className="w-4 h-4 text-gold/90 shrink-0" />
                    <span>{link.label}</span>
                  </NavLink>
                );
              })}
            </nav>
          </div>

          {/* Profil & Actions rapides */}
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="hidden sm:flex items-center gap-2.5 px-3 py-1.5 rounded-xl bg-black/20 border border-white/10">
              <div className="w-7 h-7 rounded-full bg-gold/20 flex items-center justify-center text-xs font-bold text-gold shrink-0">
                {user?.prenom?.charAt(0) || 'E'}
              </div>
              <div className="text-left leading-tight">
                <p className="font-semibold text-white text-xs truncate max-w-[130px]">{user?.prenom} {user?.nom}</p>
                <p className="text-xs text-slate-300 font-mono">{user?.matricule}</p>
              </div>
            </div>

            {/* Commutateur de Rôle Compact (>= 1280px) */}
            <div className="hidden xl:flex items-center gap-1.5 bg-black/20 p-1 rounded-xl border border-white/10 text-xs">
              <button
                onClick={() => {
                  quickLogin('COMMISSION');
                  navigate('/commission/dashboard');
                }}
                className="px-2.5 py-1 rounded-lg text-slate-200 hover:text-white hover:bg-white/10 text-xs font-semibold transition cursor-pointer"
                title="Basculer vers l'espace Commission"
              >
                Commission
              </button>
              <button
                onClick={() => {
                  quickLogin('ADMIN');
                  navigate('/admin/dashboard');
                }}
                className="px-2.5 py-1 rounded-lg bg-gold/25 text-gold-light hover:bg-gold/35 text-xs font-bold transition border border-gold/30 cursor-pointer"
                title="Basculer vers l'espace Administration"
              >
                Admin
              </button>
            </div>

            <button
              onClick={logout}
              className="p-2 sm:p-1.5 rounded-lg text-slate-300 hover:text-rose-200 hover:bg-rose-950/40 transition border border-transparent hover:border-rose-900/40 min-h-[40px] min-w-[40px] flex items-center justify-center"
              title="Déconnexion"
              aria-label="Déconnexion"
            >
              <LogOut className="w-4 h-4" />
            </button>

            {/* Bouton Hamburger Mobile (visible < 1024px) */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-slate-200 hover:bg-white/10 min-h-[44px] min-w-[44px] flex items-center justify-center"
              aria-label="Ouvrir le menu de navigation"
            >
              {mobileMenuOpen ? <X className="w-6 h-6 text-gold-light" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Menu Mobile Tiroir avec Overlay */}
        {mobileMenuOpen && (
          <div className="lg:hidden relative z-50">
            {/* Backdrop sombre */}
            <div
              className="fixed inset-0 bg-[#091B13]/75 backdrop-blur-xs transition-opacity duration-200"
              onClick={() => setMobileMenuOpen(false)}
            />

            {/* Tiroir déroulant */}
            <div className="relative border-t border-white/10 bg-[#0E291E] px-4 py-4 space-y-1 shadow-2xl max-h-[85vh] overflow-y-auto">
              <div className="pb-3 mb-2 border-b border-white/10 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-gold/20 flex items-center justify-center text-xs font-bold text-gold">
                    {user?.prenom?.charAt(0) || 'E'}
                  </div>
                  <div>
                    <span className="font-bold text-white block">{user?.prenom} {user?.nom}</span>
                    <span className="text-xs text-slate-300 font-mono">{user?.matricule} • Élève</span>
                  </div>
                </div>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1 rounded text-slate-400 hover:text-white"
                  aria-label="Fermer le menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {navLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <NavLink
                    key={link.to}
                    to={link.to}
                    onClick={() => setMobileMenuOpen(false)}
                    className={({ isActive }) =>
                      `flex items-center gap-3 px-3.5 py-3 rounded-xl text-sm font-medium transition min-h-[44px] ${
                        isActive
                          ? 'bg-white/15 text-white font-bold border-l-4 border-gold shadow-xs'
                          : 'text-slate-200 hover:bg-white/10 hover:text-white'
                      }`
                    }
                  >
                    <Icon className="w-4 h-4 text-gold shrink-0" />
                    <span>{link.label}</span>
                  </NavLink>
                );
              })}

              <div className="pt-3 mt-2 border-t border-white/10 space-y-2">
                <span className="text-xs uppercase font-bold text-gold/90 block px-2">
                  Accès rapides aux espaces :
                </span>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      quickLogin('COMMISSION');
                      navigate('/commission/dashboard');
                    }}
                    className="p-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold flex items-center justify-center gap-1.5 min-h-[44px]"
                  >
                    <Shield className="w-4 h-4 text-emerald-400" />
                    <span>Commission</span>
                  </button>
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      quickLogin('ADMIN');
                      navigate('/admin/dashboard');
                    }}
                    className="p-2.5 rounded-xl bg-gold/20 hover:bg-gold/30 text-gold-light border border-gold/30 text-xs font-bold flex items-center justify-center gap-1.5 min-h-[44px]"
                  >
                    <Shield className="w-4 h-4 text-gold" />
                    <span>Admin</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Contenu principal en plein écran responsive */}
      <main className="flex-1 w-full px-2 sm:px-4 md:px-6 lg:px-8 py-2 sm:py-3 min-w-0 flex flex-col">
        <Outlet />
      </main>

      {/* Pied de page sobre en pleine largeur */}
      <footer className="border-t border-slateSubtle-200 bg-white py-3.5 px-4 sm:px-6 lg:px-8 text-center text-xs text-slateSubtle-600 w-full">
        <p>ORIENT-GR • Gendarmerie Royale — Plateforme d'Orientation Professionnelle</p>
      </footer>
    </div>
  );
}
