import { s as sql } from "../../chunks/db_COzX8rRL.mjs";
import { renderers } from "../../renderers.mjs";
const prerender = false;
const POST = async ({ request, locals }) => {
  const auth = locals.auth();
  if (!auth?.userId) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
  }
  try {
    const body = await request.json();
    const { id, caption, author, category, isPortrait, hidden, images } = body;
    const result = await sql`
      INSERT INTO stacks (legacy_id, caption, author, category, is_portrait, hidden, owner_clerk_id, created_at, updated_at)
      VALUES (${id}, ${caption || ""}, ${author || ""}, ${category || "General"}, ${isPortrait || false}, ${hidden || false}, ${auth.userId}, NOW(), NOW())
      RETURNING id
    `;
    const newStackId = result[0].id;
    if (images && images.length > 0) {
      for (let i = 0; i < images.length; i++) {
        await sql`
          INSERT INTO photos (stack_id, url, sort_order, created_at)
          VALUES (${newStackId}, ${images[i]}, ${i}, NOW())
        `;
      }
    }
    return new Response(JSON.stringify({ success: true, db_id: newStackId }), { status: 201 });
  } catch (err) {
    console.error("Stack creation error:", err);
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
};
const _page = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  POST,
  prerender
}, Symbol.toStringTag, { value: "Module" }));
const page = () => _page;
export {
  page,
  renderers
};
