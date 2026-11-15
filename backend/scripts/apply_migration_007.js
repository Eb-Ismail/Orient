import { getDbPool } from '../lib/db.js';

async function applyMigration() {
  const pool = await getDbPool();
  if (!pool) {
    console.error('Cannot connect to DB');
    process.exit(1);
  }

  console.log('--- EXÉCUTION DE LA MIGRATION 007 ---');

  // Step 1: Update users
  const updateResult = await pool.request().query(`
    UPDATE dbo.Utilisateurs
    SET [Role] = 'COMMISSION',
        [Email] = CASE WHEN [Email] = 'instructeur@orient-gr.gendarmerie.fr' THEN 'commission.meca@orient-gr.gendarmerie.fr' ELSE [Email] END
    WHERE [Role] = 'INSTRUCTEUR' OR [Email] = 'instructeur@orient-gr.gendarmerie.fr';
  `);
  console.log(`1. Utilisateurs mis à jour : ${updateResult.rowsAffected[0]} ligne(s).`);

  // Step 2: Ensure User 6 is member of COMM_MECA (Commission 4)
  await pool.request().query(`
    IF EXISTS (SELECT 1 FROM dbo.Utilisateurs WHERE UtilisateurId = 6)
       AND EXISTS (SELECT 1 FROM dbo.Commissions WHERE CommissionId = 4)
       AND NOT EXISTS (SELECT 1 FROM dbo.CommissionMembers WHERE UtilisateurId = 6 AND CommissionId = 4)
    BEGIN
        INSERT INTO dbo.CommissionMembers (CommissionId, UtilisateurId, RoleDansCommission, AffectePar, EstActif)
        VALUES (4, 6, 'EVALUATEUR', 1, 1);
    END
  `);
  console.log('2. Membre de commission vérifié pour UtilisateurId 6.');

  // Step 3: Find and drop existing check constraint on Utilisateurs.Role
  const chkQuery = await pool.request().query(`
    SELECT name FROM sys.check_constraints 
    WHERE parent_object_id = OBJECT_ID('dbo.Utilisateurs') AND definition LIKE '%Role%';
  `);
  for (const row of chkQuery.recordset) {
    console.log(`Suppression de la contrainte : ${row.name}`);
    await pool.request().query(`ALTER TABLE dbo.Utilisateurs DROP CONSTRAINT [${row.name}];`);
  }

  // Step 4: Add new strict check constraint
  await pool.request().query(`
    ALTER TABLE dbo.Utilisateurs ADD CONSTRAINT CK_Utilisateurs_Role 
    CHECK ([Role] IN ('ADMIN', 'COMMISSION', 'ELEVE'));
  `);
  console.log('3. Nouvelle contrainte CK_Utilisateurs_Role (ADMIN, COMMISSION, ELEVE) ajoutée.');

  // Step 5: Verification
  const verifyUsers = await pool.request().query("SELECT UtilisateurId, Nom, Prenom, Email, Matricule, Role FROM dbo.Utilisateurs WHERE Role = 'INSTRUCTEUR'");
  console.log(`4. Vérification résiduelle rôle INSTRUCTEUR : ${verifyUsers.recordset.length} utilisateur(s).`);

  const allRoles = await pool.request().query("SELECT DISTINCT Role FROM dbo.Utilisateurs");
  console.log('5. Rôles actuels en base :', allRoles.recordset.map(r => r.Role));

  // Step 6: Test strictness by attempting to insert or update an invalid role
  try {
    await pool.request().query("UPDATE dbo.Utilisateurs SET Role = 'INSTRUCTEUR' WHERE UtilisateurId = 1");
    console.error('ERREUR : La contrainte aurait dû rejeter INSTRUCTEUR !');
  } catch (err) {
    console.log('✅ Contrainte validée : tentative d\'insertion/mise à jour du rôle INSTRUCTEUR rejetée par SQL Server :', err.message);
  }

  console.log('🎉 Migration 007 appliquée avec succès !');
  process.exit(0);
}

applyMigration().catch(err => {
  console.error('Erreur migration:', err);
  process.exit(1);
});
