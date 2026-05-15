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
      className="w-full h-full min-h-[340px] md:min-h-full flex items-center justify-center relative"
      data-testid="character-3d-viewer"
    >
      {/* Ambient glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse 60% 70% at 50% 60%, ${color}33 0%, transparent 70%)`,
        }}
      />

      {/* Outer ring */}
      <motion.div
        className="absolute rounded-full border opacity-20"
        style={{ width: 320, height: 320, borderColor: color }}
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      />

      {/* Middle ring — counter-rotate */}
      <motion.div
        className="absolute rounded-full border opacity-30"
        style={{ width: 240, height: 240, borderColor: color, borderStyle: "dashed" }}
        animate={{ rotate: -360 }}
        transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
      />

      {/* Inner ring */}
      <motion.div
        className="absolute rounded-full border opacity-40"
        style={{ width: 170, height: 170, borderColor: color }}
        animate={{ rotate: 360 }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
      />

      {/* Corner tick marks on outer ring */}
      {[0, 90, 180, 270].map((deg) => (
        <motion.div
          key={deg}
          className="absolute"
          style={{
            width: 10,
            height: 3,
            backgroundColor: color,
            top: "50%",
            left: "50%",
            transformOrigin: "-155px 0",
            transform: `rotate(${deg}deg) translateY(-50%)`,
            opacity: 0.8,
          }}
        />
      ))}

      {/* Floating character silhouette */}
      <motion.div
        className="relative z-10 flex flex-col items-center justify-center"
        animate={{ y: [0, -14, 0] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
      >
        {/* Head */}
        <div
          className="rounded-full mb-0"
          style={{
            width: 56,
            height: 56,
            background: `linear-gradient(135deg, ${color}cc, ${color}55)`,
            boxShadow: `0 0 24px ${color}99, 0 0 8px ${color}`,
            border: `2px solid ${color}`,
          }}
        />
        {/* Neck */}
        <div style={{ width: 16, height: 12, background: `${color}66` }} />
        {/* Torso */}
        <div
          style={{
            width: 80,
            height: 96,
            background: `linear-gradient(180deg, ${color}88 0%, ${color}33 100%)`,
            border: `1.5px solid ${color}`,
            boxShadow: `0 0 20px ${color}55`,
            clipPath: "polygon(10% 0%, 90% 0%, 100% 100%, 0% 100%)",
          }}
        />
        {/* Legs */}
        <div className="flex gap-3 mt-0">
          {[0, 1].map((i) => (
            <div
              key={i}
              style={{
                width: 26,
                height: 70,
                background: `linear-gradient(180deg, ${color}66, ${color}22)`,
                border: `1px solid ${color}88`,
                clipPath: i === 0
                  ? "polygon(0 0, 100% 0, 90% 100%, 0 100%)"
                  : "polygon(0 0, 100% 0, 100% 100%, 10% 100%)",
              }}
            />
          ))}
        </div>
      </motion.div>

      {/* Initials badge */}
      <motion.div
        className="absolute bottom-6 left-1/2 -translate-x-1/2 font-black italic tracking-widest text-xs px-4 py-1"
        style={{
          color,
          border: `1px solid ${color}55`,
          background: `${color}11`,
          clipPath: "polygon(6px 0%, 100% 0%, calc(100% - 6px) 100%, 0% 100%)",
          letterSpacing: "0.25em",
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        {initials} // AR MODEL
      </motion.div>

      {/* Scan line sweep */}
      <motion.div
        className="absolute left-0 right-0 pointer-events-none"
        style={{
          height: 2,
          background: `linear-gradient(90deg, transparent, ${color}88, transparent)`,
          top: "10%",
        }}
        animate={{ top: ["10%", "90%", "10%"] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}
