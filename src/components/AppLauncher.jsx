import React, { useState } from 'react';
import { LayoutGrid, Search, X, ExternalLink } from 'lucide-react';

export default function AppLauncher({ apps = [], onLaunchApp, onRefresh, onClose }) {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredApps = (apps || []).filter(app =>
    (app.name || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
    (app.packageName || '').toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in">
      <div className="bg-white dark:bg-[#23140c] rounded-3xl max-w-2xl w-full max-h-[80vh] border border-[#E8622A]/15 dark:border-[#E8622A]/30 shadow-2xl flex flex-col overflow-hidden text-[#2C1A0E] dark:text-[#FFF3EB]">
        
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-[#E8622A]/10 dark:border-[#E8622A]/20 bg-[#FDF8F4] dark:bg-[#180d07]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-[#E8622A] to-[#F59E0B] rounded-xl flex items-center justify-center shadow-lg shadow-[#E8622A]/15">
              <LayoutGrid className="w-5 h-5 text-white animate-pulse" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-[#2C1A0E] dark:text-white">Installed Applications</h3>
              <p className="text-xs text-[#7C5C44] dark:text-[#C4A992]">
                {filteredApps.length} apps installed
              </p>
            </div>
          </div>
          <button 
            onClick={onClose} 
            className="p-2 rounded-full hover:bg-[#FFF9F4] dark:hover:bg-[#301c11] text-[#7C5C44] hover:text-[#E8622A] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search Bar */}
        <div className="px-5 py-3 border-b border-[#E8622A]/10 dark:border-[#E8622A]/20 bg-white dark:bg-[#23140c]/40">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#7C5C44]/60" />
            <input
              type="text"
              placeholder="Search apps..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#FDF8F4] dark:bg-[#180d07] border border-[#E8622A]/15 dark:border-[#E8622A]/30 rounded-xl pl-10 pr-4 py-2.5 text-xs text-[#2C1A0E] dark:text-[#FFF3EB] placeholder:text-[#7C5C44]/50 focus:outline-none focus:border-[#E8622A] transition-all"
            />
          </div>
        </div>

        {/* Apps Grid */}
        <div className="flex-1 overflow-y-auto p-6 bg-white/30 dark:bg-[#180d07]/10">
          {filteredApps.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 gap-3">
              <LayoutGrid className="w-12 h-12 text-[#7C5C44]/30" />
              <p className="text-sm text-[#7C5C44] font-bold">
                {searchQuery ? 'No apps match your search' : 'Loading application list...'}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4">
              {filteredApps.map((app, index) => (
                <button
                  key={app.packageName || index}
                  onClick={() => onLaunchApp(app.packageName, app.name)}
                  className="flex flex-col items-center gap-2.5 p-3 rounded-2xl hover:bg-[#FFF9F4] dark:hover:bg-[#301c11]/60 border border-transparent hover:border-[#E8622A]/20 transition-all group relative cursor-pointer"
                  title={app.packageName}
                >
                  {/* App Icon */}
                  <div className="w-12 h-12 rounded-xl overflow-hidden bg-[#FDF8F4] dark:bg-[#180d07] border border-[#E8622A]/10 dark:border-[#E8622A]/20 shadow-sm group-hover:scale-105 transition-all">
                    {app.icon ? (
                      <img 
                        src={`data:image/png;base64,${app.icon}`} 
                        alt={app.name}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gradient-to-tr from-[#E8622A] to-[#F59E0B] text-white text-md font-bold uppercase">
                        {(app.name || '?')[0]}
                      </div>
                    )}
                  </div>
                  
                  {/* App Name */}
                  <span className="text-[10px] font-bold text-[#7C5C44] dark:text-[#C4A992] group-hover:text-[#E8622A] text-center leading-tight truncate w-full transition-colors">
                    {app.name || 'Unknown'}
                  </span>

                  {/* Launch Indicator */}
                  <div className="absolute top-1.5 right-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                    <ExternalLink className="w-3 h-3 text-[#E8622A]" />
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-5 py-3.5 border-t border-[#E8622A]/10 dark:border-[#E8622A]/20 bg-[#FDF8F4] dark:bg-[#180d07] flex items-center justify-between">
          <p className="text-[10px] text-[#7C5C44] dark:text-[#C4A992] uppercase tracking-wider font-bold">
            Click an app icon to launch it on the device
          </p>
          <button
            onClick={onRefresh}
            className="text-xs font-bold text-[#E8622A] hover:text-[#D04F18] transition-colors cursor-pointer"
          >
            Sync List
          </button>
        </div>
      </div>
    </div>
  );
}
