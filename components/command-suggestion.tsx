"use client"

import { motion } from "framer-motion"
import { ChevronRight } from "lucide-react"

interface CommandSuggestionProps {
  command: string
  onExecute: () => void
}

const commandLabels: Record<string, { label: string; description: string }> = {
  projects: { label: "View Projects", description: "See my project portfolio" },
  stack: { label: "Tech Stack", description: "Explore my technology expertise" },
  experience: { label: "Experience", description: "Learn about my work history" },
  education: { label: "Education", description: "Check my educational background" },
  timeline: { label: "Timeline", description: "View my professional timeline" },
  summary: { label: "About Me", description: "Read my professional summary" },
  achievements: { label: "Achievements", description: "See awards and recognition" },
}

export default function CommandSuggestion({
  command,
  onExecute,
}: CommandSuggestionProps) {
  const info = commandLabels[command] || { label: command, description: "" }

  return (
    <motion.button
      onClick={onExecute}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="mt-3 w-full group relative overflow-hidden rounded-lg border border-[#00d9ff]/30 bg-[#1a1f3a]/50 p-3 text-left transition-all hover:border-[#00d9ff]/60 hover:bg-[#1a1f3a]/80"
    >
      {/* Animated background gradient */}
      <motion.div
        className="absolute inset-0 bg-linear-to-r from-[#00d9ff]/10 to-transparent opacity-0 group-hover:opacity-100"
        transition={{ duration: 0.3 }}
      />

      <div className="relative flex items-center justify-between">
        <div className="flex flex-col">
          <p className="text-sm font-semibold text-[#00d9ff] group-hover:text-[#00ffff] transition-colors">
            {info.label}
          </p>
          <p className="text-xs text-[#94a3b8]">{info.description}</p>
        </div>
        <ChevronRight
          size={16}
          className="text-[#00d9ff] opacity-60 group-hover:opacity-100 group-hover:translate-x-1 transition-all"
        />
      </div>
    </motion.button>
  )
}
