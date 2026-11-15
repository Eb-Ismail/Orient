import { getDbPool } from '../lib/db.js';

async function checkTableConstraints() {
  const pool = await getDbPool();
  const res = await pool.request().query(`
    SELECT 
      tc.TABLE_NAME,
      tc.CONSTRAINT_NAME,
      tc.CONSTRAINT_TYPE
    FROM INFORMATION_SCHEMA.TABLE_CONSTRAINTS tc
    WHERE tc.TABLE_NAME IN ('CandidateCommissionAssignments', 'CommissionEvaluations', 'AdministrativeSelectionDecisions')
    ORDER BY tc.TABLE_NAME, tc.CONSTRAINT_TYPE
  `);
  console.log('Constraints on recruitment tables:');
  console.table(res.recordset);
  process.exit(0);
}

checkTableConstraints().catch(err => {
  console.error(err);
  process.exit(1);
});

