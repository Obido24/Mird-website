import { readFileSync } from 'fs';
import { resolve } from 'path';

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

    if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1);
    }

    process.env[key] = value.replace(/\\n/g, '\n');
  }
}

async function main() {
  loadEnvFile();

  const { adminAuth } = await import('@/lib/firebase-admin');
  const email = process.env.NEXT_PUBLIC_MIDR_ADMIN_EMAIL?.trim();

  if (!email) {
    throw new Error('NEXT_PUBLIC_MIDR_ADMIN_EMAIL is missing from .env.local');
  }

  const user = await adminAuth().getUserByEmail(email);
  await adminAuth().setCustomUserClaims(user.uid, { admin: true });

  console.log(`Admin claim set for ${email}.`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
