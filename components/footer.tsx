import Link from "next/link";
import { ExternalLink } from "lucide-react";

export function Footer() {
  return (
    <footer className="w-full py-6 mt-8 border-t border-primary/20 bg-secondary/10">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
        <div className="flex flex-col items-center md:items-start gap-1">
          <span className="font-semibold text-foreground">BrandGenesis AI</span>
          <span>© {new Date().getFullYear()} All rights reserved</span>
        </div>

        <div className="flex items-center gap-6">
          <Link
            href="/privacy-policy"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-primary transition-colors"
          >
            Privacy Policy
          </Link>
          <Link
            href="/cookies-policy"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-primary transition-colors"
          >
            Cookies Policy
          </Link>
        </div>

        <div className="flex items-center gap-2">
          <span className="opacity-60">Powered by</span>
          <a
            href="https://memento-academy.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 font-bold text-primary hover:text-foreground transition-colors"
          >
            aprender web3 gratis
            <ExternalLink className="h-3 w-3" />
          </a>
        </div>
      </div>
    </footer>
  );
}
