import { characters } from "../data/characters";

interface CharacterCardProps {
  character: typeof characters[0];
}

export default function CharacterCard({ character }: CharacterCardProps) {
  return (
    <div
      className="absolute inset-4 sm:inset-8 lg:inset-12 z-0 pointer-events-none"
      style={{ opacity: 0.35, mixBlendMode: "screen" }}
    >
      <div
        className="w-full h-full relative p-6 sm:p-8 flex flex-col justify-between overflow-hidden"
        style={{
          border: `1px solid ${character.colorBorder}`,
          clipPath: "polygon(0 0, calc(100% - 20px) 0, 100% 20px, 100% 100%, 20px 100%, 0 calc(100% - 20px))",
        }}
      >
        {/* Grid background */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(${character.color}15 1px, transparent 1px), linear-gradient(90deg, ${character.color}15 1px, transparent 1px)`,
            backgroundSize: "24px 24px",
          }}
        />

        {/* Top row */}
        <div className="relative z-10 flex justify-between items-start">
          <div
            className="font-mono text-sm sm:text-base font-bold"
            style={{ color: character.color, fontFamily: "Orbitron, sans-serif" }}
          >
            NO. 0{character.id}
          </div>
          <div className="w-12 h-3" style={{ borderTop: `1px solid ${character.color}`, borderRight: `1px solid ${character.color}` }} />
        </div>

        {/* Large background name */}
        <div
          className="absolute font-black italic text-[80px] sm:text-[120px] leading-none pointer-events-none select-none"
          style={{
            color: `${character.color}08`,
            fontFamily: "Orbitron, sans-serif",
            bottom: "60px",
            left: "-10px",
            whiteSpace: "nowrap",
          }}
        >
          {character.name}
        </div>

        {/* Bottom info */}
        <div className="relative z-10 self-end text-right">
          <div className="w-8 h-8 inline-block mb-2" style={{ borderBottom: `1px solid ${character.color}`, borderLeft: `1px solid ${character.color}` }} />
          <p
            className="font-mono text-[9px] sm:text-[10px] tracking-widest uppercase"
            style={{ color: `${character.color}99` }}
          >
            STATUS: ACTIVE<br />
            ROLE: {character.role}<br />
            ID: {character.slug.toUpperCase()}
          </p>
        </div>
      </div>
    </div>
  );
}
