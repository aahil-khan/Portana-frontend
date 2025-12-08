"use client"

import { useEffect, useState, useRef } from "react"
import { gsap } from "gsap"

const bootMessages = [
  "Initializing memory banks...",
  "Loading neural pathways...",
  "Syncing knowledge nodes...",
  "Calibrating response protocols...",
  "Portana v1.0.0",
  "> Ready for interaction",
]

interface BootScreenProps {
  complete: boolean
  onGenesisComplete?: () => void
}

export default function BootScreen({ complete, onGenesisComplete }: BootScreenProps) {
  const [displayedLines, setDisplayedLines] = useState<string[]>([])
  const [dimensions, setDimensions] = useState({ width: 1920, height: 1080 })
  const containerRef = useRef<HTMLDivElement>(null)
  const blobRef = useRef<SVGPathElement>(null)
  const topBarRef = useRef<SVGRectElement>(null)
  const bottomBarRef = useRef<SVGRectElement>(null)
  const terminalRef = useRef<HTMLDivElement>(null)
  const debrisContainerRef = useRef<HTMLDivElement>(null)
  const timelineRef = useRef<gsap.core.Timeline | null>(null)

  // Set dimensions on mount
  useEffect(() => {
    setDimensions({ width: window.innerWidth, height: window.innerHeight })
  }, [])

  // Phase 1: Terminal text appearance with blob growth
  useEffect(() => {
    if (complete) return

    let currentLine = 0
    const interval = setInterval(() => {
      if (currentLine < bootMessages.length) {
        setDisplayedLines((prev) => [...prev, bootMessages[currentLine]])
        
        // Pulse blob on each line
        if (blobRef.current) {
          const amplitude = 1.15 + currentLine * 0.05 // Growing instability
          gsap.to(blobRef.current, {
            scale: amplitude,
            duration: 0.3,
            ease: "power2.out",
            yoyo: true,
            repeat: 1,
          })
        }
        
        currentLine++

        // Start Phase 2 after last line
        if (currentLine === bootMessages.length) {
          setTimeout(() => {
            startPhase2()
          }, 500)
        }
      }
    }, 500)

    return () => clearInterval(interval)
  }, [complete])

  // Phase 2: Suction effect
  const startPhase2 = () => {
    const tl = gsap.timeline()

    // Fade out terminal
    tl.to(terminalRef.current, {
      opacity: 0,
      duration: 0.4,
    })

    // Screen shake
    tl.to(containerRef.current, {
      x: "-=3",
      y: "+=2",
      duration: 0.05,
      yoyo: true,
      repeat: 7,
    }, "-=0.2")

    // Suction - blob shrinks violently
    tl.to(blobRef.current, {
      scale: 0.05,
      rotation: 360,
      duration: 0.6,
      ease: "power4.in",
      onComplete: startPhase3,
    }, "-=0.3")
  }

  // Phase 3: Explosion and morphing
  const startPhase3 = () => {
    if (!blobRef.current || !topBarRef.current || !bottomBarRef.current) return

    const centerY = dimensions.height / 2
    const tl = gsap.timeline()

    // Hide blob
    tl.set(blobRef.current, { opacity: 0 })
    
    // Show and animate bars
    tl.set([topBarRef.current, bottomBarRef.current], { opacity: 1 })

    // Spawn debris particles
    spawnDebris()

    // Top bar: start as blob, morph to rectangle via scaleX/Y
    tl.fromTo(topBarRef.current,
      {
        scaleY: 1,
        scaleX: 1,
        y: 0,
      },
      {
        scaleY: 0.64, // Flatten to bar height (64px / 100px)
        scaleX: dimensions.width / 200, // Stretch to full width
        y: -centerY + 32,
        duration: 0.8,
        ease: "elastic.out(1, 0.6)",
      }, 0)

    // Bottom bar: same morphing
    tl.fromTo(bottomBarRef.current,
      {
        scaleY: 1,
        scaleX: 1,
        y: 0,
      },
      {
        scaleY: 0.8, // Flatten to bar height (80px / 100px)
        scaleX: dimensions.width / 200, // Stretch to full width
        y: dimensions.height - centerY - 40,
        duration: 0.8,
        ease: "elastic.out(1, 0.6)",
      }, 0)

    // Glitch effect during settling
    tl.call(() => {
      applyGlitch([topBarRef.current!, bottomBarRef.current!])
    }, [], 0.4)

    // Complete
    tl.call(() => {
      setTimeout(() => {
        if (onGenesisComplete) {
          onGenesisComplete()
        }
      }, 500)
    }, [], "+=0.5")

    timelineRef.current = tl
  }

  const spawnDebris = () => {
    if (!debrisContainerRef.current) return

    const centerX = dimensions.width / 2
    const centerY = dimensions.height / 2

    for (let i = 0; i < 30; i++) {
      const particle = document.createElement("div")
      particle.className = "absolute rounded-full"
      particle.style.width = `${2 + Math.random() * 4}px`
      particle.style.height = particle.style.width
      particle.style.left = `${centerX}px`
      particle.style.top = `${centerY}px`
      particle.style.background = "#00d9ff"
      particle.style.boxShadow = "0 0 10px #00d9ff"
      
      debrisContainerRef.current.appendChild(particle)

      const angle = Math.random() * Math.PI * 2
      const speed = 200 + Math.random() * 400

      gsap.to(particle, {
        x: Math.cos(angle) * speed,
        y: Math.sin(angle) * speed,
        opacity: 0,
        duration: 1.5,
        delay: i * 0.007,
        ease: "power2.out",
        onComplete: () => particle.remove(),
      })
    }
  }

  const applyGlitch = (elements: SVGPathElement[]) => {
    elements.forEach(el => {
      const originalFilter = el.style.filter
      
      const glitchInterval = setInterval(() => {
        el.style.filter = `
          drop-shadow(2px 0 0 rgba(255, 0, 100, 0.5))
          drop-shadow(-2px 0 0 rgba(0, 217, 255, 0.5))
          ${originalFilter}
        `
      }, 50)

      setTimeout(() => {
        clearInterval(glitchInterval)
        el.style.filter = originalFilter
      }, 400)
    })
  }

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 bg-linear-to-b from-[#0a0e27] via-[#1a1f3a] to-[#0a0e27]"
      style={{ zIndex: 9999 }}
    >
      {/* Terminal Text */}
      <div
        ref={terminalRef}
        className="fixed inset-0 flex items-center justify-center"
        style={{ zIndex: 10 }}
      >
        <div className="max-w-2xl w-full px-8 space-y-2">
          {displayedLines.map((line, i) => (
            line && (
              <div
                key={i}
                className={`text-[#00d9ff] text-sm md:text-base neon-glow ${
                  line.includes("v1.0.0") || line.includes("Ready")
                    ? "font-display text-lg md:text-xl font-bold"
                    : "font-mono"
                }`}
                style={{
                  opacity: 0,
                  animation: `fadeIn 0.3s ease-out ${i * 0.1}s forwards`,
                }}
              >
                {line}
                {i === displayedLines.length - 1 && displayedLines.length < bootMessages.length && (
                  <span className="ml-1 animate-pulse">▌</span>
                )}
              </div>
            )
          ))}
        </div>
      </div>

      {/* SVG Blob and Morphing Elements */}
      <svg
        className="fixed inset-0 pointer-events-none"
        style={{ zIndex: 20 }}
        viewBox={`0 0 ${dimensions.width} ${dimensions.height}`}
      >
        <defs>
          {/* 3D Texture Filter */}
          <filter id="blob3d" colorInterpolationFilters="sRGB">
            <feGaussianBlur in="SourceGraphic" stdDeviation="15" result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7"
              result="goo"
            />
            <feGaussianBlur in="goo" stdDeviation="2" result="shadow" />
            <feOffset in="shadow" dx="3" dy="3" result="offsetShadow" />
            <feMerge>
              <feMergeNode in="offsetShadow" />
              <feMergeNode in="goo" />
            </feMerge>
          </filter>

          {/* Gradient for depth */}
          <radialGradient id="blobGradient">
            <stop offset="0%" stopColor="#00d9ff" stopOpacity="0.9" />
            <stop offset="50%" stopColor="#00d9ff" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#0099cc" stopOpacity="0.5" />
          </radialGradient>
        </defs>

        {/* Main Blob (Phase 1) */}
        <path
          ref={blobRef}
          d={`M ${dimensions.width / 2} ${dimensions.height / 2} 
              m -50, 0
              a 50,50 0 1,0 100,0
              a 50,50 0 1,0 -100,0`}
          fill="url(#blobGradient)"
          filter="url(#blob3d)"
          style={{
            transformOrigin: "center",
            transform: "scale(0.1)",
            opacity: 1,
          }}
        />

        {/* Top Bar (Phase 3) - starts as circle blob */}
        <rect
          ref={topBarRef}
          x={dimensions.width / 2 - 100}
          y={dimensions.height / 2 - 50}
          width="200"
          height="100"
          rx="50"
          ry="50"
          fill="url(#blobGradient)"
          filter="url(#blob3d)"
          style={{
            opacity: 0,
            transformOrigin: "center",
          }}
        />

        {/* Bottom Bar (Phase 3) - starts as circle blob */}
        <rect
          ref={bottomBarRef}
          x={dimensions.width / 2 - 100}
          y={dimensions.height / 2 - 50}
          width="200"
          height="100"
          rx="50"
          ry="50"
          fill="url(#blobGradient)"
          filter="url(#blob3d)"
          style={{
            opacity: 0,
            transformOrigin: "center",
          }}
        />
      </svg>

      {/* Debris Container */}
      <div ref={debrisContainerRef} className="fixed inset-0 pointer-events-none" style={{ zIndex: 25 }} />

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateX(-10px); }
          to { opacity: 1; transform: translateX(0); }
        }
      `}</style>
    </div>
  )
}
