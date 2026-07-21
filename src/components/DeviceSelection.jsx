import React from 'react';
import { Smartphone, Trash2, Wifi, WifiOff, Plus, Play, Info, Download } from 'lucide-react';

export default function DeviceSelection({ devices, onConnect, onDelete, loading, connectingId, onAddDevice }) {
  const formatLastSeen = (date) => {
    if (!date) return 'Never';
    const diff = Math.floor((new Date() - new Date(date)) / 1000);
    if (diff < 60) return 'Just now';
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
    return `${Math.floor(diff / 86400)}d ago`;
  };

  return (
    <div className="space-y-6 w-full">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E8622A]/10 dark:border-[#E8622A]/20 pb-4">
        <div>
          <h2 className="text-xl font-extrabold text-[#2C1A0E] dark:text-white">Select a Device</h2>
          <p className="text-xs text-[#7C5C44] dark:text-[#C4A992]">Choose a registered device to establish control</p>
        </div>
        <button 
          onClick={onAddDevice}
          className="flex items-center justify-center gap-1.5 px-3 py-1.5 bg-[#E8622A]/10 hover:bg-[#E8622A] text-[#E8622A] hover:text-white rounded-xl text-xs font-bold border border-[#E8622A]/20 transition-all cursor-pointer shadow-sm active:scale-98"
        >
          <Plus className="w-4 h-4" /> Register Device
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {devices.map((dev) => {
          const isOnline = dev.status === 'ONLINE';
          const isConnecting = connectingId === dev.id;

          return (
            <div 
              key={dev.id}
              className={`glass-card p-6 flex flex-col justify-between shadow-lg shadow-[#E8622A]/5 bg-white dark:bg-[#23140c]/40 ${
                isOnline ? 'border-[#E8622A]/20 hover:border-[#E8622A]/50' : 'opacity-75 border-slate-200 dark:border-[#E8622A]/10'
              }`}
            >
              {/* Card Top */}
              <div>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3.5">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all ${
                      isOnline 
                        ? 'bg-gradient-to-tr from-[#E8622A] to-[#F59E0B] text-white shadow-md shadow-[#E8622A]/15' 
                        : 'bg-[#FDF8F4] dark:bg-[#180d07] border border-[#E8622A]/10 text-[#7C5C44]/40 dark:text-[#C4A992]/40'
                    }`}>
                      <Smartphone className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-extrabold text-[#2C1A0E] dark:text-[#FFF3EB] text-sm truncate max-w-[150px]">{dev.deviceName}</h3>
                      <p className="text-xs text-[#7C5C44] dark:text-[#C4A992] truncate max-w-[150px]">{dev.deviceModel || 'Android Device'}</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => onDelete(dev.id)}
                    className="text-[#7C5C44] hover:text-red-600 transition-colors p-1.5 rounded-lg hover:bg-[#FFF9F4] dark:hover:bg-[#301c11]"
                    title="Remove device"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                {/* Details */}
                <div className="mt-5 space-y-2.5 border-t border-[#E8622A]/10 dark:border-[#E8622A]/20 pt-4">
                  <div className="flex items-center gap-2 text-xs">
                    {isOnline ? (
                      <>
                        <span className="flex h-2 w-2 relative">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                        </span>
                        <span className="text-emerald-600 dark:text-emerald-400 font-bold">Online</span>
                      </>
                    ) : (
                      <>
                        <span className="inline-flex rounded-full h-2 w-2 bg-[#7C5C44]/40 dark:bg-[#C4A992]/40"></span>
                        <span className="text-[#7C5C44] dark:text-[#C4A992] font-semibold">Offline</span>
                      </>
                    )}
                  </div>

                  <div className="flex items-center justify-between text-xs text-[#7C5C44] dark:text-[#C4A992]">
                    <span>OS Version:</span>
                    <span className="font-mono text-[11px] text-[#2C1A0E] dark:text-[#FFF3EB]">{dev.osVersion || 'N/A'}</span>
                  </div>

                  <div className="flex items-center justify-between text-xs text-[#7C5C44] dark:text-[#C4A992]">
                    <span>Last Seen:</span>
                    <span className="text-[#2C1A0E] dark:text-[#FFF3EB]">{formatLastSeen(dev.lastSeen)}</span>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <button
                disabled={!isOnline || loading}
                onClick={() => onConnect(dev.id)}
                className={`mt-6 w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-bold transition-all shadow-md ${
                  isOnline 
                    ? 'bg-gradient-to-r from-[#E8622A] to-[#F59E0B] hover:from-[#D04F18] hover:to-[#D97706] text-white cursor-pointer active:scale-98 shadow-[#E8622A]/15' 
                    : 'bg-[#FDF8F4] dark:bg-[#23140c]/40 text-[#7C5C44]/55 dark:text-[#C4A992]/40 border border-[#E8622A]/10 cursor-not-allowed'
                }`}
              >
                {isConnecting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Linking...
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4 fill-current" />
                    Establish Connection
                  </>
                )}
              </button>
            </div>
          );
        })}

        {/* Add Device Card */}
        <div 
          onClick={onAddDevice}
          className="border-2 border-dashed border-[#E8622A]/25 hover:border-[#E8622A]/50 bg-white/40 hover:bg-[#FFF9F4]/70 dark:bg-[#23140c]/15 dark:hover:bg-[#301c11]/30 rounded-2xl p-6 flex flex-col items-center justify-center text-center cursor-pointer transition-all min-h-[260px] group shadow-sm"
        >
          <div className="w-12 h-12 rounded-full bg-[#FDF3EC] dark:bg-[#180d07] border border-[#E8622A]/15 flex items-center justify-center text-[#7C5C44] group-hover:text-[#E8622A] group-hover:border-[#E8622A]/35 transition-all mb-4">
            <Plus className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-[#2C1A0E] dark:text-[#FFF3EB] text-sm group-hover:text-[#E8622A] transition-colors">Register New Device</h3>
          <p className="text-xs text-[#7C5C44] dark:text-[#C4A992] mt-2 max-w-[200px] leading-relaxed">Instantly pair another phone using the Halo client app</p>
        </div>
      </div>
      
      {devices.length === 0 && (
        <div className="text-center py-12 bg-white/40 dark:bg-[#23140c]/25 border border-[#E8622A]/10 dark:border-[#E8622A]/20 rounded-2xl shadow-sm">
          <Smartphone className="w-8 h-8 text-[#7C5C44]/60 mx-auto mb-3 animate-bounce" />
          <h3 className="font-bold text-[#2C1A0E] dark:text-[#FFF3EB] text-sm">No Devices Available</h3>
          <p className="text-xs text-[#7C5C44] dark:text-[#C4A992] mt-1">Please download the Halo Android client and login to link a device</p>
          <a
            href="/halo-app.apk"
            download="halo-app.apk"
            className="inline-flex items-center gap-2 mt-3 px-4 py-2 bg-[#E8622A] hover:bg-[#D4531F] text-white text-xs font-semibold rounded-xl shadow-md transition-all"
          >
            <Download className="w-4 h-4" /> Download APK
          </a>
        </div>
      )}
    </div>
  );
}
