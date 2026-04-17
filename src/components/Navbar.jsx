import React, { useState } from 'react';
import { useFileSystem } from '../context/FileSystemContext';
import { useExecution, LANGUAGE_IDS } from '../context/ExecutionContext';
import { useTheme } from '../context/ThemeContext';
import Settings from './Settings';

const EXT_TO_LANG = {
  js: 'javascript', jsx: 'javascript',
  ts: 'typescript', tsx: 'typescript',
  py: 'python', c: 'c', cpp: 'cpp', java: 'java',
  sh: 'shell',
};

const FILE_ICON_COLORS = {
  js: 'text-yellow-400', jsx: 'text-blue-400',
  ts: 'text-blue-500', tsx: 'text-blue-400',
  css: 'text-sky-400', html: 'text-orange-400',
  json: 'text-yellow-300', md: 'text-slate-300',
  py: 'text-green-400', sh: 'text-green-300',
};

function FileIcon({ filename, size = 13 }) {
  const ext = filename?.split('.').pop().toLowerCase();
  const color = FILE_ICON_COLORS[ext] ?? 'text-slate-400';
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size}
      viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
      className={`shrink-0 ${color}`}>
      <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/>
      <polyline points="14 2 14 8 20 8"/>
    </svg>
  );
}

function Tab({ name, isActive, onSelect, onClose }) {
  return (
    <div
      id={`tab-${name.replace(/\./g, '-')}`}
      onClick={onSelect}
      className={`group relative flex items-center gap-1.5 px-3 h-full border-r app-border min-w-max max-w-[180px] cursor-pointer transition-colors select-none ${
        isActive
          ? 'activity-bg text-primary border-t-2 border-t-blue-500'
          : 'bg-transparent text-muted hover-bg hover:text-primary border-t-2 border-t-transparent'
      }`}
    >
      <FileIcon filename={name} size={13} />
      <span className="text-xs truncate">{name}</span>
      <button
        id={`close-tab-${name.replace(/\./g, '-')}`}
        onClick={(e) => { e.stopPropagation(); onClose(); }}
        title={`Close ${name}`}
        className={`shrink-0 p-0.5 rounded-sm transition-all hover:bg-slate-600 ${
          isActive
            ? 'opacity-60 hover:opacity-100 text-slate-400 hover:text-slate-100'
            : 'opacity-0 group-hover:opacity-60 text-muted hover:text-primary'
        }`}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24"
          fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
        </svg>
      </button>
    </div>
  );
}

const Navbar = () => {
  const { files, activeFile, openFiles, openTab, closeTab } = useFileSystem();
  const { runCode, isRunning } = useExecution();
  const { isDark, toggleTheme } = useTheme();
  const [showSettings, setShowSettings] = useState(false);

  const handleRun = () => {
    if (!activeFile || isRunning) return;
    const code = files[activeFile] ?? '';
    const ext = activeFile.split('.').pop().toLowerCase();
    const lang = EXT_TO_LANG[ext] ?? 'javascript';
    if (!LANGUAGE_IDS[lang]) return;
    runCode(code, lang);
  };

  return (
    <>
      <div className="h-[36px] navbar-bg border-b app-border flex items-stretch overflow-hidden shrink-0 theme-transition">
        {/* ── Tabs (scrollable, hide scrollbar) ── */}
        <div className="flex-1 flex items-stretch overflow-x-auto overflow-y-hidden min-w-0 tabs-no-scrollbar">
          {openFiles.length === 0 ? (
            <div className="flex items-center px-4 text-dim text-xs italic">
              No file open
            </div>
          ) : (
            openFiles.map((name) => (
              <Tab
                key={name}
                name={name}
                isActive={name === activeFile}
                onSelect={() => openTab(name)}
                onClose={() => closeTab(name)}
              />
            ))
          )}
        </div>

        {/* ── Right actions ── */}
        <div className="flex items-center gap-1 px-2 border-l app-border shrink-0">
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            title={`Switch to ${isDark ? 'Light' : 'Dark'} Mode`}
            className="p-1.5 rounded text-muted hover:text-primary hover-bg transition-colors"
          >
            {isDark ? (
              // Sun
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24"
                fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/>
                <line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/>
                <line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
              </svg>
            ) : (
              // Moon
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24"
                fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
              </svg>
            )}
          </button>

          {/* Run button */}
          <button
            id="run-code-btn"
            onClick={handleRun}
            disabled={!activeFile || isRunning}
            title="Run Code via Judge0"
            className={`flex items-center gap-1.5 px-3 py-1 text-xs font-semibold rounded transition-all ${
              isRunning
                ? 'bg-green-700/60 text-green-300 cursor-not-allowed'
                : activeFile
                ? 'bg-green-600 hover:bg-green-500 text-white shadow-sm'
                : 'bg-slate-700 text-slate-500 cursor-not-allowed'
            }`}
          >
            {isRunning ? (
              <>
                <svg className="animate-spin" xmlns="http://www.w3.org/2000/svg" width="11" height="11"
                  viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M21 12a9 9 0 1 1-6.219-8.56"/>
                </svg>
                Running…
              </>
            ) : (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 24 24"
                  fill="currentColor" stroke="none">
                  <polygon points="5 3 19 12 5 21 5 3"/>
                </svg>
                Run
              </>
            )}
          </button>

          {/* Settings gear */}
          <button
            id="settings-btn"
            onClick={() => setShowSettings(true)}
            title="Settings — Configure API Key"
            className="p-1.5 rounded text-muted hover:text-primary hover-bg transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24"
              fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="3"/>
              <path d="M19.07 4.93a10 10 0 0 0-14.14 0M4.93 19.07a10 10 0 0 0 14.14 0"/>
              <path d="M12 2v2M12 20v2M2 12h2M20 12h2"/>
            </svg>
          </button>
        </div>
      </div>

      <Settings isOpen={showSettings} onClose={() => setShowSettings(false)} />
    </>
  );
};

export default Navbar;
