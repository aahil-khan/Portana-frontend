"use client"

import { motion } from "framer-motion"
import LinkRenderer from "./link-renderer"

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
          max-w-xs sm:max-w-sm md:max-w-2xl px-3 md:px-4 py-2 md:py-3 rounded-lg font-mono text-xs md:text-sm leading-relaxed
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
        {/* Render content with link detection for assistant messages */}
        <div className="flex flex-wrap gap-1">
          {isAssistant ? (
            <LinkRenderer content={message.content} />
          ) : (
            message.content
          )}
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
