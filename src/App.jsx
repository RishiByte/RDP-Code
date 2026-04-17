import React from 'react';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import EditorArea from './components/EditorArea';
import Console from './components/Console';
import { FileSystemProvider } from './context/FileSystemContext';
import { ExecutionProvider } from './context/ExecutionContext';
import { ThemeProvider } from './context/ThemeContext';

function App() {
  return (
    <ThemeProvider>
      <ExecutionProvider>
        <FileSystemProvider>
          <div className="h-screen w-screen flex app-bg text-primary overflow-hidden theme-transition">
          {/* Activity Bar */}
          <div className="w-12 bg-slate-950 flex flex-col items-center py-2 gap-4 border-r border-slate-800 shrink-0">
            <div className="p-2 bg-slate-800 rounded-md text-slate-200 cursor-pointer">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>
            </div>
            <div className="p-2 text-slate-500 hover:text-slate-200 cursor-pointer">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
            </div>
            <div className="p-2 text-slate-500 hover:text-slate-200 cursor-pointer">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 3a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3H6a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3V6a3 3 0 0 0-3-3 3 3 0 0 0-3 3 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 3 3 0 0 0-3-3z"></path></svg>
            </div>
          </div>

          {/* Sidebar (File Explorer) */}
          <Sidebar />

          {/* Main Content Area */}
          <div className="flex-1 flex flex-col min-w-0 min-h-0">
            <Navbar />
            <EditorArea />
            <Console />
          </div>
          </div>
        </FileSystemProvider>
      </ExecutionProvider>
    </ThemeProvider>
  );
}

export default App;
