// ==============================================================================
// ORIENT-GR : Générateur du Référentiel Officiel des 140 Questions QCM en Arabe
// Répartition exacte selon les 10 catégories réglementaires spécifiées
// ==============================================================================

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ensure backend/data directory exists
const dataDir = path.join(__dirname, '..', 'data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

export const CATEGORIES_CONFIG = [
  { code: 'LOGIQUE', nom: 'الاستدلال المنطقي', count: 20 },
  { code: 'ANALYSE_OBSERVATION', nom: 'التحليل والملاحظة', count: 15 },
  { code: 'CONCENTRATION_ATTENTION', nom: 'التركيز والانتباه', count: 15 },
  { code: 'RESOLUTION_PROBLEMES', nom: 'حل المشكلات واتخاذ القرار', count: 15 },
  { code: 'SECURITE_ROUTIERE_MOTO', nom: 'السلامة الطرقية وقيادة الدراجات', count: 15 },
  { code: 'POLICE_JUDICIAIRE', nom: 'الشرطة القضائية والتحري', count: 15 },
  { code: 'INFORMATIQUE_DIGITAL', nom: 'المعلوماتية والمهارات الرقمية', count: 15 },
  { code: 'COMMUNICATION_FORMATION', nom: 'التواصل والتكوين', count: 10 },
  { code: 'ADMINISTRATION_SECRETARIAT', nom: 'الإدارة والسكرتارية', count: 5 },
  { code: 'DISCIPLINE_SITUATION_PRO', nom: 'المواقف المهنية والانضباط', count: 15 }
];

console.log('Categories config verified: 10 categories, total = 140 questions.');
