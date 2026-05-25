import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';

import { applicationDefault, cert, getApps, initializeApp, type App } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { getFirestore } from 'firebase-admin/firestore';

type ServiceAccountJson = {
  type?: string;
  project_id?: string;
  projectId?: string;
  client_email?: string;
  clientEmail?: string;
  private_key?: string;
  privateKey?: string;
};

function parseServiceAccountJson(raw: string, source: string) {
  if (!raw.trim()) {
    return null;
  }

  try {
    return JSON.parse(raw) as ServiceAccountJson;
  } catch {
    throw new Error(`${source} must contain valid JSON from your Firebase service account.`);
  }
}

function loadServiceAccountFromFile() {
  const configuredPath = process.env.FIREBASE_SERVICE_ACCOUNT_PATH?.trim();
  const candidatePaths = [
    configuredPath,
    'firebase-service-account.json',
    '.firebase-service-account.json'
  ].filter((path): path is string => Boolean(path));

  for (const candidatePath of candidatePaths) {
    const absolutePath = resolve(process.cwd(), candidatePath);
    if (!existsSync(absolutePath)) {
      continue;
    }

    const raw = readFileSync(absolutePath, 'utf8');
    const parsed = parseServiceAccountJson(raw, `FIREBASE_SERVICE_ACCOUNT_PATH (${absolutePath})`);
    if (parsed) {
      return parsed;
    }
  }

  return null;
}

function parseInlineServiceAccountJson() {
  const raw = process.env.FIREBASE_SERVICE_ACCOUNT_JSON?.trim();
  if (!raw) {
    return null;
  }

  return parseServiceAccountJson(raw, 'FIREBASE_SERVICE_ACCOUNT_JSON');
}

function loadServiceAccount() {
  const fileAccount = loadServiceAccountFromFile();
  const inlineAccount = fileAccount ?? parseInlineServiceAccountJson();
  const projectId =
    inlineAccount?.project_id ??
    inlineAccount?.projectId ??
    process.env.FIREBASE_PROJECT_ID ??
    process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
  const clientEmail = inlineAccount?.client_email ?? inlineAccount?.clientEmail ?? process.env.FIREBASE_CLIENT_EMAIL;
  const privateKey =
    inlineAccount?.private_key?.replace(/\\n/g, '\n') ??
    inlineAccount?.privateKey?.replace(/\\n/g, '\n') ??
    process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n');

  if (projectId && clientEmail && privateKey) {
    return cert({
      projectId,
      clientEmail,
      privateKey
    });
  }

  return applicationDefault();
}

let adminApp: App | undefined;

export function getAdminApp() {
  if (!adminApp) {
    try {
      adminApp = getApps().length ? getApps()[0] : initializeApp({ credential: loadServiceAccount() });
  } catch {
    throw new Error(
      'Firebase Admin is not configured. Provide FIREBASE_SERVICE_ACCOUNT_PATH, FIREBASE_SERVICE_ACCOUNT_JSON, or the FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, and FIREBASE_PRIVATE_KEY env vars.'
    );
  }
}

  return adminApp;
}

export function adminAuth() {
  return getAuth(getAdminApp());
}

export function adminDb() {
  return getFirestore(getAdminApp());
}
