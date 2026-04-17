import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';

const FileSystemContext = createContext(null);

const DEFAULT_FILES = { 'main.js': '// Start coding...' };
const LS_KEY = 'rdp_code_fs';

function loadFromStorage() {
  try {
    const raw = localStorage.getItem(LS_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

function buildInitialState() {
  const saved = loadFromStorage();
  if (saved?.files && Object.keys(saved.files).length > 0) {
    const firstFile = Object.keys(saved.files)[0];
    return {
      files: saved.files,
      activeFile: saved.activeFile ?? firstFile,
      openFiles: Array.isArray(saved.openFiles) && saved.openFiles.length > 0
        ? saved.openFiles.filter((f) => saved.files[f]) // only valid files
        : [saved.activeFile ?? firstFile],
    };
  }
  return { files: DEFAULT_FILES, activeFile: 'main.js', openFiles: ['main.js'] };
}

export const FileSystemProvider = ({ children }) => {
  const [state, setState] = useState(buildInitialState);

  const { files, activeFile, openFiles } = state;

  // Persist to localStorage on every change
  useEffect(() => {
    try {
      localStorage.setItem(LS_KEY, JSON.stringify({ files, activeFile, openFiles }));
    } catch {/* storage full — ignore */}
  }, [files, activeFile, openFiles]);

  const createFile = useCallback((name) => {
    const trimmed = name.trim();
    if (!trimmed) return false;
    setState((prev) => {
      if (prev.files[trimmed]) return prev;
      return {
        files: { ...prev.files, [trimmed]: '' },
        activeFile: trimmed,
        openFiles: prev.openFiles.includes(trimmed)
          ? prev.openFiles
          : [...prev.openFiles, trimmed],
      };
    });
    return true;
  }, []);

  const deleteFile = useCallback((name) => {
    setState((prev) => {
      const nextFiles = { ...prev.files };
      delete nextFiles[name];
      const nextOpen = prev.openFiles.filter((f) => f !== name);
      const nextActive =
        prev.activeFile === name
          ? (nextOpen[nextOpen.length - 1] ?? null)
          : prev.activeFile;
      return { files: nextFiles, openFiles: nextOpen, activeFile: nextActive };
    });
  }, []);

  // Open a file into tabs and make active
  const openTab = useCallback((name) => {
    setState((prev) => ({
      ...prev,
      activeFile: name,
      openFiles: prev.openFiles.includes(name)
        ? prev.openFiles
        : [...prev.openFiles, name],
    }));
  }, []);

  // Close a tab (file stays in sidebar)
  const closeTab = useCallback((name) => {
    setState((prev) => {
      const nextOpen = prev.openFiles.filter((f) => f !== name);
      const nextActive =
        prev.activeFile === name
          ? (nextOpen[nextOpen.length - 1] ?? null)
          : prev.activeFile;
      return { ...prev, openFiles: nextOpen, activeFile: nextActive };
    });
  }, []);

  // selectFile = openTab (clicking sidebar opens the tab)
  const selectFile = useCallback(
    (name) => {
      if (name === null) {
        setState((prev) => ({ ...prev, activeFile: null }));
        return;
      }
      openTab(name);
    },
    [openTab]
  );

  const updateFileContent = useCallback((name, content) => {
    setState((prev) => ({
      ...prev,
      files: { ...prev.files, [name]: content },
    }));
  }, []);

  return (
    <FileSystemContext.Provider
      value={{
        files,
        activeFile,
        openFiles,
        createFile,
        deleteFile,
        openTab,
        closeTab,
        selectFile,
        updateFileContent,
      }}
    >
      {children}
    </FileSystemContext.Provider>
  );
};

export const useFileSystem = () => {
  const ctx = useContext(FileSystemContext);
  if (!ctx) throw new Error('useFileSystem must be used inside FileSystemProvider');
  return ctx;
};

