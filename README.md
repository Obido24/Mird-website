# MIDR Technologies Ltd

MIDR Technologies Ltd is a modern Next.js + Firebase web application for a Nigerian technology company. It includes a premium public website, an authenticated admin dashboard, Firestore-backed content, and a reusable design system built with Tailwind CSS.

## What is included

- Public marketing website
- Protected admin dashboard
- Firebase Authentication login flow
- Firestore CRUD for core business data
- Contact form inquiry storage
- Responsive premium UI for desktop and mobile
- Shared brand system and reusable components

## Tech Stack

- Next.js 15
- React 19
- TypeScript
- Tailwind CSS
- Firebase Auth
- Firestore
- Firebase Admin SDK

## Pages

### Public site

- Home
- About
- Services
- Portfolio
- Academy
- Contact
- Custom 404 page

### Admin dashboard

- Login
- Overview
- Clients
- Projects
- Services
- Courses
- Payments
- Inquiries
- Portfolio
- Settings

## Getting Started

### 1) Install dependencies

```bash
npm install
```

### 2) Create your environment file

Copy `.env.example` to `.env.local` and fill in your Firebase values.

Required client-side values:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=
NEXT_PUBLIC_MIDR_ADMIN_EMAIL=
```

Required server-side Firebase Admin values:

```env
FIREBASE_PROJECT_ID=
FIREBASE_CLIENT_EMAIL=
FIREBASE_PRIVATE_KEY=
```

You can also paste the full Firebase service account JSON into:

```env
FIREBASE_SERVICE_ACCOUNT_JSON=
```

## Firebase Setup

1. Create a Firebase project.
2. Enable Authentication.
3. Turn on Email/Password sign-in.
4. Create your admin user in Firebase Authentication.
5. Create a Firestore database.
6. Add your service account credentials to `.env.local`.
7. Set the approved admin email in `NEXT_PUBLIC_MIDR_ADMIN_EMAIL`.
8. Optionally run the admin claim script if you want the user to be flagged as admin.

## Scripts

```bash
npm run dev
npm run build
npm run start
npm run lint
npm run seed
npm run admin:claim
```

### Script details

- `npm run dev` - starts the local Next.js development server
- `npm run build` - builds the app for production
- `npm run start` - runs the production server
- `npm run lint` - runs Next.js linting
- `npm run seed` - seeds Firestore with sample MIDR data
- `npm run admin:claim` - sets the Firebase admin custom claim

## Firestore Collections

The app uses these collections:

- `users`
- `clients`
- `projects`
- `services`
- `courses`
- `enrollments`
- `inquiries`
- `payments`
- `portfolio`

## Admin Access

Admin login is available at:

```text
/admin/login
```

Access can be approved through any of these:

- Firebase custom claim `admin: true`
- Approved admin email in `NEXT_PUBLIC_MIDR_ADMIN_EMAIL`
- Firestore `users` document with `role: "admin"` and `active: true`

## Project Structure

- `app/` - Next.js app routes and layouts
- `components/` - shared UI and page components
- `lib/` - Firebase, content, and helper utilities
- `public/` - static assets such as the MIDR logo
- `scripts/` - Firestore seed and admin claim scripts

## Development Notes

- The public website text is stored in `lib/public-content.ts`.
- The admin dashboard uses reusable CRUD components.
- The contact form writes inquiries to Firestore through the API route.
- If Firebase is not configured, some dashboard screens can fall back to sample data for preview purposes.

## Deployment

This app needs a host that supports a modern Node.js Next.js deployment because it uses API routes, server-side cookies, and admin authentication.

Recommended options:

- Vercel
- A modern Node.js host
- A VPS with Node.js, Nginx, and SSL

## Security Notes

- Do not commit `.env.local`.
- Do not commit Firebase service account secrets.
- Rotate the service account key if it is ever shared outside your team.

## Brand

MIDR stands for:

```text
Making Imagination Dream a Reality
```

## License

This project is private and proprietary unless a license is added later.
