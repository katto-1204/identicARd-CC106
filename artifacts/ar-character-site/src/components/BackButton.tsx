import { ChevronLeft } from "lucide-react";
import { Link } from "wouter";

export default function BackButton() {
  return (
    <div className="fixed top-6 left-6 z-50">
      <Link href="/home" className="group flex items-center justify-center w-12 h-12 rounded-full border border-primary/50 bg-background/50 backdrop-blur hover:bg-primary/20 hover:glow-border-hover transition-all duration-300" data-testid="button-back">
        <ChevronLeft size={24} className="text-primary group-hover:text-white transition-colors" />
      </Link>
    </div>
  );
}
