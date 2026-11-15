import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FileQuestion, Home } from 'lucide-react';
import Button from '../../components/common/Button.jsx';
import { useAuth } from '../../context/AuthContext.jsx';

export default function NotFoundPage() {
  const navigate = useNavigate();
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-[#F7F8F5] flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-white rounded-2xl border border-slateSubtle-200 shadow-card p-8 text-center animate-fade-slide">
        <div className="w-16 h-16 rounded-2xl bg-cream-100 border border-slateSubtle-200 flex items-center justify-center text-gold mx-auto mb-4 shadow-2xs">
          <FileQuestion className="w-8 h-8 text-gold" />
        </div>

        <span className="text-xs font-bold uppercase tracking-widest text-gendarmerie bg-cream-100 px-3 py-1 rounded-full border border-slateSubtle-200 shadow-2xs">
          Code 404 • Page Non Trouvée
        </span>

        <h1 className="text-2xl font-bold text-gendarmerie mt-3 mb-2 font-serif">
          Document ou Ressource Inexistant
        </h1>

        <p className="text-xs text-slateSubtle-700 mb-6 leading-relaxed">
          La page demandée n'existe pas ou a été déplacée par l'administration du portail ORIENT-GR.
        </p>

        <Button
          variant="primary"
          icon={Home}
          onClick={() => navigate(user?.role === 'ADMIN' ? '/admin/dashboard' : '/eleve/dashboard')}
        >
          Retour au Portail
        </Button>
      </div>
    </div>
  );
}
