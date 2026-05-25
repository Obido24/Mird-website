# MIDR Platform

Modern Next.js + Firebase web application for MIDR, including a premium public website and a protected admin dashboard.

## Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- Firebase Auth
- Firestore

## Setup

1. Copy `.env.example` to `.env.local`.
2. Add your Firebase client config values.
3. Add Firebase Admin service account values for server-side session handling, or paste the full JSON into `FIREBASE_SERVICE_ACCOUNT_JSON`.
4. Install dependencies and run `npm run dev`.

## Firestore collections

- `users`
- `clients`
- `projects`
- `services`
- `courses`
- `enrollments`
- `inquiries`
- `payments`
- `portfolio`

## Admin access

- Sign in at `/admin/login`.
- The login route exchanges the Firebase Auth ID token for a secure session cookie.
- Protect admin users by setting the Firebase custom claim `admin: true`, allowing the approved admin email, or storing an admin record in the Firestore `users` collection with `role: "admin"` and `active: true`.
- The default sample admin email is `admin@midr.example`.

## Notes

- The public site uses shared content files in `lib/public-content.ts`.
- The admin CRUD screens use the generic resource manager in `components/admin/resource-manager.tsx`.
- If Firestore is not configured yet, the app falls back to sample records for the dashboard UI.
