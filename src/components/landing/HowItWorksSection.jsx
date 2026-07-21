import { STEPS } from '../../data/landingData';

function StepCard({ num, color, title, desc }) {
  return (
    <div className="relative z-10 flex flex-col items-center text-center p-8 bg-white border border-slate-200/80 rounded-3xl shadow-sm">
      <div
        className="w-12 h-12 rounded-full flex items-center justify-center font-mono font-black text-sm mb-5 shadow-inner border"
        style={{ background: `${color}1A`, borderColor: `${color}33`, color }}
      >
        {num}
      </div>
      <h3 className="font-bold text-slate-900 text-base">{title}</h3>
      <p className="text-xs text-slate-600 mt-2.5 leading-relaxed">{desc}</p>
    </div>
  );
}

export default function HowItWorksSection() {
  return (
    <section className="relative z-10 py-24 max-w-7xl mx-auto px-6">
      <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
        <h2 className="text-4xl font-black text-slate-950 tracking-tight font-display">How To Connect</h2>
        <p className="text-sm text-slate-600">
          Linking your Android phone to the console panel takes less than a minute.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 relative">
        {/* Connector line (desktop only) */}
        <div className="hidden md:block absolute top-14 left-1/4 right-1/4 h-[1px] bg-slate-200 z-0" />

        {STEPS.map((s) => (
          <StepCard key={s.num} {...s} />
        ))}
      </div>
    </section>
  );
}
