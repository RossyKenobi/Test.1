import { s as sql } from "./db_COzX8rRL.mjs";
async function isAdmin(clerkId) {
  const rows = await sql`SELECT is_admin FROM users WHERE clerk_id = ${clerkId}`;
  return rows.length > 0 && rows[0].is_admin === true;
}
export {
  isAdmin
};
