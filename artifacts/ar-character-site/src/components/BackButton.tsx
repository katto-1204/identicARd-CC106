import { ChevronLeft } from "lucide-react";
import { Link } from "wouter";

interface BackButtonProps {
  color?: string;
  gradient?: string;
}

export default function BackButton({ color = "#fff", gradient = "none" }: BackButtonProps) {
  return (
    <div className="fixed top-4 left-4 z-50 group">
      <Link
        href="/home"
        className="flex items-center justify-center w-11 h-11 rounded transition-all duration-300 relative overflow-hidden"
        style={{
          background: "rgba(7, 8, 15, 0.7)",
          backdropFilter: "blur(12px)",
        }}
        data-testid="button-back"
      >
        <div className="absolute inset-0 p-[1px] rounded" style={{ background: gradient, WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)", WebkitMaskComposite: "xor", maskComposite: "exclude" }} />
        
        <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-300" style={{ background: color }} />
        
        <ChevronLeft size={20} style={{ color }} />
      </Link>
    </div>
  );
}
