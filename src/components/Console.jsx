import React from 'react';

const Console = () => {
  return (
    <div className="h-48 bg-slate-900 border-t border-slate-700 flex flex-col text-slate-300">
      {/* Console Tabs */}
      <div className="flex border-b border-slate-800 px-4">
        <div className="px-2 py-1 text-xs text-slate-400 hover:text-slate-200 cursor-pointer uppercase tracking-wider">PROBLEMS</div>
        <div className="px-2 py-1 text-xs text-slate-400 hover:text-slate-200 cursor-pointer uppercase tracking-wider">OUTPUT</div>
        <div className="px-2 py-1 text-xs text-slate-400 hover:text-slate-200 cursor-pointer uppercase tracking-wider">DEBUG CONSOLE</div>
        <div className="px-2 py-1 text-xs text-slate-200 border-b border-blue-500 cursor-pointer uppercase tracking-wider">TERMINAL</div>
      </div>
      
      {/* Console Content */}
      <div className="flex-1 p-2 font-mono text-sm overflow-y-auto">
        <div className="text-green-400">user@macbook-pro RDP-Code % <span className="text-slate-300">npm run dev</span></div>
        <div className="mt-1 text-slate-400">
          <div>&gt; rdp-code@0.0.0 dev</div>
          <div>&gt; vite</div>
          <br/>
          <div className="text-green-400">  VITE v5.0.0  ready in 250 ms</div>
          <br/>
          <div>  ➜  Local:   <a href="#" className="text-blue-400 hover:underline">http://localhost:5173/</a></div>
          <div>  ➜  Network: use --host to expose</div>
          <div>  ➜  press h + enter to show help</div>
        </div>
      </div>
    </div>
  );
};

export default Console;
