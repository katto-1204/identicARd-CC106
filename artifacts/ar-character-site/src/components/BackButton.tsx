import { ChevronLeft } from "lucide-react";
import { Link } from "wouter";

interface BackButtonProps {
  color?: string;
}

export default function BackButton({ color = "#F59E0B" }: BackButtonProps) {
  return (
    <div className="fixed top-4 left-4 z-50">
      <Link
        href="/home"
        className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 transition-all duration-300"
        style={{
          background: "rgba(10,4,8,0.85)",
          border: `1px solid ${color}55`,
          clipPath: "polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px))",
          backdropFilter: "blur(8px)",
        }}
        data-testid="button-back"
      >
        <ChevronLeft size={20} style={{ color }} />
      </Link>
    </div>
  );
}
