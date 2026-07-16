import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useHaloSocket from '../hooks/useHaloSocket';
import DeviceSelection from '../components/DeviceSelection';
import DeviceControlPanel from '../components/DeviceControlPanel';
import DiagnosticConsole from '../components/DiagnosticConsole';
import FileExplorer from '../components/FileExplorer';
import NotificationsViewer from '../components/NotificationsViewer';
import AppLauncher from '../components/AppLauncher';
import { Smartphone, LogOut, Download, Sparkles, RefreshCw, X } from 'lucide-react';

export default function Dashboard() {
  const navigate = useNavigate();
  const socketData = useHaloSocket();
  const {
    socket,
    devices,
    selectedDevice,
    session,
    screenFrame,
    cameraFrame,
    isCameraStreaming,
    isScreenMirroring,
    files,
    currentPath,
    setCurrentPath,
    notifications,
    systemStats,
    installedApps,
    loading,
    connectingDeviceId,
    logs,
    fetchDevices,
    deleteDevice,
    connectToDevice,
    disconnect,
    sendCommand,
  } = socketData;

  const [showFiles, setShowFiles] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showApps, setShowApps] = useState(false);
  const [showAddInstruction, setShowAddInstruction] = useState(false);
  const [previewMedia, setPreviewMedia] = useState(null);

  // Auth Protection
  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (!token) {
      navigate('/login');
    } else {
      fetchDevices();
    }
  }, [navigate, fetchDevices]);

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('user');
    disconnect();
    navigate('/login');
  };

  const handleOpenFiles = () => {
    sendCommand('GET_FILES', { path: null });
    setCurrentPath('Storage');
    setShowFiles(true);
  };

  const handleNavigateFiles = (path) => {
    sendCommand('GET_FILES', { path });
    setCurrentPath(path);
  };

  const handlePreviewFile = (file) => {
    sendCommand('VIEW_FILE', { path: file.path });
    setPreviewMedia({ name: file.name, path: file.path });
  };

  const handleOpenApps = () => {
    sendCommand('GET_INSTALLED_APPS');
    setShowApps(true);
  };

  const handleLaunchApp = (packageName, appName) => {
    sendCommand('OPEN_APP', { packageName });
  };

  const handleRefreshApps = () => {
    sendCommand('GET_INSTALLED_APPS');
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-[#FDF3EC] via-[#FEF9F0] to-[#FDF5EE] dark:from-[#180d07] dark:via-[#23140c] dark:to-[#1f1109] text-[#2C1A0E] dark:text-[#FFF3EB] flex flex-col transition-colors duration-300">
      {/* Background decoration spots */}
      <div className="glow-spot w-[400px] h-[400px] bg-[#E8622A]/5 top-[-100px] right-[-100px] pointer-events-none" />
      <div className="glow-spot w-[500px] h-[500px] bg-[#F59E0B]/5 bottom-[-150px] left-[-100px] pointer-events-none" />

      {/* Navbar Header */}
      <header className="relative z-10 border-b border-[#E8622A]/10 bg-white/40 dark:bg-[#180d07]/40 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-gradient-to-tr from-[#E8622A] to-[#F59E0B] rounded-xl flex items-center justify-center shadow-md shadow-[#E8622A]/10">
              <Smartphone className="w-4 h-4 text-white animate-pulse" />
            </div>
            <div>
              <span className="font-extrabold text-md tracking-tight text-[#2C1A0E] dark:text-white">HALO PANEL</span>
              <span className="text-[9px] block font-bold text-[#E8622A] dark:text-[#F59E0B] tracking-[0.15em] font-mono leading-none">CONSOLE</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button 
              onClick={fetchDevices}
              className="p-2 bg-white/80 dark:bg-[#23140c]/80 hover:bg-[#FFF9F4] dark:hover:bg-[#301c11]/80 border border-[#E8622A]/15 dark:border-[#E8622A]/25 rounded-xl text-[#7C5C44] hover:text-[#E8622A] dark:text-[#C4A992] dark:hover:text-[#E8622A] transition-all cursor-pointer"
              title="Refresh Devices"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
            <button 
              onClick={handleLogout}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-rose-600/10 hover:bg-rose-600 text-rose-600 hover:text-white dark:text-rose-400 dark:hover:text-white rounded-xl text-xs font-bold transition-all border border-rose-500/10 cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" /> <span className="hidden sm:inline">Sign Out</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Console Workspace */}
      <main className="flex-1 relative z-10 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8 flex flex-col gap-6">
        {!session ? (
          /* Selection View */
          <DeviceSelection
            devices={devices}
            onConnect={connectToDevice}
            onDelete={deleteDevice}
            loading={loading}
            connectingId={connectingDeviceId}
            onAddDevice={() => setShowAddInstruction(true)}
          />
        ) : (
          /* Session Workspace */
          <div className="flex-grow flex flex-col gap-6">
            {/* Control Viewport */}
            <DeviceControlPanel
              socket={socket}
              session={session}
              device={selectedDevice}
              screenFrame={screenFrame}
              cameraFrame={cameraFrame}
              systemStats={systemStats}
              isScreenMirroring={isScreenMirroring}
              isCameraStreaming={isCameraStreaming}
              onSendCommand={sendCommand}
              onDisconnect={disconnect}
              onOpenFiles={handleOpenFiles}
              onOpenNotifications={() => setShowNotifications(true)}
              onOpenApps={handleOpenApps}
            />

            {/* Diagnostic Terminal */}
            <DiagnosticConsole
              logs={logs}
              onClear={() => {}}
            />
          </div>
        )}
      </main>

      {/* MODALS */}

      {/* File Explorer Modal */}
      {showFiles && (
        <FileExplorer
          files={files}
          currentPath={currentPath}
          onNavigate={handleNavigateFiles}
          onPreviewFile={handlePreviewFile}
          onClose={() => setShowFiles(false)}
        />
      )}

      {/* Notifications Viewer Modal */}
      {showNotifications && (
        <NotificationsViewer
          notifications={notifications}
          onClear={() => {}}
          onClose={() => setShowNotifications(false)}
        />
      )}

      {/* App Launcher Modal */}
      {showApps && (
        <AppLauncher
          apps={installedApps}
          onLaunchApp={handleLaunchApp}
          onRefresh={handleRefreshApps}
          onClose={() => setShowApps(false)}
        />
      )}

      {/* Photo Preview Overlay */}
      {previewMedia && cameraFrame && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
          <div className="bg-white dark:bg-[#23140c] border border-[#E8622A]/15 dark:border-[#E8622A]/30 rounded-3xl p-5 w-full max-w-md shadow-2xl relative">
            <button 
              onClick={() => { setPreviewMedia(null); }}
              className="absolute top-4 right-4 p-1.5 bg-[#FDF8F4] dark:bg-[#180d07] hover:bg-[#FFF9F4] dark:hover:bg-[#301c11] text-[#7C5C44] hover:text-[#E8622A] dark:text-[#C4A992] dark:hover:text-white rounded-lg transition-colors cursor-pointer border border-[#E8622A]/10"
            >
              <X className="w-4 h-4" />
            </button>
            <h3 className="text-sm font-bold text-[#2C1A0E] dark:text-[#FFF3EB] truncate pr-8 mb-4">{previewMedia.name}</h3>
            <div className="aspect-square bg-slate-950 rounded-2xl overflow-hidden mb-4 border border-[#E8622A]/10">
              <img src={cameraFrame} className="w-full h-full object-contain" alt="Media Preview" />
            </div>
            <div className="flex justify-end gap-3 text-xs">
              <a 
                href={cameraFrame} 
                download={previewMedia.name}
                className="flex items-center gap-1 px-4 py-2 bg-gradient-to-r from-[#E8622A] to-[#F59E0B] hover:from-[#D04F18] hover:to-[#D97706] text-white font-bold rounded-xl transition-all shadow-md shadow-[#E8622A]/20 cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" /> Save File
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Instructions Guide Modal */}
      {showAddInstruction && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white dark:bg-[#23140c] border border-[#E8622A]/15 dark:border-[#E8622A]/30 rounded-3xl p-6 w-full max-w-md shadow-2xl space-y-5 text-[#2C1A0E] dark:text-[#FFF3EB]">
            <div className="flex items-center justify-between border-b border-[#E8622A]/10 dark:border-[#E8622A]/20 pb-3">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-[#E8622A]" />
                <h3 className="font-extrabold text-md">Register Android Device</h3>
              </div>
              <button 
                onClick={() => setShowAddInstruction(false)}
                className="p-1 hover:bg-[#FFF9F4] dark:hover:bg-[#301c11] text-[#7C5C44] hover:text-[#E8622A] dark:text-[#C4A992] dark:hover:text-white rounded-lg transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            
            <div className="space-y-4 text-xs leading-relaxed">
              <div className="flex gap-3 items-start">
                <span className="w-6 h-6 rounded-full bg-[#FDF3EC] dark:bg-[#180d07] border border-[#E8622A]/20 flex items-center justify-center font-bold text-[10px] text-[#E8622A] shrink-0">1</span>
                <div>
                  <p className="font-bold">Download the Client App</p>
                  <p className="text-[#7C5C44] dark:text-[#C4A992] mt-1">Download and install the Halo application file on your Android phone.</p>
                </div>
              </div>

              <div className="flex gap-3 items-start">
                <span className="w-6 h-6 rounded-full bg-[#FEF9F0] dark:bg-[#180d07] border border-[#F59E0B]/20 flex items-center justify-center font-bold text-[10px] text-[#F59E0B] shrink-0">2</span>
                <div>
                  <p className="font-bold">Authenticate Account</p>
                  <p className="text-[#7C5C44] dark:text-[#C4A992] mt-1">Open the app and log in with your email address credentials matching this console account.</p>
                </div>
              </div>

              <div className="flex gap-3 items-start">
                <span className="w-6 h-6 rounded-full bg-[#FDF8F4] dark:bg-[#180d07] border border-[#E8622A]/20 flex items-center justify-center font-bold text-[10px] text-emerald-500 shrink-0">3</span>
                <div>
                  <p className="font-bold">Allow System Permissions</p>
                  <p className="text-[#7C5C44] dark:text-[#C4A992] mt-1">Grant Accessibility, Overlay, and storage rights in Android settings to establish connection channels.</p>
                </div>
              </div>
            </div>

            <button 
              onClick={() => setShowAddInstruction(false)}
              className="w-full py-2.5 bg-gradient-to-r from-[#E8622A] to-[#F59E0B] hover:from-[#D04F18] hover:to-[#D97706] text-white rounded-xl text-xs font-bold transition-all cursor-pointer shadow-md shadow-[#E8622A]/15"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
