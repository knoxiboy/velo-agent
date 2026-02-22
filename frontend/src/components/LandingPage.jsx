import { useState, useEffect, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import { Terminal, Code2, Network, ChevronRight, Github, Loader2 } from 'lucide-react';

/* ── Custom Scroll Reveal Hook ── */
function useScrollReveal(options = { threshold: 0.15, rootMargin: '0px 0px -50px 0px' }) {
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        // Unobserve after revealing to prevent re-triggering (run once)
        observer.unobserve(entry.target);
      }
    }, options);

    if (ref.current) observer.observe(ref.current);
    return () => { if (ref.current) observer.unobserve(ref.current); };
  }, [options]);

  return ref;
}

const DEMO_PRESETS = [
  {
    label: 'Main Core',
    tag: 'velo',
    color: '#ffffff',
    highlight: true,
    repoUrl: 'https://github.com/oyelurker/velo-agent',
    teamName: 'Vakratund',
    leaderName: 'Tejas Kumar',
  },
  {
    label: 'Knoxiboy Test',
    tag: 'knoxiboy',
    color: '#a1a1aa',
    repoUrl: 'https://github.com/knoxiboy/velo_test_repo',
    teamName: 'Vakratund',
    leaderName: 'Velo_Tester',
  },
  {
    label: 'Tejas Test',
    tag: 'PTejasKr',
    color: '#a1a1aa',
    repoUrl: 'https://github.com/PTejasKr/tejesh_test_repo',
    teamName: 'Vakratund',
    leaderName: 'Velo_Tester',
  },
];

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

export default function LandingPage({ onSubmit, loading }) {
  const { user, signOut, loginUrl } = useAuth();
  const [repoUrl, setRepoUrl] = useState('');
  const [teamName, setTeamName] = useState('');
  const [leaderName, setLeaderName] = useState('');
  const [memoryUsed, setMemoryUsed] = useState(420);

  useEffect(() => {
    const interval = setInterval(() => {
      setMemoryUsed(415 + Math.floor(Math.random() * 25));
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  // Reveal Hooks for Bento Cards
  const revealRef1 = useScrollReveal();
  const revealRef2 = useScrollReveal();
  const revealRef3 = useScrollReveal();
  const revealRef4 = useScrollReveal();

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ repo_url: repoUrl, team_name: teamName, leader_name: leaderName });
  };

  const fillDemo = (preset = DEMO_PRESETS[0]) => {
    setRepoUrl(preset.repoUrl);
    setTeamName(preset.teamName);
    setLeaderName(preset.leaderName);
  };

  return (
    <div style={{ background: 'var(--bg)', minHeight: '100dvh', display: 'flex', flexDirection: 'column', position: 'relative' }}>

      {/* Mesh Gradient Effect */}
      <div className="mesh-bg" />
      <div className="grid-overlay" />

      {/* ── Top nav ── */}
      <header style={{
        padding: '24px 40px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        zIndex: 50,
        position: 'relative'
      }}>
        {/* Left: Logo */}
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
        </div>

        {/* Center: Navigation Links */}
        <div style={{ display: 'flex', gap: 32, fontSize: 14, color: 'var(--text-2)', fontWeight: 500, position: 'absolute', left: '50%', transform: 'translateX(-50%)' }} className="hide-mobile">
          <span style={{ cursor: 'pointer', transition: 'color 0.2s', color: '#fff' }}>Home</span>
          <span style={{ cursor: 'pointer', transition: 'color 0.2s' }} onMouseEnter={e => e.target.style.color = '#fff'} onMouseLeave={e => e.target.style.color = 'var(--text-2)'}>Services</span>
          <span style={{ cursor: 'pointer', transition: 'color 0.2s' }} onMouseEnter={e => e.target.style.color = '#fff'} onMouseLeave={e => e.target.style.color = 'var(--text-2)'}>Projects</span>
          <span style={{ cursor: 'pointer', transition: 'color 0.2s' }} onMouseEnter={e => e.target.style.color = '#fff'} onMouseLeave={e => e.target.style.color = 'var(--text-2)'}>Testimonial</span>
        </div>

        {/* Right: Actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
          {user ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <span style={{ fontSize: 13, color: 'var(--text-2)' }}>{user.login || user.email || 'Signed in'}</span>
              <button onClick={() => signOut()} className="btn-ghost" style={{ padding: '8px 16px', fontSize: 13, border: '1px solid var(--accent-border)', color: 'var(--accent)', borderRadius: '24px' }}>Log out</button>
            </div>
          ) : (
            <a href={loginUrl} style={{ textDecoration: 'none' }}>
              <button className="btn-ghost" style={{ padding: '8px 20px', fontSize: 13, border: '1px solid var(--accent-border)', color: 'var(--accent)', borderRadius: '24px', transition: 'all 0.2s', display: 'flex', alignItems: 'center', gap: 8 }} onMouseEnter={e => { e.target.style.background = 'var(--accent-muted)'; }} onMouseLeave={e => { e.target.style.background = 'transparent'; }}>
                <Github size={16} />
                Sign in with GitHub
              </button>
            </a>
          )}
        </div>
      </header>

      {/* ── Main Hero (SpineEdge Design) ── */}
      <main style={{ flex: 1, display: 'flex', flexDirection: 'column', paddingTop: '100px', paddingBottom: '120px', position: 'relative', zIndex: 10, width: '100%' }}>

        {/* Centered Typography */}
        <div style={{ maxWidth: 900, margin: '0 auto', textAlign: 'center', padding: '0 24px', marginBottom: 40, position: 'relative' }}>

          {/* Huge ambient glow behind the entire heading */}
          <div style={{
            position: 'absolute', top: '40%', left: '50%', transform: 'translate(-50%, -50%)',
            width: '120%', height: '150%',
            background: 'radial-gradient(ellipse at center, rgba(255, 126, 103, 0.15) 0%, rgba(255, 126, 103, 0) 60%)',
            zIndex: -1, pointerEvents: 'none'
          }} />

          <h1 className="fade-in-1" style={{
            fontSize: 'clamp(2.5rem, 5vw, 4.2rem)',
            fontWeight: 800,
            lineHeight: 1.1,
            letterSpacing: '-0.03em',
            color: 'var(--text)',
            marginBottom: 24,
            position: 'relative', // ensure text rendered above glow
          }}>
            Autonomous
            <span
              style={{
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center', position: 'relative',
                width: 'clamp(3.5rem, 6vw, 5.5rem)', height: 'clamp(2rem, 4vw, 3rem)',
                backgroundImage: 'url("https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop")',
                backgroundSize: 'cover', backgroundPosition: 'center',
                borderRadius: '50px', verticalAlign: 'middle', margin: '0 16px',
                border: '2px solid rgba(255,126,103,0.3)', overflow: 'hidden',
                cursor: 'pointer',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                boxShadow: '0 4px 20px rgba(0,0,0,0.4)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.1)';
                e.currentTarget.style.boxShadow = '0 0 30px rgba(255, 126, 103, 0.6)';
                e.currentTarget.style.borderColor = 'rgba(255, 126, 103, 0.8)';
                const triangle = e.currentTarget.querySelector('.play-triangle');
                if (triangle) triangle.style.transform = 'scale(1.2) translateX(2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.4)';
                e.currentTarget.style.borderColor = 'rgba(255, 126, 103, 0.3)';
                const triangle = e.currentTarget.querySelector('.play-triangle');
                if (triangle) triangle.style.transform = 'scale(1) translateX(0)';
              }}
              onClick={() => {
                document.getElementById('terminal-section')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              {/* Overlay tint to ensure the orange hue matches the aesthetic slightly */}
              <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(255,126,103,0.2)' }} />
              <div className="play-triangle" style={{ position: 'relative', zIndex: 1, width: 0, height: 0, borderTop: '8px solid transparent', borderBottom: '8px solid transparent', borderLeft: '14px solid #fff', marginLeft: '4px', filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.5))', transition: 'all 0.3s ease' }} />
            </span>
            Agent<br />
            For Your Software Needs
          </h1>

          <p className="fade-in-2" style={{
            fontSize: '16px',
            color: 'var(--text-3)',
            lineHeight: 1.6,
            maxWidth: 600,
            margin: '0 auto 40px',
          }}>
            Velo is your relentless AI software engineer. From autonomous issue resolution and self-healing deployments to end-to-end continuous maintenance for over 69+ repositories.
          </p>

          <button className="fade-in-3" style={{
            background: 'linear-gradient(90deg, var(--accent) 0%, var(--accent-secondary) 100%)',
            color: '#000',
            fontWeight: 700,
            fontSize: '16px',
            padding: '16px 36px',
            borderRadius: '16px',
            border: 'none',
            cursor: 'pointer',
            boxShadow: '0 4px 32px var(--accent-border)',
            transition: 'transform 0.2s',
          }} onMouseEnter={e => e.target.style.transform = 'scale(1.05)'} onMouseLeave={e => e.target.style.transform = 'scale(1)'} onClick={() => document.getElementById('terminal-section')?.scrollIntoView({ behavior: 'smooth' })}>
            Explore our service
          </button>
        </div>

        {/* ── Angled Marquees ── */}
        <div className="fade-in-4" style={{ position: 'relative', height: 320, marginTop: 10, width: '100vw', left: '50%', right: '50%', marginLeft: '-50vw', marginRight: '-50vw', overflow: 'hidden' }}>

          {/* Top Marquee (Tilted Left) */}
          <div style={{ position: 'absolute', top: 30, left: '-50vw', width: '200vw', transform: 'rotate(-4deg)', background: '#0a0a0a', borderTop: '1px solid rgba(255,255,255,0.05)', borderBottom: '1px solid rgba(255,255,255,0.05)', zIndex: 2, boxShadow: '0 20px 40px rgba(0,0,0,0.5)' }}>
            <div className="marquee-container" style={{ padding: '20px 0', width: '200vw', marginLeft: 0 }}>
              <div className="marquee-band marquee-scroll-left">
                {[...Array(16)].map((_, i) => (
                  <div key={`m1-${i}`} style={{ display: 'flex', alignItems: 'center', gap: 24, paddingRight: 48 }}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="var(--accent)"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14.5V14H9c-1.1 0-2-.9-2-2v-1c0-1.1.9-2 2-2h2V6.5l3.5 3.5L11 13.5z" /></svg>
                    <span style={{ fontSize: 20, fontWeight: 500, color: '#e5e5e5' }}>Client-centric approach at each method</span>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="var(--accent-secondary)"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14.5V14H9c-1.1 0-2-.9-2-2v-1c0-1.1.9-2 2-2h2V6.5l3.5 3.5L11 13.5z" /></svg>
                    <span style={{ fontSize: 20, fontWeight: 500, color: 'var(--accent-secondary)' }}>Proven track record of success</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom Marquee (Tilted Right) */}
          <div style={{ position: 'absolute', top: 30, left: '-50vw', width: '200vw', transform: 'rotate(4deg)', background: '#050505', borderTop: '1px solid rgba(255,255,255,0.05)', borderBottom: '1px solid rgba(255,255,255,0.05)', zIndex: 1, opacity: 0.8 }}>
            <div className="marquee-container" style={{ padding: '20px 0', width: '200vw', marginLeft: 0 }}>
              <div className="marquee-band marquee-scroll-right">
                {[...Array(16)].map((_, i) => (
                  <div key={`m2-${i}`} style={{ display: 'flex', alignItems: 'center', gap: 24, paddingRight: 48 }}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="var(--text-3)"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14.5V14H9c-1.1 0-2-.9-2-2v-1c0-1.1.9-2 2-2h2V6.5l3.5 3.5L11 13.5z" /></svg>
                    <span style={{ fontSize: 20, fontWeight: 500, color: 'var(--text-3)' }}>Highly skilled with creative</span>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="var(--text-3)"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14.5V14H9c-1.1 0-2-.9-2-2v-1c0-1.1.9-2 2-2h2V6.5l3.5 3.5L11 13.5z" /></svg>
                    <span style={{ fontSize: 20, fontWeight: 500, color: 'var(--text-3)' }}>Proven track record of success</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── Deployment Form & Interactive App Demo ── */}
        <div id="terminal-section" style={{ width: '100%', height: '85vh', padding: '0 24px', margin: '60px auto 0', display: 'flex', flexDirection: 'column', boxSizing: 'border-box' }}>
          <div className="mock-window fade-in-5" style={{
            position: 'relative', flex: 1, display: 'flex', flexDirection: 'column',
            borderRadius: 12, overflow: 'hidden', border: '1px solid var(--border)',
            boxShadow: '0 24px 80px rgba(0,0,0,0.8), 0 0 40px rgba(255, 126, 103, 0.1)',
            background: '#050505'
          }}>
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
                velo-zsh
              </div>
              <div style={{ width: 52 }} />
            </div>

            <div style={{ flex: 1, padding: '40px 60px', background: 'transparent', display: 'flex', flexDirection: 'column', overflowY: 'auto' }}>

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
                  <div><span style={{ color: '#ff5e3a', fontWeight: 700 }}>Status</span>: Awaiting Repository Context...</div>
                  <div><span style={{ color: '#ff5e3a', fontWeight: 700 }}>LLM Model</span>: Gemini 2.5 Flash</div>
                  <div><span style={{ color: '#ff5e3a', fontWeight: 700 }}>Active Nodes</span>: Analyzer, LLM Solver, Sandbox</div>
                  <div><span style={{ color: '#ff5e3a', fontWeight: 700 }}>Core Engine</span>: Velo OS x86_64</div>
                  <div><span style={{ color: '#ff5e3a', fontWeight: 700 }}>Environment</span>: Isolated Docker Sandbox</div>
                  <div><span style={{ color: '#ff5e3a', fontWeight: 700 }}>CPU</span>: Cloud Compute Cluster (128 Cores)</div>
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

              {/* Presets injected above the form for faster access */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap', marginBottom: 40 }}>
                <span className="mono" style={{ fontSize: 14, color: 'var(--text-3)' }}>&gt; available_targets:</span>
                {DEMO_PRESETS.map(preset => (
                  <button
                    key={preset.label}
                    onClick={() => fillDemo(preset)}
                    className="btn-ghost mono"
                    style={{
                      padding: '8px 16px', borderRadius: 4, fontSize: 13,
                      background: preset.highlight ? 'rgba(255, 126, 103, 0.1)' : 'transparent',
                      color: preset.highlight ? 'var(--accent)' : 'var(--text-2)',
                      border: `1px solid ${preset.highlight ? 'rgba(255, 126, 103, 0.3)' : 'var(--border)'}`,
                      cursor: 'pointer', transition: 'all 0.2s'
                    }}
                    onMouseEnter={e => {
                      e.target.style.background = 'rgba(255, 126, 103, 0.2)';
                      e.target.style.color = 'var(--text)';
                    }}
                    onMouseLeave={e => {
                      e.target.style.background = preset.highlight ? 'rgba(255, 126, 103, 0.1)' : 'transparent';
                      e.target.style.color = preset.highlight ? 'var(--accent)' : 'var(--text-2)';
                    }}
                  >
                    ./load_{preset.tag.toLowerCase()}
                  </button>
                ))}
              </div>

              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 32, flex: 1 }}>
                <div>
                  <label className="mono" style={{ fontSize: 15, display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                    <span style={{ color: '#4ade80' }}>➜</span>
                    <span style={{ color: '#60a5fa' }}>~</span>
                    <span style={{ color: '#fba922' }}>export</span>
                    <span style={{ color: 'var(--text)' }}>TARGET_REPOSITORY=</span>
                  </label>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <span className="mono" style={{ color: 'var(--text-3)', fontSize: 16, marginRight: 8, opacity: 0 }}>"</span>
                    <input
                      className="input mono"
                      type="url"
                      required
                      value={repoUrl}
                      onChange={e => setRepoUrl(e.target.value)}
                      placeholder="https://github.com/..."
                      style={{
                        flex: 1, background: 'transparent', border: 'none', borderBottom: '1px solid var(--border-subtle)',
                        fontSize: 16, padding: '8px 0', color: '#fff', borderRadius: 0, boxShadow: 'none'
                      }}
                    />
                    <span className="mono" style={{ color: 'var(--text-3)', fontSize: 16, marginLeft: 8, opacity: 0 }}>"</span>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 40 }}>
                  <div>
                    <label className="mono" style={{ fontSize: 15, display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                      <span style={{ color: '#4ade80' }}>➜</span>
                      <span style={{ color: '#60a5fa' }}>~</span>
                      <span style={{ color: '#fba922' }}>export</span>
                      <span style={{ color: 'var(--text)' }}>ASSIGNED_TEAM=</span>
                    </label>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <span className="mono" style={{ color: 'var(--text-3)', fontSize: 16, marginRight: 8, opacity: 0 }}>"</span>
                      <input
                        className="input mono"
                        type="text"
                        required
                        value={teamName}
                        onChange={e => setTeamName(e.target.value)}
                        placeholder="Vakratund"
                        style={{
                          width: '100%', background: 'transparent', border: 'none', borderBottom: '1px solid var(--border-subtle)',
                          fontSize: 16, padding: '8px 0', color: '#fff', borderRadius: 0, boxShadow: 'none'
                        }}
                      />
                      <span className="mono" style={{ color: 'var(--text-3)', fontSize: 16, marginLeft: 8, opacity: 0 }}>"</span>
                    </div>
                  </div>
                  <div>
                    <label className="mono" style={{ fontSize: 15, display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                      <span style={{ color: '#4ade80' }}>➜</span>
                      <span style={{ color: '#60a5fa' }}>~</span>
                      <span style={{ color: '#fba922' }}>export</span>
                      <span style={{ color: 'var(--text)' }}>DEPLOYMENT_USER=</span>
                    </label>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <span className="mono" style={{ color: 'var(--text-3)', fontSize: 16, marginRight: 8, opacity: 0 }}>"</span>
                      <input
                        className="input mono"
                        type="text"
                        required
                        value={leaderName}
                        onChange={e => setLeaderName(e.target.value)}
                        placeholder="Tejas Kumar"
                        style={{
                          width: '100%', background: 'transparent', border: 'none', borderBottom: '1px solid var(--border-subtle)',
                          fontSize: 16, padding: '8px 0', color: '#fff', borderRadius: 0, boxShadow: 'none'
                        }}
                      />
                      <span className="mono" style={{ color: 'var(--text-3)', fontSize: 16, marginLeft: 8, opacity: 0 }}>"</span>
                    </div>
                  </div>
                </div>

                <div style={{ marginTop: 'auto', paddingTop: 40, display: 'flex', alignItems: 'center', gap: 16 }}>
                  <span className="mono" style={{ color: '#4ade80', fontSize: 15 }}>➜</span>
                  <span className="mono" style={{ color: '#60a5fa', fontSize: 15 }}>~</span>
                  <button
                    className="btn-primary mono"
                    type="submit"
                    disabled={loading}
                    style={{
                      padding: '12px 24px', fontSize: 15, borderRadius: 0,
                      background: 'var(--accent)', color: '#000', border: 'none',
                      display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer', transition: 'all 0.2s',
                      boxShadow: '0 0 20px rgba(255, 126, 103, 0.4)'
                    }}
                    onMouseEnter={e => e.target.style.transform = 'translateY(-2px)'}
                    onMouseLeave={e => e.target.style.transform = 'translateY(0)'}
                  >
                    {loading ? (
                      <>
                        <Loader2 size={18} className="spin" color="#000" />
                        Provisioning...
                      </>
                    ) : (
                      <>
                        ./deploy_agent.sh <span className="blink-cursor" style={{ display: 'inline-block', width: 8, height: 16, background: '#000', marginLeft: 4 }} />
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>



      </main>

      {/* ── Inspired SpineEdge Footer ── */}
      <footer style={{
        background: '#050505',
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}>

        {/* Top Minimal Link Section */}
        <div style={{
          width: '100%', maxWidth: 1200, padding: '80px 40px 60px',
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 40
        }}>
          {/* Central Logo Indicator */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ width: 12, height: 12, background: 'var(--accent)', borderRadius: '50%', boxShadow: '0 0 10px rgba(255, 126, 103, 0.5)' }} />
            <span style={{ fontSize: 24, fontWeight: 700, letterSpacing: '-0.03em', color: '#fff' }}>Velo<span style={{ fontWeight: 400 }}>AI</span></span>
          </div>

          {/* Centered Minimal Links */}
          <div className="spine-footer-links" style={{ display: 'flex', gap: 48, flexWrap: 'wrap', justifyContent: 'center' }}>
            <a href="#">Service</a>
            <a href="#">Works</a>
            <a href="#">About Us</a>
            <a href="#">FAQ</a>
          </div>
        </div>

        {/* Middle Copyright & Socials Bar */}
        <div style={{
          width: '100%',
          borderTop: '1px solid rgba(255,255,255,0.05)',
          borderBottom: '1px solid rgba(255,255,255,0.05)',
          padding: '24px 40px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 24
        }}>
          <span style={{ color: 'var(--text-3)', fontSize: 13 }}>© 2026- All Rights Reserved.</span>
          <span style={{ color: 'var(--text-3)', fontSize: 13 }}>Velo AI Studio</span>
          {/* Built By text replacing social icons */}
          <div style={{ display: 'flex', gap: 16 }}>
            <span style={{ color: 'var(--text-3)', fontSize: 13 }}>Made with 🫶 by Team Vakratund</span>
          </div>
        </div>

        {/* Massive Bottom Text */}
        <div style={{ width: '100%', overflow: 'hidden', display: 'flex', justifyContent: 'center', paddingTop: 20 }}>
          <div className="spine-footer-logo">VELO AI</div>
        </div>

      </footer>

    </div>
  );
}
