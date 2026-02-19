import { useState, useEffect, useRef } from 'react';

function useCountUp(target, duration = 900) {
  const [count, setCount] = useState(0);
  const prevTarget = useRef(null);
  useEffect(() => {
    if (typeof target !== 'number' || prevTarget.current === target) return;
    prevTarget.current = target;
    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [target, duration]);
  return count;
}

function AnimatedBar({ label, value, max, colorClass, bgClass, delay = 0 }) {
  const [width, setWidth] = useState(0);
  useEffect(() => {
    const t = setTimeout(() => setWidth(max > 0 ? (value / max) * 100 : 0), delay + 100);
    return () => clearTimeout(t);
  }, [value, max, delay]);

  return (
    <div className="flex items-center gap-3">
      <span className="text-xs text-slate-500 w-28 flex-shrink-0 uppercase tracking-wider">{label}</span>
      <div className="flex-1 h-2 rounded-full bg-[#1a1a2e] overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-700 ease-out ${colorClass}`}
          style={{ width: `${width}%`, transitionDelay: `${delay}ms` }}
        />
      </div>
      <span className={`text-sm font-bold font-mono w-6 text-right ${bgClass}`}>{value}</span>
    </div>
  );
}

export default function RunSummaryCard({ data }) {
  const {
    repo_url,
    team_name,
    leader_name,
    branch_name,
    total_failures,
    total_fixes,
    ci_status,
    execution_time,
  } = data;

  const passed = ci_status?.toUpperCase() === 'PASSED';
  const failures = total_failures ?? 0;
  const fixes = total_fixes ?? 0;
  const successRate = failures > 0 ? Math.round((fixes / failures) * 100) : fixes > 0 ? 100 : 0;
  const barMax = Math.max(failures, fixes, 1);

  const animatedFailures = useCountUp(failures);
  const animatedFixes = useCountUp(fixes);

  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    if (branch_name) {
      navigator.clipboard.writeText(branch_name).catch(() => {});
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const InfoRow = ({ icon, label, value, mono }) => (
    <div className="flex items-start gap-3">
      <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-[#1a1a2e] border border-[#2a2a4a] flex items-center justify-center mt-0.5">
        {icon}
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-xs text-slate-500 font-medium uppercase tracking-wider">{label}</p>
        {mono ? (
          <div className="flex items-center gap-2 mt-0.5">
            <p className="text-xs font-mono text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded truncate">{value}</p>
            <button
              onClick={handleCopy}
              title="Copy branch name"
              className="flex-shrink-0 text-slate-600 hover:text-indigo-400 transition-colors"
            >
              {copied ? (
                <svg className="w-3.5 h-3.5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                </svg>
              ) : (
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              )}
            </button>
            {copied && <span className="text-xs text-emerald-400">Copied!</span>}
          </div>
        ) : (
          <p className="text-sm text-slate-200 font-medium truncate mt-0.5">{value}</p>
        )}
      </div>
    </div>
  );

  return (
    <div className="rounded-2xl border border-[#1e1e3a] bg-[#0d0d1f] overflow-hidden shadow-2xl shadow-black/50 fade-in-up">
      <div className={`h-1 w-full ${passed ? 'bg-gradient-to-r from-emerald-500 to-teal-500' : 'bg-gradient-to-r from-red-500 to-rose-600'}`} />
      <div className="p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center">
              <svg className="w-5 h-5 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Run Summary</h3>
              <p className="text-xs text-slate-500">Analysis complete</p>
            </div>
          </div>
          <div className={`flex items-center gap-2 px-4 py-2 rounded-full border font-bold text-sm tracking-wider uppercase
            ${passed
              ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-400 shadow-lg shadow-emerald-900/20'
              : 'bg-red-500/10 border-red-500/40 text-red-400 shadow-lg shadow-red-900/20'
            }`}>
            <span className={`w-2 h-2 rounded-full ${passed ? 'bg-emerald-400' : 'bg-red-400'}`}
              style={{ animation: 'pulse 2s ease-in-out infinite' }} />
            {passed ? '✓ PASSED' : '✗ FAILED'}
          </div>
        </div>

        {/* Info grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 p-4 rounded-xl bg-[#0a0a15] border border-[#1a1a2e]">
          <InfoRow
            icon={<svg className="w-4 h-4 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
            </svg>}
            label="Repository"
            value={repo_url}
          />
          <InfoRow
            icon={<svg className="w-4 h-4 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0" />
            </svg>}
            label="Team"
            value={`${team_name} — ${leader_name}`}
          />
          <InfoRow
            icon={<svg className="w-4 h-4 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414A1 1 0 0120 8.414V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2" />
            </svg>}
            label="Branch Created"
            value={branch_name}
            mono
          />
          <InfoRow
            icon={<svg className="w-4 h-4 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>}
            label="Execution Time"
            value={execution_time ?? 'N/A'}
          />
        </div>

        {/* Stats + bar chart */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Animated number stats */}
          <div className="grid grid-cols-2 gap-3">
            <div className="p-4 rounded-xl bg-[#0a0a15] border border-[#1a1a2e] text-center">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-1">Failures</span>
              <span className="text-3xl font-black text-red-400">{animatedFailures}</span>
            </div>
            <div className="p-4 rounded-xl bg-[#0a0a15] border border-[#1a1a2e] text-center">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-1">Fixes</span>
              <span className="text-3xl font-black text-emerald-400">{animatedFixes}</span>
            </div>
          </div>

          {/* Horizontal bar chart */}
          <div className="p-4 rounded-xl bg-[#0a0a15] border border-[#1a1a2e] space-y-3">
            <AnimatedBar
              label="Failures"
              value={failures}
              max={barMax}
              colorClass="bg-red-500"
              bgClass="text-red-400"
              delay={0}
            />
            <AnimatedBar
              label="Fixes Applied"
              value={fixes}
              max={barMax}
              colorClass="bg-emerald-500"
              bgClass="text-emerald-400"
              delay={150}
            />
            <AnimatedBar
              label="Success Rate"
              value={successRate}
              max={100}
              colorClass="bg-gradient-to-r from-indigo-500 to-violet-500"
              bgClass="text-indigo-400"
              delay={300}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
