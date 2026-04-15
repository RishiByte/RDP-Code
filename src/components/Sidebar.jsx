import React from 'react';

const Sidebar = () => {
  return (
    <div className="w-64 bg-slate-900 border-r border-slate-700 flex flex-col h-full text-slate-300">
      <div className="p-2 text-xs font-semibold tracking-wider text-slate-400 uppercase">
        Explorer
      </div>
      <div className="flex-1 overflow-y-auto p-2">
        {/* Placeholder for file tree */}
        <div className="flex items-center gap-2 py-1 px-2 hover:bg-slate-800 cursor-pointer rounded">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-400"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path><polyline points="14 2 14 8 20 8"></polyline></svg>
          <span className="text-sm">App.jsx</span>
        </div>
        <div className="flex items-center gap-2 py-1 px-2 hover:bg-slate-800 cursor-pointer rounded">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-yellow-400"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path><polyline points="14 2 14 8 20 8"></polyline></svg>
          <span className="text-sm">main.jsx</span>
        </div>
        <div className="flex items-center gap-2 py-1 px-2 hover:bg-slate-800 cursor-pointer rounded">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-500"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path><polyline points="14 2 14 8 20 8"></polyline></svg>
          <span className="text-sm">index.css</span>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
