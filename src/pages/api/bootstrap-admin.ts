import type { APIRoute } from 'astro';
import { sql } from '../../lib/db';

export const prerender = false;

/**
 * TEMPORARY: One-time bootstrap endpoint.
 * Creates admin user from current Clerk session.
 * DELETE THIS FILE after first admin is set up.
 */
export const GET: APIRoute = async ({ locals }) => {
  const auth = locals.auth();
  if (!auth?.userId) {
    return new Response(JSON.stringify({ error: 'Not logged in. Please login first.' }), { status: 401 });
  }

  try {
    // Check if any admin already exists
    const existingAdmins = await sql`SELECT * FROM users WHERE is_admin = true`;
    if (existingAdmins.length > 0) {
      return new Response(JSON.stringify({ error: 'Admin already exists. Bootstrap disabled.' }), { status: 403 });
    }

    // Get user email from Clerk
    const clerkRes = await fetch(`https://api.clerk.com/v1/users/${auth.userId}`, {
      headers: { Authorization: `Bearer ${import.meta.env.CLERK_SECRET_KEY}` }
    });
    const clerkUser = await clerkRes.json();
    const email = clerkUser.email_addresses?.[0]?.email_address || 'admin@local';

    // Upsert this clerk user as admin
    await sql`
      INSERT INTO users (clerk_id, email, is_admin, created_at)
      VALUES (${auth.userId}, ${email}, true, NOW())
      ON CONFLICT (clerk_id) DO UPDATE SET is_admin = true, email = ${email}
    `;

    // Mark invite code as used
    await sql`
      UPDATE invitation_codes
      SET is_used = true, used_by_clerk_id = ${auth.userId}, used_at = NOW()
      WHERE code = 'ROOT-ADMIN-2026' AND is_used = false
    `;

    return new Response(JSON.stringify({ 
      success: true, 
      message: 'You are now admin. DELETE this bootstrap-admin.ts file!',
      clerkId: auth.userId 
    }), { status: 200 });

  } catch (err: any) {
    console.error('Bootstrap error:', err);
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
};
