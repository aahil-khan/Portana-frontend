"use client"

import { motion } from "framer-motion"
import { Code2, Palette, Zap, FileCode } from "lucide-react"

interface MiscItem {
  title: string
  description: string
  icon: any
  tags: string[]
}

const miscItems: MiscItem[] = [
  {
    title: "VS Code Setup",
    description: "Optimized development environment with essential extensions and settings.",
    icon: Code2,
    tags: ["Prettier", "ESLint", "Thunder Client", "Copilot"],
  },
  {
    title: "Design Tools",
    description: "Figma, Framer, and Adobe Suite for prototyping and visual design.",
    icon: Palette,
    tags: ["Figma", "Framer", "Adobe XD"],
  },
  {
    title: "Dev Tools",
    description: "Command-line tools and utilities for efficient development workflow.",
    icon: Zap,
    tags: ["pnpm", "Turbo", "Next.js CLI", "Docker"],
  },
  {
    title: "Experiments",
    description: "Side projects and experimental features pushing the boundaries.",
    icon: FileCode,
    tags: ["Generative AI", "3D Web", "WebGL", "WebAssembly"],
  },
]

export default function MiscView() {
  return (
    <motion.div className="grid grid-cols-1 md:grid-cols-2 gap-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      {miscItems.map((item, i) => {
        const Icon = item.icon
        return (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            /* Replace glass class with inline styles using CSS variables */
            className="p-6 rounded-lg border border-[#1e293b] transition-all backdrop-blur-md hover:border-[#00d9ff]/50"
            style={{
              background: "var(--glass-bg)",
              backdropFilter: "blur(10px)",
            }}
          >
            <div className="flex items-start gap-4">
              <Icon size={24} className="text-[#00d9ff] mt-1" />
              <div className="flex-1">
                <h3 className="text-base font-semibold text-[#e0e7ff] mb-2">{item.title}</h3>
                <p className="text-sm text-[#94a3b8] mb-3">{item.description}</p>
                <div className="flex flex-wrap gap-2">
                  {item.tags.map((tag, j) => (
                    <span
                      key={j}
                      className="text-xs bg-[#1a1f3a] text-[#00d9ff] px-2 py-1 rounded border border-[#00d9ff]/20"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )
      })}
    </motion.div>
  )
}
