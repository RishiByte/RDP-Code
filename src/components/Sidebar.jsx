import React, { useState, useRef, useEffect } from 'react';
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

function FileIcon({ filename }) {
  const ext = filename?.split('.').pop().toLowerCase();
  const color = FILE_ICON_COLORS[ext] ?? 'text-slate-400';
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="14"
      height="14"
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

const Sidebar = () => {
  const { files, activeFile, createFile, deleteFile, selectFile } = useFileSystem();
  const [isCreating, setIsCreating] = useState(false);
  const [newFileName, setNewFileName] = useState('');
  const [error, setError] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    if (isCreating) inputRef.current?.focus();
  }, [isCreating]);

  const handleCreateSubmit = (e) => {
    e.preventDefault();
    const name = newFileName.trim();
    if (!name) {
      cancelCreate();
      return;
    }
    if (files[name]) {
      setError('File already exists');
      return;
    }
    createFile(name);
    cancelCreate();
  };

  const cancelCreate = () => {
    setIsCreating(false);
    setNewFileName('');
    setError('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') cancelCreate();
  };

  const fileNames = Object.keys(files).sort();

  return (
    <div className="w-60 bg-slate-900 border-r border-slate-700/60 flex flex-col h-full text-slate-300 select-none">
      {/* Header */}
      <div className="flex items-center justify-between px-3 py-2 border-b border-slate-800">
        <span className="text-[10px] font-semibold tracking-widest text-slate-500 uppercase">
          Explorer
        </span>
        {/* New file button */}
        <button
          id="new-file-btn"
          onClick={() => setIsCreating(true)}
          title="New File"
          className="p-1 rounded text-slate-500 hover:text-slate-200 hover:bg-slate-800 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24"
            fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/>
            <polyline points="14 2 14 8 20 8"/>
            <line x1="12" y1="18" x2="12" y2="12"/>
            <line x1="9" y1="15" x2="15" y2="15"/>
          </svg>
        </button>
      </div>

      {/* File tree */}
      <div className="flex-1 overflow-y-auto py-1">
        {/* New file inline input */}
        {isCreating && (
          <form onSubmit={handleCreateSubmit} className="px-2 py-1">
            <div className="flex items-center gap-1.5 px-2 py-1 bg-slate-800 rounded border border-blue-500/60">
              <FileIcon filename={newFileName || 'file.js'} />
              <input
                ref={inputRef}
                id="new-file-input"
                type="text"
                value={newFileName}
                onChange={(e) => { setNewFileName(e.target.value); setError(''); }}
                onKeyDown={handleKeyDown}
                onBlur={handleCreateSubmit}
                placeholder="filename.js"
                className="flex-1 bg-transparent text-sm text-slate-200 placeholder-slate-600 outline-none min-w-0"
              />
            </div>
            {error && <p className="text-red-400 text-[10px] mt-0.5 px-1">{error}</p>}
          </form>
        )}

        {/* File list */}
        {fileNames.map((name) => {
          const isActive = name === activeFile;
          return (
            <div
              key={name}
              id={`file-item-${name.replace(/\./g, '-')}`}
              onClick={() => selectFile(name)}
              className={`group flex items-center justify-between px-3 py-[5px] cursor-pointer rounded mx-1 transition-colors ${
                isActive
                  ? 'bg-slate-700/70 text-slate-100'
                  : 'hover:bg-slate-800/70 text-slate-400 hover:text-slate-200'
              }`}
            >
              <div className="flex items-center gap-2 min-w-0">
                <FileIcon filename={name} />
                <span className="text-sm truncate">{name}</span>
              </div>
              {/* Delete button — shown on hover */}
              <button
                id={`delete-file-${name.replace(/\./g, '-')}`}
                onClick={(e) => {
                  e.stopPropagation();
                  deleteFile(name);
                }}
                title={`Delete ${name}`}
                className="opacity-0 group-hover:opacity-100 shrink-0 p-0.5 rounded text-slate-500 hover:text-red-400 hover:bg-slate-700 transition-all"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24"
                  fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="3 6 5 6 21 6"/>
                  <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/>
                  <path d="M10 11v6M14 11v6"/>
                  <path d="M9 6V4h6v2"/>
                </svg>
              </button>
            </div>
          );
        })}

        {/* Empty state */}
        {fileNames.length === 0 && !isCreating && (
          <p className="text-slate-600 text-xs text-center mt-6 px-4">
            No files yet. Click <strong className="text-slate-500">+</strong> to create one.
          </p>
        )}
      </div>
    </div>
  );
};

export default Sidebar;

