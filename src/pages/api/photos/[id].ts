import type { APIRoute } from 'astro';
import { sql } from '../../../lib/db';
import { isAdmin } from '../../../lib/auth';

export const prerender = false;

export const DELETE: APIRoute = async ({ params, locals }) => {
  const auth = locals.auth();
  if (!auth?.userId) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
  }

  const photoId = params.id;
  if (!photoId) {
    return new Response(JSON.stringify({ error: 'Photo ID required' }), { status: 400 });
  }

  try {
    const adminFlag = await isAdmin(auth.userId);

    // Check ownership
    const photo = await sql`
      SELECT p.id, p.stack_id FROM photos p
      JOIN stacks s ON s.id = p.stack_id
      WHERE p.id = ${photoId}
      AND (s.owner_clerk_id = ${auth.userId} OR ${adminFlag})
    `;

    if (photo.length === 0) {
      return new Response(JSON.stringify({ error: 'Not found or not authorized' }), { status: 404 });
    }

    const stackId = photo[0].stack_id;

    // Delete the photo
    await sql`DELETE FROM photos WHERE id = ${photoId}`;

    // Check if the stack is now empty
    const remaining = await sql`SELECT count(*) as c FROM photos WHERE stack_id = ${stackId}`;
    if (parseInt(remaining[0].c) === 0) {
      await sql`DELETE FROM stacks WHERE id = ${stackId}`;
    }

    return new Response(JSON.stringify({ success: true, stackDeleted: parseInt(remaining[0].c) === 0 }));
  } catch (err: any) {
    console.error('Photo delete error:', err);
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
};
