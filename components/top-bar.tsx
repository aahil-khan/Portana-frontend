"use client"

import { Settings } from "lucide-react"

export default function TopBar() {
  return (
    <div className="border-b border-[#1e293b] bg-background/80 backdrop-blur-md">
      <div className="max-w-4xl mx-auto px-4 md:px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 bg-[#00d9ff] rounded-full animate-pulse"></div>
          <h1 className="text-lg font-display font-bold text-foreground neon-glow">Portana</h1>
        </div>
        <button className="p-2 hover:bg-[#1a1f3a] rounded-lg transition-colors">
          <Settings size={20} className="text-[#94a3b8]" />
        </button>
      </div>
    </div>
  )
}
