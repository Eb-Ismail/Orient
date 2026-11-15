# ORIENT-GR • Plateforme d'Orientation & d'Aide à la Décision
### Direction Générale de la Gendarmerie Nationale (DGGN) — Écoles de Gendarmerie

**ORIENT-GR** est une plateforme web institutionnelle, robuste et sécurisée conçue pour analyser et orienter les aptitudes professionnelles des élèves gendarmes à l'issue de leur formation initiale.

> **Principe fondamental :** Le système constitue un **outil consultatif d'aide à la décision** pour la commission d'affectation. Il ne remplace en aucun cas les arrêtés de nomination, les procédures officielles d'affectation ni les décrets réglementaires.

---

## 1. Composantes du Moteur Décisionnel

Le moteur d'orientation combine de manière multicritère et pondérée 5 dimensions :
1. **Les notes académiques existantes** (droit pénal, procédure pénale, déontologie, etc.).
2. **Les résultats aux tests d'aptitudes et de raisonnement** (logique, numérique, observation, rigueur, technique).
3. **Les compétences pratiques évaluées** par les instructeurs (tir, conduite opérationnelle, maîtrise du stress).
4. **Les préférences professionnelles de l'élève** (recueillies et analysées **séparément** de l'évaluation objective des compétences).
5. **Les conditions d'éligibilité propres à chaque spécialité**.

---

## 2. Spécialités Gérées Dynamiquement

L'administrateur gère l'ensemble des spécialités et catégories de travail de l'institution, notamment :
- **Police de la route** (`SPEC-ROUTE`)
- **Police judiciaire** (`SPEC-PJ`)
- **Informatique** (`SPEC-INFO`)
- **Secrétariat informatique** (`SPEC-SEC-INFO`)
- **Secrétariat administratif** (`SPEC-SEC-ADMIN`)
- **Instructeur d'école** (`SPEC-INSTR`)
- **Garde** (`SPEC-GARDE`)
- **Gendarmerie mobile** (`SPEC-GM`)
- **MOTARD** (`SPEC-MOTARD`)
- **GEH (Groupe des Escortes d'Honneur)** (`SPEC-GEH`)
- **GSI (Groupe Spécialisé d'Intervention)** (`SPEC-GSI`)
- **Spécialités scientifiques et techniques** (`SPEC-TECH`)
- Spécialités d'intervention (PSIG Sabre, Secours Montagne, Maritime, etc.) et spécialités personnalisées ajoutées par l'administrateur.

Chaque spécialité est configurée avec :
- Un identifiant et un code unique.
- Un intitulé et une description institutionnelle.
- Les compétences attendues et matières pertinentes.
- Des pondérations configurables et validées (somme = 100%) :
  - **Poids Notes Académiques** (par défaut 25%)
  - **Poids Raisonnement & Analyse** (par défaut 30%)
  - **Poids Compétences Spécifiques** (par défaut 25%)
  - **Poids Situations Professionnelles** (par défaut 20%)
- Des conditions d'éligibilité obligatoires ou indicatives.
- Un statut actif ou inactif.

---

## 3. Conditions d'Éligibilité & Gestion des 3 États

L'évaluation de chaque condition repose sur un modèle à **trois états distincts** :

| Statut Système | Libellé Affiché | Règle Métier |
| :--- | :--- | :--- |
| `SATISFAITE` | **« Condition satisfaite »** | Condition officielle validée et seuil atteint par l'élève. |
| `NON_SATISFAITE` | **« Condition non satisfaite »** | Condition officielle validée dont le seuil requis n'est pas atteint. |
| `A_VERIFIER` | **« Condition à vérifier »** | Donnée absente/non renseignée **OU** condition non encore validée officiellement (statut provisoire). |

> **Règles déontologiques strictes :**
> - **Une information manquante n'est JAMAIS assimilée à un échec.** Elle est classée comme « Condition à vérifier ».
> - **Aucun critère médical ou seuil de poids inventé** : le poids n'est jamais évalué sur la seule base d'un IMC générique. Seul le médecin militaire est compétent.
> - **Paramètre configurable de démonstration** : Pour `MOTARD`, `GEH` et `GSI`, une taille minimale de **180 cm** a été intégrée provisoirement dans l'environnement de démonstration à titre indicatif selon les spécifications du commanditaire. Elle porte le statut explicite `PROVISOIRE_DEMO` et est systématiquement étiquetée « Condition à vérifier » avec un avertissement de non-officialité.

---

## 4. Banque de Questions Sécurisée & Structure des Tests

- **Gestion complète (CRUD & Archivage)** : création, modification, archivage logique (pour ne jamais corrompre l'historique), activation/désactivation.
- **Typologies de questions** :
  - Questions objectives (QCM, matrices visuelles SVG, schémas de progression tactique).
  - Questions de mise en situation opérationnelle subjectives (rédaction libre évaluée séparément par un instructeur avec barème critérié).
- **Sécurité Anti-Fraude** :
  - Les réponses correctes (`EstCorrecte`) et explications (`Explication`) sont **strictement purgées** côté serveur avant l'envoi au candidat.
- **Génération Reproductible (Audit)** :
  - Tirage aléatoire pseudo-aléatoire basé sur une graine (`SeedGeneration`), garantissant qu'une tentative donnée peut être auditée et rejouée à l'identique.
- **Chronomètre & Délais Côté Serveur** :
  - Le serveur calcule `DateFinMaxServeur` lors du démarrage de la tentative et rejette les soumissions hors délai.
  - Sauvegarde incrémentale temps réel (`POST /api/tests/:id/progress`) pour résister aux déconnexions réseau.
  - Tentatives clôturées strictement immuables (`Statut = TERMINE`).

---

## 5. Indice de Confiance & Recommandations

Pour chaque tentative, le moteur calcule :
- Le score brut et le pourcentage de réussite global.
- Le pourcentage par domaine de compétences (Logique, Numérique, Situationnel, Procédure, Observation, Technique).
- **L'indice de complétude des données disponibles** (0 à 100%) : alerte si le dossier de l'élève présente des données administratives ou médicales manquantes.
- Les compétences fortes observées et les axes à développer.
- Les avis d'éligibilité et facteurs d'adéquation pour chaque spécialité.
- **Une spécialité non éligible est explicitement marquée comme « Non immédiatement réalisable ».**

---

## 6. Architecture & Arborescence

```
orient-gr/
├── frontend/                     # React 18 + Vite + Tailwind CSS
│   ├── src/
│   │   ├── components/
│   │   │   ├── charts/           # Radar de compétences & BarChart Recharts
│   │   │   ├── common/           # Button, Card, Badge (3 états), Modal, Spinner
│   │   │   └── test/             # QuestionCard (QCM + rédaction), ProgressBar, Timer
│   │   ├── pages/
│   │   │   ├── admin/            # Dashboard, Élèves, Spécialités, Conditions, Questions, Tests
│   │   │   └── student/          # TestRunner, Résultats, Profil (Biométrie + Vœux)
│   │   ├── services/             # API client, testService, adminService, authService
│   │   └── ...
├── backend/                      # Next.js 14 App Router + Node.js
│   ├── app/api/                  # Endpoints REST sécurisés (Auth, Tests, Spécialités, etc.)
│   ├── lib/
│   │   ├── db.js                 # Pool SQL Server + Fallback MockStore résilient
│   │   └── mockData.js           # Données complètes de référence conformes au seed
│   ├── services/
│   │   ├── orientationEngine.js  # Moteur d'orientation multicritère & matching
│   │   ├── testService.js        # Gestion sécurisée des tests & sessions
│   │   └── studentService.js     # Profils, biométrie et vœux élèves
│   ├── sql/
│   │   ├── schema.sql            # Schéma relationnel complet SQL Server (T-SQL)
│   │   └── seed.sql              # Données de référence (13 spécialités, questions, etc.)
│   ├── tests/
│   │   └── run-all-tests.js      # Suite de tests automatisés (11/11 tests validés)
│   └── ...
└── README.md
```

---

## 7. Installation & Démarrage

### Prérequis
- **Node.js** (v18 ou supérieur, testé sous Node v24)
- **npm** (v9 ou supérieur)

### Backend (Next.js sur le port 5050 / 5000)
```bash
cd backend
npm install
npm test          # Exécute la suite de tests automatisés (11/11 passants)
npm run dev       # Démarre l'API en mode développement sur http://localhost:5050
```

### Frontend (React Vite sur le port 3000)
Dans un terminal séparé :
```bash
cd frontend
npm install
npm run build     # Valide la compilation de l'ensemble des modules
npm run dev       # Lance l'application sur http://localhost:3000
```

---

## 8. Comptes de Test Immédiats

| Rôle | Identifiant Militaire / E-mail | Mot de Passe | Profil & Contexte |
| :--- | :--- | :--- | :--- |
| **ADMIN** | `commandement@orient-gr.gendarmerie.fr` | `Gendarme2026!` | Accès complet commandement & paramétrage |
| **ELEVE** | `julien.moreau@eleve.gendarmerie.fr` | `Gendarme2026!` | 182 cm, Y=1, vœu n°1 PSIG Sabre |
| **ELEVE** | `clara.bernard@eleve.gendarmerie.fr` | `Gendarme2026!` | 167 cm, Y=1, vœu n°1 Police Judiciaire |
| **ELEVE** | `thomas.leroux@eleve.gendarmerie.fr` | `Gendarme2026!` | 184 cm, Y=2, vœu n°1 Motocycliste |
| **ELEVE** | `sarah.benali@eleve.gendarmerie.fr` | `Gendarme2026!` | 172 cm, Y=1, vœu n°1 Cybercriminalité |

---

## 9. Base de Données SQL Server & Mode Résilience

1. **Déploiement SQL Server** :
   - Exécuter `backend/sql/schema.sql` pour initialiser les tables relationnelles, contraintes, index et triggers d'audit.
   - Exécuter `backend/sql/seed.sql` pour injecter la nomenclature des spécialités, les conditions d'éligibilité officielles et de démonstration, les promotions, les comptes et la banque de questions.
2. **Mode Résilience Transparent** :
   - Si SQL Server n'est pas installé ou inaccessible localement, la variable `ENABLE_DB_MOCK_FALLBACK=true` permet à l'application de basculer instantanément sur un store en mémoire sans aucune dégradation fonctionnelle.

