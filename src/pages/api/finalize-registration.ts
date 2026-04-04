import type { APIRoute } from 'astro';
import { sql } from '../../lib/db';

export const prerender = false;

export const POST: APIRoute = async ({ request, locals }) => {
  const auth = locals.auth();
  if (!auth?.userId) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
  }

  try {
    const { inviteId } = await request.json();

    if (!inviteId) {
      return new Response(JSON.stringify({ error: 'Invite ID required' }), { status: 400 });
    }

    // Consume the invite code
    await sql`
      UPDATE invitation_codes
      SET is_used = true, used_by_clerk_id = ${auth.userId}, used_at = NOW()
      WHERE id = ${inviteId} AND is_used = false
    `;

    // Check if the consumed code gives Admin rights
    const inviteRows = await sql`SELECT code FROM invitation_codes WHERE id = ${inviteId}`;
    const code = inviteRows[0]?.code || '';
    const isRootAdmin = code.startsWith('ROOT-ADMIN-');

    // Create user record in Postgres
    await sql`
      INSERT INTO users (clerk_id, is_admin, created_at)
      VALUES (${auth.userId}, ${isRootAdmin}, NOW())
      ON CONFLICT (clerk_id) DO UPDATE SET is_admin = CASE WHEN ${isRootAdmin} THEN true ELSE users.is_admin END
    `;

    return new Response(JSON.stringify({ success: true, isAdmin: isRootAdmin }), { status: 200 });

  } catch (err: any) {
    console.error('Finalize registration error:', err);
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
};
