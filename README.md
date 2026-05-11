<div align="center">
  <img src="https://via.placeholder.com/1200x300/000000/00ff00?text=Velo:+Autonomous+CI/CD+Healing" alt="Velo Banner">
</div>

# Velo: Autonomous CI/CD Healing Agent

> **Self-Correction for Modern DevOps Pipelines.**

[![Live Demo](https://img.shields.io/badge/Live_Demo-Online-00C7B7?style=for-the-badge&logo=vercel)](https://velo-agent.vercel.app)
[![Hackathon](https://img.shields.io/badge/RIFT_2026-Winner-FFD700?style=for-the-badge)](#)
[![License](https://img.shields.io/badge/license-MIT-blue.svg?style=for-the-badge)](LICENSE)

---

## Preview

<div align="center">
  <img src="https://via.placeholder.com/800x400/111111/00ff00?text=Terminal+Healing+Pipeline" alt="Velo Execution Preview">
  <p><i>Velo analyzing a failing test suite and autonomously generating a pull request fix.</i></p>
</div>

---

## Table of Contents

- [Problem Statement](#problem-statement)
- [Solution Overview](#solution-overview)
- [Core Features](#core-features)
- [System Architecture](#system-architecture)
- [Tech Stack](#tech-stack)
- [Installation Guide](#installation-guide)
- [AI Orchestration Flow](#ai-orchestration-flow)
- [Security Measures](#security-measures)
- [Roadmap](#roadmap)

---

## Problem Statement

When a CI/CD pipeline breaks, development grinds to a halt. Engineers must context-switch, dig through hundreds of lines of cryptic terminal logs, reproduce the issue locally, and write a fix. This manual triage process costs engineering teams thousands of hours and delays critical deployments. 

---

## Solution Overview

**Velo** bridges the gap between *"failing tests"* and *"production-ready fixes."* 

It is an agentic AI system that sits inside your CI/CD pipeline. When a build fails, Velo wakes up, reads the logs, analyzes the repository context, autonomously writes the code to fix the issue, and opens a Pull Request with the proposed solution.

- **Automated Triage**: Instantly understands why a build failed.
- **Context-Aware Fixing**: Reads project files to ensure the fix aligns with existing architecture.
- **Zero-Touch PRs**: Developers just review and merge.

---

## Core Features

### 🚨 Instant Failure Detection
- **What it does**: Ingests raw stdout/stderr from failing GitHub Actions.
- **Why it matters**: Replaces manual log parsing.
- **Technical implementation**: Webhook listeners connected to GitHub workflow events.

### 🧠 Deep Root Cause Analysis
- **What it does**: Maps an error stack trace back to the exact file and line of code that caused it.
- **Why it matters**: Identifies the *disease*, not just the *symptom*.
- **Technical implementation**: Powered by Gemini 2.5 Flash for rapid, massive-context reasoning.

### 🛠️ Autonomous PR Generation
- **What it does**: Checks out a new branch, applies the fix, and opens a Pull Request.
- **Why it matters**: Keeps the developer in their standard review workflow.
- **Technical implementation**: PyGithub integration executing authenticated git operations.

---

## System Architecture

<div align="center">
  <img src="https://via.placeholder.com/800x400/000000/00ff00?text=Velo+LangGraph+Architecture" alt="Architecture Diagram">
</div>

### Data Flow
1. **Trigger**: GitHub Action fails -> sends webhook payload to Velo Backend.
2. **Analysis Node**: LangGraph agent fetches the error logs and repository files.
3. **Plan Node**: Agent formulates a fix strategy.
4. **Execute Node**: Agent writes the fix to a virtual filesystem.
5. **Validation Node**: Agent ensures syntax is correct.
6. **Commit Node**: Agent pushes branch and opens PR.

---

## Tech Stack

| Category | Technology | Purpose |
|----------|------------|---------|
| **AI Orchestration** | LangGraph, LangChain | State machine for agentic looping |
| **LLM** | Gemini 2.5 Flash | High-speed, large context window reasoning |
| **Backend API** | FastAPI (Python) | High-performance webhook ingestion |
| **Frontend UI** | Next.js | Dashboard for monitoring agent activity |
| **Deployment** | Railway, Vercel | Scalable hosting |

---

## Installation Guide

### 1. Prerequisites
- Python 3.11+
- GitHub App Configuration (for permissions)

### 2. Clone & Install
```bash
git clone https://github.com/oyelurker/velo-agent.git
cd velo-agent
pip install -r requirements.txt
```

### 3. Run Backend
```bash
uvicorn main:app --reload
```

---

## AI Orchestration Flow (Very Important)

Velo utilizes a **LangGraph State Machine** to prevent hallucination and ensure reliable fixes.
- **State Persistence**: The agent maintains a memory of what files it has read and what changes it has proposed.
- **Cyclic Validation**: If Velo generates a fix, it runs a self-correction loop. It asks itself: *"Does this fix resolve the stack trace?"* If no, it loops back to the planning phase.
- **Token Efficiency**: Instead of sending the whole repo to the LLM, Velo uses targeted RAG (Retrieval-Augmented Generation) to only fetch files mentioned in the stack trace.

---

## Security Measures

- **Strict Scopes**: Velo only requests `read` access to code and `write` access to Pull Requests.
- **Isolated Execution**: Code generation happens securely without exposing the host environment.
- **Human-in-the-Loop**: Velo *never* merges code automatically. It only opens PRs for human review.

---

## Roadmap

- [x] Basic Test Failure Healing (Jest/PyTest)
- [x] GitHub Action Integration
- [ ] Infrastructure as Code (Terraform) Healing
- [ ] Dependency Conflict Resolution

---

## License

This project is licensed under the MIT License.

---
<div align="center">
<i>Built for the RIFT 2026 Hackathon</i>
</div>
