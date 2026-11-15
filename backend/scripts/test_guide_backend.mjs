import { getDbPool } from '../lib/db.js';
import { guideService } from '../services/guideService.js';

async function testGuideBackend() {
  console.log('--- TEST BACKEND GUIDE SERVICE ---');
  const pool = await getDbPool();

  const catalogue = await guideService.getCatalogue(1); // Julien Moreau (UtilisateurId = 1)
  console.log('Nom officiel:', catalogue.nomOfficiel);
  console.log('Sous-titre:', catalogue.sousTitre);
  console.log('Statistiques:', catalogue.statistiques);
  console.log('Catégories:');
  catalogue.categories.forEach(c => {
    console.log(` - ${c.titre} (${c.items.length} éléments)`);
  });

  // Test détail d'un domaine technique
  const domDev = await guideService.getDetails('DOM-DEV', 1);
  console.log('\nDétail DOM-DEV:', {
    titre: domDev.Titre,
    categorie: domDev.Categorie,
    missionsCount: domDev.Missions?.length,
    competencesCount: domDev.CompetencesTechniques?.length,
    compatibilite: domDev.compatibilite,
    recommande: domDev.estRecommande,
    explicationIA: domDev.explicationIA
  });

  // Test détail d'une spécialité opérationnelle
  const specTerr = await guideService.getDetails('SPEC-TERR', 1);
  console.log('\nDétail SPEC-TERR:', {
    titre: specTerr.titre,
    categorie: specTerr.categorie,
    compatibilite: specTerr.compatibilite,
    recommande: specTerr.estRecommande
  });

  console.log('\n✅ TEST GUIDE SERVICE RÉUSSI AVEC SUCCÈS.');
  process.exit(0);
}

testGuideBackend().catch(err => {
  console.error('❌ Échec test guide backend:', err);
  process.exit(1);
});

