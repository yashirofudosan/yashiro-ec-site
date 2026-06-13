import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';

// Load environment variables from .env.local
const envPath = path.resolve(process.cwd(), '.env.local');
if (fs.existsSync(envPath)) {
  const envConfig = fs.readFileSync(envPath, 'utf8');
  envConfig.split('\n').forEach((line) => {
    const [key, value] = line.split('=');
    if (key && value) {
      process.env[key.trim()] = value.slice(value.indexOf('=') + 1).trim().replace(/'|"/g, '');
      const trimmedKey = key.trim();
      const trimmedValue = value.trim();
      process.env[trimmedKey] = trimmedValue;
    }
  });
}

const MICROCMS_SERVICE_DOMAIN = process.env.MICROCMS_SERVICE_DOMAIN || 'yashiro';
const MICROCMS_API_KEY = process.env.MICROCMS_API_KEY;

if (!MICROCMS_API_KEY) {
  console.error("❌ Missing required environment variable MICROCMS_API_KEY in .env.local");
  process.exit(1);
}

const importSucculents = async () => {
  const dataPath = path.resolve(process.cwd(), 'scripts/succulent-data.json');
  if (!fs.existsSync(dataPath)) {
    console.error(`❌ Data file not found at: ${dataPath}`);
    process.exit(1);
  }

  const rawData = fs.readFileSync(dataPath, 'utf8');
  const plants = JSON.parse(rawData);

  console.log(`🚀 Starting import of ${plants.length} pre-generated succulents to microCMS...`);
  let successCount = 0;

  for (const plant of plants) {
    try {
      const productPayload = {
        name: plant.name,
        price: plant.price,
        desc: plant.desc,
        element: plant.element,
        room: plant.room,
        kind: plant.kind,
        price_s: plant.price_s
        // Note: price_m and price_l are omitted since succulents are S size only
      };

      console.log(`📤 Uploading ${plant.name} to microCMS...`);
      const response = await fetch(`https://${MICROCMS_SERVICE_DOMAIN}.microcms.io/api/v1/products`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-MICROCMS-API-KEY': MICROCMS_API_KEY,
        },
        body: JSON.stringify(productPayload),
      });

      if (response.ok) {
        console.log(`✅ Successfully uploaded: ${plant.name}`);
        successCount++;
      } else {
        const errJson = await response.json().catch(() => ({}));
        console.error(`❌ Failed to upload: ${plant.name}`);
        console.error(`Status: ${response.status}`, errJson);
      }
    } catch (error) {
      console.error(`❌ Error processing ${plant.name}:`, error);
    }

    // Wait for 1.5 seconds between uploads to respect microCMS rate limits
    await new Promise(resolve => setTimeout(resolve, 1500));
  }

  console.log('-----------------------------------');
  console.log(`🎉 Import Summary: ${successCount} / ${plants.length} succeeded.`);
};

importSucculents();
