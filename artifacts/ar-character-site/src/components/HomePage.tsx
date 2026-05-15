import { Link } from "wouter";
import { motion } from "framer-motion";
import { characters } from "../data/characters";

export default function HomePage() {
  return (
    <div
      className="min-h-screen text-foreground flex flex-col relative overflow-hidden"
      style={{ background: "#0a0c10" }}
      data-testid="page-home"
    >
      {/* IDENTICARD watermark */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden"
        aria-hidden
      >
        <span
          style={{
            fontFamily: "Orbitron, sans-serif",
            fontSize: "clamp(5rem, 22vw, 18rem)",
            fontWeight: 900,
            fontStyle: "italic",
            color: "rgba(255,255,255,0.022)",
            letterSpacing: "-0.02em",
            lineHeight: 1,
            whiteSpace: "nowrap",
          }}
        >
          IDENTICARD
        </span>
      </div>

      {/* Header */}
      <header
        className="relative z-10 px-5 sm:px-8 pt-5 pb-4 flex justify-between items-center"
        style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}
      >
        <div>
          <h1
            style={{
              fontFamily: "Orbitron, sans-serif",
              fontSize: "clamp(1rem, 3vw, 1.5rem)",
              fontWeight: 900,
              fontStyle: "italic",
              color: "#fff",
              letterSpacing: "0.12em",
            }}
          >
            TEAM CORE
          </h1>
          <p style={{ fontSize: 10, letterSpacing: "0.3em", color: "rgba(255,255,255,0.3)", textTransform: "uppercase", marginTop: 2 }}>
            Architects of the Terminal
          </p>
        </div>
        <div style={{ fontSize: 10, fontFamily: "Menlo, monospace", letterSpacing: "0.15em", color: "rgba(255,255,255,0.3)" }} className="hidden sm:flex items-center gap-2">
          STATUS <span style={{ color: "#4ade80", display: "flex", alignItems: "center", gap: 4 }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#4ade80", display: "inline-block" }} />
            ONLINE
          </span>
        </div>
      </header>

      {/* Main */}
      <main className="flex-1 flex flex-col lg:flex-row relative z-10">

        {/* LEFT: Photo cards */}
        <div className="w-full lg:w-1/2 p-5 sm:p-8 flex flex-col">
          <p style={{ fontSize: 10, fontFamily: "Menlo, monospace", letterSpacing: "0.2em", color: "rgba(255,255,255,0.25)", textTransform: "uppercase", marginBottom: 16 }}>
            Active Operatives
          </p>
          <div className="grid grid-cols-2 gap-3 max-w-lg mx-auto lg:mx-0 w-full">
            {characters.map((char, i) => (
              <motion.div
                key={char.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                whileHover={{ y: -3 }}
              >
                <Link href={`/${char.slug}`} data-testid={`card-char-${char.slug}`}>
                  <div
                    className="overflow-hidden cursor-pointer"
                    style={{
                      background: "#12151c",
                      border: "1px solid rgba(255,255,255,0.08)",
                      borderRadius: 6,
                    }}
                  >
                    {/* Photo area */}
                    <div
                      className="relative flex items-center justify-center"
                      style={{ aspectRatio: "3/4", background: "rgba(0,0,0,0.3)" }}
                    >
                      {/* Gradient fill */}
                      <div
                        className="absolute inset-0"
                        style={{
                          background: char.gradient,
                          opacity: 0.12,
                        }}
                      />

                      {/* Initials avatar */}
                      <div
                        className="relative z-10 rounded-full flex items-center justify-center font-black"
                        style={{
                          width: "clamp(52px, 13vw, 72px)",
                          height: "clamp(52px, 13vw, 72px)",
                          background: char.gradient,
                          fontFamily: "Orbitron, sans-serif",
                          fontSize: "clamp(1rem, 3vw, 1.4rem)",
                          color: "#fff",
                        }}
                      >
                        {char.name.slice(0, 2)}
                      </div>
                    </div>

                    {/* Name strip */}
                    <div
                      className="px-3 py-2.5"
                      style={{ borderTop: `2px solid transparent`, backgroundImage: `linear-gradient(#12151c, #12151c), ${char.gradient}`, backgroundOrigin: "border-box", backgroundClip: "padding-box, border-box", borderTop: "2px solid transparent" }}
                    >
                      <p
                        style={{
                          fontFamily: "Orbitron, sans-serif",
                          fontWeight: 900,
                          fontStyle: "italic",
                          fontSize: "clamp(0.65rem, 2vw, 0.85rem)",
                          background: char.gradient,
                          WebkitBackgroundClip: "text",
                          WebkitTextFillColor: "transparent",
                          backgroundClip: "text",
                          letterSpacing: "0.08em",
                          textTransform: "uppercase",
                        }}
                      >
                        {char.name}
                      </p>
                      <p style={{ fontSize: 9, letterSpacing: "0.15em", color: "rgba(255,255,255,0.35)", textTransform: "uppercase", marginTop: 2 }}>
                        {char.role}
                      </p>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>

        {/* RIGHT: Roster */}
        <div
          className="w-full lg:w-1/2 p-5 sm:p-8 lg:p-12 flex flex-col justify-center"
          style={{ borderLeft: "1px solid rgba(255,255,255,0.06)" }}
        >
          <motion.div
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            className="mb-6 sm:mb-8"
          >
            <p style={{ fontSize: 10, fontFamily: "Menlo, monospace", letterSpacing: "0.2em", color: "rgba(255,255,255,0.25)", textTransform: "uppercase", marginBottom: 8 }}>
              Select Operative
            </p>
            <h2
              style={{
                fontFamily: "Orbitron, sans-serif",
                fontWeight: 900,
                fontStyle: "italic",
                fontSize: "clamp(2rem, 6vw, 3.5rem)",
                color: "#fff",
                lineHeight: 1,
                letterSpacing: "0.05em",
              }}
            >
              ROSTER
            </h2>
            <div style={{ height: 2, marginTop: 12, width: 48, background: "rgba(255,255,255,0.15)", borderRadius: 1 }} />
          </motion.div>

          <div className="flex flex-col gap-3">
            {characters.map((char, i) => (
              <motion.div
                key={char.id}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.1 + i * 0.08 }}
              >
                <Link href={`/${char.slug}`} data-testid={`roster-${char.slug}`}>
                  <motion.div
                    className="flex items-center overflow-hidden cursor-pointer group"
                    style={{
                      background: "#12151c",
                      border: "1px solid rgba(255,255,255,0.07)",
                      borderRadius: 6,
                    }}
                    whileHover={{ borderColor: char.colorBorder, backgroundColor: char.colorDim }}
                    transition={{ duration: 0.2 }}
                  >
                    {/* Number */}
                    <div
                      className="flex-shrink-0 flex items-center justify-center font-black"
                      style={{
                        width: 48,
                        alignSelf: "stretch",
                        background: char.gradient,
                        fontFamily: "Orbitron, sans-serif",
                        fontSize: "clamp(0.75rem, 2vw, 1rem)",
                        color: "#fff",
                      }}
                    >
                      0{char.id}
                    </div>

                    {/* Name & role */}
                    <div className="flex-1 px-4 sm:px-5 py-3 sm:py-4">
                      <h3
                        style={{
                          fontFamily: "Orbitron, sans-serif",
                          fontWeight: 900,
                          fontStyle: "italic",
                          fontSize: "clamp(1rem, 3vw, 1.4rem)",
                          color: "#fff",
                          letterSpacing: "0.06em",
                          textTransform: "uppercase",
                          lineHeight: 1,
                        }}
                      >
                        {char.name}
                      </h3>
                      <p style={{ fontSize: 10, letterSpacing: "0.18em", color: "rgba(255,255,255,0.4)", textTransform: "uppercase", marginTop: 4 }}>
                        {char.role}
                      </p>
                    </div>
                  </motion.div>
                </Link>
              </motion.div>
            ))}
          </div>

          <div
            className="mt-8 sm:mt-12 pt-4 flex justify-between"
            style={{ borderTop: "1px solid rgba(255,255,255,0.06)", fontSize: 9, fontFamily: "Menlo, monospace", letterSpacing: "0.15em", color: "rgba(255,255,255,0.18)", textTransform: "uppercase" }}
          >
            <span>IDENTICARD SYSTEM</span>
            <span>{new Date().getFullYear()} © CORE</span>
          </div>
        </div>
      </main>
    </div>
  );
}
