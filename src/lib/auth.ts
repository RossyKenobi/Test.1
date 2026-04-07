import { sql } from './db';

/**
 * Sync Clerk users into Postgres logic (Lazy sync)
 */
export async function ensureUser(clerkId: string, email?: string) {
  const existing = await sql`SELECT * FROM users WHERE clerk_id = ${clerkId}`;
  if (existing.length > 0) return existing[0];

  let finalEmail = email;
  
  if (!finalEmail) {
    try {
      // Use the secret key from env to fetch mail from Clerk
      const res = await fetch(`https://api.clerk.com/v1/users/${clerkId}`, {
        headers: { Authorization: `Bearer ${import.meta.env.CLERK_SECRET_KEY}` }
      });
      if (res.ok) {
        const clerkUser = await res.json();
        finalEmail = clerkUser.email_addresses?.[0]?.email_address;
      }
    } catch (err) {
      console.error('Clerk sync error:', err);
    }
  }

  // Fallback to avoid NOT NULL constraint violation if fetch failed or no email found
  if (!finalEmail) {
    finalEmail = `user_${clerkId}@noemail.local`;
  }

  const inserted = await sql`
    INSERT INTO users (clerk_id, email, is_admin, created_at)
    VALUES (${clerkId}, ${finalEmail}, false, NOW())
    ON CONFLICT (clerk_id) DO UPDATE SET email = EXCLUDED.email
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
