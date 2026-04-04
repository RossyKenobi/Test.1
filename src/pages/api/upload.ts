import type { APIRoute } from 'astro';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { sql } from '../../lib/db';
import { isAdmin } from '../../lib/auth';

const s3 = new S3Client({
  region: 'auto',
  endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID as string,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY as string,
  },
});

const BUCKET = 'my-gallery-images';

export const prerender = false;

export const POST: APIRoute = async ({ request, locals }) => {
  const auth = locals.auth();
  if (!auth?.userId) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
  }

  try {
    const formData = await request.formData();
    const file = formData.get('file');
    const filename = formData.get('filename') as string;

    if (!file || !(file instanceof File)) {
      return new Response(JSON.stringify({ error: 'File is required' }), { status: 400 });
    }
    if (!filename) {
      return new Response(JSON.stringify({ error: 'Filename is required' }), { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const key = `posts/${filename}`;

    await s3.send(new PutObjectCommand({
      Bucket: BUCKET,
      Key: key,
      Body: buffer,
      ContentType: file.type || 'image/jpeg',
    }));

    const finalImageUrl = `https://img.nitakupenda.eu.cc/${key}`;

    return new Response(JSON.stringify({ finalImageUrl }), { status: 200 });
  } catch (err: any) {
    console.error('Upload error:', err);
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
};
