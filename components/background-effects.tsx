"use client"

import { useEffect, useRef, useState, useCallback } from "react"
import { motion } from "framer-motion"

export default function BackgroundEffects() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mousePos = useRef({ x: 0, y: 0 })
  const particlesRef = useRef<Particle[]>([])
  const animationRef = useRef<number | null>(null)

  interface Particle {
    x: number
    y: number
    vx: number
    vy: number
    life: number
    maxLife: number
    size: number
  }

  // Debounced mouse move to reduce state updates
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY }
    }

    window.addEventListener("mousemove", handleMouseMove, { passive: true })
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d", { alpha: true })
    if (!ctx) return

    let width = window.innerWidth
    let height = window.innerHeight
    canvas.width = width
    canvas.height = height

    const particles: Particle[] = []
    const particleCount = 40 // Reduced from 50 for better performance

    // Initialize particles
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        life: Math.random() * 100,
        maxLife: 100,
        size: Math.random() * 1.5 + 0.5,
      })
    }

    particlesRef.current = particles

    const animate = () => {
      // Clear canvas more efficiently
      ctx.clearRect(0, 0, width, height)

      // Update and draw particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]
        p.x += p.vx
        p.y += p.vy
        p.life -= 1

        // Simplified parallax effect - only check nearby particles
        const dx = mousePos.current.x - p.x
        const dy = mousePos.current.y - p.y
        const distSquared = dx * dx + dy * dy
        const maxDistSquared = 40000 // 200^2

        if (distSquared < maxDistSquared) {
          const distance = Math.sqrt(distSquared)
          if (distance > 0) {
            const force = 0.08 / (distance * 0.01)
            p.vx -= (dx / distance) * force
            p.vy -= (dy / distance) * force
          }
        }

        // Wrap around edges
        if (p.x < 0) p.x = width
        if (p.x > width) p.x = 0
        if (p.y < 0) p.y = height
        if (p.y > height) p.y = 0

        // Draw particle
        const alpha = Math.max(0, (p.life / p.maxLife) * 0.4)
        ctx.fillStyle = `rgba(0, 217, 255, ${alpha})`
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fill()

        // Reset if dead
        if (p.life <= 0) {
          particles[i] = {
            x: Math.random() * width,
            y: Math.random() * height,
            vx: (Math.random() - 0.5) * 0.4,
            vy: (Math.random() - 0.5) * 0.4,
            life: 100,
            maxLife: 100,
            size: Math.random() * 1.5 + 0.5,
          }
        }
      }

      // Draw holographic lines - reduced frequency
      ctx.strokeStyle = "rgba(0, 217, 255, 0.08)"
      ctx.lineWidth = 0.5
      let connectionCount = 0
      const maxConnections = 50 // Limit line connections for performance

      for (let i = 0; i < particles.length && connectionCount < maxConnections; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const distSquared = dx * dx + dy * dy
          const maxConnectDist = 22500 // 150^2

          if (distSquared < maxConnectDist) {
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.stroke()
            connectionCount++
          }
        }
      }

      animationRef.current = requestAnimationFrame(animate)
    }

    animate()

    const handleResize = () => {
      width = window.innerWidth
      height = window.innerHeight
      canvas.width = width
      canvas.height = height
    }

    window.addEventListener("resize", handleResize, { passive: true })

    return () => {
      window.removeEventListener("resize", handleResize)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [])

  return (
    <>
      {/* Canvas for particles */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          mixBlendMode: "screen",
          willChange: "transform",
          backfaceVisibility: "hidden",
        }}
      />

      {/* Animated gradient background - simplified */}
      <motion.div
        className="fixed inset-0 z-0 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{
          background: [
            "radial-gradient(circle at 20% 50%, rgba(0, 217, 255, 0.08) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(157, 123, 255, 0.04) 0%, transparent 50%)",
            "radial-gradient(circle at 80% 30%, rgba(0, 217, 255, 0.1) 0%, transparent 50%), radial-gradient(circle at 20% 70%, rgba(157, 123, 255, 0.06) 0%, transparent 50%)",
            "radial-gradient(circle at 40% 60%, rgba(0, 217, 255, 0.08) 0%, transparent 50%), radial-gradient(circle at 60% 40%, rgba(157, 123, 255, 0.04) 0%, transparent 50%)",
          ],
        }}
        transition={{
          duration: 20, // Slower animation for smoother effect
          repeat: Infinity,
          repeatType: "loop",
          ease: "linear",
        }}
        style={{
          willChange: "background",
          backfaceVisibility: "hidden",
        }}
      />

      {/* Holographic grid lines - optimized */}
      <motion.svg
        className="fixed inset-0 z-0 pointer-events-none opacity-10"
        viewBox="0 0 1920 1080"
        preserveAspectRatio="none"
        animate={{
          opacity: [0.05, 0.1, 0.05],
        }}
        transition={{
          duration: 6, // Slower pulse
          repeat: Infinity,
          repeatType: "loop",
          ease: "linear",
        }}
        style={{
          willChange: "opacity",
          backfaceVisibility: "hidden",
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
            strokeWidth="0.5"
            opacity="0.2"
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
            strokeWidth="0.5"
            opacity="0.15"
          />
        ))}
      </motion.svg>
    </>
  )
}
