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
        className="flex-shrink-0 px-5 sm:px-8 py-4 flex justify-between items-center"
        style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}
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
      <div className="flex-1 overflow-x-auto">
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
                {/* ── HERO AREA ── */}
                <motion.div
                  className="relative overflow-hidden flex-shrink-0"
                  style={{ height: "clamp(260px, 45vh, 420px)" }}
                  variants={{ hover: { height: "clamp(280px, 50vh, 460px)" } }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Gradient background */}
                  <motion.div
                    className="absolute inset-0"
                    style={{ background: `linear-gradient(160deg, ${char.colorFrom}dd 0%, ${char.colorTo}66 60%, #07080f 100%)` }}
                    variants={{ hover: { opacity: 1.0 } }}
                  />

                  {/* Large "IDENTICARD" watermark inside card */}
                  <div
                    className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none select-none"
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
                  <div className="absolute top-3 left-3 flex items-center gap-2 z-10">
                    <div style={{ width: 7, height: 7, borderRadius: "50%", background: char.gradient }} />
                    <span style={{ fontFamily: "Orbitron, sans-serif", fontSize: 9, fontWeight: 700, color: "rgba(255,255,255,0.5)", letterSpacing: "0.2em" }}>
                      0{char.id}
                    </span>
                  </div>

                  {/* Avatar */}
                  <div className="absolute bottom-0 left-0 right-0 flex justify-center items-end z-10">
                    <motion.div
                      animate={{ y: [0, -7, 0] }}
                      transition={{ duration: 4 + i * 0.5, repeat: Infinity, ease: "easeInOut" }}
                      style={{ marginBottom: 28 }}
                    >
                      <div
                        className="rounded-full flex items-center justify-center font-black"
                        style={{
                          width: "clamp(64px, 11vw, 96px)",
                          height: "clamp(64px, 11vw, 96px)",
                          background: char.gradient,
                          fontFamily: "Orbitron, sans-serif",
                          fontSize: "clamp(1.1rem, 2.5vw, 1.8rem)",
                          color: "#fff",
                          boxShadow: `0 8px 32px ${char.colorFrom}55`,
                        }}
                      >
                        {char.name.slice(0, 2)}
                      </div>
                    </motion.div>
                  </div>

                  {/* Bottom fade */}
                  <div
                    className="absolute bottom-0 left-0 right-0 h-20 pointer-events-none"
                    style={{ background: "linear-gradient(to bottom, transparent, #07080f)" }}
                  />
                </motion.div>

                {/* ── NAME & ROLE ── */}
                <div className="px-4 pt-3 pb-4" style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                  <p style={{ fontSize: 9, letterSpacing: "0.18em", color: "rgba(255,255,255,0.3)", textTransform: "uppercase", marginBottom: 4 }}>
                    TEAM CORE
                  </p>
                  <h2
                    style={{
                      fontFamily: "Orbitron, sans-serif",
                      fontWeight: 900,
                      fontStyle: "italic",
                      fontSize: "clamp(1.1rem, 3vw, 1.8rem)",
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
                  <p style={{ fontSize: 10, letterSpacing: "0.12em", color: "rgba(255,255,255,0.35)", textTransform: "uppercase", marginTop: 5 }}>
                    {char.role}
                  </p>
                </div>

                {/* ── OPEN DOSSIER CTA ── */}
                <div className="px-3 pt-3">
                  <motion.div
                    className="relative overflow-hidden rounded"
                    style={{ background: char.gradient, padding: "14px 16px", minHeight: 72 }}
                    variants={{ hover: { scale: 1.02 } }}
                    transition={{ duration: 0.2 }}
                  >
                    {/* Faint name in bg */}
                    <div
                      className="absolute inset-0 flex items-center justify-end overflow-hidden pointer-events-none select-none"
                      style={{ opacity: 0.18, paddingRight: 8 }}
                    >
                      <span style={{ fontFamily: "Orbitron, sans-serif", fontWeight: 900, fontStyle: "italic", fontSize: "clamp(1.8rem, 4vw, 3rem)", color: "#fff", whiteSpace: "nowrap" }}>
                        {char.name.slice(0, 3)}
                      </span>
                    </div>
                    <p style={{ fontSize: 8, fontWeight: 700, letterSpacing: "0.2em", color: "rgba(255,255,255,0.65)", textTransform: "uppercase" }}>
                      VIEW PROFILE
                    </p>
                    <p style={{ fontFamily: "Orbitron, sans-serif", fontWeight: 900, fontStyle: "italic", fontSize: "clamp(0.9rem, 2.2vw, 1.15rem)", color: "#fff", marginTop: 4, letterSpacing: "0.04em" }}>
                      OPEN DOSSIER
                    </p>
                  </motion.div>
                </div>

                {/* Hover arrow indicator at bottom */}
                <motion.div
                  className="flex-1 flex items-end justify-center pb-6"
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
