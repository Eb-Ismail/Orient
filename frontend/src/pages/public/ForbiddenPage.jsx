import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldAlert, ArrowLeft, Home } from 'lucide-react';
import Button from '../../components/common/Button.jsx';
import { useAuth } from '../../context/AuthContext.jsx';

export default function ForbiddenPage() {
  const navigate = useNavigate();
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-[#F7F8F5] flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-white rounded-2xl border border-slateSubtle-200 shadow-card p-8 text-center animate-fade-slide">
        <div className="w-16 h-16 rounded-2xl bg-amber-50/80 border border-gold/30 flex items-center justify-center text-gold mx-auto mb-4 shadow-2xs">
          <ShieldAlert className="w-8 h-8 text-gold" />
        </div>

        <span className="text-xs font-bold uppercase tracking-widest text-amber-800 bg-amber-50 px-3 py-1 rounded-full border border-amber-200 shadow-2xs">
          Code 403 • Habilitation Insuffisante
        </span>

        <h1 className="text-2xl font-bold text-gendarmerie mt-3 mb-2 font-serif">
          Accès Réservé au Commandement
        </h1>

        <p className="text-xs text-slateSubtle-700 mb-6 leading-relaxed">
          Votre compte militaire ne dispose pas des privilèges nécessaires pour accéder à ce module administratif ou de notation.
        </p>

        <div className="flex gap-3 justify-center">
          <Button variant="outline" icon={ArrowLeft} onClick={() => navigate(-1)}>
            Retour
          </Button>
          <Button
            variant="primary"
            icon={Home}
            onClick={() => navigate(user?.role === 'ADMIN' ? '/admin/dashboard' : '/eleve/dashboard')}
          >
            Mon Espace
          </Button>
        </div>
      </div>
    </div>
  );
}
