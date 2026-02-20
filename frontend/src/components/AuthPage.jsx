import { useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ERROR_MSG = {
  not_configured: 'Backend: add GITHUB_CLIENT_ID and GITHUB_CLIENT_SECRET to backend/.env (from GitHub OAuth App). Restart the backend.',
  missing_params: 'Missing parameters from GitHub. Try again.',
  invalid_state: 'Invalid state. Try again.',
  no_token: 'GitHub did not return a token. Try again.',
  server_error: 'Server error. Try again later.',
};

export default function AuthPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { user, loginUrl } = useAuth();
  const errorCode = searchParams.get('error');
  const error = errorCode ? (ERROR_MSG[errorCode] || 'Something went wrong.') : '';

  useEffect(() => {
    if (user) navigate('/', { replace: true });
  }, [user, navigate]);

  return (
    <div style={{ background: 'var(--bg)', minHeight: '100dvh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
      <div className="card" style={{ width: '100%', maxWidth: 400, padding: 32 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 24 }}>
          <div style={{ width: 36, height: 36, background: 'var(--accent)', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="20" height="20" fill="none" stroke="white" strokeWidth="2.2" viewBox="0 0 24 24">
              <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
            </svg>
          </div>
          <span style={{ fontWeight: 700, fontSize: 18, color: 'var(--text)' }}>Velo</span>
        </div>
        <h1 style={{ fontSize: 22, fontWeight: 700, color: 'var(--text)', marginBottom: 8 }}>
          Sign in with GitHub
        </h1>
        <p style={{ fontSize: 14, color: 'var(--text-3)', marginBottom: 24 }}>
          One click — you’ll be sent to GitHub to authorize, then back here.
        </p>

        <a
          href={loginUrl}
          className="btn-primary"
          style={{
            width: '100%',
            justifyContent: 'center',
            padding: 14,
            fontSize: 15,
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            background: 'var(--surface-2)',
            border: '1px solid var(--border)',
            color: 'var(--text)',
            textDecoration: 'none',
          }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" style={{ flexShrink: 0 }}>
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
          </svg>
          Continue with GitHub
        </a>

        {error && (
          <div style={{ marginTop: 16, padding: '10px 14px', background: 'var(--error-muted)', border: '1px solid var(--error-border)', borderRadius: 8, fontSize: 13, color: 'var(--error)' }}>
            {error}
          </div>
        )}

        <div style={{ marginTop: 24, paddingTop: 24, borderTop: '1px solid var(--border)', textAlign: 'center' }}>
          <Link
            to="/"
            style={{ fontSize: 13, color: 'var(--text-3)', textDecoration: 'none' }}
          >
            ← Back to home
          </Link>
        </div>
      </div>
    </div>
  );
}
