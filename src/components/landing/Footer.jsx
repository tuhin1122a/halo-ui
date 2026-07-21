export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-slate-200 bg-slate-50 py-10 text-center text-xs text-slate-600 font-mono">
      <p>© {new Date().getFullYear()} Halo Link. Built for ultimate remote administration.</p>
    </footer>
  );
}
