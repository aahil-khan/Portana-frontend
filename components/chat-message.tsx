"use client"

import { motion } from "framer-motion"

interface Message {
  id: string
  content: string
  sender: "user" | "assistant"
  timestamp: Date
  isStreaming?: boolean
}

export default function ChatMessage({ message }: { message: Message }) {
  const isAssistant = message.sender === "assistant"

  return (
    <motion.div
      className={`flex ${isAssistant ? "justify-start" : "justify-end"}`}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
    >
      <div
        className={`
          max-w-2xl px-4 py-3 rounded-lg font-mono text-sm leading-relaxed
          ${
            isAssistant
              ? "text-[#e0e7ff] border border-[#00d9ff]/20 backdrop-blur-md"
              : "bg-[#00d9ff] text-[#0a0e27] font-semibold"
          }
        `}
        style={
          isAssistant
            ? {
                background: "var(--glass-bg)",
                backdropFilter: "blur(10px)",
                borderColor: "var(--glass-border)",
              }
            : undefined
        }
      >
        {/* Removed word-by-word animation - too expensive for performance */}
        <div className="flex flex-wrap gap-1">
          {message.content}
          {message.isStreaming && (
            <motion.span
              animate={{ opacity: [1, 0.5, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
              className="ml-1"
            >
              ▌
            </motion.span>
          )}
        </div>
      </div>
    </motion.div>
  )
}
