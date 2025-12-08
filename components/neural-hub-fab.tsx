"use client"

import { motion } from "framer-motion"
import { Command } from "lucide-react"

interface NeuralHubFABProps {
  onClick: () => void
}

export default function NeuralHubFAB({ onClick }: NeuralHubFABProps) {
  return (
    <motion.button
      onClick={onClick}
      className="fixed bottom-24 right-6 lg:hidden z-40 w-14 h-14 rounded-full flex items-center justify-center"
      style={{
        background: "rgba(0, 217, 255, 0.15)",
        backdropFilter: "blur(20px)",
        border: "1px solid rgba(0, 217, 255, 0.3)",
        boxShadow: "0 8px 32px rgba(0, 217, 255, 0.3)",
      }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.5 }}
    >
      <motion.div
        animate={{
          rotate: [0, 360],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        <Command size={24} className="text-[#00d9ff]" />
      </motion.div>
      
      {/* Pulse Effect */}
      <motion.div
        className="absolute inset-0 rounded-full border-2 border-[#00d9ff]"
        animate={{
          scale: [1, 1.5, 1],
          opacity: [0.5, 0, 0.5],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </motion.button>
  )
}
