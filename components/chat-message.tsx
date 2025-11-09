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
  const words = message.content.split(" ")

  return (
    <motion.div
      className={`flex ${isAssistant ? "justify-start" : "justify-end"}`}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        className={`
          max-w-2xl px-4 py-3 rounded-lg font-mono text-sm leading-relaxed
          ${
            isAssistant
              ? /* Replace glass class with inline styles using CSS variables */
                "text-[#e0e7ff] border border-[#00d9ff]/20 backdrop-blur-md"
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
        layout
      >
        <motion.div className="flex flex-wrap gap-1">
          {words.map((word, i) => (
            <motion.span key={i} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.02 }}>
              {word}
            </motion.span>
          ))}
          {message.isStreaming && (
            <motion.span
              animate={{ opacity: [1, 0.5, 1] }}
              transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
            >
              ▌
            </motion.span>
          )}
        </motion.div>
      </motion.div>
    </motion.div>
  )
}
