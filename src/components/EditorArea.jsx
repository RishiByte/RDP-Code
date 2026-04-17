import React from 'react';
import MonacoEditor from '@monaco-editor/react';
import { useFileSystem } from '../context/FileSystemContext';
import { useTheme } from '../context/ThemeContext';

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
  const { isDark } = useTheme();

  const code = activeFile ? (files[activeFile] ?? '') : '';
  const language = getLanguage(activeFile);

  const handleChange = (value) => {
    if (activeFile) {
      updateFileContent(activeFile, value ?? '');
    }
  };

  const monacoTheme = isDark ? 'vs-dark' : 'vs';

  if (!activeFile) {
    return (
      <div className="flex-1 activity-bg flex items-center justify-center text-muted font-mono text-sm select-none theme-transition">
        No file open — create, import, or select a file from the sidebar.
      </div>
    );
  }

  // Monaco dynamically changes its internal theme, but the container relies on our CSS vars
  // To avoid brief flashes before Monaco's iframe injects, we give the wrapper `console-bg`.
  return (
    <div className="flex-1 min-h-0 console-bg theme-transition">
      <MonacoEditor
        height="100%"
        language={language}
        value={code}
        onChange={handleChange}
        theme={monacoTheme}
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
