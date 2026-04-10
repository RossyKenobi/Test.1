/**
 * One-time script to set CORS on the R2 bucket.
 * Run: node scripts/set-r2-cors.mjs
 */
import { S3Client } from '@aws-sdk/client-s3';
import { config } from 'dotenv';

config({ path: '.env.local' });

const ACCOUNT_ID = process.env.R2_ACCOUNT_ID;
const ACCESS_KEY = process.env.R2_ACCESS_KEY_ID;
const SECRET_KEY = process.env.R2_SECRET_ACCESS_KEY;
const BUCKET = 'my-gallery-images';

// Use Cloudflare's own API instead of S3 PutBucketCors (R2 has XML quirks)
async function main() {
  console.log('Setting CORS on R2 bucket via Cloudflare API...');

  // R2 CORS can be set via the S3-compatible XML API directly with a raw request
  const corsXml = `<?xml version="1.0" encoding="UTF-8"?>
<CORSConfiguration>
  <CORSRule>
    <AllowedOrigin>https://nitakupenda.eu.cc</AllowedOrigin>
    <AllowedOrigin>https://penumbrae.uk</AllowedOrigin>
    <AllowedOrigin>https://*.penumbrae.uk</AllowedOrigin>
    <AllowedOrigin>https://*.vercel.app</AllowedOrigin>
    <AllowedOrigin>http://localhost:4321</AllowedOrigin>
    <AllowedOrigin>http://localhost:3000</AllowedOrigin>
    <AllowedMethod>GET</AllowedMethod>
    <AllowedMethod>PUT</AllowedMethod>
    <AllowedMethod>POST</AllowedMethod>
    <AllowedMethod>HEAD</AllowedMethod>
    <AllowedHeader>*</AllowedHeader>
    <ExposeHeader>ETag</ExposeHeader>
    <MaxAgeSeconds>3600</MaxAgeSeconds>
  </CORSRule>
</CORSConfiguration>`;

  // Use the AWS SDK to sign the request, but send raw XML
  const s3 = new S3Client({
    region: 'auto',
    endpoint: `https://${ACCOUNT_ID}.r2.cloudflarestorage.com`,
    credentials: {
      accessKeyId: ACCESS_KEY,
      secretAccessKey: SECRET_KEY,
    },
  });

  // We need to use the raw S3 API since the SDK has issues with R2 CORS
  const { SignatureV4 } = await import('@smithy/signature-v4');
  const { Sha256 } = await import('@aws-crypto/sha256-js');
  const { HttpRequest } = await import('@smithy/protocol-http');

  const url = new URL(`https://${ACCOUNT_ID}.r2.cloudflarestorage.com/${BUCKET}?cors`);

  const request = new HttpRequest({
    method: 'PUT',
    hostname: url.hostname,
    path: url.pathname + url.search,
    headers: {
      'Content-Type': 'application/xml',
      'host': url.hostname,
    },
    body: corsXml,
  });

  const signer = new SignatureV4({
    service: 's3',
    region: 'auto',
    credentials: {
      accessKeyId: ACCESS_KEY,
      secretAccessKey: SECRET_KEY,
    },
    sha256: Sha256,
  });

  const signed = await signer.sign(request);

  const res = await fetch(url.toString(), {
    method: 'PUT',
    headers: signed.headers,
    body: corsXml,
  });

  if (res.ok) {
    console.log('✅ CORS configured successfully!');
  } else {
    const text = await res.text();
    console.error(`❌ Failed (${res.status}):`, text);
  }
}

main().catch(err => {
  console.error('❌ Failed:', err);
  process.exit(1);
});
