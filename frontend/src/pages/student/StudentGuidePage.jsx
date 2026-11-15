import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';
import { guideService } from '../../services/guideService.js';
import { workshopService } from '../../services/workshopService.js';
import {
  BookOpen,
  Compass,
  Shield,
  Users,
  Anchor,
  Plane,
  Scale,
  Microscope,
  Crosshair,
  Code,
  Server,
  ShieldAlert,
  Wrench,
  Cpu,
  Brain,
  Zap,
  Boxes,
  Radio,
  Search,
  X,
  ChevronRight,
  ArrowRight,
  Sparkles,
  Layers,
  Clock,
  Target,
  Award,
  AlertCircle,
  FileText,
  CheckCircle2,
  HelpCircle,
  TrendingUp,
  Laptop
} from 'lucide-react';
import LoadingSpinner from '../../components/common/LoadingSpinner.jsx';
import EmptyState from '../../components/common/EmptyState.jsx';
import SpecialtyImage from '../../components/common/SpecialtyImage.jsx';
import SpecialtyWorkspaceView from '../../components/academy/SpecialtyWorkspaceView.jsx';
import { GENDARMERIE_SPECIALTIES } from '../../data/gendarmerieSpecialtiesData.js';

// Dictionnaire des icônes dynamiques
const ICON_MAP = {
  Shield,
  Users,
  Anchor,
  Plane,
  Scale,
  Microscope,
  Crosshair,
  Code,
  Server,
  ShieldAlert,
  Wrench,
  Cpu,
  Brain,
  Zap,
  Boxes,
  Radio,
  Laptop
};

export default function StudentGuidePage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  // Données du catalogue officiel GUIDE (chargées depuis SQL Server via /api/guide)
  const [catalogueData, setCatalogueData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Spécialité opérationnelle active pour l'espace d'apprentissage en 6 étapes
  const [selectedSpecialtyId, setSelectedSpecialtyId] = useState(null);

  // Fiche détaillée d'un domaine technique sélectionné (Modal / vue immersive)
  const [activeDomainDetail, setActiveDomainDetail] = useState(null);

  // Filtre de catégorie : 'ALL' | 'OPERATIONNEL' | 'TECHNOLOGIQUE' | 'TECHNIQUE_LOGISTIQUE' | 'RECOMMANDE'
  const [activeCategoryFilter, setActiveCategoryFilter] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  // Chargement des données du catalogue GUIDE
  useEffect(() => {
    let isMounted = true;
    async function loadGuide() {
      setLoading(true);
      try {
        const data = await guideService.getCatalogue();
        if (isMounted && data) {
          setCatalogueData(data);
        }
      } catch (err) {
        console.error('Erreur chargement catalogue GUIDE:', err);
      } finally {
        if (isMounted) setLoading(false);
      }
    }
    loadGuide();
    return () => {
      isMounted = false;
    };
  }, [user]);

  // Gestion des paramètres d'URL (ex: ?domaine=DOM-DEV ou ?specialite=SPEC-TERR)
  useEffect(() => {
    const specParam = searchParams.get('specialite');
    const domParam = searchParams.get('domaine');

    if (specParam) {
      setSelectedSpecialtyId(specParam);
    }
    if (domParam && catalogueData) {
      const allDomaines = [
        ...(catalogueData.categories?.[1]?.items || []),
        ...(catalogueData.categories?.[2]?.items || [])
      ];
      const found = allDomaines.find((d) => d.Code === domParam || d.code === domParam);
      if (found) setActiveDomainDetail(found);
    }
  }, [searchParams, catalogueData]);

  // Extraction des listes d'éléments
  const specialitesOperationnelles = useMemo(() => {
    return catalogueData?.categories?.[0]?.items || [];
  }, [catalogueData]);

  const domainesTechnologiques = useMemo(() => {
    return catalogueData?.categories?.[1]?.items || [];
  }, [catalogueData]);

  const domainesTechniquesLogistiques = useMemo(() => {
    return catalogueData?.categories?.[2]?.items || [];
  }, [catalogueData]);

  // Filtrage combiné par recherche et catégorie
  const filterItem = (item) => {
    // 1. Filtre par recherche textuelle
    if (searchQuery.trim()) {
      const q = searchQuery.trim().toLowerCase();
      const codeMatch = (item.code || item.Code || '').toLowerCase().includes(q);
      const titleMatch = (item.titre || item.Titre || item.nomFr || '').toLowerCase().includes(q);
      const descMatch = (item.descriptionCourte || item.DescriptionCourte || item.presentation || '').toLowerCase().includes(q);
      const keywordsMatch = (item.MotsClesCompatibilite || []).some((kw) => kw.toLowerCase().includes(q));
      if (!codeMatch && !titleMatch && !descMatch && !keywordsMatch) {
        return false;
      }
    }

    // 2. Filtre par recommandation IA
    if (activeCategoryFilter === 'RECOMMANDE') {
      return Boolean(item.estRecommande || item.compatibilite >= 80);
    }

    return true;
  };

  const filteredOperationnelles = useMemo(() => {
    if (activeCategoryFilter !== 'ALL' && activeCategoryFilter !== 'OPERATIONNEL' && activeCategoryFilter !== 'RECOMMANDE') {
      return [];
    }
    return specialitesOperationnelles.filter(filterItem);
  }, [specialitesOperationnelles, activeCategoryFilter, searchQuery]);

  const filteredTechnologiques = useMemo(() => {
    if (activeCategoryFilter !== 'ALL' && activeCategoryFilter !== 'TECHNOLOGIQUE' && activeCategoryFilter !== 'RECOMMANDE') {
      return [];
    }
    return domainesTechnologiques.filter(filterItem);
  }, [domainesTechnologiques, activeCategoryFilter, searchQuery]);

  const filteredTechniquesLogistiques = useMemo(() => {
    if (activeCategoryFilter !== 'ALL' && activeCategoryFilter !== 'TECHNIQUE_LOGISTIQUE' && activeCategoryFilter !== 'RECOMMANDE') {
      return [];
    }
    return domainesTechniquesLogistiques.filter(filterItem);
  }, [domainesTechniquesLogistiques, activeCategoryFilter, searchQuery]);

  const totalVisibleCount =
    filteredOperationnelles.length + filteredTechnologiques.length + filteredTechniquesLogistiques.length;

  if (loading) {
    return <LoadingSpinner text="Chargement de votre GUIDE officiel..." fullPage />;
  }

  // VUE 1 : ESPACE DE FORMATION IMMERSIF POUR UNE SPÉCIALITÉ OPÉRATIONNELLE
  if (selectedSpecialtyId) {
    return (
      <div className="space-y-6 animate-fade-slide pb-16 w-full">
        <SpecialtyWorkspaceView
          specialtyId={selectedSpecialtyId}
          onBack={() => {
            setSelectedSpecialtyId(null);
            setSearchParams({}, { replace: true });
          }}
          onOpenOrientationComparison={() => {
            setSelectedSpecialtyId(null);
            navigate('/eleve/parcours-intelligent?tab=analysis');
          }}
        />
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-slide pb-16 w-full">
      {/* ========================================================================= */}
      {/* 1. EN-TÊTE OFFICIEL : GUIDE                                              */}
      {/* ========================================================================= */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-7 shadow-xs flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div className="space-y-2 max-w-3xl">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 animate-pulse" />
            <span className="text-xs uppercase tracking-wider font-bold text-gendarmerie font-mono">
              Gendarmerie Royale • ORIENT-GR
            </span>
            <span className="px-2.5 py-0.5 rounded-full bg-gold/15 text-gold-dark text-xs font-mono font-bold border border-gold/30">
              GUIDE OFFICIEL
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold font-serif text-gendarmerie tracking-tight">
            GUIDE
          </h1>

          <p className="text-base font-semibold text-gold-dark italic">
            « Découvrez les spécialités et les domaines professionnels de la Gendarmerie Royale. »
          </p>

          <p className="text-sm text-slate-600 leading-relaxed pt-0.5">
            Espace central de découverte, d'information et d'orientation de l'élève. Explorez les{' '}
            <strong className="text-slate-800">7 spécialités opérationnelles</strong> de la Gendarmerie Royale et les{' '}
            <strong className="text-slate-800">10 domaines techniques et professionnels</strong> pour bâtir votre projet de carrière.
          </p>
        </div>

        {/* Bouton d'action directe vers le Parcours IA */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={() => navigate('/eleve/parcours-intelligent')}
            className="inline-flex items-center justify-center gap-2.5 px-5 py-3 rounded-xl bg-[#153B2B] hover:bg-[#1C4E39] text-white font-bold text-sm shadow-xs transition-all cursor-pointer border border-gold/40"
          >
            <Sparkles className="w-4 h-4 text-gold" />
            <span>Mon Parcours IA (Entretien)</span>
            <ArrowRight className="w-4 h-4 text-white/80" />
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2. STATISTIQUES & CHIFFRES CLÉS DU CATALOGUE                             */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-2xs">
          <div className="flex items-center gap-2 text-slate-600 mb-1.5">
            <Layers className="w-4 h-4 text-gendarmerie" />
            <span className="text-xs uppercase font-bold tracking-wider">Catalogue Global</span>
          </div>
          <p className="text-2xl sm:text-3xl font-bold font-mono text-gendarmerie">
            {catalogueData?.statistiques?.totalEntrees || 17}
          </p>
          <span className="text-xs text-slate-500 mt-0.5 block">Filières & domaines répertoriés</span>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-2xs">
          <div className="flex items-center gap-2 text-emerald-800 mb-1.5">
            <Shield className="w-4 h-4 text-emerald-600" />
            <span className="text-xs uppercase font-bold tracking-wider">Spécialités</span>
          </div>
          <p className="text-2xl sm:text-3xl font-bold font-mono text-emerald-800">
            {catalogueData?.statistiques?.specialitesOperationnellesCount || 7}
          </p>
          <span className="text-xs text-slate-500 mt-0.5 block">Filières opérationnelles officielles</span>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-2xs">
          <div className="flex items-center gap-2 text-indigo-800 mb-1.5">
            <Cpu className="w-4 h-4 text-indigo-600" />
            <span className="text-xs uppercase font-bold tracking-wider">Technologie</span>
          </div>
          <p className="text-2xl sm:text-3xl font-bold font-mono text-indigo-800">
            {catalogueData?.statistiques?.domainesTechnologiquesCount || 6}
          </p>
          <span className="text-xs text-slate-500 mt-0.5 block">Domaines technologiques de pointe</span>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-2xs">
          <div className="flex items-center gap-2 text-amber-800 mb-1.5">
            <Wrench className="w-4 h-4 text-amber-600" />
            <span className="text-xs uppercase font-bold tracking-wider">Technique & Log.</span>
          </div>
          <p className="text-2xl sm:text-3xl font-bold font-mono text-amber-800">
            {catalogueData?.statistiques?.domainesTechniquesLogistiquesCount || 4}
          </p>
          <span className="text-xs text-slate-500 mt-0.5 block">Domaines techniques et soutien</span>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 3. BARRE DE FILTRES PAR CATÉGORIE & RECHERCHE                             */}
      {/* ========================================================================= */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3.5 bg-white p-4 rounded-2xl border border-slate-200/90 shadow-2xs">
        <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0 no-scrollbar w-full md:w-auto">
          {[
            { id: 'ALL', label: 'Toutes les filières (17)', icon: Layers },
            { id: 'OPERATIONNEL', label: 'Spécialités opérationnelles (7)', icon: Shield },
            { id: 'TECHNOLOGIQUE', label: 'Domaines technologiques (6)', icon: Cpu },
            { id: 'TECHNIQUE_LOGISTIQUE', label: 'Techniques & Logistique (4)', icon: Wrench },
            { id: 'RECOMMANDE', label: 'Recommandés par mon IA', icon: Sparkles }
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeCategoryFilter === tab.id;

            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveCategoryFilter(tab.id)}
                className={`inline-flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition whitespace-nowrap shrink-0 cursor-pointer ${
                  isActive
                    ? 'bg-gendarmerie text-white shadow-xs'
                    : 'text-slate-700 hover:bg-cream-100 hover:text-gendarmerie'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-gold' : 'text-slate-400'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Barre de recherche instantanée */}
        <div className="relative min-w-[260px]">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Rechercher une filière, mission, outil..."
            className="w-full pl-10 pr-8 py-2.5 text-sm rounded-xl border border-slate-200 bg-white focus:outline-hidden focus:border-gendarmerie"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 4. LES 3 CATÉGORIES VISUELLES DISTINCTES DU GUIDE                        */}
      {/* ========================================================================= */}
      {totalVisibleCount === 0 ? (
        <EmptyState
          icon={Search}
          title="Aucun domaine trouvé"
          description="Aucune filière ou spécialité ne correspond à vos critères de recherche actuels."
          actionText="Réinitialiser la recherche"
          onAction={() => {
            setSearchQuery('');
            setActiveCategoryFilter('ALL');
          }}
        />
      ) : (
        <div className="space-y-10">
          
          {/* --------------------------------------------------------------------- */}
          {/* CATÉGORIE 1 : SPÉCIALITÉS OPÉRATIONNELLES (7)                         */}
          {/* --------------------------------------------------------------------- */}
          {filteredOperationnelles.length > 0 && (
            <section className="space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-slateSubtle-200">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
                    <Shield className="w-4 h-4 text-emerald-700" />
                  </div>
                  <div>
                    <h2 className="text-lg sm:text-xl font-bold font-serif text-gendarmerie">
                      Spécialités opérationnelles
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-600">
                      Les 7 filières officielles de souveraineté, d'intervention et de sécurité publique de la Gendarmerie Royale.
                    </p>
                  </div>
                </div>
                <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-mono font-bold border border-emerald-200">
                  {filteredOperationnelles.length} spécialités
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                {filteredOperationnelles.map((spec) => {
                  const Icon = ICON_MAP[spec.icone] || Shield;

                  return (
                    <div
                      key={spec.id || spec.code}
                      className="bg-white rounded-2xl border border-slateSubtle-200 shadow-2xs hover:shadow-card hover:border-gold/50 transition-all duration-200 flex flex-col justify-between overflow-hidden group"
                    >
                      <div className="relative w-full aspect-video sm:h-[180px] overflow-hidden bg-slate-900 rounded-t-2xl">
                        <SpecialtyImage
                          src={spec.imageUrl || spec.image?.url}
                          alt={spec.titre || spec.nomFr}
                          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 brightness-95"
                          aspectRatio="aspect-video"
                          heightClass="h-full"
                          icon={Icon}
                          badgeText={spec.code}
                          title={spec.titre || spec.nomFr}
                          arabicTitle={spec.titreAr || spec.nomAr}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent pointer-events-none" />

                        {/* Badge de code officiel */}
                        <div className="absolute top-3 left-3 flex items-center gap-1.5 z-10">
                          <span className={`px-2.5 py-1 rounded-full text-xs font-extrabold border shadow-xs ${spec.badgeClass}`}>
                            {spec.code}
                          </span>
                        </div>

                        {/* Badge de recommandation IA si présent */}
                        {spec.compatibilite >= 80 && (
                          <div className="absolute top-3 right-3 z-10">
                            <span className="px-2.5 py-0.5 rounded-full bg-gold text-[#153B2B] text-xs font-bold shadow-xs flex items-center gap-1">
                              <Sparkles className="w-3.5 h-3.5 text-[#153B2B]" />
                              <span>{spec.compatibilite}% Compatibilité</span>
                            </span>
                          </div>
                        )}

                        {/* Titre incrusté en bas */}
                        <div className="absolute bottom-3 inset-x-3 text-white space-y-0.5 z-10 pointer-events-none">
                          <h3 className="text-base font-bold font-serif leading-tight">
                            {spec.titre || spec.nomFr}
                          </h3>
                          <p className="text-xs text-gold-light font-arabic" dir="rtl">
                            {spec.titreAr || spec.nomAr}
                          </p>
                        </div>
                      </div>

                      {/* Corps de la carte */}
                      <div className="p-4 space-y-3 flex-1 flex flex-col justify-between">
                        <div className="space-y-2">
                          <p className="text-xs sm:text-sm text-slate-600 line-clamp-2 leading-relaxed">
                            {spec.descriptionCourte || spec.presentation}
                          </p>
                        </div>

                        {/* Métadonnées & cursus */}
                        <div className="pt-2 border-t border-slateSubtle-100 flex items-center justify-between text-xs text-slate-600">
                          <div className="flex items-center gap-1.5 font-medium">
                            <BookOpen className="w-3.5 h-3.5 text-gold-dark" />
                            <span>Cursus 6 étapes</span>
                          </div>
                          <div className="flex items-center gap-1.5 font-semibold text-emerald-800">
                            <Award className="w-3.5 h-3.5 text-emerald-700" />
                            <span>Filière officielle</span>
                          </div>
                        </div>
                      </div>

                      {/* Bouton d'accès */}
                      <div className="p-4 pt-0">
                        <button
                          type="button"
                          onClick={() => {
                            setSelectedSpecialtyId(spec.id || spec.code);
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                          }}
                          className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gendarmerie hover:bg-[#1A4533] text-white font-bold text-xs sm:text-sm shadow-xs transition group-hover:bg-[#1A4533] cursor-pointer"
                        >
                          <span>Entrer dans l'Académie</span>
                          <ChevronRight className="w-4 h-4 text-gold-light group-hover:translate-x-0.5 transition-transform" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          )}

          {/* --------------------------------------------------------------------- */}
          {/* CATÉGORIE 2 : DOMAINES TECHNOLOGIQUES (6)                             */}
          {/* --------------------------------------------------------------------- */}
          {filteredTechnologiques.length > 0 && (
            <section className="space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-slateSubtle-200">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
                    <Cpu className="w-4 h-4 text-emerald-700" />
                  </div>
                  <div>
                    <h2 className="text-lg sm:text-xl font-bold font-serif text-gendarmerie">
                      Domaines technologiques
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-600">
                      Systèmes d'information, cyberdéfense, data intelligence, robotique et télécommunications tactiques.
                    </p>
                  </div>
                </div>
                <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-mono font-bold border border-emerald-200">
                  {filteredTechnologiques.length} domaines
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                {filteredTechnologiques.map((dom) => {
                  const Icon = ICON_MAP[dom.Icone || dom.icone] || Cpu;
                  const domCode = dom.Code || dom.code || '';
                  const imageFileName = domCode.toLowerCase();

                  return (
                    <div
                      key={dom.Code || dom.code}
                      className="bg-white rounded-2xl border border-slateSubtle-200 shadow-2xs hover:shadow-card hover:border-gold/50 transition-all duration-200 flex flex-col justify-between overflow-hidden group"
                    >
                      {/* Image / Visuel Vectoriel */}
                      <div className="relative w-full aspect-video sm:h-[180px] overflow-hidden bg-slate-900 rounded-t-2xl">
                        <SpecialtyImage
                          src={dom.ImageUrl || dom.imageUrl || `/images/ateliers/${imageFileName}.webp`}
                          fallbackSrc={`/images/ateliers/${imageFileName}.jpg`}
                          alt={dom.Titre || dom.titre}
                          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 brightness-95"
                          aspectRatio="aspect-video"
                          heightClass="h-full"
                          icon={Icon}
                          badgeText={dom.Code || dom.code}
                          title={dom.Titre || dom.titre}
                          arabicTitle={dom.TitreAr || dom.titreAr}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent pointer-events-none" />

                        {/* Badge de code officiel */}
                        <div className="absolute top-3 left-3 flex items-center gap-1.5 z-10">
                          <span className={`px-2.5 py-1 rounded-full text-xs font-extrabold border shadow-xs ${dom.BadgeClass || dom.badgeClass || 'bg-emerald-100 text-emerald-800 border-emerald-300'}`}>
                            {dom.Code || dom.code}
                          </span>
                        </div>

                        {/* Badge IA */}
                        {dom.compatibilite && (
                          <div className="absolute top-3 right-3 z-10">
                            <span className="px-2.5 py-0.5 rounded-full bg-gold text-[#153B2B] text-xs font-bold shadow-xs flex items-center gap-1">
                              <Sparkles className="w-3.5 h-3.5 text-[#153B2B]" />
                              <span>{dom.compatibilite}% Match IA</span>
                            </span>
                          </div>
                        )}

                        {/* Titre incrusté en bas */}
                        <div className="absolute bottom-3 inset-x-3 text-white space-y-0.5 z-10 pointer-events-none">
                          <h3 className="text-base font-bold font-serif leading-tight">
                            {dom.Titre || dom.titre}
                          </h3>
                          <p className="text-xs text-gold-light font-arabic" dir="rtl">
                            {dom.TitreAr || dom.titreAr}
                          </p>
                        </div>
                      </div>

                      {/* Corps de la carte */}
                      <div className="p-4 space-y-3 flex-1 flex flex-col justify-between">
                        <div className="space-y-2">
                          <p className="text-xs sm:text-sm text-slate-600 line-clamp-2 leading-relaxed">
                            {dom.DescriptionCourte || dom.descriptionCourte}
                          </p>
                        </div>

                        {/* Métadonnées & cursus (même design que les spécialités) */}
                        <div className="pt-2 border-t border-slateSubtle-100 flex items-center justify-between text-xs text-slate-600">
                          <div className="flex items-center gap-1.5 font-medium">
                            <BookOpen className="w-3.5 h-3.5 text-gold-dark" />
                            <span>Filière d'appui</span>
                          </div>
                          <div className="flex items-center gap-1.5 font-semibold text-emerald-800">
                            <Award className="w-3.5 h-3.5 text-emerald-700" />
                            <span>Support spécialisé</span>
                          </div>
                        </div>
                      </div>

                      {/* Bouton d'accès */}
                      <div className="p-4 pt-0">
                        <button
                          type="button"
                          onClick={() => setActiveDomainDetail(dom)}
                          className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gendarmerie hover:bg-[#1A4533] text-white font-bold text-xs sm:text-sm shadow-xs transition group-hover:bg-[#1A4533] cursor-pointer"
                        >
                          <span>Fiche détaillée du domaine</span>
                          <ChevronRight className="w-4 h-4 text-gold-light group-hover:translate-x-0.5 transition-transform" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          )}

          {/* --------------------------------------------------------------------- */}
          {/* CATÉGORIE 3 : DOMAINES TECHNIQUES ET LOGISTIQUES (4)                  */}
          {/* --------------------------------------------------------------------- */}
          {filteredTechniquesLogistiques.length > 0 && (
            <section className="space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-slateSubtle-200">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
                    <Wrench className="w-4 h-4 text-emerald-700" />
                  </div>
                  <div>
                    <h2 className="text-lg sm:text-xl font-bold font-serif text-gendarmerie">
                      Domaines techniques et logistiques
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-600">
                      Maintien en condition opérationnelle, électronique de bord, autonomie énergétique et logistique sensible.
                    </p>
                  </div>
                </div>
                <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-mono font-bold border border-emerald-200">
                  {filteredTechniquesLogistiques.length} domaines
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                {filteredTechniquesLogistiques.map((dom) => {
                  const Icon = ICON_MAP[dom.Icone || dom.icone] || Wrench;
                  const domCode = dom.Code || dom.code || '';
                  const imageFileName = domCode.toLowerCase();

                  return (
                    <div
                      key={dom.Code || dom.code}
                      className="bg-white rounded-2xl border border-slateSubtle-200 shadow-2xs hover:shadow-card hover:border-gold/50 transition-all duration-200 flex flex-col justify-between overflow-hidden group"
                    >
                      {/* Image / Visuel Vectoriel */}
                      <div className="relative w-full aspect-video sm:h-[180px] overflow-hidden bg-slate-900 rounded-t-2xl">
                        <SpecialtyImage
                          src={dom.ImageUrl || dom.imageUrl || `/images/ateliers/${imageFileName}.webp`}
                          fallbackSrc={`/images/ateliers/${imageFileName}.jpg`}
                          alt={dom.Titre || dom.titre}
                          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 brightness-95"
                          aspectRatio="aspect-video"
                          heightClass="h-full"
                          icon={Icon}
                          badgeText={dom.Code || dom.code}
                          title={dom.Titre || dom.titre}
                          arabicTitle={dom.TitreAr || dom.titreAr}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent pointer-events-none" />

                        {/* Badge de code officiel */}
                        <div className="absolute top-3 left-3 flex items-center gap-1.5 z-10">
                          <span className={`px-2.5 py-1 rounded-full text-xs font-extrabold border shadow-xs ${dom.BadgeClass || dom.badgeClass || 'bg-emerald-100 text-emerald-800 border-emerald-300'}`}>
                            {dom.Code || dom.code}
                          </span>
                        </div>

                        {/* Badge IA */}
                        {dom.compatibilite && (
                          <div className="absolute top-3 right-3 z-10">
                            <span className="px-2.5 py-0.5 rounded-full bg-gold text-[#153B2B] text-xs font-bold shadow-xs flex items-center gap-1">
                              <Sparkles className="w-3.5 h-3.5 text-[#153B2B]" />
                              <span>{dom.compatibilite}% Match IA</span>
                            </span>
                          </div>
                        )}

                        {/* Titre incrusté en bas */}
                        <div className="absolute bottom-3 inset-x-3 text-white space-y-0.5 z-10 pointer-events-none">
                          <h3 className="text-base font-bold font-serif leading-tight">
                            {dom.Titre || dom.titre}
                          </h3>
                          <p className="text-xs text-gold-light font-arabic" dir="rtl">
                            {dom.TitreAr || dom.titreAr}
                          </p>
                        </div>
                      </div>

                      {/* Corps de la carte */}
                      <div className="p-4 space-y-3 flex-1 flex flex-col justify-between">
                        <div className="space-y-2">
                          <p className="text-xs sm:text-sm text-slate-600 line-clamp-2 leading-relaxed">
                            {dom.DescriptionCourte || dom.descriptionCourte}
                          </p>
                        </div>

                        {/* Métadonnées & cursus (même design que les spécialités) */}
                        <div className="pt-2 border-t border-slateSubtle-100 flex items-center justify-between text-xs text-slate-600">
                          <div className="flex items-center gap-1.5 font-medium">
                            <BookOpen className="w-3.5 h-3.5 text-gold-dark" />
                            <span>Maintien en condition</span>
                          </div>
                          <div className="flex items-center gap-1.5 font-semibold text-emerald-800">
                            <Award className="w-3.5 h-3.5 text-emerald-700" />
                            <span>Soutien logistique</span>
                          </div>
                        </div>
                      </div>

                      {/* Bouton d'accès */}
                      <div className="p-4 pt-0">
                        <button
                          type="button"
                          onClick={() => setActiveDomainDetail(dom)}
                          className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gendarmerie hover:bg-[#1A4533] text-white font-bold text-xs sm:text-sm shadow-xs transition group-hover:bg-[#1A4533] cursor-pointer"
                        >
                          <span>Fiche détaillée du domaine</span>
                          <ChevronRight className="w-4 h-4 text-gold-light group-hover:translate-x-0.5 transition-transform" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          )}

        </div>
      )}

      {/* ========================================================================= */}
      {/* 5. MODAL / FICHE DÉTAILLÉE D'UN DOMAINE TECHNIQUE                        */}
      {/* ========================================================================= */}
      {activeDomainDetail && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in">
          <div className="bg-white rounded-3xl border border-slateSubtle-200 shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto flex flex-col animate-scale-up">
            
            {/* En-tête de la fiche détaillée */}
            <div className="sticky top-0 bg-[#153B2B] text-white p-6 rounded-t-3xl border-b border-gold/30 z-20 flex items-start justify-between gap-4">
              <div className="space-y-1.5">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-white/20 text-gold-light text-xs font-mono font-bold">
                    {activeDomainDetail.Code || activeDomainDetail.code}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-gold/20 text-gold text-xs font-bold">
                    {activeDomainDetail.Categorie === 'TECHNOLOGIQUE' ? 'Domaine Technologique' : 'Domaine Technique & Logistique'}
                  </span>
                </div>
                <h2 className="text-xl sm:text-2xl font-bold font-serif text-white tracking-tight">
                  {activeDomainDetail.Titre || activeDomainDetail.titre}
                </h2>
                <p className="text-sm text-gold-light font-arabic" dir="rtl">
                  {activeDomainDetail.TitreAr || activeDomainDetail.titreAr}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setActiveDomainDetail(null)}
                className="w-9 h-9 rounded-xl bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition cursor-pointer shrink-0"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Corps complet de la fiche */}
            <div className="p-6 space-y-6 flex-1 text-slate-800 text-sm leading-relaxed">
              
              {/* Badge IA et Explication personnalisée */}
              {activeDomainDetail.explicationIA && (
                <div className="p-4 rounded-2xl bg-gold/10 border border-gold/40 flex items-start gap-3">
                  <Sparkles className="w-5 h-5 text-[#153B2B] shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <span className="text-xs font-bold text-[#153B2B] uppercase tracking-wide">
                      Analyse de compatibilité avec votre profil IA ({activeDomainDetail.compatibilite || 80}%)
                    </span>
                    <p className="text-sm text-slate-700 leading-relaxed">
                      {activeDomainDetail.explicationIA}
                    </p>
                  </div>
                </div>
              )}

              {/* 1. Présentation du domaine */}
              <div className="space-y-2">
                <h3 className="text-sm font-bold text-gendarmerie uppercase tracking-wider flex items-center gap-2">
                  <FileText className="w-4 h-4 text-gold" />
                  <span>1. Présentation du domaine</span>
                </h3>
                <p className="text-sm text-slate-700 leading-relaxed bg-cream-50 p-4 rounded-2xl border border-slateSubtle-200">
                  {activeDomainDetail.Presentation || activeDomainDetail.presentation}
                </p>
              </div>

              {/* 2. Missions et activités possibles */}
              <div className="space-y-2">
                <h3 className="text-sm font-bold text-gendarmerie uppercase tracking-wider flex items-center gap-2">
                  <Target className="w-4 h-4 text-gold" />
                  <span>2. Missions et activités possibles</span>
                </h3>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-slate-700">
                  {(activeDomainDetail.Missions || activeDomainDetail.missions || []).map((m, i) => (
                    <li key={i} className="flex items-start gap-2 bg-white p-3 rounded-xl border border-slateSubtle-200 shadow-2xs">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{m}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* 3. Compétences techniques & Qualités personnelles */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <h3 className="text-sm font-bold text-gendarmerie uppercase tracking-wider flex items-center gap-2">
                    <Cpu className="w-4 h-4 text-gold" />
                    <span>3. Compétences nécessaires</span>
                  </h3>
                  <div className="space-y-2">
                    {(activeDomainDetail.CompetencesTechniques || activeDomainDetail.competencesTechniques || []).map((c, i) => (
                      <div key={i} className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-800 font-medium">
                        • {c}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="text-sm font-bold text-gendarmerie uppercase tracking-wider flex items-center gap-2">
                    <Shield className="w-4 h-4 text-gold" />
                    <span>4. Qualités personnelles utiles</span>
                  </h3>
                  <div className="space-y-2">
                    {(activeDomainDetail.QualitesPersonnelles || activeDomainDetail.qualitesPersonnelles || []).map((q, i) => (
                      <div key={i} className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-800 font-medium">
                        • {q}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* 5. Technologies et équipements & Exemples d'applications */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <h3 className="text-sm font-bold text-gendarmerie uppercase tracking-wider flex items-center gap-2">
                    <Laptop className="w-4 h-4 text-gold" />
                    <span>5. Technologies et équipements</span>
                  </h3>
                  <ul className="space-y-2 text-sm text-slate-700 bg-white p-4 rounded-2xl border border-slateSubtle-200">
                    {(activeDomainDetail.TechnologiesEquipements || activeDomainDetail.technologiesEquipements || []).map((t, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-gold font-bold">›</span>
                        <span>{t}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-2">
                  <h3 className="text-sm font-bold text-gendarmerie uppercase tracking-wider flex items-center gap-2">
                    <Award className="w-4 h-4 text-gold" />
                    <span>6. Exemples de métiers et d'applications</span>
                  </h3>
                  <ul className="space-y-2 text-sm text-slate-700 bg-white p-4 rounded-2xl border border-slateSubtle-200">
                    {(activeDomainDetail.ExemplesApplications || activeDomainDetail.exemplesApplications || []).map((e, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-emerald-600 font-bold">✓</span>
                        <span>{e}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* 7. Modules pédagogiques pour découvrir le domaine */}
              <div className="space-y-2">
                <h3 className="text-sm font-bold text-gendarmerie uppercase tracking-wider flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-gold" />
                  <span>7. Modules pédagogiques pour découvrir le domaine</span>
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {(activeDomainDetail.ModulesPedagogiques || activeDomainDetail.modulesPedagogiques || []).map((mod, i) => (
                    <div key={i} className="p-3.5 rounded-xl bg-cream-50 border border-slateSubtle-200 flex flex-col justify-between space-y-2">
                      <div className="space-y-1">
                        <span className="text-xs font-mono font-bold text-slate-400 block">{mod.id}</span>
                        <h4 className="text-sm font-bold text-gendarmerie leading-snug">{mod.titre}</h4>
                      </div>
                      <div className="flex items-center justify-between text-xs text-slateSubtle-600 pt-2 border-t border-slateSubtle-200/60">
                        <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {mod.duree}</span>
                        <span className="font-semibold text-gendarmerie">{mod.difficulte}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* RÈGLE DÉONTOLOGIQUE ET LÉGALE STRICTE */}
              <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <span className="text-xs font-bold text-amber-800 uppercase tracking-wide">
                    Information Déontologique Officielle
                  </span>
                  <p className="text-sm text-amber-900 leading-relaxed">
                    Les 10 domaines techniques et professionnels présentés dans le GUIDE sont des catégories pédagogiques de découverte et d'évaluation des compétences. Ils ne constituent pas des affectations officielles autonomes de la Gendarmerie Royale. Les décisions finales d'affectation et de sélection relèvent exclusivement de l'ADMIN et des commissions officielles compétentes.
                  </p>
                </div>
              </div>

            </div>

            {/* Pied de page de la fiche */}
            <div className="p-4 bg-slate-50 border-t border-slateSubtle-200 rounded-b-3xl flex flex-col sm:flex-row items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => setActiveDomainDetail(null)}
                className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 text-xs sm:text-sm font-semibold cursor-pointer"
              >
                Fermer la fiche
              </button>

              <button
                type="button"
                onClick={() => {
                  const domainName = activeDomainDetail.Titre || activeDomainDetail.titre || '';
                  setActiveDomainDetail(null);
                  navigate(`/eleve/parcours-intelligent?sujet=${encodeURIComponent(domainName)}`);
                }}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#153B2B] hover:bg-[#1C4E39] text-white font-bold text-xs sm:text-sm shadow-xs cursor-pointer border border-gold/30"
              >
                <Sparkles className="w-4 h-4 text-gold" />
                <span>Approfondir ce domaine dans mon entretien IA</span>
                <ArrowRight className="w-4 h-4 text-white" />
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
