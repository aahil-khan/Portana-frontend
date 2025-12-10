"use client"

import { motion } from "framer-motion"
import { useState, useEffect } from "react"
import { TypeAnimation } from "react-type-animation"
import { Code2, BookOpen, Layers, Clock, FileText, Mail, Zap, MessageSquare, Briefcase, User } from "lucide-react"

interface StartViewProps {
  onNavigate?: (command: string) => void
}

export default function StartView({ onNavigate }: StartViewProps) {
  const quickCommands = [
    { icon: User, label: "About Me", command: "/about", description: "Get to know me" },
    { icon: Code2, label: "Projects", command: "/projects", description: "Explore my work" },
    { icon: BookOpen, label: "Blog", command: "/blog", description: "Read my articles" },
    { icon: Layers, label: "Tech Stack", command: "/stack", description: "My expertise" },
  ]

  const moreCommands = [
    { icon: Clock, label: "Timeline", command: "/timeline" },
    { icon: FileText, label: "Resume", command: "/resume" },
    { icon: Mail, label: "Contact", command: "/contact" },
    { icon: Zap, label: "Misc", command: "/misc" },
  ]

  // Staggered streaming animation delays
  const getDelay = (index: number, section: 'hero' | 'quick' | 'more' | 'chat') => {
    const baseDelays = {
      hero: 0,
      quick: 0.3,
      more: 0.6,
      chat: 0.8,
    }
    return baseDelays[section] + (index * 0.05)
  }

  return (
    <div className="w-full max-w-4xl mx-auto space-y-3 md:space-y-4">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ 
          opacity: 1, 
          y: 0,
          boxShadow: [
            "0 0 20px rgba(0, 217, 255, 0.1)",
            "0 0 30px rgba(0, 217, 255, 0.2)",
            "0 0 20px rgba(0, 217, 255, 0.1)",
          ],
        }}
        transition={{ 
          duration: 0.4, 
          delay: getDelay(0, 'hero'),
          boxShadow: {
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          },
        }}
        className="relative overflow-hidden rounded-lg p-4 md:p-6"
        style={{
          background: "linear-gradient(135deg, rgba(0, 217, 255, 0.1) 0%, rgba(167, 139, 250, 0.1) 100%)",
          backdropFilter: "blur(20px)",
          border: "1px solid rgba(0, 217, 255, 0.2)",
        }}
      >
        <div className="relative z-10">
          <h1 className="text-xl md:text-2xl font-bold text-[#e0e7ff] mb-2">
            Welcome! I'm{" "}
            <span className="inline-block text-[#00d9ff]">
              <TypeAnimation
                sequence={[
                  "Aahil Khan",
                  4000,
                  "Aahil Kha",
                  50,
                  "Aahil Kh",
                  50,
                  "Aahil K",
                  50,
                  "Aahil ",
                  50,
                  "Aahil",
                  50,
                  "Aahi",
                  50,
                  "Aah",
                  50,
                  "Aa",
                  50,
                  "A",
                  50,
                  "",
                  100,
                  "आ",
                  100,
                  "आह",
                  100,
                  "आहि",
                  100,
                  "आहिल",
                  100,
                  "आहिल ",
                  100,
                  "आहिल ख",
                  100,
                  "आहिल खा",
                  100,
                  "आहिल खान",
                  4000,
                  "आहिल खा",
                  50,
                  "आहिल ख",
                  50,
                  "आहिल ",
                  50,
                  "आहिल",
                  50,
                  "आहि",
                  50,
                  "आह",
                  50,
                  "आ",
                  50,
                  "",
                  100,
                  "ا",
                  100,
                  "اع",
                  100,
                  "اعہ",
                  100,
                  "اعہل",
                  100,
                  "اعہل ",
                  100,
                  "اعہل خ",
                  100,
                  "اعہل خا",
                  100,
                  "اعہل خان",
                  4000,
                  "اعہل خا",
                  50,
                  "اعہل خ",
                  50,
                  "اعہل ",
                  50,
                  "اعہل",
                  50,
                  "اعہ",
                  50,
                  "اع",
                  50,
                  "ا",
                  50,
                  "",
                  100,
                  "A",
                  100,
                  "Aa",
                  100,
                  "Aah",
                  100,
                  "Aahi",
                  100,
                  "Aahil",
                  100,
                  "Aahil ",
                  100,
                  "Aahil K",
                  100,
                  "Aahil Kh",
                  100,
                  "Aahil Kha",
                  100,
                  "Aahil Khan",
                ]}
                wrapper="span"
                repeat={Infinity}
                cursor={true}
                style={{ display: "inline-block" }}
              />
            </span>
          </h1>
          
          <p className="text-[#94a3b8] font-mono text-xs md:text-sm leading-relaxed">
            Your guide through my professional world. Explore my projects, read my blog, or just have a conversation about my work and experience.
          </p>
        </div>
        
        {/* Decorative gradient orb */}
        <div
          className="absolute -top-20 -right-20 w-40 h-40 rounded-full opacity-20 blur-3xl"
          style={{ background: "radial-gradient(circle, #00d9ff 0%, transparent 70%)" }}
        />
      </motion.div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: getDelay(0, 'quick') }}
      >
        <h2 className="text-sm font-mono text-[#94a3b8] mb-3 flex items-center gap-2">
          <span className="text-[#00d9ff]">▸</span> QUICK ACTIONS
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-3">
          {quickCommands.map((cmd, idx) => (
            <motion.button
              key={cmd.command}
              initial={{ opacity: 0, y: 10 }}
              animate={{ 
                opacity: 1, 
                y: 0,
                scale: [1, 1.01, 1],
              }}
              transition={{ 
                duration: 0.3, 
                delay: getDelay(idx + 1, 'quick'),
                scale: {
                  duration: 2.5,
                  delay: getDelay(idx + 1, 'quick') + 0.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                },
              }}
              onClick={() => onNavigate?.(cmd.command)}
              className="group relative overflow-hidden rounded-lg p-3 md:p-4 text-left transition-all hover:scale-[1.02]"
              style={{
                background: "rgba(255, 255, 255, 0.03)",
                border: "1px solid rgba(255, 255, 255, 0.08)",
              }}
              whileHover={{
                background: "rgba(0, 217, 255, 0.05)",
                borderColor: "rgba(0, 217, 255, 0.3)",
                scale: 1.05,
                transition: { duration: 0 },
              }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex items-start gap-2 md:gap-3">
                <div
                  className="p-1.5 md:p-2 rounded-lg transition-colors shrink-0"
                  style={{
                    background: "rgba(0, 217, 255, 0.1)",
                    border: "1px solid rgba(0, 217, 255, 0.2)",
                  }}
                >
                  <cmd.icon size={16} className="md:w-5 md:h-5 text-[#00d9ff]" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-mono text-xs md:text-sm font-semibold text-[#e0e7ff] mb-0.5">
                    {cmd.label}
                  </div>
                  <div className="font-mono text-xs text-[#94a3b8] line-clamp-1">
                    {cmd.description}
                  </div>
                </div>
              </div>
              
              {/* Hover arrow */}
              <motion.div
                className="absolute top-4 right-4 text-[#00d9ff] opacity-0 group-hover:opacity-100 transition-opacity"
                initial={{ x: -5 }}
                whileHover={{ x: 0 }}
              >
                →
              </motion.div>
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* More Commands */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: getDelay(0, 'more') }}
      >
        <h2 className="text-sm font-mono text-[#94a3b8] mb-3 flex items-center gap-2">
          <span className="text-[#00d9ff]">▸</span> MORE COMMANDS
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-1.5 md:gap-2">
          {moreCommands.map((cmd, idx) => (
            <motion.button
              key={cmd.command}
              initial={{ opacity: 0, y: 10 }}
              animate={{ 
                opacity: 1, 
                y: 0,
                scale: [1, 1.02, 1],
              }}
              transition={{ 
                duration: 0.3, 
                delay: getDelay(idx + 1, 'more'),
                scale: {
                  duration: 2,
                  delay: getDelay(idx + 1, 'more') + 0.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                },
              }}
              onClick={() => onNavigate?.(cmd.command)}
              className="group p-2 md:p-3 rounded-lg text-center transition-all"
              style={{
                background: "rgba(255, 255, 255, 0.03)",
                border: "1px solid rgba(255, 255, 255, 0.08)",
              }}
              whileHover={{
                background: "rgba(0, 217, 255, 0.05)",
                borderColor: "rgba(0, 217, 255, 0.3)",
                scale: 1.08,
                transition: { duration: 0 },
              }}
              whileTap={{ scale: 0.95 }}
            >
              <cmd.icon size={16} className="md:w-5 md:h-5 text-[#00d9ff] mx-auto mb-1" />
              <div className="font-mono text-xs text-[#94a3b8] group-hover:text-[#e0e7ff] transition-colors line-clamp-1">
                {cmd.label}
              </div>
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* AI Chat Hint */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: getDelay(0, 'chat') }}
        className="rounded-lg p-3 md:p-4"
        style={{
          background: "rgba(167, 139, 250, 0.05)",
          border: "1px solid rgba(167, 139, 250, 0.2)",
        }}
      >
        <div className="flex items-start gap-2 md:gap-3">
          <MessageSquare size={18} className="md:w-5 md:h-5 text-[#a78bfa] shrink-0 mt-0.5" />
          <div>
            <div className="font-mono text-xs md:text-sm font-semibold text-[#e0e7ff] mb-0.5">
              Or just ask me anything!
            </div>
            <div className="font-mono text-xs text-[#94a3b8] leading-relaxed">
              I can answer questions about projects, recommend blog posts, discuss tech stack, or chat about my experience. Try asking naturally!
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
