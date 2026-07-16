import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Smartphone, 
  Monitor, 
  ShieldCheck, 
  Zap, 
  FolderSync, 
  BellRing, 
  Video, 
  Download, 
  ArrowRight,
  Sparkles,
  Lock,
  RefreshCw,
  Sliders,
  Eye,
  HelpCircle,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Play,
  Volume2,
  Terminal,
  Folder,
  VolumeX,
  Wifi,
  Battery,
  Layers,
  Cpu,
  Globe
} from 'lucide-react';

export default function LandingPage() {
  // Simulator States
  const [simTab, setSimTab] = useState('screen'); // screen | files | notifications | controls
  const [isShaking, setIsShaking] = useState(false);
  const [clickRipples, setClickRipples] = useState([]);
  const [simNotifications, setSimNotifications] = useState([
    { id: 1, title: 'Messenger', body: 'Hey, are you free tonight?', time: 'Just now' },
    { id: 2, title: 'Halo System', body: 'Web console linked successfully', time: '2m ago' }
  ]);
  const [newNotifText, setNewNotifText] = useState('');
  const [mockFiles, setMockFiles] = useState([
    { name: 'DCIM', isDir: true },
    { name: 'Downloads', isDir: true },
    { name: 'Documents', isDir: true },
    { name: 'device_logs.txt', isDir: false, size: '14 KB' },
    { name: 'selfie_backup.jpg', isDir: false, size: '2.4 MB' }
  ]);

  // FAQ States
  const [faqOpen, setFaqOpen] = useState(null);

  // Audio FeedBack Synthesizer
  const playSound = (freq = 880, duration = 0.3, type = 'sine') => {
    try {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (!AudioContextClass) return;
      const ctx = new AudioContextClass();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      
      osc.type = type;
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      gain.gain.setValueAtTime(0.06, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
      
      osc.start();
      osc.stop(ctx.currentTime + duration);
    } catch (e) {
      // Autoplay blocker catch
    }
  };

  const triggerVibrate = () => {
    setIsShaking(true);
    playSound(180, 0.45, 'triangle');
    setTimeout(() => setIsShaking(false), 600);
  };

  const addSimNotification = () => {
    if (!newNotifText.trim()) return;
    setSimNotifications(prev => [
      {
        id: Date.now(),
        title: 'Simulator Alert',
        body: newNotifText,
        time: 'Just now'
      },
      ...prev
    ]);
    playSound(587.33, 0.15); // D5
    setTimeout(() => playSound(880, 0.25), 100); // A5
    setNewNotifText('');
  };

  const toggleFaq = (index) => {
    setFaqOpen(prev => (prev === index ? null : index));
    playSound(440, 0.1);
  };

  const faqs = [
    {
      q: 'Does Halo require my Android phone to be rooted?',
      a: 'No, Halo does not require root access. It utilizes Android\'s official Accessibility Services API and MediaProjection APIs to stream the screen and process touch event clicks.'
    },
    {
      q: 'How secure is the remote access connection?',
      a: 'All communications are established using secure WebSockets over HTTPS. The session relies on user authentication and session authorization tokens, making sure only you can access your screen.'
    },
    {
      q: 'Will the phone application drain my battery?',
      a: 'Halo is optimized to operate efficiently. When there is no active mirroring or camera session streaming, the background connection goes into a low-latency sleep state, drawing minimal power.'
    },
    {
      q: 'Can I manage files and photos when the screen is off?',
      a: 'Yes. Halo runs as an authorized background daemon. Commands such as browsing folders, viewing photos, or retrieving device specs operate successfully even when screen streaming is paused.'
    }
  ];

  function handleScreenClick(e) {
    if (!e.currentTarget) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width).toFixed(3);
    const y = ((e.clientY - rect.top) / rect.height).toFixed(3);
    
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;

    const newRipple = {
      id: Date.now(),
      x: clickX,
      y: clickY,
      valX: x,
      valY: y
    };
    
    setClickRipples(prev => [...prev, newRipple]);
    playSound(880, 0.2); // high feedback ping
    
    setTimeout(() => {
      setClickRipples(prev => prev.filter(r => r.id !== newRipple.id));
    }, 600);

    setSimNotifications(prev => [
      {
        id: Date.now(),
        title: 'Coordinates Dispatched',
        body: `ADB Click: x=${x}, y=${y}`,
        time: 'Just now'
      },
      ...prev
    ]);
  }

  return (
    <div className="relative min-h-screen bg-[#07070B] text-slate-100 overflow-hidden font-sans selection:bg-[#FF5511] selection:text-white">
      {/* Inject custom CSS keyframes */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes ripple-effect {
          0% { transform: translate(-50%, -50%) scale(0); opacity: 0.9; }
          100% { transform: translate(-50%, -50%) scale(4.5); opacity: 0; }
        }
        .click-ripple {
          position: absolute;
          border: 2px solid #FF5511;
          border-radius: 50%;
          width: 16px;
          height: 16px;
          animation: ripple-effect 0.6s cubic-bezier(0.1, 0.8, 0.3, 1) forwards;
          pointer-events: none;
          box-shadow: 0 0 10px #FF5511, inset 0 0 5px #FF5511;
        }
        @keyframes moving-grid {
          0% { background-position: 0 0; }
          100% { background-position: 24px 24px; }
        }
        .animated-grid {
          background-image: radial-gradient(rgba(255, 85, 17, 0.08) 1px, transparent 1px);
          background-size: 24px 24px;
          animation: moving-grid 35s linear infinite;
        }
        .glow-sphere {
          position: absolute;
          border-radius: 50%;
          filter: blur(140px);
          opacity: 0.15;
          pointer-events: none;
          z-index: 0;
          mix-blend-mode: screen;
        }
      `}} />

      {/* Background decoration elements */}
      <div className="absolute inset-0 animated-grid opacity-80" />
      <div className="glow-sphere w-[600px] h-[600px] bg-[#FF5511] top-[-200px] left-[-150px] animate-pulse" style={{ animationDuration: '8s' }} />
      <div className="glow-sphere w-[700px] h-[700px] bg-[#8B5CF6] bottom-[-200px] right-[-150px] animate-pulse" style={{ animationDuration: '12s' }} />
      <div className="glow-sphere w-[400px] h-[400px] bg-[#FF2A6D] top-[40%] left-[60%] animate-pulse" style={{ animationDuration: '10s' }} />

      {/* Header / Navbar */}
      <header className="relative z-50 border-b border-white/[0.06] bg-black/40 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-tr from-[#FF5511] to-[#8B5CF6] rounded-xl blur-md opacity-75 group-hover:opacity-100 transition-opacity" />
              <div className="relative w-11 h-11 bg-[#0A0B10] border border-white/10 rounded-xl flex items-center justify-center shadow-lg">
                <Smartphone className="w-5.5 h-5.5 text-[#FF5511]" />
              </div>
            </div>
            <div>
              <span className="font-extrabold text-2xl tracking-tight bg-gradient-to-r from-white via-slate-100 to-slate-400 bg-clip-text text-transparent">HALO</span>
              <span className="text-[9px] block font-bold text-[#FF5511] tracking-[0.25em] font-mono leading-none">LINK SYSTEM</span>
            </div>
          </div>

          <nav className="flex items-center gap-8">
            <a href="#features" className="hidden md:inline text-xs font-semibold text-slate-400 hover:text-white transition-colors">Features</a>
            <a href="#simulator" className="hidden md:inline text-xs font-semibold text-slate-400 hover:text-white transition-colors">Playground</a>
            <a href="#security" className="hidden md:inline text-xs font-semibold text-slate-400 hover:text-white transition-colors">Security</a>
            <a href="#faq" className="hidden md:inline text-xs font-semibold text-slate-400 hover:text-white transition-colors">FAQ</a>
            <span className="h-5 w-px bg-white/10 hidden md:block" />
            <Link 
              to="/login"
              className="text-xs font-bold text-slate-300 hover:text-white transition-colors"
            >
              Sign In
            </Link>
            <Link 
              to="/register"
              className="relative group overflow-hidden px-5 py-2.5 bg-white text-black font-extrabold rounded-xl text-xs shadow-lg shadow-white/5 transition-all hover:scale-[1.03] cursor-pointer"
            >
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-[#FF5511] to-[#8B5CF6] opacity-0 group-hover:opacity-100 transition-opacity" />
              <span className="relative group-hover:text-white transition-colors">Console Login</span>
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 pt-20 pb-24 md:pt-28 md:pb-36">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          {/* Hero Content */}
          <div className="lg:col-span-7 space-y-8 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/[0.03] border border-white/[0.08] rounded-full text-xs font-semibold text-[#FF5511] shadow-inner">
              <Sparkles className="w-3.5 h-3.5 text-[#FF5511] animate-spin" style={{ animationDuration: '4s' }} />
              Next-Gen Remote Control Platform
            </div>
            
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-black text-white tracking-tight leading-[1.05] font-display">
              Stream & Control <br />
              <span className="bg-gradient-to-r from-[#FF5511] via-[#FF2A6D] to-[#8B5CF6] bg-clip-text text-transparent drop-shadow-sm">
                Your Phone from Web
              </span>
            </h1>
            
            <p className="text-sm sm:text-md text-slate-400 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              Halo connects your web browser directly to your phone. Browse files, mirror the display with interactive touch coordinates, inspect active notifications, and trigger system diagnostic utilities instantly.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
              <Link
                to="/register"
                className="w-full sm:w-auto relative group overflow-hidden flex items-center justify-center gap-2.5 px-7 py-4 bg-gradient-to-r from-[#FF5511] to-[#FF2A6D] hover:from-[#e04400] hover:to-[#e61d5c] text-white rounded-2xl text-xs font-black shadow-xl shadow-orange-500/10 transition-all hover:scale-[1.02] cursor-pointer"
              >
                Access Web Console <ArrowRight className="w-4.5 h-4.5" />
              </Link>
              <a
                href="#simulator"
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-7 py-4 bg-white/[0.03] hover:bg-white/[0.06] text-white rounded-2xl text-xs font-bold border border-white/[0.08] shadow-sm transition-all cursor-pointer"
              >
                Try Live Simulator
              </a>
            </div>

            {/* Quick Stats Strip */}
            <div className="grid grid-cols-3 gap-6 pt-10 max-w-lg mx-auto lg:mx-0 border-t border-white/[0.06]">
              <div>
                <p className="text-2xl font-black text-white">~1.2ms</p>
                <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider mt-1">Socket Latency</p>
              </div>
              <div>
                <p className="text-2xl font-black text-white">E2EE</p>
                <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider mt-1">Encrypted Tunnel</p>
              </div>
              <div>
                <p className="text-2xl font-black text-white">100%</p>
                <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider mt-1">Open Source Core</p>
              </div>
            </div>
          </div>

          {/* Hero Visual Mockup */}
          <div className="lg:col-span-5 flex justify-center relative">
            {/* Glowing aura */}
            <div className="absolute inset-0 bg-gradient-to-tr from-[#FF5511]/20 to-[#8B5CF6]/20 rounded-full filter blur-3xl opacity-70 scale-90" />

            {/* Simulated Desktop Screen with Phone Mirror */}
            <div className="relative w-full max-w-[370px] bg-[#0E0F16]/90 border border-white/[0.08] rounded-3xl p-5 shadow-2xl shadow-black/80 animate-float">
              {/* Desktop Header */}
              <div className="flex items-center justify-between border-b border-white/[0.06] pb-3.5 mb-4 text-[10px] text-slate-400 font-mono">
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  Remote Web Socket: CONNECTED
                </span>
                <span className="text-[9px] px-2 py-0.5 bg-white/5 rounded border border-white/5">Port 5000</span>
              </div>
              
              {/* Phone Mirror Frame */}
              <div className="aspect-[9/16] bg-[#07070B] rounded-2xl overflow-hidden relative border border-white/[0.08] flex flex-col justify-between p-4 shadow-inner">
                {/* Dynamic Status Bar */}
                <div className="w-full flex justify-between items-center text-[9px] text-slate-400 font-bold">
                  <span>10:20 AM</span>
                  <div className="flex items-center gap-1.5">
                    <Wifi className="w-3 h-3 text-[#FF5511]" />
                    <Battery className="w-3.5 h-3.5 text-[#FF5511]" />
                  </div>
                </div>

                {/* Floating graphic */}
                <div className="flex flex-col items-center gap-3 text-center p-4">
                  <div className="relative group">
                    <div className="absolute inset-0 bg-[#FF5511]/30 rounded-2xl blur-lg animate-pulse" />
                    <div className="relative w-12 h-12 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center justify-center text-[#FF5511]">
                      <Monitor className="w-6 h-6" />
                    </div>
                  </div>
                  <h4 className="text-xs font-bold text-white tracking-wide">Live Stream Terminal</h4>
                  <p className="text-[9.5px] text-slate-400 max-w-[170px] leading-relaxed">
                    Interactive click signals mapped directly to the local daemon service.
                  </p>
                </div>

                {/* Simulated Logs Panel */}
                <div className="w-full bg-black/60 rounded-xl p-2.5 border border-white/5 font-mono text-[8px] text-slate-500 leading-tight">
                  <p className="text-[#FF5511]">system@halo:~$ start stream</p>
                  <p>rx: video stream 60fps</p>
                  <p>tx: waiting for event</p>
                </div>

                {/* Home indicator bar */}
                <div className="w-20 h-1 bg-white/20 rounded-full mx-auto mt-2" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Dynamic Interactive Simulator Sandbox */}
      <section id="simulator" className="relative z-10 py-24 bg-black/40 border-y border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#8B5CF6]/10 border border-[#8B5CF6]/20 rounded-full text-[10px] font-bold text-[#8B5CF6] uppercase tracking-wider">
              Interactive Sandbox
            </div>
            <h2 className="text-4xl font-black text-white tracking-tight font-display">Try Halo Link Live</h2>
            <p className="text-sm text-slate-400">
              Experience the instant responsiveness. Click the tabs, insert data, and test the virtual terminal.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
            {/* Control Sidebar */}
            <div className="lg:col-span-5 flex flex-col justify-between bg-[#0E0F16]/80 border border-white/[0.08] backdrop-blur-xl p-8 rounded-3xl shadow-xl">
              <div>
                <h3 className="font-extrabold text-white text-lg mb-6 flex items-center gap-2.5">
                  <Sliders className="w-5 h-5 text-[#FF5511]" /> Control Dashboard
                </h3>
                
                {/* Custom Sandbox Tabs selection */}
                <div className="flex flex-col gap-3">
                  <button 
                    onClick={() => { setSimTab('screen'); playSound(500, 0.1); }}
                    className={`flex items-center justify-between p-4 rounded-2xl border text-left text-xs font-bold transition-all cursor-pointer ${
                      simTab === 'screen' 
                        ? 'bg-gradient-to-r from-[#FF5511]/15 to-[#FF2A6D]/15 border-[#FF5511]/40 text-white shadow-lg shadow-orange-500/[0.03]' 
                        : 'bg-white/[0.02] border-white/[0.06] text-slate-400 hover:border-white/10 hover:bg-white/[0.04]'
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#FF5511]" />
                      1. Mirror Screen stream
                    </span>
                    <Monitor className="w-4.5 h-4.5" />
                  </button>

                  <button 
                    onClick={() => { setSimTab('files'); playSound(600, 0.1); }}
                    className={`flex items-center justify-between p-4 rounded-2xl border text-left text-xs font-bold transition-all cursor-pointer ${
                      simTab === 'files' 
                        ? 'bg-gradient-to-r from-[#FF5511]/15 to-[#FF2A6D]/15 border-[#FF5511]/40 text-white shadow-lg shadow-orange-500/[0.03]' 
                        : 'bg-white/[0.02] border-white/[0.06] text-slate-400 hover:border-white/10 hover:bg-white/[0.04]'
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#FF2A6D]" />
                      2. Remote File Explorer
                    </span>
                    <FolderSync className="w-4.5 h-4.5" />
                  </button>

                  <button 
                    onClick={() => { setSimTab('notifications'); playSound(700, 0.1); }}
                    className={`flex items-center justify-between p-4 rounded-2xl border text-left text-xs font-bold transition-all cursor-pointer ${
                      simTab === 'notifications' 
                        ? 'bg-gradient-to-r from-[#FF5511]/15 to-[#FF2A6D]/15 border-[#FF5511]/40 text-white shadow-lg shadow-orange-500/[0.03]' 
                        : 'bg-white/[0.02] border-white/[0.06] text-slate-400 hover:border-white/10 hover:bg-white/[0.04]'
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#8B5CF6]" />
                      3. Notification Feed
                    </span>
                    <BellRing className="w-4.5 h-4.5" />
                  </button>

                  <button 
                    onClick={() => { setSimTab('controls'); playSound(800, 0.1); }}
                    className={`flex items-center justify-between p-4 rounded-2xl border text-left text-xs font-bold transition-all cursor-pointer ${
                      simTab === 'controls' 
                        ? 'bg-gradient-to-r from-[#FF5511]/15 to-[#FF2A6D]/15 border-[#FF5511]/40 text-white shadow-lg shadow-orange-500/[0.03]' 
                        : 'bg-white/[0.02] border-white/[0.06] text-slate-400 hover:border-white/10 hover:bg-white/[0.04]'
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                      4. Hardware triggers
                    </span>
                    <Zap className="w-4.5 h-4.5" />
                  </button>
                </div>
              </div>

              {/* Dynamic Actions Based on selected Tab */}
              <div className="mt-8 pt-6 border-t border-white/[0.06]">
                {simTab === 'screen' && (
                  <div className="space-y-4">
                    <p className="text-xs text-slate-400 leading-relaxed">
                      <strong>Virtual Pointer:</strong> Tap anywhere inside the phone screen mockup on the right. Instantly maps clicks with precise scaling matrices.
                    </p>
                    <div className="p-4 bg-black/60 border border-white/[0.06] rounded-xl font-mono text-[10px] text-slate-400 space-y-1">
                      <div className="flex items-center gap-1 text-[#FF5511]">
                        <Terminal className="w-3.5 h-3.5" />
                        <span>daemon@halo:~$ listening...</span>
                      </div>
                      <div className="text-[9px] text-slate-500">Waiting for pointer click event payload.</div>
                    </div>
                  </div>
                )}

                {simTab === 'files' && (
                  <div className="space-y-4">
                    <p className="text-xs text-slate-400">Push a simulated file to check the file structures render:</p>
                    <div className="flex gap-2">
                      <input 
                        type="text" 
                        placeholder="e.g. holiday_video.mp4"
                        id="sim-file-input"
                        className="flex-1 bg-black/40 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#FF5511] transition-colors"
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            const val = e.currentTarget.value;
                            if (val.trim()) {
                              setMockFiles(prev => [...prev, { name: val, isDir: false, size: '1.8 MB' }]);
                              playSound(1000, 0.15);
                              e.currentTarget.value = '';
                            }
                          }
                        }}
                      />
                      <button 
                        onClick={() => {
                          const input = document.getElementById('sim-file-input');
                          if (input && input.value.trim()) {
                            setMockFiles(prev => [...prev, { name: input.value, isDir: false, size: '1.8 MB' }]);
                            playSound(1000, 0.15);
                            input.value = '';
                          }
                        }}
                        className="px-4 py-2.5 bg-[#FF5511] hover:bg-[#e04400] text-white rounded-xl text-xs font-bold cursor-pointer transition-colors shadow-md shadow-orange-500/10"
                      >
                        Create
                      </button>
                    </div>
                  </div>
                )}

                {simTab === 'notifications' && (
                  <div className="space-y-4">
                    <p className="text-xs text-slate-400">Dispatch a custom notification payload to the device:</p>
                    <div className="flex gap-2">
                      <input 
                        type="text" 
                        value={newNotifText}
                        onChange={(e) => setNewNotifText(e.target.value)}
                        placeholder="Message body..."
                        className="flex-1 bg-black/40 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#FF5511] transition-colors"
                        onKeyDown={(e) => e.key === 'Enter' && addSimNotification()}
                      />
                      <button 
                        onClick={addSimNotification}
                        className="px-4 py-2.5 bg-[#FF5511] hover:bg-[#e04400] text-white rounded-xl text-xs font-bold cursor-pointer transition-colors shadow-md shadow-orange-500/10"
                      >
                        Send
                      </button>
                    </div>
                  </div>
                )}

                {simTab === 'controls' && (
                  <div className="space-y-4">
                    <p className="text-xs text-slate-400">Trigger standard hardware events on the remote phone actuator:</p>
                    <button 
                      onClick={triggerVibrate}
                      className="w-full flex items-center justify-center gap-2 py-3 bg-[#FF5511] hover:bg-[#e04400] text-white rounded-2xl text-xs font-extrabold cursor-pointer shadow-lg shadow-orange-500/10 hover:shadow-orange-500/20 transition-all hover:scale-[1.01]"
                    >
                      <Volume2 className="w-4 h-4" /> Vibrate Actuator (0.45s Pulse)
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Interactive Phone Viewport */}
            <div className="lg:col-span-7 flex flex-col items-center justify-center">
              {/* Realistic Premium Smartphone Frame */}
              <div 
                className={`relative w-full max-w-[340px] aspect-[9/18.5] bg-[#0E0F16] border-[8px] border-slate-800 rounded-[50px] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)] p-3.5 flex flex-col justify-between transition-all duration-300 ${
                  isShaking ? 'animate-bounce translate-x-2 border-orange-600/60' : ''
                }`}
                style={{
                  boxShadow: isShaking ? '0 0 50px rgba(255, 85, 17, 0.45), 0 25px 60px -15px rgba(0,0,0,0.9)' : ''
                }}
              >
                {/* Premium Camera Notch / Dynamic Island */}
                <div className="w-28 h-5.5 bg-black absolute top-2.5 left-1/2 -translate-x-1/2 rounded-full z-30 flex items-center justify-center border border-white/5">
                  <div className="w-3.5 h-3.5 bg-slate-900 rounded-full border border-slate-950 mr-4 flex items-center justify-center">
                    <div className="w-1.5 h-1.5 bg-blue-950 rounded-full" />
                  </div>
                  <div className="w-8 h-1 bg-slate-900 rounded-full" />
                </div>

                {/* Phone screen internal viewport */}
                <div className="flex-1 bg-[#050508] rounded-[36px] overflow-hidden relative border border-white/[0.06] flex flex-col mt-4">
                  {/* Status Bar */}
                  <div className="w-full flex justify-between items-center px-6 py-2.5 text-[10px] font-bold text-slate-400 border-b border-white/[0.04] bg-black/40">
                    <span>10:21 AM</span>
                    <span className="flex items-center gap-1.5">
                      {isShaking && <span className="text-[#FF5511] text-[9px] animate-ping mr-1">📳 VIB</span>}
                      <Wifi className="w-3 h-3 text-[#FF5511]" />
                      <span className="text-[9px]">96%</span>
                    </span>
                  </div>

                  {/* Simulator display area */}
                  <div className="flex-1 overflow-y-auto p-4.5 flex flex-col relative select-none">
                    {/* Screen Ripple effects overlay */}
                    {clickRipples.map((ripple) => (
                      <div 
                        key={ripple.id}
                        className="click-ripple"
                        style={{ left: ripple.x, top: ripple.y }}
                      />
                    ))}

                    {simTab === 'screen' && (
                      <div 
                        className="flex-grow flex flex-col items-center justify-center text-center gap-4 cursor-crosshair rounded-[24px] hover:bg-white/[0.01] transition-colors relative"
                        onClick={handleScreenClick}
                      >
                        {/* Display ripples coordinates overlay */}
                        {clickRipples.map((ripple) => (
                          <div 
                            key={`txt-${ripple.id}`} 
                            className="absolute font-mono text-[9px] text-[#FF5511] font-bold bg-[#0A0B10] px-2 py-0.5 rounded border border-white/10 animate-fade-in"
                            style={{ left: ripple.x - 45, top: ripple.y - 28 }}
                          >
                            X:{ripple.valX} Y:{ripple.valY}
                          </div>
                        ))}

                        <div className="relative group">
                          <div className="absolute inset-0 bg-[#FF5511]/25 rounded-full blur-md animate-pulse" />
                          <div className="relative w-12 h-12 rounded-full bg-white/[0.03] border border-white/10 flex items-center justify-center text-[#FF5511]">
                            <Play className="w-4.5 h-4.5" />
                          </div>
                        </div>
                        <div className="space-y-1">
                          <h4 className="text-xs font-bold text-white tracking-wide">Touch Mirror Active</h4>
                          <p className="text-[9.5px] text-slate-500 max-w-[190px] mx-auto leading-relaxed">
                            Click anywhere inside this viewport screen. Coordinates will register dynamically.
                          </p>
                        </div>
                      </div>
                    )}

                    {simTab === 'files' && (
                      <div className="space-y-3.5 flex-1">
                        <div className="flex items-center gap-1.5 pb-2 border-b border-white/[0.06]">
                          <Folder className="w-4 h-4 text-[#FF5511]" />
                          <span className="text-[10px] font-mono text-slate-400">storage/emulated/0</span>
                        </div>
                        <div className="grid grid-cols-2 gap-2.5">
                          {mockFiles.map((file, idx) => (
                            <div 
                              key={idx} 
                              onClick={() => playSound(650, 0.1)}
                              className="p-3 bg-white/[0.02] border border-white/[0.06] rounded-xl flex flex-col justify-between aspect-square text-left hover:border-white/15 hover:bg-white/[0.04] transition-all cursor-pointer"
                            >
                              <span className="text-lg">
                                {file.isDir ? '📁' : '📄'}
                              </span>
                              <div className="min-w-0">
                                <p className="text-[10px] font-bold text-slate-200 truncate">{file.name}</p>
                                <p className="text-[8px] text-slate-500 mt-0.5 font-mono">{file.isDir ? 'Folder' : file.size}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {simTab === 'notifications' && (
                      <div className="space-y-2.5 flex-1">
                        <div className="flex items-center justify-between pb-2 border-b border-white/[0.06] mb-3">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Push Feed Drawer</span>
                        </div>
                        {simNotifications.map(n => (
                          <div 
                            key={n.id}
                            className="p-3 bg-white/[0.02] border border-white/[0.04] rounded-xl flex items-start gap-2.5 text-left shadow-md hover:border-white/[0.08]"
                          >
                            <span className="text-xs pt-0.5">🔔</span>
                            <div className="min-w-0 flex-1">
                              <p className="text-[10.5px] font-extrabold text-slate-200">{n.title}</p>
                              <p className="text-[10px] text-slate-400 mt-0.5 leading-snug">{n.body}</p>
                              <p className="text-[8px] text-slate-500 mt-1 font-mono">{n.time}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {simTab === 'controls' && (
                      <div className="flex-grow flex flex-col items-center justify-center text-center gap-3">
                        <div className="relative">
                          <div className="absolute inset-0 bg-amber-500/20 rounded-full blur-md animate-ping" />
                          <div className="relative w-14 h-14 rounded-full bg-white/[0.03] border border-white/10 flex items-center justify-center text-amber-500">
                            <Zap className="w-7 h-7" />
                          </div>
                        </div>
                        <div className="space-y-1">
                          <h4 className="text-xs font-bold text-white tracking-wide">Actuators Connected</h4>
                          <p className="text-[9.5px] text-slate-500 max-w-[180px] mx-auto leading-relaxed">
                            Telemetry listening on port 5000 socket room. Haptics operational.
                          </p>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Navigation virtual keys */}
                  <div className="w-full flex justify-around border-t border-white/[0.04] py-2 text-slate-400 bg-[#0E0F16]">
                    <ChevronDown className="w-4 h-4 rotate-90 opacity-70 hover:opacity-100 cursor-pointer" onClick={() => playSound(400, 0.1)} />
                    <span className="w-3.5 h-3.5 rounded-full border border-slate-500 hover:border-white transition-colors cursor-pointer" onClick={() => playSound(380, 0.1)} />
                    <span className="w-3.5 h-3.5 border border-slate-500 rounded-sm hover:border-white transition-colors cursor-pointer" onClick={() => playSound(420, 0.1)} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature capabilities detailed list */}
      <section id="features" className="relative z-10 py-28 bg-[#090A0F] border-b border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
            <h2 className="text-4xl font-black text-white tracking-tight font-display">Halo Link Core Capabilities</h2>
            <p className="text-sm text-slate-400 max-w-xl mx-auto leading-relaxed">
              Complete diagnostic oversight and control without physical wires, command prompts, or root permissions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-[#0E0F16]/50 border border-white/[0.06] p-7 rounded-3xl hover:border-[#FF5511]/30 transition-all hover:-translate-y-1 shadow-md flex gap-5 group">
              <div className="w-12 h-12 rounded-2xl bg-[#FF5511]/10 border border-[#FF5511]/20 flex items-center justify-center text-[#FF5511] shrink-0 group-hover:scale-105 transition-transform">
                <Monitor className="w-5.5 h-5.5" />
              </div>
              <div className="space-y-2">
                <h3 className="font-bold text-white text-base">Low-Latency Mirror</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Stream high fidelity viewport mirroring over secure transport links. Scale touch actions dynamically.
                </p>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="bg-[#0E0F16]/50 border border-white/[0.06] p-7 rounded-3xl hover:border-[#FF2A6D]/30 transition-all hover:-translate-y-1 shadow-md flex gap-5 group">
              <div className="w-12 h-12 rounded-2xl bg-[#FF2A6D]/10 border border-[#FF2A6D]/20 flex items-center justify-center text-[#FF2A6D] shrink-0 group-hover:scale-105 transition-transform">
                <FolderSync className="w-5.5 h-5.5" />
              </div>
              <div className="space-y-2">
                <h3 className="font-bold text-white text-base">Desktop File Explorer</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Navigate folder hierarchies, download image caches, and manage user directories directly from browser.
                </p>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="bg-[#0E0F16]/50 border border-white/[0.06] p-7 rounded-3xl hover:border-[#8B5CF6]/30 transition-all hover:-translate-y-1 shadow-md flex gap-5 group">
              <div className="w-12 h-12 rounded-2xl bg-[#8B5CF6]/10 border border-[#8B5CF6]/20 flex items-center justify-center text-[#8B5CF6] shrink-0 group-hover:scale-105 transition-transform">
                <BellRing className="w-5.5 h-5.5" />
              </div>
              <div className="space-y-2">
                <h3 className="font-bold text-white text-base">Real-Time Sync Logs</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Automatically forward notification payloads from standard alerts (SMS, Slack, system alarms) on click.
                </p>
              </div>
            </div>

            {/* Feature 4 */}
            <div className="bg-[#0E0F16]/50 border border-white/[0.06] p-7 rounded-3xl hover:border-amber-500/30 transition-all hover:-translate-y-1 shadow-md flex gap-5 group">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-500 shrink-0 group-hover:scale-105 transition-transform">
                <Sliders className="w-5.5 h-5.5" />
              </div>
              <div className="space-y-2">
                <h3 className="font-bold text-white text-base">Diagnostic Telemetry</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Sync battery, processor memory space, network signal parameters, and device specs dynamically.
                </p>
              </div>
            </div>

            {/* Feature 5 */}
            <div className="bg-[#0E0F16]/50 border border-white/[0.06] p-7 rounded-3xl hover:border-emerald-500/30 transition-all hover:-translate-y-1 shadow-md flex gap-5 group">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-500 shrink-0 group-hover:scale-105 transition-transform">
                <Video className="w-5.5 h-5.5" />
              </div>
              <div className="space-y-2">
                <h3 className="font-bold text-white text-base">Remote Camera Capture</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Trigger back or front camera frame captures. View high-quality images directly on the dashboard.
                </p>
              </div>
            </div>

            {/* Feature 6 */}
            <div className="bg-[#0E0F16]/50 border border-white/[0.06] p-7 rounded-3xl hover:border-[#FF5511]/30 transition-all hover:-translate-y-1 shadow-md flex gap-5 group">
              <div className="w-12 h-12 rounded-2xl bg-[#FF5511]/10 border border-[#FF5511]/20 flex items-center justify-center text-[#FF5511] shrink-0 group-hover:scale-105 transition-transform">
                <Zap className="w-5.5 h-5.5" />
              </div>
              <div className="space-y-2">
                <h3 className="font-bold text-white text-base">System Operations</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Trigger alarm vibes, simulate power keys, reboot phone, or clear cached partitions remotely.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Security Protocol */}
      <section id="security" className="relative z-10 py-24 bg-[#08090E]/60 border-b border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-xs font-bold text-emerald-500">
                <ShieldCheck className="w-4 h-4" /> SECURE CONTROL PROTOCOL
              </div>
              <h2 className="text-4xl font-black text-white tracking-tight font-display">Secured at every level</h2>
              <p className="text-sm text-slate-400 leading-relaxed">
                Halo has been designed from the ground up to prevent unauthorized remote operations. It is not a spyware background tool. It operates exclusively when authorized by the user.
              </p>
              
              <div className="space-y-4">
                <div className="flex gap-3.5 items-start">
                  <div className="w-5 h-5 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-500 shrink-0 mt-0.5">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <span className="text-xs text-slate-400">
                    <strong>Token Handshake:</strong> Web consoles require unique pairing authorization tokens to communicate with the phone socket room.
                  </span>
                </div>
                <div className="flex gap-3.5 items-start">
                  <div className="w-5 h-5 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-500 shrink-0 mt-0.5">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <span className="text-xs text-slate-400">
                    <strong>Permission Guard:</strong> Sensitive permissions (Accessibility, MediaProjection) require explicit user approval.
                  </span>
                </div>
                <div className="flex gap-3.5 items-start">
                  <div className="w-5 h-5 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-500 shrink-0 mt-0.5">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <span className="text-xs text-slate-400">
                    <strong>Secure Channel:</strong> All mirroring and files transmission packages are securely encrypted over WebSockets.
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-[#0E0F16]/80 border border-white/[0.08] rounded-3xl p-8 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 blur-3xl" />
              <div className="flex items-center gap-3 border-b border-white/[0.06] pb-5 mb-5">
                <Lock className="w-6 h-6 text-emerald-500" />
                <h4 className="font-bold text-white text-md">System Permission Checks</h4>
              </div>
              <div className="space-y-4 font-mono">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-400">Accessibility Service</span>
                  <span className="px-2.5 py-0.5 bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 rounded font-bold text-[9px] tracking-wide">AUTHORIZED</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-400">Display Overlay Right</span>
                  <span className="px-2.5 py-0.5 bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 rounded font-bold text-[9px] tracking-wide">AUTHORIZED</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-400">Media Screen Projection</span>
                  <span className="px-2.5 py-0.5 bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 rounded font-bold text-[9px] tracking-wide">ACTIVE</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-400">Background Optimization</span>
                  <span className="px-2.5 py-0.5 bg-amber-500/10 border border-amber-500/20 text-amber-500 rounded font-bold text-[9px] tracking-wide">EXEMPTED</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How it Works / Connection flow */}
      <section className="relative z-10 py-24 max-w-7xl mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <h2 className="text-4xl font-black text-white tracking-tight font-display">How To Connect</h2>
          <p className="text-sm text-slate-400">
            Linking your Android phone to the console panel takes less than a minute.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 relative">
          {/* Connector line (desktop only) */}
          <div className="hidden md:block absolute top-14 left-1/4 right-1/4 h-[1px] bg-white/5 z-0" />

          {/* Step 1 */}
          <div className="relative z-10 flex flex-col items-center text-center p-8 bg-[#0E0F16]/50 border border-white/[0.06] rounded-3xl">
            <div className="w-12 h-12 rounded-full bg-[#FF5511]/10 border border-[#FF5511]/20 flex items-center justify-center text-[#FF5511] font-mono font-black text-sm mb-5 shadow-inner">
              01
            </div>
            <h3 className="font-bold text-white text-base">Download Companion APK</h3>
            <p className="text-xs text-slate-400 mt-2.5 leading-relaxed">
              Install the companion Halo app on your target Android device.
            </p>
          </div>

          {/* Step 2 */}
          <div className="relative z-10 flex flex-col items-center text-center p-8 bg-[#0E0F16]/50 border border-white/[0.06] rounded-3xl">
            <div className="w-12 h-12 rounded-full bg-[#FF2A6D]/10 border border-[#FF2A6D]/20 flex items-center justify-center text-[#FF2A6D] font-mono font-black text-sm mb-5 shadow-inner">
              02
            </div>
            <h3 className="font-bold text-white text-base">Login with Credentials</h3>
            <p className="text-xs text-slate-400 mt-2.5 leading-relaxed">
              Open the phone app and sign in with the email matching your console.
            </p>
          </div>

          {/* Step 3 */}
          <div className="relative z-10 flex flex-col items-center text-center p-8 bg-[#0E0F16]/50 border border-white/[0.06] rounded-3xl">
            <div className="w-12 h-12 rounded-full bg-[#8B5CF6]/10 border border-[#8B5CF6]/20 flex items-center justify-center text-[#8B5CF6] font-mono font-black text-sm mb-5 shadow-inner">
              03
            </div>
            <h3 className="font-bold text-white text-base">Synchronize & Control</h3>
            <p className="text-xs text-slate-400 mt-2.5 leading-relaxed">
              Choose the phone from your active selection menu and establish the mirroring channel.
            </p>
          </div>
        </div>
      </section>

      {/* Accordion FAQ Section */}
      <section id="faq" className="relative z-10 py-24 bg-black/40 border-t border-white/[0.06]">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-16 space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#FF2A6D]/10 border border-[#FF2A6D]/20 rounded-full text-[10px] font-bold text-[#FF2A6D] uppercase tracking-wider font-mono">
              FAQ CENTRAL
            </div>
            <h2 className="text-4xl font-black text-white tracking-tight font-display">Frequently Asked Questions</h2>
            <p className="text-sm text-slate-400">
              Everything you need to know about the remote control mechanism.
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => {
              const isOpen = faqOpen === idx;
              return (
                <div 
                  key={idx}
                  className="bg-[#0E0F16]/60 border border-white/[0.06] rounded-2xl overflow-hidden transition-all duration-300"
                >
                  <button
                    onClick={() => toggleFaq(idx)}
                    className="w-full flex items-center justify-between p-5 text-left font-bold text-sm text-white hover:bg-white/[0.02] transition-colors cursor-pointer"
                  >
                    <span>{faq.q}</span>
                    {isOpen ? <ChevronUp className="w-4.5 h-4.5 text-[#FF5511]" /> : <ChevronDown className="w-4.5 h-4.5 text-slate-400" />}
                  </button>
                  
                  {isOpen && (
                    <div className="p-5 pt-0 border-t border-white/[0.04] bg-black/20 text-xs text-slate-400 leading-relaxed animate-scale-up">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Download CTA Callout Banner */}
      <section className="relative z-10 py-20 max-w-6xl mx-auto px-6">
        <div className="relative rounded-[36px] p-10 md:p-16 overflow-hidden bg-[#0F101A] border border-white/[0.08] text-white shadow-2xl">
          {/* Animated decorative grid */}
          <div className="absolute inset-0 bg-[#FF5511]/[0.02] animated-grid pointer-events-none" />
          <div className="absolute top-[-50px] right-[-50px] w-64 h-64 bg-[#FF5511]/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-[-50px] left-[-50px] w-64 h-64 bg-[#8B5CF6]/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="relative z-10 max-w-3xl space-y-6">
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight leading-none font-display bg-gradient-to-r from-white via-slate-100 to-slate-300 bg-clip-text text-transparent">
              Download Companion APK
            </h2>
            <p className="text-sm text-slate-400 leading-relaxed">
              Install the companion application files on your phone to register it. It runs transparently alongside standard services, providing high-quality control overlays.
            </p>
            <div className="flex flex-wrap gap-4 pt-3">
              <button 
                onClick={() => {
                  playSound(800, 0.15);
                  setTimeout(() => playSound(1000, 0.25), 100);
                  alert('Download will begin shortly. Install the APK and authorize Accessibility Services.');
                }}
                className="flex items-center gap-2 px-6 py-3.5 bg-gradient-to-r from-[#FF5511] to-[#FF2A6D] hover:from-[#e04400] hover:to-[#e61d5c] text-white rounded-xl text-xs font-black shadow-lg shadow-orange-500/10 transition-all hover:scale-[1.02] cursor-pointer"
              >
                <Download className="w-4 h-4 fill-white/10" /> Download Companion APK (v1.0.0)
              </button>
              <Link 
                to="/register"
                className="flex items-center gap-1.5 px-6 py-3.5 bg-white/[0.03] hover:bg-white/[0.06] border border-white/10 text-white rounded-xl text-xs font-bold transition-all cursor-pointer"
              >
                Open Dashboard <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/[0.06] bg-black/60 py-10 text-center text-xs text-slate-500 font-mono">
        <p>© {new Date().getFullYear()} Halo Link. Built for ultimate remote administration.</p>
      </footer>
    </div>
  );
}
