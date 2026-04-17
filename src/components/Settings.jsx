import React, { useState, useEffect, useRef } from 'react';
import { useExecution } from '../context/ExecutionContext';

const Settings = ({ isOpen, onClose }) => {
  const { apiKey, saveApiKey } = useExecution();
  const [draftKey, setDraftKey] = useState(apiKey);
  const [saved, setSaved] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setDraftKey(apiKey);
      setSaved(false);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen, apiKey]);

  if (!isOpen) return null;

  const handleSave = () => {
    saveApiKey(draftKey);
    setSaved(true);
    setTimeout(() => { setSaved(false); onClose(); }, 800);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') onClose();
    if (e.key === 'Enter') handleSave();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(2px)' }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="sidebar-bg border app-border rounded-lg shadow-2xl w-full max-w-[480px] overflow-hidden theme-transition">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b app-border bg-black/5">
          <div className="flex items-center gap-2.5">
            <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 24 24"
              fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
              className="text-muted">
              <circle cx="12" cy="12" r="3"/>
              <path d="M19.07 4.93a10 10 0 0 0-14.14 0"/>
              <path d="M4.93 19.07a10 10 0 0 0 14.14 0"/>
              <path d="M12 2v4M12 18v4M2 12h4M18 12h4"/>
            </svg>
            <h2 className="text-primary font-semibold text-sm">Settings</h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded text-muted hover:text-primary hover-bg transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"
              fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>

        {/* Body */}
        <div className="px-5 py-5 space-y-5">
          {/* API Key section */}
          <div>
            <label className="block text-xs font-semibold text-muted uppercase tracking-wider mb-2">
              Judge0 RapidAPI Key
            </label>
            <input
              ref={inputRef}
              id="api-key-input"
              type="password"
              value={draftKey}
              onChange={(e) => setDraftKey(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Paste your X-RapidAPI-Key here…"
              className="w-full activity-bg border app-border focus:border-blue-500 rounded-md px-3 py-2 text-sm text-primary placeholder-muted outline-none transition-colors font-mono"
            />
            {/* Help text */}
            <div className="mt-3 p-3 activity-bg rounded-md border app-border space-y-2">
              <p className="text-xs text-muted font-semibold">How to get a free key:</p>
              <ol className="text-xs text-dim space-y-1 list-decimal list-inside">
                <li>Go to <span className="text-blue-500">rapidapi.com</span> and sign up</li>
                <li>Search for "Judge0 CE" API</li>
                <li>Subscribe to the <span className="text-green-500">Basic (free)</span> plan</li>
                <li>Copy your X-RapidAPI-Key from "Header Parameters"</li>
              </ol>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-2.5 px-5 py-4 border-t app-border bg-black/5">
          <button
            onClick={onClose}
            className="px-4 py-1.5 text-sm text-muted hover:text-primary rounded-md hover-bg transition-colors"
          >
            Cancel
          </button>
          <button
            id="save-api-key-btn"
            onClick={handleSave}
            className={`px-4 py-1.5 text-sm font-semibold rounded-md transition-all ${
              saved
                ? 'bg-green-600 text-white shadow-sm'
                : 'bg-blue-600 hover:bg-blue-500 text-white shadow-sm'
            }`}
          >
            {saved ? '✓ Saved' : 'Save Key'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
