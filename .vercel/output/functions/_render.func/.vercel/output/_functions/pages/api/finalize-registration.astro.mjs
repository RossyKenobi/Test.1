import { s as sql } from "../../chunks/db_COzX8rRL.mjs";
import { renderers } from "../../renderers.mjs";
const prerender = false;
const POST = async ({ request, locals }) => {
  const auth = locals.auth();
  if (!auth?.userId) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
  }
  try {
    const { inviteId } = await request.json();
    if (!inviteId) {
      return new Response(JSON.stringify({ error: "Invite ID required" }), { status: 400 });
    }
    await sql`
      UPDATE invitation_codes
      SET is_used = true, used_by_clerk_id = ${auth.userId}, used_at = NOW()
      WHERE id = ${inviteId} AND is_used = false
    `;
    const inviteRows = await sql`SELECT code FROM invitation_codes WHERE id = ${inviteId}`;
    const code = inviteRows[0]?.code || "";
    const isRootAdmin = code.startsWith("ROOT-ADMIN-");
    await sql`
      INSERT INTO users (clerk_id, is_admin, created_at)
      VALUES (${auth.userId}, ${isRootAdmin}, NOW())
      ON CONFLICT (clerk_id) DO UPDATE SET is_admin = CASE WHEN ${isRootAdmin} THEN true ELSE users.is_admin END
    `;
    return new Response(JSON.stringify({ success: true, isAdmin: isRootAdmin }), { status: 200 });
  } catch (err) {
    console.error("Finalize registration error:", err);
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
