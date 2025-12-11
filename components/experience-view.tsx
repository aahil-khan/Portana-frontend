"use client"

import { motion } from "framer-motion"
import { ChevronRight } from "lucide-react"

interface ExperienceViewProps {
  data?: Experience[] | null
  onNavigate?: (question: string) => void
}

interface Experience {
  title: string
  period: string
  company?: string
  description: string[] | string
}

const defaultExperiences: Experience[] = [
  {
    title: "Senior Full-Stack Developer",
    period: "2023 - Present",
    company: "Portana Labs",
    description: [
      "Leading development of AI-powered SaaS platform",
      "Architecting scalable Next.js applications",
      "Mentoring junior developers and code reviews",
    ],
  },
  {
    title: "Full-Stack Engineer",
    period: "2021 - 2023",
    company: "SkillMap",
    description: [
      "Built and shipped 5+ production applications",
      "Implemented real-time features with WebSockets",
      "Optimized database queries for 50% performance gain",
    ],
  },
  {
    title: "Frontend Developer",
    period: "2019 - 2021",
    company: "Intellidine",
    description: [
      "Created responsive and accessible UI components",
      "Improved page load times by 40%",
      "Led design system initiative for consistency",
    ],
  },
]

export default function ExperienceView({ data, onNavigate }: ExperienceViewProps) {
  const experiencesToRender = Array.isArray(data) && data.length > 0 ? data : defaultExperiences

  return (
    <motion.div className="space-y-3 md:space-y-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      {experiencesToRender.map((exp, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.1 }}
          /* Replace glass class with inline styles using CSS variables */
          whileHover={{ scale: 1.02 }}
          className="group p-3 md:p-4 rounded-lg border border-[#1e293b] backdrop-blur-md transition-all hover:border-[#00d9ff]/50"
          style={{
            background: "var(--glass-bg)",
            backdropFilter: "blur(10px)",
          }}
        >
          <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-2">
            <div>
              <h3 className="text-sm md:text-base font-semibold text-[#e0e7ff] group-hover:text-[#00d9ff] transition-colors">{exp.title}</h3>
              {exp.company && (
                <p className="text-xs text-[#00d9ff]">{exp.company}</p>
              )}
              <p className="text-xs text-[#94a3b8] md:hidden">{exp.period}</p>
            </div>
            <p className="hidden md:block text-xs text-[#94a3b8]">{exp.period}</p>
          </div>
          <ul className="space-y-0.5 md:space-y-1">
            {(Array.isArray(exp.description) ? exp.description : exp.description ? [exp.description] : []).map((item, j) => (
              <li key={j} className="flex gap-2 text-xs md:text-sm text-[#94a3b8] line-clamp-3">
                <ChevronRight size={12} className="text-[#00d9ff] mt-0.5 shrink-0 hidden md:block" />
                <span className="block md:hidden">•</span>
                {item}
              </li>
            ))}
          </ul>
          <div className="mt-3 flex justify-end">
            <motion.button
              whileHover={{ scale: 1.05, x: 5 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                const label = exp.company ? `${exp.title} at ${exp.company}` : exp.title
                onNavigate?.(`Tell me more about what you did at ${exp.company}`)
              }}
              className="cursor-pointer flex items-center gap-1.5 px-2.5 py-1.5 rounded-md bg-[#00d9ff]/10 border border-[#00d9ff]/30 hover:bg-[#00d9ff]/20 hover:border-[#00d9ff]/50 transition-all text-[#00d9ff] text-xs font-medium"
              type="button"
            >
              <span>know more</span>
              <motion.span
                animate={{ x: [0, 3, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              >
                →
              </motion.span>
            </motion.button>
          </div>
        </motion.div>
      ))}
    </motion.div>
  )
}
