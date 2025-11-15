"use client"

import { useEffect, useRef, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface MatrixRainProps {
  onComplete?: () => void
}

export default function MatrixRain({ onComplete }: MatrixRainProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [showMessage, setShowMessage] = useState(false)
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Full screen canvas
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    // Matrix characters
    const characters = "01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン"
    const charArray = characters.split("")

    const fontSize = 20
    const columns = Math.ceil(canvas.width / fontSize)
    const drops: number[] = []

    for (let i = 0; i < columns; i++) {
      drops[i] = Math.random() * -50
    }

    let isRunning = true

    const draw = () => {
      if (!isRunning) return

      // Semi-transparent background
      ctx.fillStyle = "rgba(11, 13, 16, 0.15)"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Cyan text
      ctx.fillStyle = "#00d9ff"
      ctx.font = `bold ${fontSize}px monospace`
      ctx.textAlign = "center"
      ctx.textBaseline = "top"

      for (let i = 0; i < drops.length; i++) {
        const char = charArray[Math.floor(Math.random() * charArray.length)]
        const x = (i * fontSize) + (fontSize / 2)
        const y = drops[i] * fontSize

        ctx.fillText(char, x, y)

        if (drops[i] * fontSize > canvas.height) {
          drops[i] = -10
        }

        drops[i]++
      }

      animationId = requestAnimationFrame(draw)
    }

    let animationId: number
    animationId = requestAnimationFrame(draw)

    // Show message after 4 seconds and cleanup
    const messageTimer = setTimeout(() => {
      setShowMessage(true)
      isRunning = false

      const cleanupTimer = setTimeout(() => {
        setIsVisible(false)
        onComplete?.()
      }, 2000)

      return () => clearTimeout(cleanupTimer)
    }, 4000)

    return () => {
      isRunning = false
      cancelAnimationFrame(animationId)
      clearTimeout(messageTimer)
    }
  }, [onComplete])

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 top-0 left-0 w-screen h-screen z-9999 flex items-center justify-center bg-black/80 pointer-events-auto"
        >
          {/* Full screen canvas */}
          <canvas
            ref={canvasRef}
            className="absolute inset-0"
          />

          {/* Message after 4 seconds - centered on top of canvas */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <AnimatePresence>
              {showMessage && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="text-center z-10"
                >
                  <p className="text-5xl md:text-6xl font-display font-bold text-[#00d9ff] drop-shadow-lg">
                    Waaw, you're so cool! 🔥
                  </p>
                  <p className="text-lg text-[#a78bfa] mt-4 font-mono drop-shadow-lg">
                    *hack successful*
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}


