import { ShieldCheck, CheckCircle2, Lock } from 'lucide-react';
import { SECURITY_POINTS, SECURITY_CHECKS } from '../../data/landingData';

const BADGE_STYLES = {
  emerald: 'bg-emerald-500/10 border-emerald-500/20 text-emerald-500',
  amber:   'bg-amber-500/10  border-amber-500/20  text-amber-500',
};

function SecurityPoint({ title, desc }) {
  return (
    <div className="flex gap-3.5 items-start">
      <div className="w-5 h-5 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-500 shrink-0 mt-0.5">
        <CheckCircle2 className="w-4 h-4" />
      </div>
      <span className="text-xs text-slate-600">
        <strong>{title}:</strong> {desc}
      </span>
    </div>
  );
}

function PermissionRow({ label, status, variant }) {
  return (
    <div className="flex justify-between items-center text-xs">
      <span className="text-slate-600">{label}</span>
      <span className={`px-2.5 py-0.5 border rounded font-bold text-[9px] tracking-wide ${BADGE_STYLES[variant]}`}>
        {status}
      </span>
    </div>
  );
}

export default function SecuritySection() {
  return (
    <section id="security" className="relative z-10 py-24 bg-slate-100/50 border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Left – copy */}
          <div className="space-y-6">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-xs font-bold text-emerald-500">
              <ShieldCheck className="w-4 h-4" /> SECURE CONTROL PROTOCOL
            </div>
            <h2 className="text-4xl font-black text-slate-950 tracking-tight font-display">
              Secured at every level
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              Halo has been designed from the ground up to prevent unauthorized remote operations.
              It is not a spyware background tool. It operates exclusively when authorized by the user.
            </p>
            <div className="space-y-4">
              {SECURITY_POINTS.map((p) => (
                <SecurityPoint key={p.title} {...p} />
              ))}
            </div>
          </div>

          {/* Right – permission card */}
          <div className="bg-white border border-slate-200/80 rounded-3xl p-8 shadow-md relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 blur-3xl" />
            <div className="flex items-center gap-3 border-b border-slate-100 pb-5 mb-5">
              <Lock className="w-6 h-6 text-emerald-500" />
              <h4 className="font-bold text-slate-900">System Permission Checks</h4>
            </div>
            <div className="space-y-4 font-mono">
              {SECURITY_CHECKS.map((c) => (
                <PermissionRow key={c.label} {...c} />
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
