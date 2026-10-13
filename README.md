# Booking & Reservation System

This is a booking platform for managing appointment services, customer bookings, and admin operations.

## Overview

This project includes:

- `backend/`: Express API with Prisma and PostgreSQL
- `frontend/`: Next.js application for customers and admins

The system allows:

- customer registration and login
- service browsing and booking
- admin dashboard management
- appointment scheduling and cancellation
- UTC-based business-hour configuration

## Tech Stack

### Backend
- Node.js
- Express
- TypeScript
- Prisma ORM
- PostgreSQL
- JWT authentication
- Zod validation

### Frontend
- Next.js
- React
- TypeScript
- Tailwind CSS
- React Query
- Zustand

## Project Structure

```text
booking/
├── backend/
│   ├── prisma/
│   ├── src/
│   ├── .env.example
│   ├── package.json
│   └── tsconfig.json
├── frontend/
│   ├── src/
│   ├── .env.example
│   ├── package.json
│   └── next.config.js
├── README.md
└── .gitignore
```

## Prerequisites

Before running the application, make sure you have:

- Node.js 20+ installed
- PostgreSQL running locally or in a hosted environment
- pnpm installed globally (`npm install -g pnpm`)
- npm available for the frontend

## Environment Setup

### 1) Backend

Copy the example environment file and configure the required values:

```bash
cd backend
cp .env.example .env
```

The current project setup uses Supabase for the database and local Next.js frontend access. Update `.env` to match the current configuration:

```env
DATABASE_URL="postgresql://postgres:[YOUR_PASSWORD]@aws-0-ap-northeast-1.pooler.supabase.com:6543/postgres?pgbouncer=true"
DIRECT_URL="postgresql://postgres:[YOUR_PASSWORD]@aws-0-ap-northeast-1.pooler.supabase.com:5432/postgres"
SUPABASE_URL="https://kbnylzuuggwexszhztum.supabase.co"
SUPABASE_PUBLISHABLE_KEY="sb_publishable_SCcKxnPOikEzInNR5RnCOw_t6mSZ3m4"
JWT_SECRET="keep-the-current-secret-from-backend/.env"
PORT=4000
CORS_ORIGIN="http://localhost:3000"
```

Notes:

- `DATABASE_URL` is used by Prisma for regular app connections.
- `DIRECT_URL` is the direct connection used for Prisma operations that need a non-pooler connection.
- `SUPABASE_URL` and `SUPABASE_PUBLISHABLE_KEY` match the active Supabase project in this environment.
- `JWT_SECRET` should match the current backend environment value and must stay private.

### 2) Frontend

```bash
cd frontend
cp .env.example .env.local
```

The default example is:

```env
NEXT_PUBLIC_API_URL=http://localhost:4000/api
```

## Installation and Run Steps

### Backend

```bash
cd backend
pnpm install
pnpm exec prisma migrate deploy
pnpm exec prisma generate
pnpm run seed:admin
pnpm run dev
```

The admin seed creates or updates the admin account:

- email: `p@gmail.com`

The script prompts for a password in hidden input mode. Use the same password again when logging in to `/admin/login`.

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Then open:

- Frontend: `http://localhost:3000`
- Backend API: `http://localhost:4000`

## Admin Access

Once the backend is running and the admin seed has been created:

- visit `/admin/login`
- sign in with `p@gmail.com`
- use the password created during `pnpm run seed:admin`

From the admin dashboard, you can:

- create and manage services
- view bookings
- cancel or review customer reservations

## Customer Flow

Customers can:

- register and log in
- choose a service
- select an available time slot
- confirm a booking after logging in

## Important Notes

- Business hours default to UTC and are configured for weekday availability from 09:00 to 17:00.
- Passwords for customer registration must be at least 8 characters long.
- Existing database records are preserved during ID migration steps.
- Existing sessions may require re-login after major schema changes.
- No automated test suite has been added yet.