import { Link } from "wouter";
import { motion } from "framer-motion";
import { characters } from "../data/characters";

export default function HomePage() {
  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ background: "#07080f" }}
      data-testid="page-home"
    >
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

      {/* Cards grid: 2 cols on mobile/tablet, 4 cols on desktop */}
      <div className="flex-1 grid grid-cols-2 lg:grid-cols-4 divide-x divide-y lg:divide-y-0 divide-white/[0.06]">
        {characters.map((char, i) => (
          <Link
            key={char.id}
            href={`/${char.slug}`}
            data-testid={`card-char-${char.slug}`}
            style={{ display: "block" }}
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
                {/* Geometric Decor */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                  <div className="absolute w-48 h-48 sm:w-64 sm:h-64 rounded-full -top-10 -right-10" style={{ background: char.gradient, opacity: 0.08 }} />
                  <div className="absolute w-full h-6 -bottom-4 -left-10 rotate-12" style={{ background: char.gradient, opacity: 0.08 }} />
                </div>

                {/* Gradient bg */}
                <motion.div
                  className="absolute inset-0 z-0"
                  style={{ background: `linear-gradient(160deg, ${char.colorFrom}dd 0%, ${char.colorTo}66 60%, #07080f 100%)` }}
                />

                {/* Diagonal Accent Stripe */}
                <div className="absolute inset-0 z-10 pointer-events-none flex items-center justify-center">
                  <div className="w-[150%] h-[2px] opacity-30 rotate-[30deg]" style={{ background: char.gradient }} />
                </div>

                {/* IDENTICARD watermark */}
                <div
                  className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none select-none z-0"
                  style={{ opacity: 0.1 }}
                >
                  <span
                    style={{
                      fontFamily: "Orbitron, sans-serif",
                      fontWeight: 900,
                      fontStyle: "italic",
                      fontSize: "clamp(1.8rem, 6vw, 6rem)",
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
                <div className="absolute top-2 left-2 sm:top-3 sm:left-3 flex items-center gap-1.5 z-20">
                  <div style={{ width: 6, height: 6, borderRadius: "50%", background: char.gradient, flexShrink: 0 }} />
                  <span style={{ fontFamily: "Orbitron, sans-serif", fontSize: "clamp(7px, 1.5vw, 9px)", fontWeight: 700, color: "rgba(255,255,255,0.5)", letterSpacing: "0.2em" }}>
                    0{char.id}
                  </span>
                </div>

                {/* Avatar */}
                <div className="absolute bottom-0 left-0 right-0 flex justify-center items-end z-20">
                  <motion.div
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 4 + i * 0.5, repeat: Infinity, ease: "easeInOut" }}
                    style={{ marginBottom: "clamp(18px, 4vw, 40px)" }}
                    className="relative flex items-center justify-center"
                  >
                    {/* Glow Ring */}
                    <div
                      className="absolute"
                      style={{
                        width: "clamp(52px, 11vw, 110px)",
                        height: "clamp(52px, 11vw, 110px)",
                        border: `1px solid ${char.colorFrom}`,
                        opacity: 0.4,
                        clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
                        left: "50%",
                        top: "50%",
                        transform: "translate(-50%, -50%)",
                      }}
                    />
                    <div
                      className="flex items-center justify-center font-black relative"
                      style={{
                        width: "clamp(46px, 10vw, 104px)",
                        height: "clamp(46px, 10vw, 104px)",
                        background: char.gradient,
                        fontFamily: "Orbitron, sans-serif",
                        fontSize: "clamp(0.75rem, 2vw, 2rem)",
                        color: "#fff",
                        clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
                        boxShadow: `0 6px 24px ${char.colorFrom}55`,
                      }}
                    >
                      {char.name.slice(0, 2)}
                    </div>
                  </motion.div>
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
          </Link>
        ))}
      </div>
    </div>
  );
}
