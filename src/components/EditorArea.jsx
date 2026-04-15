import React from 'react';

const EditorArea = () => {
  return (
    <div className="flex-1 bg-slate-900 p-4 font-mono text-slate-300 overflow-y-auto">
      {/* Placeholder content for Editor */}
      <div className="flex flex-col gap-1 text-sm">
        <div className="flex"><span className="text-slate-600 mr-4 select-none">1</span><span className="text-purple-400">import</span> <span className="text-blue-400">React</span> <span className="text-purple-400">from</span> <span className="text-green-400">'react'</span><span className="text-slate-400">;</span></div>
        <div className="flex"><span className="text-slate-600 mr-4 select-none">2</span></div>
        <div className="flex"><span className="text-slate-600 mr-4 select-none">3</span><span className="text-purple-400">function</span> <span className="text-blue-400">App</span><span className="text-slate-400">()</span> <span className="text-slate-400">{`{`}</span></div>
        <div className="flex"><span className="text-slate-600 mr-4 select-none">4</span><span className="text-slate-400 ml-4">return (</span></div>
        <div className="flex"><span className="text-slate-600 mr-4 select-none">5</span><span className="text-slate-400 ml-8">&lt;</span><span className="text-red-400">div</span> <span className="text-purple-400">className</span><span className="text-slate-400">=</span><span className="text-green-400">"app-container"</span><span className="text-slate-400">&gt;</span></div>
        <div className="flex"><span className="text-slate-600 mr-4 select-none">6</span><span className="text-slate-400 ml-12">Hello Code Editor!</span></div>
        <div className="flex"><span className="text-slate-600 mr-4 select-none">7</span><span className="text-slate-400 ml-8">&lt;/</span><span className="text-red-400">div</span><span className="text-slate-400">&gt;</span></div>
        <div className="flex"><span className="text-slate-600 mr-4 select-none">8</span><span className="text-slate-400 ml-4">);</span></div>
        <div className="flex"><span className="text-slate-600 mr-4 select-none">9</span><span className="text-slate-400">{`}`}</span></div>
        <div className="flex"><span className="text-slate-600 mr-4 select-none">10</span></div>
        <div className="flex"><span className="text-slate-600 mr-4 select-none">11</span><span className="text-purple-400">export default</span> <span className="text-blue-400">App</span><span className="text-slate-400">;</span></div>
      </div>
    </div>
  );
};

export default EditorArea;
