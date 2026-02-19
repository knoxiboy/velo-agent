import { useState, useEffect } from 'react';

function buildLogLines(runs) {
  const lines = [];
  runs.forEach((run, idx) => {
    const ts = run.timestamp || `1${4 + idx}:0${2 + idx * 3}:${String(idx * 13).padStart(2, '0')}`;
    const attempt = idx + 1;
    const passed = run.status?.toUpperCase() === 'PASSED' || run.status === true;

    if (idx === 0) {
      lines.push({ type: 'INFO', ts, text: 'Cloning repository and discovering test files...' });
    }
    lines.push({
      type: 'INFO',
      ts,
      text: `Attempt ${attempt} — running test suite${run.failures_in_run != null ? ` (${run.failures_in_run} failures detected)` : ''}`,
    });
    if (!passed) {
      lines.push({
        type: 'ERROR',
        ts,
        text: run.message || `Test run ${attempt} failed — analyzing with Gemini 2.5 Flash`,
      });
      if (run.fixes_in_run != null && run.fixes_in_run > 0) {
        lines.push({
          type: 'AGENT',
          ts,
          text: `Generated ${run.fixes_in_run} fix${run.fixes_in_run !== 1 ? 'es' : ''} → applying patches and committing with [AI-AGENT] prefix`,
        });
      } else {
        lines.push({ type: 'AGENT', ts, text: 'Analyzing failures and generating targeted fixes...' });
      }
    } else {
      lines.push({
        type: 'PASS',
        ts,
        text: run.message || 'All tests passing — pushing fix branch to remote',
      });
    }
  });
  return lines;
}

const LINE_COLORS = {
  INFO:  'text-slate-400',
  ERROR: 'text-red-400',
  AGENT: 'text-emerald-400',
  PASS:  'text-green-300',
};

const TAG_COLORS = {
  INFO:  'text-slate-500',
  ERROR: 'text-red-500 font-bold',
  AGENT: 'text-emerald-500 font-bold',
  PASS:  'text-green-400 font-bold',
};

export default function CICDTimeline({ runs = [], maxIterations = 5 }) {
  const allLines = buildLogLines(runs);
  const [visibleCount, setVisibleCount] = useState(0);

  useEffect(() => {
    setVisibleCount(0);
    if (allLines.length === 0) return;
    let i = 0;
    const timer = setInterval(() => {
      i += 1;
      setVisibleCount(i);
      if (i >= allLines.length) clearInterval(timer);
    }, 150);
    return () => clearInterval(timer);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [runs]);

  const lastRun = runs[runs.length - 1];
  const finalPassed = lastRun?.status?.toUpperCase() === 'PASSED' || lastRun?.status === true;

  return (
    <div className="rounded-2xl border border-[#1e1e3a] bg-[#0d0d1f] overflow-hidden shadow-2xl shadow-black/50 fade-in-up">
      <div className="h-1 w-full bg-gradient-to-r from-amber-500 via-orange-500 to-red-500" />

      {/* Card header */}
      <div className="px-6 pt-5 pb-3 flex items-center justify-between flex-wrap gap-2">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center">
            <svg className="w-5 h-5 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <div>
            <h3 className="text-base font-bold text-white">CI/CD Pipeline Log</h3>
            <p className="text-xs text-slate-500">{runs.length} / {maxIterations} iterations used</p>
          </div>
        </div>
        <span className={`px-3 py-1 rounded-full text-xs font-bold tracking-wider border
          ${finalPassed
            ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
            : 'bg-red-500/10 border-red-500/30 text-red-400'
          }`}>
          {finalPassed ? '✓ PIPELINE PASSED' : '✗ PIPELINE FAILED'}
        </span>
      </div>

      {/* Terminal */}
      <div className="mx-6 mb-6 rounded-xl overflow-hidden border border-[#1a1a2e]">
        {/* macOS-style title bar */}
        <div className="flex items-center justify-between px-4 py-2.5 bg-[#161622] border-b border-[#1a1a2e]">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-red-500/70" />
            <span className="w-3 h-3 rounded-full bg-amber-400/70" />
            <span className="w-3 h-3 rounded-full bg-emerald-500/70" />
          </div>
          <span className="text-xs text-slate-500 font-mono">live-agent-logs</span>
          <span className="text-xs text-slate-600 font-mono">velo-ci/cd</span>
        </div>

        {/* Log body */}
        <div className="bg-[#0d1117] p-4 font-mono text-xs min-h-[220px] max-h-[380px] overflow-y-auto space-y-1.5">
          {runs.length === 0 ? (
            <span className="text-slate-600">No pipeline runs recorded yet.</span>
          ) : (
            allLines.slice(0, visibleCount).map((line, idx) => (
              <div key={idx} className="flex gap-3 leading-relaxed">
                <span className="text-slate-600 flex-shrink-0">{line.ts}</span>
                <span className={`flex-shrink-0 w-14 ${TAG_COLORS[line.type]}`}>[{line.type}]</span>
                <span className={LINE_COLORS[line.type]}>{line.text}</span>
              </div>
            ))
          )}
          {visibleCount < allLines.length && (
            <div className="flex gap-3">
              <span className="text-slate-600 animate-pulse">▌</span>
            </div>
          )}
        </div>

        {/* Terminal footer */}
        <div className="flex items-center justify-between px-4 py-2 bg-[#161622] border-t border-[#1a1a2e]">
          <span className="text-xs font-mono text-slate-500">
            STATUS: <span className={finalPassed ? 'text-emerald-400' : 'text-amber-400'}>
              {finalPassed ? 'COMPLETE' : 'MONITORING'}
            </span>
          </span>
          <span className="text-xs font-mono text-emerald-500">AGENT: ACTIVE</span>
        </div>
      </div>
    </div>
  );
}
