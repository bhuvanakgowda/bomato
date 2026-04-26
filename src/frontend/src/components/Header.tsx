import { Link } from "@tanstack/react-router";
import { UtensilsCrossed } from "lucide-react";
import { motion } from "motion/react";

export function Header() {
  return (
    <motion.header
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="sticky top-0 z-40 bg-background/80 backdrop-blur-md border-b border-border"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <Link
          to="/"
          className="flex items-center gap-2.5 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-md"
        >
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center shadow-btn-primary group-hover:scale-105 transition-transform">
            <UtensilsCrossed
              className="w-4 h-4 text-primary-foreground"
              strokeWidth={2}
            />
          </div>
          <span className="font-display font-extrabold text-xl tracking-tight text-foreground">
            Bomato
          </span>
        </Link>

        <nav className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground hidden sm:block">
            Discover great restaurants
          </span>
        </nav>
      </div>
    </motion.header>
  );
}
