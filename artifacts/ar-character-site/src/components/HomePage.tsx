import { Link } from "wouter";
import { motion } from "framer-motion";
import { characters } from "../data/characters";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background text-foreground relative overflow-hidden flex flex-col" data-testid="page-home">
      <div className="scanlines" />
      
      {/* Header */}
      <header className="relative z-20 pt-8 pb-4 px-8 border-b border-primary/20 bg-background/80 backdrop-blur-md flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-black italic tracking-widest text-primary glow-text">TEAM CORE</h1>
          <p className="text-xs tracking-[0.3em] text-muted-foreground">ARCHITECTS OF THE TERMINAL</p>
        </div>
        <div className="text-xs font-mono text-primary/50 hidden md:block">
          STATUS: <span className="text-green-400">ONLINE</span>
        </div>
      </header>

      <main className="flex-1 container mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
        
        {/* Left Column: Visual Composition */}
        <div className="hidden md:flex relative items-center justify-center h-full min-h-[60vh]">
          <div className="absolute inset-0 bg-primary/5 rounded-full blur-3xl" />
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="relative w-full max-w-md aspect-square"
          >
            {/* Abstract representation of the 4 characters */}
            {characters.map((char, i) => (
              <motion.div
                key={char.id}
                className="absolute inset-0 border border-primary/30 clip-angled bg-gradient-to-tr from-background to-primary/10 backdrop-blur-sm flex items-center justify-center"
                style={{
                  transform: `rotate(${i * 15 - 22.5}deg) scale(${1 - i * 0.1})`,
                  zIndex: 10 - i,
                  transformOrigin: 'bottom right'
                }}
                animate={{
                  transform: [
                    `rotate(${i * 15 - 22.5}deg) scale(${1 - i * 0.1})`,
                    `rotate(${i * 15 - 20}deg) scale(${1 - i * 0.1})`,
                    `rotate(${i * 15 - 22.5}deg) scale(${1 - i * 0.1})`
                  ]
                }}
                transition={{ duration: 4 + i, repeat: Infinity, ease: "easeInOut" }}
              >
                <span className="text-8xl font-black text-primary/20">{char.id}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Right Column: Roster List */}
        <div className="flex flex-col justify-center gap-4">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-xl font-bold tracking-widest mb-6 text-white/80 uppercase">Select Agent</h2>
          </motion.div>
          
          <div className="flex flex-col gap-4">
            {characters.map((char, index) => (
              <motion.div
                key={char.id}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link href={`/${char.slug}`} className="block group">
                  <div className="relative overflow-hidden clip-angled-br glow-border transition-all duration-300 group-hover:glow-border-hover group-hover:bg-primary/10 bg-background/50 backdrop-blur-sm flex items-stretch cursor-pointer">
                    <div className="w-16 bg-primary/20 flex items-center justify-center font-mono font-bold text-xl text-primary border-r border-primary/30 group-hover:bg-primary/40 transition-colors">
                      0{char.id}
                    </div>
                    <div className="p-6 flex-1 flex flex-col justify-center">
                      <h3 className="text-2xl font-black italic tracking-wider text-white group-hover:glow-text transition-all duration-300 uppercase">
                        {char.name}
                      </h3>
                      <p className="text-primary/80 font-medium tracking-widest text-sm uppercase">
                        {char.role}
                      </p>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>

      </main>
    </div>
  );
}
