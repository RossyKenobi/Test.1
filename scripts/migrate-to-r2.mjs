/**
 * One-time migration script: uploads existing images and posts.json to R2.
 * Run: node scripts/migrate-to-r2.mjs
 */

import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { readFileSync, readdirSync } from 'fs';
import { join, basename } from 'path';
import { config } from 'dotenv';

// Load .env.local
config({ path: '.env.local' });

const s3 = new S3Client({
  region: 'auto',
  endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY,
  },
});

const BUCKET = 'my-gallery-images';
const IMAGES_DIR = join(process.cwd(), 'public', 'images', 'posts');
const POSTS_JSON = join(process.cwd(), 'src', 'data', 'posts.json');

async function uploadFile(key, body, contentType) {
  await s3.send(new PutObjectCommand({
    Bucket: BUCKET,
    Key: key,
    Body: body,
    ContentType: contentType,
  }));
}

async function main() {
  console.log('🚀 Starting R2 migration...\n');

  // 1. Upload all images
  const files = readdirSync(IMAGES_DIR).filter(f => /\.(jpg|jpeg|png|webp|gif)$/i.test(f));
  console.log(`Found ${files.length} images to migrate.\n`);

  let uploaded = 0;
  for (const file of files) {
    const filePath = join(IMAGES_DIR, file);
    const body = readFileSync(filePath);
    const key = `posts/${file}`;
    const ext = file.split('.').pop().toLowerCase();
    const contentType = ext === 'png' ? 'image/png' : ext === 'webp' ? 'image/webp' : ext === 'gif' ? 'image/gif' : 'image/jpeg';

    process.stdout.write(`  Uploading ${file}...`);
    await uploadFile(key, body, contentType);
    uploaded++;
    console.log(` ✅ (${uploaded}/${files.length})`);
  }

  // 2. Read and transform posts.json
  console.log('\nTransforming posts.json...');
  const posts = JSON.parse(readFileSync(POSTS_JSON, 'utf-8'));
  const R2_BASE = 'https://img.penumbrae.uk';

  const migratedPosts = posts.map(post => ({
    ...post,
    images: (post.images || []).map(img => {
      // Convert relative path to absolute R2 URL
      // /images/posts/p1_1.jpg → https://img.penumbrae.uk/posts/p1_1.jpg
      const filename = basename(img);
      return `${R2_BASE}/posts/${filename}`;
    }),
  }));

  // 3. Upload migrated posts.json to R2
  console.log('Uploading posts.json to R2...');
  await uploadFile('posts.json', JSON.stringify(migratedPosts, null, 2), 'application/json');
  console.log('✅ posts.json uploaded.\n');

  console.log(`✅ Migration complete! ${uploaded} images + posts.json uploaded to R2.`);
  console.log(`\nVerify: curl ${R2_BASE}/posts.json`);
}

main().catch(err => {
  console.error('❌ Migration failed:', err);
  process.exit(1);
});
