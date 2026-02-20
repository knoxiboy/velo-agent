# Velo API — GitHub OAuth (backend-handled)

Auth is **GitHub OAuth** handled entirely by the backend. No Firebase, no popups.

## Flow

1. User clicks **"Continue with GitHub"** (frontend links to `GET /api/auth/github`).
2. Backend redirects to **GitHub** for authorization.
3. User authorizes; GitHub redirects to **backend** `GET /api/auth/github/callback?code=...&state=...`.
4. Backend exchanges `code` for an access token, fetches GitHub user, issues a **JWT**, and redirects to **frontend** with `?token=JWT` (e.g. `http://localhost:5173/?token=...`).
5. Frontend stores the token and sends `Authorization: Bearer <token>` on API calls.

## Backend env (required)

In `backend/.env`:

```env
GITHUB_CLIENT_ID=...      # From GitHub OAuth App
GITHUB_CLIENT_SECRET=...  # From GitHub OAuth App
FRONTEND_URL=http://localhost:5173   # Where to redirect after login (no trailing slash)
```

Optional: `JWT_SECRET` (defaults to a dev value; set in production).

## GitHub OAuth App setup

1. Go to [GitHub → Settings → Developer settings → OAuth Apps](https://github.com/settings/developers) → **New OAuth App**.
2. **Authorization callback URL** must be exactly:
   - Local: `http://localhost:5000/api/auth/github/callback`
   - Production: `https://your-backend.example.com/api/auth/github/callback`
3. Copy **Client ID** and **Client secret** into `.env`.

## Endpoints

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| GET | `/api/auth/github` | No | Redirects to GitHub. Use as the "Login with GitHub" link. |
| GET | `/api/auth/github/callback` | No | GitHub redirects here. Exchanges code, redirects to frontend with `?token=...`. |
| GET | `/api/auth/me` | Yes (JWT) | Returns `{ "user": { "id", "login", "email" } }`. |
| POST | `/api/analyze` | Yes (JWT) | Requires `Authorization: Bearer <token>`. |

## Frontend

- **Login:** Link to `{API_URL}/api/auth/github` (full navigation; user leaves the app and returns with `?token=...`).
- **After return:** Frontend reads `token` from the URL, saves to sessionStorage, cleans the URL.
- **API calls:** Send `Authorization: Bearer <token>`.
- **Logout:** Clear token from sessionStorage.
