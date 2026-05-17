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
      className="w-full h-full flex items-center justify-center relative overflow-hidden"
      style={{ minHeight: "clamp(260px, 50vw, 520px)" }}
      data-testid="character-3d-viewer"
    >
      {/* Outermost ring with tick marks */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width: "min(72%, 340px)",
          height: "min(72%, 340px)",
          border: `1px solid ${colorFrom}11`,
        }}
        animate={{ rotate: -180 }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
      >
        {[
          { key: "tick-t", cls: "-top-1 left-1/2 -translate-x-1/2" },
          { key: "tick-b", cls: "-bottom-1 left-1/2 -translate-x-1/2" },
          { key: "tick-l", cls: "top-1/2 -left-1 -translate-y-1/2" },
          { key: "tick-r", cls: "top-1/2 -right-1 -translate-y-1/2" },
        ].map(({ key, cls }) => (
          <div
            key={key}
            className={`absolute ${cls} w-2 h-2 rotate-45`}
            style={{ background: colorFrom, opacity: 0.5 }}
          />
        ))}
      </motion.div>

      {/* Outer slow ring */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width: "min(58%, 275px)",
          height: "min(58%, 275px)",
          border: `1px solid ${colorFrom}33`,
        }}
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      />

      {/* Inner dashed ring */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width: "min(42%, 198px)",
          height: "min(42%, 198px)",
          border: `1px dashed ${colorTo}44`,
        }}
        animate={{ rotate: -360 }}
        transition={{ duration: 13, repeat: Infinity, ease: "linear" }}
      />

      {/* Scan Sweep Line */}
      <motion.div
        className="absolute left-0 right-0 z-20"
        style={{
          height: 2,
          background: `linear-gradient(90deg, transparent, ${colorFrom}bb, transparent)`,
        }}
        animate={{ top: ["0%", "100%", "0%"] }}
        transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
      />

      {/* Floating character silhouette */}
      <motion.div
        className="relative z-10 flex flex-col items-center"
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        {/* Head (Hexagon) */}
        <div
          style={{
            width: "clamp(36px, 7vw, 54px)",
            height: "clamp(36px, 7vw, 54px)",
            background: gradient,
            opacity: 0.9,
            clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
          }}
        />
        {/* Neck */}
        <div style={{ width: 12, height: 8, background: `${colorFrom}66`, marginTop: 2, marginBottom: 2 }} />

        {/* Shoulders + Torso + Arms */}
        <div className="flex justify-center relative items-start">
          <div style={{ width: "clamp(10px, 2vw, 16px)", height: "clamp(52px, 10vw, 76px)", background: gradient, opacity: 0.6, transform: "rotate(10deg)", transformOrigin: "top right", marginRight: 2 }} />
          <div
            style={{
              width: "clamp(52px, 11vw, 80px)",
              height: "clamp(68px, 14vw, 96px)",
              background: gradient,
              opacity: 0.85,
              clipPath: "polygon(20% 0%, 80% 0%, 100% 30%, 90% 100%, 10% 100%, 0% 30%)",
            }}
          />
          <div style={{ width: "clamp(10px, 2vw, 16px)", height: "clamp(52px, 10vw, 76px)", background: gradient, opacity: 0.6, transform: "rotate(-10deg)", transformOrigin: "top left", marginLeft: 2 }} />
        </div>

        {/* Waist */}
        <div style={{ width: "clamp(42px, 9vw, 64px)", height: 10, background: gradient, opacity: 0.7, marginTop: 2, clipPath: "polygon(0 0, 100% 0, 90% 100%, 10% 100%)" }} />

        {/* Legs */}
        <div className="flex gap-2 mt-1.5">
          {[0, 1].map((k) => (
            <div
              key={k}
              style={{
                width: "clamp(18px, 3.5vw, 26px)",
                height: "clamp(54px, 11vw, 80px)",
                background: gradient,
                opacity: 0.72,
                clipPath: "polygon(0 0, 100% 0, 85% 100%, 15% 100%)",
              }}
            />
          ))}
        </div>
      </motion.div>

      {/* Initials badge */}
      <motion.div
        className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 px-4 sm:px-6 py-1 sm:py-1.5 font-black italic whitespace-nowrap rounded-sm"
        style={{
          fontFamily: "Orbitron, sans-serif",
          fontSize: "clamp(9px, 1.8vw, 12px)",
          background: gradient,
          color: "#fff",
          letterSpacing: "0.25em",
          boxShadow: `0 4px 15px ${colorFrom}44`,
        }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        {initials} // AR MODEL
      </motion.div>
    </div>
  );
}
