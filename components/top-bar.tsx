"use client"

interface TopBarProps {
  onNavigate?: (command: string) => void
  onMenuToggle?: () => void
}

export default function TopBar({ onNavigate, onMenuToggle }: TopBarProps) {
  return (
    <div className="border-b border-[#1e293b] bg-background/80 backdrop-blur-md relative z-50">
      <div className="max-w-4xl mx-auto px-3 md:px-8 py-2 md:py-4 flex items-center justify-between">
        <div className="flex items-center gap-1.5 md:gap-3">
          <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-[#00d9ff] rounded-full animate-pulse"></div>
          <h1 className="text-xs md:text-lg font-display font-bold text-foreground neon-glow">Portana</h1>
        </div>
        <button
          onClick={onMenuToggle}
          className="lg:hidden p-1.5 hover:bg-[#1a1f3a] rounded-lg transition-colors"
          aria-label="Toggle menu"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-[#94a3b8]">
            <line x1="3" y1="12" x2="21" y2="12" strokeWidth="2" strokeLinecap="round"/>
            <line x1="3" y1="6" x2="21" y2="6" strokeWidth="2" strokeLinecap="round"/>
            <line x1="3" y1="18" x2="21" y2="18" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </button>
      </div>
    </div>
  )
}
