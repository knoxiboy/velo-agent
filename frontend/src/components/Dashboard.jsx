import { useState, useEffect, useRef } from 'react';

/* ── helpers ── */
function useCountUp(target, dur = 900) {
  const [v, setV] = useState(0);
  const raf = useRef(null);
  useEffect(() => {
    const t0 = performance.now();
    function step(now) {
      const p = Math.min((now - t0) / dur, 1);
      const e = 1 - Math.pow(1 - p, 3);
      setV(Math.round(e * target));
      if (p < 1) raf.current = requestAnimationFrame(step);
    }
    raf.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf.current);
  }, [target, dur]);
  return v;
}

const BUG_COLORS = {
  LINTING:     { pill: 'rgba(79,70,229,0.15)', border: 'rgba(79,70,229,0.3)', text: '#818cf8' },
  SYNTAX:      { pill: 'rgba(234,179,8,0.1)',  border: 'rgba(234,179,8,0.3)', text: '#fbbf24' },
  LOGIC:       { pill: 'rgba(239,68,68,0.1)',  border: 'rgba(239,68,68,0.3)', text: '#f87171' },
  TYPE_ERROR:  { pill: 'rgba(249,115,22,0.1)', border: 'rgba(249,115,22,0.3)', text: '#fb923c' },
  IMPORT:      { pill: 'rgba(6,182,212,0.1)',  border: 'rgba(6,182,212,0.3)', text: '#22d3ee' },
  INDENTATION: { pill: 'rgba(16,185,129,0.1)', border: 'rgba(16,185,129,0.3)', text: '#34d399' },
};

function BugPill({ type }) {
  const c = BUG_COLORS[type] || { pill: 'rgba(100,116,139,0.15)', border: 'rgba(100,116,139,0.3)', text: '#94a3b8' };
  return (
    <span className="font-mono" style={{ display: 'inline-block', padding: '2px 6px', borderRadius: 4, background: c.pill, border: `1px solid ${c.border}`, color: c.text, fontSize: 9, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
      {type}
    </span>
  );
}

function ScoreRing({ score, max = 200 }) {
  const r = 40;
  const circ = 2 * Math.PI * r;
  const [offset, setOffset] = useState(circ);
  const pct = Math.min(Math.max(score, 0), max) / max;
  useEffect(() => {
    const t = setTimeout(() => setOffset(circ * (1 - pct)), 300);
    return () => clearTimeout(t);
  }, [pct, circ]);

  return (
    <div style={{ position: 'relative', width: 128, height: 128, flexShrink: 0 }}>
      <svg className="w-full h-full" viewBox="0 0 100 100" style={{ width: '100%', height: '100%' }}>
        <g className="animate-hud-outer" style={{ color: '#334155' }}>
          <circle cx="50" cy="50" fill="none" opacity="0.5" r="46" stroke="currentColor" strokeDasharray="4 4" strokeWidth="1" />
          <circle cx="50" cy="50" fill="none" r="46" stroke="currentColor" strokeDasharray="10 80" strokeWidth="2" />
        </g>
        <g className="animate-hud-inner" style={{ color: '#1e1b4b' }}>
          <circle cx="50" cy="50" fill="none" r="36" stroke="currentColor" strokeDasharray="2 2" strokeWidth="1" />
        </g>
        <circle cx="50" cy="50" fill="none" r={r} stroke="#1e293b" strokeWidth="6" />
        <circle
          cx="50" cy="50" fill="none" r={r}
          stroke="var(--primary-glow)"
          strokeDasharray={circ}
          strokeDashoffset={offset}
          strokeLinecap="round"
          strokeWidth="6"
          transform="rotate(-90 50 50)"
          style={{ transition: 'stroke-dashoffset 1.2s cubic-bezier(.22,.61,.36,1)', filter: 'drop-shadow(0 0 3px rgba(99,102,241,0.6))' }}
        />
        <text x="50" y="46" textAnchor="middle" fill="white" fontSize="18" fontWeight="800" fontFamily="Space Grotesk,sans-serif">{score}</text>
        <text x="50" y="58" textAnchor="middle" fill="#64748b" fontSize="8" fontFamily="JetBrains Mono,monospace" style={{ textTransform: 'uppercase' }}>PTS</text>
      </svg>
    </div>
  );
}

function TerminalLog({ runs = [], maxRetries = 5 }) {
  const allLines = buildLogLines(runs, maxRetries);
  const [shown, setShown] = useState([]);
  const timerRef = useRef(null);
  const bodyRef = useRef(null);

  useEffect(() => {
    setShown([]);
    let i = 0;
    function tick() {
      if (i >= allLines.length) return;
      setShown(prev => [...prev, allLines[i]]);
      i++;
      timerRef.current = setTimeout(tick, 60);
    }
    timerRef.current = setTimeout(tick, 300);
    return () => clearTimeout(timerRef.current);
  }, [runs]);

  useEffect(() => {
    if (bodyRef.current) bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
  }, [shown]);

  const done = shown.length >= allLines.length;

  return (
    <div style={{ borderRadius: 12, overflow: 'hidden', boxShadow: '0 20px 40px rgba(0,0,0,0.5)', position: 'relative', border: '1px solid var(--border-muted)', background: '#05070a' }}>
      <div className="scanlines" style={{ position: 'absolute', inset: 0, zIndex: 10, opacity: 0.3 }} />
      {/* Title bar */}
      <div style={{ background: '#0f1219', padding: '8px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid var(--border-muted)', position: 'relative', zIndex: 20 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span className="material-symbols-outlined" style={{ fontSize: 14, color: '#475569' }}>terminal</span>
          <span className="font-mono" style={{ fontSize: 10, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.1em' }}>agent_output.sh — live</span>
        </div>
        <div style={{ width: 64, height: 24, display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
          <svg style={{ width: '100%', height: '100%' }} preserveAspectRatio="none" viewBox="0 0 100 30">
            <path className="animate-wave" d="M0 15 Q 10 5, 20 15 T 40 15 T 60 15 T 80 15 T 100 15" fill="none" stroke="#10b981" strokeWidth="1.5" />
          </svg>
        </div>
      </div>
      {/* Log body */}
      <div ref={bodyRef} className="custom-scrollbar font-mono" style={{ padding: 16, fontSize: 11, lineHeight: 1.6, height: 220, overflowY: 'auto', position: 'relative', zIndex: 0 }}>
        {shown.map((line, i) => {
          if (!line) return null;
          if (!line.text) return <div key={i} style={{ height: 8 }} />;
          const c = { INFO: '#6366f1', ERROR: '#ef4444', AGENT: '#f59e0b', PASS: '#10b981', PATCH: 'var(--neon-cyan)' }[line.tag] || '#94a3b8';
          const bg = line.tag === 'PASS' ? 'rgba(16,185,129,0.05)' : 'transparent';
          return (
            <div key={i} style={{ display: 'flex', gap: 12, padding: '1px 0', background: bg, borderLeft: line.tag === 'PASS' ? '2px solid #10b981' : 'none', paddingLeft: line.tag === 'PASS' ? 8 : 0, marginLeft: line.tag === 'PASS' ? -8 : 0 }}>
              <span style={{ color: '#475569', minWidth: 56, flexShrink: 0 }}>{line.time}</span>
              <div>
                <span style={{ color: c, fontWeight: 700 }}>[{line.tag}]</span>
                <span style={{ color: '#cbd5e1', marginLeft: 4 }}>{line.text}</span>
              </div>
            </div>
          );
        })}
        {!done && (
          <div style={{ display: 'flex', gap: 12, paddingTop: 4 }}>
            <span style={{ color: '#475569', minWidth: 56 }}>…</span>
            <span style={{ color: 'var(--primary)', fontWeight: 700 }}>➜</span>
            <span style={{ color: '#94a3b8', marginLeft: 4 }}>velo-agent --status</span>
            <span className="animate-blinking" style={{ color: 'var(--primary)', marginLeft: 4 }}>&nbsp;</span>
          </div>
        )}
      </div>
    </div>
  );
}

function buildLogLines(runs, maxRetries) {
  const pad = (n) => String(n).padStart(2, '0');
  const now = new Date();
  const baseTime = (offset) => {
    const d = new Date(now.getTime() - (runs.length * 60 - offset) * 1000);
    return `${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
  };

  const lines = [
    { tag: 'INFO', text: `Initializing VELO AI Autonomous Agent...`, time: baseTime(0) },
    { tag: 'INFO', text: `Max retries: ${maxRetries}. Monitoring ${runs.length} run(s).`, time: baseTime(2) },
  ];

  runs.forEach((run, i) => {
    const t = run.timestamp || baseTime(10 + i * 30);
    lines.push({ tag: '', text: '', time: '' });
    lines.push({ tag: 'INFO', text: `─── Iteration ${i + 1} / ${maxRetries} ───`, time: t });
    const passed = run.status?.toUpperCase() === 'PASSED';
    if (!passed) {
      lines.push({ tag: 'ERROR', text: `${run.failures_count || 0} failure(s) detected in repository.`, time: t });
      if (run.fixes_applied) lines.push({ tag: 'AGENT', text: `Applying ${run.fixes_applied} fix(es) via Gemini 2.5 Flash...`, time: t });
      if (run.commit_sha)   lines.push({ tag: 'PATCH', text: `Committed ${run.commit_sha} to branch.`, time: t });
    } else {
      lines.push({ tag: 'PASS', text: `All tests passing — pipeline green.`, time: t });
    }
  });

  lines.push({ tag: '', text: '', time: '' });
  lines.push({ tag: 'INFO', text: 'Pipeline monitoring complete.', time: baseTime(99) });
  return lines;
}

/* ── Main Dashboard ── */
export default function Dashboard({ data, onReset }) {
  const [bugFilter, setBugFilter] = useState('ALL');
  const [copiedBranch, setCopiedBranch] = useState(false);

  const isPassed = data.ci_status?.toUpperCase() === 'PASSED';
  const failures = useCountUp(data.total_failures ?? 0);
  const fixes    = useCountUp(data.total_fixes ?? 0);
  const score    = data.score_breakdown?.final_score ?? data.score_breakdown?.final ?? 0;
  const fixRate  = data.total_failures > 0 ? Math.round((data.total_fixes / data.total_failures) * 100) : 0;

  const allFixes = data.fixes_applied || data.fixes || [];
  const cicdTimeline = data.cicd_timeline || data.timeline || [];

  const bugCounts = allFixes.reduce((acc, f) => {
    const t = f.bug_type || 'UNKNOWN';
    acc[t] = (acc[t] || 0) + 1;
    return acc;
  }, {});

  const visibleFixes = bugFilter === 'ALL' ? allFixes : allFixes.filter(f => f.bug_type === bugFilter);

  const copyBranch = () => {
    navigator.clipboard.writeText(data.branch_name || '').catch(() => {});
    setCopiedBranch(true);
    setTimeout(() => setCopiedBranch(false), 2000);
  };

  const gradeInfo = (() => {
    if (score >= 180) return { g: 'S', col: '#f59e0b' };
    if (score >= 150) return { g: 'A+', col: '#6366f1' };
    if (score >= 120) return { g: 'A', col: '#818cf8' };
    if (score >= 90)  return { g: 'B', col: '#3b82f6' };
    return { g: 'C', col: '#94a3b8' };
  })();

  return (
    <div style={{ background: 'var(--bg-dark)', minHeight: '100dvh', display: 'flex', flexDirection: 'column' }}>

      {/* Header */}
      <header className="glass-panel-dark" style={{ position: 'sticky', top: 0, zIndex: 50, borderBottom: '1px solid rgba(30,41,59,0.5)', padding: '12px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ position: 'relative', width: 36, height: 36 }}>
            <div style={{ position: 'absolute', inset: 0, background: 'rgba(79,70,229,0.2)', borderRadius: 8, filter: 'blur(4px)' }} />
            <div style={{ position: 'relative', width: '100%', height: '100%', background: 'linear-gradient(135deg,#4f46e5,#1e1b4b)', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid rgba(79,70,229,0.3)', boxShadow: '0 0 10px rgba(79,70,229,0.3)' }}>
              <span className="material-symbols-outlined" style={{ color: 'white', fontSize: 20 }}>token</span>
            </div>
          </div>
          <div>
            <h1 style={{ fontSize: 17, fontWeight: 700, letterSpacing: '-0.01em', color: 'white', textTransform: 'uppercase' }}>
              VELO <span style={{ color: 'var(--primary)', fontWeight: 300 }}>OPS</span>
            </h1>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <div style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--success)', boxShadow: '0 0 5px var(--success)' }} />
              <span className="font-mono" style={{ fontSize: 10, color: '#94a3b8', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Systems Online</span>
            </div>
          </div>
        </div>
        <button
          onClick={onReset}
          style={{ position: 'relative', background: 'rgba(79,70,229,0.1)', border: '1px solid rgba(79,70,229,0.5)', color: 'var(--primary-glow)', padding: '8px 16px', borderRadius: 8, fontSize: 12, fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8, transition: 'all 0.2s', overflow: 'hidden' }}
          className="font-mono"
        >
          <span className="material-symbols-outlined" style={{ fontSize: 16 }}>add_circle</span>
          NEW SCAN
        </button>
      </header>

      {/* Main content */}
      <main style={{ flex: 1, padding: 16, maxWidth: 680, margin: '0 auto', width: '100%', display: 'flex', flexDirection: 'column', gap: 24, paddingBottom: 120 }}>

        {/* ── Mission Status + mini stats ── */}
        <section className="fade-up" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          {/* Status card - full width */}
          <div style={{ gridColumn: '1 / -1' }} className="glass-panel-dark" >
            <div style={{ borderRadius: 12, overflow: 'hidden', position: 'relative' }}>
              <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: 3, background: isPassed ? 'linear-gradient(to right,rgba(16,185,129,0.5),#10b981,rgba(16,185,129,0.5))' : 'linear-gradient(to right,rgba(239,68,68,0.5),#ef4444,rgba(239,68,68,0.5))', boxShadow: isPassed ? '0 0 8px rgba(16,185,129,0.5)' : '0 0 8px rgba(239,68,68,0.5)' }} />
              <div style={{ background: 'rgba(10,14,23,0.9)', borderRadius: 12, padding: 16, position: 'relative' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
                  <div>
                    <span className="font-mono" style={{ fontSize: 10, color: '#475569', textTransform: 'uppercase', letterSpacing: '0.1em', display: 'block', marginBottom: 4 }}>Mission Status</span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <span style={{ fontSize: 20, fontWeight: 700, color: 'white', letterSpacing: '-0.02em' }}>
                        {isPassed ? 'PASSED' : 'FAILED'}
                      </span>
                      <span className="animate-pulsing-dot" style={{ width: 8, height: 8, borderRadius: '50%', background: isPassed ? 'var(--success)' : 'var(--error)', display: 'inline-block' }} />
                    </div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <span className="font-mono" style={{ display: 'block', fontSize: 10, color: '#475569' }}>EXEC TIME</span>
                    <span className="font-mono" style={{ display: 'block', fontSize: 12, color: 'var(--neon-cyan)' }}>{data.execution_time || '—'}</span>
                  </div>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                  <div style={{ background: 'rgba(2,4,10,0.5)', border: '1px solid rgba(30,41,59,0.5)', borderRadius: 6, padding: 8 }}>
                    <span className="font-mono" style={{ fontSize: 9, color: '#475569', textTransform: 'uppercase', display: 'block', marginBottom: 4 }}>Target</span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 4, color: '#e2e8f0', fontSize: 12, overflow: 'hidden' }}>
                      <span className="material-symbols-outlined" style={{ fontSize: 14, color: 'var(--primary)', flexShrink: 0 }}>hub</span>
                      <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', fontSize: 11 }}>{data.repo_url?.replace('https://github.com/', '') || '—'}</span>
                    </div>
                  </div>
                  <div style={{ background: 'rgba(2,4,10,0.5)', border: '1px solid rgba(30,41,59,0.5)', borderRadius: 6, padding: 8, position: 'relative', overflow: 'hidden' }}>
                    <span className="font-mono" style={{ fontSize: 9, color: '#475569', textTransform: 'uppercase', display: 'block', marginBottom: 4 }}>Branch</span>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <code style={{ fontSize: 10, color: 'var(--cyan-ops)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '80%' }}>{data.branch_name || '—'}</code>
                      <button onClick={copyBranch} style={{ background: 'none', border: 'none', cursor: 'pointer', color: copiedBranch ? '#34d399' : '#475569', flexShrink: 0 }}>
                        <span className="material-symbols-outlined" style={{ fontSize: 14 }}>{copiedBranch ? 'check' : 'content_copy'}</span>
                      </button>
                    </div>
                  </div>
                  <div style={{ background: 'rgba(2,4,10,0.5)', border: '1px solid rgba(30,41,59,0.5)', borderRadius: 6, padding: 8 }}>
                    <span className="font-mono" style={{ fontSize: 9, color: '#475569', textTransform: 'uppercase', display: 'block', marginBottom: 4 }}>Team</span>
                    <span style={{ fontSize: 12, color: '#e2e8f0' }}>{data.team_name || '—'}</span>
                  </div>
                  <div style={{ background: 'rgba(2,4,10,0.5)', border: '1px solid rgba(30,41,59,0.5)', borderRadius: 6, padding: 8 }}>
                    <span className="font-mono" style={{ fontSize: 9, color: '#475569', textTransform: 'uppercase', display: 'block', marginBottom: 4 }}>Leader</span>
                    <span style={{ fontSize: 12, color: '#e2e8f0' }}>{data.leader_name || '—'}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Failures mini card */}
          <div className="glass-panel-dark cyber-border" style={{ borderRadius: 12, padding: 12, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', background: 'rgba(10,14,23,0.5)', position: 'relative' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
              <span className="font-mono" style={{ fontSize: 10, color: '#94a3b8', textTransform: 'uppercase' }}>Failures</span>
              <span className="material-symbols-outlined" style={{ fontSize: 16, color: 'var(--error)' }}>bug_report</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: 8 }}>
              <span style={{ fontSize: 28, fontWeight: 700, color: 'white', lineHeight: 1 }}>{failures}</span>
              <span className="font-mono" style={{ fontSize: 10, color: 'var(--error)', marginBottom: 2 }}>DETECTED</span>
            </div>
            <div style={{ width: '100%', background: 'rgba(51,65,85,0.5)', height: 4, marginTop: 12, borderRadius: 999, overflow: 'hidden' }}>
              <div style={{ height: '100%', background: 'var(--error)', width: '100%', boxShadow: '0 0 8px rgba(239,68,68,0.5)' }} />
            </div>
          </div>

          {/* Fix Rate mini card */}
          <div className="glass-panel-dark cyber-border" style={{ borderRadius: 12, padding: 12, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', background: 'rgba(10,14,23,0.5)', position: 'relative' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
              <span className="font-mono" style={{ fontSize: 10, color: '#94a3b8', textTransform: 'uppercase' }}>Fix Rate</span>
              <span className="material-symbols-outlined" style={{ fontSize: 16, color: 'var(--success)' }}>auto_fix</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: 4 }}>
              <span style={{ fontSize: 28, fontWeight: 700, color: 'white', lineHeight: 1 }}>{fixRate}</span>
              <span className="font-mono" style={{ fontSize: 10, color: 'var(--success)', marginBottom: 2 }}>%</span>
            </div>
            <div style={{ width: '100%', background: 'rgba(51,65,85,0.5)', height: 4, marginTop: 12, borderRadius: 999, overflow: 'hidden' }}>
              <div style={{ height: '100%', background: 'var(--success)', width: `${fixRate}%`, boxShadow: '0 0 8px rgba(16,185,129,0.5)', transition: 'width 1s ease-out' }} />
            </div>
          </div>
        </section>

        {/* ── Performance HUD ── */}
        <section className="fade-up-2 glass-panel-dark" style={{ borderRadius: 12, overflow: 'hidden', position: 'relative' }}>
          <div style={{ background: 'rgba(10,14,23,0.8)', backdropFilter: 'blur(4px)', padding: 20, borderRadius: 12 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16, paddingBottom: 12, borderBottom: '1px solid var(--border-muted)' }}>
              <h3 className="font-mono" style={{ color: 'var(--primary-glow)', fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', display: 'flex', alignItems: 'center', gap: 8 }}>
                <span className="material-symbols-outlined" style={{ fontSize: 16 }}>analytics</span>
                Performance HUD
              </h3>
              <span className="font-mono" style={{ fontSize: 10, background: 'rgba(79,70,229,0.1)', color: 'var(--primary)', border: '1px solid rgba(79,70,229,0.2)', padding: '2px 8px', borderRadius: 4 }}>{gradeInfo.g}</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 16 }}>
              <ScoreRing score={score} />
              <div className="font-mono" style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 12 }}>
                {[
                  { label: 'Base Score',  val: data.score_breakdown?.base ?? data.score_breakdown?.base_score ?? 100,                           color: '#94a3b8', pct: 75 },
                  { label: 'Speed Bonus', val: `+${data.score_breakdown?.speed_bonus ?? 0}`,                                                    color: 'var(--success)', pct: 35 },
                  { label: 'Penalty',     val: `-${Math.abs(data.score_breakdown?.efficiency_penalty ?? 0)}`,                                   color: 'var(--error)', pct: 10 },
                ].map(row => (
                  <div key={row.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 12 }}>
                    <span style={{ color: '#94a3b8' }}>{row.label}</span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <div style={{ height: 4, width: 48, background: 'rgba(51,65,85,0.8)', borderRadius: 999, overflow: 'hidden' }}>
                        <div style={{ height: '100%', background: row.color, width: `${row.pct}%`, boxShadow: `0 0 4px ${row.color}`, transition: 'width 1s ease-out' }} />
                      </div>
                      <span style={{ fontWeight: 700, color: row.color, minWidth: 30, textAlign: 'right' }}>{row.val}</span>
                    </div>
                  </div>
                ))}
                <div style={{ paddingTop: 8, borderTop: '1px solid var(--border-muted)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ color: 'white', fontWeight: 700, fontSize: 12 }}>FINAL SCORE</span>
                  <span style={{ fontSize: 22, fontWeight: 900, color: gradeInfo.col }}>{score}</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Vulnerabilities / Fixes Table ── */}
        <section className="fade-up-3 glass-panel-dark" style={{ borderRadius: 12, overflow: 'hidden', border: '1px solid rgba(30,41,59,0.5)' }}>
          <div style={{ background: 'rgba(10,14,23,0.95)' }}>
            <div style={{ padding: '14px 16px', borderBottom: '1px solid rgba(30,41,59,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <h3 className="font-mono" style={{ color: '#94a3b8', fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em' }}>Vulnerabilities.log ({allFixes.length})</h3>
              <div style={{ display: 'flex', gap: 4 }}>
                {[...Array(3)].map((_, i) => <span key={i} style={{ width: 6, height: 6, borderRadius: '50%', background: '#334155' }} />)}
              </div>
            </div>
            {/* Filter pills */}
            <div className="custom-scrollbar" style={{ padding: '8px 16px', background: 'rgba(2,4,10,0.3)', borderBottom: '1px solid rgba(30,41,59,0.3)', overflowX: 'auto', display: 'flex', gap: 8 }}>
              {['ALL', ...Object.keys(bugCounts)].map(t => (
                <button
                  key={t}
                  onClick={() => setBugFilter(t)}
                  className="font-mono"
                  style={{
                    padding: '4px 8px', borderRadius: 4, fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', cursor: 'pointer', whiteSpace: 'nowrap', transition: 'all 0.15s',
                    background: bugFilter === t ? (t === 'ALL' ? 'rgba(79,70,229,0.2)' : (BUG_COLORS[t]?.pill || 'rgba(79,70,229,0.2)')) : 'transparent',
                    color: bugFilter === t ? (t === 'ALL' ? 'var(--primary)' : (BUG_COLORS[t]?.text || 'var(--primary)')) : '#64748b',
                    border: bugFilter === t ? `1px solid ${t === 'ALL' ? 'rgba(79,70,229,0.3)' : (BUG_COLORS[t]?.border || 'rgba(79,70,229,0.3)')}` : '1px solid #334155',
                  }}
                >
                  {t === 'ALL' ? 'ALL_TYPES' : `${t}(${bugCounts[t]})`}
                </button>
              ))}
            </div>
            {/* Table */}
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ background: 'rgba(2,4,10,0.5)', borderBottom: '1px solid var(--border-muted)' }}>
                    {['File_Path', 'Classification', 'Ln', 'State'].map(h => (
                      <th key={h} className="font-mono" style={{ padding: '8px 16px', fontSize: 10, textTransform: 'uppercase', color: '#475569', letterSpacing: '0.1em', fontWeight: 'normal', textAlign: h === 'Ln' ? 'right' : h === 'State' ? 'center' : 'left' }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {visibleFixes.length === 0 ? (
                    <tr><td colSpan="4" style={{ padding: '24px 16px', textAlign: 'center', color: '#334155', fontSize: 13 }}>No fixes recorded.</td></tr>
                  ) : visibleFixes.map((fix, i) => (
                    <tr key={i} style={{ borderBottom: '1px solid rgba(30,41,59,0.2)', transition: 'background 0.15s' }}
                      onMouseEnter={e => e.currentTarget.style.background = 'rgba(79,70,229,0.05)'}
                      onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                    >
                      <td className="font-mono" style={{ padding: '12px 16px', color: '#cbd5e1', fontSize: 12, maxWidth: 120, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{fix.file}</td>
                      <td style={{ padding: '12px 16px' }}><BugPill type={fix.bug_type} /></td>
                      <td className="font-mono" style={{ padding: '12px 16px', textAlign: 'right', color: '#475569', fontSize: 12 }}>{fix.line_number != null ? String(fix.line_number).padStart(3, '0') : '—'}</td>
                      <td style={{ padding: '12px 16px', textAlign: 'center' }}>
                        {fix.status?.toLowerCase() === 'fixed'
                          ? <span className="material-symbols-outlined" style={{ fontSize: 18, color: 'var(--success)', filter: 'drop-shadow(0 0 5px rgba(16,185,129,0.5))' }}>check_circle</span>
                          : <span className="material-symbols-outlined" style={{ fontSize: 18, color: 'var(--error)' }}>cancel</span>
                        }
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* ── Terminal Log ── */}
        <section>
          <TerminalLog runs={cicdTimeline} maxRetries={data.max_retries || data.max_iterations || 5} />
        </section>

      </main>

      {/* Bottom nav */}
      <nav className="glass-panel-dark" style={{ position: 'fixed', bottom: 0, left: 0, right: 0, borderTop: '1px solid var(--border-muted)', display: 'flex', alignItems: 'center', justifyContent: 'space-around', padding: '16px 8px 24px', zIndex: 40 }}>
        {[
          { icon: 'dashboard', label: 'Mission', active: true },
          { icon: 'history', label: 'Logs', active: false },
          { icon: 'smart_toy', label: 'Agents', active: false },
          { icon: 'settings_suggest', label: 'Config', active: false },
        ].map(item => (
          <a key={item.label} href="#" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, color: item.active ? 'var(--primary-glow)' : '#64748b', textDecoration: 'none' }}>
            <div style={{ position: 'relative' }}>
              <span className="material-symbols-outlined" style={{ fontSize: 24 }}>{item.icon}</span>
              {item.active && <div style={{ position: 'absolute', inset: 0, background: 'rgba(79,70,229,0.3)', filter: 'blur(8px)', borderRadius: '50%' }} />}
            </div>
            <span className="font-mono" style={{ fontSize: 9, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em' }}>{item.label}</span>
          </a>
        ))}
      </nav>
    </div>
  );
}
