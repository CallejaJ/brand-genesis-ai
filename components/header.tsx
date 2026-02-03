"use client";

import * as React from "react";

import { LoginButton } from "@/components/login-button";

export function Header() {
  const [isVisible, setIsVisible] = React.useState(true);
  const lastScrollY = React.useRef(0);
  const [isScrolled, setIsScrolled] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Determine if scrolled (for style)
      setIsScrolled(currentScrollY > 20);

      // Determine visibility (for position)
      if (currentScrollY < 20) {
        setIsVisible(true);
      } else {
        if (currentScrollY > lastScrollY.current) {
          // Scrolling down -> Hide
          setIsVisible(false);
        } else {
          // Scrolling up -> Show
          setIsVisible(true);
        }
      }
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 transform ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      } ${
        isScrolled
          ? "border-b border-white/5 bg-black/80 backdrop-blur-xl shadow-[0_4px_30px_rgba(0,0,0,0.5)] supports-[backdrop-filter]:bg-black/60"
          : "border-b border-white/0 bg-transparent backdrop-blur-none"
      }`}
    >
      <div className="container mx-auto px-4 h-32 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-16 w-16 relative flex items-center justify-center">
            <img
              src="/logo-transparent.png"
              alt="BrandGenesis Logo"
              className="h-full w-full object-contain"
            />
          </div>
          <h1 className="text-xl font-press-start bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-blue-400 to-green-400 hidden sm:block">
            BrandGenesis
            <span className="text-[10px] ml-2 text-white/50">AI</span>
          </h1>
        </div>

        {/* Container for the button that allows it to grow */}
        <div className="flex-shrink-0">
          <LoginButton />
        </div>
      </div>
    </header>
  );
}
