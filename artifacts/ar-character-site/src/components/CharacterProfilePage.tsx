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
      style={{ background: "#07080f" }}
      data-testid={`page-profile-${character.slug}`}
    >
      <BackButton color={character.colorFrom} gradient={character.gradient} />

      {/* Left: Visual */}
      <div
        className="w-full lg:w-1/2 relative flex items-center justify-center"
        style={{ minHeight: "clamp(320px, 50vw, 560px)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}
      >
        {/* Top Accent Line */}
        <div className="absolute top-0 left-0 right-0 h-1 z-20" style={{ background: character.gradient }} />

        {/* Soft radial gradient bg */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(ellipse 70% 65% at 50% 50%, ${character.colorDim} 0%, transparent 80%)`,
            opacity: 0.6,
          }}
        />

        {/* Geometric Decor */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
          <div className="absolute w-[40vw] h-[40vw] rounded-full top-1/4 -left-20" style={{ border: `1px solid ${character.colorFrom}`, opacity: 0.05 }} />
          <div className="absolute w-[30vw] h-[30vw] rounded-full bottom-10 -right-10" style={{ border: `1px solid ${character.colorTo}`, opacity: 0.05 }} />
        </div>

        <div className="w-full h-full relative z-10" style={{ minHeight: "clamp(320px, 50vw, 560px)" }}>
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
        className="w-full lg:w-1/2 flex flex-col justify-center px-6 sm:px-10 lg:px-14 py-10 lg:py-14 relative z-10 overflow-y-auto"
        style={{ borderLeft: "1px solid rgba(255,255,255,0.06)" }}
      >
        {/* Large Faded Number */}
        <div
          className="absolute top-10 right-10 pointer-events-none select-none"
          style={{
            fontFamily: "Orbitron, sans-serif",
            fontWeight: 900,
            fontStyle: "italic",
            fontSize: "12rem",
            color: "#fff",
            opacity: 0.04,
            lineHeight: 0.8,
          }}
        >
          0{character.id}
        </div>

        {/* Role badge */}
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-8 relative z-10"
        >
          <div
            className="inline-block px-4 py-1.5 mb-4 text-[10px] font-bold tracking-widest uppercase rounded-full"
            style={{
              background: `linear-gradient(135deg, ${character.colorFrom}33, ${character.colorTo}33)`,
              border: `1px solid ${character.colorBorder}`,
              color: character.colorFrom,
            }}
          >
            {character.role}
          </div>

          <div className="flex relative">
            {/* Decorative Left Border */}
            <div className="w-1 rounded-full mr-4 self-stretch my-2" style={{ background: character.gradient }} />
            
            {/* Name with gradient */}
            <h1
              style={{
                fontFamily: "Orbitron, sans-serif",
                fontWeight: 900,
                fontStyle: "italic",
                fontSize: "clamp(2.5rem, 6.5vw, 5rem)",
                lineHeight: 0.95,
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
          </div>

          <div className="h-[1px] w-full mt-10" style={{ background: `linear-gradient(90deg, ${character.colorFrom}88, transparent)` }} />
        </motion.div>

        {/* Actions */}
        <motion.div
          className="flex flex-col gap-4 w-full max-w-lg relative z-10"
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
                whileHover="hover"
                whileTap={{ scale: 0.98 }}
                onClick={action.onClick}
                className="w-full text-left group relative overflow-hidden card-glass flex items-center"
                style={{
                  borderLeft: `3px solid ${action.isActive ? character.colorFrom : 'transparent'}`,
                  transition: "all 0.2s",
                }}
                variants={{ hover: { x: 6, backgroundColor: character.colorDim, borderLeftColor: character.colorFrom } }}
                data-testid={`action-${action.label.toLowerCase().replace(/\s+/g, "-")}`}
              >
                <div className="flex items-center px-4 py-4 w-full gap-4">
                  <div className="w-10 h-10 rounded flex items-center justify-center shrink-0" style={{ background: character.colorDim, color: character.colorFrom }}>
                    <action.icon size={18} />
                  </div>
                  
                  <div className="flex-1">
                    <span
                      style={{
                        fontFamily: "Orbitron, sans-serif",
                        fontWeight: 700,
                        fontStyle: "italic",
                        fontSize: "clamp(0.9rem, 2.5vw, 1.1rem)",
                        letterSpacing: "0.08em",
                        textTransform: "uppercase",
                        color: "#fff",
                      }}
                    >
                      {action.label}
                    </span>
                  </div>

                  {action.isActive ? (
                    <div className="w-2 h-2 rounded-full animate-pulse flex-shrink-0" style={{ background: character.colorFrom }} />
                  ) : (
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity text-white/50 text-xl">
                      ›
                    </div>
                  )}
                </div>
              </motion.button>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="mt-12 pt-4 flex justify-between relative z-10"
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
