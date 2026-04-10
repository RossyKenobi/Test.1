/**
 * One-time script: migrate all image URLs in Postgres from old domain to new domain.
 * Run: node scripts/migrate-image-domain.mjs
 *
 * Safe to run multiple times — idempotent (only replaces exact matches).
 */
import { neon } from '@neondatabase/serverless';
import { config } from 'dotenv';

config({ path: '.env.local' });

const OLD_DOMAIN = 'img.nitakupenda.eu.cc';
const NEW_DOMAIN = 'img.penumbrae.uk';

async function main() {
  const sql = neon(process.env.POSTGRES_URL);

  console.log(`\n🔍 Scanning photos table for "${OLD_DOMAIN}"...\n`);

  // 1. Dry run — count affected rows
  const countResult = await sql`
    SELECT COUNT(*) as total FROM photos
    WHERE image_url LIKE ${'%' + OLD_DOMAIN + '%'}
  `;
  const affected = parseInt(countResult[0].total);

  if (affected === 0) {
    console.log('✅ No rows contain the old domain. Nothing to migrate.');
    return;
  }

  console.log(`📊 Found ${affected} photo(s) with old domain.\n`);

  // 2. Show a sample of what will change
  const samples = await sql`
    SELECT id, image_url FROM photos
    WHERE image_url LIKE ${'%' + OLD_DOMAIN + '%'}
    LIMIT 5
  `;

  console.log('Sample before → after:');
  for (const row of samples) {
    const newUrl = row.image_url.replace(OLD_DOMAIN, NEW_DOMAIN);
    console.log(`  [${row.id}] ${row.image_url}`);
    console.log(`       → ${newUrl}\n`);
  }

  // 3. Execute the migration
  console.log(`🚀 Replacing "${OLD_DOMAIN}" → "${NEW_DOMAIN}" in ${affected} row(s)...`);

  const result = await sql`
    UPDATE photos
    SET image_url = REPLACE(image_url, ${OLD_DOMAIN}, ${NEW_DOMAIN})
    WHERE image_url LIKE ${'%' + OLD_DOMAIN + '%'}
  `;

  console.log(`\n✅ Migration complete!`);

  // 4. Verify — confirm zero remaining old-domain rows
  const verifyResult = await sql`
    SELECT COUNT(*) as remaining FROM photos
    WHERE image_url LIKE ${'%' + OLD_DOMAIN + '%'}
  `;
  const remaining = parseInt(verifyResult[0].remaining);

  if (remaining === 0) {
    console.log(`✅ Verification passed: 0 rows with old domain remaining.`);
  } else {
    console.error(`⚠️  Warning: ${remaining} rows still contain the old domain!`);
  }

  // 5. Show total photos count for sanity
  const totalPhotos = await sql`SELECT COUNT(*) as total FROM photos`;
  console.log(`\n📸 Total photos in DB: ${totalPhotos[0].total}`);
}

main().catch(err => {
  console.error('❌ Migration failed:', err);
  process.exit(1);
});
