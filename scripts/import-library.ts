import * as fs from 'fs';
import * as path from 'path';

// .env.local から環境変数を読み込む（簡易実装）
const envPath = path.resolve(process.cwd(), '.env.local');
if (fs.existsSync(envPath)) {
  const envConfig = fs.readFileSync(envPath, 'utf8');
  envConfig.split('\n').forEach((line) => {
    const [key, value] = line.split('=');
    if (key && value) {
      process.env[key.trim()] = value.trim();
    }
  });
}

const serviceDomain = process.env.MICROCMS_SERVICE_DOMAIN;
const apiKey = process.env.MICROCMS_API_KEY;

if (!serviceDomain || !apiKey) {
  console.error('Error: MICROCMS_SERVICE_DOMAIN or MICROCMS_API_KEY is not set in .env.local');
  process.exit(1);
}

const importData = async () => {
  const args = process.argv.slice(2);
  const jsonFilePath = args[0];

  if (!jsonFilePath) {
    console.error('Usage: npx tsx scripts/import-library.ts <path-to-json-file>');
    process.exit(1);
  }

  const filePath = path.resolve(process.cwd(), jsonFilePath);
  if (!fs.existsSync(filePath)) {
    console.error(`Error: File not found at ${filePath}`);
    process.exit(1);
  }

  let data;
  try {
    const fileContent = fs.readFileSync(filePath, 'utf8');
    data = JSON.parse(fileContent);
  } catch (error) {
    console.error(`Error parsing JSON: ${(error as Error).message}`);
    process.exit(1);
  }

  // Ensure it's an array
  const items = Array.isArray(data) ? data : [data];
  console.log(`Found ${items.length} items to import.`);

  let successCount = 0;
  let failCount = 0;

  for (const item of items) {
    try {
      console.log(`Importing: ${item.title}...`);
      const response = await fetch(`https://${serviceDomain}.microcms.io/api/v1/library`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-MICROCMS-API-KEY': apiKey,
        },
        body: JSON.stringify(item),
      });

      if (response.ok) {
        console.log(`✅ Success: ${item.title}`);
        successCount++;
      } else {
        const errJson = await response.json().catch(() => ({}));
        console.error(`❌ Failed: ${item.title}`);
        console.error(`Status: ${response.status}`, errJson);
        failCount++;
      }
    } catch (error) {
      console.error(`❌ Network error for ${item.title}: ${(error as Error).message}`);
      failCount++;
    }
    
    // APIのレートリミットを避けるために1秒待機
    await new Promise(resolve => setTimeout(resolve, 1000));
  }

  console.log('-----------------------------------');
  console.log(`Import Summary: ${successCount} succeeded, ${failCount} failed.`);
};

importData();
