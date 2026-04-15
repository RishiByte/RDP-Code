import React from 'react';
import { useFileSystem } from '../context/FileSystemContext';

const FILE_ICON_COLORS = {
  js: 'text-yellow-400',
  jsx: 'text-blue-400',
  ts: 'text-blue-500',
  tsx: 'text-blue-400',
  css: 'text-sky-400',
  html: 'text-orange-400',
  json: 'text-yellow-300',
  md: 'text-slate-300',
  py: 'text-green-400',
  sh: 'text-green-300',
};

function FileIcon({ filename, size = 13 }) {
  const ext = filename?.split('.').pop().toLowerCase();
  const color = FILE_ICON_COLORS[ext] ?? 'text-slate-400';
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`shrink-0 ${color}`}
    >
      <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
      <polyline points="14 2 14 8 20 8" />
    </svg>
  );
}

const Navbar = () => {
  const { activeFile, selectFile } = useFileSystem();

  return (
    <div className="h-9 bg-slate-800/80 border-b border-slate-700/60 flex items-end px-1 select-none overflow-x-auto shrink-0">
      {activeFile ? (
        <div
          id="active-tab"
          className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-900 text-slate-200 border-t-2 border-blue-500 min-w-max cursor-pointer rounded-t-sm group"
        >
          <FileIcon filename={activeFile} />
          <span className="text-sm">{activeFile}</span>
          <button
            id="close-tab-btn"
            onClick={(e) => {
              e.stopPropagation();
              selectFile(null);
            }}
            className="ml-1 p-0.5 rounded-sm text-slate-500 opacity-0 group-hover:opacity-100 hover:text-slate-200 hover:bg-slate-700 transition-all"
            title="Close tab"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 24 24"
              fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>
      ) : (
        <div className="px-4 py-1.5 text-slate-600 text-sm italic">
          No file open
        </div>
      )}
    </div>
  );
};

export default Navbar;

