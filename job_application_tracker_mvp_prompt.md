## 🎯 MVP Prompt — Job Application Tracker

### 📌 Project Overview
Build a simple, resume‑ready **Job Application Tracker** that allows users to securely track their job applications from a dashboard.

The project focuses on **clean architecture, authentication, CRUD operations, and basic UI/UX polish** — without over‑engineering.

---

## 🛠 Tech Stack

### Frontend
- Next.js (App Router)
- React
- TypeScript
- Tailwind CSS

### Backend
- Node.js
- Express.js

### Database
- MongoDB
- Mongoose

### Authentication & Security
- JWT (stored in httpOnly cookies)
- bcrypt (password hashing)
- cookie-parser
- cors (with credentials)
- helmet
- dotenv

---

## 🔐 Authentication (MVP)

- User registration (email + password)
- User login
- Passwords hashed using bcrypt
- JWT generated on successful login
- JWT stored in httpOnly cookies
- Protected routes (only authenticated users can access job data)
- Logout clears authentication cookie

Each user can access **only their own job applications**.

---

## 📄 Job Application Features (MVP)

Each job application includes:
- Company name (required)
- Job role / position (required)
- Status: `Applied | Interview | Offer | Rejected`
- Application date
- Optional notes

### Core Actions
- Create a job application
- View all job applications
- Update job status and details
- Delete a job application

---

## 🌐 Backend API (Express)

### Auth Routes
- `POST /auth/register`
- `POST /auth/login`
- `POST /auth/logout`

### Job Routes (Protected)
- `GET /jobs`
- `POST /jobs`
- `PUT /jobs/:id`
- `DELETE /jobs/:id`

---

## 🖥 Frontend Pages (Next.js)

- `/login`
- `/register`
- `/` → Dashboard (job list)
- `/add-job`

### UI Requirements
- Loading states during API calls
- Clear error messages
- Empty state when no jobs exist
- Status dropdown for quick updates
- Clean, minimal layout
- Optional: filter jobs by status, sort by date, status badges, dark mode toggle, confirmation dialogs, success messages

---

## 🔒 Security & Best Practices

- JWT stored in httpOnly cookies (not localStorage)
- CORS configured with `credentials: true`
- Input validation on backend with express-validator
- Passwords hashed with bcrypt
- Proper HTTP status codes
- Secrets stored in environment variables
- Use helmet for basic security headers
- Each job must belong to a user (userId reference in DB)

---

## ✅ Definition of Done

The MVP is complete when:
- A user can register, log in, and log out
- Authenticated users can manage their own job applications
- Job CRUD works correctly
- UI shows loading, error, and empty states
- App runs locally and is deployable
- Optional enhancements implemented (filters, sorting, badges, dark mode, dialogs, success messages)

---

## 💡 Copilot Guidance Paragraph

When generating code, **always follow these instructions**:

> "Use JWT stored in httpOnly cookies; do not use localStorage for authentication. Keep backend simple: use Express with routes, controllers, and Mongoose models only—avoid extra abstractions. Use CORS with credentials and helmet middleware. Validate inputs on the backend and hash passwords with bcrypt. Ensure each job is linked to a user and users can only access their own jobs. In Next.js, use Server Components for data fetching and Client Components for forms or interactions. Always handle errors with proper HTTP status codes, show loading states in the frontend, and avoid overengineering or unnecessary complexity. Ask for clarification if unsure."

