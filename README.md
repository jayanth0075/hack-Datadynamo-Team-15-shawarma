# RiskLens Frontend Workspace

This repository tracks the ChainReaction executive dashboard, a futuristic light-themed React app for monitoring operational risk. The frontend lives inside the `frontend/` directory and is powered by Vite, React 18, and Lucide icons.

## Getting Started

1. Install dependencies from the frontend directory:
   ```bash
   cd frontend
   npm install
   ```
2. Launch the development server:
   ```bash
   npm run dev
   ```
3. Visit the UI at http://localhost:3000 while your backend serves `/events` and `/summary`.

## Repo Structure

- `frontend/` – Vite React application
- `FRONTEND_CHECKLIST.md` – detailed readiness tracker for stakeholders
- `.gitignore` – ignores build outputs

For environment configuration, copy `frontend/.env.example` to `frontend/.env.local` and point `VITE_API_URL` at your backend service.
