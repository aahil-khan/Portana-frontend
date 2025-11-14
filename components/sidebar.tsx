"use client"

import { Github, Linkedin, Code2, BookOpen, Layers, Clock, Zap } from "lucide-react"
import { motion } from "framer-motion"
import { useState } from "react"

interface SidebarProps {
  onNavigate?: (command: string) => void
}

export default function Sidebar({ onNavigate }: SidebarProps) {
  const [hoveredLink, setHoveredLink] = useState<string | null>(null)

  const navLinks = [
    { icon: Code2, label: "Projects", command: "/projects" },
    { icon: BookOpen, label: "Blog", command: "/blog" },
    { icon: Layers, label: "Stack", command: "/stack" },
    { icon: Clock, label: "Timeline", command: "/timeline" },
    { icon: Zap, label: "Misc", command: "/misc" },
  ]

  const externalLinks = [
    { icon: Github, label: "GitHub", href: "https://github.com/aahil-khan" },
    { icon: Linkedin, label: "LinkedIn", href: "https://www.linkedin.com/in/aahil-khan-015671287/" },
  ]

  const handleNavClick = (command: string) => {
    onNavigate?.(command)
  }

  return (
    <motion.div
      initial={{ x: -300, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="hidden lg:flex fixed left-0 top-0 z-40 h-dvh w-20 flex-col items-center"
      style={{
        background: "linear-gradient(180deg, rgba(255, 200, 150, 0.15) 0%, rgba(80, 120, 180, 0.15) 100%)",
        backdropFilter: "blur(16px)",
        borderRight: "1px solid rgba(255, 255, 255, 0.1)",
      }}
    >
      {/* Navigation Icons */}
      <nav className="flex-1 flex flex-col items-center py-8 gap-6">
        {navLinks.map((link, idx) => {
          const Icon = link.icon
          return (
            <motion.div
              key={link.command}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 + idx * 0.08, type: "spring", stiffness: 200 }}
              onMouseEnter={() => setHoveredLink(link.command)}
              onMouseLeave={() => setHoveredLink(null)}
            >
              <motion.button
                onClick={() => handleNavClick(link.command)}
                className="relative w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 group"
                style={{
                  background: hoveredLink === link.command ? "rgba(0, 217, 255, 0.1)" : "rgba(255, 255, 255, 0.05)",
                  border:
                    "1px solid " +
                    (hoveredLink === link.command ? "rgba(0, 217, 255, 0.3)" : "rgba(255, 255, 255, 0.08)"),
                  boxShadow:
                    hoveredLink === link.command
                      ? "0 0 20px rgba(0, 217, 255, 0.25), inset 0 1px 1px rgba(255, 255, 255, 0.1)"
                      : "inset 0 1px 1px rgba(255, 255, 255, 0.05)",
                }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                title={link.label}
              >
                <Icon
                  size={20}
                  style={{
                    color: hoveredLink === link.command ? "#00d9ff" : "rgba(255, 255, 255, 0.6)",
                    transition: "color 0.3s ease",
                  }}
                />

                {hoveredLink === link.command && (
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    className="absolute left-16 px-2 py-1 rounded text-xs font-medium whitespace-nowrap"
                    style={{
                      background: "rgba(0, 217, 255, 0.15)",
                      border: "1px solid rgba(0, 217, 255, 0.3)",
                      color: "#00d9ff",
                    }}
                  >
                    {link.label}
                  </motion.div>
                )}
              </motion.button>
            </motion.div>
          )
        })}
      </nav>

      {/* External Links */}
      <div className="flex flex-col items-center gap-4 py-8 border-t border-white/10 w-full">
        {externalLinks.map((link, idx) => {
          const Icon = link.icon
          return (
            <motion.div
              key={link.label}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 + idx * 0.08, type: "spring", stiffness: 200 }}
              onMouseEnter={() => setHoveredLink(link.label)}
              onMouseLeave={() => setHoveredLink(null)}
            >
              <a href={link.href} target="_blank" rel="noopener noreferrer">
                <motion.button
                  className="relative w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300"
                  style={{
                    background: hoveredLink === link.label ? "rgba(157, 123, 255, 0.1)" : "rgba(255, 255, 255, 0.05)",
                    border:
                      "1px solid " +
                      (hoveredLink === link.label ? "rgba(157, 123, 255, 0.3)" : "rgba(255, 255, 255, 0.08)"),
                    boxShadow:
                      hoveredLink === link.label
                        ? "0 0 20px rgba(157, 123, 255, 0.25), inset 0 1px 1px rgba(255, 255, 255, 0.1)"
                        : "inset 0 1px 1px rgba(255, 255, 255, 0.05)",
                  }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  title={link.label}
                >
                  <Icon
                    size={20}
                    style={{
                      color: hoveredLink === link.label ? "#a78bfa" : "rgba(255, 255, 255, 0.6)",
                      transition: "color 0.3s ease",
                    }}
                  />

                  {hoveredLink === link.label && (
                    <motion.div
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      className="absolute left-16 px-2 py-1 rounded text-xs font-medium whitespace-nowrap"
                      style={{
                        background: "rgba(157, 123, 255, 0.15)",
                        border: "1px solid rgba(157, 123, 255, 0.3)",
                        color: "#a78bfa",
                      }}
                    >
                      {link.label}
                    </motion.div>
                  )}
                </motion.button>
              </a>
            </motion.div>
          )
        })}
      </div>
    </motion.div>
  )
}
