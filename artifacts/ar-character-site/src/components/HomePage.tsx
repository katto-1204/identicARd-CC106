import { Link } from "wouter";
import { motion } from "framer-motion";
import { characters } from "../data/characters";

export default function HomePage() {
  return (
    <div
      className="min-h-screen flex flex-col overflow-hidden"
      style={{ background: "#07080f" }}
      data-testid="page-home"
    >
      {/* Header */}
      <header
        className="flex-shrink-0 px-5 sm:px-8 py-4 flex justify-between items-center relative z-20"
        style={{ borderBottom: "1px solid rgba(255,255,255,0.06)", background: "rgba(7, 8, 15, 0.8)", backdropFilter: "blur(12px)" }}
      >
        <div>
          <h1
            style={{
              fontFamily: "Orbitron, sans-serif",
              fontWeight: 900,
              fontStyle: "italic",
              fontSize: "clamp(0.9rem, 2.5vw, 1.3rem)",
              color: "#fff",
              letterSpacing: "0.12em",
            }}
          >
            TEAM CORE
          </h1>
          <p style={{ fontSize: 9, letterSpacing: "0.3em", color: "rgba(255,255,255,0.28)", textTransform: "uppercase", marginTop: 2 }}>
            Architects of the Terminal
          </p>
        </div>
        <div
          className="flex items-center gap-2"
          style={{ fontSize: 10, fontFamily: "Menlo, monospace", letterSpacing: "0.15em", color: "rgba(255,255,255,0.28)" }}
        >
          <span className="hidden sm:inline">STATUS</span>
          <span style={{ color: "#4ade80", display: "flex", alignItems: "center", gap: 5 }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#4ade80", display: "inline-block" }} />
            ONLINE
          </span>
        </div>
      </header>

      {/* 4-column character cards */}
      <div className="flex-1 overflow-x-auto relative z-10">
        <div
          className="flex h-full"
          style={{ minWidth: "clamp(640px, 100%, 1400px)", minHeight: "calc(100vh - 65px)" }}
        >
          {characters.map((char, i) => (
            <Link key={char.id} href={`/${char.slug}`} data-testid={`card-char-${char.slug}`} className="flex-1">
              <motion.div
                className="h-full flex flex-col relative overflow-hidden cursor-pointer"
                style={{
                  borderRight: i < characters.length - 1 ? "1px solid rgba(255,255,255,0.06)" : "none",
                  minWidth: 160,
                  minHeight: "calc(100vh - 65px)",
                }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: i * 0.08 }}
                whileHover="hover"
              >
                {/* Large Background Number */}
                <div
                  className="absolute bottom-10 left-1/2 -translate-x-1/2 pointer-events-none select-none z-0"
                  style={{
                    fontFamily: "Orbitron, sans-serif",
                    fontWeight: 900,
                    fontStyle: "italic",
                    fontSize: "8rem",
                    color: "#fff",
                    opacity: 0.04,
                  }}
                >
                  0{char.id}
                </div>

                {/* ── HERO AREA ── */}
                <motion.div
                  className="relative overflow-hidden flex-shrink-0 clip-hero z-10"
                  style={{ height: "clamp(260px, 45vh, 420px)" }}
                  variants={{ hover: { height: "clamp(280px, 50vh, 460px)" } }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Geometric Decor Behind Gradient */}
                  <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute w-64 h-64 rounded-full -top-10 -right-10" style={{ background: char.gradient, opacity: 0.08 }} />
                    <div className="absolute w-full h-8 -bottom-4 -left-10 rotate-12" style={{ background: char.gradient, opacity: 0.08 }} />
                  </div>

                  {/* Gradient background */}
                  <motion.div
                    className="absolute inset-0 z-0"
                    style={{ background: `linear-gradient(160deg, ${char.colorFrom}dd 0%, ${char.colorTo}66 60%, #07080f 100%)` }}
                    variants={{ hover: { opacity: 1.0 } }}
                  />
                  
                  {/* Diagonal Accent Stripe */}
                  <div className="absolute inset-0 z-10 pointer-events-none flex items-center justify-center">
                    <div className="w-[150%] h-[2px] opacity-40 rotate-[30deg]" style={{ background: char.gradient }} />
                  </div>

                  {/* Large "IDENTICARD" watermark inside card */}
                  <div
                    className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none select-none z-0"
                    style={{ opacity: 0.13 }}
                  >
                    <span
                      style={{
                        fontFamily: "Orbitron, sans-serif",
                        fontWeight: 900,
                        fontStyle: "italic",
                        fontSize: "clamp(3rem, 8vw, 6rem)",
                        color: "#fff",
                        whiteSpace: "nowrap",
                        letterSpacing: "-0.02em",
                        transform: "rotate(-8deg)",
                      }}
                    >
                      IDENTICARD
                    </span>
                  </div>

                  {/* Number badge */}
                  <div className="absolute top-3 left-3 flex items-center gap-2 z-20">
                    <div style={{ width: 7, height: 7, borderRadius: "50%", background: char.gradient }} />
                    <span style={{ fontFamily: "Orbitron, sans-serif", fontSize: 9, fontWeight: 700, color: "rgba(255,255,255,0.5)", letterSpacing: "0.2em" }}>
                      0{char.id}
                    </span>
                  </div>

                  {/* Avatar */}
                  <div className="absolute bottom-0 left-0 right-0 flex justify-center items-end z-20">
                    <motion.div
                      animate={{ y: [0, -14, 0] }}
                      transition={{ duration: 4 + i * 0.5, repeat: Infinity, ease: "easeInOut" }}
                      style={{ marginBottom: 40 }}
                      className="relative flex items-center justify-center"
                    >
                      {/* Glow Ring */}
                      <div
                        className="absolute inset-0"
                        style={{
                          width: "clamp(74px, 13vw, 110px)",
                          height: "clamp(74px, 13vw, 110px)",
                          border: `1px solid ${char.colorFrom}`,
                          opacity: 0.4,
                          clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
                          left: "50%",
                          top: "50%",
                          transform: "translate(-50%, -50%)",
                        }}
                      />
                      {/* Inner Avatar */}
                      <div
                        className="flex items-center justify-center font-black relative"
                        style={{
                          width: "clamp(68px, 12vw, 104px)",
                          height: "clamp(68px, 12vw, 104px)",
                          background: char.gradient,
                          fontFamily: "Orbitron, sans-serif",
                          fontSize: "clamp(1.2rem, 2.8vw, 2rem)",
                          color: "#fff",
                          clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
                          boxShadow: `0 8px 32px ${char.colorFrom}55`,
                        }}
                      >
                        {char.name.slice(0, 2)}
                      </div>
                    </motion.div>
                  </div>

                  {/* Bottom fade */}
                  <div
                    className="absolute bottom-0 left-0 right-0 h-20 pointer-events-none z-10"
                    style={{ background: "linear-gradient(to bottom, transparent, #07080f)" }}
                  />
                </motion.div>

                {/* ── NAME & ROLE ── */}
                <div className="px-4 pt-4 pb-4 relative z-10" style={{ borderBottom: `2px solid transparent`, borderImage: `linear-gradient(90deg, ${char.colorFrom}, ${char.colorTo}) 1` }}>
                  <p
                    className="inline-block px-1.5 py-0.5 mb-2"
                    style={{
                      fontSize: 9,
                      letterSpacing: "0.18em",
                      color: "rgba(255,255,255,0.7)",
                      background: "rgba(255,255,255,0.05)",
                      borderLeft: `1px solid ${char.colorFrom}`,
                      textTransform: "uppercase"
                    }}
                  >
                    TEAM CORE
                  </p>
                  <h2
                    style={{
                      fontFamily: "Orbitron, sans-serif",
                      fontWeight: 900,
                      fontStyle: "italic",
                      fontSize: "clamp(1.4rem, 4vw, 2.2rem)",
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
                  <p style={{ fontSize: 11, letterSpacing: "0.12em", color: "rgba(255,255,255,0.45)", textTransform: "uppercase", marginTop: 5 }}>
                    {char.role}
                  </p>
                </div>

                {/* ── OPEN DOSSIER CTA ── */}
                <div className="px-3 pt-4 z-10">
                  <motion.div
                    className="relative overflow-hidden rounded flex items-center justify-between group"
                    style={{ background: char.gradient, padding: "14px 16px", minHeight: 90 }}
                    variants={{ hover: { scale: 1.02 } }}
                    transition={{ duration: 0.2 }}
                  >
                    {/* Hover Shimmer */}
                    <div className="absolute inset-0 -translate-x-full group-hover:animate-shimmer" style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)" }} />

                    {/* Faint name in bg */}
                    <div
                      className="absolute inset-0 flex items-center justify-end overflow-hidden pointer-events-none select-none"
                      style={{ opacity: 0.25, paddingRight: 8 }}
                    >
                      <span style={{ fontFamily: "Orbitron, sans-serif", fontWeight: 900, fontStyle: "italic", fontSize: "clamp(2.5rem, 5vw, 4rem)", color: "#fff", whiteSpace: "nowrap" }}>
                        {char.name.slice(0, 3)}
                      </span>
                    </div>
                    
                    <div className="relative z-10">
                      <p style={{ fontSize: 8, fontWeight: 700, letterSpacing: "0.2em", color: "rgba(255,255,255,0.8)", textTransform: "uppercase" }}>
                        VIEW PROFILE
                      </p>
                      <p style={{ fontFamily: "Orbitron, sans-serif", fontWeight: 900, fontStyle: "italic", fontSize: "clamp(1.1rem, 2.5vw, 1.3rem)", color: "#fff", marginTop: 4, letterSpacing: "0.04em" }}>
                        OPEN DOSSIER
                      </p>
                    </div>

                    <div className="relative z-10 text-white font-black italic opacity-80" style={{ fontFamily: "Orbitron, sans-serif", fontSize: "1.5rem" }}>
                      →
                    </div>
                  </motion.div>
                </div>

                {/* Hover arrow indicator at bottom */}
                <motion.div
                  className="flex-1 flex items-end justify-center pb-6 z-10"
                  variants={{ hover: { opacity: 1 } }}
                  initial={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <div style={{ fontSize: 10, fontFamily: "Menlo, monospace", letterSpacing: "0.2em", color: "rgba(255,255,255,0.25)", textTransform: "uppercase" }}>
                    TAP TO VIEW →
                  </div>
                </motion.div>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
