// Global CSS keyframes injected once at the page root.
export default function BackgroundEffects() {
  return (
    <>
      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes ripple-effect {
            0%   { transform: translate(-50%, -50%) scale(0);   opacity: 0.9; }
            100% { transform: translate(-50%, -50%) scale(4.5); opacity: 0;   }
          }
          .click-ripple {
            position: absolute;
            border: 2px solid #FF5511;
            border-radius: 50%;
            width: 16px;
            height: 16px;
            animation: ripple-effect 0.6s cubic-bezier(0.1, 0.8, 0.3, 1) forwards;
            pointer-events: none;
            box-shadow: 0 0 10px #FF5511, inset 0 0 5px #FF5511;
          }
          @keyframes moving-grid {
            0%   { background-position: 0 0; }
            100% { background-position: 24px 24px; }
          }
          .animated-grid {
            background-image: radial-gradient(rgba(255, 85, 17, 0.08) 1px, transparent 1px);
            background-size: 24px 24px;
            animation: moving-grid 35s linear infinite;
          }
          .glow-sphere {
            position: absolute;
            border-radius: 50%;
            filter: blur(140px);
            opacity: 0.08;
            pointer-events: none;
            z-index: 0;
          }
        `
      }} />

      {/* Animated dot grid */}
      <div className="absolute inset-0 animated-grid opacity-80" />

      {/* Coloured blur spheres */}
      <div className="glow-sphere w-[600px] h-[600px] bg-[#FF5511] top-[-200px] left-[-150px] animate-pulse"
           style={{ animationDuration: '8s' }} />
      <div className="glow-sphere w-[700px] h-[700px] bg-[#8B5CF6] bottom-[-200px] right-[-150px] animate-pulse"
           style={{ animationDuration: '12s' }} />
      <div className="glow-sphere w-[400px] h-[400px] bg-[#FF2A6D] top-[40%] left-[60%] animate-pulse"
           style={{ animationDuration: '10s' }} />
    </>
  );
}
