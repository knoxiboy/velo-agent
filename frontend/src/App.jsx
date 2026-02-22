
import { useState, useEffect, useRef } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import LandingPage from './components/LandingPage';
import Dashboard from './components/Dashboard';
import AuthPage from './components/AuthPage';
import { useApp } from './context/AppContext.jsx';


const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const TAG_COLOR = {
  INFO: '#6366f1',
  ERROR: '#ef4444',
  AGENT: '#f59e0b',
  PASS: '#22c55e',
  PATCH: '#22d3ee',
  BUG: '#f87171',
};
const ASCII_ART = [
  " .`                                 `/",
  " `++:.                           `-/+/",
  "  `+sso+:-`                 `.-/+oso:",
  "   `/ossssso+/:-        -:/+osssso+-",
  "     /ossssssss/        +ssssooo/-",
  "      :osssssss/        osssso+++.",
  "       -osssssso.      :ssssssso.",
  "        .oossssso-````/ossssss+`",
  "         ./ooosssso++osssssso+`",
  "          `/+++ooooooooooooo/`",
  "           `/++++++++++++++:",
  "            `/++++/+++++++:",
  "             `/:-:++oooo+:",
  "               -+oooooo+:",
  "               `+oooooo:",
  "                `+oooo:",
  "                 `ooo/",
  "                  .o+`",
  "                   -`"
].join('\n');

/* ── Live Analyzing Screen ── */
function AnalyzingScreen({ repoUrl, liveLog }) {
  const logRef = useRef(null);
  const [memoryUsed, setMemoryUsed] = useState(420);

  useEffect(() => {
    const interval = setInterval(() => {
      setMemoryUsed(415 + Math.floor(Math.random() * 25));
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (logRef.current) {
      logRef.current.scrollTop = logRef.current.scrollHeight;
    }
  }, [liveLog]);

  // Derive which pipeline node is currently active
  const nodeMessages = liveLog.filter(e => e.message?.startsWith('── Node'));
  const activeNode = nodeMessages[nodeMessages.length - 1]?.message || '';

  const nodeStatus = (label) => {
    const idx = nodeMessages.findIndex(e => e.message?.includes(label));
    if (idx === -1) return 'pending';
    if (nodeMessages[nodeMessages.length - 1]?.message?.includes(label)) return 'active';
    return 'done';
  };

  const NODES = [
    { key: '1', label: 'Sandbox Tester', color: '#60a5fa' },
    { key: '2', label: 'LLM Solver', color: '#a78bfa' },
    { key: '3', label: 'GitOps', color: '#34d399' },
  ];

  return (
    <div style={{ background: 'var(--bg)', minHeight: '100dvh', display: 'flex', flexDirection: 'column', position: 'relative' }}>

      <div className="mesh-bg" />
      <div className="grid-overlay" />

      {/* Header */}
      <header style={{
        position: 'sticky', top: 0, zIndex: 50,
        padding: '24px 40px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 0 }}>
          <svg width="28" height="28" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ overflow: 'visible', flexShrink: 0, marginRight: 2, marginTop: -2 }}>
            <defs>
              <linearGradient id="vLeftGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FF2A54" />
                <stop offset="100%" stopColor="#FF5E3A" />
              </linearGradient>
              <linearGradient id="vRightGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#FF5E3A" />
                <stop offset="100%" stopColor="#FF9B00" />
              </linearGradient>
              <filter id="vShadow" x="-50%" y="-50%" width="200%" height="200%">
                <feDropShadow dx="3" dy="0" stdDeviation="2" floodOpacity="0.5" floodColor="#000" />
              </filter>
              <filter id="vGlow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="10" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>
            <g filter="url(#vGlow)">
              <path d="M 65 20 L 90 20 L 58 95 L 42 95 Z" fill="url(#vRightGrad)" />
              <path d="M 10 20 L 35 20 L 58 95 L 42 95 Z" fill="url(#vLeftGrad)" filter="url(#vShadow)" />
            </g>
          </svg>
          <span style={{ fontWeight: 700, fontSize: 24, letterSpacing: '-0.02em', color: 'var(--text)' }}>elo AI</span>
          <span style={{ color: 'var(--border)', fontSize: 18, margin: '0 8px' }}>/</span>
          <span style={{ fontSize: 14, fontWeight: 500, color: 'var(--text-3)', maxWidth: 300, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {repoUrl?.replace('https://github.com/', '') || 'Analyzing...'}
          </span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <span style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--success)', display: 'inline-block' }} className="pulse-dot" />
          <span className="mono" style={{ fontSize: 11, color: 'var(--success)', fontWeight: 700, letterSpacing: '0.06em' }}>LIVE</span>
        </div>
      </header>

      <main style={{ flex: 1, width: '100%', height: 'calc(100vh - 80px)', margin: '0', padding: '0 40px 40px 40px', display: 'flex', flexDirection: 'column', overflow: 'hidden', boxSizing: 'border-box' }}>

        {/* Pipeline Node Status */}
        <div className="fade-in node-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, marginBottom: 20 }}>
          {NODES.map((node, i) => {
            const status = nodeStatus(node.label);
            const isActive = status === 'active';
            const isDone = status === 'done';
            return (
              <div key={node.key} className="card" style={{
                padding: '14px 18px',
                borderColor: isActive ? node.color + '55' : isDone ? 'var(--border)' : 'var(--border-subtle)',
                background: isActive ? node.color + '0a' : 'var(--surface)',
                transition: 'all 0.3s',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                  <span className="mono" style={{
                    fontSize: 10, fontWeight: 700, letterSpacing: '0.06em',
                    color: isActive ? node.color : isDone ? 'var(--success)' : 'var(--text-3)',
                    background: (isActive ? node.color : isDone ? '#22c55e' : '#888') + '18',
                    border: `1px solid ${(isActive ? node.color : isDone ? '#22c55e' : '#888')}30`,
                    padding: '2px 7px', borderRadius: 4,
                  }}>
                    {isDone ? '✓ DONE' : isActive ? '⟳ RUNNING' : 'PENDING'}
                  </span>
                </div>
                <div style={{ fontSize: 13, fontWeight: 600, color: isActive ? 'var(--text)' : 'var(--text-2)' }}>
                  {node.label}
                </div>
              </div>
            );
          })}
        </div>

        {/* Live Terminal */}
        <div className="mock-window fade-in-1" style={{
          position: 'relative', flex: 1, display: 'flex', flexDirection: 'column',
          borderRadius: 12, overflow: 'hidden', border: '1px solid var(--border)',
          boxShadow: '0 24px 80px rgba(0,0,0,0.8), 0 0 40px rgba(255, 126, 103, 0.1)',
          background: '#050505', boxSizing: 'border-box'
        }}>
          {/* Title bar */}
          <div className="mock-window-header" style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            padding: '16px 24px', background: '#0a0a0a', borderBottom: '1px solid var(--border)'
          }}>
            <div className="mock-dots" style={{ display: 'flex', gap: 8 }}>
              <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#ff5f56' }} />
              <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#ffbd2e' }} />
              <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#27c93f' }} />
            </div>
            <div className="mono" style={{ fontSize: 13, color: 'var(--text-3)', fontWeight: 500 }}>
              velo-agent — live output
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, width: 52 }}>
              <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--success)', display: 'inline-block' }} className="pulse-dot" />
            </div>
          </div>

          {/* Log body */}
          <div ref={logRef} style={{
            flex: 1, padding: '40px 60px', overflowY: 'auto',
            background: 'transparent', display: 'flex', flexDirection: 'column',
          }}>

            <div className="mono" style={{ color: 'var(--text-3)', fontSize: 15, marginBottom: 24, display: 'flex', gap: 10, alignItems: 'center' }}>
              <span style={{ color: '#4ade80' }}>➜</span>
              <span style={{ color: '#60a5fa' }}>~</span>
              <span style={{ color: 'var(--text)' }}>neofetch | lolcat</span>
            </div>

            <div style={{ display: 'flex', gap: 60, marginBottom: 40, alignItems: 'center', flexWrap: 'wrap' }}>
              <div className="mono" style={{
                fontSize: 13, lineHeight: 1.2, whiteSpace: 'pre', fontWeight: 800,
                background: 'linear-gradient(180deg, #ff2a54, #ff5e3a, #ff9b00, #4ade80, #3b82f6, #a855f7)',
                WebkitBackgroundClip: 'text', color: 'transparent', width: 'fit-content'
              }}>
                {ASCII_ART}
              </div>

              <div className="mono" style={{ fontSize: 14, display: 'flex', flexDirection: 'column', gap: 6 }}>
                <div style={{ color: '#ff5e3a', fontWeight: 700 }}>velo<span style={{ color: 'var(--text)' }}>@</span>agent</div>
                <div style={{ color: 'var(--text-3)' }}>---------</div>
                <div><span style={{ color: '#ff5e3a', fontWeight: 700 }}>Agent Name</span>: Velo</div>
                <div><span style={{ color: '#ff5e3a', fontWeight: 700 }}>Status</span>: Analyzing & Healing</div>
                <div><span style={{ color: '#ff5e3a', fontWeight: 700 }}>Target Repo</span>: {repoUrl?.replace('https://github.com/', '') || '—'}</div>
                <div><span style={{ color: '#ff5e3a', fontWeight: 700 }}>LLM Model</span>: Gemini 2.5 Flash</div>
                <div><span style={{ color: '#ff5e3a', fontWeight: 700 }}>Active Nodes</span>: Analyzer, LLM Solver, Sandbox</div>
                <div><span style={{ color: '#ff5e3a', fontWeight: 700 }}>Core Engine</span>: Velo OS x86_64</div>
                <div><span style={{ color: '#ff5e3a', fontWeight: 700 }}>Environment</span>: Isolated Docker Sandbox</div>
                <div><span style={{ color: '#ff5e3a', fontWeight: 700 }}>Memory</span>: {memoryUsed}GiB / 6969GiB</div>
                <div><span style={{ color: '#ff5e3a', fontWeight: 700 }}>Uptime</span>: 69 days, 69 mins, 69 sec</div>

                <div style={{ display: 'flex', gap: 0, marginTop: 12 }}>
                  <div style={{ width: 18, height: 18, background: '#333' }} />
                  <div style={{ width: 18, height: 18, background: '#ef4444' }} />
                  <div style={{ width: 18, height: 18, background: '#22c55e' }} />
                  <div style={{ width: 18, height: 18, background: '#eab308' }} />
                  <div style={{ width: 18, height: 18, background: '#3b82f6' }} />
                  <div style={{ width: 18, height: 18, background: '#a855f7' }} />
                  <div style={{ width: 18, height: 18, background: '#06b6d4' }} />
                  <div style={{ width: 18, height: 18, background: '#f5f5f5' }} />
                </div>
              </div>
            </div>

            {/* Run logs */}
            <div className="mono" style={{ color: 'var(--text-3)', fontSize: 15, marginBottom: 24, display: 'flex', gap: 10, alignItems: 'center' }}>
              <span style={{ color: '#4ade80' }}>➜</span>
              <span style={{ color: '#60a5fa' }}>~</span>
              <span style={{ color: 'var(--text)' }}>tail -f /var/log/velo-agent.log</span>
            </div>

            <div style={{
              fontSize: 14, lineHeight: 1.8,
              fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
            }}>
              {liveLog.length === 0 && (
                <div style={{ color: 'var(--text-3)', fontStyle: 'italic' }}>
                  Connecting to agent...
                </div>
              )}
              {liveLog.map((event, i) => {
                const c = TAG_COLOR[event.tag] || 'var(--text-3)';
                const isBug = event.tag === 'BUG';
                const isPass = event.tag === 'PASS';
                const isHeader = event.message?.startsWith('──');
                return (
                  <div key={i} style={{
                    display: 'flex', gap: 10,
                    borderLeft: isPass ? '2px solid var(--success)' : isBug ? '2px solid #f87171' : '2px solid transparent',
                    paddingLeft: 12, marginLeft: -14,
                    marginTop: isHeader ? 16 : 4,
                    opacity: isHeader ? 0.6 : 1,
                  }}>
                    <span style={{ color: TAG_COLOR[event.tag] || '#6366f1', fontWeight: 700, minWidth: 54, flexShrink: 0, fontSize: 13 }}>
                      [{event.tag}]
                    </span>
                    <span style={{ color: isPass ? '#4ade80' : isBug ? '#fca5a5' : isHeader ? 'var(--text-3)' : '#d4d4d8', flex: 1, whiteSpace: 'pre-wrap' }}>
                      {event.message}
                    </span>
                  </div>
                );
              })}
              <div style={{ display: 'flex', gap: 10, paddingLeft: 12, marginLeft: -14, borderLeft: '2px solid transparent', marginTop: 6 }}>
                <span style={{ minWidth: 54, color: 'transparent' }}> </span>
                <span style={{ color: 'var(--text)' }} className="blink-cursor">&nbsp;</span>
              </div>
            </div>
          </div>
        </div>

        <div style={{ textAlign: 'center', fontSize: 13, color: 'var(--text-3)', marginTop: 20 }}>
          Autonomous healing in progress — this may take 1–3 minutes
        </div>
      </main>
    </div>
  );
}


/* ── Main content (landing + analyzing + dashboard) ── */
function AppContent() {
  const navigate = useNavigate();
  const { getIdToken } = useAuth();
  const {
    loading, setLoading,
    results, setResults,
    error, setError,
    liveLog, setLiveLog,
    analyzingRepo, setAnalyzingRepo,
    liveLogRef,
    reset,
  } = useApp();

  const handleSubmit = async ({ repo_url, team_name, leader_name }) => {
    // Auth token is optional — send it if available but don't block guests
    const token = await getIdToken().catch(() => null);
    const authHeaders = token ? { Authorization: `Bearer ${token}` } : {};

    setLoading(true);
    setError('');
    setResults(null);
    setLiveLog([]);
    setAnalyzingRepo(repo_url);
    liveLogRef.current = [];

    try {
      // ── Try streaming first (SSE endpoint, no auth required) ──────────
      let usedStream = false;
      try {
        const streamRes = await fetch(`${API_URL}/api/analyze/stream`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', ...authHeaders },
          body: JSON.stringify({ repo_url, team_name, leader_name }),
        });

        if (streamRes.ok && streamRes.headers.get('content-type')?.includes('text/event-stream')) {
          usedStream = true;
          const reader = streamRes.body.getReader();
          const decoder = new TextDecoder();
          let buffer = '';

          while (true) {
            const { done, value } = await reader.read();
            if (done) break;

            buffer += decoder.decode(value, { stream: true });
            const parts = buffer.split('\n\n');
            buffer = parts.pop() ?? '';

            for (const part of parts) {
              const line = part.trim();
              if (!line.startsWith('data: ')) continue;
              try {
                const event = JSON.parse(line.slice(6));
                if (event.type === 'keepalive') continue;

                if (event.type === 'done') {
                  setResults({ ...event.data, liveLog: liveLogRef.current });
                } else if (event.type === 'error') {
                  setError(event.message || 'Analysis failed.');
                } else if (event.type === 'log') {
                  const updated = [...liveLogRef.current, event];
                  liveLogRef.current = updated;
                  setLiveLog([...updated]);
                }
              } catch {
                // ignore malformed SSE line
              }
            }
          }
        }
      } catch {
        // streaming failed — fall through to batch
      }

      if (!usedStream) {
        // ── Batch fallback ─────────────────────────────────────────────
        const batchRes = await fetch(`${API_URL}/api/analyze`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', ...authHeaders },
          body: JSON.stringify({ repo_url, team_name, leader_name }),
        });

        if (!batchRes.ok) {
          const j = await batchRes.json().catch(() => ({}));
          throw new Error(j.error || `Server error ${batchRes.status}`);
        }

        const data = await batchRes.json();
        setResults(data);
      }
    } catch (e) {
      setError(e.message || 'An unexpected error occurred.');
    } finally {
      setLoading(false);
      setAnalyzingRepo('');
    }
  };

  const handleReset = () => reset();

  if (results && !loading) {
    return <Dashboard data={results} onReset={handleReset} />;
  }

  if (loading) {
    return <AnalyzingScreen repoUrl={analyzingRepo} liveLog={liveLog} />;
  }

  return (
    <>
      <LandingPage onSubmit={handleSubmit} loading={loading} />
      {error && !loading && !results && (
        <div style={{
          position: 'fixed', bottom: 24, left: 24, right: 24, zIndex: 100,
          background: 'var(--surface)', border: '1px solid var(--error-border)',
          borderRadius: 10, padding: '14px 18px',
          display: 'flex', alignItems: 'center', gap: 12,
          boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
          maxWidth: 520, margin: '0 auto',
        }}>
          <svg width="18" height="18" fill="none" stroke="var(--error)" strokeWidth="2" viewBox="0 0 24 24" style={{ flexShrink: 0 }}>
            <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
          <div style={{ flex: 1 }}>
            <p style={{ color: 'var(--error)', fontWeight: 600, fontSize: 13, marginBottom: 2 }}>Analysis Failed</p>
            <p style={{ color: 'var(--text-3)', fontSize: 12 }}>{error}</p>
          </div>
          <button onClick={() => setError('')} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-3)', padding: 4 }}>
            <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>
      )}
    </>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/auth" element={<AuthPage />} />
      <Route path="/" element={<AppContent />} />
    </Routes>
  );
}
