import { useState } from 'react';
import InputForm from './components/InputForm';
import RunSummaryCard from './components/RunSummaryCard';
import ScoreBreakdown from './components/ScoreBreakdown';
import FixesTable from './components/FixesTable';
import CICDTimeline from './components/CICDTimeline';

const MOCK_RESPONSE = {
  repo_url: 'https://github.com/demo/ci-demo',
  team_name: 'Alpha Squad',
  leader_name: 'Sarah Connor',
  branch_name: 'SARAH_CONNOR_AI_Fix',
  total_failures: 7,
  total_fixes: 5,
  ci_status: 'PASSED',
  execution_time: '3m 42s',
  score_breakdown: {
    base: 100,
    speed_bonus: 10,
    efficiency_penalty: 0,
    final_score: 110,
  },
  fixes: [
    { file: 'src/api/routes.py',   bug_type: 'SYNTAX',      line_number: 42,  commit_message: 'fix: corrected missing colon in function definition',  status: 'fixed' },
    { file: 'src/utils/parser.js', bug_type: 'LINTING',     line_number: 17,  commit_message: 'style: removed trailing whitespace and unused imports',  status: 'fixed' },
    { file: 'src/models/user.ts',  bug_type: 'TYPE_ERROR',  line_number: 88,  commit_message: 'fix: resolved type mismatch in UserProfile interface',   status: 'fixed' },
    { file: 'components/Nav.tsx',  bug_type: 'IMPORT',      line_number: 3,   commit_message: 'fix: corrected relative import path for NavBar module',  status: 'fixed' },
    { file: 'tests/test_auth.py',  bug_type: 'LOGIC',       line_number: 56,  commit_message: 'fix: fixed inverted condition in auth validation logic',  status: 'fixed' },
    { file: 'src/config.yaml',     bug_type: 'INDENTATION', line_number: 14,  commit_message: 'style: normalized YAML indentation to 2-space standard', status: 'failed' },
    { file: 'src/db/queries.sql',  bug_type: 'SYNTAX',      line_number: 101, commit_message: 'fix: added missing semicolon in SELECT statement',       status: 'failed' },
  ],
  timeline: [
    { status: 'FAILED', timestamp: '14:02:13', message: 'Initial lint check — 7 violations detected', failures_in_run: 7, fixes_in_run: 0 },
    { status: 'FAILED', timestamp: '14:03:01', message: 'Syntax & import fixes applied — partial success', failures_in_run: 4, fixes_in_run: 3 },
    { status: 'FAILED', timestamp: '14:03:55', message: 'Type errors resolved — 2 remaining', failures_in_run: 2, fixes_in_run: 2 },
    { status: 'PASSED', timestamp: '14:04:44', message: 'Logic & linting issues patched — pipeline green', failures_in_run: 0, fixes_in_run: 2 },
  ],
};

function Logo() {
  return (
    <div className="flex items-center gap-3">
      <div className="relative w-9 h-9">
        <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 opacity-90" />
        <div className="absolute inset-0 flex items-center justify-center">
          <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </div>
      </div>
      <div>
        <span className="text-xl font-black text-white tracking-tight">VELO</span>
        <span className="ml-2 text-xs text-indigo-400 font-semibold tracking-widest uppercase">CI/CD Agent</span>
      </div>
    </div>
  );
}

function StatusDot({ active }) {
  return (
    <span className="flex items-center gap-1.5 text-xs text-slate-500">
      <span className={`w-1.5 h-1.5 rounded-full ${active ? 'bg-emerald-400' : 'bg-slate-600'}`}
        style={active ? { animation: 'pulse 2s ease-in-out infinite' } : {}} />
      {active ? 'Live' : 'Idle'}
    </span>
  );
}

function ErrorBanner({ message, onDismiss }) {
  return (
    <div className="flex items-start gap-3 p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 fade-in-up">
      <svg className="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
          d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
      </svg>
      <div className="flex-1">
        <p className="text-sm font-semibold">Analysis Failed</p>
        <p className="text-xs mt-1 text-red-400/70">{message}</p>
      </div>
      <button onClick={onDismiss} className="text-red-400/60 hover:text-red-400 transition-colors">
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
}

const PIPELINE_NODES = [
  {
    label: 'Sandbox Tester',
    color: 'border-indigo-500/50 bg-indigo-500/5',
    accent: 'text-indigo-400',
    bulletColor: 'bg-indigo-400',
    iconColor: 'bg-indigo-500/10 border-indigo-500/30',
    points: ['Run all test files', 'Detect failures', 'Docker / subprocess'],
    icon: (
      <svg className="w-5 h-5 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
          d="M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2V9M9 21H5a2 2 0 01-2-2V9m0 0h18" />
      </svg>
    ),
  },
  {
    label: 'LLM Solver',
    color: 'border-violet-500/50 bg-violet-500/5',
    accent: 'text-violet-400',
    bulletColor: 'bg-violet-400',
    iconColor: 'bg-violet-500/10 border-violet-500/30',
    points: ['Gemini 2.5 Flash AI', 'Root cause analysis', 'Generate code patch'],
    icon: (
      <svg className="w-5 h-5 text-violet-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
          d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
  },
  {
    label: 'GitOps',
    color: 'border-emerald-500/50 bg-emerald-500/5',
    accent: 'text-emerald-400',
    bulletColor: 'bg-emerald-400',
    iconColor: 'bg-emerald-500/10 border-emerald-500/30',
    points: ['Commit with [AI-AGENT]', 'Push fix branch', 'Re-run & verify'],
    icon: (
      <svg className="w-5 h-5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
          d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414A1 1 0 0120 8.414V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2" />
      </svg>
    ),
  },
];

function PipelineDiagram() {
  return (
    <div className="w-full py-8">
      <div className="text-center mb-6">
        <span className="text-xs text-slate-500 uppercase tracking-[0.2em] font-semibold">How it works</span>
      </div>
      <div className="flex flex-col md:flex-row items-stretch gap-0">
        {PIPELINE_NODES.map((node, i) => (
          <div key={node.label} className="flex flex-col md:flex-row items-center flex-1">
            {/* Node card */}
            <div className={`flex-1 w-full rounded-2xl border p-5 ${node.color}`}>
              <div className={`w-10 h-10 rounded-xl border flex items-center justify-center mb-3 ${node.iconColor}`}>
                {node.icon}
              </div>
              <p className={`text-xs font-black uppercase tracking-[0.15em] mb-2 ${node.accent}`}>{node.label}</p>
              <ul className="space-y-1">
                {node.points.map(pt => (
                  <li key={pt} className="flex items-center gap-2 text-xs text-slate-400">
                    <span className={`w-1 h-1 rounded-full flex-shrink-0 ${node.bulletColor}`} />
                    {pt}
                  </li>
                ))}
              </ul>
            </div>
            {/* Arrow between nodes */}
            {i < PIPELINE_NODES.length - 1 && (
              <div className="flex items-center justify-center md:px-3 py-3 md:py-0 flex-shrink-0">
                <svg className="w-5 h-5 text-slate-600 md:block hidden" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
                <svg className="w-5 h-5 text-slate-600 md:hidden" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function App() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [demoFill, setDemoFill] = useState(null);

  const handleSubmit = async (formData) => {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      const res = await fetch(`${API_BASE}/api/analyze`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const errBody = await res.json().catch(() => ({}));
        throw new Error(errBody.message || `Server error: ${res.status}`);
      }

      const data = await res.json();
      setResult(data);
    } catch (err) {
      // Fallback to mock data in dev when backend is unavailable
      if (err.message.includes('fetch') || err.message.includes('Failed to fetch') || err.message.includes('NetworkError')) {
        console.warn('Backend unavailable — using mock data');
        await new Promise(r => setTimeout(r, 2200));
        setResult({
          ...MOCK_RESPONSE,
          repo_url: formData.repo_url || MOCK_RESPONSE.repo_url,
          team_name: formData.team_name || MOCK_RESPONSE.team_name,
          leader_name: formData.leader_name || MOCK_RESPONSE.leader_name,
          branch_name: `${[formData.team_name, formData.leader_name].filter(Boolean).join(' ').replace(/\s+/g, '_').toUpperCase()}_AI_Fix`,
        });
      } else {
        setError(err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setResult(null);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f]">
      {/* Ambient background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-600/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-violet-600/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-0 w-64 h-64 bg-blue-600/3 rounded-full blur-3xl" />
      </div>

      {/* Header */}
      <header className="relative z-10 border-b border-[#1a1a2e] bg-[#0a0a0f]/80 backdrop-blur-xl sticky top-0">
        <div className="max-w-[1400px] mx-auto px-6 py-4 flex items-center justify-between">
          <Logo />
          <div className="flex items-center gap-6">
            <StatusDot active={loading || !!result} />
            <div className="flex items-center gap-2 text-xs text-slate-600">
              <span className="w-px h-4 bg-[#2a2a4a]" />
              <span>v2.0.1</span>
            </div>
            {result && (
              <button
                onClick={handleReset}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#2a2a4a] text-xs text-slate-400 hover:text-white hover:border-slate-400 transition-all duration-200"
              >
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                New Analysis
              </button>
            )}
          </div>
        </div>
      </header>

      <main className="relative z-10 w-full px-6 py-10">

        {/* Landing layout — two columns on xl screens, centered */}
        {!result && (
          <div className="max-w-[1400px] mx-auto mb-10">
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-12 xl:gap-20 items-center xl:py-12 py-6">

              {/* Left — Hero */}
              <div className="fade-in-up flex flex-col justify-center items-center xl:items-start text-center xl:text-left">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-medium mb-6 w-fit">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" style={{ animation: 'pulse 2s ease-in-out infinite' }} />
                  Autonomous Healing Pipeline
                </div>
                <h1 className="text-4xl md:text-5xl xl:text-6xl font-black text-white mb-5 leading-[1.1]">
                  CI/CD Failures
                  <br />
                  <span className="bg-gradient-to-r from-indigo-400 via-violet-400 to-purple-400 bg-clip-text text-transparent">Healed</span>
                  {' '}Automatically
                </h1>
                <p className="text-slate-400 text-lg leading-relaxed mb-8 max-w-lg">
                  Submit your repository and let Velo detect, analyze, and patch CI/CD failures autonomously — with a full audit trail.
                </p>

                {/* Stats row */}
                <div className="flex flex-wrap gap-6 justify-center xl:justify-start">
                  {[
                    { value: '5x', label: 'Faster fixes' },
                    { value: '3', label: 'Agent nodes' },
                    { value: '5', label: 'Max retries' },
                  ].map(({ value, label }) => (
                    <div key={label} className="flex flex-col">
                      <span className="text-2xl font-black text-white">{value}</span>
                      <span className="text-xs text-slate-500 uppercase tracking-wider">{label}</span>
                    </div>
                  ))}
                </div>

                {/* Try demo button */}
                <div className="mt-8">
                  <button
                    onClick={() => setDemoFill({
                      repo_url: 'https://github.com/oyelurker/velo-agent',
                      team_name: 'RIFT ORGANISERS',
                      leader_name: 'Saiyam Kumar',
                    })}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-indigo-500/30 bg-indigo-500/10 text-indigo-400 text-xs font-semibold hover:bg-indigo-500/20 hover:border-indigo-500/50 transition-all duration-200"
                  >
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Try with Demo Repo
                  </button>
                </div>

                {/* Pipeline mini-diagram */}
                <div className="mt-8 flex items-center gap-2 flex-wrap justify-center xl:justify-start">
                  {[
                    { label: 'Sandbox Tester', color: 'border-indigo-500/40 text-indigo-400' },
                    { label: 'LLM Solver', color: 'border-violet-500/40 text-violet-400' },
                    { label: 'GitOps', color: 'border-emerald-500/40 text-emerald-400' },
                  ].map(({ label, color }, i) => (
                    <div key={label} className="flex items-center gap-2">
                      <div className={`px-3 py-1.5 rounded-lg border text-xs font-semibold ${color} bg-[#0d0d1f]`}>
                        {label}
                      </div>
                      {i < 2 && (
                        <svg className="w-4 h-4 text-slate-600 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Right — Input Form */}
              <div className="fade-in-up" style={{ animationDelay: '0.1s' }}>
                <InputForm onSubmit={handleSubmit} loading={loading} prefill={demoFill} />
              </div>

            </div>

            {/* Pipeline diagram — below the two columns */}
            {!loading && (
              <div className="border-t border-[#1a1a2e] mt-4 pt-2">
                <PipelineDiagram />
              </div>
            )}
          </div>
        )}

        {/* Error banner */}
        {error && (
          <div className="max-w-[1400px] mx-auto mb-8">
            <ErrorBanner message={error} onDismiss={() => setError(null)} />
          </div>
        )}

        {/* Results Dashboard */}
        {result && (
          <div className="max-w-[1400px] mx-auto space-y-6">
            {/* Section 2 — Run Summary */}
            <RunSummaryCard data={result} />

            {/* Section 3 — Score */}
            <ScoreBreakdown data={result} />

            {/* Sections 4 & 5 — side by side on large screens */}
            <div className="grid grid-cols-1 xl:grid-cols-5 gap-6">
              <div className="xl:col-span-3">
                <FixesTable fixes={result.fixes || []} />
              </div>
              <div className="xl:col-span-2">
                <CICDTimeline runs={result.timeline || []} maxIterations={result.max_iterations || 5} />
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-[#1a1a2e] mt-16 py-6">
        <div className="max-w-[1400px] mx-auto px-6 flex items-center justify-between flex-wrap gap-2">
          <span className="text-xs text-slate-700">Velo Autonomous CI/CD Agent — 2026</span>
          <span className="text-xs text-slate-700 font-mono">POST → {(import.meta.env.VITE_API_URL || 'http://localhost:5000')}/api/analyze</span>
        </div>
      </footer>
    </div>
  );
}
