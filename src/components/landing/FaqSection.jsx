import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { FAQS } from '../../data/landingData';
import { useSound } from '../../hooks/useSound';

function FaqItem({ faq, idx, openIdx, onToggle }) {
  const isOpen = openIdx === idx;

  return (
    <div className="bg-white border border-slate-200/80 rounded-2xl overflow-hidden transition-all duration-300 shadow-sm">
      <button
        onClick={() => onToggle(idx)}
        className="w-full flex items-center justify-between p-5 text-left font-bold text-sm text-slate-800 hover:bg-slate-50/50 transition-colors cursor-pointer"
      >
        <span>{faq.q}</span>
        {isOpen
          ? <ChevronUp   className="w-4 h-4 text-[#FF5511]"  />
          : <ChevronDown className="w-4 h-4 text-slate-500" />
        }
      </button>
      {isOpen && (
        <div className="p-5 pt-0 border-t border-slate-100 bg-slate-50/60 text-xs text-slate-600 leading-relaxed animate-scale-up">
          {faq.a}
        </div>
      )}
    </div>
  );
}

export default function FaqSection() {
  const [openIdx, setOpenIdx] = useState(null);
  const { playSound } = useSound();

  const handleToggle = (idx) => {
    setOpenIdx(prev => (prev === idx ? null : idx));
    playSound(440, 0.1);
  };

  return (
    <section id="faq" className="relative z-10 py-24 bg-slate-100/40 border-t border-slate-200/80">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-16 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#FF2A6D]/10 border border-[#FF2A6D]/20 rounded-full text-[10px] font-bold text-[#FF2A6D] uppercase tracking-wider font-mono">
            FAQ CENTRAL
          </div>
          <h2 className="text-4xl font-black text-slate-950 tracking-tight font-display">
            Frequently Asked Questions
          </h2>
          <p className="text-sm text-slate-600">
            Everything you need to know about the remote control mechanism.
          </p>
        </div>

        <div className="space-y-4">
          {FAQS.map((faq, idx) => (
            <FaqItem key={idx} faq={faq} idx={idx} openIdx={openIdx} onToggle={handleToggle} />
          ))}
        </div>
      </div>
    </section>
  );
}
