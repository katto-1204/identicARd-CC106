import { useParams, Redirect } from "wouter";
import { useState, useRef } from "react";
import { Mail, Volume2, Square, Phone, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";
import { characters } from "../data/characters";
import BackButton from "./BackButton";
import Character3DViewer from "./Character3DViewer";
import CharacterCard from "./CharacterCard";

export default function CharacterProfilePage() {
  const { slug } = useParams();
  const character = characters.find((c) => c.slug === slug);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  if (!character) {
    return <Redirect to="/home" />;
  }

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

  const handleEmail = () => window.open(`mailto:${character.email}`);
  const handlePhone = () => window.open(`tel:${character.phone}`);
  const handlePortfolio = () => window.open(character.portfolio, "_blank");

  return (
    <div
      className="min-h-screen flex flex-col lg:flex-row relative overflow-hidden"
      style={{ background: "linear-gradient(160deg, #0d0509 0%, #120408 50%, #0b0308 100%)" }}
      data-testid={`page-profile-${character.slug}`}
    >
      <div className="scanlines pointer-events-none" />
      <BackButton color={character.color} />

      {/* Left Column: Visual */}
      <div
        className="w-full lg:w-1/2 relative flex items-center justify-center"
        style={{
          minHeight: "clamp(300px, 50vw, 560px)",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        {/* Radial glow behind character */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(ellipse 70% 60% at 50% 55%, ${character.colorDim} 0%, transparent 70%)`,
          }}
        />

        <CharacterCard character={character} />

        <div className="w-full h-full relative z-10 min-h-[280px] sm:min-h-[380px] lg:min-h-full">
          <Character3DViewer
            modelPath={character.modelPath}
            color={character.color}
            name={character.name}
          />
        </div>
      </div>

      {/* Right Column: Info */}
      <div
        className="w-full lg:w-1/2 flex flex-col justify-center px-6 sm:px-10 lg:px-16 py-8 lg:py-16 relative z-10 overflow-y-auto"
        style={{ borderLeft: "1px solid rgba(255,255,255,0.06)" }}
      >
        {/* Name & role */}
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6 sm:mb-10"
        >
          <div
            className="inline-block text-[10px] sm:text-xs font-bold tracking-widest px-3 py-1 mb-3 uppercase"
            style={{
              border: `1px solid ${character.colorBorder}`,
              color: character.color,
              background: character.colorDim,
              clipPath: "polygon(6px 0%, 100% 0%, calc(100% - 6px) 100%, 0% 100%)",
            }}
          >
            {character.role}
          </div>
          <h1
            className="font-black italic uppercase leading-none"
            style={{
              fontFamily: "Orbitron, sans-serif",
              fontSize: "clamp(2.5rem, 8vw, 5rem)",
              color: "#ffffff",
              textShadow: `0 0 30px ${character.color}66`,
            }}
          >
            {character.name}
          </h1>
          <div
            className="h-0.5 mt-3 w-24"
            style={{ background: `linear-gradient(90deg, ${character.color}, transparent)` }}
          />
        </motion.div>

        {/* Action boxes */}
        <motion.div
          className="flex flex-col gap-3 sm:gap-4 w-full max-w-lg"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
          }}
        >
          {[
            { label: "EMAIL", icon: Mail, onClick: handleEmail },
            { label: isPlaying ? "PAUSE RECORD" : "PLAY VOICE RECORD", icon: isPlaying ? Square : Volume2, onClick: toggleAudio, isActive: isPlaying },
            { label: "PORTFOLIO", icon: ExternalLink, onClick: handlePortfolio },
            { label: "CALL", icon: Phone, onClick: handlePhone },
          ].map((action) => (
            <motion.div
              key={action.label}
              variants={{ hidden: { opacity: 0, x: 24 }, visible: { opacity: 1, x: 0 } }}
            >
              <motion.button
                whileHover={{ x: 6, scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                onClick={action.onClick}
                className="w-full text-left group relative overflow-hidden transition-all duration-300"
                style={{
                  background: action.isActive ? character.colorDim : "#12060a",
                  border: `1px solid ${action.isActive ? character.color : character.colorBorder}`,
                  clipPath: "polygon(0 0, calc(100% - 14px) 0, 100% 14px, 100% 100%, 14px 100%, 0 calc(100% - 14px))",
                  boxShadow: action.isActive ? `0 0 16px ${character.colorDim}` : "none",
                }}
                data-testid={`action-${action.label.toLowerCase().replace(/\s+/g, "-")}`}
              >
                {/* Hover fill */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                  style={{ background: character.colorDim }}
                />

                <div className="relative flex items-center px-4 sm:px-5 py-3 sm:py-4 gap-4">
                  <div
                    className="flex-shrink-0 transition-colors"
                    style={{ color: action.isActive ? character.color : "rgba(255,255,255,0.4)" }}
                  >
                    <action.icon size={20} />
                  </div>
                  <div
                    className="flex-1 pl-4"
                    style={{ borderLeft: `1px solid ${character.colorBorder}` }}
                  >
                    <span
                      className="text-base sm:text-xl font-black italic tracking-wider uppercase text-white group-hover:brightness-110 transition-all"
                      style={{ fontFamily: "Orbitron, sans-serif" }}
                    >
                      {action.label}
                    </span>
                  </div>
                  {action.isActive && (
                    <div
                      className="w-2 h-2 rounded-full animate-pulse flex-shrink-0"
                      style={{ background: character.color, boxShadow: `0 0 8px ${character.color}` }}
                    />
                  )}
                </div>
              </motion.button>
            </motion.div>
          ))}
        </motion.div>

        {/* Footer */}
        <motion.div
          className="mt-8 sm:mt-14 pt-4 flex justify-between text-[9px] sm:text-[10px] font-mono text-white/20 uppercase tracking-widest"
          style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
        >
          <span>DOSSIER: CLASSIFIED</span>
          <span>{new Date().getFullYear()} © CORE</span>
        </motion.div>
      </div>
    </div>
  );
}
