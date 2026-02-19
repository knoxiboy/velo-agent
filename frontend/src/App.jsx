import { useState } from 'react';
import LandingPage from './components/LandingPage';
import Dashboard from './components/Dashboard';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export default function App() {
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);
  const [error,   setError]   = useState('');

  const handleSubmit = async ({ repo_url, team_name, leader_name }) => {
    setLoading(true);
    setError('');
    setResults(null);
    try {
      const res = await fetch(`${API_URL}/api/analyze`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ repo_url, team_name, leader_name }),
      });
      if (!res.ok) {
        const j = await res.json().catch(() => ({}));
        throw new Error(j.error || `Server error ${res.status}`);
      }
      const data = await res.json();
      setResults(data);
    } catch (e) {
      setError(e.message || 'An unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setResults(null);
    setError('');
  };

  if (results && !loading) {
    return <Dashboard data={results} onReset={handleReset} />;
  }

  return (
    <>
      <LandingPage onSubmit={handleSubmit} loading={loading} />
      {error && !loading && (
        <div style={{
          position: 'fixed', bottom: 80, left: 16, right: 16, zIndex: 100,
          background: '#1a0505', border: '1px solid rgba(239,68,68,0.4)',
          borderRadius: 12, padding: '14px 18px',
          display: 'flex', alignItems: 'center', gap: 12,
          boxShadow: '0 0 20px rgba(239,68,68,0.15)',
        }}>
          <span className="material-symbols-outlined" style={{ color: '#f87171', fontSize: 20, flexShrink: 0 }}>error</span>
          <div style={{ flex: 1 }}>
            <p style={{ color: '#f87171', fontWeight: 600, fontSize: 13, marginBottom: 2 }}>Analysis Failed</p>
            <p style={{ color: '#94a3b8', fontSize: 12 }}>{error}</p>
          </div>
          <button onClick={() => setError('')} style={{ background: 'none', border: 'none', color: '#64748b', cursor: 'pointer' }}>
            <span className="material-symbols-outlined" style={{ fontSize: 18 }}>close</span>
          </button>
        </div>
      )}
    </>
  );
}
