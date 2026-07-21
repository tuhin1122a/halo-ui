import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight, Monitor, Wifi, Battery } from 'lucide-react';

function StatItem({ value, label }) {
  return (
    <div>
      <p className="text-2xl font-black text-slate-950">{value}</p>
      <p className="text-[10px] font-bold text-slate-600 uppercase tracking-wider mt-1">{label}</p>
    </div>
  );
}

function HeroMockup() {
  return (
    <div className="lg:col-span-5 flex justify-center relative">
      {/* Glowing aura */}
      <div className="absolute inset-0 bg-gradient-to-tr from-[#FF5511]/20 to-[#8B5CF6]/20 rounded-full filter blur-3xl opacity-70 scale-90" />

      {/* Desktop card */}
      <div className="relative w-full max-w-[370px] bg-[#0E0F16]/95 border border-white/[0.08] rounded-3xl p-5 shadow-2xl shadow-slate-900/15 animate-float">
        {/* Connection header */}
        <div className="flex items-center justify-between border-b border-white/[0.06] pb-3.5 mb-4 text-[10px] text-slate-400 font-mono">
          <span className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            Remote Web Socket: CONNECTED
          </span>
          <span className="text-[9px] px-2 py-0.5 bg-white/5 rounded border border-white/5">Port 5000</span>
        </div>

        {/* Phone mirror */}
        <div className="aspect-[9/16] bg-[#07070B] rounded-2xl overflow-hidden relative border border-white/[0.08] flex flex-col justify-between p-4 shadow-inner">
          {/* Status bar */}
          <div className="w-full flex justify-between items-center text-[9px] text-slate-400 font-bold">
            <span>10:20 AM</span>
            <div className="flex items-center gap-1.5">
              <Wifi className="w-3 h-3 text-[#FF5511]" />
              <Battery className="w-3.5 h-3.5 text-[#FF5511]" />
            </div>
          </div>

          {/* Graphic */}
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

          {/* Log terminal */}
          <div className="w-full bg-black/60 rounded-xl p-2.5 border border-white/5 font-mono text-[8px] text-slate-500 leading-tight">
            <p className="text-[#FF5511]">system@halo:~$ start stream</p>
            <p>rx: video stream 60fps</p>
            <p>tx: waiting for event</p>
          </div>

          {/* Home indicator */}
          <div className="w-20 h-1 bg-white/20 rounded-full mx-auto mt-2" />
        </div>
      </div>
    </div>
  );
}

export default function HeroSection() {
  return (
    <section className="relative z-10 max-w-7xl mx-auto px-6 pt-20 pb-24 md:pt-28 md:pb-36">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">

        {/* Copy */}
        <div className="lg:col-span-7 space-y-8 text-center lg:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#FF5511]/5 border border-[#FF5511]/15 rounded-full text-xs font-semibold text-[#FF5511] shadow-inner">
            <Sparkles className="w-3.5 h-3.5 text-[#FF5511] animate-spin" style={{ animationDuration: '4s' }} />
            Next-Gen Remote Control Platform
          </div>

          <h1 className="text-5xl sm:text-6xl md:text-7xl font-black text-slate-950 tracking-tight leading-[1.05] font-display">
            Stream & Control <br />
            <span className="bg-gradient-to-r from-[#FF5511] via-[#FF2A6D] to-[#8B5CF6] bg-clip-text text-transparent drop-shadow-sm">
              Your Phone from Web
            </span>
          </h1>

          <p className="text-sm text-slate-600 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
            Halo connects your web browser directly to your phone. Browse files, mirror the display
            with interactive touch coordinates, inspect active notifications, and trigger system
            diagnostic utilities instantly.
          </p>

          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
            <Link
              to="/register"
              className="w-full sm:w-auto flex items-center justify-center gap-2.5 px-7 py-4 bg-gradient-to-r from-[#FF5511] to-[#FF2A6D] hover:from-[#e04400] hover:to-[#e61d5c] text-white rounded-2xl text-xs font-black shadow-xl shadow-orange-500/10 transition-all hover:scale-[1.02] cursor-pointer"
            >
              Access Web Console <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href="#simulator"
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-7 py-4 bg-slate-100 hover:bg-slate-200 text-slate-900 rounded-2xl text-xs font-bold border border-slate-200 shadow-sm transition-all cursor-pointer"
            >
              Try Live Simulator
            </a>
          </div>

          {/* Stats strip */}
          <div className="grid grid-cols-3 gap-6 pt-10 max-w-lg mx-auto lg:mx-0 border-t border-slate-200">
            <StatItem value="~1.2ms" label="Socket Latency" />
            <StatItem value="E2EE"   label="Encrypted Tunnel" />
            <StatItem value="100%"  label="Open Source Core" />
          </div>
        </div>

        <HeroMockup />
      </div>
    </section>
  );
}
