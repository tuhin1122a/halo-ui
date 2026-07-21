import { Link } from 'react-router-dom';
import { Download, ArrowRight } from 'lucide-react';
import { useSound } from '../../hooks/useSound';

export default function CtaSection() {
  const { playSound } = useSound();

  const handleDownload = () => {
    playSound(800, 0.15);
    setTimeout(() => playSound(1000, 0.25), 100);
    alert('Download will begin shortly. Install the APK and authorize Accessibility Services.');
  };

  return (
    <section className="relative z-10 py-20 max-w-6xl mx-auto px-6">
      <div className="relative rounded-[36px] p-10 md:p-16 overflow-hidden bg-slate-900 border border-slate-800 text-white shadow-xl">
        {/* Decorations */}
        <div className="absolute inset-0 bg-[#FF5511]/[0.02] animated-grid pointer-events-none" />
        <div className="absolute top-[-50px] right-[-50px] w-64 h-64 bg-[#FF5511]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-[-50px] left-[-50px] w-64 h-64 bg-[#8B5CF6]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl space-y-6">
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight leading-none font-display bg-gradient-to-r from-white via-slate-100 to-slate-200 bg-clip-text text-transparent">
            Download Companion APK
          </h2>
          <p className="text-sm text-slate-300 leading-relaxed">
            Install the companion application files on your phone to register it. It runs
            transparently alongside standard services, providing high-quality control overlays.
          </p>
          <div className="flex flex-wrap gap-4 pt-3">
            <a
              href="/halo-app.apk"
              download="halo-app.apk"
              onClick={() => playSound(800, 0.15)}
              className="flex items-center gap-2 px-6 py-3.5 bg-gradient-to-r from-[#FF5511] to-[#FF2A6D] hover:from-[#e04400] hover:to-[#e61d5c] text-white rounded-xl text-xs font-black shadow-lg shadow-orange-500/10 transition-all hover:scale-[1.02] cursor-pointer"
            >
              <Download className="w-4 h-4" /> Download Companion APK (v1.0.0)
            </a>
            <Link
              to="/register"
              className="flex items-center gap-1.5 px-6 py-3.5 bg-slate-800/55 hover:bg-slate-800/80 border border-slate-700 text-white rounded-xl text-xs font-bold transition-all cursor-pointer"
            >
              Open Dashboard <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
