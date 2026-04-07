import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import "../../chunks/db_COzX8rRL.mjs";
import { renderers } from "../../renderers.mjs";
const s3 = new S3Client({
  region: "auto",
  endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY
  }
});
const BUCKET = "my-gallery-images";
const prerender = false;
const POST = async ({ request, locals }) => {
  const auth = locals.auth();
  if (!auth?.userId) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
  }
  try {
    const formData = await request.formData();
    const file = formData.get("file");
    const filename = formData.get("filename");
    if (!file || !(file instanceof File)) {
      return new Response(JSON.stringify({ error: "File is required" }), { status: 400 });
    }
    if (!filename) {
      return new Response(JSON.stringify({ error: "Filename is required" }), { status: 400 });
    }
    const buffer = Buffer.from(await file.arrayBuffer());
    const key = `posts/${filename}`;
    await s3.send(new PutObjectCommand({
      Bucket: BUCKET,
      Key: key,
      Body: buffer,
      ContentType: file.type || "image/jpeg"
    }));
    const finalImageUrl = `https://img.nitakupenda.eu.cc/${key}`;
    return new Response(JSON.stringify({ finalImageUrl }), { status: 200 });
  } catch (err) {
    console.error("Upload error:", err);
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
