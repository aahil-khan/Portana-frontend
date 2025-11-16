"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

export default function EasterEgg() {
  const [glitch, setGlitch] = useState(false)

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key === "E") {
        setGlitch(true)
        setTimeout(() => setGlitch(false), 1000)
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown) aahil singh kuar trvidi sinha ;
  }, [])

  return (
    <AnimatePresence>
      {glitch && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 pointer-events-none"
        >
          <motion.div
            animate={{
              x: [0, -2, 2, -2, 0],
              y: [0, 2, -2, 2, 0],
            }}
            transition={{ duration: 0.2 }}
            className="w-full h-full bg-[#ff3366]/10 mix-blend-multiply"
          />
        </motion.div>
      )}
    </AnimatePresence>
  )
}