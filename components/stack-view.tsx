"use client"

import { motion } from "framer-motion"

interface StackCategory {
  name: string
  tools: string[]
}

const stack: StackCategory[] = [
  {
    name: "Frontend",
    tools: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
  },
  {
    name: "Backend",
    tools: ["Node.js", "Express", "PostgreSQL", "Supabase", "Prisma"],
  },
  {
    name: "Tools & Services",
    tools: ["Vercel", "Git", "VS Code", "Figma", "ChatGPT API"],
  },
  {
    name: "Specialties",
    tools: ["Full-Stack Development", "UI/UX Design", "AI Integration", "Performance Optimization"],
  },
]

export default function StackView() {
  return (
    <motion.div className="space-y-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      {stack.map((category, i) => (
        <motion.div
          key={category.name}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
        >
          <h3 className="text-sm font-semibold text-[#00d9ff] mb-3">{category.name}</h3>
          <div className="flex flex-wrap gap-2">
            {category.tools.map((tool) => (
              <span
                key={tool}
                className="px-3 py-2 text-sm bg-[#1a1f3a] text-[#e0e7ff] border border-[#1e293b] rounded-lg hover:border-[#00d9ff]/50 hover:text-[#00d9ff] transition-all cursor-default"
              >
                {tool}
              </span>
            ))}
          </div>
        </motion.div>
      ))}
    </motion.div>
  )
}
