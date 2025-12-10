"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Search, X, Code2, BookOpen, Layers, Clock, FileText, Mail, Zap, HelpCircle, Rocket, Briefcase, User } from "lucide-react"
import type { LucideIcon } from "lucide-react"

interface Command {
  id: string
  command: string
  label: string
  description: string
  icon: LucideIcon
}

const commands: Command[] = [
  { id: "1", command: "/about", label: "About", description: "Learn about me", icon: User },
  { id: "2", command: "/projects", label: "Projects", description: "View all projects", icon: Code2 },
  { id: "3", command: "/blog", label: "Blog", description: "Read blog posts", icon: BookOpen },
  { id: "4", command: "/stack", label: "Tech Stack", description: "Explore technologies", icon: Layers },
  { id: "5", command: "/timeline", label: "Timeline", description: "Career journey", icon: Clock },
  { id: "6", command: "/experience", label: "Experience", description: "Work history", icon: Briefcase },
  { id: "7", command: "/resume", label: "Resume", description: "Download resume", icon: FileText },
  { id: "8", command: "/contact", label: "Contact", description: "Get in touch", icon: Mail },
  { id: "9", command: "/misc", label: "Misc", description: "Other information", icon: Zap },
  { id: "10", command: "/help", label: "Help", description: "Get help", icon: HelpCircle },
]

interface CommandPaletteProps {
  isOpen: boolean
  onClose: () => void
  onSelectCommand: (command: string) => void
}

export default function CommandPalette({ isOpen, onClose, onSelectCommand }: CommandPaletteProps) {
  const [search, setSearch] = useState("")
  const [selectedIndex, setSelectedIndex] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const commandRefs = useRef<(HTMLButtonElement | null)[]>([])

  const filteredCommands = commands.filter(
    (cmd) =>
      cmd.label.toLowerCase().includes(search.toLowerCase()) ||
      cmd.command.toLowerCase().includes(search.toLowerCase()) ||
      cmd.description.toLowerCase().includes(search.toLowerCase())
  )

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus()
    }
    setSearch("")
    setSelectedIndex(0)
  }, [isOpen])

  useEffect(() => {
    // Scroll selected item into view
    if (commandRefs.current[selectedIndex]) {
      commandRefs.current[selectedIndex]?.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      })
    }
  }, [selectedIndex])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return

      switch (e.key) {
        case "ArrowDown":
          e.preventDefault()
          setSelectedIndex((prev) => (prev + 1) % filteredCommands.length)
          break
        case "ArrowUp":
          e.preventDefault()
          setSelectedIndex((prev) => (prev - 1 + filteredCommands.length) % filteredCommands.length)
          break
        case "Enter":
          e.preventDefault()
          if (filteredCommands[selectedIndex]) {
            onSelectCommand(filteredCommands[selectedIndex].command)
            onClose()
          }
          break
        case "Escape":
          e.preventDefault()
          onClose()
          break
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [isOpen, selectedIndex, filteredCommands, onSelectCommand, onClose])

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-100 flex items-start justify-center pt-[15vh]"
        onClick={onClose}
      >
        {/* Backdrop */}
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

        {/* Command Palette */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: -20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -20 }}
          transition={{ duration: 0.2 }}
          className="relative w-full max-w-2xl mx-4"
          onClick={(e) => e.stopPropagation()}
          style={{
            background: "rgba(255, 255, 255, 0.05)",
            backdropFilter: "blur(20px)",
            border: "1px solid rgba(0, 217, 255, 0.2)",
            boxShadow: "0 8px 32px rgba(0, 217, 255, 0.15)",
          }}
        >
          {/* Search Input */}
          <div className="flex items-center gap-3 px-4 py-4 border-b border-[#00d9ff]/20">
            <Search size={20} className="text-[#00d9ff]" />
            <input
              ref={inputRef}
              type="text"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value)
                setSelectedIndex(0)
              }}
              placeholder="Search commands..."
              className="flex-1 bg-transparent text-[#e0e7ff] placeholder-gray-500 outline-none font-mono text-sm"
            />
            <button
              onClick={onClose}
              className="p-1 hover:bg-[#00d9ff]/10 rounded transition-colors"
            >
              <X size={18} className="text-gray-400" />
            </button>
          </div>

          {/* Commands List */}
          <div className="max-h-[400px] overflow-y-auto py-2">
            {filteredCommands.length === 0 ? (
              <div className="px-4 py-8 text-center text-gray-500 font-mono text-sm">
                No commands found
              </div>
            ) : (
              filteredCommands.map((cmd, index) => (
                <motion.button
                  key={cmd.id}
                  ref={(el) => { commandRefs.current[index] = el }}
                  onClick={() => {
                    onSelectCommand(cmd.command)
                    onClose()
                  }}
                  className={`w-full px-4 py-3 flex items-center gap-3 transition-all ${
                    index === selectedIndex
                      ? "bg-[#00d9ff]/20 border-l-2 border-[#00d9ff]"
                      : "hover:bg-[#00d9ff]/10"
                  }`}
                  whileHover={{ x: 4 }}
                >
                  <cmd.icon size={20} className="text-[#00d9ff]" />
                  <div className="flex-1 text-left">
                    <div className="text-[#00d9ff] font-mono text-sm font-semibold">
                      {cmd.label}
                    </div>
                    <div className="text-gray-400 text-xs font-mono">
                      {cmd.description}
                    </div>
                  </div>
                  <span className="text-xs font-mono text-gray-500 bg-[#1a1f3a] px-2 py-1 rounded">
                    {cmd.command}
                  </span>
                </motion.button>
              ))
            )}
          </div>

          {/* Footer Hint */}
          <div className="px-4 py-3 border-t border-[#00d9ff]/20 flex items-center justify-between text-xs font-mono text-gray-500">
            <span>↑↓ Navigate</span>
            <span>↵ Select</span>
            <span>ESC Close</span>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
