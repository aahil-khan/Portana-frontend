"use client"

import { useEffect } from "react"
import { X, Github, Linkedin, Code2, BookOpen, Layers, Clock, Zap, FileText, Mail } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

interface MobileMenuProps {
  isOpen: boolean
  onClose: () => void
  onNavigate?: (command: string) => void
  disabled?: boolean
}

export default function MobileMenu({ isOpen, onClose, onNavigate, disabled = false }: MobileMenuProps) {

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
    { icon: FileText, label: "Resume", command: "/resume" },
    { icon: Mail, label: "Contact", command: "/contact" },
    { icon: Zap, label: "Misc", command: "/misc" },
  ]

  const externalLinks = [
    { icon: Github, label: "GitHub", href: "https://github.com/aahil-khan" },
    { icon: Linkedin, label: "LinkedIn", href: "https://www.linkedin.com/in/aahil-khan-015671287/" },
  ]

  const handleNavClick = (command: string) => {
    if (disabled) return
    onNavigate?.(command)
    onClose()
  }

  return (
    <>
      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
              className="fixed inset-0 bg-black/80 backdrop-blur-md z-998 lg:hidden"
            />

            {/* Menu Panel */}
            <motion.div
              initial={{ x: "-100%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: "-100%", opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed left-0 top-0 bottom-0 w-64 z-999 bg-linear-to-b from-[#0f1419] to-[#1a1f3a] border-r border-[#1e293b] backdrop-blur-md lg:hidden overflow-y-auto"
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
                        className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-[#1a1f3a] text-[#e0e7ff] hover:text-[#00d9ff] transition-all ${disabled ? 'opacity-40 cursor-not-allowed' : ''}`}
                        disabled={disabled}
                        title={disabled ? "Click /start first" : link.label}
                      >
                        <Icon size={18} />
                        <span className="text-sm font-medium">{link.label}</span>
                      </motion.button>
                    )
                  })}
                </nav>

                {/* Divider */}
                <div className="h-px bg-linear-to-r from-[#1e293b] via-[#00d9ff]/20 to-[#1e293b]" />

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
