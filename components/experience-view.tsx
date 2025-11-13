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
    <motion.div className="space-y-3 md:space-y-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      {experiences.map((exp, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.1 }}
          /* Replace glass class with inline styles using CSS variables */
          className="p-3 md:p-4 rounded-lg border border-[#1e293b] backdrop-blur-md"
          style={{
            background: "var(--glass-bg)",
            backdropFilter: "blur(10px)",
          }}
        >
          <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-2">
            <div>
              <h3 className="text-sm md:text-base font-semibold text-[#e0e7ff]">{exp.title}</h3>
              <p className="text-xs text-[#94a3b8] md:hidden">{exp.period}</p>
            </div>
            <p className="hidden md:block text-xs text-[#00d9ff]">{exp.period}</p>
          </div>
          <ul className="space-y-0.5 md:space-y-1">
            {exp.description.map((item, j) => (
              <li key={j} className="flex gap-2 text-xs md:text-sm text-[#94a3b8] line-clamp-3">
                <ChevronRight size={12} className="text-[#00d9ff] mt-0.5 shrink-0 hidden md:block" />
                <span className="block md:hidden">•</span>
                {item}
              </li>
            ))}
          </ul>
        </motion.div>
      ))}
    </motion.div>
  )
}
