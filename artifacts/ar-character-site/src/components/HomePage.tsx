import { Link } from "wouter";
import { motion } from "framer-motion";
import { Mail, ExternalLink, Phone } from "lucide-react";
import { characters } from "../data/characters";

const TABS = ["PROFILE", "CONTACT", "INFO"] as const;

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

      {/* IDENTICARD watermark behind everything */}
      <div
        className="fixed inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden"
        style={{ zIndex: 0 }}
        aria-hidden
      >
        <span
          style={{
            fontFamily: "Orbitron, sans-serif",
            fontSize: "clamp(6rem, 24vw, 20rem)",
            fontWeight: 900,
            fontStyle: "italic",
            color: "rgba(255,255,255,0.018)",
            letterSpacing: "-0.02em",
            lineHeight: 1,
            whiteSpace: "nowrap",
          }}
        >
          IDENTICARD
        </span>
      </div>

      {/* 4-column character cards */}
      <div className="flex-1 relative z-10 overflow-x-auto">
        <div
          className="flex h-full"
          style={{ minWidth: "clamp(640px, 100%, 1400px)", minHeight: "calc(100vh - 65px)" }}
        >
          {characters.map((char, i) => (
            <motion.div
              key={char.id}
              className="flex-1 flex flex-col relative overflow-hidden"
              style={{
                borderRight: i < characters.length - 1 ? "1px solid rgba(255,255,255,0.06)" : "none",
                minWidth: 160,
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: i * 0.08 }}
            >
              {/* ── PHOTO / HERO AREA ── */}
              <div
                className="relative overflow-hidden flex-shrink-0"
                style={{ height: "clamp(220px, 38vh, 360px)" }}
              >
                {/* Gradient background */}
                <div
                  className="absolute inset-0"
                  style={{ background: `linear-gradient(160deg, ${char.colorFrom}cc 0%, ${char.colorTo}55 60%, #07080f 100%)` }}
                />

                {/* "IDENTICARD" large bg text inside card */}
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

                {/* Team dot + number */}
                <div className="absolute top-3 left-3 flex items-center gap-2 z-10">
                  <div
                    style={{
                      width: 8,
                      height: 8,
                      borderRadius: "50%",
                      background: char.gradient,
                    }}
                  />
                  <span
                    style={{
                      fontFamily: "Orbitron, sans-serif",
                      fontSize: 9,
                      fontWeight: 700,
                      color: "rgba(255,255,255,0.5)",
                      letterSpacing: "0.2em",
                    }}
                  >
                    0{char.id}
                  </span>
                </div>

                {/* Avatar / photo placeholder */}
                <div className="absolute bottom-0 left-0 right-0 flex justify-center items-end z-10">
                  <motion.div
                    animate={{ y: [0, -6, 0] }}
                    transition={{ duration: 4 + i * 0.5, repeat: Infinity, ease: "easeInOut" }}
                    className="flex flex-col items-center"
                    style={{ marginBottom: 24 }}
                  >
                    {/* Initials circle */}
                    <div
                      className="rounded-full flex items-center justify-center font-black"
                      style={{
                        width: "clamp(60px, 10vw, 90px)",
                        height: "clamp(60px, 10vw, 90px)",
                        background: char.gradient,
                        fontFamily: "Orbitron, sans-serif",
                        fontSize: "clamp(1.1rem, 2.5vw, 1.7rem)",
                        color: "#fff",
                        boxShadow: `0 8px 32px ${char.colorFrom}55`,
                      }}
                    >
                      {char.name.slice(0, 2)}
                    </div>
                  </motion.div>
                </div>

                {/* Bottom gradient fade */}
                <div
                  className="absolute bottom-0 left-0 right-0 h-20 pointer-events-none"
                  style={{ background: "linear-gradient(to bottom, transparent, #07080f)" }}
                />
              </div>

              {/* ── NAME & ROLE ── */}
              <div className="px-4 pt-2 pb-3" style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                <p style={{ fontSize: 9, letterSpacing: "0.18em", color: "rgba(255,255,255,0.35)", textTransform: "uppercase", marginBottom: 3 }}>
                  TEAM CORE
                </p>
                <h2
                  style={{
                    fontFamily: "Orbitron, sans-serif",
                    fontWeight: 900,
                    fontStyle: "italic",
                    fontSize: "clamp(1.1rem, 2.8vw, 1.7rem)",
                    background: char.gradient,
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    letterSpacing: "0.04em",
                    textTransform: "uppercase",
                    lineHeight: 1,
                  }}
                >
                  {char.name}
                </h2>
              </div>

              {/* ── TABS ── */}
              <div
                className="flex px-2 pt-2 pb-1 gap-1 flex-shrink-0"
                style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}
              >
                {TABS.map((tab, ti) => (
                  <div
                    key={tab}
                    className="flex items-center gap-1 px-2 py-1 rounded text-center"
                    style={{
                      background: ti === 0 ? char.colorFrom : "transparent",
                      fontSize: 9,
                      fontFamily: "Orbitron, sans-serif",
                      fontWeight: 700,
                      letterSpacing: "0.08em",
                      color: ti === 0 ? "#fff" : "rgba(255,255,255,0.35)",
                      cursor: "default",
                    }}
                  >
                    {tab}
                    {ti === 0 && (
                      <span
                        style={{
                          background: "rgba(255,255,255,0.25)",
                          borderRadius: 10,
                          fontSize: 8,
                          padding: "0 4px",
                          lineHeight: "14px",
                        }}
                      >
                        {char.id}
                      </span>
                    )}
                  </div>
                ))}
              </div>

              {/* ── CONTENT CARDS ── */}
              <div className="flex-1 overflow-y-auto p-3 flex flex-col gap-2">

                {/* Go to profile card */}
                <Link href={`/${char.slug}`} data-testid={`card-char-${char.slug}`}>
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="relative overflow-hidden rounded cursor-pointer"
                    style={{
                      background: char.gradient,
                      padding: "clamp(14px, 3vw, 20px)",
                      minHeight: 80,
                    }}
                  >
                    <div
                      className="absolute inset-0 pointer-events-none select-none flex items-center justify-end overflow-hidden"
                      style={{ opacity: 0.2 }}
                    >
                      <span
                        style={{
                          fontFamily: "Orbitron, sans-serif",
                          fontWeight: 900,
                          fontStyle: "italic",
                          fontSize: "clamp(2rem, 5vw, 3.5rem)",
                          color: "#fff",
                          whiteSpace: "nowrap",
                          paddingRight: 8,
                        }}
                      >
                        {char.name.slice(0, 3)}
                      </span>
                    </div>
                    <p style={{ fontSize: 8, fontWeight: 700, letterSpacing: "0.2em", color: "rgba(255,255,255,0.7)", textTransform: "uppercase" }}>
                      VIEW PROFILE
                    </p>
                    <p
                      style={{
                        fontFamily: "Orbitron, sans-serif",
                        fontWeight: 900,
                        fontStyle: "italic",
                        fontSize: "clamp(0.95rem, 2.5vw, 1.25rem)",
                        color: "#fff",
                        marginTop: 4,
                        letterSpacing: "0.04em",
                      }}
                    >
                      OPEN DOSSIER
                    </p>
                  </motion.div>
                </Link>

                {/* Role card */}
                <div
                  className="rounded overflow-hidden"
                  style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}
                >
                  <div
                    className="px-3 py-1.5"
                    style={{ borderBottom: "1px solid rgba(255,255,255,0.06)", fontSize: 8, letterSpacing: "0.15em", color: "rgba(255,255,255,0.3)", textTransform: "uppercase" }}
                  >
                    SPECIALIZATION
                  </div>
                  <div className="px-3 py-3">
                    <p
                      style={{
                        fontFamily: "Orbitron, sans-serif",
                        fontWeight: 700,
                        fontStyle: "italic",
                        fontSize: "clamp(0.7rem, 1.8vw, 0.9rem)",
                        color: "#fff",
                        letterSpacing: "0.04em",
                      }}
                    >
                      {char.role}
                    </p>
                  </div>
                </div>

                {/* Quick actions */}
                <div
                  className="rounded overflow-hidden"
                  style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}
                >
                  <div
                    className="px-3 py-1.5"
                    style={{ borderBottom: "1px solid rgba(255,255,255,0.06)", fontSize: 8, letterSpacing: "0.15em", color: "rgba(255,255,255,0.3)", textTransform: "uppercase" }}
                  >
                    QUICK ACTIONS
                  </div>
                  {[
                    { icon: Mail, label: "Email", href: `mailto:${char.email}` },
                    { icon: ExternalLink, label: "Portfolio", href: char.portfolio },
                    { icon: Phone, label: "Call", href: `tel:${char.phone}` },
                  ].map((action) => (
                    <a
                      key={action.label}
                      href={action.href}
                      target={action.label === "Portfolio" ? "_blank" : undefined}
                      rel="noreferrer"
                      className="flex items-center gap-3 px-3 py-2.5 transition-colors"
                      style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}
                      data-testid={`quick-${action.label.toLowerCase()}-${char.slug}`}
                    >
                      <action.icon size={12} style={{ color: char.colorFrom, flexShrink: 0 }} />
                      <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.08em", color: "rgba(255,255,255,0.65)", textTransform: "uppercase" }}>
                        {action.label}
                      </span>
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
