"use client"

import { useState, useEffect } from "react"
import { Menu, X, Github, Linkedin, Code2, BookOpen, Layers, Clock, Zap } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

interface MobileMenuProps {
  onNavigate?: (command: string) => void
}

export default function MobileMenu({ onNavigate }: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false)

  // Lock body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "auto"
    }

    return () => {
      document.body.style.overflow = "auto"
    }
  }, [isOpen])

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
    setIsOpen(false)
  }

  return (
    <>
      {/* Menu Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden p-1.5 hover:bg-[#1a1f3a] rounded-lg transition-colors"
        aria-label="Toggle menu"
      >
        {isOpen ? (
          <X size={20} className="text-[#00d9ff]" />
        ) : (
          <Menu size={20} className="text-[#94a3b8]" />
        )}
      </button>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/80 backdrop-blur-md z-60 lg:hidden"
            />

            {/* Menu Panel */}
            <motion.div
              initial={{ x: "-100%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: "-100%", opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed left-0 top-0 bottom-0 w-64 z-70 bg-linear-to-b from-[#0f1419] to-[#1a1f3a] border-r border-[#1e293b] backdrop-blur-md lg:hidden overflow-y-auto"
            >
              <div className="flex flex-col h-full p-4 space-y-6 pt-20">
                {/* Navigation Links */}
                <nav className="space-y-2">
                  <h2 className="text-xs font-display font-bold text-[#00d9ff]/60 px-3 py-2">NAVIGATION</h2>
                  {navLinks.map((link, idx) => {
                    const Icon = link.icon
                    return (
                      <motion.button
                        key={link.command}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.05 }}
                        onClick={() => handleNavClick(link.command)}
                        className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-[#1a1f3a] text-[#e0e7ff] hover:text-[#00d9ff] transition-all"
                      >
                        <Icon size={18} />
                        <span className="text-sm font-medium">{link.label}</span>
                      </motion.button>
                    )
                  })}
                </nav>

                {/* Divider */}
                <div className="h-px bg-gradient-to-r from-[#1e293b] via-[#00d9ff]/20 to-[#1e293b]" />

                {/* External Links */}
                <div className="space-y-2">
                  <h2 className="text-xs font-display font-bold text-[#a78bfa]/60 px-3 py-2">SOCIALS</h2>
                  {externalLinks.map((link, idx) => {
                    const Icon = link.icon
                    return (
                      <motion.a
                        key={link.label}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 + idx * 0.05 }}
                        className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-[#1a1f3a] text-[#e0e7ff] hover:text-[#a78bfa] transition-all"
                      >
                        <Icon size={18} />
                        <span className="text-sm font-medium">{link.label}</span>
                      </motion.a>
                    )
                  })}
                </div>

                {/* Footer Info */}
                <div className="mt-auto pt-4 border-t border-[#1e293b]">
                  <p className="text-xs text-[#94a3b8] px-3">
                    Portana v1.0.0<br />
                    AI Portfolio Assistant
                  </p>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
