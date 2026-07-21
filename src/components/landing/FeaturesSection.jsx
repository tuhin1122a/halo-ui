import { Monitor, FolderSync, BellRing, Sliders, Video, Zap } from 'lucide-react';
import { FEATURES } from '../../data/landingData';

const ICON_MAP = { Monitor, FolderSync, BellRing, Sliders, Video, Zap };

function FeatureCard({ icon, color, title, desc, hoverBorder }) {
  const Icon = ICON_MAP[icon] ?? Monitor;

  return (
    <div className={`bg-white border border-slate-200/85 p-7 rounded-3xl ${hoverBorder} transition-all hover:-translate-y-1 shadow-sm hover:shadow-md flex gap-5 group`}>
      <div
        className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform border"
        style={{ background: `${color}1A`, borderColor: `${color}33`, color }}
      >
        <Icon className="w-5 h-5" />
      </div>
      <div className="space-y-2">
        <h3 className="font-bold text-slate-900 text-base">{title}</h3>
        <p className="text-xs text-slate-600 leading-relaxed">{desc}</p>
      </div>
    </div>
  );
}

export default function FeaturesSection() {
  return (
    <section id="features" className="relative z-10 py-28 bg-white border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
          <h2 className="text-4xl font-black text-slate-950 tracking-tight font-display">
            Halo Link Core Capabilities
          </h2>
          <p className="text-sm text-slate-600 max-w-xl mx-auto leading-relaxed">
            Complete diagnostic oversight and control without physical wires, command prompts, or root permissions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {FEATURES.map((f) => (
            <FeatureCard key={f.title} {...f} />
          ))}
        </div>
      </div>
    </section>
  );
}
