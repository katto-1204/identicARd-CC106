import { useParams, Redirect } from "wouter";
import { useState, useRef } from "react";
import { Mail, Volume2, Square, Phone, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";
import { characters } from "../data/characters";
import BackButton from "./BackButton";
import Character3DViewer from "./Character3DViewer";

export default function CharacterProfilePage() {
  const { slug } = useParams();
  const character = characters.find((c) => c.slug === slug);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

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

  const actions = [
    { label: "EMAIL", icon: Mail, onClick: () => window.open(`mailto:${character.email}`) },
    { label: isPlaying ? "PAUSE RECORD" : "PLAY VOICE RECORD", icon: isPlaying ? Square : Volume2, onClick: toggleAudio, isActive: isPlaying },
    { label: "PORTFOLIO", icon: ExternalLink, onClick: () => window.open(character.portfolio, "_blank") },
    { label: "CALL", icon: Phone, onClick: () => window.open(`tel:${character.phone}`) },
  ];

  return (
    <div
      className="min-h-screen flex flex-col lg:flex-row relative overflow-hidden"
      style={{ background: "#0a0c10" }}
      data-testid={`page-profile-${character.slug}`}
    >
      <BackButton color={character.colorFrom} />

      {/* Left: Visual */}
      <div
        className="w-full lg:w-1/2 relative flex items-center justify-center"
        style={{ minHeight: "clamp(280px, 50vw, 520px)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}
      >
        {/* Soft gradient bg */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(ellipse 60% 55% at 50% 55%, ${character.colorDim} 0%, transparent 70%)`,
          }}
        />

        <div className="w-full h-full relative z-10" style={{ minHeight: "clamp(280px, 50vw, 520px)" }}>
          <Character3DViewer
            modelPath={character.modelPath}
            gradient={character.gradient}
            colorFrom={character.colorFrom}
            colorTo={character.colorTo}
            name={character.name}
          />
        </div>
      </div>

      {/* Right: Info */}
      <div
        className="w-full lg:w-1/2 flex flex-col justify-center px-6 sm:px-10 lg:px-14 py-8 lg:py-14 relative z-10 overflow-y-auto"
        style={{ borderLeft: "1px solid rgba(255,255,255,0.06)" }}
      >
        {/* Role badge */}
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-6 sm:mb-8"
        >
          <div
            className="inline-block px-3 py-1 mb-3 text-xs font-bold tracking-widest uppercase rounded"
            style={{
              background: character.colorDim,
              border: `1px solid ${character.colorBorder}`,
              color: character.colorFrom,
            }}
          >
            {character.role}
          </div>

          {/* Name with gradient */}
          <h1
            style={{
              fontFamily: "Orbitron, sans-serif",
              fontWeight: 900,
              fontStyle: "italic",
              fontSize: "clamp(2rem, 6.5vw, 4.5rem)",
              lineHeight: 1.05,
              background: character.gradient,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              letterSpacing: "0.03em",
              textTransform: "uppercase",
              wordBreak: "break-word",
            }}
          >
            {character.name}
          </h1>

          <div style={{ height: 2, marginTop: 12, width: 56, background: character.gradient, borderRadius: 1 }} />
        </motion.div>

        {/* Actions */}
        <motion.div
          className="flex flex-col gap-3 w-full max-w-lg"
          initial="hidden"
          animate="visible"
          variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.08 } } }}
        >
          {actions.map((action) => (
            <motion.div
              key={action.label}
              variants={{ hidden: { opacity: 0, x: 20 }, visible: { opacity: 1, x: 0 } }}
            >
              <motion.button
                whileHover={{ x: 4 }}
                whileTap={{ scale: 0.98 }}
                onClick={action.onClick}
                className="w-full text-left group relative overflow-hidden"
                style={{
                  background: action.isActive ? character.colorDim : "#12151c",
                  border: `1px solid ${action.isActive ? character.colorBorder : "rgba(255,255,255,0.08)"}`,
                  borderRadius: 6,
                  transition: "all 0.2s",
                }}
                data-testid={`action-${action.label.toLowerCase().replace(/\s+/g, "-")}`}
              >
                <div className="flex items-center px-4 sm:px-5 py-3.5 sm:py-4 gap-4">
                  <div style={{ color: action.isActive ? character.colorFrom : "rgba(255,255,255,0.4)", flexShrink: 0 }}>
                    <action.icon size={18} />
                  </div>
                  <div
                    className="flex-1 pl-4"
                    style={{ borderLeft: "1px solid rgba(255,255,255,0.1)" }}
                  >
                    <span
                      style={{
                        fontFamily: "Orbitron, sans-serif",
                        fontWeight: 700,
                        fontStyle: "italic",
                        fontSize: "clamp(0.85rem, 2.5vw, 1.1rem)",
                        letterSpacing: "0.08em",
                        textTransform: "uppercase",
                        color: action.isActive ? character.colorFrom : "#fff",
                      }}
                    >
                      {action.label}
                    </span>
                  </div>
                  {action.isActive && (
                    <div
                      className="w-2 h-2 rounded-full animate-pulse flex-shrink-0"
                      style={{ background: character.colorFrom }}
                    />
                  )}
                </div>
              </motion.button>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="mt-8 sm:mt-12 pt-4 flex justify-between"
          style={{
            borderTop: "1px solid rgba(255,255,255,0.06)",
            fontSize: 9,
            fontFamily: "Menlo, monospace",
            letterSpacing: "0.15em",
            color: "rgba(255,255,255,0.18)",
            textTransform: "uppercase",
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          <span>DOSSIER: CLASSIFIED</span>
          <span>{new Date().getFullYear()} © CORE</span>
        </motion.div>
      </div>
    </div>
  );
}
