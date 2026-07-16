import React from 'react';
import { Bell, BellOff, Trash2, X } from 'lucide-react';

export default function NotificationsViewer({ notifications, onClear, onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-lg h-[60vh] flex flex-col bg-white dark:bg-[#23140c] border border-[#E8622A]/15 dark:border-[#E8622A]/30 rounded-3xl overflow-hidden shadow-2xl text-[#2C1A0E] dark:text-[#FFF3EB]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-[#FDF8F4] dark:bg-[#180d07] border-b border-[#E8622A]/10 dark:border-[#E8622A]/20">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-[#E8622A]/10 rounded-lg">
              <Bell className="w-5 h-5 text-[#E8622A] animate-swing" />
            </div>
            <div>
              <h2 className="text-md font-bold text-[#2C1A0E] dark:text-white">Device Notifications</h2>
              <p className="text-xs text-[#7C5C44] dark:text-[#C4A992]">Real-time system notification stream</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {notifications.length > 0 && (
              <button 
                onClick={onClear}
                className="p-1.5 hover:bg-rose-500/10 hover:text-rose-600 rounded-lg text-[#7C5C44] transition-all cursor-pointer"
                title="Clear all"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}
            <button 
              onClick={onClose}
              className="p-1.5 hover:bg-[#FFF9F4] dark:hover:bg-[#301c11] rounded-lg text-[#7C5C44] hover:text-[#E8622A] transition-all cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* List Content */}
        <div className="flex-1 p-6 overflow-y-auto bg-white/30 dark:bg-[#180d07]/10 space-y-4">
          {notifications.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-[#7C5C44]/60 py-12">
              <BellOff className="w-12 h-12 text-[#7C5C44]/35 mb-3" />
              <p className="text-sm font-bold text-[#2C1A0E] dark:text-white">No notification logs recorded</p>
              <p className="text-xs text-[#7C5C44] dark:text-[#C4A992] mt-1 text-center max-w-[240px]">Make sure notification listener permission is active on phone</p>
            </div>
          ) : (
            notifications.map((notif) => (
              <div 
                key={notif.id}
                className="p-4 bg-white dark:bg-[#180d07]/40 border border-[#E8622A]/10 dark:border-[#E8622A]/20 rounded-2xl flex items-start gap-3 hover:border-[#E8622A]/35 dark:hover:border-[#E8622A]/45 transition-all shadow-sm"
              >
                <div className="p-2 bg-[#E8622A]/10 rounded-lg text-[#E8622A] shrink-0">
                  <Bell className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-bold text-[#2C1A0E] dark:text-[#FFF3EB] truncate">System Alert</p>
                  <p className="text-xs text-[#7C5C44] dark:text-[#C4A992] mt-1 leading-relaxed break-words">{notif.text}</p>
                  <p className="text-[10px] text-[#7C5C44]/65 dark:text-[#C4A992]/60 mt-2 font-mono">{notif.time}</p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
