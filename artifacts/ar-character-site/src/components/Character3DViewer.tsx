import { motion } from "framer-motion";

interface Character3DViewerProps {
  modelPath: string;
  color: string;
  name: string;
}

export default function Character3DViewer({ modelPath: _modelPath, color, name }: Character3DViewerProps) {
  const initials = name.slice(0, 2).toUpperCase();

  return (
    <div
      className="w-full h-full min-h-[280px] sm:min-h-[380px] flex items-center justify-center relative"
      data-testid="character-3d-viewer"
    >
      {/* Ambient glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse 55% 65% at 50% 60%, ${color}22 0%, transparent 70%)`,
        }}
      />

      {/* Outer rotating ring */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width: "clamp(200px, 45vw, 300px)",
          height: "clamp(200px, 45vw, 300px)",
          border: `1px solid ${color}33`,
        }}
        animate={{ rotate: 360 }}
        transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
      />

      {/* Mid dashed ring */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width: "clamp(150px, 33vw, 230px)",
          height: "clamp(150px, 33vw, 230px)",
          border: `1px dashed ${color}44`,
        }}
        animate={{ rotate: -360 }}
        transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
      />

      {/* Inner ring */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width: "clamp(106px, 24vw, 162px)",
          height: "clamp(106px, 24vw, 162px)",
          border: `1px solid ${color}55`,
        }}
        animate={{ rotate: 360 }}
        transition={{ duration: 7, repeat: Infinity, ease: "linear" }}
      />

      {/* Tick marks */}
      {[0, 90, 180, 270].map((deg) => (
        <div
          key={deg}
          className="absolute"
          style={{
            width: 10, height: 2,
            backgroundColor: color,
            top: "50%", left: "50%",
            transformOrigin: `calc(-1 * clamp(100px, 22.5vw, 150px)) 0`,
            transform: `rotate(${deg}deg) translateY(-50%)`,
            opacity: 0.7,
          }}
        />
      ))}

      {/* Floating silhouette */}
      <motion.div
        className="relative z-10 flex flex-col items-center"
        animate={{ y: [0, -12, 0] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
      >
        {/* Head */}
        <div
          className="rounded-full"
          style={{
            width: "clamp(40px, 9vw, 58px)",
            height: "clamp(40px, 9vw, 58px)",
            background: `radial-gradient(circle, ${color}cc 0%, ${color}44 100%)`,
            border: `2px solid ${color}`,
            boxShadow: `0 0 20px ${color}88`,
          }}
        />
        {/* Neck */}
        <div style={{ width: 14, height: 10, background: `${color}55` }} />
        {/* Torso */}
        <div
          style={{
            width: "clamp(56px, 12vw, 76px)",
            height: "clamp(64px, 14vw, 90px)",
            background: `linear-gradient(180deg, ${color}77 0%, ${color}22 100%)`,
            border: `1.5px solid ${color}88`,
            boxShadow: `0 0 18px ${color}33`,
            clipPath: "polygon(10% 0%, 90% 0%, 100% 100%, 0% 100%)",
          }}
        />
        {/* Legs */}
        <div className="flex gap-2">
          {[0, 1].map((i) => (
            <div
              key={i}
              style={{
                width: "clamp(18px, 4vw, 24px)",
                height: "clamp(48px, 10vw, 68px)",
                background: `linear-gradient(180deg, ${color}55, ${color}11)`,
                border: `1px solid ${color}55`,
                clipPath: i === 0
                  ? "polygon(0 0, 100% 0, 88% 100%, 0 100%)"
                  : "polygon(0 0, 100% 0, 100% 100%, 12% 100%)",
              }}
            />
          ))}
        </div>
      </motion.div>

      {/* Label badge */}
      <motion.div
        className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 font-black italic text-[10px] sm:text-xs px-3 py-1 whitespace-nowrap"
        style={{
          color,
          border: `1px solid ${color}44`,
          background: `${color}0f`,
          clipPath: "polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%)",
          letterSpacing: "0.2em",
          fontFamily: "Orbitron, sans-serif",
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        {initials} // AR MODEL
      </motion.div>

      {/* Scan sweep */}
      <motion.div
        className="absolute left-0 right-0 pointer-events-none h-px"
        style={{ background: `linear-gradient(90deg, transparent, ${color}66, transparent)` }}
        animate={{ top: ["10%", "88%", "10%"] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}
