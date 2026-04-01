import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

const s3 = new S3Client({
  region: 'auto',
  endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY,
  },
});

const BUCKET = 'my-gallery-images';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { filename, contentType } = req.body;

    if (!filename) {
      return res.status(400).json({ error: 'filename is required' });
    }

    const key = `posts/${filename}`;
    const command = new PutObjectCommand({
      Bucket: BUCKET,
      Key: key,
      ContentType: contentType || 'image/jpeg',
    });

    const uploadUrl = await getSignedUrl(s3, command, { expiresIn: 3600 });
    const finalImageUrl = `https://img.nitakupenda.eu.cc/${key}`;

    return res.status(200).json({ uploadUrl, finalImageUrl });
  } catch (err) {
    console.error('Upload presign error:', err);
    return res.status(500).json({ error: err.message });
  }
}
