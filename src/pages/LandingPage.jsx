/**
 * LandingPage.jsx
 *
 * Pure orchestrator – imports all section components and composes the page.
 * No business logic lives here; everything is delegated to focused components.
 *
 * Component tree:
 *   LandingPage
 *   ├── BackgroundEffects   (CSS keyframes + animated grid + glow spheres)
 *   ├── Navbar              (header / navigation)
 *   ├── HeroSection         (headline, CTA buttons, stats strip, phone mockup)
 *   ├── SimulatorSection    (interactive sandbox with 4 tabs + phone viewport)
 *   ├── FeaturesSection     (6-card capability grid)
 *   ├── SecuritySection     (trust bullets + permission check card)
 *   ├── HowItWorksSection   (3-step connection guide)
 *   ├── FaqSection          (accordion FAQ)
 *   ├── CtaSection          (APK download banner)
 *   └── Footer
 */

import BackgroundEffects  from '../components/landing/BackgroundEffects';
import Navbar             from '../components/landing/Navbar';
import HeroSection        from '../components/landing/HeroSection';
import SimulatorSection   from '../components/landing/SimulatorSection';
import FeaturesSection    from '../components/landing/FeaturesSection';
import SecuritySection    from '../components/landing/SecuritySection';
import HowItWorksSection  from '../components/landing/HowItWorksSection';
import FaqSection         from '../components/landing/FaqSection';
import CtaSection         from '../components/landing/CtaSection';
import Footer             from '../components/landing/Footer';

export default function LandingPage() {
  return (
    <div className="relative min-h-screen bg-[#FAF9F6] text-slate-800 overflow-hidden font-sans selection:bg-[#FF5511] selection:text-white">
      <BackgroundEffects />
      <Navbar />
      <HeroSection />
      <SimulatorSection />
      <FeaturesSection />
      <SecuritySection />
      <HowItWorksSection />
      <FaqSection />
      <CtaSection />
      <Footer />
    </div>
  );
}
