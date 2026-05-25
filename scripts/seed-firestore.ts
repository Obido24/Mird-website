import { readFileSync } from 'fs';
import { resolve } from 'path';
import { seedPayload } from '@/lib/mock-data';

function loadEnvFile() {
  const envPath = resolve(process.cwd(), '.env.local');
  const contents = readFileSync(envPath, 'utf8');

  for (const line of contents.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) {
      continue;
    }

    const equalsIndex = trimmed.indexOf('=');
    if (equalsIndex === -1) {
      continue;
    }

    const key = trimmed.slice(0, equalsIndex).trim();
    let value = trimmed.slice(equalsIndex + 1).trim();

    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }

    process.env[key] = value.replace(/\\n/g, '\n');
  }
}

async function seedCollection(name: keyof typeof seedPayload) {
  const { adminDb } = await import('@/lib/firebase-admin');
  const db = adminDb();
  const items = seedPayload[name];

  for (const item of items) {
    await db.collection(name).doc(item.id).set({
      ...item,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    });
  }
}

async function main() {
  loadEnvFile();

  for (const key of Object.keys(seedPayload) as Array<keyof typeof seedPayload>) {
    await seedCollection(key);
  }

  console.log('Firestore seed completed.');
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
