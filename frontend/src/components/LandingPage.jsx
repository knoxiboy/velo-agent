import { useState, useEffect } from 'react';

const DEMO = {
  repoUrl:    'https://github.com/oyelurker/velo-agent',
  teamName:   'Vakratund',
  leaderName: 'Tejas Kumar Punyap',
};

export default function LandingPage({ onSubmit, loading }) {
  const [repoUrl,    setRepoUrl]    = useState('');
  const [teamName,   setTeamName]   = useState('');
  const [leaderName, setLeaderName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ repo_url: repoUrl, team_name: teamName, leader_name: leaderName });
  };

  const fillDemo = () => {
    setRepoUrl(DEMO.repoUrl);
    setTeamName(DEMO.teamName);
    setLeaderName(DEMO.leaderName);
  };

  const inputCls = 'w-full rounded py-3 px-4 text-sm font-mono focus:outline-none transition-all text-slate-300 placeholder-slate-700';

  return (
    <div style={{ background: 'var(--cyber-black)', minHeight: '100dvh', position: 'relative', overflowX: 'hidden' }}>

      {/* Fixed background layers */}
      <div style={{ position: 'fixed', inset: 0, zIndex: 0, background: 'linear-gradient(to bottom, #1a1b26, #050507)', pointerEvents: 'none' }} />
      <div className="cyber-grid" style={{ position: 'fixed', inset: 0, zIndex: 0, opacity: 0.3, pointerEvents: 'none' }} />
      <div style={{ position: 'fixed', top: '-20%', right: '-10%', width: 500, height: 500, background: 'rgba(139,92,246,0.1)', borderRadius: '50%', filter: 'blur(100px)', pointerEvents: 'none', zIndex: 0 }} />
      <div style={{ position: 'fixed', bottom: '-10%', left: '-10%', width: 400, height: 400, background: 'rgba(6,182,212,0.1)', borderRadius: '50%', filter: 'blur(100px)', pointerEvents: 'none', zIndex: 0 }} />

      {/* Header */}
      <header style={{ position: 'sticky', top: 0, zIndex: 50, borderBottom: '1px solid var(--glass-border)', background: 'rgba(5,5,7,0.7)', backdropFilter: 'blur(20px)', padding: '12px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ position: 'relative' }}>
            <span className="material-symbols-outlined" style={{ color: 'var(--neon-cyan)', fontSize: 24, filter: 'drop-shadow(0 0 8px rgba(6,182,212,0.8))' }}>bolt</span>
          </div>
          <div>
            <div className="font-mono" style={{ fontSize: 13, fontWeight: 700, letterSpacing: '0.2em', color: 'white' }}>VELO_OPS</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <span style={{ fontSize: 9, color: 'var(--neon-violet)', letterSpacing: '0.2em', textTransform: 'uppercase' }}>System Active</span>
              <span style={{ width: 6, height: 6, background: '#22c55e', borderRadius: '50%', animation: 'pulsing-dot 2s ease-in-out infinite', boxShadow: '0 0 5px #22c55e' }} />
            </div>
          </div>
        </div>
        <div style={{ position: 'relative' }}>
          <button className="font-mono" style={{ background: 'var(--glass-bg)', fontSize: 12, fontWeight: 700, padding: '8px 16px', borderRadius: 6, border: '1px solid var(--glass-border)', display: 'flex', alignItems: 'center', gap: 8, color: '#94a3b8', cursor: 'not-allowed' }}>
            <span className="material-symbols-outlined" style={{ fontSize: 16, color: '#64748b' }}>terminal</span>
            GitHub_Auth
          </button>
          <span className="font-mono" style={{ position: 'absolute', top: -8, right: -4, background: 'var(--neon-violet)', fontSize: 9, padding: '2px 6px', borderRadius: 4, color: 'white', fontWeight: 700, boxShadow: '0 0 10px rgba(139,92,246,0.6)' }}>BETA</span>
        </div>
      </header>

      {/* Main */}
      <main style={{ position: 'relative', zIndex: 10, maxWidth: 1400, margin: '0 auto', padding: '32px 20px 128px' }}>

        {/* Hero section */}
        <section className="fade-up" style={{ display: 'flex', flexDirection: 'column', gap: 32, position: 'relative' }}>
          {/* Floating orb SVG */}
          <div className="animate-float" style={{ position: 'absolute', right: -64, top: -40, width: 192, height: 192, opacity: 0.2, pointerEvents: 'none' }}>
            <svg style={{ width: '100%', height: '100%', stroke: 'var(--neon-cyan)', fill: 'none', strokeWidth: 0.5 }} viewBox="0 0 200 200">
              <circle cx="100" cy="100" r="90" />
              <path d="M10,100 Q50,50 90,100 T190,100" />
              <path d="M10,100 Q50,150 90,100 T190,100" />
              <path d="M100,10 Q50,50 100,90 T100,190" />
              <path d="M100,10 Q150,50 100,90 T100,190" />
            </svg>
          </div>

          {/* Title block */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16, paddingTop: 16 }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '4px 12px', borderRadius: 999, border: '1px solid rgba(139,92,246,0.3)', background: 'rgba(139,92,246,0.05)', width: 'fit-content' }}>
              <span className="material-symbols-outlined" style={{ color: 'var(--neon-violet)', fontSize: 16 }}>radar</span>
              <span className="font-mono" style={{ fontSize: 10, color: 'var(--neon-violet)', letterSpacing: '0.2em', textTransform: 'uppercase' }}>Global Monitoring</span>
            </div>
            <h2 style={{ fontSize: 'clamp(2.5rem,5vw,3.5rem)', fontWeight: 900, lineHeight: 0.9, letterSpacing: '-0.04em', color: 'white' }}>
              Autonomous<br />
              <span className="text-neon-gradient">Pipeline</span><br />
              <span className="text-neon-gradient">Healing</span>
            </h2>
            <p className="font-mono" style={{ color: '#94a3b8', fontSize: 13, lineHeight: 1.7, maxWidth: 320, borderLeft: '2px solid rgba(6,182,212,0.5)', paddingLeft: 16, paddingTop: 4 }}>
              &gt; AI-driven logic repair protocols.<br />
              &gt; Zero-touch pipeline restoration.
            </p>
          </div>

          {/* Stat chips */}
          <div style={{ display: 'flex', gap: 12, overflowX: 'auto', paddingBottom: 16, paddingTop: 8 }} className="no-scrollbar">
            {[
              { label: 'Velocity', value: '5.0x', icon: 'speed', color: 'var(--neon-cyan)', pulse: false },
              { label: 'Active Nodes', value: '03', icon: 'hub', color: 'var(--neon-violet)', pulse: true },
              { label: 'Max Retries', value: '05', icon: 'restart_alt', color: 'white', pulse: false },
            ].map(s => (
              <div key={s.label} className="glass-panel" style={{ flexShrink: 0, padding: 16, borderRadius: 8, minWidth: 130, position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', top: 4, right: 4, opacity: 0.3 }}>
                  <span className="material-symbols-outlined" style={{ fontSize: 20, color: s.color }}>{s.icon}</span>
                </div>
                <p className="font-mono" style={{ fontSize: 10, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 4 }}>{s.label}</p>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 4 }}>
                  <p style={{ fontSize: 24, fontWeight: 700, color: 'white' }}>{s.value}</p>
                  {s.pulse
                    ? <span style={{ width: 6, height: 6, background: '#22c55e', borderRadius: '50%', animation: 'pulsing-dot 2s ease-in-out infinite' }} />
                    : <span style={{ fontSize: 10, color: s.color }}>▲</span>
                  }
                </div>
              </div>
            ))}
          </div>

          {/* Demo button */}
          <button onClick={fillDemo} className="glow-button" style={{ width: '100%', background: 'rgba(139,92,246,0.1)', border: '1px solid rgba(139,92,246,0.5)', color: 'white', fontWeight: 700, padding: '16px 0', borderRadius: 8, position: 'relative', overflow: 'hidden', cursor: 'pointer', transition: 'all 0.3s' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12 }}>
              <span className="material-symbols-outlined" style={{ color: 'var(--neon-cyan)', fontSize: 20 }}>science</span>
              <span className="font-mono" style={{ letterSpacing: '0.1em' }}>INITIATE_DEMO</span>
            </div>
          </button>
        </section>

        {/* Input Form */}
        <section className="fade-up-2" style={{ marginTop: 64 }}>
          <div className="glass-panel" style={{ borderRadius: 12, overflow: 'hidden', position: 'relative', boxShadow: '0 20px 60px rgba(0,0,0,0.4)' }}>
            {/* Scanline overlay */}
            <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', opacity: 0.08, background: 'repeating-linear-gradient(to bottom, transparent, transparent 2px, rgba(0,0,0,0.5) 2px, rgba(0,0,0,0.5) 4px)' }} />
            <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', border: '1px solid rgba(6,182,212,0.2)', borderRadius: 12 }} />
            {/* Title bar */}
            <div style={{ background: 'rgba(0,0,0,0.4)', padding: '12px 24px', borderBottom: '1px solid var(--glass-border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span className="material-symbols-outlined" style={{ fontSize: 16, color: 'var(--neon-cyan)' }}>memory</span>
                <span className="font-mono" style={{ fontWeight: 700, fontSize: 13, letterSpacing: '0.1em', color: '#e2e8f0' }}>REPO_ANALYSIS_V1</span>
              </div>
              <div style={{ display: 'flex', gap: 6 }}>
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'rgba(239,68,68,0.3)' }} />
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'rgba(234,179,8,0.3)' }} />
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'rgba(34,197,94,0.3)' }} />
              </div>
            </div>
            {/* Form body */}
            <form onSubmit={handleSubmit} style={{ padding: 24, display: 'flex', flexDirection: 'column', gap: 20, position: 'relative', zIndex: 10 }}>
              <div>
                <label className="font-mono" style={{ fontSize: 9, fontWeight: 700, color: 'var(--neon-violet)', textTransform: 'uppercase', marginBottom: 8, display: 'flex', alignItems: 'center', gap: 4, letterSpacing: '0.1em' }}>
                  <span style={{ display: 'inline-block', width: 4, height: 12, background: 'var(--neon-violet)' }} />
                  Target URL
                </label>
                <div style={{ position: 'relative' }}>
                  <input
                    type="url" required value={repoUrl}
                    onChange={e => setRepoUrl(e.target.value)}
                    placeholder="github.com/org/repo"
                    className={inputCls}
                    style={{ background: 'rgba(15,17,26,0.8)', border: '1px solid var(--glass-border)', borderRadius: 6, paddingRight: 40 }}
                    onFocus={e => { e.target.style.borderColor = 'var(--neon-cyan)'; e.target.style.boxShadow = '0 0 0 1px rgba(6,182,212,0.4)'; }}
                    onBlur={e => { e.target.style.borderColor = 'var(--glass-border)'; e.target.style.boxShadow = 'none'; }}
                  />
                  <span className="material-symbols-outlined" style={{ position: 'absolute', right: 12, top: 12, fontSize: 16, color: '#475569' }}>link</span>
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                <div>
                  <label className="font-mono" style={{ fontSize: 9, fontWeight: 700, color: '#64748b', textTransform: 'uppercase', marginBottom: 8, display: 'block', letterSpacing: '0.1em' }}>Team ID</label>
                  <input
                    type="text" required value={teamName}
                    onChange={e => setTeamName(e.target.value)}
                    placeholder="DevOps_Alpha"
                    className={inputCls}
                    style={{ background: 'rgba(15,17,26,0.8)', border: '1px solid var(--glass-border)', borderRadius: 6 }}
                    onFocus={e => { e.target.style.borderColor = 'var(--neon-cyan)'; e.target.style.boxShadow = '0 0 0 1px rgba(6,182,212,0.4)'; }}
                    onBlur={e => { e.target.style.borderColor = 'var(--glass-border)'; e.target.style.boxShadow = 'none'; }}
                  />
                </div>
                <div>
                  <label className="font-mono" style={{ fontSize: 9, fontWeight: 700, color: '#64748b', textTransform: 'uppercase', marginBottom: 8, display: 'block', letterSpacing: '0.1em' }}>Operator</label>
                  <input
                    type="text" required value={leaderName}
                    onChange={e => setLeaderName(e.target.value)}
                    placeholder="User_01"
                    className={inputCls}
                    style={{ background: 'rgba(15,17,26,0.8)', border: '1px solid var(--glass-border)', borderRadius: 6 }}
                    onFocus={e => { e.target.style.borderColor = 'var(--neon-cyan)'; e.target.style.boxShadow = '0 0 0 1px rgba(6,182,212,0.4)'; }}
                    onBlur={e => { e.target.style.borderColor = 'var(--glass-border)'; e.target.style.boxShadow = 'none'; }}
                  />
                </div>
              </div>
              <button
                type="submit" disabled={loading}
                style={{ width: '100%', background: loading ? 'rgba(139,92,246,0.5)' : 'var(--neon-violet)', color: 'white', fontWeight: 700, padding: '16px 0', borderRadius: 8, boxShadow: '0 0 20px rgba(139,92,246,0.4)', cursor: loading ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, border: 'none', marginTop: 8, transition: 'all 0.2s', fontSize: 14 }}
              >
                {loading ? (
                  <>
                    <span className="material-symbols-outlined" style={{ fontSize: 20, animation: 'spin 1s linear infinite' }}>refresh</span>
                    RUNNING DIAGNOSTICS…
                  </>
                ) : (
                  <>
                    <span className="material-symbols-outlined" style={{ fontSize: 20 }}>data_exploration</span>
                    RUN DIAGNOSTICS
                  </>
                )}
              </button>
              <div className="font-mono" style={{ fontSize: 10, textAlign: 'center', color: '#334155' }}>
                {loading ? 'Initializing autonomous healing pipeline...' : 'System ready. Awaiting input stream...'}
              </div>
            </form>
          </div>
        </section>

        {/* System Architecture */}
        <section className="fade-up-3" style={{ marginTop: 80, position: 'relative' }}>
          <h3 className="font-mono" style={{ textAlign: 'center', fontSize: 10, fontWeight: 900, letterSpacing: '0.3em', color: '#475569', marginBottom: 40, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16, textTransform: 'uppercase' }}>
            <span style={{ height: 1, width: 32, background: '#1e293b' }} />
            System Architecture
            <span style={{ height: 1, width: 32, background: '#1e293b' }} />
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0 }}>
            {[
              { label: 'SANDBOX_TESTER', icon: 'biotech', color: '#60a5fa', bg: 'rgba(96,165,250,0.1)', border: 'rgba(96,165,250,0.2)', pulse: false },
              null,
              { label: 'LLM_SOLVER_CORE', icon: 'psychology', color: 'var(--neon-violet)', bg: 'rgba(139,92,246,0.1)', border: 'rgba(139,92,246,0.4)', pulse: true, large: true },
              null,
              { label: 'GITOPS_PR', icon: 'account_tree', color: '#34d399', bg: 'rgba(52,211,153,0.1)', border: 'rgba(52,211,153,0.2)', pulse: false },
            ].map((node, i) => {
              if (node === null) return (
                <div key={i} style={{ height: 32, width: 2, background: i === 1 ? 'linear-gradient(to bottom,rgba(96,165,250,0.2),rgba(139,92,246,0.5))' : 'linear-gradient(to bottom,rgba(139,92,246,0.5),rgba(52,211,153,0.2))' }} />
              );
              return (
                <div key={node.label} style={{ position: 'relative', width: '100%', maxWidth: node.large ? 320 : 300, background: node.large ? node.bg : 'var(--cyber-charcoal)', border: `1px solid ${node.border}`, padding: node.large ? '20px 24px' : '16px 20px', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'space-between', boxShadow: node.large ? '0 0 20px rgba(139,92,246,0.15)' : 'none', backdropFilter: node.large ? 'blur(4px)' : 'none' }}>
                  <div style={{ position: 'absolute', left: -4, top: '50%', transform: 'translateY(-50%)', width: 8, height: node.large ? 48 : 32, background: node.color, borderRadius: '0 4px 4px 0', boxShadow: node.large ? `0 0 10px ${node.color}` : 'none' }} />
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div style={{ padding: 6, background: node.bg, borderRadius: 6, border: `1px solid ${node.border}`, animation: node.pulse ? 'pulsing-dot 2s ease-in-out infinite' : 'none' }}>
                      <span className="material-symbols-outlined" style={{ fontSize: node.large ? 18 : 16, color: node.color }}>{node.icon}</span>
                    </div>
                    <span className="font-mono" style={{ fontSize: node.large ? 14 : 12, fontWeight: node.large ? 900 : 700, color: node.large ? 'white' : '#cbd5e1', letterSpacing: '0.05em' }}>{node.label}</span>
                  </div>
                  {node.large
                    ? <span className="material-symbols-outlined" style={{ color: 'var(--neon-violet)', fontSize: 16, animation: 'spin 2s linear infinite' }}>settings</span>
                    : <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#1e293b', border: '1px solid #475569' }} />
                  }
                </div>
              );
            })}
          </div>
        </section>

        {/* Workflow Timeline */}
        <section style={{ marginTop: 96, marginBottom: 40 }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 48, textAlign: 'center', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'white', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
            <span className="font-mono" style={{ fontSize: 10, color: 'var(--neon-cyan)' }}>Operations Sequence</span>
            Workflow Protocol
          </h2>
          <div style={{ position: 'relative', paddingLeft: 24 }}>
            <div className="timeline-line" style={{ position: 'absolute', left: 11, top: 16, bottom: 16, width: 2, borderRadius: 999 }} />
            <div style={{ display: 'flex', flexDirection: 'column', gap: 48 }}>
              {[
                { num: '01', title: 'DETECTION_PHASE', tag: 'AUTO', color: 'var(--neon-violet)', borderColor: 'var(--neon-violet)', pulseClass: 'animate-node-pulse-1', desc: 'Real-time pipeline surveillance captures build failures instantly. Logs and environment state are extracted to the secure container.', icon: 'search_check' },
                { num: '02', title: 'RESOLUTION_LOOP', tag: 'AI-CORE', color: 'var(--neon-cyan)', borderColor: 'var(--neon-cyan)', pulseClass: 'animate-node-pulse-2', desc: 'Proprietary LLM agents analyze stack traces, reproduce errors in isolated sandboxes, and iterate on code patches autonomously.', icon: 'auto_fix_high' },
                { num: '03', title: 'DEPLOYMENT_READY', tag: 'FINAL', color: '#10b981', borderColor: '#10b981', pulseClass: 'animate-node-pulse-3', desc: 'Optimized solution is packaged into a clean GitOps branch. Committed with [AI-AGENT] prefix, pushed, and CI/CD re-verified.', icon: 'verified' },
              ].map(step => (
                <div key={step.num} style={{ position: 'relative', paddingLeft: 32 }}>
                  <div className={step.pulseClass} style={{ position: 'absolute', left: -5, top: 4, width: 34, height: 34, borderRadius: '50%', background: 'var(--cyber-black)', border: `2px solid ${step.borderColor}`, display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 10 }}>
                    <span className="font-mono" style={{ fontSize: 10, fontWeight: 700, color: 'white' }}>{step.num}</span>
                  </div>
                  <div className="glass-panel" style={{ padding: 20, borderRadius: '0 12px 12px 12px', borderLeft: `2px solid ${step.borderColor}`, position: 'relative', transition: 'transform 0.2s' }}>
                    <div style={{ position: 'absolute', right: -8, top: -8 }}>
                      <span className="material-symbols-outlined" style={{ fontSize: 40, color: '#334155', opacity: 0.2 }}>{step.icon}</span>
                    </div>
                    <h4 className="font-mono" style={{ fontWeight: 700, color: step.color, fontSize: 17, marginBottom: 8, display: 'flex', alignItems: 'center', gap: 8 }}>
                      {step.title}
                      <span className="font-mono" style={{ fontSize: 8, padding: '2px 4px', border: `1px solid ${step.borderColor}30`, borderRadius: 4, color: '#94a3b8' }}>{step.tag}</span>
                    </h4>
                    <p className="font-mono" style={{ fontSize: 12, color: '#94a3b8', lineHeight: 1.7 }}>{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Bottom nav */}
      <nav style={{ position: 'fixed', bottom: 16, left: 16, right: 16, zIndex: 50, borderRadius: 16, border: '1px solid var(--glass-border)', background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(20px)', padding: '12px 8px', boxShadow: '0 0 30px rgba(0,0,0,0.5)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
          {[
            { icon: 'home', label: 'BASE', active: true },
            { icon: 'terminal', label: 'PIPES', active: false },
            { icon: 'robot_2', label: 'AGENTS', active: false },
            { icon: 'settings', label: 'CONFIG', active: false },
          ].map((item, i) => (
            <a key={i} href="#" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, color: item.active ? 'var(--neon-cyan)' : '#64748b', textDecoration: 'none' }}>
              <span className="material-symbols-outlined" style={{ fontSize: 24 }}>{item.icon}</span>
              <span className="font-mono" style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' }}>{item.label}</span>
            </a>
          ))}
        </div>
      </nav>
    </div>
  );
}
