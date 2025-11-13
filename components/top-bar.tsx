"use client"

import MobileMenu from "./mobile-menu"

interface TopBarProps {
  onNavigate?: (command: string) => void
}

export default function TopBar({ onNavigate }: TopBarProps) {
  return (
    <div className="border-b border-[#1e293b] bg-background/80 backdrop-blur-md relative z-20">
      <div className="max-w-4xl mx-auto px-3 md:px-8 py-2 md:py-4 flex items-center justify-between">
        <div className="flex items-center gap-1.5 md:gap-3">
          <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-[#00d9ff] rounded-full animate-pulse"></div>
          <h1 className="text-xs md:text-lg font-display font-bold text-foreground neon-glow">Portana</h1>
        </div>
        <MobileMenu onNavigate={onNavigate} />
      </div>
    </div>
  )
}
