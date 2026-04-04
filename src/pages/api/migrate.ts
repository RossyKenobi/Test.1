import type { APIRoute } from 'astro';
import { sql } from '../../lib/db';
import { isAdmin } from '../../lib/auth';

export const prerender = false;

export const GET: APIRoute = async ({ url, locals }) => {
  const auth = locals.auth();
  if (!auth?.userId) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
  }

  // Double check admin privileges to run migrations
  const adminFlag = await isAdmin(auth.userId);
  if (!adminFlag) {
    return new Response(JSON.stringify({ error: 'Forbidden' }), { status: 403 });
  }

  try {
    const ownerClerkId = url.searchParams.get('clerk_id') || auth.userId;

    // Fetch existing data from R2 json
    const r2Response = await fetch('https://img.nitakupenda.eu.cc/posts.json');
    if (!r2Response.ok) {
      throw new Error(`Failed to fetch from R2: ${r2Response.statusText}`);
    }
    const posts = await r2Response.json();

    let stackCount = 0;
    let photoCount = 0;

    for (let i = 0; i < posts.length; i++) {
      const post = posts[i];

      // Insert Stack
      const stackResult = await sql`
        INSERT INTO stacks (legacy_id, caption, author, category, is_portrait, hidden, sort_order, owner_clerk_id, created_at, updated_at)
        VALUES (
          ${post.id}, 
          ${post.caption || ''}, 
          ${post.author || ''}, 
          ${post.category || ''}, 
          ${post.isPortrait || false}, 
          ${post.hidden || false}, 
          ${i}, 
          ${ownerClerkId}, 
          NOW(), 
          NOW()
        )
        ON CONFLICT DO NOTHING
        RETURNING id
      `;

      // Handling edge cases where ON CONFLICT DO NOTHING returned no id (if we run it multiple times)
      let newStackId;
      if (stackResult.length > 0) {
        newStackId = stackResult[0].id;
        stackCount++;
      } else {
        const existing = await sql`SELECT id FROM stacks WHERE legacy_id = ${post.id}`;
        if (existing.length > 0) {
            newStackId = existing[0].id;
        }
      }

      // Insert Photos if newStackId exists
      if (newStackId) {
        const images = post.images || [];
        
        // Wipe old photos for this stack just in case it's a rerun to avoid duplicates
        await sql`DELETE FROM photos WHERE stack_id = ${newStackId}`;
        
        for (let j = 0; j < images.length; j++) {
          await sql`
            INSERT INTO photos (stack_id, url, sort_order, created_at)
            VALUES (${newStackId}, ${images[j]}, ${j}, NOW())
          `;
          photoCount++;
        }
      }
    }

    return new Response(JSON.stringify({
      success: true,
      migrated: { stacks: stackCount, photos: photoCount },
    }), { status: 200 });

  } catch (err: any) {
    console.error('Migration error:', err);
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
};
