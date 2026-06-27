type CompanionOrbProps = {
  mood?: "new" | "quest" | "idle";
  curiosity?: number;
};

export function CompanionOrb({ mood = "idle", curiosity = 0 }: CompanionOrbProps) {
  const label = mood === "new" ? "..." : mood === "quest" ? "?" : "•";

  // Dynamic animations and gradients based on curiosity levels
  let gradientClass = "from-[#f4df9b] via-[#c8d6a3] to-[#8fb39a]"; // 0% - 25% (Calm)
  let pulseDuration = "6s";
  let innerPulseDuration = "4s";

  if (curiosity > 75) {
    gradientClass = "from-[#fcd877] via-[#a1d6a6] to-[#508d62]"; // 76% - 100% (Buzzing with curiosity)
    pulseDuration = "2s";
    innerPulseDuration = "1.3s";
  } else if (curiosity > 25) {
    gradientClass = "from-[#f6e3a4] via-[#bfd09b] to-[#78a582]"; // 26% - 75% (Active learning)
    pulseDuration = "4s";
    innerPulseDuration = "2.6s";
  }

  return (
    <div
      style={{ animationDuration: pulseDuration }}
      className={`relative flex h-36 w-36 cursor-pointer items-center justify-center rounded-full bg-gradient-to-br ${gradientClass} shadow-[0_20px_80px_rgba(71,97,70,0.24)] transition-all duration-500 hover:scale-105 active:scale-95 animate-orb-pulse`}
    >
      {/* Blurred glowing core */}
      <div
        style={{ animationDuration: innerPulseDuration }}
        className="absolute inset-4 rounded-full bg-white/25 blur-sm animate-orb-inner-pulse"
      />

      {/* Inner face panel */}
      <div className="relative flex h-20 w-20 items-center justify-center rounded-full bg-white/60 text-3xl font-semibold text-[var(--accent-dark)] backdrop-blur-xs select-none shadow-[inset_0_2px_4px_rgba(255,255,255,0.4)]">
        {label}
      </div>
    </div>
  );
}
