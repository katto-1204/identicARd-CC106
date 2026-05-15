import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { motion } from "framer-motion";

export default function SplashScreen() {
  const [, setLocation] = useLocation();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => setLocation("/home"), 500);
          return 100;
        }
        return prev + Math.floor(Math.random() * 15) + 5;
      });
    }, 150);

    return () => clearInterval(timer);
  }, [setLocation]);

  return (
    <motion.div
      className="fixed inset-0 bg-background flex flex-col items-center justify-center z-50 overflow-hidden"
      exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      data-testid="splash-screen"
    >
      <div className="scanlines" />
      
      <div className="relative z-10 flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h1 className="text-5xl md:text-7xl font-black italic tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent glow-text">
            TEAM CORE
          </h1>
          <p className="mt-2 text-sm md:text-base tracking-[0.5em] text-muted-foreground uppercase">
            Architects of the Terminal
          </p>
        </motion.div>

        <div className="mt-16 w-64 md:w-96">
          <div className="flex justify-between text-xs font-mono text-primary mb-2">
            <span>INITIALIZING...</span>
            <span>{Math.min(progress, 100)}%</span>
          </div>
          <div className="h-1 w-full bg-muted overflow-hidden relative">
            <motion.div
              className="absolute top-0 left-0 h-full bg-primary glow-border"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ ease: "linear" }}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
