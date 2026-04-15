import React from 'react';

const Navbar = () => {
  return (
    <div className="h-10 bg-slate-800 border-b border-slate-700 flex items-end px-2 select-none overflow-x-auto">
      {/* Active Tab */}
      <div className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-slate-200 border-t border-blue-500 min-w-max cursor-pointer rounded-t-sm">
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-400"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path><polyline points="14 2 14 8 20 8"></polyline></svg>
        <span className="text-sm">App.jsx</span>
        <button className="ml-2 hover:bg-slate-700 rounded-sm p-0.5 ml-2 text-slate-400 hover:text-slate-200">
          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
        </button>
      </div>

      {/* Inactive Tab */}
      <div className="flex items-center gap-2 px-4 py-2 text-slate-400 hover:bg-slate-800 min-w-max cursor-pointer">
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-500"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path><polyline points="14 2 14 8 20 8"></polyline></svg>
        <span className="text-sm">index.css</span>
      </div>
    </div>
  );
};

export default Navbar;
