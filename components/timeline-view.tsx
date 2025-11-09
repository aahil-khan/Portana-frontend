"use client"

import { motion } from "framer-motion"

interface TimelineEvent {
  year: string
  title: string
  description: string
}

const timeline: TimelineEvent[] = [
  {
    year: "2024",
    title: "AI Revolution",
    description: "Launched AI-powered portfolio and transitioned to full-stack AI development.",
  },
  {
    year: "2023",
    title: "Senior Engineer",
    description: "Promoted to senior full-stack developer, leading a team of 5 engineers.",
  },
  {
    year: "2022",
    title: "Design System Launch",
    description: "Created comprehensive design system with 50+ components and documentation.",
  },
  {
    year: "2021",
    title: "First Startup",
    description: "Co-founded a SaaS startup, handling technical architecture and development.",
  },
  {
    year: "2020",
    title: "Full-Stack Transition",
    description: "Transitioned from frontend-only to full-stack development with Node.js and databases.",
  },
  {
    year: "2019",
    title: "Career Start",
    description: "Started as a junior frontend developer, focusing on React and modern web standards.",
  },
]

export default function TimelineView() {
  return (
    <motion.div className="space-y-8" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      {timeline.map((event, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.1 }}
          className="flex gap-4"
        >
          <div className="flex flex-col items-center">
            <div className="w-3 h-3 bg-[#00d9ff] rounded-full mt-2"></div>
            {i !== timeline.length - 1 && (
              <div className="w-0.5 h-20 bg-gradient-to-b from-[#00d9ff]/50 to-[#00d9ff]/0 mt-1"></div>
            )}
          </div>
          <div className="pb-8">
            <span className="text-xs font-mono text-[#00d9ff] font-semibold">{event.year}</span>
            <h3 className="text-base font-semibold text-[#e0e7ff] mt-1">{event.title}</h3>
            <p className="text-sm text-[#94a3b8] mt-2">{event.description}</p>
          </div>
        </motion.div>
      ))}
    </motion.div>
  )
}
