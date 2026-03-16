import fs from 'fs/promises';
import path from 'path';
import sharp from 'sharp';

const ACCESS_TOKEN = process.env.IG_ACCESS_TOKEN;
const API_URL = `https://graph.instagram.com/me/media?fields=id,caption,media_type,media_url,timestamp,children{media_type,media_url}&access_token=${ACCESS_TOKEN}`;

// Resolve paths relative to the project root
const ASSETS_DIR = path.resolve('../../src/assets/images');
const DATA_DIR = path.resolve('../../src/data');

async function downloadAndOptimizeImage(url, id, index = 0) {
  const filename = `${id}_${index}.webp`;
  const filepath = path.join(ASSETS_DIR, filename);
  
  try {
    await fs.access(filepath);
    return `~/assets/images/${filename}`;
  } catch (e) {
    // File does not exist, proceed
  }

  console.log(`Downloading ${filename}...`);
  const response = await fetch(url);
  const buffer = await response.arrayBuffer();
  
  await sharp(buffer)
    .resize({ width: 2560, withoutEnlargement: true })
    .webp({ quality: 80 })
    .toFile(filepath);
    
  return `~/assets/images/${filename}`;
}

async function run() {
  if (!ACCESS_TOKEN) {
    console.warn("No IG_ACCESS_TOKEN found. Please check your environment variables.");
    // In CI, we might want to throw an error so the action fails, but for local testing warning is fine.
    // Creating dummy file for initial development
    await fs.mkdir(ASSETS_DIR, { recursive: true });
    await fs.mkdir(DATA_DIR, { recursive: true });
    const dummyPosts = [];
    await fs.writeFile(path.join(DATA_DIR, 'posts.json'), JSON.stringify(dummyPosts, null, 2));
    return;
  }
  
  await fs.mkdir(ASSETS_DIR, { recursive: true });
  await fs.mkdir(DATA_DIR, { recursive: true });

  const res = await fetch(API_URL);
  const data = await res.json();

  if (data.error) {
    throw new Error(data.error.message);
  }

  const posts = [];

  for (const item of data.data) {
    if (item.media_type === 'VIDEO') continue;

    const post = {
      id: item.id,
      caption: item.caption || '',
      timestamp: item.timestamp,
      images: [],
      hidden: false, // CMS Toggle
      category: 'Uncategorized' // CMS Tags
    };

    if (item.media_type === 'IMAGE') {
      const imgPath = await downloadAndOptimizeImage(item.media_url, item.id);
      post.images.push(imgPath);
    } else if (item.media_type === 'CAROUSEL_ALBUM') {
      if (item.children && item.children.data) {
        let idx = 0;
        for (const child of item.children.data) {
          if (child.media_type === 'IMAGE') {
            const imgPath = await downloadAndOptimizeImage(child.media_url, item.id, idx++);
            post.images.push(imgPath);
          }
        }
      }
    }
    
    if (post.images.length > 0) {
      posts.push(post);
    }
  }

  // Preserve existing user modifications from CMS (like hidden toggles and categories)
  let existingData = [];
  try {
    const existingRaw = await fs.readFile(path.join(DATA_DIR, 'posts.json'), 'utf-8');
    existingData = JSON.parse(existingRaw);
  } catch(e) {}

  const mergedPosts = posts.map(newPost => {
    const existing = existingData.find(p => p.id === newPost.id);
    if (existing) {
      return { ...newPost, hidden: existing.hidden, category: existing.category };
    }
    return newPost;
  });

  await fs.writeFile(path.join(DATA_DIR, 'posts.json'), JSON.stringify(mergedPosts, null, 2));
  console.log("Successfully synced Instagram posts!");
}

run().catch(console.error);
