import { s as sql } from "../../chunks/db_COzX8rRL.mjs";
import { isAdmin } from "../../chunks/auth_BwoPjZN5.mjs";
import { renderers } from "../../renderers.mjs";
const prerender = false;
const GET = async () => {
  try {
    const rows = await sql`
      SELECT
        s.id, s.legacy_id, s.caption, s.author, s.category,
        s.is_portrait, s.hidden, s.sort_order, s.owner_clerk_id,
        p.url AS photo_url, p.sort_order AS photo_sort_order
      FROM stacks s
      LEFT JOIN photos p ON p.stack_id = s.id
      ORDER BY s.sort_order ASC, p.sort_order ASC
    `;
    const stackMap = /* @__PURE__ */ new Map();
    for (const row of rows) {
      if (!stackMap.has(row.id)) {
        stackMap.set(row.id, {
          id: row.legacy_id || String(row.id),
          db_id: row.id,
          caption: row.caption || "",
          author: row.author || "",
          category: row.category || "",
          isPortrait: row.is_portrait,
          hidden: row.hidden,
          images: [],
          owner_clerk_id: row.owner_clerk_id
        });
      }
      if (row.photo_url) {
        stackMap.get(row.id).images.push(row.photo_url);
      }
    }
    return new Response(JSON.stringify([...stackMap.values()]), {
      headers: { "Content-Type": "application/json" }
    });
  } catch (err) {
    console.error("Posts API error:", err);
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
};
const PUT = async ({ locals, request }) => {
  const auth = locals.auth();
  if (!auth?.userId) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
  }
  try {
    const body = await request.json();
    if (Array.isArray(body)) {
      const adminFlag = await isAdmin(auth.userId);
      for (let i = 0; i < body.length; i++) {
        const post = body[i];
        if (adminFlag) {
          await sql`UPDATE stacks SET sort_order = ${i}, caption = ${post.caption}, author = ${post.author}, updated_at = NOW() WHERE legacy_id = ${post.id} OR id::text = ${post.id}`;
        } else {
          await sql`UPDATE stacks SET sort_order = ${i}, caption = ${post.caption}, author = ${post.author}, updated_at = NOW() WHERE (legacy_id = ${post.id} OR id::text = ${post.id}) AND owner_clerk_id = ${auth.userId}`;
        }
        if (post.images && post.images.length > 0) {
          const stackRows = await sql`SELECT id FROM stacks WHERE legacy_id = ${post.id} OR id::text = ${post.id}`;
          if (stackRows.length > 0) {
            const stackId = stackRows[0].id;
            await sql`DELETE FROM photos WHERE stack_id = ${stackId}`;
            for (let j = 0; j < post.images.length; j++) {
              await sql`INSERT INTO photos (stack_id, url, sort_order, created_at) VALUES (${stackId}, ${post.images[j]}, ${j}, NOW())`;
            }
          }
        }
      }
      return new Response(JSON.stringify({ success: true }));
    }
    return new Response(JSON.stringify({ error: "Payload must be an array of updated posts" }), { status: 400 });
  } catch (err) {
    console.error("Posts API error:", err);
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
};
const _page = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  GET,
  PUT,
  prerender
}, Symbol.toStringTag, { value: "Module" }));
const page = () => _page;
export {
  page,
  renderers
};
