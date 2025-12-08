"use client"

import { motion } from "framer-motion"

interface StackItem {
  name: string
  logo: string
  color: string
}

interface StackCategory {
  name: string
  items: StackItem[]
  gradient: string
}

const stack: StackCategory[] = [
  {
    name: "Frontend",
    gradient: "from-[#00d9ff]/20 to-[#61dafb]/20",
    items: [
      { name: "React", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg", color: "#61dafb" },
      { name: "Next.js", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg", color: "#ffffff" },
      { name: "TypeScript", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg", color: "#3178c6" },
      { name: "Tailwind CSS", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg", color: "#06b6d4" },
      { name: "Framer Motion", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/framermotion/framermotion-original.svg", color: "#bb4b96" },
    ],
  },
  {
    name: "Backend",
    gradient: "from-[#a78bfa]/20 to-[#8b5cf6]/20",
    items: [
      { name: "Node.js", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg", color: "#339933" },
      { name: "Fastify", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastify/fastify-original.svg", color: "#000000" },
      { name: "PostgreSQL", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg", color: "#4169e1" },
      { name: "TypeScript", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg", color: "#3178c6" },
    ],
  },
  {
    name: "AI & Data",
    gradient: "from-[#f97316]/20 to-[#ef4444]/20",
    items: [
      { name: "OpenAI", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/openai/openai-original.svg", color: "#10a37f" },
      { name: "Qdrant", logo: "https://qdrant.tech/img/logo.svg", color: "#dc2626" },
      { name: "Python", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg", color: "#3776ab" },
      { name: "Embeddings", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg", color: "#ff6f00" },
    ],
  },
  {
    name: "Tools & Deploy",
    gradient: "from-[#10b981]/20 to-[#059669]/20",
    items: [
      { name: "Vercel", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vercel/vercel-original.svg", color: "#ffffff" },
      { name: "Git", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg", color: "#f05032" },
      { name: "VS Code", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg", color: "#007acc" },
      { name: "Docker", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg", color: "#2496ed" },
      { name: "Figma", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg", color: "#f24e1e" },
    ],
  },
]

export default function StackView() {
  return (
    <motion.div className="space-y-4 md:space-y-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        {stack.map((category, i) => (
          <motion.div
            key={category.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="group p-4 md:p-6 rounded-xl border border-[#1e293b] hover:border-[#00d9ff]/30 transition-all duration-300 backdrop-blur-sm relative overflow-hidden"
            style={{
              background: `linear-gradient(to bottom right, ${category.gradient.includes('00d9ff') ? 'rgba(0, 217, 255, 0.2)' : category.gradient.includes('a78bfa') ? 'rgba(167, 139, 250, 0.2)' : category.gradient.includes('f97316') ? 'rgba(249, 115, 22, 0.2)' : 'rgba(16, 185, 129, 0.2)'}, rgba(15, 20, 25, 0.8))`
            }}
          >
            {/* Category Header */}
            <h3 className="font-display text-base md:text-xl font-bold text-[#00d9ff] mb-4">{category.name}</h3>

            {/* Tools Grid */}
            <div className="grid grid-cols-3 gap-3 md:gap-4">
              {category.items.map((item, idx) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.1 + idx * 0.05 }}
                  className="flex flex-col items-center gap-2 p-3 rounded-lg bg-[#0f1419]/60 border border-[#1e293b] hover:border-[#00d9ff]/50 hover:scale-105 transition-all cursor-default group/item"
                  whileHover={{ y: -4 }}
                >
                  <div className="relative w-10 h-10 md:w-12 md:h-12 flex items-center justify-center">
                    <img
                      src={item.logo}
                      alt={item.name}
                      className="w-full h-full object-contain filter group-hover/item:drop-shadow-[0_0_8px_rgba(0,217,255,0.6)] transition-all"
                      style={{
                        filter: item.name === "Next.js" || item.name === "Vercel" || item.name === "Fastify" 
                          ? "invert(1) brightness(2)" 
                          : "none"
                      }}
                    />
                  </div>
                  <span className="text-[10px] md:text-xs text-[#94a3b8] group-hover/item:text-[#00d9ff] transition-colors text-center font-medium">
                    {item.name}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}
