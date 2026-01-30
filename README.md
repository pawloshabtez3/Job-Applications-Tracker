# Job Application Tracker (MVP)

A clean, resume-ready job application tracker with authentication and CRUD operations.

## Tech Stack
- Frontend: Next.js (App Router), React, TypeScript, Tailwind CSS
- Backend: Node.js, Express, MongoDB, Mongoose
- Auth: JWT in httpOnly cookies

## Project Structure
- backend/ — Express API
- frontend/ — Next.js app

## Backend Setup
1. Copy environment file:
   - backend/.env.example → backend/.env
2. Update values in backend/.env:
   - MONGO_URI
   - JWT_SECRET
   - CLIENT_ORIGIN
3. Install dependencies and start:
   - npm install
   - npm run dev

## Frontend Setup
1. Copy environment file:
   - frontend/.env.example → frontend/.env.local
2. Install dependencies and start:
   - npm install
   - npm run dev

## API Routes
- POST /auth/register
- POST /auth/login
- POST /auth/logout
- GET /jobs
- POST /jobs
- PUT /jobs/:id
- DELETE /jobs/:id

## Notes
- JWT is stored in httpOnly cookies.
- CORS is configured with credentials.
- Each job is linked to a user.
