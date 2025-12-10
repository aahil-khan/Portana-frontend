"use client"

import { motion } from "framer-motion"
import { useState, useEffect } from "react"
import { Sparkles } from "lucide-react"

interface AboutViewProps {
  onNavigate?: (question: string) => void
}

interface Question {
  sno: number
  question: string
}

export default function AboutView({ onNavigate }: AboutViewProps) {
  const [questions, setQuestions] = useState<Question[]>([])

  useEffect(() => {
    // Load and randomly select 6 questions
    fetch('/about-questions.json')
      .then(res => res.json())
      .then((data: Question[]) => {
        const shuffled = [...data].sort(() => Math.random() - 0.5)
        setQuestions(shuffled.slice(0, 6))
      })
      .catch(err => console.error('Failed to load questions:', err))
  }, [])

  return (
    <motion.div 
      className="space-y-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      {/* About Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative overflow-hidden rounded-xl p-6 md:p-8 border border-[#1e293b]"
        style={{
          background: "linear-gradient(135deg, rgba(0, 217, 255, 0.05) 0%, rgba(167, 139, 250, 0.05) 100%)",
          backdropFilter: "blur(20px)",
        }}
      >
        {/* Decorative elements */}
        <div
          className="absolute -top-20 -right-20 w-40 h-40 rounded-full opacity-10 blur-3xl"
          style={{ background: "radial-gradient(circle, #00d9ff 0%, transparent 70%)" }}
        />
        <div
          className="absolute -bottom-20 -left-20 w-40 h-40 rounded-full opacity-10 blur-3xl"
          style={{ background: "radial-gradient(circle, #a78bfa 0%, transparent 70%)" }}
        />

        <div className="relative z-10">

          <h2 className="text-2xl md:text-3xl font-bold text-[#e0e7ff] mb-3">
            Hello there, I'm{" "}
            <span className="bg-gradient-to-r from-[#00d9ff] to-[#a78bfa] bg-clip-text text-transparent">
              Aahil
            </span>
          </h2>

          <div className="space-y-3 text-sm md:text-base text-[#94a3b8] leading-relaxed">
            <p>
                I'm a <span className="text-[#00d9ff] font-medium">Full-Stack Developer</span> and{" "}
                <span className="text-[#a78bfa] font-medium">AI Enthusiast</span> passionate about building 
                intelligent systems that solve real problems. I like understanding how systems work, how ideas 
                turn into products, and how AI can make everyday experiences smarter.
            </p>
            <p>
                My projects reflect who I am: <span className="text-[#00d9ff]">practical</span>,{" "}
                <span className="text-[#a78bfa]">thoughtful</span>, and{" "}
                <span className="bg-gradient-to-r from-[#00d9ff] to-[#a78bfa] bg-clip-text text-transparent">always learning</span>. If something feels 
                meaningful or genuinely helpful, I'll usually try to turn it into a real product.
            </p>
          </div>
        </div>
      </motion.div>

      {/* Questions Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h3 className="text-sm font-mono text-[#94a3b8] mb-3 flex items-center gap-2">
          <span className="text-[#00d9ff]">▸</span> ASK ME ANYTHING
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
          {questions.map((q, idx) => (
            <motion.button
              key={q.sno}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              whileHover={{ scale: 1.02, x: 5 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onNavigate?.(q.question)}
              className="group flex items-center justify-between gap-3 p-3 rounded-lg bg-[#0f1419]/60 border border-[#1e293b] hover:border-[#00d9ff]/50 hover:bg-[#0f1419] transition-all text-left"
            >
              <span className="text-xs md:text-sm text-[#94a3b8] group-hover:text-[#00d9ff] transition-colors">
                {q.question}
              </span>
              <motion.span
                className="text-[#00d9ff] opacity-0 group-hover:opacity-100 transition-opacity shrink-0"
                animate={{ x: [0, 3, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              >
                →
              </motion.span>
            </motion.button>
          ))}
        </div>
      </motion.div>
    </motion.div>
  )
}
