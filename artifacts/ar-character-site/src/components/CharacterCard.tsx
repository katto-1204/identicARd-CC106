import { characters } from "../data/characters";

interface CharacterCardProps {
  character: typeof characters[0];
}

export default function CharacterCard({ character }: CharacterCardProps) {
  return (
    <div
      className="absolute inset-6 sm:inset-10 lg:inset-14 z-0 pointer-events-none rounded"
      style={{ opacity: 0.25, border: `1px solid ${character.colorFrom}33` }}
    >
      <div className="w-full h-full relative p-6 flex flex-col justify-between overflow-hidden rounded">
        {/* Top */}
        <div className="flex justify-between items-start">
          <span style={{ fontFamily: "Orbitron, sans-serif", fontSize: 12, fontWeight: 700, color: character.colorFrom }}>
            NO. 0{character.id}
          </span>
          <div style={{ width: 24, height: 24, borderTop: `1px solid ${character.colorFrom}55`, borderRight: `1px solid ${character.colorFrom}55` }} />
        </div>

        {/* Large name background */}
        <div
          className="absolute font-black italic select-none"
          style={{
            fontFamily: "Orbitron, sans-serif",
            fontSize: "clamp(60px, 14vw, 110px)",
            background: character.gradient,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            opacity: 0.12,
            bottom: 48,
            left: -8,
            whiteSpace: "nowrap",
            lineHeight: 1,
          }}
        >
          {character.name}
        </div>

        {/* Bottom */}
        <div className="self-end text-right">
          <p style={{ fontFamily: "Menlo, monospace", fontSize: 9, letterSpacing: "0.15em", textTransform: "uppercase", color: `${character.colorFrom}77`, lineHeight: 1.7 }}>
            STATUS: ACTIVE<br />
            ID: {character.slug.toUpperCase()}
          </p>
        </div>
      </div>
    </div>
  );
}
