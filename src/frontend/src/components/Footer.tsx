import { Heart } from "lucide-react";

export function Footer() {
  const year = new Date().getFullYear();
  const utmLink = `https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`;

  return (
    <footer className="mt-auto border-t border-border bg-muted/30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-sm text-muted-foreground">
        <span>© {year} Bomato. All rights reserved.</span>
        <a
          href={utmLink}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 hover:text-foreground transition-colors"
        >
          Built with <Heart className="w-3.5 h-3.5 fill-primary text-primary" />{" "}
          using caffeine.ai
        </a>
      </div>
    </footer>
  );
}
