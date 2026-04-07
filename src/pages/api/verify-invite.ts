import type { APIRoute } from 'astro';
import { sql } from '../../lib/db';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  try {
    const { code } = await request.json();

    if (!code) {
      return new Response(JSON.stringify({ valid: false, error: 'Invite code is required' }), { status: 400 });
    }

    const rows = await sql`
      SELECT id FROM invitation_codes
      WHERE code = ${code} AND is_used = false
    `;

    if (rows.length === 0) {
      return new Response(JSON.stringify({ valid: false, error: 'Invalid or used invitation code' }), { status: 400 });
    }

    // Pass the invite ID back to the client to be consumed after registration
    return new Response(JSON.stringify({
      valid: true,
      inviteId: rows[0].id,
    }), { status: 200 });

  } catch (err: any) {
    console.error('Verify invite error:', err);
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
};
