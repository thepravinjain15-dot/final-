Deployment notes

- This project is configured to deploy to Vercel as a static site with serverless API endpoints.
- Add the following environment variable in Vercel (Project → Settings → Environment Variables):
  - `GEMINI_API_KEY` (value: your Gemini API key, *keep secret*)

API routes

- `/api/chat` (POST) - body: `{ message: string }` — returns `{ reply }`.
- `/api/insights` (GET) - query: `?skill=JavaScript` — returns `{ summary, links }`.
- `/api/health` (GET) - returns `{ status: 'ok' }`.

To deploy on Vercel

1. Create/import project in Vercel and point to this GitHub repository.
2. Build command: `npm run vercel-build` (or `npm run build`). Output directory: `dist`.
3. Add `GEMINI_API_KEY` in Environment Variables (Preview and Production as needed).
4. Trigger deploy.

Notes

- If you prefer a persistent backend, deploy the `server/` folder to Railway/Render and set `VITE_API_BASE_URL` in Vercel to the backend base URL.  
- Do NOT commit `.env.local` or any secret files. Use Vercel env vars for secrets.
