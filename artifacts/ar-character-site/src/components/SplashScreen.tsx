import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { motion } from "framer-motion";

const CHAR_COLORS = [
  { from: "#EF4444", to: "#F97316", initials: "CA" },
  { from: "#3B82F6", to: "#e0f0ff", initials: "XA" },
  { from: "#22C55E", to: "#EAB308", initials: "EL" },
  { from: "#EC4899", to: "#60A5FA", initials: "AS" },
];

interface SplashScreenProps {
  onComplete?: () => void;
}

export default function SplashScreen({ onComplete }: SplashScreenProps) {
  const [, setLocation] = useLocation();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        const next = prev + Math.floor(Math.random() * 12) + 5;
        if (next >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            if (onComplete) {
              onComplete();
            } else {
              setLocation("/home");
            }
          }, 600);
          return 100;
        }
        return next;
      });
    }, 120);
    return () => clearInterval(timer);
  }, [setLocation, onComplete]);

  return (
    <motion.div
      className="fixed inset-0 flex flex-col items-center justify-center z-50 overflow-hidden"
      style={{ background: "#07080f" }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      data-testid="splash-screen"
    >
      {/* 4 thin diagonal color stripes */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        {CHAR_COLORS.map((c, i) => (
          <div
            key={i}
            className="absolute w-[200%] h-1"
            style={{
              background: `linear-gradient(90deg, transparent, ${c.from}, ${c.to}, transparent)`,
              top: `${20 + i * 20}%`,
              left: "-50%",
              transform: "rotate(-15deg)",
              opacity: 0.06,
            }}
          />
        ))}
      </div>

      {/* Background text */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden"
        aria-hidden
      >
        <span
          style={{
            fontFamily: "Orbitron, sans-serif",
            fontSize: "clamp(5rem, 20vw, 16rem)",
            fontWeight: 900,
            fontStyle: "italic",
            color: "rgba(255,255,255,0.025)",
            letterSpacing: "-0.02em",
            lineHeight: 1,
            whiteSpace: "nowrap",
          }}
        >
          IDENTICARD
        </span>
      </div>

      {/* Card */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative w-[clamp(280px,88vw,600px)] mx-4 card-glass overflow-hidden"
      >
        {/* Top gradient bar */}
        <div className="h-1 w-full" style={{
          background: "linear-gradient(90deg, #EF4444, #F97316, #3B82F6, #e0f0ff, #22C55E, #EAB308, #EC4899, #60A5FA)",
        }} />

        <div className="p-8 sm:p-12 pb-6">
          {/* Title */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-center mb-10"
          >
            <h1
              className="relative inline-block pb-1"
              style={{
                fontFamily: "Orbitron, sans-serif",
                fontSize: "clamp(1.8rem, 7vw, 3.5rem)",
                fontWeight: 900,
                fontStyle: "italic",
                letterSpacing: "0.3em",
                color: "#ffffff",
                borderBottom: "1px solid transparent",
                borderImage: "linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent) 1",
              }}
            >
              IDENTICARD
            </h1>
            
            <div className="flex justify-center items-center gap-4 mt-6">
              {CHAR_COLORS.map((c, i) => (
                <div key={i} className="flex items-center gap-1.5">
                  <div style={{ width: 4, height: 4, borderRadius: "50%", background: c.from }} />
                  <div style={{ width: 12, height: 1, background: `linear-gradient(90deg, ${c.from}, transparent)` }} />
                </div>
              ))}
            </div>
            
            <p style={{
              fontSize: "clamp(0.6rem, 2vw, 0.75rem)",
              letterSpacing: "0.4em",
              color: "rgba(255,255,255,0.35)",
              marginTop: 12,
              textTransform: "uppercase",
            }}>
              Team Core System
            </p>
          </motion.div>

          {/* Loading bar */}
          <div className="mb-6">
            <div className="flex justify-between mb-2"
              style={{ fontSize: 10, fontFamily: "Menlo, monospace", color: "rgba(255,255,255,0.35)", letterSpacing: "0.15em" }}>
              <span>LOADING</span>
              <span>{Math.min(progress, 100)}%</span>
            </div>
            <div className="relative overflow-hidden" style={{ height: 4, background: "rgba(255,255,255,0.08)", borderRadius: 2 }}>
              <motion.div
                className="relative overflow-hidden"
                style={{
                  height: "100%",
                  background: "linear-gradient(90deg, #EF4444, #3B82F6, #22C55E, #EC4899)",
                  borderRadius: 2,
                }}
                initial={{ width: 0 }}
                animate={{ width: `${Math.min(progress, 100)}%` }}
                transition={{ ease: "easeOut", duration: 0.15 }}
              >
                <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full animate-shimmer" />
              </motion.div>
            </div>
          </div>

          {/* Bottom section: Initials badges */}
          <div className="flex justify-center gap-4 mt-6 pt-6 border-t border-white/5">
            {CHAR_COLORS.map((c, i) => (
              <motion.div
                key={i}
                className="w-10 h-10 rounded-sm flex items-center justify-center font-bold text-xs"
                style={{
                  background: `linear-gradient(135deg, ${c.from}, ${c.to})`,
                  fontFamily: "Orbitron, sans-serif",
                  color: "#fff",
                }}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 + i * 0.1 }}
              >
                {c.initials}
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
