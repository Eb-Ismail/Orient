import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Compass,
  Award,
  Sparkles,
  ArrowRight,
  Shield,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  TrendingUp,
  FileText,
  Target,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  Check
} from 'lucide-react';

const SPECIALTY_IMAGES = {
  'SPEC-TERR': '/images/ateliers/gendarmerie-territoriale.webp',
  'SPEC-MOB': '/images/ateliers/gendarmerie-mobile.webp',
  'SPEC-MARIT': '/images/ateliers/gendarmerie-maritime.webp',
  'SPEC-AIR': '/images/ateliers/gendarmerie-aerienne.webp',
  'SPEC-PREV': '/images/ateliers/prevote-militaire.webp',
  'SPEC-PST': '/images/ateliers/police-scientifique.webp',
  'SPEC-INTERV': '/images/ateliers/unites-intervention.webp'
};

export default function PersonalizedOrientationCards({
  recommendations = [],
  avisCommissionAvertissement,
  onGoToAteliers
}) {
  const navigate = useNavigate();
  const [expandedCardId, setExpandedCardId] = useState(null);

  if (!recommendations || recommendations.length === 0) {
    return (
      <div className="bg-white rounded-2xl p-8 border border-slate-200 text-center space-y-3">
        <Compass className="w-10 h-10 text-slate-400 mx-auto" />
        <h3 className="text-base font-bold text-slate-800">Aucune recommandation disponible</h3>
        <p className="text-xs text-slate-500">
          Veuillez renseigner votre parcours ou passer l'entretien IA pour générer vos orientations personnalisées.
        </p>
      </div>
    );
  }

  const topMatch = recommendations[0];
  const otherMatches = recommendations.slice(1);

  const toggleExpand = (id) => {
    setExpandedCardId(prev => (prev === id ? null : id));
  };

  const handleExerciseClick = (url) => {
    if (onGoToAteliers) {
      onGoToAteliers();
    } else {
      navigate(url || '/eleve/ateliers');
    }
  };

  return (
    <div className="space-y-6">
      {/* En-tête Orientation */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#153B2B] text-gold border border-gold/30 flex items-center gap-1.5">
                <Compass className="w-3.5 h-3.5 text-gold" />
                Orientation Personnalisée
              </span>
              <span className="text-xs font-semibold text-slate-500">
                7 Spécialités de la Gendarmerie Royale analysées
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold font-serif text-slate-900 tracking-tight">
              Adéquation & Préconisations de Filières
            </h2>
            <p className="text-sm text-slate-600 max-w-2xl leading-relaxed">
              Classement prédictif basé sur la convergence entre vos diplômes, votre vécu personnel, vos compétences déclarées et vos résultats d'ateliers certifiés.
            </p>
          </div>

          <div className="text-right shrink-0">
            <span className="text-xs font-semibold text-slate-500 block">Orientation #1</span>
            <span className="text-base font-extrabold text-[#153B2B]">{topMatch?.nomFr}</span>
          </div>
        </div>
      </div>

      {/* TOP RECOMMANDATION - GRANDE CARTE VEDETTE */}
      {topMatch && (
        <div className="bg-gradient-to-br from-[#153B2B] to-[#1C4E39] rounded-2xl border-2 border-gold/60 text-white shadow-lg overflow-hidden relative">
          <div className="absolute top-0 right-0 w-80 h-80 bg-radial from-gold/20 to-transparent pointer-events-none -mr-20 -mt-20" />

          <div className="p-5 sm:p-7 relative z-10">
            {/* Badge Top Match */}
            <div className="flex items-center justify-between flex-wrap gap-2 mb-4">
              <span className="px-3 py-1 rounded-full text-xs font-black bg-gold text-[#153B2B] border border-gold-light flex items-center gap-1.5 shadow-xs">
                <Sparkles className="w-3.5 h-3.5" />
                Recommandation Prioritaire • Forte Adéquation
              </span>
              <span className="text-xs text-gold-light/90 font-medium">
                Indice de confiance : {topMatch.niveauConfiance}
              </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              {/* Illustration Spécialité */}
              <div className="lg:col-span-4 rounded-xl overflow-hidden border border-white/20 shadow-md relative group aspect-video lg:aspect-4/3">
                <img
                  src={SPECIALTY_IMAGES[topMatch.id] || topMatch.image?.url || '/images/ateliers/gendarmerie-territoriale.webp'}
                  alt={topMatch.nomFr}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => {
                    e.target.src = '/images/ateliers/gendarmerie-territoriale.webp';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <span className="text-xs font-mono uppercase tracking-wider text-gold-light">
                    {topMatch.code}
                  </span>
                  <p className="text-base font-bold truncate">{topMatch.nomFr}</p>
                </div>
              </div>

              {/* Contenu Analytique */}
              <div className="lg:col-span-8 space-y-4">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                      {topMatch.nomFr}
                    </h3>
                    <p className="text-sm text-gold-light font-sans font-medium" dir="rtl">
                      {topMatch.nomAr}
                    </p>
                  </div>

                  <div className="text-right shrink-0">
                    <span className="text-2xl sm:text-3xl font-black text-gold">
                      {topMatch.scoreCompatibilite}%
                    </span>
                    <span className="text-xs uppercase tracking-wider block text-slate-300">
                      Compatibilité
                    </span>
                  </div>
                </div>

                {/* Barre de compatibilité */}
                <div className="w-full bg-white/15 rounded-full h-2 overflow-hidden">
                  <div
                    className="bg-gold h-2 rounded-full transition-all duration-700"
                    style={{ width: `${topMatch.scoreCompatibilite}%` }}
                  />
                </div>

                {/* Raisons de l'adéquation */}
                <div className="space-y-1.5">
                  <span className="text-xs font-bold text-gold-light uppercase tracking-wider flex items-center gap-1.5">
                    <Target className="w-3.5 h-3.5 text-gold" />
                    Pourquoi cette filière correspond à votre profil :
                  </span>
                  <div className="space-y-1">
                    {topMatch.raisons?.map((r, i) => (
                      <p key={i} className="text-xs text-slate-200 leading-relaxed flex items-start gap-2">
                        <Check className="w-3.5 h-3.5 text-gold shrink-0 mt-0.5" />
                        <span>{r}</span>
                      </p>
                    ))}
                  </div>
                </div>

                {/* Justification par les expériences personnelles */}
                {topMatch.experiencesPersonnelles && topMatch.experiencesPersonnelles.length > 0 && (
                  <div className="p-3.5 rounded-xl bg-black/25 border border-white/10 space-y-1.5 text-xs sm:text-sm">
                    <span className="text-xs font-bold text-gold-light uppercase tracking-wider flex items-center gap-1.5">
                      <FileText className="w-3.5 h-3.5 text-gold" />
                      Expériences personnelles & cursus justifiant ce choix :
                    </span>
                    <ul className="space-y-1 text-slate-200">
                      {topMatch.experiencesPersonnelles.map((exp, ei) => (
                        <li key={ei} className="flex items-start gap-2">
                          <span className="text-gold font-bold">•</span>
                          <span>{exp}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Compétences concordantes & Résultats pratiques */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                  <div className="space-y-1.5">
                    <span className="text-xs text-slate-300 font-semibold block">Compétences détectées :</span>
                    <div className="flex flex-wrap gap-1.5">
                      {(topMatch.competencesDetectees || topMatch.competencesCorrespondantes || []).map((c, i) => (
                        <span
                          key={i}
                          className="px-2.5 py-1 text-xs rounded-md bg-white/10 text-white border border-white/20 font-medium"
                        >
                          {c}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <span className="text-xs text-slate-300 font-semibold block">Résultats des exercices pratiques :</span>
                    <div className="text-xs sm:text-sm text-gold-light bg-black/20 p-2.5 rounded-lg border border-white/10">
                      {topMatch.resultatsExercicesPratiques || "Ateliers en cours de réalisation"}
                    </div>
                  </div>
                </div>

                {/* Points forts et axes d'amélioration */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs pt-1">
                  {topMatch.pointsForts && (
                    <div className="p-3 rounded-lg bg-emerald-950/40 border border-emerald-500/30">
                      <span className="font-bold text-emerald-300 block mb-1">Points forts :</span>
                      <p className="text-slate-200 leading-relaxed">{Array.isArray(topMatch.pointsForts) ? topMatch.pointsForts.join(', ') : topMatch.pointsForts}</p>
                    </div>
                  )}
                  {topMatch.axesAmelioration && (
                    <div className="p-3 rounded-lg bg-amber-950/40 border border-amber-500/30">
                      <span className="font-bold text-amber-300 block mb-1">Axes de perfectionnement :</span>
                      <p className="text-slate-200 leading-relaxed">{Array.isArray(topMatch.axesAmelioration) ? topMatch.axesAmelioration.join(', ') : topMatch.axesAmelioration}</p>
                    </div>
                  )}
                </div>

                {/* Mention légale de validation humaine */}
                <div className="p-3 rounded-lg bg-black/35 border border-gold/30 text-xs text-slate-300 flex items-start gap-2 leading-relaxed">
                  <Shield className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                  <span>
                    <strong>Cadre décisionnel : </strong>
                    {topMatch.mentionValidationHumaine || "Hypothèse consultative générée par l'IA. La validation définitive relève exclusivement de la décision souveraine du Commandement de la Gendarmerie Royale."}
                  </span>
                </div>

                {/* Exercice de confirmation recommandé */}
                {topMatch.exercicesConfirmation && topMatch.exercicesConfirmation.length > 0 && (
                  <div className="pt-2 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-black/25 p-3.5 rounded-xl border border-white/15">
                    <div className="space-y-0.5">
                      <span className="text-[10px] uppercase font-bold tracking-wider text-gold">
                        Atelier Pratique Recommandé pour Valider ce Choix :
                      </span>
                      <p className="text-xs font-semibold text-white">
                        {topMatch.exercicesConfirmation[0].titre}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleExerciseClick(topMatch.exercicesConfirmation[0].url)}
                      className="px-3.5 py-1.5 rounded-lg bg-gold hover:bg-gold-light text-[#153B2B] text-xs font-bold flex items-center gap-1.5 transition-all shadow-xs shrink-0 cursor-pointer"
                    >
                      <span>Passer à l'atelier</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* AUTRES SPÉCIALITÉS ÉVALUÉES */}
      <div className="space-y-3">
        <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider flex items-center gap-2">
          <Shield className="w-4 h-4 text-[#153B2B]" />
          <span>Autres Domaines de la Gendarmerie Royale ({otherMatches.length})</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {otherMatches.map((spec) => {
            const isExpanded = expandedCardId === spec.id;
            const imgSrc = SPECIALTY_IMAGES[spec.id] || spec.image?.url || '/images/ateliers/gendarmerie-territoriale.webp';

            return (
              <div
                key={spec.id}
                className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs hover:shadow-xs transition-all overflow-hidden flex flex-col justify-between"
              >
                <div className="p-4 sm:p-5 space-y-3">
                  <div className="flex items-start gap-3.5">
                    {/* Miniature */}
                    <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden shrink-0 border border-slate-200 relative">
                      <img
                        src={imgSrc}
                        alt={spec.nomFr}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.src = '/images/ateliers/gendarmerie-territoriale.webp';
                        }}
                      />
                    </div>

                    {/* Titres & Score */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-[10px] font-mono font-bold text-slate-500 uppercase">
                          {spec.code}
                        </span>
                        <span className="text-sm font-black text-[#153B2B]">
                          {spec.scoreCompatibilite}%
                        </span>
                      </div>
                      <h4 className="text-sm sm:text-base font-bold text-slate-900 truncate">
                        {spec.nomFr}
                      </h4>
                      <p className="text-xs text-slate-500 font-sans truncate" dir="rtl">
                        {spec.nomAr}
                      </p>
                      <div className="w-full bg-slate-100 rounded-full h-1.5 mt-2 overflow-hidden">
                        <div
                          className="bg-[#153B2B] h-1.5 rounded-full"
                          style={{ width: `${spec.scoreCompatibilite}%` }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Justification courte */}
                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                    {spec.raisons?.[0] || "Domaine de compétence accessible sous condition d'aptitude."}
                  </p>

                  {/* Tags de compétences concordantes */}
                  <div className="flex flex-wrap gap-1">
                    {spec.competencesCorrespondantes?.slice(0, 3).map((comp, ci) => (
                      <span
                        key={ci}
                        className="px-2 py-0.5 text-[10px] font-medium bg-slate-100 text-slate-700 rounded-md border border-slate-200"
                      >
                        {comp}
                      </span>
                    ))}
                  </div>

                  {/* Accordéon détaillé si étendu */}
                  {isExpanded && (
                    <div className="pt-3 border-t border-slate-100 space-y-2.5 text-xs">
                      {/* Expériences personnelles */}
                      {spec.experiencesPersonnelles && spec.experiencesPersonnelles.length > 0 && (
                        <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
                          <span className="font-bold text-slate-800 text-[11px] block mb-1">
                            Expériences personnelles justifiant ce choix :
                          </span>
                          <ul className="space-y-0.5 text-slate-600 text-[11px]">
                            {spec.experiencesPersonnelles.map((exp, ei) => (
                              <li key={ei} className="flex items-start gap-1">
                                <span className="text-[#153B2B] font-bold">•</span>
                                <span>{exp}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Résultats des exercices pratiques */}
                      {spec.resultatsExercicesPratiques && (
                        <div className="p-2 rounded-lg bg-slate-50 border border-slate-200 text-[11px] text-slate-700">
                          <strong>Exercices pratiques :</strong> {spec.resultatsExercicesPratiques}
                        </div>
                      )}

                      {spec.pointsAmeliorer && spec.pointsAmeliorer.length > 0 && (
                        <div>
                          <span className="font-semibold text-amber-800 text-[11px] block mb-0.5">
                            Points à renforcer :
                          </span>
                          <ul className="list-disc list-inside space-y-0.5 text-slate-600 text-[11px]">
                            {spec.pointsAmeliorer.map((p, pi) => (
                              <li key={pi}>{p}</li>
                            ))}
                          </ul>
                        </div>
                      )}

                      <div className="p-2 rounded-lg bg-slate-100 text-[10px] text-slate-500">
                        <strong>Cadre consultatif : </strong> {spec.mentionValidationHumaine || "Hypothèse consultative IA. Validation définitive réservée au Commandement."}
                      </div>

                      {spec.exercicesConfirmation && spec.exercicesConfirmation.length > 0 && (
                        <div className="pt-1">
                          <button
                            type="button"
                            onClick={() => handleExerciseClick(spec.exercicesConfirmation[0].url)}
                            className="w-full py-1.5 px-3 rounded-lg bg-[#153B2B]/10 hover:bg-[#153B2B]/20 text-[#153B2B] font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                          >
                            <span>Atelier : {spec.exercicesConfirmation[0].titre}</span>
                            <ArrowRight className="w-3 h-3" />
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Footer Carte */}
                <div className="px-4 py-2 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-[11px] text-slate-500 font-medium">
                    Confiance : {spec.niveauConfiance}
                  </span>
                  <button
                    type="button"
                    onClick={() => toggleExpand(spec.id)}
                    className="text-[#153B2B] hover:text-[#1C4E39] font-bold text-xs flex items-center gap-1 cursor-pointer"
                  >
                    <span>{isExpanded ? 'Réduire' : 'Détails & Atelier'}</span>
                    {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Cadre Réglementaire & Déontologique */}
      <div className="p-4 rounded-xl bg-slate-100 border border-slate-200/90 text-xs text-slate-600 flex items-start gap-3">
        <Shield className="w-4 h-4 text-[#153B2B] shrink-0 mt-0.5" />
        <div className="space-y-1">
          <p className="font-bold text-slate-800">
            Cadre Déontologique et Décisionnel de la Commission d'Orientation
          </p>
          <p className="leading-relaxed">
            {avisCommissionAvertissement ||
              "Ce système constitue une aide à la décision pédagogique fondée sur le croisement entre déclarations de l'élève et résultats pratiques. Les orientations restent consultatives et n'engagent pas les décisions souveraines de nomination et d'affectation prises par le Commandement de la Gendarmerie Royale."}
          </p>
        </div>
      </div>
    </div>
  );
}

