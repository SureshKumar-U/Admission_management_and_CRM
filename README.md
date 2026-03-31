# Admission Management Fullstack App

This repository has 2 major parts:
- `backend/` - Node.js + Express API
- `client/` - React (Vite) frontend

## Prerequisites
- Node.js 18+ installed
- npm (comes with Node)
- Optional: yarn (if you prefer)

## 1) Backend setup (API)

1. Open terminal and go to backend folder:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Configure environment variables:
   - Create `.env` in `backend/` (copy from `.env.example` if exists, or create new file). Example values:
     ```ini
     PORT=8080
     MONGO_URI=mongodb://localhost:27017/your-db-name
     JWT_SECRET=your_jwt_secret_here
     JWT_EXPIRES=7d
     NODE_ENV=development
     ```
   - Keep it simple: just the keys your app expects. You can open `config/env.js` (if present) to confirm key names and defaults.

4. Start backend server:
   ```bash
   npm run dev
   ```

5. Verify API is running:
   - Default location: `http://localhost:8080` (or whichever port you set)
   - Use Postman or browser to hit `GET /` or `GET /api/health`.

## 2) Frontend setup (React app)

1. Open another terminal in the project root and go to client folder:
   ```bash
   cd client
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Configure API base URL (if needed):
   - In `src/constants/constants.js` or any environment value, set backend API base URL.
   - For example:
     ```js
     export const API_BASE_URL = 'http://localhost:5000';
     ```
4. Start frontend dev server:
   ```bash
   npm run dev
   ```

5. Open browser at:
   - `http://localhost:5173` (default Vite port)

## 3) End-to-end flow
1. Start backend first.
2. Start frontend next.
3. Signup / signin via frontend, then use app features (applicants, programs, allocation, dashboard).

## 4) Useful npm commands
- Backend:
  - `npm run dev` (development)
  - `npm start` (production, if setup)
- Frontend:
  - `npm run dev` (development server)
  - `npm run build` (build for production)
  - `npm run preview` (preview build)

## 5) Troubleshooting
- If frontend cannot reach backend:
  - Confirm backend is running and port is correct.
  - Check CORS setting in backend (`config/env.js` and middleware). 
- If dependency errors:
  - Delete `node_modules` and run `npm install` again.
- If env variables missing:
  - Verify `.env` values and restart servers.

## 6) Optional: one-command script
From root create a script (optional):
```bash
# on Unix/macOS
(cd backend && npm run dev) & (cd client && npm run dev)
``` 

## 7) Notes
- Ensure database (MongoDB or SQL) is reachable when starting backend.
- Use `npm run lint` in client if lint scripts exist and you want formatting checks.
