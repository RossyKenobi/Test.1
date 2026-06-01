import { neon } from '@neondatabase/serverless';
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const sql = neon(process.env.POSTGRES_URL);

async function main() {
  const code = 'ROOT-ADMIN-PRODUCTION-2026';
  await sql`
    INSERT INTO invitation_codes (code, is_used) 
    VALUES (${code}, false)
    ON CONFLICT (code) DO NOTHING
  `;
  console.log('✅ Admin invite code created: ' + code);
}

main().catch(console.error);
