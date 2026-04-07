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

      // Insert Stack — id is varchar, use post.id directly
      await sql`
        INSERT INTO stacks (id, caption, author, category, is_portrait, hidden, sort_order, owner_clerk_id, created_at)
        VALUES (
          ${post.id}, 
          ${post.caption || ''}, 
          ${post.author || ''}, 
          ${post.category || ''}, 
          ${post.isPortrait || false}, 
          ${post.hidden || false}, 
          ${i}, 
          ${ownerClerkId}, 
          NOW()
        )
        ON CONFLICT (id) DO NOTHING
      `;

      // Check if it was inserted or already existed
      const existing = await sql`SELECT id FROM stacks WHERE id = ${post.id}`;
      if (existing.length > 0) {
        const stackId = existing[0].id;
        
        // Count new inserts
        const countBefore = await sql`SELECT count(*) as c FROM photos WHERE stack_id = ${stackId}`;
        if (parseInt(countBefore[0].c) === 0) {
          stackCount++;
        }

        // Wipe old photos for this stack to avoid duplicates on rerun
        await sql`DELETE FROM photos WHERE stack_id = ${stackId}`;

        // Insert Photos — column is image_url not url
        const images = post.images || [];
        for (let j = 0; j < images.length; j++) {
          await sql`
            INSERT INTO photos (stack_id, image_url, sort_order, created_at)
            VALUES (${stackId}, ${images[j]}, ${j}, NOW())
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
