import { motion } from "framer-motion";

interface Character3DViewerProps {
  modelPath: string;
  gradient: string;
  colorFrom: string;
  colorTo: string;
  name: string;
}

export default function Character3DViewer({ modelPath: _modelPath, gradient, colorFrom, colorTo, name }: Character3DViewerProps) {
  const initials = name.slice(0, 2).toUpperCase();

  return (
    <div
      className="w-full h-full min-h-[280px] sm:min-h-[360px] flex items-center justify-center relative overflow-hidden"
      data-testid="character-3d-viewer"
    >
      {/* Outer slow ring */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width: "clamp(200px, 44vw, 290px)",
          height: "clamp(200px, 44vw, 290px)",
          border: `1px solid ${colorFrom}22`,
        }}
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      />

      {/* Inner ring */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width: "clamp(140px, 30vw, 200px)",
          height: "clamp(140px, 30vw, 200px)",
          border: `1px dashed ${colorTo}33`,
        }}
        animate={{ rotate: -360 }}
        transition={{ duration: 13, repeat: Infinity, ease: "linear" }}
      />

      {/* Floating character silhouette */}
      <motion.div
        className="relative z-10 flex flex-col items-center"
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        {/* Head */}
        <div
          className="rounded-full"
          style={{
            width: "clamp(38px, 8vw, 54px)",
            height: "clamp(38px, 8vw, 54px)",
            background: gradient,
            opacity: 0.9,
          }}
        />
        {/* Neck */}
        <div style={{ width: 12, height: 8, background: `${colorFrom}55` }} />
        {/* Torso */}
        <div
          style={{
            width: "clamp(50px, 11vw, 72px)",
            height: "clamp(60px, 13vw, 88px)",
            background: gradient,
            opacity: 0.75,
            clipPath: "polygon(10% 0%, 90% 0%, 100% 100%, 0% 100%)",
          }}
        />
        {/* Legs */}
        <div className="flex gap-2">
          {[0, 1].map((k) => (
            <div
              key={k}
              style={{
                width: "clamp(16px, 3.5vw, 22px)",
                height: "clamp(44px, 9.5vw, 64px)",
                background: gradient,
                opacity: 0.6,
                clipPath: k === 0
                  ? "polygon(0 0, 100% 0, 88% 100%, 0 100%)"
                  : "polygon(0 0, 100% 0, 100% 100%, 12% 100%)",
              }}
            />
          ))}
        </div>
      </motion.div>

      {/* Initials badge */}
      <motion.div
        className="absolute bottom-5 left-1/2 -translate-x-1/2 px-4 py-1 font-black italic text-xs whitespace-nowrap"
        style={{
          fontFamily: "Orbitron, sans-serif",
          background: gradient,
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
          border: `1px solid ${colorFrom}33`,
          borderRadius: 3,
          letterSpacing: "0.18em",
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        {initials} // AR MODEL
      </motion.div>
    </div>
  );
}
