import { S3Client, GetObjectCommand, PutObjectCommand } from '@aws-sdk/client-s3';

const s3 = new S3Client({
  region: 'auto',
  endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY,
  },
});

const BUCKET = 'my-gallery-images';
const POSTS_KEY = 'posts.json';

async function getPosts() {
  try {
    const response = await s3.send(new GetObjectCommand({ Bucket: BUCKET, Key: POSTS_KEY }));
    const body = await response.Body.transformToString('utf-8');
    return JSON.parse(body);
  } catch (err) {
    if (err.name === 'NoSuchKey') {
      return [];
    }
    throw err;
  }
}

async function savePosts(posts) {
  await s3.send(new PutObjectCommand({
    Bucket: BUCKET,
    Key: POSTS_KEY,
    Body: JSON.stringify(posts, null, 2),
    ContentType: 'application/json',
  }));
}

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, PUT, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    if (req.method === 'GET') {
      const posts = await getPosts();
      return res.status(200).json(posts);
    }

    if (req.method === 'PUT') {
      const posts = req.body;

      if (!Array.isArray(posts)) {
        return res.status(400).json({ error: 'Request body must be an array of posts' });
      }

      await savePosts(posts);
      return res.status(200).json({ success: true });
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (err) {
    console.error('Posts API error:', err);
    return res.status(500).json({ error: err.message });
  }
}
