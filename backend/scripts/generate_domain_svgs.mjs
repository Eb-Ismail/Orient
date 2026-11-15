import fs from 'fs';
import path from 'path';

const DOMAIN_GRAPHICS = [
  { file: 'dom-dev.webp', title: 'Informatique & Dév Logiciel', subtitle: 'Génie Logiciel & Systèmes d\'Information', color1: '#1E3A8A', color2: '#153B2B', icon: '💻' },
  { file: 'dom-sys.webp', title: 'Réseaux & Systèmes', subtitle: 'Infrastructures & Datacenters', color1: '#312E81', color2: '#153B2B', icon: '🖥️' },
  { file: 'dom-cyber.webp', title: 'Cybersécurité & SOC', subtitle: 'Défense Numérique & Investigation Forensique', color1: '#881337', color2: '#153B2B', icon: '🛡️' },
  { file: 'dom-meca.webp', title: 'Mécanique & Maintenance', subtitle: 'MCO Blindés & Véhicules Tactiques', color1: '#78350F', color2: '#153B2B', icon: '🔧' },
  { file: 'dom-elec-emb.webp', title: 'Électronique Embarquée', subtitle: 'Capteurs, Bus CAN & Systèmes de Bord', color1: '#134E4A', color2: '#153B2B', icon: '⚡' },
  { file: 'dom-drone.webp', title: 'Robotique & Drones', subtitle: 'Vecteurs Aériens & Télédétection', color1: '#164E63', color2: '#153B2B', icon: '🛸' },
  { file: 'dom-data-ia.webp', title: 'Data Science & IA', subtitle: 'Modélisation Prédictive & NLP', color1: '#581C87', color2: '#153B2B', icon: '🧠' },
  { file: 'dom-elec-diag.webp', title: 'Électricité & Énergie', subtitle: 'Groupes de Secours & Autonomie', color1: '#713F12', color2: '#153B2B', icon: '🔋' },
  { file: 'dom-logistique.webp', title: 'Logistique & Gestion Matériel', subtitle: 'Supply Chain & Traçabilité Sensible', color1: '#7C2D12', color2: '#153B2B', icon: '📦' },
  { file: 'dom-telecom.webp', title: 'Télécoms & Radiocommunication', subtitle: 'Réseaux Tactiques & Liaisons Satellite', color1: '#075985', color2: '#153B2B', icon: '📡' },
];

const targetDir = 'c:/Users/lenovo/Desktop/TC/orient-gr/frontend/public/images/ateliers';

for (const g of DOMAIN_GRAPHICS) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 450" width="800" height="450">
  <defs>
    <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${g.color1}"/>
      <stop offset="50%" stop-color="#0E291E"/>
      <stop offset="100%" stop-color="${g.color2}"/>
    </linearGradient>
    <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(212,175,55,0.08)" stroke-width="1"/>
    </pattern>
  </defs>
  <rect width="800" height="450" fill="url(#grad)"/>
  <rect width="800" height="450" fill="url(#grid)"/>
  
  <circle cx="400" cy="180" r="80" fill="rgba(212,175,55,0.12)" stroke="rgba(212,175,55,0.4)" stroke-width="2"/>
  <text x="400" y="200" font-size="64" text-anchor="middle" dominant-baseline="middle">${g.icon}</text>
  
  <text x="400" y="300" font-family="Georgia, serif" font-size="28" font-weight="bold" fill="#FFFFFF" text-anchor="middle" letter-spacing="0.5">${g.title}</text>
  <text x="400" y="335" font-family="Arial, sans-serif" font-size="15" fill="#D4AF37" text-anchor="middle" font-weight="600" letter-spacing="1">${g.subtitle.toUpperCase()}</text>
  
  <rect x="330" y="360" width="140" height="26" rx="13" fill="rgba(0,0,0,0.4)" stroke="rgba(212,175,55,0.3)" stroke-width="1"/>
  <text x="400" y="377" font-family="Arial, sans-serif" font-size="11" fill="#E5E7EB" text-anchor="middle" font-weight="bold">ORIENT-GR • GUIDE</text>
</svg>`;

  // Enregistrer comme svg pour fallback
  const svgPath = path.join(targetDir, g.file.replace('.webp', '.svg'));
  fs.writeFileSync(svgPath, svg, 'utf8');
}

console.log('✅ 10 illustrations vectorielles SVG créées dans public/images/ateliers.');

