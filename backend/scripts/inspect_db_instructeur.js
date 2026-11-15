import { getDbPool } from '../lib/db.js';

async function check() {
  const pool = await getDbPool();
  if (!pool) {
    console.error('Cannot connect to DB');
    process.exit(1);
  }

  // 1. Check users with INSTRUCTEUR
  const users = await pool.request().query("SELECT UtilisateurId, Nom, Prenom, Email, Matricule, Role FROM dbo.Utilisateurs WHERE Role = 'INSTRUCTEUR'");
  console.log('1. Utilisateurs with INSTRUCTEUR:', users.recordset);

  // 2. Check all check constraints in the DB mentioning Role or INSTRUCTEUR
  const checks = await pool.request().query(`
    SELECT t.name AS TableName, cc.name AS ConstraintName, cc.definition AS Definition
    FROM sys.check_constraints cc
    JOIN sys.tables t ON cc.parent_object_id = t.object_id
    WHERE cc.definition LIKE '%INSTRUCTEUR%' OR cc.definition LIKE '%Role%'
  `);
  console.log('2. Check constraints mentioning INSTRUCTEUR or Role:', checks.recordset);

  // 3. Check columns in tables named InstructeurId or similar
  const cols = await pool.request().query(`
    SELECT t.name AS TableName, c.name AS ColumnName, ty.name AS TypeName
    FROM sys.columns c
    JOIN sys.tables t ON c.object_id = t.object_id
    JOIN sys.types ty ON c.user_type_id = ty.user_type_id
    WHERE c.name LIKE '%Instructeur%'
  `);
  console.log('3. Columns mentioning Instructeur:', cols.recordset);

  // 4. Check foreign keys
  const fks = await pool.request().query(`
    SELECT fk.name AS FKName, tp.name AS ParentTable, tr.name AS RefTable
    FROM sys.foreign_keys fk
    JOIN sys.tables tp ON fk.parent_object_id = tp.object_id
    JOIN sys.tables tr ON fk.referenced_object_id = tr.object_id
    WHERE fk.name LIKE '%Instructeur%'
  `);
  console.log('4. Foreign keys mentioning Instructeur:', fks.recordset);

  // 5. Check commissions
  const comms = await pool.request().query("SELECT CommissionId, Code, Nom FROM dbo.Commissions");
  console.log('5. Existing Commissions:', comms.recordset);

  process.exit(0);
}

check().catch(err => {
  console.error(err);
  process.exit(1);
});
