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
      className="w-full h-full min-h-[320px] sm:min-h-[460px] flex items-center justify-center relative overflow-hidden"
      data-testid="character-3d-viewer"
    >
      {/* Outermost Faint Ring */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width: "clamp(260px, 60vw, 380px)",
          height: "clamp(260px, 60vw, 380px)",
          border: `1px solid ${colorFrom}11`,
        }}
        animate={{ rotate: -180 }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
      >
        <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 rotate-45" style={{ background: colorFrom, opacity: 0.5 }} />
        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 rotate-45" style={{ background: colorFrom, opacity: 0.5 }} />
        <div className="absolute top-1/2 -left-1 -translate-y-1/2 w-2 h-2 rotate-45" style={{ background: colorFrom, opacity: 0.5 }} />
        <div className="absolute top-1/2 -right-1 -translate-y-1/2 w-2 h-2 rotate-45" style={{ background: colorFrom, opacity: 0.5 }} />
      </motion.div>

      {/* Outer slow ring */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width: "clamp(210px, 48vw, 310px)",
          height: "clamp(210px, 48vw, 310px)",
          border: `1px solid ${colorFrom}33`,
        }}
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      />

      {/* Inner dashed ring */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width: "clamp(150px, 34vw, 220px)",
          height: "clamp(150px, 34vw, 220px)",
          border: `1px dashed ${colorTo}44`,
        }}
        animate={{ rotate: -360 }}
        transition={{ duration: 13, repeat: Infinity, ease: "linear" }}
      />
      
      {/* Scan Sweep Line */}
      <motion.div
        className="absolute left-0 right-0 h-1 z-20"
        style={{ background: `linear-gradient(90deg, transparent, ${colorFrom}, transparent)`, opacity: 0.5 }}
        animate={{ top: ["0%", "100%", "0%"] }}
        transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
      />

      {/* Floating refined character silhouette */}
      <motion.div
        className="relative z-10 flex flex-col items-center"
        animate={{ y: [0, -12, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        {/* Head (Hexagon) */}
        <div
          style={{
            width: "clamp(40px, 8vw, 56px)",
            height: "clamp(40px, 8vw, 56px)",
            background: gradient,
            opacity: 0.9,
            clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
          }}
        />
        {/* Neck */}
        <div style={{ width: 14, height: 10, background: `${colorFrom}66`, marginTop: 2, marginBottom: 2 }} />
        
        {/* Upper Body Area (Shoulders + Torso + Arms) */}
        <div className="flex justify-center relative w-full items-start">
          {/* Left Arm */}
          <div style={{ width: "clamp(12px, 2.5vw, 18px)", height: "clamp(60px, 12vw, 80px)", background: gradient, opacity: 0.6, transform: "rotate(10deg)", transformOrigin: "top right", marginRight: 2 }} />
          
          {/* Torso */}
          <div
            style={{
              width: "clamp(60px, 13vw, 84px)",
              height: "clamp(75px, 16vw, 100px)",
              background: gradient,
              opacity: 0.8,
              clipPath: "polygon(20% 0%, 80% 0%, 100% 30%, 90% 100%, 10% 100%, 0% 30%)",
            }}
          />
          
          {/* Right Arm */}
          <div style={{ width: "clamp(12px, 2.5vw, 18px)", height: "clamp(60px, 12vw, 80px)", background: gradient, opacity: 0.6, transform: "rotate(-10deg)", transformOrigin: "top left", marginLeft: 2 }} />
        </div>
        
        {/* Waist/Hips */}
        <div style={{ width: "clamp(48px, 10vw, 68px)", height: 12, background: gradient, opacity: 0.7, marginTop: 2, clipPath: "polygon(0 0, 100% 0, 90% 100%, 10% 100%)" }} />

        {/* Legs */}
        <div className="flex gap-3 mt-2">
          {[0, 1].map((k) => (
            <div
              key={k}
              style={{
                width: "clamp(20px, 4.5vw, 28px)",
                height: "clamp(60px, 13vw, 85px)",
                background: gradient,
                opacity: 0.7,
                clipPath: k === 0
                  ? "polygon(0 0, 100% 0, 85% 100%, 15% 100%)"
                  : "polygon(0 0, 100% 0, 85% 100%, 15% 100%)",
              }}
            />
          ))}
        </div>
      </motion.div>

      {/* Initials badge */}
      <motion.div
        className="absolute bottom-6 left-1/2 -translate-x-1/2 px-6 py-1.5 font-black italic text-xs whitespace-nowrap rounded-sm"
        style={{
          fontFamily: "Orbitron, sans-serif",
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
