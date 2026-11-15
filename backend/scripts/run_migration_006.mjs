import sql from 'mssql/msnodesqlv8.js';
import fs from 'fs';
import path from 'path';
import bcrypt from 'bcryptjs';

const config = {
  connectionString: 'Driver={ODBC Driver 17 for SQL Server};Server=.\\CLASS;Database=OrientGR_DB;Trusted_Connection=yes;'
};

async function run() {
  console.log('🚀 Démarrage de la migration 006 : Système de Commissions & Recrutement...');
  const pool = await sql.connect(config);
  console.log('✅ Connecté à SQL Server OrientGR_DB');

  const sqlFilePath = path.resolve('sql/migrations/006_commissions_and_recruitment_system.sql');
  const sqlContent = fs.readFileSync(sqlFilePath, 'utf8');

  // Séparer les batches par 'GO'
  const batches = sqlContent
    .split(/^\s*GO\s*$/im)
    .map(b => b.trim())
    .filter(b => b.length > 0);

  for (let i = 0; i < batches.length; i++) {
    const batch = batches[i];
    try {
      await pool.request().batch(batch);
      console.log(`  [Batch ${i + 1}/${batches.length}] Exécuté avec succès`);
    } catch (err) {
      console.error(`  ❌ Erreur sur le batch ${i + 1}:`, err.message);
      throw err;
    }
  }

  // Mettre à jour le hash bcrypt exact pour COMM-001 pour 'Gendarme2026!'
  const passwordHash = await bcrypt.hash('Gendarme2026!', 10);
  await pool.request()
    .input('hash', sql.NVarChar, passwordHash)
    .query("UPDATE dbo.Utilisateurs SET MotDePasseHash = @hash WHERE Matricule = 'COMM-001'");
  console.log('✅ Compte COMM-001 configuré avec mot de passe valide.');

  // Vérifier les commissions créées
  const comms = await pool.request().query('SELECT CommissionId, Code, Nom, DomaineCode, EstActive FROM dbo.Commissions');
  console.log(`\n📋 COMMISSIONS EN BASE (${comms.recordset.length}) :`);
  comms.recordset.forEach(c => console.log(`  - [ID: ${c.CommissionId}] ${c.Code} : ${c.Nom} (${c.DomaineCode})`));

  // Vérifier les membres de commissions
  const members = await pool.request().query(`
    SELECT cm.MemberId, c.Code AS CommCode, u.Matricule, u.Nom, u.Prenom, u.Role, cm.RoleDansCommission
    FROM dbo.CommissionMembers cm
    JOIN dbo.Commissions c ON c.CommissionId = cm.CommissionId
    JOIN dbo.Utilisateurs u ON u.UtilisateurId = cm.UtilisateurId
  `);
  console.log(`\n👥 MEMBRES AFFECTÉS (${members.recordset.length}) :`);
  members.recordset.forEach(m => console.log(`  - ${m.Matricule} (${m.Nom} ${m.Prenom}) -> ${m.CommCode} en tant que ${m.RoleDansCommission}`));

  await pool.close();
  console.log('\n🎉 MIGRATION 006 TERMINÉE AVEC SUCCÈS !');
}

run().catch(err => {
  console.error('Fatal migration error:', err);
  process.exit(1);
});

