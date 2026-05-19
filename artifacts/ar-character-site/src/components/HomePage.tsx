import { Link, useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { characters } from "../data/characters";
import LaserFlow from "./LaserFlow";

export default function HomePage() {
  const [, setLocation] = useLocation();
  const [transitioningChar, setTransitioningChar] = useState<any | null>(null);
  const terminalLogs: string[] = [];
  const progress = 0;

  const handleCharacterClick = (char: any) => {
    setTransitioningChar(char);
  };

  useEffect(() => {
    if (!transitioningChar) return;

    const timeout = setTimeout(() => {
      setLocation(`/${transitioningChar.slug}`);
    }, 1250);

    return () => {
      clearTimeout(timeout);
    };
  }, [transitioningChar, setLocation]);
  return (
    <div
      className="min-h-screen flex flex-col relative overflow-hidden"
      style={{ background: "#07080f" }}
      data-testid="page-home"
    >
      {/* LaserFlow Background */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-60">
        <LaserFlow
          color="#ff0080"
          fogIntensity={0.65}
          flowSpeed={0.35}
          wispDensity={1.2}
          mouseTiltStrength={0.015}
          verticalSizing={2.2}
          horizontalSizing={0.6}
        />
      </div>
      {/* Header */}
      <header
        className="flex-shrink-0 px-4 sm:px-8 py-3 sm:py-4 flex justify-between items-center sticky top-0 z-20"
        style={{ borderBottom: "1px solid rgba(255,255,255,0.06)", background: "rgba(7, 8, 15, 0.9)", backdropFilter: "blur(12px)" }}
      >
        <div>
          <h1
            style={{
              fontFamily: "Orbitron, sans-serif",
              fontWeight: 900,
              fontStyle: "italic",
              fontSize: "clamp(0.8rem, 3vw, 1.3rem)",
              color: "#fff",
              letterSpacing: "0.12em",
            }}
          >
            TEAM CORE
          </h1>
          <p style={{ fontSize: "clamp(7px, 1.5vw, 9px)", letterSpacing: "0.25em", color: "rgba(255,255,255,0.28)", textTransform: "uppercase", marginTop: 2 }}>
            Architects of the Terminal
          </p>
        </div>
        <div
          className="flex items-center gap-2"
          style={{ fontSize: "clamp(8px, 1.5vw, 10px)", fontFamily: "Menlo, monospace", letterSpacing: "0.15em", color: "rgba(255,255,255,0.28)" }}
        >
          <span className="hidden sm:inline">STATUS</span>
          <span style={{ color: "#4ade80", display: "flex", alignItems: "center", gap: 5 }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#4ade80", display: "inline-block", flexShrink: 0 }} />
            ONLINE
          </span>
        </div>
      </header>

      {/* Centered dashboard layout to prevent stretching and remove bottom space */}
      <main className="flex-1 flex items-center justify-center p-4 sm:p-6 md:p-8 z-10 w-full">
        <div className="w-full max-w-7xl grid grid-cols-2 lg:grid-cols-4 divide-x divide-y lg:divide-y-0 divide-white/[0.06] border border-white/[0.06] rounded-2xl overflow-hidden bg-black/25 backdrop-blur-md shadow-2xl">
          {characters.map((char, i) => (
            <div
              key={char.id}
              onClick={() => handleCharacterClick(char)}
              data-testid={`card-char-${char.slug}`}
              style={{ display: "block" }}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  handleCharacterClick(char);
                }
              }}
            >
            <motion.div
              className="relative flex flex-col overflow-hidden cursor-pointer h-full"
              style={{
                minHeight: "clamp(340px, 60vw, 560px)",
              }}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.07 }}
              whileHover="hover"
            >
              {/* Large Background Number */}
              <div
                className="absolute bottom-8 left-1/2 -translate-x-1/2 pointer-events-none select-none z-0"
                style={{
                  fontFamily: "Orbitron, sans-serif",
                  fontWeight: 900,
                  fontStyle: "italic",
                  fontSize: "clamp(4rem, 12vw, 8rem)",
                  color: "#fff",
                  opacity: 0.04,
                  whiteSpace: "nowrap",
                }}
              >
                0{char.id}
              </div>

              {/* ── HERO AREA ── */}
              <motion.div
                className="relative overflow-hidden flex-shrink-0 z-10"
                style={{
                  height: "clamp(160px, 35vw, 420px)",
                  clipPath: "polygon(0 0, 100% 0, 100% calc(100% - 20px), 0 100%)",
                }}
                variants={{ hover: { height: "clamp(175px, 38vw, 450px)" } }}
                transition={{ duration: 0.3 }}
              >
                {/* Card Graphic Backdrop */}
                <motion.img
                  src={char.cardImage}
                  alt={`${char.name} Preview`}
                  className="absolute inset-0 w-full h-full object-cover z-0"
                  variants={{ hover: { scale: 1.08 } }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                />

                {/* Subtle themed vignette */}
                <div 
                  className="absolute inset-0 z-10 pointer-events-none opacity-40 mix-blend-multiply"
                  style={{ background: `radial-gradient(circle at center, transparent 30%, #07080f 120%)` }}
                />

                {/* Number badge */}
                <div className="absolute top-2 left-2 sm:top-3 sm:left-3 flex items-center gap-1.5 z-20 px-2 py-0.5 rounded-md" style={{ background: "rgba(7,8,15,0.6)", backdropFilter: "blur(4px)" }}>
                  <div style={{ width: 6, height: 6, borderRadius: "50%", background: char.gradient, flexShrink: 0 }} />
                  <span style={{ fontFamily: "Orbitron, sans-serif", fontSize: "clamp(7px, 1.5vw, 9px)", fontWeight: 700, color: "rgba(255,255,255,0.7)", letterSpacing: "0.2em" }}>
                    0{char.id}
                  </span>
                </div>

                {/* Bottom fade */}
                <div
                  className="absolute bottom-0 left-0 right-0 h-16 pointer-events-none z-10"
                  style={{ background: "linear-gradient(to bottom, transparent, #07080f)" }}
                />
              </motion.div>

              {/* ── NAME & ROLE ── */}
              <div
                className="px-3 sm:px-4 pt-3 pb-3 relative z-10"
                style={{
                  borderBottom: "2px solid transparent",
                  borderImage: `linear-gradient(90deg, ${char.colorFrom}, ${char.colorTo}) 1`,
                }}
              >
                <p
                  className="inline-block px-1.5 py-0.5 mb-1.5"
                  style={{
                    fontSize: "clamp(7px, 1.3vw, 9px)",
                    letterSpacing: "0.15em",
                    color: "rgba(255,255,255,0.7)",
                    background: "rgba(255,255,255,0.05)",
                    borderLeft: `1px solid ${char.colorFrom}`,
                    textTransform: "uppercase",
                  }}
                >
                  TEAM CORE
                </p>
                <h2
                  style={{
                    fontFamily: "Orbitron, sans-serif",
                    fontWeight: 900,
                    fontStyle: "italic",
                    fontSize: "clamp(1rem, 3.5vw, 2.2rem)",
                    background: char.gradient,
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    letterSpacing: "0.04em",
                    textTransform: "uppercase",
                    lineHeight: 1.1,
                  }}
                >
                  {char.name}
                </h2>
                <p style={{ fontSize: "clamp(8px, 1.4vw, 11px)", letterSpacing: "0.1em", color: "rgba(255,255,255,0.45)", textTransform: "uppercase", marginTop: 4 }}>
                  {char.role}
                </p>
              </div>

              {/* ── OPEN DOSSIER CTA ── */}
              <div className="px-2.5 sm:px-3 pt-3 z-10">
                <motion.div
                  className="relative overflow-hidden rounded flex items-center justify-between"
                  style={{ background: char.gradient, padding: "clamp(10px, 2.5vw, 14px) clamp(10px, 2.5vw, 16px)", minHeight: "clamp(60px, 12vw, 90px)" }}
                  variants={{ hover: { scale: 1.02 } }}
                  transition={{ duration: 0.2 }}
                >
                  {/* Faint name in bg */}
                  <div
                    className="absolute inset-0 flex items-center justify-end overflow-hidden pointer-events-none select-none"
                    style={{ opacity: 0.22, paddingRight: 8 }}
                  >
                    <span style={{ fontFamily: "Orbitron, sans-serif", fontWeight: 900, fontStyle: "italic", fontSize: "clamp(1.5rem, 5vw, 4rem)", color: "#fff", whiteSpace: "nowrap" }}>
                      {char.name.slice(0, 3)}
                    </span>
                  </div>

                  <div className="relative z-10">
                    <p style={{ fontSize: "clamp(6px, 1.2vw, 8px)", fontWeight: 700, letterSpacing: "0.18em", color: "rgba(255,255,255,0.8)", textTransform: "uppercase" }}>
                      VIEW PROFILE
                    </p>
                    <p style={{ fontFamily: "Orbitron, sans-serif", fontWeight: 900, fontStyle: "italic", fontSize: "clamp(0.75rem, 2.2vw, 1.3rem)", color: "#fff", marginTop: 3, letterSpacing: "0.04em" }}>
                      OPEN DOSSIER
                    </p>
                  </div>

                  <div className="relative z-10 text-white font-black italic opacity-80 flex-shrink-0" style={{ fontFamily: "Orbitron, sans-serif", fontSize: "clamp(1rem, 2.5vw, 1.5rem)" }}>
                    →
                  </div>
                </motion.div>
              </div>

              {/* Hover hint */}
              <motion.div
                className="flex-1 flex items-end justify-center pb-4 z-10"
                variants={{ hover: { opacity: 1 } }}
                initial={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <div style={{ fontSize: "clamp(7px, 1.2vw, 10px)", fontFamily: "Menlo, monospace", letterSpacing: "0.2em", color: "rgba(255,255,255,0.2)", textTransform: "uppercase" }}>
                  TAP TO VIEW →
                </div>
              </motion.div>
            </motion.div>
          </div>
        ))}
        </div>
      </main>

        {/* Cyberpunk Loading / Decrypting Transition Overlay */}
        <AnimatePresence>
          {transitioningChar && (
            <motion.div
              className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black overflow-hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
            >
              {/* Cyber Scanline Grid Backdrop */}
              <div 
                className="absolute inset-0 pointer-events-none opacity-[0.05]"
                style={{
                  backgroundImage: "linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px)",
                  backgroundSize: "100% 4px",
                }}
              />
              {/* Sweeping Scanner laser line */}
              <motion.div
                className="absolute left-0 right-0 h-[2px] z-10 opacity-35"
                style={{
                  background: `linear-gradient(90deg, transparent, ${transitioningChar.colorFrom}, transparent)`,
                  boxShadow: `0 0 16px ${transitioningChar.colorFrom}, 0 0 8px ${transitioningChar.colorFrom}`,
                }}
                animate={{
                  top: ["0%", "100%"],
                }}
                transition={{
                  duration: 1.4,
                  ease: "linear",
                  repeat: Infinity,
                }}
              />

              {/* Glowing themed radial ambient spot */}
              <div 
                className="absolute inset-0 z-0 opacity-25 filter blur-[90px]"
                style={{
                  background: `radial-gradient(circle at 50% 50%, ${transitioningChar.colorFrom}88 0%, transparent 65%)`
                }}
              />

              <div className="relative z-10 w-full px-6 flex flex-col items-center select-none">
                {/* Meta secure dossier details */}
                <div className="hidden" style={{ fontFamily: "Orbitron, sans-serif", fontSize: 10, letterSpacing: "0.25em" }}>
                  <span style={{ color: "rgba(255,255,255,0.3)" }}>SECURE DOSSIER TERMINAL</span>
                  <span style={{ color: transitioningChar.colorFrom }}>● ACTIVE CONNECT</span>
                </div>

                {/* Massive Glitch-styled Custom Name */}
                <motion.h1
                  style={{
                    fontFamily: "Orbitron, sans-serif",
                    fontWeight: 900,
                    fontStyle: "italic",
                    fontSize: "clamp(4.5rem, 16vw, 11rem)",
                    letterSpacing: "0.03em",
                    color: "#fff",
                    textShadow: `0 0 24px ${transitioningChar.colorFrom}ee, 0 0 45px ${transitioningChar.colorFrom}55`,
                    textTransform: "uppercase",
                    textAlign: "center",
                    lineHeight: 0.9,
                    transform: "skewX(-10deg)",
                  }}
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: "spring", stiffness: 130, damping: 11 }}
                >
                  {transitioningChar.name}
                </motion.h1>

                {/* Role text */}
                <p
                  style={{
                    fontFamily: "Menlo, monospace",
                    fontSize: "clamp(9px, 1.5vw, 11px)",
                    letterSpacing: "0.15em",
                    color: "rgba(255,255,255,0.4)",
                    textTransform: "uppercase",
                    marginBottom: 35,
                    display: "none"
                  }}
                >
                  {transitioningChar.role}
                </p>

                {/* Decrypting Progress Bar */}
                <div className="hidden">
                  <div className="flex justify-between items-center mb-2" style={{ fontFamily: "Menlo, monospace", fontSize: 9, color: "rgba(255,255,255,0.4)" }}>
                    <span className="tracking-wider">DECRYPTING PROFILE METRICS...</span>
                    <span style={{ color: transitioningChar.colorFrom }}>{progress}%</span>
                  </div>
                  <div className="h-[2px] w-full bg-white/10 rounded-full overflow-hidden">
                    <motion.div 
                      className="h-full"
                      style={{ background: transitioningChar.gradient }}
                      animate={{ width: `${progress}%` }}
                      transition={{ ease: "easeInOut" }}
                    />
                  </div>
                </div>

                {/* Live digital terminal output streaming logs */}
                <div 
                  className="hidden"
                  style={{
                    boxShadow: "inset 0 4px 20px rgba(0,0,0,0.95)",
                    backdropFilter: "blur(12px)"
                  }}
                >
                  {terminalLogs.map((log, index) => (
                    <motion.div 
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.1 }}
                      style={{ color: index === terminalLogs.length - 1 ? transitioningChar.colorFrom : "rgba(255,255,255,0.4)" }}
                    >
                      {log}
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
  );
}
