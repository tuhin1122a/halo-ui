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
  Folder
} from 'lucide-react';

export default function LandingPage() {
  // Simulator States
  const [simTab, setSimTab] = useState('screen'); // screen | files | notifications | controls
  const [isShaking, setIsShaking] = useState(false);
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

  const triggerVibrate = () => {
    setIsShaking(true);
    setTimeout(() => setIsShaking(false), 800);
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
    setNewNotifText('');
  };

  const toggleFaq = (index) => {
    setFaqOpen(prev => (prev === index ? null : index));
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

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-[#FDF3EC] via-[#FEF9F0] to-[#FDF5EE] overflow-hidden text-[#2C1A0E] selection:bg-[#E8622A] selection:text-white font-sans">
      {/* Background decoration spots */}
      <div className="glow-spot w-[500px] h-[500px] bg-[#E8622A]/5 top-[-100px] left-[-100px]" />
      <div className="glow-spot w-[600px] h-[600px] bg-[#F59E0B]/5 bottom-[-150px] right-[-100px]" />

      {/* Header / Navbar */}
      <header className="relative z-10 border-b border-[#E8622A]/10 bg-white/40 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 h-18 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-tr from-[#E8622A] to-[#F59E0B] rounded-xl flex items-center justify-center shadow-lg shadow-[#E8622A]/20">
              <Smartphone className="w-5 h-5 text-white animate-pulse" />
            </div>
            <div>
              <span className="font-extrabold text-xl tracking-tight bg-gradient-to-r from-[#2C1A0E] to-[#7C5C44] bg-clip-text text-transparent">HALO</span>
              <span className="text-[10px] block font-bold text-[#E8622A] tracking-[0.2em] font-mono leading-none">LINK</span>
            </div>
          </div>

          <nav className="flex items-center gap-6">
            <a href="#features" className="hidden md:inline text-xs font-bold text-[#7C5C44] hover:text-[#E8622A] transition-colors">Features</a>
            <a href="#simulator" className="hidden md:inline text-xs font-bold text-[#7C5C44] hover:text-[#E8622A] transition-colors">Playground</a>
            <a href="#security" className="hidden md:inline text-xs font-bold text-[#7C5C44] hover:text-[#E8622A] transition-colors">Security</a>
            <a href="#faq" className="hidden md:inline text-xs font-bold text-[#7C5C44] hover:text-[#E8622A] transition-colors">FAQ</a>
            <span className="h-4 w-px bg-[#E8622A]/20 hidden md:block" />
            <Link 
              to="/login"
              className="text-xs font-bold text-[#7C5C44] hover:text-[#E8622A] transition-colors"
            >
              Sign In
            </Link>
            <Link 
              to="/register"
              className="px-4 py-2 bg-gradient-to-r from-[#E8622A] to-[#F59E0B] hover:from-[#D04F18] hover:to-[#D97706] text-white rounded-xl text-xs font-bold shadow-lg shadow-[#E8622A]/15 transition-all hover:scale-[1.02] cursor-pointer"
            >
              Console Login
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Hero Content */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#E8622A]/10 rounded-full border border-[#E8622A]/20 text-xs font-bold text-[#E8622A]">
              <Sparkles className="w-3.5 h-3.5 text-[#E8622A] animate-spin-slow" /> Remote Access Suite
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-[#2C1A0E] tracking-tight leading-[1.05] font-display">
              Stream, Manage & Control <br />
              <span className="bg-gradient-to-r from-[#E8622A] via-[#E8622A] to-[#F59E0B] bg-clip-text text-transparent">Your Phone From Web</span>
            </h1>
            <p className="text-sm sm:text-md text-[#7C5C44] max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Halo connects your web browser directly to your phone. Browse files, mirror the display with interactive touch coordinates, inspect active notifications, and trigger system diagnostic utilities instantly.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
              <Link
                to="/register"
                className="w-full sm:w-auto flex items-center justify-center gap-2.5 px-6 py-3.5 bg-gradient-to-r from-[#E8622A] to-[#F59E0B] hover:from-[#D04F18] hover:to-[#D97706] text-white rounded-2xl text-xs font-black shadow-xl shadow-[#E8622A]/20 transition-all hover:scale-[1.02] cursor-pointer"
              >
                Access Web Console <ArrowRight className="w-4.5 h-4.5" />
              </Link>
              <a
                href="#simulator"
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3.5 bg-white hover:bg-[#FFFBF9] text-[#7C5C44] rounded-2xl text-xs font-bold border border-[#E8622A]/15 shadow-sm transition-all cursor-pointer"
              >
                Try Live Simulator
              </a>
            </div>
          </div>

          {/* Hero Visual Mockup */}
          <div className="lg:col-span-5 flex justify-center relative">
            <div className="absolute inset-0 bg-gradient-to-tr from-[#E8622A]/15 to-[#F59E0B]/15 rounded-full filter blur-3xl opacity-60 scale-90 animate-pulse-glow" />

            {/* Simulated Desktop Screen with Phone Mirror */}
            <div className="relative w-full max-w-[360px] bg-white border border-[#E8622A]/12 rounded-3xl p-4 shadow-2xl shadow-[#E8622A]/10 animate-float">
              <div className="flex items-center justify-between border-b border-[#E8622A]/10 pb-2.5 mb-3 text-[10px] text-[#7C5C44] font-mono">
                <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" /> Connection Established</span>
                <span>Port: 3000</span>
              </div>
              
              <div className="aspect-[9/16] bg-[#FDF8F4] rounded-2xl overflow-hidden relative border border-[#E8622A]/10 flex flex-col items-center justify-between p-4">
                {/* Simulated Phone Top */}
                <div className="w-full flex justify-between items-center text-[9px] text-[#7C5C44] font-bold">
                  <span>10:20 AM</span>
                  <div className="flex gap-1">
                    <span className="px-1.5 py-0.5 bg-[#E8622A]/15 rounded text-[8px] text-[#E8622A]">LTE</span>
                    <span>84%</span>
                  </div>
                </div>

                <div className="flex flex-col items-center gap-2 text-center p-4">
                  <div className="w-11 h-11 rounded-xl bg-[#E8622A]/10 flex items-center justify-center text-[#E8622A] animate-bounce">
                    <Monitor className="w-5 h-5" />
                  </div>
                  <h4 className="text-xs font-extrabold text-[#2C1A0E]">Live Mirroring Active</h4>
                  <p className="text-[9px] text-[#7C5C44] max-w-[160px] leading-relaxed">Click coordinates are scaled and processed by background service.</p>
                </div>

                {/* Bottom Navigation Mock */}
                <div className="w-full flex justify-around border-t border-[#E8622A]/10 pt-2 text-[#7C5C44]">
                  <ChevronDown className="w-4 h-4 rotate-90" />
                  <span className="w-2.5 h-2.5 rounded-full border-2 border-current" />
                  <span className="w-2.5 h-2.5 border-2 border-current rounded-sm" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Dynamic Simulator Interactive Section */}
      <section id="simulator" className="relative z-10 py-16 bg-white/20 border-t border-[#E8622A]/10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-[#F59E0B]/10 rounded-full border border-[#F59E0B]/20 text-[10px] font-bold text-[#F59E0B] uppercase">Interactive Sandbox</div>
            <h2 className="text-3xl font-black text-[#2C1A0E] tracking-tight font-display mt-2">Try Halo Right Now</h2>
            <p className="text-xs text-[#7C5C44] mt-2">Test how the dashboard reacts. Interact with the tabs and controls to simulate real-time operations.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Control Sidebar */}
            <div className="lg:col-span-5 flex flex-col justify-between glass-card p-6 border-[#E8622A]/10 bg-white">
              <div>
                <h3 className="font-extrabold text-[#2C1A0E] text-md mb-4 flex items-center gap-2">
                  <Sliders className="w-4 h-4 text-[#E8622A]" /> Simulator Controls
                </h3>
                
                {/* Tabs selection */}
                <div className="flex flex-col gap-2">
                  <button 
                    onClick={() => setSimTab('screen')}
                    className={`flex items-center justify-between p-3 rounded-xl border text-left text-xs font-bold transition-all cursor-pointer ${
                      simTab === 'screen' ? 'bg-[#E8622A]/10 border-[#E8622A]/30 text-[#E8622A]' : 'bg-[#FDF8F4] border-slate-200 text-[#7C5C44] hover:bg-[#FFFBF9]'
                    }`}
                  >
                    <span>1. Mirror Screen stream</span>
                    <Monitor className="w-4 h-4" />
                  </button>

                  <button 
                    onClick={() => setSimTab('files')}
                    className={`flex items-center justify-between p-3 rounded-xl border text-left text-xs font-bold transition-all cursor-pointer ${
                      simTab === 'files' ? 'bg-[#E8622A]/10 border-[#E8622A]/30 text-[#E8622A]' : 'bg-[#FDF8F4] border-slate-200 text-[#7C5C44] hover:bg-[#FFFBF9]'
                    }`}
                  >
                    <span>2. Remote File Explorer</span>
                    <FolderSync className="w-4 h-4" />
                  </button>

                  <button 
                    onClick={() => setSimTab('notifications')}
                    className={`flex items-center justify-between p-3 rounded-xl border text-left text-xs font-bold transition-all cursor-pointer ${
                      simTab === 'notifications' ? 'bg-[#E8622A]/10 border-[#E8622A]/30 text-[#E8622A]' : 'bg-[#FDF8F4] border-slate-200 text-[#7C5C44] hover:bg-[#FFFBF9]'
                    }`}
                  >
                    <span>3. Inbound Notification Feed</span>
                    <BellRing className="w-4 h-4" />
                  </button>

                  <button 
                    onClick={() => setSimTab('controls')}
                    className={`flex items-center justify-between p-3 rounded-xl border text-left text-xs font-bold transition-all cursor-pointer ${
                      simTab === 'controls' ? 'bg-[#E8622A]/10 border-[#E8622A]/30 text-[#E8622A]' : 'bg-[#FDF8F4] border-slate-200 text-[#7C5C44] hover:bg-[#FFFBF9]'
                    }`}
                  >
                    <span>4. Hardware triggers</span>
                    <Zap className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Dynamic Actions based on selected Tab */}
              <div className="mt-8 pt-4 border-t border-slate-100">
                {simTab === 'screen' && (
                  <div className="space-y-3">
                    <p className="text-[11px] text-[#7C5C44] leading-relaxed">
                      <strong>Simulator Mode:</strong> Click anywhere on the mobile mirror to the right. A click coordinate packet will be generated in the log.
                    </p>
                    <div className="p-3 bg-[#FDF8F4] border border-[#E8622A]/10 rounded-xl font-mono text-[10px] text-[#E8622A]">
                      system@halo:~$ listening for touch...
                    </div>
                  </div>
                )}

                {simTab === 'files' && (
                  <div className="space-y-3">
                    <p className="text-[11px] text-[#7C5C44]">Add a simulated file to check file explorer rendering:</p>
                    <div className="flex gap-2">
                      <input 
                        type="text" 
                        placeholder="new_file.png"
                        id="sim-file-input"
                        className="flex-1 bg-[#FDF8F4] border border-slate-200 rounded-lg px-3 py-1.5 text-xs focus:outline-none focus:border-[#E8622A]"
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            const val = e.currentTarget.value;
                            if (val.trim()) {
                              setMockFiles(prev => [...prev, { name: val, isDir: false, size: '400 KB' }]);
                              e.currentTarget.value = '';
                            }
                          }
                        }}
                      />
                      <button 
                        onClick={() => {
                          const input = document.getElementById('sim-file-input');
                          if (input && input.value.trim()) {
                            setMockFiles(prev => [...prev, { name: input.value, isDir: false, size: '400 KB' }]);
                            input.value = '';
                          }
                        }}
                        className="px-3 py-1.5 bg-[#E8622A] hover:bg-[#D04F18] text-white rounded-lg text-xs font-bold cursor-pointer"
                      >
                        Add
                      </button>
                    </div>
                  </div>
                )}

                {simTab === 'notifications' && (
                  <div className="space-y-3">
                    <p className="text-[11px] text-[#7C5C44]">Simulate a phone push alert. Type a message and push it to device notification drawer:</p>
                    <div className="flex gap-2">
                      <input 
                        type="text" 
                        value={newNotifText}
                        onChange={(e) => setNewNotifText(e.target.value)}
                        placeholder="Type alert body..."
                        className="flex-1 bg-[#FDF8F4] border border-slate-200 rounded-lg px-3 py-1.5 text-xs focus:outline-none focus:border-[#E8622A]"
                        onKeyDown={(e) => e.key === 'Enter' && addSimNotification()}
                      />
                      <button 
                        onClick={addSimNotification}
                        className="px-3 py-1.5 bg-[#E8622A] hover:bg-[#D04F18] text-white rounded-lg text-xs font-bold cursor-pointer"
                      >
                        Push
                      </button>
                    </div>
                  </div>
                )}

                {simTab === 'controls' && (
                  <div className="space-y-3">
                    <p className="text-[11px] text-[#7C5C44]">Send hardware event instructions to trigger the phone\'s physical actuators:</p>
                    <button 
                      onClick={triggerVibrate}
                      className="w-full flex items-center justify-center gap-1.5 py-2 bg-[#E8622A] hover:bg-[#D04F18] text-white rounded-xl text-xs font-bold cursor-pointer shadow-md shadow-[#E8622A]/10"
                    >
                      <Volume2 className="w-4 h-4" /> Vibrate Phone (Actuator Test)
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Interactive Phone viewport */}
            <div className="lg:col-span-7 flex flex-col items-center justify-center">
              <div 
                className={`relative w-full max-w-[320px] aspect-[9/16] bg-white border-[3px] border-[#E8622A]/15 rounded-[40px] shadow-2xl p-3 flex flex-col justify-between transition-all duration-300 ${
                  isShaking ? 'animate-bounce translate-x-1.5' : ''
                }`}
                style={{
                  boxShadow: isShaking ? '0 0 40px rgba(232, 98, 42, 0.4)' : ''
                }}
              >
                {/* Speaker top */}
                <div className="w-24 h-5 bg-slate-800 absolute top-0 left-1/2 -translate-x-1/2 rounded-b-xl z-20 flex items-center justify-center">
                  <div className="w-8 h-1 bg-slate-900 rounded-full" />
                </div>

                {/* Device Internal Viewport Screen */}
                <div className="flex-1 bg-[#FDF8F4] rounded-[32px] overflow-hidden relative border border-[#E8622A]/10 flex flex-col">
                  {/* Status Bar */}
                  <div className="w-full flex justify-between items-center px-5 py-2 text-[9px] font-bold text-[#7C5C44] border-b border-[#E8622A]/5">
                    <span>10:21 AM</span>
                    <span className="flex items-center gap-1">
                      {isShaking && <span className="text-red-500 animate-ping">📳</span>}
                      <span>96%</span>
                    </span>
                  </div>

                  {/* Dynamic simulator content screen */}
                  <div className="flex-1 overflow-y-auto p-4 flex flex-col">
                    {simTab === 'screen' && (
                      <div className="flex-1 flex flex-col items-center justify-center text-center gap-2 select-none" onClick={handleScreenClick}>
                        <div className="w-10 h-10 rounded-full bg-[#E8622A]/15 flex items-center justify-center text-[#E8622A]">
                          <Play className="w-4 h-4" />
                        </div>
                        <h4 className="text-[11px] font-extrabold text-[#2C1A0E]">Click coordinates detector active</h4>
                        <p className="text-[9px] text-[#7C5C44] max-w-[180px] leading-relaxed">Click inside this viewport. Simulator records coordinates.</p>
                      </div>
                    )}

                    {simTab === 'files' && (
                      <div className="space-y-2 flex-1">
                        <div className="flex items-center gap-1 pb-1.5 border-b border-[#E8622A]/10">
                          <Folder className="w-3.5 h-3.5 text-[#E8622A]" />
                          <span className="text-[9px] font-mono text-[#7C5C44]">Storage /</span>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          {mockFiles.map((file, idx) => (
                            <div 
                              key={idx} 
                              className="p-2 bg-white border border-[#E8622A]/10 rounded-lg flex flex-col justify-between aspect-square text-left hover:border-[#E8622A]/35 cursor-pointer"
                            >
                              <span className="text-[12px]">
                                {file.isDir ? '📁' : '📄'}
                              </span>
                              <div className="min-w-0">
                                <p className="text-[9px] font-bold text-[#2C1A0E] truncate">{file.name}</p>
                                <p className="text-[8px] text-[#7C5C44] mt-0.5">{file.isDir ? 'Folder' : file.size}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {simTab === 'notifications' && (
                      <div className="space-y-2 flex-1">
                        <div className="flex items-center justify-between pb-1.5 border-b border-[#E8622A]/10 mb-2">
                          <span className="text-[9px] font-bold uppercase tracking-wider text-[#7C5C44]">Notification Center</span>
                        </div>
                        {simNotifications.map(n => (
                          <div 
                            key={n.id}
                            className="p-2.5 bg-white border border-[#E8622A]/10 rounded-xl flex items-start gap-2 text-left shadow-sm"
                          >
                            <span className="text-xs">🔔</span>
                            <div className="min-w-0 flex-1">
                              <p className="text-[9px] font-extrabold text-[#2C1A0E]">{n.title}</p>
                              <p className="text-[9px] text-[#7C5C44] mt-0.5 leading-tight">{n.body}</p>
                              <p className="text-[7px] text-slate-400 mt-1 font-mono">{n.time}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {simTab === 'controls' && (
                      <div className="flex-grow flex flex-col items-center justify-center text-center gap-2 select-none">
                        <div className="w-12 h-12 rounded-full bg-slate-900/10 border border-[#E8622A]/10 flex items-center justify-center text-[#E8622A]">
                          <Zap className="w-6 h-6 animate-pulse" />
                        </div>
                        <h4 className="text-[11px] font-extrabold text-[#2C1A0E]">Diagnostic actuator listener online</h4>
                        <p className="text-[9px] text-[#7C5C44] max-w-[165px]">Phone is listening to incoming command socket.</p>
                      </div>
                    )}
                  </div>

                  {/* Navigation virtual keys */}
                  <div className="w-full flex justify-around border-t border-[#E8622A]/10 py-1.5 text-[#7C5C44] bg-white">
                    <ChevronDown className="w-4 h-4 rotate-90" />
                    <span className="w-2.5 h-2.5 rounded-full border-2 border-current" />
                    <span className="w-2.5 h-2.5 border-2 border-current rounded-sm" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* In-depth features detailed list */}
      <section id="features" className="relative z-10 py-20 bg-white/40 border-t border-[#E8622A]/10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-black text-[#2C1A0E] tracking-tight font-display">Halo App Capabilities</h2>
            <p className="text-xs text-[#7C5C44] mt-3">Full control without any cables, tethering or complicated commands</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Feature 1 */}
            <div className="bg-white border border-[#E8622A]/10 p-6 rounded-2xl shadow-sm hover:shadow-md hover:border-[#E8622A]/30 transition-all flex gap-4">
              <div className="w-10 h-10 rounded-xl bg-[#E8622A]/10 flex items-center justify-center text-[#E8622A] shrink-0">
                <Monitor className="w-5 h-5" />
              </div>
              <div className="space-y-1.5">
                <h3 className="font-bold text-[#2C1A0E] text-sm">Low-Latency Mirror</h3>
                <p className="text-xs text-[#7C5C44] leading-relaxed">
                  Stream high fidelity viewport mirroring over secure transport links. Scale touch actions dynamically.
                </p>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="bg-white border border-[#E8622A]/10 p-6 rounded-2xl shadow-sm hover:shadow-md hover:border-[#E8622A]/30 transition-all flex gap-4">
              <div className="w-10 h-10 rounded-xl bg-[#F59E0B]/10 flex items-center justify-center text-[#F59E0B] shrink-0">
                <FolderSync className="w-5 h-5" />
              </div>
              <div className="space-y-1.5">
                <h3 className="font-bold text-[#2C1A0E] text-sm">Desktop File Explorer</h3>
                <p className="text-xs text-[#7C5C44] leading-relaxed">
                  Navigate folder hierarchies, download image caches, and manage user directories directly from browser.
                </p>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="bg-white border border-[#E8622A]/10 p-6 rounded-2xl shadow-sm hover:shadow-md hover:border-[#E8622A]/30 transition-all flex gap-4">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-600 shrink-0">
                <BellRing className="w-5 h-5" />
              </div>
              <div className="space-y-1.5">
                <h3 className="font-bold text-[#2C1A0E] text-sm">Real-Time Sync Logs</h3>
                <p className="text-xs text-[#7C5C44] leading-relaxed">
                  Automatically forward notification payloads from standard alerts (SMS, Slack, system alarms) on click.
                </p>
              </div>
            </div>

            {/* Feature 4 */}
            <div className="bg-white border border-[#E8622A]/10 p-6 rounded-2xl shadow-sm hover:shadow-md hover:border-[#E8622A]/30 transition-all flex gap-4">
              <div className="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center text-purple-600 shrink-0">
                <Sliders className="w-5 h-5" />
              </div>
              <div className="space-y-1.5">
                <h3 className="font-bold text-[#2C1A0E] text-sm">Diagnostic Telemetry</h3>
                <p className="text-xs text-[#7C5C44] leading-relaxed">
                  Sync battery, processor memory space, network signal parameters, and device specs dynamically.
                </p>
              </div>
            </div>

            {/* Feature 5 */}
            <div className="bg-white border border-[#E8622A]/10 p-6 rounded-2xl shadow-sm hover:shadow-md hover:border-[#E8622A]/30 transition-all flex gap-4">
              <div className="w-10 h-10 rounded-xl bg-pink-100 flex items-center justify-center text-pink-600 shrink-0">
                <Video className="w-5 h-5" />
              </div>
              <div className="space-y-1.5">
                <h3 className="font-bold text-[#2C1A0E] text-sm">Remote Camera Capture</h3>
                <p className="text-xs text-[#7C5C44] leading-relaxed">
                  Trigger back or front camera frame captures. View high-quality images directly on the dashboard.
                </p>
              </div>
            </div>

            {/* Feature 6 */}
            <div className="bg-white border border-[#E8622A]/10 p-6 rounded-2xl shadow-sm hover:shadow-md hover:border-[#E8622A]/30 transition-all flex gap-4">
              <div className="w-10 h-10 rounded-xl bg-rose-100 flex items-center justify-center text-rose-600 shrink-0">
                <Zap className="w-5 h-5" />
              </div>
              <div className="space-y-1.5">
                <h3 className="font-bold text-[#2C1A0E] text-sm">System Operations</h3>
                <p className="text-xs text-[#7C5C44] leading-relaxed">
                  Trigger alarm vibes, simulate power keys, reboot phone, or clear cached partitions remotely.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Security Suite */}
      <section id="security" className="relative z-10 py-16 bg-[#FFFBF9]/80 border-t border-[#E8622A]/10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-5">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-500/10 rounded-full border border-emerald-500/20 text-xs font-bold text-emerald-600">
                <ShieldCheck className="w-4 h-4" /> SECURE CONTROL PROTOCOL
              </div>
              <h2 className="text-3xl font-black text-[#2C1A0E] tracking-tight font-display">Secured at every stage</h2>
              <p className="text-sm text-[#7C5C44] leading-relaxed">
                Halo has been designed from the ground up to prevent unauthorized remote operations. It is not a spyware background tool. It operates exclusively when authorized by the user.
              </p>
              <div className="space-y-3">
                <div className="flex gap-2 items-start">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
                  <span className="text-xs text-[#7C5C44]"><strong>Token Handshake:</strong> Web consoles require unique pairing authorization tokens to communicate with the phone socket room.</span>
                </div>
                <div className="flex gap-2 items-start">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
                  <span className="text-xs text-[#7C5C44]"><strong>Permission Guard:</strong> Sensitive permissions (Accessibility, MediaProjection) require explicit user approval.</span>
                </div>
                <div className="flex gap-2 items-start">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
                  <span className="text-xs text-[#7C5C44]"><strong>Secure Channel:</strong> All mirroring and files transmission packages are securely encrypted over WebSockets.</span>
                </div>
              </div>
            </div>

            <div className="bg-white border border-[#E8622A]/10 rounded-3xl p-6 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/5 blur-2xl" />
              <div className="flex items-center gap-3 border-b border-slate-100 pb-4 mb-4">
                <Lock className="w-6 h-6 text-emerald-500" />
                <h4 className="font-bold text-[#2C1A0E] text-sm">System Permission Check</h4>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-[#7C5C44]">Accessibility Service</span>
                  <span className="px-2 py-0.5 bg-emerald-100 text-emerald-600 rounded font-bold text-[10px]">AUTHORIZED</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-[#7C5C44]">Display Overlay Right</span>
                  <span className="px-2 py-0.5 bg-emerald-100 text-emerald-600 rounded font-bold text-[10px]">AUTHORIZED</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-[#7C5C44]">Media Screen Projection</span>
                  <span className="px-2 py-0.5 bg-emerald-100 text-emerald-600 rounded font-bold text-[10px]">ACTIVE</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-[#7C5C44]">Background Restrict Optimization</span>
                  <span className="px-2 py-0.5 bg-amber-100 text-amber-600 rounded font-bold text-[10px]">EXEMPTED</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Step by Step details */}
      <section id="how-it-works" className="relative z-10 py-16 max-w-7xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl font-black text-[#2C1A0E] tracking-tight font-display">How To Connect</h2>
          <p className="text-xs text-[#7C5C44] mt-2">Linking your Android phone to the console panel takes less than a minute</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {/* Connector line (desktop only) */}
          <div className="hidden md:block absolute top-12 left-16 right-16 h-0.5 bg-[#E8622A]/10 z-0" />

          {/* Step 1 */}
          <div className="relative z-10 flex flex-col items-center text-center px-4 bg-white border border-[#E8622A]/10 p-6 rounded-2xl shadow-sm">
            <div className="w-12 h-12 rounded-full bg-[#E8622A]/10 flex items-center justify-center text-[#E8622A] shadow-md mb-4 font-mono font-black text-sm">
              01
            </div>
            <h3 className="font-bold text-[#2C1A0E] text-sm">Download Companion APK</h3>
            <p className="text-xs text-[#7C5C44] mt-2 leading-relaxed">
              Install the companion Halo app on your target Android device.
            </p>
          </div>

          {/* Step 2 */}
          <div className="relative z-10 flex flex-col items-center text-center px-4 bg-white border border-[#E8622A]/10 p-6 rounded-2xl shadow-sm">
            <div className="w-12 h-12 rounded-full bg-[#F59E0B]/10 flex items-center justify-center text-[#F59E0B] shadow-md mb-4 font-mono font-black text-sm">
              02
            </div>
            <h3 className="font-bold text-[#2C1A0E] text-sm">Login with Credentials</h3>
            <p className="text-xs text-[#7C5C44] mt-2 leading-relaxed">
              Open the phone app and sign in with the email matching your console.
            </p>
          </div>

          {/* Step 3 */}
          <div className="relative z-10 flex flex-col items-center text-center px-4 bg-white border border-[#E8622A]/10 p-6 rounded-2xl shadow-sm">
            <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-500 shadow-md mb-4 font-mono font-black text-sm">
              03
            </div>
            <h3 className="font-bold text-[#2C1A0E] text-sm">Synchronize & Control</h3>
            <p className="text-xs text-[#7C5C44] mt-2 leading-relaxed">
              Choose the phone from your active selection menu and establish the mirroring channel.
            </p>
          </div>
        </div>
      </section>

      {/* Accordion FAQ Section */}
      <section id="faq" className="relative z-10 py-16 bg-white/20 border-t border-[#E8622A]/10">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-indigo-500/10 rounded-full border border-indigo-500/20 text-[10px] font-bold text-indigo-500 uppercase font-mono">SUPPORT HUB</div>
            <h2 className="text-3xl font-black text-[#2C1A0E] tracking-tight font-display mt-2">Frequently Asked Questions</h2>
            <p className="text-xs text-[#7C5C44] mt-2">Everything you need to know about the remote control mechanism</p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => {
              const isOpen = faqOpen === idx;
              return (
                <div 
                  key={idx}
                  className="bg-white border border-[#E8622A]/10 rounded-2xl overflow-hidden transition-all duration-300"
                >
                  <button
                    onClick={() => toggleFaq(idx)}
                    className="w-full flex items-center justify-between p-5 text-left font-bold text-xs sm:text-sm text-[#2C1A0E] hover:bg-[#FFFBF9] transition-colors cursor-pointer"
                  >
                    <span>{faq.q}</span>
                    {isOpen ? <ChevronUp className="w-4 h-4 text-[#E8622A]" /> : <ChevronDown className="w-4 h-4 text-[#7C5C44]" />}
                  </button>
                  
                  {isOpen && (
                    <div className="p-5 pt-0 border-t border-slate-50 bg-[#FDF8F4]/30 text-xs text-[#7C5C44] leading-relaxed">
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
      <section className="relative z-10 py-16 max-w-5xl mx-auto px-6">
        <div className="relative rounded-3xl p-8 md:p-12 overflow-hidden bg-gradient-to-tr from-[#E8622A] via-[#E8622A] to-[#F59E0B] text-white shadow-2xl shadow-[#E8622A]/20">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0c_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0c_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
          
          <div className="relative z-10 max-w-2xl space-y-5">
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight leading-none font-display">Get Halo Companion APK</h2>
            <p className="text-xs sm:text-sm text-white/80 leading-relaxed">
              Install the companion application files on your phone to register it. It runs transparently alongside standard services, providing high-quality control overlays.
            </p>
            <div className="flex flex-wrap gap-4 pt-2">
              <button 
                onClick={() => alert('Download will begin shortly. Install the APK and authorize Accessibility Services.')}
                className="flex items-center gap-2 px-5 py-3 bg-white hover:bg-[#FFFBF9] text-[#E8622A] rounded-xl text-xs font-black shadow-lg transition-all hover:scale-[1.02] cursor-pointer"
              >
                <Download className="w-4 h-4 fill-[#E8622A]/20" /> Download Companion APK (v1.0.0)
              </button>
              <Link 
                to="/register"
                className="flex items-center gap-1.5 px-5 py-3 bg-slate-950/20 hover:bg-slate-950/40 border border-white/20 hover:border-white/40 text-white rounded-xl text-xs font-bold transition-all cursor-pointer"
              >
                Open Dashboard <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-[#E8622A]/10 bg-white/40 py-8 text-center text-xs text-[#7C5C44] font-mono">
        <p>© {new Date().getFullYear()} Halo Link. Built for ultimate remote administration.</p>
      </footer>
    </div>
  );

  // Simulator Interactive Helper
  function handleScreenClick(e) {
    if (!e.currentTarget) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width).toFixed(3);
    const y = ((e.clientY - rect.top) / rect.height).toFixed(3);
    
    // Add simulator log event
    const consoleText = `TOUCH_CLICK event dispatched at [x:${x}, y:${y}]`;
    const newLog = {
      id: Math.random().toString(),
      timestamp: new Date().toLocaleTimeString(),
      text: consoleText,
      type: 'success'
    };
    
    // Alert user dynamically via console log alert simulation
    setSimNotifications(prev => [
      {
        id: Date.now(),
        title: 'Screen Mirror Clicked',
        body: `Emulated click at coordinate coordinates: X=${x}, Y=${y}`,
        time: 'Just now'
      },
      ...prev
    ]);
  }
}
