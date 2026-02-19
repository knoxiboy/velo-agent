# Velo - Deployment Guide

## Prerequisites

- GitHub account with access to this repository
- Railway account (https://railway.app) for backend
- Vercel account (https://vercel.com) for frontend
- Google Gemini API key from https://aistudio.google.com/app/apikey

---

## Part 1 - Deploy Backend on Railway

### Step 1: Create Railway project
1. Go to https://railway.app and sign in with GitHub
2. Click "New Project"
3. Select "Deploy from GitHub repo"
4. Choose the `velo-agent` repository
5. When asked for the root directory, set it to `backend`

### Step 2: Set environment variables
In the Railway dashboard under "Variables", add:

```
GEMINI_API_KEY=your_gemini_api_key_here
GIT_AUTHOR_NAME=oyelurker
GIT_AUTHOR_EMAIL=oyelurker@gmail.com
MAX_RETRIES=5
PORT=5000
FLASK_ENV=production
ALLOWED_ORIGINS=*
```

### Step 3: Configure start command
Railway should auto-detect Python. If not, set the start command to:
```
python app.py
```

### Step 4: Deploy
Click "Deploy". Wait 2-3 minutes.
Once done, copy your Railway URL — it looks like:
`https://velo-agent-production.up.railway.app`

### Step 5: Verify backend is live
Open in browser:
`https://your-railway-url.up.railway.app/health`

You should see:
```json
{"service": "Velo CI/CD Healing Agent", "status": "ok", "version": "1.0.0"}
```

---

## Part 2 - Deploy Frontend on Vercel

### Step 1: Create Vercel project
1. Go to https://vercel.com and sign in with GitHub
2. Click "Add New Project"
3. Import the `velo-agent` repository
4. Set the Root Directory to `frontend`
5. Framework Preset will auto-detect as "Vite"

### Step 2: Set environment variables
In Vercel under "Environment Variables", add:

```
VITE_API_URL=https://your-railway-url.up.railway.app
```

(Replace with your actual Railway URL from Part 1)

### Step 3: Deploy
Click "Deploy". Wait 1-2 minutes.
Copy your Vercel URL — it looks like:
`https://velo-agent.vercel.app`

### Step 4: Verify frontend is live
Open the Vercel URL in your browser.
You should see the Velo dashboard with the input form.

---

## Part 3 - Update README with Live URLs

Edit README.md and update the Live Deployment section:

```markdown
## Live Deployment

| Surface | URL |
|---------|-----|
| React Dashboard | https://velo-agent.vercel.app |
| Backend API | https://velo-agent-production.up.railway.app |
```

Then commit and push:
```bash
git add README.md
git commit --trailer "Co-authored-by: Cursor <cursoragent@cursor.com>" -m "docs: add live deployment URLs"
git push origin main
```

---

## Part 4 - Test the Live Deployment

1. Open your Vercel URL
2. Enter a public GitHub repo URL with test files
3. Enter your Team Name and Leader Name
4. Click "Analyze Repository"
5. Wait 30-60 seconds for the full pipeline to run
6. Verify the dashboard shows real results

Recommended test repo: `https://github.com/oyelurker/velo-agent`
(Has intentional bugs in `healing_test/` that the agent will find and fix)

---

## Troubleshooting

### Backend shows 500 error
- Check Railway logs for errors
- Verify GEMINI_API_KEY is set correctly in Railway variables
- Make sure it is a valid AI Studio key (not Google Cloud Console key)

### Frontend cannot connect to backend
- Check VITE_API_URL is set to your Railway URL (no trailing slash)
- Verify Railway backend is running (check /health endpoint)
- Check ALLOWED_ORIGINS is set to * in Railway variables

### Push fails with 403
- The agent can only push to repos you own or have write access to
- Use your own GitHub repo as the test target

### Gemini API quota errors
- Create a new API key from https://aistudio.google.com/app/apikey
- Select "Create API key in new project" for fresh quota

---

## Local Development

See README.md for local setup instructions.

Backend runs on: http://localhost:5000
Frontend runs on: http://localhost:5173
