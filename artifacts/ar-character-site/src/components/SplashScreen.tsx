import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { motion } from "framer-motion";

export default function SplashScreen() {
  const [, setLocation] = useLocation();
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<"idle" | "loading" | "done">("idle");

  useEffect(() => {
    const startDelay = setTimeout(() => setPhase("loading"), 400);
    return () => clearTimeout(startDelay);
  }, []);

  useEffect(() => {
    if (phase !== "loading") return;

    const timer = setInterval(() => {
      setProgress((prev) => {
        const next = prev + Math.floor(Math.random() * 12) + 4;
        if (next >= 100) {
          clearInterval(timer);
          setPhase("done");
          setTimeout(() => setLocation("/home"), 700);
          return 100;
        }
        return next;
      });
    }, 120);

    return () => clearInterval(timer);
  }, [phase, setLocation]);

  return (
    <motion.div
      className="fixed inset-0 flex flex-col items-center justify-center z-50 overflow-hidden"
      style={{ background: "#080305" }}
      exit={{ opacity: 0, filter: "blur(8px)" }}
      transition={{ duration: 0.6 }}
      data-testid="splash-screen"
    >
      {/* Animated grid bg */}
      <div className="absolute inset-0 bg-grid-animated opacity-60" />

      {/* Corner brackets */}
      {[
        "top-4 left-4 border-t-2 border-l-2",
        "top-4 right-4 border-t-2 border-r-2",
        "bottom-4 left-4 border-b-2 border-l-2",
        "bottom-4 right-4 border-b-2 border-r-2",
      ].map((cls, i) => (
        <div key={i} className={`absolute w-8 h-8 ${cls} border-[#F59E0B] opacity-60`} />
      ))}

      {/* Oversized IDENTICARD watermark */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden"
        aria-hidden
      >
        <span
          className="font-black italic text-[clamp(4rem,18vw,14rem)] leading-none tracking-tighter whitespace-nowrap"
          style={{ color: "rgba(245,158,11,0.04)", fontFamily: "Orbitron, sans-serif" }}
        >
          IDENTICARD
        </span>
      </div>

      {/* Main card */}
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="relative w-[clamp(300px,90vw,720px)] mx-4"
      >
        {/* Card body */}
        <div
          className="relative overflow-hidden"
          style={{
            background: "linear-gradient(135deg, #1a0c06 0%, #0f0608 50%, #180c06 100%)",
            border: "1px solid rgba(245,158,11,0.3)",
            clipPath: "polygon(0 0, calc(100% - 24px) 0, 100% 24px, 100% 100%, 24px 100%, 0 calc(100% - 24px))",
            boxShadow: "0 0 40px rgba(245,158,11,0.15), inset 0 0 40px rgba(0,0,0,0.4)",
          }}
        >
          {/* Diagonal gold accent stripe */}
          <div
            className="absolute pointer-events-none"
            style={{
              top: 0, left: 0, right: 0, bottom: 0,
              background: "linear-gradient(105deg, transparent 38%, rgba(245,158,11,0.12) 42%, rgba(245,158,11,0.18) 48%, rgba(245,158,11,0.12) 54%, transparent 58%)",
            }}
          />

          {/* Scan sweep line */}
          <motion.div
            className="absolute left-0 right-0 h-px pointer-events-none"
            style={{ background: "linear-gradient(90deg, transparent, rgba(245,158,11,0.6), transparent)" }}
            animate={{ top: ["5%", "95%"] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
          />

          <div className="relative z-10 p-6 sm:p-10">
            {/* Top row: stat | brand | stat */}
            <div className="flex items-center justify-between mb-6 sm:mb-8">
              {/* Left stat block */}
              <div className="flex flex-col items-start">
                <span className="font-black text-3xl sm:text-5xl leading-none" style={{ color: "#F59E0B", fontFamily: "Orbitron, sans-serif" }}>
                  04
                </span>
                <span className="text-[10px] sm:text-xs tracking-widest text-white/40 uppercase mt-1">AGENTS</span>
              </div>

              {/* Center brand */}
              <div className="flex-1 text-center px-4">
                <motion.h1
                  initial={{ opacity: 0, letterSpacing: "0.5em" }}
                  animate={{ opacity: 1, letterSpacing: "0.15em" }}
                  transition={{ duration: 1, delay: 0.3 }}
                  className="font-black italic text-2xl sm:text-4xl tracking-widest uppercase glow-text-gold"
                  style={{ fontFamily: "Orbitron, sans-serif", color: "#F59E0B" }}
                >
                  IDENTICARD
                </motion.h1>
                <p className="text-[9px] sm:text-xs tracking-[0.4em] text-white/40 uppercase mt-1">
                  TEAM CORE SYSTEM
                </p>
              </div>

              {/* Right stat block */}
              <div className="flex flex-col items-end">
                <span className="font-black text-3xl sm:text-5xl leading-none" style={{ color: "#EF4444", fontFamily: "Orbitron, sans-serif" }}>
                  v2
                </span>
                <span className="text-[10px] sm:text-xs tracking-widest text-white/40 uppercase mt-1">SEASON</span>
              </div>
            </div>

            {/* Center player-name bar (like reference) */}
            <div
              className="relative flex items-center justify-center py-3 sm:py-4 mb-6 sm:mb-8 overflow-hidden"
              style={{
                background: "linear-gradient(105deg, transparent 5%, rgba(245,158,11,0.2) 15%, rgba(245,158,11,0.35) 50%, rgba(245,158,11,0.2) 85%, transparent 95%)",
                clipPath: "polygon(16px 0%, calc(100% - 16px) 0%, 100% 50%, calc(100% - 16px) 100%, 16px 100%, 0% 50%)",
              }}
            >
              <motion.div
                className="absolute inset-0 pointer-events-none"
                style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent)" }}
                animate={{ x: ["-100%", "200%"] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut", repeatDelay: 0.5 }}
              />
              <span
                className="font-black italic text-sm sm:text-xl tracking-[0.3em] uppercase text-white"
                style={{ fontFamily: "Orbitron, sans-serif" }}
              >
                ARCHITECTS OF THE TERMINAL
              </span>
            </div>

            {/* Loading section */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <motion.span
                  className="text-[10px] sm:text-xs font-mono tracking-widest uppercase"
                  style={{ color: "#F59E0B" }}
                  animate={{ opacity: phase === "done" ? 1 : [1, 0.4, 1] }}
                  transition={{ duration: 0.8, repeat: phase === "done" ? 0 : Infinity }}
                >
                  {phase === "done" ? "ACCESS GRANTED" : "INITIALIZING SYSTEM..."}
                </motion.span>
                <span className="text-[10px] sm:text-xs font-mono" style={{ color: "#F59E0B" }}>
                  {Math.min(progress, 100)}%
                </span>
              </div>

              {/* Loading bar */}
              <div
                className="relative h-2 w-full overflow-hidden"
                style={{ background: "rgba(245,158,11,0.1)", border: "1px solid rgba(245,158,11,0.2)" }}
              >
                <motion.div
                  className="absolute top-0 left-0 h-full"
                  style={{
                    background: "linear-gradient(90deg, #F59E0B, #FBBF24, #F59E0B)",
                    boxShadow: "0 0 12px rgba(245,158,11,0.8)",
                  }}
                  initial={{ width: 0 }}
                  animate={{ width: `${Math.min(progress, 100)}%` }}
                  transition={{ ease: "easeOut", duration: 0.2 }}
                />
                {/* Shimmer on bar */}
                <motion.div
                  className="absolute top-0 h-full w-8 pointer-events-none"
                  style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.5), transparent)" }}
                  animate={{ left: [`-10%`, `110%`] }}
                  transition={{ duration: 1, repeat: Infinity, ease: "easeInOut", repeatDelay: 0.2 }}
                />
              </div>

              {/* Bottom level row (like reference) */}
              <div className="flex justify-between items-center mt-3">
                <span className="text-[9px] sm:text-[11px] font-mono text-white/30 tracking-widest uppercase">CORE TERMINAL</span>
                <span className="text-[9px] sm:text-[11px] font-mono tracking-widest uppercase" style={{ color: "#EF4444" }}>
                  LEVEL {String(Math.floor(progress / 10)).padStart(2, "0")}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Character color bars below card */}
        <div className="flex gap-1 mt-2 px-6">
          {["#F59E0B", "#EF4444", "#06B6D4", "#F43F5E"].map((c, i) => (
            <motion.div
              key={i}
              className="h-1 flex-1"
              style={{ background: c, boxShadow: `0 0 6px ${c}` }}
              initial={{ scaleX: 0, originX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.2 + i * 0.1, duration: 0.5 }}
            />
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}
