import React, { useRef, useEffect, useState } from 'react';
import { useExecution } from '../context/ExecutionContext';

const STATUS_COLORS = {
  // Accepted
  3: 'text-green-500',
  // Wrong Answer
  4: 'text-red-500',
  // Time Limit Exceeded
  5: 'text-yellow-500',
  // Compilation Error
  6: 'text-yellow-500',
  // Runtime errors (7–12)
};

function getStatusColor(id) {
  if (!id) return 'text-muted';
  if (id === 3) return 'text-green-500';
  if (id >= 7 && id <= 12) return 'text-red-500';
  return STATUS_COLORS[id] ?? 'text-yellow-500';
}

function StatusBadge({ statusId, status }) {
  const color = getStatusColor(statusId);
  const dot = statusId === 3 ? '✓' : statusId >= 4 ? '✗' : '●';
  return (
    <span className={`text-xs font-semibold ${color}`}>
      {dot} {status}
    </span>
  );
}

const TABS = ['TERMINAL', 'OUTPUT', 'PROBLEMS', 'DEBUG CONSOLE'];

const Console = () => {
  const { output, isRunning, clearOutput } = useExecution();
  const [activeTab, setActiveTab] = useState('TERMINAL');
  const bottomRef = useRef(null);

  // Auto-scroll to bottom when output changes
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [output, isRunning]);

  const renderTerminal = () => {
    // Running state
    if (isRunning) {
      return (
        <div className="flex items-center gap-2 text-muted">
          <svg className="animate-spin shrink-0" xmlns="http://www.w3.org/2000/svg"
            width="13" height="13" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2.5">
            <path d="M21 12a9 9 0 1 1-6.219-8.56"/>
          </svg>
          <span className="text-sm">Executing code…</span>
        </div>
      );
    }

    // No output yet
    if (!output) {
      return (
        <div className="text-dim text-sm">
          <span className="text-green-600 font-semibold select-none">user@rdp-code</span>
          <span className="select-none text-muted"> ~ </span>
          <span>Press </span>
          <span className="text-green-500 font-semibold">▶ Run</span>
          <span> to execute the active file</span>
        </div>
      );
    }

    // Config / generic error
    if (output.type === 'config-error' || output.type === 'error') {
      return (
        <div className="space-y-1">
          <div className="text-xs text-muted select-none">── Error ──────────────────</div>
          <div className="text-red-500 text-sm whitespace-pre-wrap break-words">
            {output.message}
            {output.statusCode && (
              <span className="text-red-600 ml-2 text-xs">[HTTP {output.statusCode}]</span>
            )}
          </div>
        </div>
      );
    }

    // Execution result
    if (output.type === 'result') {
      const hasStdout = output.stdout?.trim();
      const hasStderr = output.stderr?.trim();
      const hasCompile = output.compile_output?.trim();

      return (
        <div className="space-y-3">
          {/* Status row */}
          <div className="flex items-center gap-3 text-xs">
            <StatusBadge statusId={output.statusId} status={output.status} />
            {output.time && (
              <span className="text-muted">
                {output.time}s &middot; {output.memory ? `${(output.memory / 1024).toFixed(1)} KB` : '—'}
              </span>
            )}
          </div>

          {/* Compile output */}
          {hasCompile && (
            <div>
              <div className="text-xs text-muted mb-1 select-none">── Compile Output ──────────────</div>
              <pre className="text-yellow-600 dark:text-yellow-300 text-sm whitespace-pre-wrap break-words font-mono leading-relaxed">
                {output.compile_output}
              </pre>
            </div>
          )}

          {/* stdout */}
          {hasStdout && (
            <div>
              {(hasCompile || hasStderr) && (
                <div className="text-xs text-muted mb-1 select-none">── stdout ──────────────────────</div>
              )}
              {/* Keep stdout text-primary so it adapts to dark/light theme automatically */}
              <pre className="text-primary text-sm whitespace-pre-wrap break-words font-mono leading-relaxed">
                {output.stdout}
              </pre>
            </div>
          )}

          {/* stderr */}
          {hasStderr && (
            <div>
              <div className="text-xs text-muted mb-1 select-none">── stderr ──────────────────────</div>
              <pre className="text-red-500 dark:text-red-400 text-sm whitespace-pre-wrap break-words font-mono leading-relaxed">
                {output.stderr}
              </pre>
            </div>
          )}

          {/* No output */}
          {!hasStdout && !hasStderr && !hasCompile && (
            <div className="text-muted text-xs italic">Process exited without output.</div>
          )}

          {/* Exit prompt */}
          <div className="text-xs select-none pt-1 border-t app-border">
            <span className="text-green-600 font-semibold opacity-80">user@rdp-code</span>
            <span className="text-muted"> ~ </span>
            <span className={`${getStatusColor(output.statusId)} font-mono`}>
              Process exited with code {output.statusId === 3 ? '0' : '1'}
            </span>
          </div>
        </div>
      );
    }

    return null;
  };

  return (
    <div className="h-52 console-bg border-t app-border flex flex-col shrink-0 theme-transition">
      {/* ── Tab bar ── */}
      <div className="flex items-center border-b app-border activity-bg shrink-0">
        <div className="flex items-stretch">
          {TABS.map((tab) => (
            <button
              key={tab}
              id={`console-tab-${tab.toLowerCase().replace(/\s+/g, '-')}`}
              onClick={() => setActiveTab(tab)}
              className={`px-3 py-1.5 text-[11px] tracking-widest font-medium transition-colors border-b-2 ${
                activeTab === tab
                  ? 'text-primary border-blue-500 bg-transparent'
                  : 'text-muted border-transparent hover:text-primary'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Clear button */}
        {output && activeTab === 'TERMINAL' && (
          <button
            id="clear-console-btn"
            onClick={clearOutput}
            title="Clear output"
            className="ml-auto mr-2 px-2 py-0.5 text-[10px] text-muted hover:text-primary hover-bg rounded transition-colors"
          >
            Clear
          </button>
        )}
      </div>

      {/* ── Console content ── */}
      <div className="flex-1 overflow-y-auto p-3 font-mono text-sm" id="console-output">
        {activeTab === 'TERMINAL' ? (
          renderTerminal()
        ) : (
          <div className="text-muted text-xs italic">
            No {activeTab.toLowerCase()} output.
          </div>
        )}
        <div ref={bottomRef} />
      </div>
    </div>
  );
};

export default Console;
