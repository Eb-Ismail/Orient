import { getDbPool } from '../lib/db.js';

async function audit() {
  const pool = await getDbPool();
  const tables = [
    'CandidateCommissionAssignments',
    'CommissionEvaluations',
    'CommissionEvaluationHistory',
    'CandidateSelectionComparisons',
    'AdministrativeSelectionDecisions'
  ];

  for (const t of tables) {
    const cols = await pool.request().query(`
      SELECT COLUMN_NAME, DATA_TYPE, CHARACTER_MAXIMUM_LENGTH, IS_NULLABLE
      FROM INFORMATION_SCHEMA.COLUMNS
      WHERE TABLE_NAME = '${t}'
      ORDER BY ORDINAL_POSITION
    `);
    console.log(`\n=== TABLE: dbo.${t} ===`);
    console.table(cols.recordset);
  }

  process.exit(0);
}

audit().catch(err => {
  console.error(err);
  process.exit(1);
});

