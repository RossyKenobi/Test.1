import { s as sql } from "../../chunks/db_COzX8rRL.mjs";
import { renderers } from "../../renderers.mjs";
const prerender = false;
const POST = async ({ request }) => {
  try {
    const { code } = await request.json();
    if (!code) {
      return new Response(JSON.stringify({ valid: false, error: "Invite code is required" }), { status: 400 });
    }
    const rows = await sql`
      SELECT id FROM invitation_codes
      WHERE code = ${code} AND is_used = false
    `;
    if (rows.length === 0) {
      return new Response(JSON.stringify({ valid: false, error: "Invalid or used invitation code" }), { status: 400 });
    }
    return new Response(JSON.stringify({
      valid: true,
      inviteId: rows[0].id
    }), { status: 200 });
  } catch (err) {
    console.error("Verify invite error:", err);
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
