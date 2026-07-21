import { useState } from 'react';
import {
  Sliders, Monitor, FolderSync, BellRing, Zap,
  Terminal, Volume2, ChevronDown, Play, Folder, Wifi,
} from 'lucide-react';
import { useSound } from '../../hooks/useSound';

/* ─── Simulator tab config ─────────────────────────────────── */
const TABS = [
  { id: 'screen',        label: '1. Mirror Screen stream',  dot: '#FF5511', Icon: Monitor    },
  { id: 'files',         label: '2. Remote File Explorer',  dot: '#FF2A6D', Icon: FolderSync  },
  { id: 'notifications', label: '3. Notification Feed',     dot: '#8B5CF6', Icon: BellRing   },
  { id: 'controls',      label: '4. Hardware triggers',     dot: '#F59E0B', Icon: Zap         },
];

const DEFAULT_FILES = [
  { name: 'DCIM',             isDir: true  },
  { name: 'Downloads',        isDir: true  },
  { name: 'Documents',        isDir: true  },
  { name: 'device_logs.txt',  isDir: false, size: '14 KB'  },
  { name: 'selfie_backup.jpg',isDir: false, size: '2.4 MB' },
];

const DEFAULT_NOTIFS = [
  { id: 1, title: 'Messenger',    body: 'Hey, are you free tonight?',      time: 'Just now' },
  { id: 2, title: 'Halo System',  body: 'Web console linked successfully', time: '2m ago'   },
];

/* ─── Control panel action panels ──────────────────────────── */
function ScreenPanel() {
  return (
    <div className="space-y-4">
      <p className="text-xs text-slate-600 leading-relaxed">
        <strong>Virtual Pointer:</strong> Tap anywhere inside the phone screen mockup on the right.
        Instantly maps clicks with precise scaling matrices.
      </p>
      <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl font-mono text-[10px] text-slate-300 space-y-1">
        <div className="flex items-center gap-1 text-[#FF5511]">
          <Terminal className="w-3.5 h-3.5" />
          <span>daemon@halo:~$ listening...</span>
        </div>
        <div className="text-[9px] text-slate-500">Waiting for pointer click event payload.</div>
      </div>
    </div>
  );
}

function FilesPanel({ setMockFiles, playSound }) {
  const handleAdd = (val) => {
    if (!val.trim()) return;
    setMockFiles(prev => [...prev, { name: val, isDir: false, size: '1.8 MB' }]);
    playSound(1000, 0.15);
  };

  return (
    <div className="space-y-4">
      <p className="text-xs text-slate-600">Push a simulated file to check the file structures render:</p>
      <div className="flex gap-2">
        <input
          type="text"
          id="sim-file-input"
          placeholder="e.g. holiday_video.mp4"
          className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#FF5511] transition-colors"
          onKeyDown={(e) => {
            if (e.key === 'Enter') { handleAdd(e.currentTarget.value); e.currentTarget.value = ''; }
          }}
        />
        <button
          onClick={() => {
            const el = document.getElementById('sim-file-input');
            if (el) { handleAdd(el.value); el.value = ''; }
          }}
          className="px-4 py-2.5 bg-[#FF5511] hover:bg-[#e04400] text-white rounded-xl text-xs font-bold cursor-pointer transition-colors shadow-md shadow-orange-500/10"
        >
          Create
        </button>
      </div>
    </div>
  );
}

function NotifPanel({ newText, setNewText, onSend }) {
  return (
    <div className="space-y-4">
      <p className="text-xs text-slate-600">Dispatch a custom notification payload to the device:</p>
      <div className="flex gap-2">
        <input
          type="text"
          value={newText}
          onChange={(e) => setNewText(e.target.value)}
          placeholder="Message body..."
          className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#FF5511] transition-colors"
          onKeyDown={(e) => e.key === 'Enter' && onSend()}
        />
        <button
          onClick={onSend}
          className="px-4 py-2.5 bg-[#FF5511] hover:bg-[#e04400] text-white rounded-xl text-xs font-bold cursor-pointer transition-colors shadow-md shadow-orange-500/10"
        >
          Send
        </button>
      </div>
    </div>
  );
}

function ControlsPanel({ onVibrate }) {
  return (
    <div className="space-y-4">
      <p className="text-xs text-slate-600">Trigger standard hardware events on the remote phone actuator:</p>
      <button
        onClick={onVibrate}
        className="w-full flex items-center justify-center gap-2 py-3 bg-[#FF5511] hover:bg-[#e04400] text-white rounded-2xl text-xs font-extrabold cursor-pointer shadow-lg shadow-orange-500/10 hover:shadow-orange-500/20 transition-all hover:scale-[1.01]"
      >
        <Volume2 className="w-4 h-4" /> Vibrate Actuator (0.45s Pulse)
      </button>
    </div>
  );
}

/* ─── Phone screen viewport content panels ──────────────────── */
function PhoneScreenTab({ clickRipples, onScreenClick }) {
  return (
    <div
      className="flex-grow flex flex-col items-center justify-center text-center gap-4 cursor-crosshair rounded-[24px] hover:bg-slate-100/[0.4] transition-colors relative"
      onClick={onScreenClick}
    >
      {clickRipples.map((r) => (
        <div key={r.id} className="click-ripple" style={{ left: r.x, top: r.y }} />
      ))}
      {clickRipples.map((r) => (
        <div
          key={`txt-${r.id}`}
          className="absolute font-mono text-[9px] text-[#FF5511] font-bold bg-white px-2 py-0.5 rounded border border-slate-200 shadow-sm animate-fade-in"
          style={{ left: r.x - 45, top: r.y - 28 }}
        >
          X:{r.valX} Y:{r.valY}
        </div>
      ))}
      <div className="relative group">
        <div className="absolute inset-0 bg-[#FF5511]/20 rounded-full blur-md animate-pulse" />
        <div className="relative w-12 h-12 rounded-full bg-slate-50 border border-slate-200/80 flex items-center justify-center text-[#FF5511]">
          <Play className="w-4 h-4 animate-pulse" />
        </div>
      </div>
      <div className="space-y-1">
        <h4 className="text-xs font-bold text-slate-800 tracking-wide">Touch Mirror Active</h4>
        <p className="text-[9.5px] text-slate-500 max-w-[190px] mx-auto leading-relaxed">
          Click anywhere inside this viewport screen. Coordinates will register dynamically.
        </p>
      </div>
    </div>
  );
}

function PhoneFilesTab({ mockFiles, playSound }) {
  return (
    <div className="space-y-3.5 flex-1">
      <div className="flex items-center gap-1.5 pb-2 border-b border-slate-100">
        <Folder className="w-4 h-4 text-[#FF5511]" />
        <span className="text-[10px] font-mono text-slate-500">storage/emulated/0</span>
      </div>
      <div className="grid grid-cols-2 gap-2.5">
        {mockFiles.map((file, idx) => (
          <div
            key={idx}
            onClick={() => playSound(650, 0.1)}
            className="p-3 bg-slate-50 border border-slate-100 rounded-xl flex flex-col justify-between aspect-square text-left hover:border-slate-300 hover:bg-slate-100/50 transition-all cursor-pointer"
          >
            <span className="text-lg">{file.isDir ? '📁' : '📄'}</span>
            <div className="min-w-0">
              <p className="text-[10px] font-bold text-slate-800 truncate">{file.name}</p>
              <p className="text-[8px] text-slate-500 mt-0.5 font-mono">{file.isDir ? 'Folder' : file.size}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function PhoneNotifsTab({ notifications }) {
  return (
    <div className="space-y-2.5 flex-1">
      <div className="flex items-center justify-between pb-2 border-b border-slate-100 mb-3">
        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Push Feed Drawer</span>
      </div>
      {notifications.map((n) => (
        <div key={n.id} className="p-3 bg-slate-50 border border-slate-100 rounded-xl flex items-start gap-2.5 text-left shadow-sm hover:border-slate-200">
          <span className="text-xs pt-0.5">🔔</span>
          <div className="min-w-0 flex-1">
            <p className="text-[10.5px] font-extrabold text-slate-800">{n.title}</p>
            <p className="text-[10px] text-slate-600 mt-0.5 leading-snug">{n.body}</p>
            <p className="text-[8px] text-slate-500 mt-1 font-mono">{n.time}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

function PhoneControlsTab() {
  return (
    <div className="flex-grow flex flex-col items-center justify-center text-center gap-3">
      <div className="relative">
        <div className="absolute inset-0 bg-amber-500/10 rounded-full blur-md animate-ping" />
        <div className="relative w-14 h-14 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center text-amber-500">
          <Zap className="w-7 h-7" />
        </div>
      </div>
      <div className="space-y-1">
        <h4 className="text-xs font-bold text-slate-800 tracking-wide">Actuators Connected</h4>
        <p className="text-[9.5px] text-slate-500 max-w-[180px] mx-auto leading-relaxed">
          Telemetry listening on port 5000 socket room. Haptics operational.
        </p>
      </div>
    </div>
  );
}

/* ─── Main simulator section ────────────────────────────────── */
export default function SimulatorSection() {
  const { playSound } = useSound();
  const [simTab, setSimTab] = useState('screen');
  const [isShaking, setIsShaking] = useState(false);
  const [clickRipples, setClickRipples] = useState([]);
  const [notifications, setNotifications] = useState(DEFAULT_NOTIFS);
  const [newNotifText, setNewNotifText] = useState('');
  const [mockFiles, setMockFiles] = useState(DEFAULT_FILES);

  const triggerVibrate = () => {
    setIsShaking(true);
    playSound(180, 0.45, 'triangle');
    setTimeout(() => setIsShaking(false), 600);
  };

  const sendNotification = () => {
    if (!newNotifText.trim()) return;
    setNotifications(prev => [
      { id: Date.now(), title: 'Simulator Alert', body: newNotifText, time: 'Just now' },
      ...prev,
    ]);
    playSound(587.33, 0.15);
    setTimeout(() => playSound(880, 0.25), 100);
    setNewNotifText('');
  };

  const handleScreenClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width).toFixed(3);
    const y = ((e.clientY - rect.top) / rect.height).toFixed(3);
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;

    const ripple = { id: Date.now(), x: clickX, y: clickY, valX: x, valY: y };
    setClickRipples(prev => [...prev, ripple]);
    playSound(880, 0.2);
    setTimeout(() => setClickRipples(prev => prev.filter(r => r.id !== ripple.id)), 600);

    setNotifications(prev => [
      { id: Date.now(), title: 'Coordinates Dispatched', body: `ADB Click: x=${x}, y=${y}`, time: 'Just now' },
      ...prev,
    ]);
  };

  const activeTabStyle   = 'bg-gradient-to-r from-[#FF5511]/10 to-[#FF2A6D]/10 border-[#FF5511]/30 text-[#FF5511] shadow-sm';
  const inactiveTabStyle = 'bg-slate-50/50 border-slate-200/80 text-slate-600 hover:border-slate-355 hover:bg-slate-50';

  return (
    <section id="simulator" className="relative z-10 py-24 bg-slate-100/40 border-y border-slate-200/85">
      <div className="max-w-7xl mx-auto px-6">

        {/* Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#8B5CF6]/10 border border-[#8B5CF6]/20 rounded-full text-[10px] font-bold text-[#8B5CF6] uppercase tracking-wider">
            Interactive Sandbox
          </div>
          <h2 className="text-4xl font-black text-slate-950 tracking-tight font-display">Try Halo Link Live</h2>
          <p className="text-sm text-slate-600">
            Experience the instant responsiveness. Click the tabs, insert data, and test the virtual terminal.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">

          {/* ── Control sidebar ── */}
          <div className="lg:col-span-5 flex flex-col justify-between bg-white border border-slate-200/85 backdrop-blur-xl p-8 rounded-3xl shadow-md">
            <div>
              <h3 className="font-extrabold text-slate-900 text-lg mb-6 flex items-center gap-2.5">
                <Sliders className="w-5 h-5 text-[#FF5511]" /> Control Dashboard
              </h3>

              {/* Tab buttons */}
              <div className="flex flex-col gap-3">
                {TABS.map(({ id, label, dot, Icon }, i) => (
                  <button
                    key={id}
                    onClick={() => { setSimTab(id); playSound(500 + i * 100, 0.1); }}
                    className={`flex items-center justify-between p-4 rounded-2xl border text-left text-xs font-bold transition-all cursor-pointer ${simTab === id ? activeTabStyle : inactiveTabStyle}`}
                  >
                    <span className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full" style={{ background: dot }} />
                      {label}
                    </span>
                    <Icon className="w-4 h-4" />
                  </button>
                ))}
              </div>
            </div>

            {/* Dynamic action panel */}
            <div className="mt-8 pt-6 border-t border-slate-100">
              {simTab === 'screen'        && <ScreenPanel />}
              {simTab === 'files'         && <FilesPanel setMockFiles={setMockFiles} playSound={playSound} />}
              {simTab === 'notifications' && <NotifPanel newText={newNotifText} setNewText={setNewNotifText} onSend={sendNotification} />}
              {simTab === 'controls'      && <ControlsPanel onVibrate={triggerVibrate} />}
            </div>
          </div>

          {/* ── Phone viewport ── */}
          <div className="lg:col-span-7 flex flex-col items-center justify-center">
            <div
              className={`relative w-full max-w-[340px] aspect-[9/18.5] bg-slate-905 border-[8px] border-slate-800 rounded-[50px] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.12)] p-3.5 flex flex-col justify-between transition-all duration-300 ${
                isShaking ? 'animate-bounce translate-x-2 border-orange-600/60' : ''
              }`}
              style={{ boxShadow: isShaking ? '0 0 50px rgba(255,85,17,0.45), 0 25px 60px -15px rgba(0,0,0,0.12)' : '' }}
            >
              {/* Dynamic Island */}
              <div className="w-28 h-5 bg-black absolute top-2.5 left-1/2 -translate-x-1/2 rounded-full z-30 flex items-center justify-center border border-white/5">
                <div className="w-3.5 h-3.5 bg-slate-900 rounded-full border border-slate-950 mr-4 flex items-center justify-center">
                  <div className="w-1.5 h-1.5 bg-blue-950 rounded-full" />
                </div>
                <div className="w-8 h-1 bg-slate-900 rounded-full" />
              </div>

              {/* Screen */}
              <div className="flex-1 bg-[#FDFBFA] rounded-[36px] overflow-hidden relative border border-slate-200/80 flex flex-col mt-4">
                {/* Status bar */}
                <div className="w-full flex justify-between items-center px-6 py-2.5 text-[10px] font-bold text-slate-600 border-b border-slate-200/50 bg-slate-100/90">
                  <span>10:21 AM</span>
                  <span className="flex items-center gap-1.5">
                    {isShaking && <span className="text-[#FF5511] text-[9px] animate-ping mr-1">📳 VIB</span>}
                    <Wifi className="w-3 h-3 text-[#FF5511]" />
                    <span className="text-[9px]">96%</span>
                  </span>
                </div>

                {/* Tab content */}
                <div className="flex-1 overflow-y-auto p-4 flex flex-col relative select-none">
                  {simTab === 'screen'        && <PhoneScreenTab  clickRipples={clickRipples} onScreenClick={handleScreenClick} />}
                  {simTab === 'files'         && <PhoneFilesTab   mockFiles={mockFiles} playSound={playSound} />}
                  {simTab === 'notifications' && <PhoneNotifsTab  notifications={notifications} />}
                  {simTab === 'controls'      && <PhoneControlsTab />}
                </div>

                {/* Nav buttons */}
                <div className="w-full flex justify-around border-t border-slate-200/50 py-2 text-slate-500 bg-slate-100">
                  <ChevronDown className="w-4 h-4 rotate-90 opacity-70 hover:opacity-100 cursor-pointer" onClick={() => playSound(400, 0.1)} />
                  <span className="w-3.5 h-3.5 rounded-full border border-slate-400 hover:border-slate-700 transition-colors cursor-pointer" onClick={() => playSound(380, 0.1)} />
                  <span className="w-3.5 h-3.5 border border-slate-400 rounded-sm hover:border-slate-700 transition-colors cursor-pointer" onClick={() => playSound(420, 0.1)} />
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
