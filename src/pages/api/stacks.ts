import type { APIRoute } from 'astro';
import { sql } from '../../lib/db';
import { isAdmin } from '../../lib/auth';

export const prerender = false;

// CREATE new stack
export const POST: APIRoute = async ({ request, locals }) => {
  const auth = locals.auth();
  if (!auth?.userId) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
  }

  try {
    const body = await request.json();
    const { id, caption, author, category, isPortrait, hidden, images } = body;

    // Use current ID logic or generate DB id
    const result = await sql`
      INSERT INTO stacks (legacy_id, caption, author, category, is_portrait, hidden, owner_clerk_id, created_at, updated_at)
      VALUES (${id}, ${caption || ''}, ${author || ''}, ${category || 'General'}, ${isPortrait || false}, ${hidden || false}, ${auth.userId}, NOW(), NOW())
      RETURNING id
    `;
    const newStackId = result[0].id;

    // Insert photos if any
    if (images && images.length > 0) {
      for (let i = 0; i < images.length; i++) {
        await sql`
          INSERT INTO photos (stack_id, url, sort_order, created_at)
          VALUES (${newStackId}, ${images[i]}, ${i}, NOW())
        `;
      }
    }

    return new Response(JSON.stringify({ success: true, db_id: newStackId }), { status: 201 });
  } catch (err: any) {
    console.error('Stack creation error:', err);
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
};
