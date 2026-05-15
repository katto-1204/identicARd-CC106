import { characters } from "../data/characters";

interface CharacterCardProps {
  character: typeof characters[0];
}

export default function CharacterCard({ character }: CharacterCardProps) {
  return (
    <div className="absolute inset-4 md:inset-12 z-0 opacity-40 mix-blend-screen pointer-events-none">
      <div className="w-full h-full border border-primary/30 clip-angled-br relative p-8 flex flex-col justify-between overflow-hidden">
        {/* Decorative Grid background */}
        <div className="absolute inset-0 grid grid-cols-[repeat(10,1fr)] grid-rows-[repeat(10,1fr)] gap-0 border-[0.5px] border-primary/10 opacity-20">
          {Array.from({ length: 100 }).map((_, i) => (
            <div key={i} className="border-[0.5px] border-primary/10" />
          ))}
        </div>
        
        <div className="relative z-10 flex justify-between items-start">
          <div className="text-primary font-mono text-xl">
            NO. 0{character.id}
          </div>
          <div className="w-16 h-4 border-t border-r border-primary/50" />
        </div>

        <div className="relative z-10 font-black text-[120px] leading-none text-primary/10 rotate-[-90deg] origin-bottom-left absolute bottom-0 left-0 whitespace-nowrap overflow-hidden">
          {character.name}
        </div>

        <div className="relative z-10 self-end text-right">
          <div className="w-12 h-12 border-b border-l border-primary/50 inline-block mb-4" />
          <p className="font-mono text-xs text-primary/60 tracking-widest uppercase">
            STATUS: ACTIVE<br/>
            ROLE: {character.role}<br/>
            ID: {character.slug.toUpperCase()}
          </p>
        </div>
      </div>
    </div>
  );
}
