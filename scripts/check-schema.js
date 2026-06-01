import { neon } from '@neondatabase/serverless';
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const sql = neon(process.env.POSTGRES_URL);

async function main() {
  const tables = await sql`
    SELECT table_name 
    FROM information_schema.tables 
    WHERE table_schema = 'public'
  `;
  
  for (const table of tables) {
    const cols = await sql`
      SELECT column_name, data_type 
      FROM information_schema.columns 
      WHERE table_name = ${table.table_name}
    `;
    console.log(`Table: ${table.table_name}`);
    console.log(cols.map(c => `  ${c.column_name} (${c.data_type})`).join('\n'));
  }
}

main().catch(console.error);
