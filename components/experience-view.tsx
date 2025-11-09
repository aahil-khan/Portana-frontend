"use client"

import { motion } from "framer-motion"
import { ChevronRight } from "lucide-react"

interface Experience {
  title: string
  period: string
  description: string[]
}

const experiences: Experience[] = [
  {
    title: "Senior Full-Stack Developer",
    period: "2023 - Present",
    description: [
      "Leading development of AI-powered SaaS platform",
      "Architecting scalable Next.js applications",
      "Mentoring junior developers and code reviews",
    ],
  },
  {
    title: "Full-Stack Engineer",
    period: "2021 - 2023",
    description: [
      "Built and shipped 5+ production applications",
      "Implemented real-time features with WebSockets",
      "Optimized database queries for 50% performance gain",
    ],
  },
  {
    title: "Frontend Developer",
    period: "2019 - 2021",
    description: [
      "Created responsive and accessible UI components",
      "Improved page load times by 40%",
      "Led design system initiative for consistency",
    ],
  },
]

export default function ExperienceView() {
  return (
    <motion.div className="space-y-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      {experiences.map((exp, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.1 }}
          /* Replace glass class with inline styles using CSS variables */
          className="p-4 rounded-lg border border-[#1e293b] backdrop-blur-md"
          style={{
            background: "var(--glass-bg)",
            backdropFilter: "blur(10px)",
          }}
        >
          <div className="flex items-start justify-between mb-2">
            <div>
              <h3 className="text-base font-semibold text-[#e0e7ff]">{exp.title}</h3>
              <p className="text-xs text-[#00d9ff]">{exp.period}</p>
            </div>
          </div>
          <ul className="space-y-1">
            {exp.description.map((item, j) => (
              <li key={j} className="flex gap-2 text-sm text-[#94a3b8]">
                <ChevronRight size={14} className="text-[#00d9ff] mt-0.5 flex-shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </motion.div>
      ))}
    </motion.div>
  )
}
