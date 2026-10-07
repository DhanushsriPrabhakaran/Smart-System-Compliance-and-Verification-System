# Smart Syllabus Compliance & Verification System — Phase 1

## Prerequisites
Node.js 18+, MongoDB 6+ running locally (or a MongoDB Atlas URI).

## Run
```bash
# Backend
cd server && cp .env.example .env   # edit JWT_SECRET, ADMIN_EMAIL, ADMIN_PASSWORD, MONGO_URI
npm install && npm run dev          # seeds departments + default admin on first start

# Frontend (second terminal)
cd client && npm install && npm run dev   # http://localhost:5173
```

## Default admin
Created on first server start from `ADMIN_EMAIL` / `ADMIN_PASSWORD` in `server/.env`. Sign in at `/admin/login`. Change the password before real use.

## Flow
Faculty registers (department from dropdown) → status `pending` → admin approves in the dashboard → faculty can log in.

## Programme codes
Seeded from the Theory course guideline table (CE, ME, EE, EC, CS, IT, CB, AM, MT, DS, CA, PA, PB, PC, PD). Re-seed any time: `npm run seed` (idempotent).
