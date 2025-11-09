"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

const bootMessages = [
  "Initializing memory banks...",
  "Loading neural pathways...",
  "Syncing knowledge nodes...",
  "Calibrating response protocols...",
  "Aahil's Portfolio OS v1.0.0",
  "> Ready for interaction",
]

export default function BootScreen({ complete }: { complete: boolean }) {
  const [displayedLines, setDisplayedLines] = useState<string[]>([])

  useEffect(() => {
    if (complete) {
      setDisplayedLines(bootMessages)
      return
    }

    let currentLine = 0
    const interval = setInterval(() => {
      if (currentLine < bootMessages.length) {
        setDisplayedLines((prev) => [...prev, bootMessages[currentLine]])
        currentLine++
      }
    }, 500)

    return () => clearInterval(interval)
  }, [complete])

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: complete ? 0 : 1 }}
      transition={{ duration: 1, delay: complete ? 0 : 0 }}
      className={`fixed inset-0 bg-gradient-to-b from-[#0a0e27] via-[#1a1f3a] to-[#0a0e27] flex items-center justify-center ${complete ? "pointer-events-none" : ""}`}
    >
      <div className="max-w-2xl w-full px-8 font-mono">
        <div className="space-y-2">
          {displayedLines.map((line, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-[#00d9ff] text-sm md:text-base neon-glow"
            >
              {line}
              {i === displayedLines.length - 1 && !complete && (
                <motion.span
                  animate={{ opacity: [1, 0.5, 1] }}
                  transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
                  className="ml-1"
                >
                  ▌
                </motion.span>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}
