import React, { createContext, useContext, useState, useCallback } from 'react';

const FileSystemContext = createContext(null);

const DEFAULT_FILES = {
  'main.js': '// Start coding...',
};

export const FileSystemProvider = ({ children }) => {
  const [files, setFiles] = useState(DEFAULT_FILES);
  const [activeFile, setActiveFile] = useState('main.js');

  // Create a new file
  const createFile = useCallback((name) => {
    const trimmed = name.trim();
    if (!trimmed || files[trimmed]) return false;
    setFiles((prev) => ({ ...prev, [trimmed]: '' }));
    setActiveFile(trimmed);
    return true;
  }, [files]);

  // Delete a file
  const deleteFile = useCallback((name) => {
    setFiles((prev) => {
      const next = { ...prev };
      delete next[name];
      return next;
    });
    setActiveFile((prev) => {
      if (prev !== name) return prev;
      const remaining = Object.keys(files).filter((f) => f !== name);
      return remaining[0] ?? null;
    });
  }, [files]);

  // Select (open) a file
  const selectFile = useCallback((name) => {
    setActiveFile(name);
  }, []);

  // Update content of a file
  const updateFileContent = useCallback((name, content) => {
    setFiles((prev) => ({ ...prev, [name]: content }));
  }, []);

  return (
    <FileSystemContext.Provider
      value={{ files, activeFile, createFile, deleteFile, selectFile, updateFileContent }}
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
