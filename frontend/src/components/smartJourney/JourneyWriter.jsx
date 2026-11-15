import React, { useState } from 'react';
import {
  BookOpen,
  Briefcase,
  Trophy,
  Cpu,
  Languages,
  ShieldAlert,
  FileText,
  Save,
  Sparkles,
  ChevronDown,
  ChevronUp,
  CheckCircle2,
  Info,
  HelpCircle,
  Globe
} from 'lucide-react';

export default function JourneyWriter({
  journeyData,
  onSave,
  onStartInterview,
  isSaving
}) {
  const [bioLibre, setBioLibre] = useState(journeyData?.bioLibre || '');
  const [sections, setSections] = useState({
    scolaire: journeyData?.sections?.scolaire || '',
    professionnel: journeyData?.sections?.professionnel || '',
    sportAssociatif: journeyData?.sections?.sportAssociatif || '',
    competencesTechniques: journeyData?.sections?.competencesTechniques || '',
    languesCentresInteret: journeyData?.sections?.languesCentresInteret || '',
    responsabilitesEtDefis: journeyData?.sections?.responsabilitesEtDefis || '',
    autresExperiences: journeyData?.sections?.autresExperiences || ''
  });

  const [activeTab, setActiveTab] = useState('libre'); // 'libre' | 'guide'
  const [expandedSection, setExpandedSection] = useState('scolaire');

  const handleSectionChange = (key, value) => {
    setSections(prev => ({ ...prev, [key]: value }));
  };

  const handleSaveAll = (triggerAnalysis = false) => {
    onSave({
      bioLibre,
      sections
    }, triggerAnalysis);
  };

  const SECTIONS_CONFIG = [
    {
      key: 'scolaire',
      label: 'Parcours Scolaire & Diplômes',
      labelAr: 'المسار الدراسي، الشهادات والتكوينات',
      icon: BookOpen,
      placeholder: "Ex: Bac Sciences Physiques mention Bien, Licence en Droit Privé à Rabat, formation en réseaux informatiques à l'OFPPT, etc. / باك علوم، إجازة في القانون، ديبلوم في المعلوميات...",
      description: "Vos diplômes, séries de baccalauréat, filières universitaires ou formations techniques."
    },
    {
      key: 'professionnel',
      label: 'Expériences Professionnelles & Stages',
      labelAr: 'التجارب المهنية، التدريب والمهام السابقة',
      icon: Briefcase,
      placeholder: "Ex: Stage technique de 6 mois dans une entreprise de télécoms, travail saisonnier en logistique, technicien de maintenance, etc. / سطاج ف شركة، خدمة سابقة ف الميكانيك...",
      description: "Emplois occupés, stages d'observation, projets pratiques ou interventions techniques."
    },
    {
      key: 'sportAssociatif',
      label: 'Activités Sportives & Engagement Associatif',
      labelAr: 'الأنشطة الرياضية، الفنون القتالية والعمل الجمعوي',
      icon: Trophy,
      placeholder: "Ex: Ceinture noire en Taekwondo, pratique régulière de la course de fond, bénévole dans une association de bienfaisance, capitaine d'équipe de football... / الرياضة، فنون قتالية، تطوع ف جمعية...",
      description: "Disciplines sportives pratiquées, niveau de compétition, bénévolat et engagement social."
    },
    {
      key: 'competencesTechniques',
      label: 'Compétences Techniques & Savoir-Faire',
      labelAr: 'الكفاءات التقنية والمهارات الخاصة',
      icon: Cpu,
      placeholder: "Ex: Connaissance des systèmes Linux durcis, dépannage de pannes réseau, notions de mécanique moteur, maîtrise de la suite bureautique, premiers secours... / كنفهم ف الريزو، صيانة الحواسيب، الميكانيك...",
      description: "Outils que vous maîtrisez, compétences manuelles, informatiques ou procédurales."
    },
    {
      key: 'languesCentresInteret',
      label: 'Langues & Centres d\'Intérêt',
      labelAr: 'اللغات المتقنة والهوايات والاهتمامات',
      icon: Languages,
      placeholder: "Ex: Arabe courant, Français professionnel, Darija native, Anglais intermédiaire, passionné par la navigation maritime et la technologie... / العربية، الدارجة، الفرنسية، الإنجليزية، الشغف بالبحر...",
      description: "Langues parlées (arabe, français, darija, anglais, amazigh...) et vos passions."
    },
    {
      key: 'responsabilitesEtDefis',
      label: 'Responsabilités, Réussites & Difficultés Surmontées',
      labelAr: 'المسؤوليات، النجاحات والتحديات التي تجاوزتها',
      icon: ShieldAlert,
      placeholder: "Ex: Encadrement d'un groupe de jeunes lors d'une colonie, gestion d'un imprévu lors d'un projet, surmonter une blessure sportive, gestion du stress lors des examens... / موقف صعب تعاملت معاه، قيادة فريق...",
      description: "Situations où vous avez fait preuve de leadership, de sang-froid ou résolu un problème complexe."
    },
    {
      key: 'autresExperiences',
      label: 'Toute Autre Expérience Importante',
      labelAr: 'أي تجربة أو تفاصيل أخرى تعتبرها مهمة',
      icon: FileText,
      placeholder: "Tout élément supplémentaire qui vous tient à cœur et qui permet de mieux cerner votre personnalité et vos ambitions au sein de la Gendarmerie Royale...",
      description: "Toute information libre que vous jugez utile pour votre orientation."
    }
  ];

  return (
    <div className="bg-white rounded-2xl border border-slateSubtle-200 shadow-2xs p-5 sm:p-7 space-y-6">
      {/* En-tête de section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slateSubtle-100 pb-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-gold" />
            <span className="text-[11px] font-mono font-bold text-gold-dark uppercase tracking-wider">
              Espace d'Expression Libre & Authentique
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold font-serif text-gendarmerie">
            Racontez Votre Histoire & Vos Expériences
          </h2>
          <p className="text-xs sm:text-sm text-slateSubtle-600">
            Écrivez en toute liberté en français, arabe ou darija (ou un mélange des trois). L'IA analysera vos propos avec neutralité et bienveillance.
          </p>
        </div>

        {/* Indicateur de support linguistique */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-cream-100 border border-slateSubtle-200 text-xs font-semibold text-gendarmerie shrink-0 self-start sm:self-auto">
          <Globe className="w-3.5 h-3.5 text-gold-dark" />
          <span>Français • العربية • الدارجة</span>
        </div>
      </div>

      {/* Commutateur de mode : Récit global continu vs Formulaire thématique guidé */}
      <div className="flex items-center gap-2 p-1 bg-cream-100 rounded-xl max-w-md">
        <button
          type="button"
          onClick={() => setActiveTab('libre')}
          className={`flex-1 py-2 px-3 rounded-lg text-xs font-bold transition cursor-pointer ${
            activeTab === 'libre'
              ? 'bg-gendarmerie text-white shadow-xs'
              : 'text-slateSubtle-700 hover:text-gendarmerie'
          }`}
        >
          Récit Continu Libre
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('guide')}
          className={`flex-1 py-2 px-3 rounded-lg text-xs font-bold transition cursor-pointer ${
            activeTab === 'guide'
              ? 'bg-gendarmerie text-white shadow-xs'
              : 'text-slateSubtle-700 hover:text-gendarmerie'
          }`}
        >
          Sections Thématiques Guidées (7 volets)
        </button>
      </div>

      {/* VUE 1 : RÉCIT CONTINU LIBRE */}
      {activeTab === 'libre' && (
        <div className="space-y-4 animate-fade-slide">
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs text-slateSubtle-600">
              <label htmlFor="bioLibre" className="font-bold text-gendarmerie">
                Votre récit de vie, compétences et aspirations :
              </label>
              <span className="font-mono text-[11px] text-slateSubtle-500">
                {bioLibre.length} caractères saisis
              </span>
            </div>

            <textarea
              id="bioLibre"
              rows={10}
              value={bioLibre}
              onChange={(e) => setBioLibre(e.target.value)}
              placeholder="Racontez votre parcours : vos études, ce qui vous passionne, vos expériences de travail ou stages, vos activités sportives, vos qualités personnelles et pourquoi vous souhaitez vous spécialiser dans une branche particulière de la Gendarmerie Royale...
اكتب بحرية عن مسارك الدراسي، تجاربك، الرياضة اللي كتمارسها، وشنو التخصص اللي كتحلم بيه فالدرك الملكي..."
              className="w-full text-xs sm:text-sm p-4 rounded-xl border border-slateSubtle-200 bg-white text-slateSubtle-800 placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-gold/30 focus:border-gendarmerie leading-relaxed font-sans"
              dir="auto"
            />
          </div>

          <div className="p-3.5 rounded-xl bg-cream-50 border border-slateSubtle-200 text-xs text-slateSubtle-700 flex items-start gap-2.5">
            <Info className="w-4 h-4 text-gold-dark shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              <strong>Conseil de l'Académie :</strong> Mentionnez des faits concrets, des projets réalisés ou des défis surmontés. Plus votre récit est authentique et détaillé, plus l'entretien avec l'IA sera personnalisé et pertinent.
            </p>
          </div>
        </div>
      )}

      {/* VUE 2 : SECTIONS THÉMATIQUES GUIDÉES */}
      {activeTab === 'guide' && (
        <div className="space-y-3 animate-fade-slide">
          {SECTIONS_CONFIG.map((sec) => {
            const Icon = sec.icon;
            const isExpanded = expandedSection === sec.key;
            const content = sections[sec.key] || '';
            const isFilled = content.trim().length > 0;

            return (
              <div
                key={sec.key}
                className="border border-slateSubtle-200 rounded-xl overflow-hidden bg-white transition"
              >
                <button
                  type="button"
                  onClick={() => setExpandedSection(isExpanded ? null : sec.key)}
                  className="w-full p-4 flex items-center justify-between gap-3 text-left hover:bg-cream-50/50 transition cursor-pointer"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                      isFilled ? 'bg-emerald-100 text-emerald-800' : 'bg-cream-100 text-gendarmerie'
                    }`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-xs sm:text-sm font-bold text-gendarmerie">
                          {sec.label}
                        </span>
                        {isFilled && (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                            <CheckCircle2 className="w-3 h-3" />
                            <span>Renseigné</span>
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-slateSubtle-500 font-arabic truncate mt-0.5" dir="rtl">
                        {sec.labelAr}
                      </p>
                    </div>
                  </div>

                  {isExpanded ? (
                    <ChevronUp className="w-4 h-4 text-slateSubtle-400" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-slateSubtle-400" />
                  )}
                </button>

                {isExpanded && (
                  <div className="p-4 pt-1 border-t border-slateSubtle-100 bg-cream-50/30 space-y-2 animate-fade-slide">
                    <p className="text-xs text-slateSubtle-600">
                      {sec.description}
                    </p>
                    <textarea
                      rows={4}
                      value={sections[sec.key] || ''}
                      onChange={(e) => handleSectionChange(sec.key, e.target.value)}
                      placeholder={sec.placeholder}
                      className="w-full text-xs sm:text-sm p-3.5 rounded-xl border border-slateSubtle-200 bg-white text-slateSubtle-800 placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-gold/30 focus:border-gendarmerie leading-relaxed"
                      dir="auto"
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Barre d'actions : Sauvegarde & Démarrage de l'entretien IA */}
      <div className="pt-4 border-t border-slateSubtle-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <button
          type="button"
          disabled={isSaving}
          onClick={() => handleSaveAll(false)}
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl border border-slateSubtle-200 bg-white hover:bg-cream-100 text-slateSubtle-800 text-xs font-bold transition shadow-2xs cursor-pointer"
        >
          <Save className="w-4 h-4 text-gold-dark" />
          <span>{isSaving ? 'Enregistrement...' : 'Enregistrer mon brouillon'}</span>
        </button>

        <button
          type="button"
          onClick={() => {
            handleSaveAll(true);
            onStartInterview();
          }}
          className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-gendarmerie hover:bg-gendarmerie-light text-white text-xs font-bold transition shadow-xs cursor-pointer"
        >
          <Sparkles className="w-4 h-4 text-gold-light animate-pulse" />
          <span>Lancer l'Entretien Intelligent avec l'IA</span>
        </button>
      </div>
    </div>
  );
}

