/**
 * useSound – Lightweight Web Audio API synthesiser hook.
 * Returns a stable `playSound(freq, duration, type)` function.
 */
export function useSound() {
  const playSound = (freq = 880, duration = 0.3, type = 'sine') => {
    try {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (!AudioContextClass) return;

      const ctx = new AudioContextClass();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.type = type;
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      gain.gain.setValueAtTime(0.06, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);

      osc.start();
      osc.stop(ctx.currentTime + duration);
    } catch (_) {
      /* autoplay policy or unsupported – silently ignore */
    }
  };

  return { playSound };
}
