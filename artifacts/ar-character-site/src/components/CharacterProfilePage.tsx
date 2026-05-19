import { useParams, Redirect } from "wouter";
import { useState, useRef } from "react";
import { Mail, Volume2, Square, Github, ExternalLink, ChevronLeft } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "wouter";
import { characters } from "../data/characters";
import Character3DViewer from "./Character3DViewer";
import Antigravity from "./Antigravity";

export default function CharacterProfilePage() {
  const { slug } = useParams();
  const normalizedSlug = slug?.toLowerCase();
  const character = characters.find((c) => c.slug === normalizedSlug);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isCardStraight, setIsCardStraight] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const hoverTimeout = useRef<NodeJS.Timeout | null>(null);

  const handleCardMouseEnter = () => {
    hoverTimeout.current = setTimeout(() => {
      setIsCardStraight(true);
    }, 3000);
  };

  const handleCardMouseLeave = () => {
    if (hoverTimeout.current) clearTimeout(hoverTimeout.current);
    setIsCardStraight(false);
  };

  if (!character) return <Redirect to="/home" />;

  const toggleAudio = () => {
    if (!audioRef.current) {
      audioRef.current = new Audio(character.voiceRecord);
      audioRef.current.onended = () => setIsPlaying(false);
    }
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().catch(() => {
        setIsPlaying(true);
        setTimeout(() => setIsPlaying(false), 3000);
      });
      setIsPlaying(true);
    }
  };

  const openExternal = (url: string) => {
    const opened = window.open(url, "_blank", "noopener,noreferrer");
    if (!opened) {
      window.location.href = url;
    }
  };

  const openEmail = () => {
    window.location.href = `mailto:${character.email}`;
  };

  const portfolioUrl = character.portfolio;
  const githubUrl = character.github ? `https://github.com/${character.github}` : "";

  // 4 action cards — each gets a distinct visual treatment
  const actions = [
    {
      label: "EMAIL",
      sub: character.email,
      icon: Mail,
      onClick: openEmail,
      style: "primary", // character gradient bg
    },
    {
      label: isPlaying ? "PAUSE RECORD" : "VOICE RECORD",
      sub: isPlaying ? "Now playing…" : "Play intro message",
      icon: isPlaying ? Square : Volume2,
      onClick: toggleAudio,
      isActive: isPlaying,
      style: "accent", // semi-transparent character color
    },
    {
      label: "PORTFOLIO",
      sub: portfolioUrl,
      icon: ExternalLink,
      onClick: () => openExternal(portfolioUrl),
      style: "dark",
    },
    {
      label: "GITHUB",
      sub: character.github || "No github provided",
      icon: Github,
      onClick: () => {
        if (githubUrl) openExternal(githubUrl);
      },
      style: "dark",
    },
  ];

  return (
    <div
      className="min-h-screen w-full flex flex-col lg:flex-row relative overflow-hidden"
      style={{ background: "#0d0d14" }}
      data-testid={`page-profile-${character.slug}`}
    >
      {/* ══════════════════════════════════════════
          LEFT — Character Showcase
      ══════════════════════════════════════════ */}
      <div className="relative flex-1 flex items-center justify-center overflow-hidden" style={{ minHeight: "clamp(520px, 80vw, 100vh)" }}>

        {/* Antigravity background */}
        <div className="absolute inset-0 z-0 opacity-45 pointer-events-none">
          <Antigravity
            count={220}
            magnetRadius={8}
            ringRadius={9}
            waveSpeed={0.5}
            waveAmplitude={0.8}
            particleSize={1.1}
            lerpSpeed={0.06}
            color={character.colorFrom}
            autoAnimate={true}
            particleVariance={0.8}
            particleShape="capsule"
          />
        </div>

        {/* Full bleed gradient backdrop */}
        <div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(ellipse 80% 90% at 40% 55%, ${character.colorFrom}40 0%, ${character.colorTo}18 45%, transparent 75%)`,
          }}
        />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to right, transparent 60%, #0d0d14 100%)" }} />
        <div className="absolute inset-0 lg:hidden" style={{ background: "linear-gradient(to bottom, transparent 60%, #0d0d14 100%)" }} />

        {/* Subtle grid lines */}
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(${character.colorFrom} 1px, transparent 1px), linear-gradient(90deg, ${character.colorFrom} 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />

        {/* Back button */}
        <Link
          href="/home"
          className="absolute top-4 left-4 z-30 w-10 h-10 flex items-center justify-center rounded-xl transition-all duration-200 group"
          style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", backdropFilter: "blur(12px)" }}
          data-testid="button-back"
        >
          <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity" style={{ background: character.colorFrom + "22" }} />
          <ChevronLeft size={18} style={{ color: character.colorFrom }} />
        </Link>

        {/* Top-right: Number tag */}
        <div
          className="absolute top-4 right-4 lg:right-8 z-20 flex items-center gap-2 px-3 py-1.5 rounded-xl"
          style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", backdropFilter: "blur(8px)" }}
        >
          <div style={{ width: 6, height: 6, borderRadius: "50%", background: character.gradient }} />
          <span style={{ fontFamily: "Orbitron, sans-serif", fontSize: 10, fontWeight: 700, color: "rgba(255,255,255,0.5)", letterSpacing: "0.2em" }}>
            0{character.id} / 04
          </span>
        </div>

        {/* Character viewer */}
        <div
          className="relative z-10 w-full flex justify-center items-center select-none"
          style={{ maxWidth: 520, minHeight: 480, WebkitTouchCallout: "none" }}
          onMouseEnter={handleCardMouseEnter}
          onMouseLeave={handleCardMouseLeave}
          onTouchStart={handleCardMouseEnter}
          onTouchEnd={handleCardMouseLeave}
          onContextMenu={(e) => e.preventDefault()}
        >
          {/* Card behind the model with CSS 3D tilt */}
          {(character as any).cardImage && (
            <img 
              src={(character as any).cardImage} 
              alt={`${character.name} Card`} 
              className="absolute z-10 w-full max-w-[280px] lg:max-w-[340px] rounded-2xl shadow-2xl"
              style={{ 
                top: "50%", 
                transform: `translateY(${isCardStraight ? "-55%" : "-50%"}) perspective(1000px) rotateX(${isCardStraight ? 0 : 30}deg) scale(0.95)`, 
                border: `1px solid ${character.colorBorder}`,
                transformOrigin: "bottom",
                transition: "transform 1.5s cubic-bezier(0.25, 1, 0.5, 1)"
              }}
            />
          )}
          <div className="relative z-20 w-full" style={{ height: "100%", minHeight: 480 }}>
            <Character3DViewer
              modelPath={character.modelPath}
              cardImage={(character as any).cardImage}
              gradient={character.gradient}
              colorFrom={character.colorFrom}
              colorTo={character.colorTo}
              name={character.name}
            />
          </div>
        </div>

        {/* Bottom-left: big name overlay */}
        <div className="hidden lg:block absolute bottom-0 left-0 right-0 z-20 px-6 pb-6 lg:pb-10 pointer-events-none select-none">
          <p style={{ fontSize: "clamp(8px, 1.5vw, 10px)", letterSpacing: "0.3em", color: "rgba(255,255,255,0.3)", textTransform: "uppercase", fontFamily: "Menlo, monospace", marginBottom: 4 }}>
            TEAM CORE — ARCHITECTS OF THE TERMINAL
          </p>
          <h1
            style={{
              fontFamily: "Orbitron, sans-serif",
              fontWeight: 900,
              fontStyle: "italic",
              fontSize: "clamp(2.5rem, 8vw, 6rem)",
              lineHeight: 0.9,
              background: character.gradient,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              letterSpacing: "0.02em",
              textTransform: "uppercase",
              opacity: 0.85,
            }}
          >
            {character.name}
          </h1>
        </div>
      </div>

      {/* ══════════════════════════════════════════
          RIGHT — Floating Dossier Card
      ══════════════════════════════════════════ */}
      <div className="flex items-center justify-center px-4 py-6 lg:py-10 lg:pr-8 relative z-20 flex-shrink-0 w-full lg:w-auto">
        <motion.div
          className="w-full rounded-3xl overflow-hidden"
          style={{
            maxWidth: 400,
            background: "rgba(18, 18, 26, 0.92)",
            border: "1px solid rgba(255,255,255,0.08)",
            backdropFilter: "blur(24px)",
            boxShadow: `0 32px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.04)`,
          }}
          initial={{ opacity: 0, x: 40, y: 0 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Card header */}
          <div className="px-6 pt-6 pb-4 flex items-center justify-between" style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
            <div>
              <p style={{ fontSize: 10, letterSpacing: "0.25em", color: "rgba(255,255,255,0.3)", textTransform: "uppercase", fontFamily: "Menlo, monospace" }}>
                DOSSIER
              </p>
              <p style={{ fontFamily: "Orbitron, sans-serif", fontWeight: 700, fontSize: "clamp(1rem, 3vw, 1.2rem)", color: "#fff", marginTop: 2, letterSpacing: "0.05em" }}>
                {character.name}
              </p>
            </div>
            <div
              className="px-3 py-1.5 rounded-full text-xs font-bold"
              style={{
                background: `linear-gradient(135deg, ${character.colorFrom}28, ${character.colorTo}28)`,
                border: `1px solid ${character.colorBorder}`,
                color: character.colorFrom,
                fontFamily: "Orbitron, sans-serif",
                fontSize: 9,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
              }}
            >
              {character.role}
            </div>
          </div>

          {/* Action cards list */}
          <div className="px-4 py-4 flex flex-col gap-3">
            <AnimatePresence>
              {actions.map((action, i) => {
                const isPrimary = action.style === "primary";
                const isAccent = action.style === "accent";

                return (
                  <motion.button
                    key={action.label}
                    onClick={action.onClick}
                    className="w-full text-left rounded-2xl overflow-hidden relative group"
                    style={{
                      background: isPrimary
                        ? character.gradient
                        : isAccent
                          ? `linear-gradient(135deg, ${character.colorFrom}33, ${character.colorTo}22)`
                          : "rgba(255,255,255,0.04)",
                      border: isPrimary
                        ? "none"
                        : isAccent
                          ? `1px solid ${character.colorBorder}`
                          : "1px solid rgba(255,255,255,0.07)",
                      padding: "14px 16px",
                    }}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15 + i * 0.07, duration: 0.35 }}
                    whileHover={{ scale: 1.015, transition: { duration: 0.15 } }}
                    whileTap={{ scale: 0.98 }}
                    data-testid={`action-${action.label.toLowerCase().replace(/\s+/g, "-")}`}
                  >
                    {/* Hover shine for non-primary */}
                    {!isPrimary && (
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl" style={{ background: `${character.colorFrom}0f` }} />
                    )}

                    <div className="flex items-center gap-3 relative z-10">
                      {/* Icon badge */}
                      <div
                        className="rounded-xl flex items-center justify-center flex-shrink-0"
                        style={{
                          width: 42,
                          height: 42,
                          background: isPrimary
                            ? "rgba(255,255,255,0.2)"
                            : isAccent
                              ? `${character.colorFrom}33`
                              : "rgba(255,255,255,0.06)",
                          color: isPrimary ? "#fff" : character.colorFrom,
                        }}
                      >
                        <action.icon size={18} />
                      </div>

                      {/* Text */}
                      <div className="flex-1 min-w-0">
                        <p
                          style={{
                            fontFamily: "Orbitron, sans-serif",
                            fontWeight: 700,
                            fontStyle: "italic",
                            fontSize: "clamp(0.78rem, 2vw, 0.9rem)",
                            letterSpacing: "0.06em",
                            textTransform: "uppercase",
                            color: isPrimary ? "#fff" : "#fff",
                            lineHeight: 1.2,
                          }}
                        >
                          {action.label}
                        </p>
                        <p
                          className="truncate mt-0.5"
                          style={{
                            fontSize: 11,
                            color: isPrimary ? "rgba(255,255,255,0.7)" : "rgba(255,255,255,0.35)",
                            fontFamily: "Menlo, monospace",
                            letterSpacing: "0.02em",
                          }}
                        >
                          {action.sub}
                        </p>
                      </div>

                      {/* Right indicator */}
                      <div
                        className="rounded-lg flex items-center justify-center flex-shrink-0"
                        style={{
                          width: 32,
                          height: 32,
                          background: isPrimary ? "rgba(255,255,255,0.2)" : "rgba(255,255,255,0.05)",
                          color: isPrimary ? "#fff" : "rgba(255,255,255,0.3)",
                          fontSize: 14,
                          fontWeight: 700,
                        }}
                      >
                        {action.isActive ? (
                          <span className="block w-2.5 h-2.5 rounded-full animate-pulse" style={{ background: character.colorFrom }} />
                        ) : (
                          "›"
                        )}
                      </div>
                    </div>
                  </motion.button>
                );
              })}
            </AnimatePresence>
          </div>

          {/* Card footer */}
          <motion.div
            className="mx-4 mb-4 rounded-2xl px-5 py-4 flex items-center justify-between"
            style={{ background: character.gradient }}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55, duration: 0.35 }}
          >
            <div>
              <p style={{ fontSize: 9, letterSpacing: "0.2em", color: "rgba(255,255,255,0.6)", textTransform: "uppercase", fontFamily: "Menlo, monospace" }}>
                TEAM CORE
              </p>
              <p style={{ fontFamily: "Orbitron, sans-serif", fontWeight: 900, fontStyle: "italic", fontSize: "clamp(0.9rem, 2.5vw, 1.1rem)", color: "#fff", letterSpacing: "0.04em", marginTop: 2 }}>
                ARCHITECTS OF THE TERMINAL
              </p>
            </div>
            <div
              className="rounded-xl flex items-center justify-center font-black"
              style={{
                width: 44,
                height: 44,
                background: "rgba(255,255,255,0.2)",
                fontFamily: "Orbitron, sans-serif",
                fontSize: "clamp(0.65rem, 1.5vw, 0.75rem)",
                color: "#fff",
                letterSpacing: "0.05em",
                flexShrink: 0,
              }}
            >
              {character.name.slice(0, 2)}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
