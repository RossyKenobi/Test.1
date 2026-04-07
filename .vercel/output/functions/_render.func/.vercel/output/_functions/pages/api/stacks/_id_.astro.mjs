import { s as sql } from "../../../chunks/db_COzX8rRL.mjs";
import { isAdmin } from "../../../chunks/auth_BwoPjZN5.mjs";
import { renderers } from "../../../renderers.mjs";
const prerender = false;
const DELETE = async ({ params, locals }) => {
  const auth = locals.auth();
  if (!auth?.userId) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
  }
  const stackId = params.id;
  if (!stackId) {
    return new Response(JSON.stringify({ error: "Stack ID required" }), { status: 400 });
  }
  try {
    const adminFlag = await isAdmin(auth.userId);
    let result;
    if (adminFlag) {
      result = await sql`DELETE FROM stacks WHERE legacy_id = ${stackId} OR id::text = ${stackId} RETURNING id`;
    } else {
      result = await sql`DELETE FROM stacks WHERE (legacy_id = ${stackId} OR id::text = ${stackId}) AND owner_clerk_id = ${auth.userId} RETURNING id`;
    }
    if (result.length === 0) {
      return new Response(JSON.stringify({ error: "Forbidden or not found" }), { status: 403 });
    }
    return new Response(JSON.stringify({ success: true }));
  } catch (err) {
    console.error("Delete API error:", err);
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
};
const _page = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  DELETE,
  prerender
}, Symbol.toStringTag, { value: "Module" }));
const page = () => _page;
export {
  page,
  renderers
};
