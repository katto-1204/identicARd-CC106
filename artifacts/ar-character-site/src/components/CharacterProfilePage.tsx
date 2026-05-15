import { useParams, Redirect } from "wouter";
import { useState, useRef } from "react";
import { Mail, Volume2, SquareSquare, Phone, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";
import { characters } from "../data/characters";
import BackButton from "./BackButton";
import Character3DViewer from "./Character3DViewer";
import CharacterCard from "./CharacterCard";
import ActionBox from "./ActionBox";

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
      audioRef.current.play().catch(e => {
        console.error("Audio playback failed (expected without real audio file):", e);
        // Simulate playing for UI purposes if audio fails
        setIsPlaying(true);
        setTimeout(() => setIsPlaying(false), 3000); 
      });
      setIsPlaying(true);
    }
  };

  const handleEmail = () => window.open(`mailto:${character.email}`);
  const handlePhone = () => window.open(`tel:${character.phone}`);
  const handlePortfolio = () => window.open(character.portfolio, '_blank');

  return (
    <div className="min-h-screen bg-background flex flex-col md:flex-row relative overflow-hidden" data-testid={`page-profile-${character.slug}`}>
      <div className="scanlines" />
      <BackButton />

      {/* Left Column: 3D / Visual Area */}
      <div className="w-full md:w-1/2 relative h-[50vh] md:h-screen bg-black/40 border-b md:border-b-0 md:border-r border-primary/20 flex items-center justify-center p-4">
        {/* Glow behind character */}
        <div 
          className="absolute inset-0 rounded-full blur-[100px] opacity-20 pointer-events-none" 
          style={{ backgroundColor: character.color }} 
        />
        
        <CharacterCard character={character} />
        
        <div className="w-full h-full relative z-10">
          <Character3DViewer modelPath={character.modelPath} color={character.color} name={character.name} />
        </div>
      </div>

      {/* Right Column: Info Panel */}
      <div className="w-full md:w-1/2 p-8 md:p-16 flex flex-col justify-center relative z-10 bg-background/80 backdrop-blur-sm overflow-y-auto h-[50vh] md:h-screen">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="inline-block border border-primary/50 text-primary px-4 py-1 text-sm font-bold tracking-widest clip-angled-br mb-4 uppercase">
            {character.role}
          </div>
          <h1 className="text-5xl md:text-7xl font-black italic tracking-wider text-white glow-text uppercase mb-12 leading-none">
            {character.name}
          </h1>
        </motion.div>

        <motion.div 
          className="flex flex-col gap-4 max-w-lg"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.1 }
            }
          }}
        >
          <motion.div variants={{ hidden: { opacity: 0, x: 20 }, visible: { opacity: 1, x: 0 }}}>
            <ActionBox 
              label="Email Operative" 
              icon={Mail} 
              onClick={handleEmail} 
            />
          </motion.div>

          <motion.div variants={{ hidden: { opacity: 0, x: 20 }, visible: { opacity: 1, x: 0 }}}>
            <ActionBox 
              label={isPlaying ? "PAUSE RECORD" : "PLAY VOICE RECORD"} 
              icon={isPlaying ? SquareSquare : Volume2} 
              onClick={toggleAudio}
              isActive={isPlaying}
            />
          </motion.div>

          <motion.div variants={{ hidden: { opacity: 0, x: 20 }, visible: { opacity: 1, x: 0 }}}>
            <ActionBox 
              label="View Portfolio" 
              icon={ExternalLink} 
              onClick={handlePortfolio} 
            />
          </motion.div>

          <motion.div variants={{ hidden: { opacity: 0, x: 20 }, visible: { opacity: 1, x: 0 }}}>
            <ActionBox 
              label="Secure Comms" 
              icon={Phone} 
              onClick={handlePhone} 
            />
          </motion.div>
        </motion.div>

        <motion.div 
          className="mt-16 pt-8 border-t border-primary/20 flex justify-between text-muted-foreground font-mono text-xs uppercase"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <span>DOSSIER: CLASSIFIED</span>
          <span>{new Date().getFullYear()} © CORE</span>
        </motion.div>
      </div>
    </div>
  );
}
