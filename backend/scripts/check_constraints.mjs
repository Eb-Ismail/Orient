import { getDbPool } from '../lib/db.js';

async function checkConstraints() {
  const pool = await getDbPool();
  const res = await pool.request().query(`
    SELECT 
      cc.TABLE_NAME,
      cc.CONSTRAINT_NAME,
      cc.CHECK_CLAUSE
    FROM INFORMATION_SCHEMA.CHECK_CONSTRAINTS cc
    ORDER BY cc.TABLE_NAME, cc.CONSTRAINT_NAME
  `);
  console.log('Check Constraints:');
  console.table(res.recordset);
  process.exit(0);
}

checkConstraints().catch(err => {
  console.error(err);
  process.exit(1);
});
