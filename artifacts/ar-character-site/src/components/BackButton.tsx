import { ChevronLeft } from "lucide-react";
import { Link } from "wouter";

interface BackButtonProps {
  color?: string;
}

export default function BackButton({ color = "#fff" }: BackButtonProps) {
  return (
    <div className="fixed top-4 left-4 z-50">
      <Link
        href="/home"
        className="flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 rounded transition-all duration-200"
        style={{
          background: "rgba(18,21,28,0.9)",
          border: "1px solid rgba(255,255,255,0.12)",
          backdropFilter: "blur(8px)",
        }}
        data-testid="button-back"
      >
        <ChevronLeft size={18} style={{ color }} />
      </Link>
    </div>
  );
}
