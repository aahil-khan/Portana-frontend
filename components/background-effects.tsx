"use client"

import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"

export default function BackgroundEffects() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const particlesRef = useRef<Particle[]>([])

  interface Particle {
    x: number
    y: number
    vx: number
    vy: number
    life: number
    maxLife: number
    size: number
  }

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const particles: Particle[] = []

    // Initialize particles
    for (let i = 0; i < 50; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        life: Math.random() * 100,
        maxLife: 100,
        size: Math.random() * 2 + 1,
      })
    }

    particlesRef.current = particles

    const animate = () => {
      // Clear canvas
      ctx.fillStyle = "rgba(11, 13, 16, 0.1)"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Update and draw particles
      particles.forEach((p, idx) => {
        p.x += p.vx
        p.y += p.vy
        p.life -= 1

        // Parallax effect based on mouse position
        const dx = mousePos.x - p.x
        const dy = mousePos.y - p.y
        const distance = Math.sqrt(dx * dx + dy * dy)

        if (distance < 200) {
          const angle = Math.atan2(dy, dx)
          p.vx -= Math.cos(angle) * 0.1
          p.vy -= Math.sin(angle) * 0.1
        }

        // Wrap around edges
        if (p.x < 0) p.x = canvas.width
        if (p.x > canvas.width) p.x = 0
        if (p.y < 0) p.y = canvas.height
        if (p.y > canvas.height) p.y = 0

        // Draw particle
        const alpha = (p.life / p.maxLife) * 0.5
        ctx.fillStyle = `rgba(0, 255, 255, ${alpha})`
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fill()

        // Reset if dead
        if (p.life <= 0) {
          particles[idx] = {
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vx: (Math.random() - 0.5) * 0.5,
            vy: (Math.random() - 0.5) * 0.5,
            life: 100,
            maxLife: 100,
            size: Math.random() * 2 + 1,
          }
        }
      })

      // Draw holographic lines
      ctx.strokeStyle = "rgba(0, 217, 255, 0.15)"
      ctx.lineWidth = 1
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 150) {
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.stroke()
          }
        }
      }

      requestAnimationFrame(animate)
    }

    animate()

    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [mousePos])

  return (
    <>
      {/* Canvas for particles */}
      <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0" style={{ mixBlendMode: "screen" }} />

      {/* Animated gradient background */}
      <motion.div
        className="fixed inset-0 z-0 pointer-events-none"
        animate={{
          background: [
            "radial-gradient(circle at 20% 50%, rgba(0, 217, 255, 0.1) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(157, 123, 255, 0.05) 0%, transparent 50%)",
            "radial-gradient(circle at 80% 30%, rgba(0, 217, 255, 0.12) 0%, transparent 50%), radial-gradient(circle at 20% 70%, rgba(157, 123, 255, 0.08) 0%, transparent 50%)",
            "radial-gradient(circle at 40% 60%, rgba(0, 217, 255, 0.1) 0%, transparent 50%), radial-gradient(circle at 60% 40%, rgba(157, 123, 255, 0.06) 0%, transparent 50%)",
          ],
        }}
        transition={{
          duration: 15,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "loop",
        }}
      />

      {/* Holographic grid lines */}
      <motion.svg
        className="fixed inset-0 z-0 pointer-events-none opacity-20"
        viewBox="0 0 1920 1080"
        preserveAspectRatio="none"
        animate={{
          opacity: [0.1, 0.2, 0.1],
        }}
        transition={{
          duration: 4,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "loop",
        }}
      >
        {/* Vertical lines */}
        {Array.from({ length: 12 }).map((_, i) => (
          <line
            key={`v-${i}`}
            x1={i * 160}
            y1="0"
            x2={i * 160}
            y2="1080"
            stroke="var(--neon-cyan)"
            strokeWidth="1"
            opacity="0.3"
          />
        ))}
        {/* Horizontal lines */}
        {Array.from({ length: 7 }).map((_, i) => (
          <line
            key={`h-${i}`}
            x1="0"
            y1={i * 150}
            x2="1920"
            y2={i * 150}
            stroke="var(--neon-cyan)"
            strokeWidth="1"
            opacity="0.2"
          />
        ))}
      </motion.svg>
    </>
  )
}
