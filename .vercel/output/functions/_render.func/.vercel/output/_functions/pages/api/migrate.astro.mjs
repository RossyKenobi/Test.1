import { s as sql } from "../../chunks/db_COzX8rRL.mjs";
import { isAdmin } from "../../chunks/auth_BwoPjZN5.mjs";
import { renderers } from "../../renderers.mjs";
const prerender = false;
const GET = async ({ url, locals }) => {
  const auth = locals.auth();
  if (!auth?.userId) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
  }
  const adminFlag = await isAdmin(auth.userId);
  if (!adminFlag) {
    return new Response(JSON.stringify({ error: "Forbidden" }), { status: 403 });
  }
  try {
    const ownerClerkId = url.searchParams.get("clerk_id") || auth.userId;
    const r2Response = await fetch("https://img.nitakupenda.eu.cc/posts.json");
    if (!r2Response.ok) {
      throw new Error(`Failed to fetch from R2: ${r2Response.statusText}`);
    }
    const posts = await r2Response.json();
    let stackCount = 0;
    let photoCount = 0;
    for (let i = 0; i < posts.length; i++) {
      const post = posts[i];
      const stackResult = await sql`
        INSERT INTO stacks (legacy_id, caption, author, category, is_portrait, hidden, sort_order, owner_clerk_id, created_at, updated_at)
        VALUES (
          ${post.id}, 
          ${post.caption || ""}, 
          ${post.author || ""}, 
          ${post.category || ""}, 
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
      if (newStackId) {
        const images = post.images || [];
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
      migrated: { stacks: stackCount, photos: photoCount }
    }), { status: 200 });
  } catch (err) {
    console.error("Migration error:", err);
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
};
const _page = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  GET,
  prerender
}, Symbol.toStringTag, { value: "Module" }));
const page = () => _page;
export {
  page,
  renderers
};
