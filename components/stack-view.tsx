"use client"

import { motion } from "framer-motion"
import { Code2, Zap } from "lucide-react"

interface StackCategory {
  name: string
  icon: React.ReactNode
  tools: string[]
  color: string
}

const stack: StackCategory[] = [
  {
    name: "Frontend",
    icon: <Code2 size={20} />,
    tools: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
    color: "from-blue-500 to-cyan-400",
  },
  {
    name: "Backend",
    icon: <Zap size={20} />,
    tools: ["Node.js", "Fastify", "PostgreSQL", "TypeScript"],
    color: "from-purple-500 to-pink-400",
  },
  {
    name: "AI & Data",
    icon: <Code2 size={20} />,
    tools: ["GPT-4o", "Qdrant Vector DB", "LLM Integration", "Embeddings"],
    color: "from-orange-500 to-red-400",
  },
  {
    name: "Tools & Deploy",
    icon: <Zap size={20} />,
    tools: ["Vercel", "Git", "VS Code", "Docker", "Figma"],
    color: "from-green-500 to-emerald-400",
  },
]

export default function StackView() {
  return (
    <motion.div className="space-y-3 md:space-y-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-6">
        {stack.map((category, i) => (
          <motion.div
            key={category.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="group p-3 md:p-5 rounded-xl border border-[#1e293b] bg-gradient-to-br from-[#1a1f3a]/80 to-[#0f1419]/80 hover:border-[#00d9ff]/30 transition-all duration-300 backdrop-blur-sm"
          >
            {/* Category Header */}
            <div className="flex items-center gap-2 mb-2 md:mb-4">
              <div className={`p-1.5 md:p-2 rounded-lg bg-gradient-to-br ${category.color}/20 text-[#00d9ff]`}>
                {category.icon}
              </div>
              <h3 className="font-display text-sm md:text-xl font-bold text-[#00d9ff]">{category.name}</h3>
            </div>

            {/* Tools Grid */}
            <div className="flex flex-wrap gap-1.5 md:gap-2">
              {category.tools.map((tool, idx) => (
                <motion.span
                  key={tool}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.1 + idx * 0.05 }}
                  className="px-2 py-1 md:px-2.5 md:py-1.5 text-xs md:text-sm bg-[#0f1419]/60 text-[#e0e7ff] border border-[#1e293b] rounded-md hover:border-[#00d9ff]/50 hover:text-[#00d9ff] hover:shadow-lg hover:shadow-cyan-500/20 transition-all cursor-default whitespace-nowrap"
                >
                  {tool}
                </motion.span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}
