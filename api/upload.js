import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';

const s3 = new S3Client({
  region: 'auto',
  endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY,
  },
});

const BUCKET = 'my-gallery-images';

// Increase body size limit to 50MB for image uploads
export const config = {
  api: {
    bodyParser: {
      sizeLimit: '50mb',
    },
  },
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { filename, contentType, fileData } = req.body;

    if (!filename || !fileData) {
      return res.status(400).json({ error: 'filename and fileData are required' });
    }

    // fileData is base64-encoded image from frontend
    const buffer = Buffer.from(fileData, 'base64');
    const key = `posts/${filename}`;

    await s3.send(new PutObjectCommand({
      Bucket: BUCKET,
      Key: key,
      Body: buffer,
      ContentType: contentType || 'image/jpeg',
    }));

    const finalImageUrl = `https://img.nitakupenda.eu.cc/${key}`;

    return res.status(200).json({ finalImageUrl });
  } catch (err) {
    console.error('Upload error:', err);
    return res.status(500).json({ error: err.message });
  }
}
