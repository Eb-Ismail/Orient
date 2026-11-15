import sql from 'mssql/msnodesqlv8.js';

const config = {
  connectionString: 'Driver={ODBC Driver 17 for SQL Server};Server=.\\CLASS;Database=OrientGR_DB;Trusted_Connection=yes;'
};

async function inspectSchema() {
  const pool = await sql.connect(config);
  const targetTables = [
    'StudentJourneys',
    'JourneyMessages',
    'StudentTalentProfiles',
    'InstructorEvaluations',
    'OrientationProposals',
    'LogsActivite',
    'Specialites',
    'WorkshopAssignments',
    'Workshops'
  ];

  for (const t of targetTables) {
    const cols = await pool.request().query(`
      SELECT COLUMN_NAME, DATA_TYPE, CHARACTER_MAXIMUM_LENGTH, IS_NULLABLE 
      FROM INFORMATION_SCHEMA.COLUMNS 
      WHERE TABLE_NAME='${t}'
    `);
    console.log(`\n=== TABLE: ${t} ===`);
    cols.recordset.forEach(c => {
      console.log(`  - ${c.COLUMN_NAME}: ${c.DATA_TYPE}${c.CHARACTER_MAXIMUM_LENGTH ? `(${c.CHARACTER_MAXIMUM_LENGTH})` : ''} | Nullable: ${c.IS_NULLABLE}`);
    });
  }

  // Also check existing FKs
  const fks = await pool.request().query(`
    SELECT 
      obj.name AS FK_NAME,
      tab1.name AS TableName,
      col1.name AS ColumnName,
      tab2.name AS ReferencedTable,
      col2.name AS ReferencedColumn
    FROM sys.foreign_key_columns fkc
    INNER JOIN sys.objects obj ON obj.object_id = fkc.constraint_object_id
    INNER JOIN sys.tables tab1 ON tab1.object_id = fkc.parent_object_id
    INNER JOIN sys.columns col1 ON col1.column_id = fkc.parent_column_id AND col1.object_id = tab1.object_id
    INNER JOIN sys.tables tab2 ON tab2.object_id = fkc.referenced_object_id
    INNER JOIN sys.columns col2 ON col2.column_id = fkc.referenced_column_id AND col2.object_id = tab2.object_id
  `);
  console.log(`\n=== FOREIGN KEYS (${fks.recordset.length}) ===`);
  fks.recordset.forEach(fk => {
    console.log(`  ${fk.TableName}.${fk.ColumnName} -> ${fk.ReferencedTable}.${fk.ReferencedColumn} (${fk.FK_NAME})`);
  });

  await pool.close();
}

inspectSchema().catch(console.error);

