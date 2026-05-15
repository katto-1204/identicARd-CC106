import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { motion } from "framer-motion";

const CHAR_COLORS = [
  { from: "#EF4444", to: "#F97316" },
  { from: "#3B82F6", to: "#e0f0ff" },
  { from: "#22C55E", to: "#EAB308" },
  { from: "#EC4899", to: "#60A5FA" },
];

export default function SplashScreen() {
  const [, setLocation] = useLocation();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        const next = prev + Math.floor(Math.random() * 12) + 5;
        if (next >= 100) {
          clearInterval(timer);
          setTimeout(() => setLocation("/home"), 600);
          return 100;
        }
        return next;
      });
    }, 120);
    return () => clearInterval(timer);
  }, [setLocation]);

  return (
    <motion.div
      className="fixed inset-0 flex flex-col items-center justify-center z-50 overflow-hidden"
      style={{ background: "#0a0c10" }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      data-testid="splash-screen"
    >
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
        className="relative w-[clamp(280px,88vw,600px)] mx-4"
      >
        <div
          className="overflow-hidden"
          style={{
            background: "#12151c",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: 4,
          }}
        >
          {/* Top gradient bar */}
          <div className="h-1 w-full" style={{
            background: "linear-gradient(90deg, #EF4444, #F97316, #22C55E, #EAB308, #EC4899, #60A5FA, #3B82F6)",
          }} />

          <div className="p-8 sm:p-12">
            {/* Title */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-center mb-10"
            >
              <h1
                style={{
                  fontFamily: "Orbitron, sans-serif",
                  fontSize: "clamp(1.6rem, 6vw, 3rem)",
                  fontWeight: 900,
                  fontStyle: "italic",
                  letterSpacing: "0.12em",
                  color: "#ffffff",
                }}
              >
                IDENTICARD
              </h1>
              <p style={{
                fontSize: "clamp(0.6rem, 2vw, 0.75rem)",
                letterSpacing: "0.4em",
                color: "rgba(255,255,255,0.35)",
                marginTop: 6,
                textTransform: "uppercase",
              }}>
                Team Core System
              </p>
            </motion.div>

            {/* Loading bar */}
            <div>
              <div className="flex justify-between mb-2"
                style={{ fontSize: 10, fontFamily: "Menlo, monospace", color: "rgba(255,255,255,0.35)", letterSpacing: "0.15em" }}>
                <span>LOADING</span>
                <span>{Math.min(progress, 100)}%</span>
              </div>
              <div style={{ height: 3, background: "rgba(255,255,255,0.08)", borderRadius: 2, overflow: "hidden" }}>
                <motion.div
                  style={{
                    height: "100%",
                    background: "linear-gradient(90deg, #EF4444, #F97316, #3B82F6)",
                    borderRadius: 2,
                  }}
                  initial={{ width: 0 }}
                  animate={{ width: `${Math.min(progress, 100)}%` }}
                  transition={{ ease: "easeOut", duration: 0.15 }}
                />
              </div>
            </div>
          </div>

          {/* Bottom: character color strips */}
          <div className="flex">
            {CHAR_COLORS.map((c, i) => (
              <motion.div
                key={i}
                className="flex-1 h-12 flex items-center justify-center"
                style={{ background: `linear-gradient(135deg, ${c.from}, ${c.to})`, opacity: 0.85 }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.85 }}
                transition={{ delay: 0.3 + i * 0.08 }}
              >
                <span style={{ fontSize: 10, fontFamily: "Orbitron, sans-serif", fontWeight: 700, color: "rgba(0,0,0,0.6)", letterSpacing: "0.1em" }}>
                  0{i + 1}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
