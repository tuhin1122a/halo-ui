import { Link } from 'react-router-dom';
import { Smartphone } from 'lucide-react';

const NAV_LINKS = [
  { href: '#features',  label: 'Features'    },
  { href: '#simulator', label: 'Playground'  },
  { href: '#security',  label: 'Security'    },
  { href: '#faq',       label: 'FAQ'         },
];

export default function Navbar() {
  return (
    <header className="relative z-50 border-b border-black/[0.06] bg-white/70 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">

        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-tr from-[#FF5511] to-[#8B5CF6] rounded-xl blur-md opacity-75 group-hover:opacity-100 transition-opacity" />
            <div className="relative w-11 h-11 bg-[#FFF5F0] border border-[#FF5511]/15 rounded-xl flex items-center justify-center shadow-lg">
              <Smartphone className="w-5 h-5 text-[#FF5511]" />
            </div>
          </div>
          <div>
            <span className="font-extrabold text-2xl tracking-tight text-slate-900">
              HALO
            </span>
            <span className="text-[9px] block font-bold text-[#FF5511] tracking-[0.25em] font-mono leading-none">
              LINK SYSTEM
            </span>
          </div>
        </div>

        {/* Nav links */}
        <nav className="flex items-center gap-8">
          {NAV_LINKS.map(({ href, label }) => (
            <a
              key={href}
              href={href}
              className="hidden md:inline text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors"
            >
              {label}
            </a>
          ))}

          <span className="h-5 w-px bg-slate-200 hidden md:block" />

          <Link to="/login" className="text-xs font-bold text-slate-700 hover:text-slate-950 transition-colors">
            Sign In
          </Link>

          <Link
            to="/register"
            className="relative group overflow-hidden px-5 py-2.5 bg-slate-950 text-white font-extrabold rounded-xl text-xs shadow-md transition-all hover:scale-[1.03] cursor-pointer"
          >
            <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-[#FF5511] to-[#8B5CF6] opacity-0 group-hover:opacity-100 transition-opacity" />
            <span className="relative transition-colors">Console Login</span>
          </Link>
        </nav>
      </div>
    </header>
  );
}
