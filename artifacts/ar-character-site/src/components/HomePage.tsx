import { Link } from "wouter";
import { motion } from "framer-motion";
import { characters } from "../data/characters";

const ROLE_SHORT: Record<string, string> = {
  "Developer & Designer": "DEV / DESIGN",
  "Backend Developer": "BACKEND DEV",
  "UI/UX Designer": "UI/UX",
  "QA / Tester": "QA / TEST",
};

export default function HomePage() {
  return (
    <div
      className="min-h-screen text-foreground relative overflow-hidden flex flex-col"
      style={{
        background: "linear-gradient(160deg, #0d0509 0%, #120408 50%, #0b0308 100%)",
      }}
      data-testid="page-home"
    >
      <div className="scanlines pointer-events-none" />

      {/* Background IDENTICARD watermark */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden"
        aria-hidden
      >
        <span
          className="font-black italic whitespace-nowrap"
          style={{
            fontFamily: "Orbitron, sans-serif",
            fontSize: "clamp(5rem, 22vw, 18rem)",
            color: "rgba(245,158,11,0.035)",
            letterSpacing: "-0.02em",
            lineHeight: 1,
          }}
        >
          IDENTICARD
        </span>
      </div>

      {/* Subtle gradient overlays */}
      <div className="absolute top-0 left-0 right-0 h-64 pointer-events-none"
        style={{ background: "linear-gradient(180deg, rgba(239,68,68,0.04) 0%, transparent 100%)" }} />
      <div className="absolute bottom-0 left-0 right-0 h-64 pointer-events-none"
        style={{ background: "linear-gradient(0deg, rgba(245,158,11,0.04) 0%, transparent 100%)" }} />

      {/* Header */}
      <header className="relative z-20 px-4 sm:px-8 pt-5 pb-4 flex justify-between items-end"
        style={{ borderBottom: "1px solid rgba(245,158,11,0.12)" }}>
        <div>
          <motion.h1
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-xl sm:text-3xl font-black italic tracking-widest glow-text-gold"
            style={{ fontFamily: "Orbitron, sans-serif", color: "#F59E0B" }}
          >
            TEAM CORE
          </motion.h1>
          <p className="text-[10px] sm:text-xs tracking-[0.35em] text-white/30 uppercase">
            Architects of the Terminal
          </p>
        </div>
        <div className="flex items-center gap-3 text-[10px] sm:text-xs font-mono">
          <span className="text-white/30 hidden sm:inline">STATUS:</span>
          <span className="flex items-center gap-1.5" style={{ color: "#4ade80" }}>
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse inline-block" />
            ONLINE
          </span>
        </div>
      </header>

      {/* Main */}
      <main className="flex-1 relative z-10 flex flex-col lg:flex-row gap-0">

        {/* LEFT: Character photo grid */}
        <div className="w-full lg:w-1/2 p-4 sm:p-8 flex flex-col justify-center">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-[10px] sm:text-xs font-mono tracking-widest text-white/30 uppercase mb-4 sm:mb-6"
          >
            // ACTIVE OPERATIVES
          </motion.p>

          <div className="grid grid-cols-2 gap-3 sm:gap-4 max-w-lg mx-auto lg:mx-0 w-full">
            {characters.map((char, i) => (
              <motion.div
                key={char.id}
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ y: -4, scale: 1.02 }}
              >
                <Link href={`/${char.slug}`} className="block group" data-testid={`card-char-${char.slug}`}>
                  <div
                    className="relative overflow-hidden cursor-pointer"
                    style={{
                      background: `linear-gradient(135deg, #18080c 0%, #0e0408 100%)`,
                      border: `1px solid ${char.colorBorder}`,
                      clipPath: "polygon(0 0, calc(100% - 16px) 0, 100% 16px, 100% 100%, 16px 100%, 0 calc(100% - 16px))",
                      boxShadow: `0 4px 24px ${char.colorDim}`,
                    }}
                  >
                    {/* Photo placeholder area */}
                    <div
                      className="relative w-full flex items-center justify-center overflow-hidden"
                      style={{
                        aspectRatio: "3/4",
                        background: `linear-gradient(160deg, ${char.colorDim} 0%, rgba(0,0,0,0.6) 100%)`,
                      }}
                    >
                      {/* Grid overlay */}
                      <div
                        className="absolute inset-0 pointer-events-none"
                        style={{
                          backgroundImage: `linear-gradient(${char.color}11 1px, transparent 1px), linear-gradient(90deg, ${char.color}11 1px, transparent 1px)`,
                          backgroundSize: "20px 20px",
                        }}
                      />

                      {/* Scan sweep */}
                      <motion.div
                        className="absolute left-0 right-0 h-px pointer-events-none"
                        style={{ background: `linear-gradient(90deg, transparent, ${char.color}99, transparent)` }}
                        animate={{ top: ["5%", "95%"] }}
                        transition={{ duration: 3, repeat: Infinity, ease: "linear", delay: i * 0.7 }}
                      />

                      {/* Initials / photo slot */}
                      <div className="relative z-10 flex flex-col items-center gap-2">
                        <div
                          className="rounded-full flex items-center justify-center font-black text-2xl sm:text-3xl"
                          style={{
                            width: "clamp(56px, 14vw, 80px)",
                            height: "clamp(56px, 14vw, 80px)",
                            background: `radial-gradient(circle, ${char.colorDim} 0%, rgba(0,0,0,0.8) 100%)`,
                            border: `2px solid ${char.colorBorder}`,
                            color: char.color,
                            fontFamily: "Orbitron, sans-serif",
                            boxShadow: `0 0 20px ${char.colorDim}`,
                          }}
                        >
                          {char.name.slice(0, 2)}
                        </div>
                        <span
                          className="text-[9px] sm:text-[10px] font-mono tracking-widest opacity-50"
                          style={{ color: char.color }}
                        >
                          PHOTO SLOT
                        </span>
                      </div>

                      {/* Corner accent */}
                      <div
                        className="absolute top-2 right-2 w-4 h-4"
                        style={{ borderTop: `2px solid ${char.color}`, borderRight: `2px solid ${char.color}` }}
                      />
                      <div
                        className="absolute bottom-2 left-2 w-4 h-4"
                        style={{ borderBottom: `2px solid ${char.color}`, borderLeft: `2px solid ${char.color}` }}
                      />
                    </div>

                    {/* Name strip at bottom */}
                    <div
                      className="px-3 py-2"
                      style={{ borderTop: `1px solid ${char.colorBorder}` }}
                    >
                      <p
                        className="font-black italic text-sm sm:text-base tracking-wider uppercase leading-none"
                        style={{ color: char.color, fontFamily: "Orbitron, sans-serif" }}
                      >
                        {char.name}
                      </p>
                      <p className="text-[9px] sm:text-[10px] tracking-widest text-white/40 uppercase mt-0.5">
                        {ROLE_SHORT[char.role] ?? char.role}
                      </p>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>

        {/* RIGHT: Roster list */}
        <div className="w-full lg:w-1/2 p-4 sm:p-8 lg:p-12 flex flex-col justify-center"
          style={{ borderLeft: "1px solid rgba(245,158,11,0.08)" }}>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-6 sm:mb-8"
          >
            <p className="text-[10px] sm:text-xs font-mono tracking-widest text-white/30 uppercase mb-1">
              // SELECT OPERATIVE
            </p>
            <h2
              className="text-3xl sm:text-5xl font-black italic tracking-wider text-white leading-none"
              style={{ fontFamily: "Orbitron, sans-serif" }}
            >
              ROSTER
            </h2>
            <div className="h-px mt-3" style={{ background: "linear-gradient(90deg, #F59E0B, transparent)" }} />
          </motion.div>

          <div className="flex flex-col gap-3 sm:gap-4">
            {characters.map((char, index) => (
              <motion.div
                key={char.id}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.45, delay: 0.15 + index * 0.1 }}
              >
                <Link href={`/${char.slug}`} className="block group" data-testid={`roster-${char.slug}`}>
                  <div
                    className="relative overflow-hidden cursor-pointer transition-all duration-300"
                    style={{
                      background: "#0f0408",
                      border: `1px solid ${char.colorBorder}`,
                      clipPath: "polygon(0 0, calc(100% - 16px) 0, 100% 16px, 100% 100%, 0 100%)",
                    }}
                  >
                    {/* Hover fill */}
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                      style={{ background: char.colorDim }}
                    />

                    <div className="relative flex items-center">
                      {/* Number block */}
                      <div
                        className="flex-shrink-0 w-12 sm:w-16 h-full flex items-center justify-center py-4 sm:py-5 font-black text-base sm:text-xl font-mono"
                        style={{
                          background: char.colorDim,
                          borderRight: `1px solid ${char.colorBorder}`,
                          color: char.color,
                          fontFamily: "Orbitron, sans-serif",
                        }}
                      >
                        0{char.id}
                      </div>

                      {/* Info */}
                      <div className="flex-1 px-4 sm:px-6 py-3 sm:py-4">
                        <h3
                          className="text-lg sm:text-2xl font-black italic tracking-wider text-white group-hover:brightness-110 transition-all uppercase leading-none"
                          style={{ fontFamily: "Orbitron, sans-serif" }}
                        >
                          {char.name}
                        </h3>
                        <p className="text-[10px] sm:text-xs tracking-widest uppercase mt-1 font-medium"
                          style={{ color: char.color }}>
                          {char.role}
                        </p>
                      </div>

                      {/* Arrow indicator */}
                      <div className="flex-shrink-0 pr-4 sm:pr-6 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        <div
                          className="w-6 h-6 flex items-center justify-center"
                          style={{ border: `1px solid ${char.colorBorder}`, color: char.color }}
                        >
                          <svg width="10" height="10" viewBox="0 0 10 10" fill="currentColor">
                            <path d="M2 0 L8 5 L2 10" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Footer */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-8 sm:mt-12 pt-4 flex justify-between text-[9px] sm:text-[10px] font-mono text-white/20 uppercase tracking-widest"
            style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
          >
            <span>IDENTICARD SYSTEM</span>
            <span>{new Date().getFullYear()} © CORE</span>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
