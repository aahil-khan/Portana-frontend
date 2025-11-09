"use client"

import type React from "react"

import { useState, useRef } from "react"
import { motion } from "framer-motion"
import { Send, Sparkles } from "lucide-react"

interface InputBarProps {
  onSendMessage: (message: string) => void
}

export default function InputBar({ onSendMessage }: InputBarProps) {
  const [input, setInput] = useState("")
  const [isFocused, setIsFocused] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (input.trim()) {
      onSendMessage(input)
      setInput("")
    }
  }

  return (
    <div
      className="px-4 md:px-6 lg:px-8 py-6 pb-8 border-t relative z-20"
      style={{ borderColor: "var(--glass-border)" }}
    >
      <div className="max-w-4xl mx-auto">
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className={`rounded-2xl px-6 py-4 flex items-center gap-3 group ${isFocused ? "neon-border-pulse" : ""}`}
          style={{
            background: "var(--glass-bg)",
            border: "1px solid var(--glass-border)",
            backdropFilter: "blur(10px)",
            WebkitBackdropFilter: "blur(10px)",
          }}
        >
          <Sparkles className="w-5 h-5 text-cyan-accent/60 group-focus-within:text-cyan-accent transition-colors" />

          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder="Type a command or message..."
            className="flex-1 bg-transparent text-foreground placeholder-muted/50 outline-none font-light text-sm"
          />

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="p-2 rounded-full transition-all duration-300 cursor-pointer"
            style={{
              background: "linear-gradient(135deg, rgba(0, 255, 255, 0.1), rgba(157, 123, 255, 0.1))",
              border: "1px solid var(--glass-border)",
              backdropFilter: "blur(10px)",
              WebkitBackdropFilter: "blur(10px)",
            }}
          >
            <Send className="w-5 h-5 text-cyan-accent" />
          </motion.button>
        </motion.form>

        <div className="mt-4 text-xs text-muted/60 text-center">Try /help to see available commands</div>
      </div>
    </div>
  )
}
