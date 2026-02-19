import { useState } from 'react';

const BUG_TYPE_COLORS = {
  LINTING:     { bg: 'bg-blue-500/10',    border: 'border-blue-500/30',    text: 'text-blue-400',    bar: 'bg-blue-500',    hex: '#60a5fa' },
  SYNTAX:      { bg: 'bg-amber-500/10',   border: 'border-amber-500/30',   text: 'text-amber-400',   bar: 'bg-amber-500',   hex: '#fbbf24' },
  LOGIC:       { bg: 'bg-violet-500/10',  border: 'border-violet-500/30',  text: 'text-violet-400',  bar: 'bg-violet-500',  hex: '#a78bfa' },
  TYPE_ERROR:  { bg: 'bg-red-500/10',     border: 'border-red-500/30',     text: 'text-red-400',     bar: 'bg-red-500',     hex: '#f87171' },
  IMPORT:      { bg: 'bg-cyan-500/10',    border: 'border-cyan-500/30',    text: 'text-cyan-400',    bar: 'bg-cyan-500',    hex: '#22d3ee' },
  INDENTATION: { bg: 'bg-emerald-500/10', border: 'border-emerald-500/30', text: 'text-emerald-400', bar: 'bg-emerald-500', hex: '#34d399' },
};

function BugTypeBadge({ type }) {
  const normalized = type?.toUpperCase();
  const colors = BUG_TYPE_COLORS[normalized] || {
    bg: 'bg-slate-500/10', border: 'border-slate-500/30', text: 'text-slate-400', bar: 'bg-slate-500'
  };
  return (
    <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-bold tracking-wider border whitespace-nowrap ${colors.bg} ${colors.border} ${colors.text}`}>
      {normalized || type}
    </span>
  );
}

function StatusBadge({ status }) {
  const fixed = status?.toLowerCase() === 'fixed' || status === true;
  return fixed ? (
    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 whitespace-nowrap">
      <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
      </svg>
      Fixed
    </span>
  ) : (
    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-red-500/10 border border-red-500/30 text-red-400 whitespace-nowrap">
      <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
      </svg>
      Failed
    </span>
  );
}

export default function FixesTable({ fixes = [] }) {
  const [activeFilter, setActiveFilter] = useState(null);

  // Count bug types
  const typeCounts = fixes.reduce((acc, f) => {
    const t = f.bug_type?.toUpperCase() || 'UNKNOWN';
    acc[t] = (acc[t] || 0) + 1;
    return acc;
  }, {});

  const maxCount = Math.max(...Object.values(typeCounts), 1);
  const sortedTypes = Object.entries(typeCounts).sort((a, b) => b[1] - a[1]);

  const filtered = activeFilter
    ? fixes.filter(f => f.bug_type?.toUpperCase() === activeFilter)
    : fixes;

  return (
    <div className="rounded-2xl border border-[#1e1e3a] bg-[#0d0d1f] overflow-hidden shadow-2xl shadow-black/50 fade-in-up">
      <div className="h-1 w-full bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-500" />
      <div className="p-6">
        {/* Header */}
        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center">
            <svg className="w-5 h-5 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
          <div>
            <h3 className="text-base font-bold text-white">Fixes Applied</h3>
            <p className="text-xs text-slate-500">
              {activeFilter
                ? `${filtered.length} of ${fixes.length} shown — filtered by ${activeFilter}`
                : `${fixes.length} changes processed`}
            </p>
          </div>
        </div>

        {/* Bug type frequency pills */}
        {sortedTypes.length > 0 && (
          <div className="mb-5 p-4 rounded-xl bg-[#0a0a15] border border-[#1a1a2e]">
            <p className="text-xs text-slate-500 uppercase tracking-wider mb-3">Bug Type Distribution — click to filter</p>
            <div className="flex flex-wrap gap-2">
              {sortedTypes.map(([type, count]) => {
                const colors = BUG_TYPE_COLORS[type] || { bg: 'bg-slate-500/10', border: 'border-slate-500/30', text: 'text-slate-400', bar: 'bg-slate-500' };
                const isActive = activeFilter === type;
                return (
                  <button
                    key={type}
                    onClick={() => setActiveFilter(isActive ? null : type)}
                    style={isActive ? {} : { '--hover-color': colors.hex }}
                    className={`group flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs font-semibold transition-all duration-150
                      ${isActive
                        ? `${colors.bg} ${colors.border} ${colors.text} ring-1 ring-current scale-105`
                        : 'bg-[#0d0d1f] border-[#2a2a4a] text-slate-400'
                      }`}
                  >
                    <div className="flex items-center gap-1.5">
                      <div
                        className="h-1.5 rounded-full"
                        style={{
                          width: `${Math.round((count / maxCount) * 32) + 8}px`,
                          backgroundColor: colors.hex,
                        }}
                      />
                      <span style={!isActive ? { color: 'rgb(148 163 184)' } : {}}>{type}</span>
                    </div>
                    <span
                      className="rounded-full px-1.5 py-0.5 text-xs font-black"
                      style={{ color: colors.hex, backgroundColor: isActive ? `${colors.hex}20` : '#1a1a2e' }}
                    >
                      {count}
                    </span>
                  </button>
                );
              })}
              {activeFilter && (
                <button
                  onClick={() => setActiveFilter(null)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-700 text-xs text-slate-500 hover:text-white hover:border-slate-500 transition-all"
                >
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  Clear filter
                </button>
              )}
            </div>
          </div>
        )}

        {filtered.length === 0 ? (
          <div className="text-center py-12 text-slate-600">
            <svg className="w-12 h-12 mx-auto mb-3 opacity-30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1}
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            <p className="text-sm">{activeFilter ? `No ${activeFilter} fixes found` : 'No fixes recorded'}</p>
          </div>
        ) : (
          <div className="overflow-x-auto rounded-xl border border-[#1a1a2e]">
            <table className="w-full text-sm min-w-[560px]">
              <thead>
                <tr className="bg-[#0a0a15]">
                  <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider border-b border-[#1a1a2e]">File</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider border-b border-[#1a1a2e]">Bug Type</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider border-b border-[#1a1a2e]">Line</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider border-b border-[#1a1a2e] hidden md:table-cell">Commit Message</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider border-b border-[#1a1a2e]">Status</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((fix, idx) => (
                  <tr key={idx} className="border-b border-[#131325] hover:bg-[#0f0f20] transition-colors duration-150">
                    <td className="px-4 py-3">
                      <span className="font-mono text-xs text-slate-300 bg-[#0a0a15] px-2 py-1 rounded whitespace-nowrap">
                        {fix.file || '—'}
                      </span>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <BugTypeBadge type={fix.bug_type} />
                    </td>
                    <td className="px-4 py-3">
                      <span className="font-mono text-xs text-slate-400 whitespace-nowrap">
                        {fix.line_number != null ? `L${fix.line_number}` : '—'}
                      </span>
                    </td>
                    <td className="px-4 py-3 max-w-xs hidden md:table-cell">
                      <span className="text-xs text-slate-400 leading-relaxed line-clamp-2">
                        {fix.commit_message || '—'}
                      </span>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <StatusBadge status={fix.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
