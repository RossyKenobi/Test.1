import { sql } from './db';

/**
 * Sync Clerk users into Postgres logic (Lazy sync)
 */
export async function ensureUser(clerkId: string, email?: string) {
  const existing = await sql`SELECT * FROM users WHERE clerk_id = ${clerkId}`;
  if (existing.length > 0) return existing[0];

  const inserted = await sql`
    INSERT INTO users (clerk_id, email, is_admin, created_at)
    VALUES (${clerkId}, ${email || null}, false, NOW())
    ON CONFLICT (clerk_id) DO NOTHING
    RETURNING *
  `;
  
  return inserted[0] || (await sql`SELECT * FROM users WHERE clerk_id = ${clerkId}`)[0];
}

/**
 * Check if the current user is an Admin
 */
export async function isAdmin(clerkId: string): Promise<boolean> {
  const rows = await sql`SELECT is_admin FROM users WHERE clerk_id = ${clerkId}`;
  return rows.length > 0 && rows[0].is_admin === true;
}
