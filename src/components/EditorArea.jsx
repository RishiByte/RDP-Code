import React from 'react';
import MonacoEditor from '@monaco-editor/react';
import { useFileSystem } from '../context/FileSystemContext';

const LANGUAGE_MAP = {
  js: 'javascript',
  jsx: 'javascript',
  ts: 'typescript',
  tsx: 'typescript',
  css: 'css',
  html: 'html',
  json: 'json',
  md: 'markdown',
  py: 'python',
  sh: 'shell',
};

function getLanguage(filename) {
  if (!filename) return 'javascript';
  const ext = filename.split('.').pop().toLowerCase();
  return LANGUAGE_MAP[ext] ?? 'plaintext';
}

const EditorArea = () => {
  const { files, activeFile, updateFileContent } = useFileSystem();

  const code = activeFile ? (files[activeFile] ?? '') : '';
  const language = getLanguage(activeFile);

  const handleChange = (value) => {
    if (activeFile) {
      updateFileContent(activeFile, value ?? '');
    }
  };

  if (!activeFile) {
    return (
      <div className="flex-1 bg-slate-900 flex items-center justify-center text-slate-500 font-mono text-sm select-none">
        No file open — create or select a file from the sidebar.
      </div>
    );
  }

  return (
    <div className="flex-1 min-h-0 bg-[#1e1e1e]">
      <MonacoEditor
        height="100%"
        language={language}
        value={code}
        onChange={handleChange}
        theme="vs-dark"
        options={{
          fontSize: 14,
          fontFamily: "'JetBrains Mono', 'Fira Code', 'Cascadia Code', monospace",
          fontLigatures: true,
          minimap: { enabled: true },
          scrollBeyondLastLine: false,
          wordWrap: 'on',
          lineNumbers: 'on',
          renderWhitespace: 'selection',
          cursorBlinking: 'smooth',
          cursorSmoothCaretAnimation: 'on',
          smoothScrolling: true,
          tabSize: 2,
          automaticLayout: true,
          padding: { top: 12, bottom: 12 },
          bracketPairColorization: { enabled: true },
        }}
      />
    </div>
  );
};

export default EditorArea;
