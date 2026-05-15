import { LucideIcon } from "lucide-react";
import { motion } from "framer-motion";

interface ActionBoxProps {
  label: string;
  icon: LucideIcon;
  onClick?: () => void;
  isActive?: boolean;
}

export default function ActionBox({ label, icon: Icon, onClick, isActive }: ActionBoxProps) {
  return (
    <motion.button
      whileHover={{ scale: 1.02, x: 5 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`w-full text-left relative overflow-hidden clip-angled glow-border transition-all duration-300 group
        ${isActive ? 'bg-primary/20 glow-border-hover' : 'bg-background/80 hover:bg-primary/10 hover:glow-border-hover'}
      `}
      data-testid={`action-${label.toLowerCase().replace(/\s+/g, '-')}`}
    >
      <div className="flex items-center p-4">
        <div className={`mr-4 transition-colors ${isActive ? 'text-primary animate-pulse-glow rounded-full p-1' : 'text-muted-foreground group-hover:text-primary'}`}>
          <Icon size={24} />
        </div>
        <div className="flex-1 border-l border-primary/20 pl-4 py-2">
          <span className={`text-xl font-black italic tracking-wider transition-colors uppercase ${isActive ? 'text-white glow-text' : 'text-white/80 group-hover:text-white'}`}>
            {label}
          </span>
        </div>
        {isActive && (
          <div className="absolute right-4 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-primary animate-pulse" />
        )}
      </div>
    </motion.button>
  );
}
