# Backend setup

1. **Python**: Use Python 3.10+.

2. **Install dependencies** (from `backend/` directory):
   ```bash
   python -m pip install -r requirements.txt
   ```
   On Windows, if `pip` is not in PATH, use `python -m pip` as above.

3. **Environment**: Copy `.env.example` to `.env` and set:
   - `GEMINI_API_KEY` — from [Google AI Studio](https://aistudio.google.com/app/apikey)
   - `GITHUB_CLIENT_ID` and `GITHUB_CLIENT_SECRET` — from a [GitHub OAuth App](https://github.com/settings/developers)  
     Callback URL must be: `http://localhost:5000/api/auth/github/callback`
   - `FRONTEND_URL` — e.g. `http://localhost:5173`

4. **Run**:
   ```bash
   python app.py
   ```

See `AUTH.md` for full GitHub OAuth details.
