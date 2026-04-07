import type { APIRoute } from 'astro';
import { sql } from '../../../lib/db';
import { isAdmin } from '../../../lib/auth';

export const prerender = false;

export const DELETE: APIRoute = async ({ params, locals }) => {
  const auth = locals.auth();
  if (!auth?.userId) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
  }

  const stackId = params.id;
  if (!stackId) {
    return new Response(JSON.stringify({ error: 'Stack ID required' }), { status: 400 });
  }

  try {
    const adminFlag = await isAdmin(auth.userId);

    let result;
    if (adminFlag) {
      // Admin: can delete anything
      await sql`DELETE FROM photos WHERE stack_id = ${stackId}`;
      result = await sql`DELETE FROM stacks WHERE id = ${stackId} RETURNING id`;
    } else {
      // User: can only delete if owner
      result = await sql`DELETE FROM stacks WHERE id = ${stackId} AND owner_clerk_id = ${auth.userId} RETURNING id`;
      if (result.length > 0) {
        await sql`DELETE FROM photos WHERE stack_id = ${stackId}`;
      }
    }

    if (result.length === 0) {
      return new Response(JSON.stringify({ error: 'Forbidden or not found' }), { status: 403 });
    }

    return new Response(JSON.stringify({ success: true }));
  } catch (err: any) {
    console.error('Delete API error:', err);
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
};
