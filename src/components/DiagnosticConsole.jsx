import React, { useEffect, useRef } from 'react';
import { Terminal, Trash2 } from 'lucide-react';

export default function DiagnosticConsole({ logs, onClear }) {
  const terminalEndRef = useRef(null);

  useEffect(() => {
    if (terminalEndRef.current) {
      terminalEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [logs]);

  const getLogStyle = (type) => {
    switch (type) {
      case 'success': return 'text-emerald-500 font-semibold';
      case 'error': return 'text-rose-500 font-bold';
      case 'warning': return 'text-[#F59E0B] font-medium';
      default: return 'text-[#C4A992] dark:text-[#FFF3EB]';
    }
  };

  return (
    <div className="bg-[#23140c] rounded-2xl border border-[#E8622A]/20 overflow-hidden flex flex-col h-64 shadow-inner">
      {/* Console Header */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-[#180d07] border-b border-[#E8622A]/15 select-none">
        <div className="flex items-center gap-2">
          <Terminal className="w-4 h-4 text-[#7C5C44]" />
          <span className="text-xs font-bold text-[#C4A992] font-mono">diagnostic_relay_console.log</span>
        </div>
        <button 
          onClick={onClear}
          className="text-[#7C5C44] hover:text-[#E8622A] transition-colors p-1 cursor-pointer"
          title="Clear console"
        >
          <Trash2 className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Console Output */}
      <div className="flex-1 p-4 font-mono text-[11px] overflow-y-auto leading-relaxed space-y-1.5 custom-scrollbar bg-[#180d07]/40">
        {logs.length === 0 ? (
          <div className="text-[#7C5C44] italic select-none">System listening. Waiting for websocket events...</div>
        ) : (
          logs.map((log) => (
            <div key={log.id} className="flex items-start gap-2.5">
              <span className="text-[#7C5C44] select-none">[{log.timestamp}]</span>
              <span className="text-[#E8622A] select-none font-bold">system@halo:~$</span>
              <span className={getLogStyle(log.type)}>{log.text}</span>
            </div>
          ))
        )}
        <div ref={terminalEndRef} />
      </div>
    </div>
  );
}
