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
    label: 'Demo: Velo-Agent (TK)',
    tag: 'TK',
    color: '#ffffff',
    highlight: true,
    repoUrl: 'https://github.com/oyelurker/velo-agent',
    teamName: 'Vakratund',
    leaderName: 'Tejas Kumar',
  },
  {
    label: 'Demo: Practice Repo',
    tag: 'PR',
    color: '#a1a1aa',
    repoUrl: 'https://github.com/knoxiboy/velo_test_repo',
    teamName: 'Vakratund',
    leaderName: 'Agent Tester',
  },
  {
    label: 'Demo: Test Repo',
    tag: 'TEST',
    color: '#a1a1aa',
    repoUrl: 'https://github.com/PTejasKr/tejesh_test_repo',
    teamName: 'Vakratund',
    leaderName: 'Agent Tester',
  },
];

export default function LandingPage({ onSubmit, loading }) {
  const { user, signOut, loginUrl } = useAuth();
  const [repoUrl, setRepoUrl] = useState('');
  const [teamName, setTeamName] = useState('');
  const [leaderName, setLeaderName] = useState('');

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
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ width: 32, height: 32, background: 'var(--accent)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="16" height="16" fill="none" stroke="black" strokeWidth="2.5" viewBox="0 0 24 24">
              <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
            </svg>
          </div>
          <span style={{ fontWeight: 700, fontSize: 18, letterSpacing: '-0.02em', color: 'var(--text)' }}>Velo AI</span>
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
              <button className="btn-ghost" style={{ padding: '8px 24px', fontSize: 14, border: '1px solid var(--accent-border)', color: 'var(--accent)', borderRadius: '24px', transition: 'all 0.2s' }} onMouseEnter={e => { e.target.style.background = 'var(--accent-muted)'; }} onMouseLeave={e => { e.target.style.background = 'transparent'; }}>
                Contact us
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

            <span style={{
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center', position: 'relative',
              width: 'clamp(3.5rem, 6vw, 5.5rem)', height: 'clamp(2rem, 4vw, 3rem)',
              backgroundImage: 'url("https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop")',
              backgroundSize: 'cover', backgroundPosition: 'center',
              borderRadius: '50px', verticalAlign: 'middle', margin: '0 16px',
              border: '2px solid rgba(255,126,103,0.3)', overflow: 'hidden'
            }}>
              {/* Overlay tint to ensure the orange hue matches the aesthetic slightly */}
              <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(255,126,103,0.2)' }} />
              <div style={{ position: 'relative', zIndex: 1, width: 0, height: 0, borderTop: '8px solid transparent', borderBottom: '8px solid transparent', borderLeft: '14px solid #fff', marginLeft: '4px', filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.5))' }} />
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
            Velo is your relentless AI software engineer. From autonomous issue resolution and self-healing deployments to end-to-end continuous maintenance for over 50+ repositories.
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
          }} onMouseEnter={e => e.target.style.transform = 'scale(1.05)'} onMouseLeave={e => e.target.style.transform = 'scale(1)'}>
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
        <div style={{ maxWidth: 800, margin: '80px auto 0', width: '100%', padding: '0 24px' }}>
          <div className="mock-window fade-in-5 animate-float" style={{ position: 'relative' }}>
            <div className="mock-window-header">
              <div className="mock-dots">
                <div className="mock-dot r" />
                <div className="mock-dot y" />
                <div className="mock-dot g" />
              </div>
              <div className="mono" style={{ fontSize: 11, color: 'var(--text-3)' }}>
                interactive-demo — zsh
              </div>
            </div>

            <div style={{ padding: '32px 24px', background: 'rgba(5,5,5,0.9)' }}>

              {/* Presets injected above the form for faster access */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap', marginBottom: 24 }}>
                <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-3)', marginRight: 8 }}>Test a live demo:</span>
                {DEMO_PRESETS.map(preset => (
                  <button
                    key={preset.label}
                    onClick={() => fillDemo(preset)}
                    className="btn-ghost mono"
                    style={{
                      padding: '6px 14px', borderRadius: 8, fontSize: 11, fontWeight: 600,
                      background: preset.highlight ? 'var(--accent-muted)' : 'transparent',
                      color: preset.highlight ? 'var(--accent)' : 'var(--text-3)',
                      border: `1px solid ${preset.highlight ? 'var(--accent-border)' : 'var(--border)'}`,
                    }}
                  >
                    {preset.tag}
                  </button>
                ))}
              </div>

              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <div>
                  <label className="mono" style={{ fontSize: 11, color: 'var(--text-3)', marginBottom: 8, display: 'block' }}>&gt; REPOSITORY_URL</label>
                  <input
                    className="input mono"
                    type="url"
                    required
                    value={repoUrl}
                    onChange={e => setRepoUrl(e.target.value)}
                    placeholder="https://github.com/..."
                    style={{ background: '#000', borderColor: 'var(--border-subtle)', fontSize: 13, padding: '12px 16px' }}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                  <div>
                    <label className="mono" style={{ fontSize: 11, color: 'var(--text-3)', marginBottom: 8, display: 'block' }}>&gt; TEAM_NAME</label>
                    <input
                      className="input mono"
                      type="text"
                      required
                      value={teamName}
                      onChange={e => setTeamName(e.target.value)}
                      placeholder="Vakratund"
                      style={{ background: '#000', borderColor: 'var(--border-subtle)', fontSize: 13, padding: '12px 16px' }}
                    />
                  </div>
                  <div>
                    <label className="mono" style={{ fontSize: 11, color: 'var(--text-3)', marginBottom: 8, display: 'block' }}>&gt; USER_NAME</label>
                    <input
                      className="input mono"
                      type="text"
                      required
                      value={leaderName}
                      onChange={e => setLeaderName(e.target.value)}
                      placeholder="Tejas"
                      style={{ background: '#000', borderColor: 'var(--border-subtle)', fontSize: 13, padding: '12px 16px' }}
                    />
                  </div>
                </div>

                <button
                  className="btn-primary"
                  type="submit"
                  disabled={loading}
                  style={{ width: '100%', justifyContent: 'center', padding: '14px 0', fontSize: 14, marginTop: 16, borderRadius: 8, background: 'var(--accent)', color: '#000' }}
                >
                  {loading ? (
                    <>
                      <Loader2 size={16} className="spin" color="#000" />
                      Initializing Agent...
                    </>
                  ) : (
                    <>
                      Deploy Node <span style={{ fontFamily: 'monospace' }}>_</span>
                    </>
                  )}
                </button>
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
          <span style={{ color: 'var(--text-3)', fontSize: 13 }}>© 2025- All Rights Reserved.</span>
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
