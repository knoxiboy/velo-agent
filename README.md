# 🚀 Velo: Autonomous CI/CD Healing Agent

> **Self-Correction for Modern DevOps Pipelines**

Velo is an agentic AI system that autonomously detects, analyzes, and repairs broken CI/CD pipelines.
Built for the **RIFT 2026 Hackathon**, it leverages **Gemini 2.5 Flash** and **LangGraph** to bridge the gap between *“failing tests”* and *“production-ready fixes.”*

---

## 🔗 Live Links

* 🌐 **Live Demo:** https://velo-agent.vercel.app
* ⚙ **Backend API:** https://velo-agent-production.up.railway.app
* 🎥 **Demo Video:** 
* 💻 **GitHub Repo:** https://github.com/oyelurker/velo-agent

---

# 🏗 Architecture Overview

```
┌──────────────────────────────────────────────────────────────────┐
│                  VELO — AUTONOMOUS CI/CD AGENT                    │
│                                                                    │
│  React Dashboard (Vercel)      Flask Backend (Railway)             │
│  ┌──────────────────────┐      ┌───────────────────────────────┐  │
│  │ Input:               │      │                               │  │
│  │  • GitHub Repo URL   │─POST─►  1. Resolve Clone URL         │  │
│  │  • Team Name         │      │     Fork repo if needed       │  │
│  │  • Leader Name       │      │     (GitHub REST API)         │  │
│  │  • Run Analysis btn  │      │                               │  │
│  └──────────────────────┘      │  LangGraph StateGraph         │  │
│                                │  ┌─────────────────────────┐  │  │
│  Live SSE Terminal  ◄──────────│  │ Node 1: Sandbox Tester  │  │  │
│                                │  │  os.walk() discovery    │  │  │
│  Results Dashboard:            │  │  Docker / subprocess    │  │  │
│  • Run Summary Card            │  │  pytest / npm test      │  │  │
│  • Score Breakdown  ◄──────────│  └──────────┬──────────────┘  │  │
│  • Fixes Table                 │             │ test logs        │  │
│  • CI/CD Timeline  ◄───────────│  ┌──────────▼──────────────┐  │  │
│  • View PR Button              │  │ Node 2: LLM Solver      │  │  │
│                                │  │  Gemini 2.5 Flash       │  │  │
│                                │  │  Bug classification     │  │  │
│                                │  │  Fix generation         │  │  │
│                                │  └──────────┬──────────────┘  │  │
│                                │             │ fixes dict       │  │
│                                │  ┌──────────▼──────────────┐  │  │
│                                │  │ Node 3: GitOps Manager  │  │  │
│                                │  │  Apply file fixes       │  │  │
│                                │  │  [AI-AGENT] commit      │  │  │
│                                │  │  Push to fork branch    │  │  │
│                                │  │  Open GitHub PR         │  │  │
│                                │  │  Write results.json     │  │  │
│                                │  └──────────┬──────────────┘  │  │
│                                │             │                  │  │
│                                │     ┌───────▼────────┐         │  │
│                                │     │  Tests PASSED? │         │  │
│                                │     │  Yes → Done    │         │  │
│                                │     │  No  → Retry   │         │  │
│                                │     │  (max 5 times) │         │  │
│                                │     └────────────────┘         │  │
│                                └───────────────────────────────┘  │
└──────────────────────────────────────────────────────────────────┘
```

---

# ✨ Key Features

### 🔍 Zero-Config Discovery

Uses `os.walk()` to dynamically find all test files. No hardcoded paths.

### 🔐 Secure Sandboxing

Runs tests inside Docker containers:

* `python:3.11-slim`
* `node:20-slim`
  Subprocess fallback when Docker is unavailable.

### 🧠 Gemini 2.5 Flash Analysis

Performs deep log analysis:

* Classifies exact bug type
* Generates targeted, minimal fixes

### 🌿 Fork-Based GitOps

* Forks any public repository
* Applies fixes automatically
* Commits with `[AI-AGENT]` prefix
* Opens cross-fork Pull Request

### 🔁 Iterative Healing

Retries up to **5 times** until all tests pass or retry limit is reached.

### 📡 Live Streaming

SSE-based real-time terminal showing the agent working live.

---

# 🛠 Tech Stack

| Layer                | Technology                             |
| -------------------- | -------------------------------------- |
| **Orchestration**    | LangGraph (StateGraph — 3 nodes)       |
| **LLM**              | Google Gemini 2.5 Flash                |
| **Backend**          | Python 3.11, Flask 3                   |
| **Frontend**         | React 19, Vite 7, Tailwind CSS 4       |
| **State Management** | React Context API                      |
| **Infrastructure**   | Docker SDK, GitPython, GitHub REST API |
| **Deployment**       | Railway (backend), Vercel (frontend)   |

---

# ⚙ Installation & Setup

## 📦 Prerequisites

* Python 3.11+
* Node.js 20+
* Docker Desktop / Engine
* Google Gemini API Key
* GitHub Personal Access Token (repo scope)

---

## 🚀 Quick Start

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/oyelurker/velo-agent.git
cd velo-agent
```

### 2️⃣ Backend Setup

```bash
cd backend
cp .env.example .env
# Fill GEMINI_API_KEY and GITHUB_TOKEN
pip install -r requirements.txt
python app.py
```

### 3️⃣ Frontend Setup

```bash
cd frontend
cp .env.example .env
# Set VITE_API_URL=http://localhost:5000
npm install
npm run dev
```

---

# 🌍 Environment Variables

## Backend (`backend/.env`)

```env
GEMINI_API_KEY=your_gemini_api_key_here
GITHUB_TOKEN=ghp_your_bot_token_here
GIT_AUTHOR_NAME=velo-heal-bot
GIT_AUTHOR_EMAIL=bot@example.com
MAX_RETRIES=5
PORT=5000
FLASK_ENV=production
ALLOWED_ORIGINS=*
```

## Frontend (`frontend/.env`)

```env
VITE_API_URL=https://your-railway-url.up.railway.app
```

---

# 🧪 Usage Example

1. Open https://velo-agent.vercel.app
2. Enter a GitHub repository URL with failing tests:

```
https://github.com/PTejasKr/velo_8_error
```

3. Enter:

   * Team Name (e.g., `Vakratund`)
   * Leader Name (e.g., `Tejas Kumar Punyap`)
4. Click **Run Analysis**

The agent will:

* Fork the repository
* Discover tests using `os.walk()`
* Run tests inside Docker sandbox
* Send logs to Gemini 2.5 Flash
* Apply fixes with `[AI-AGENT]` commit
* Push to branch:

  ```
  VAKRATUND_TEJAS_KUMAR_PUNYAP_AI_Fix
  ```
* Open a Pull Request automatically

Dashboard includes:

* Score breakdown
* Fixes table
* CI/CD timeline
* View PR button

---

# 🐞 Supported Bug Types

| Bug Type      | Description           | Example                            |
| ------------- | --------------------- | ---------------------------------- |
| `LINTING`     | Code style violations | Unused import `os`                 |
| `SYNTAX`      | Parse errors          | Missing colon after `def`          |
| `LOGIC`       | Incorrect logic       | Wrong comparison operator          |
| `TYPE_ERROR`  | Type mismatches       | Passing `str` where `int` expected |
| `IMPORT`      | Import failures       | Missing or circular imports        |
| `INDENTATION` | Indentation errors    | Mixed tabs and spaces              |

### Required Output Format

```
LINTING error in src/utils.py line 15 → Fix: remove the import statement
SYNTAX error in src/validator.py line 8 → Fix: add the colon at the correct position
```

---

# 🌿 Branch Naming Convention

```
TEAM_NAME_LEADER_NAME_AI_Fix
```

### Examples

| Team            | Leader             | Branch                                |
| --------------- | ------------------ | ------------------------------------- |
| Vakratund       | Tejas Kumar Punyap | `VAKRATUND_TEJAS_KUMAR_PUNYAP_AI_Fix` |
| RIFT ORGANISERS | Saiyam Kumar       | `RIFT_ORGANISERS_SAIYAM_KUMAR_AI_Fix` |

---

# ⚠ Known Limitations

* Repositories larger than **500MB** may trigger Docker timeout (180s)
* Public repositories only (private repos require collaborator token)
* Optimized for:

  * Python (`pytest`, `unittest`)
  * JavaScript / TypeScript (`npm test`)
* Railway does not support Docker-in-Docker; automatic subprocess fallback enabled

---

# 🚀 Deployment

## Backend (Railway)

1. Go to railway.app → New Project → Deploy from GitHub
2. Set root directory to `backend`
3. Add environment variables
4. Verify endpoint:

```
GET /health → {"status": "ok"}
```

## Frontend (Vercel)

1. Go to vercel.com → Add New Project
2. Import repository
3. Set root directory to `frontend`
4. Add `VITE_API_URL`
5. Deploy

---

# 👥 Team: Vakratund

| Name                    | Role        |
| ----------------------- | ----------- |
| **Tejas Kumar Punyap**  | Team Leader |
| **Saurav Shankar**      | Developer   |
| **Karan Mani Tripathi** | Developer   |

---

## 🏆 Built for RIFT 2026 Hackathon
