"use client"

import { motion } from "framer-motion"
import { ExternalLink, Github } from "lucide-react"

interface Project {
  id: string
  title: string
  description: string
  tags: string[]
  link: string
  github?: string
}

const projects: Project[] = [
  {
    id: "1",
    title: "AI Copilot Platform",
    description: "Full-stack SaaS platform for AI-powered code generation with real-time streaming responses.",
    tags: ["Next.js", "TypeScript", "AI SDK", "Tailwind CSS"],
    link: "#",
    github: "#",
  },
  {
    id: "2",
    title: "Design System",
    description: "Comprehensive component library with 50+ components built with React and Tailwind CSS.",
    tags: ["React", "Storybook", "Tailwind CSS", "TypeScript"],
    link: "#",
    github: "#",
  },
  {
    id: "3",
    title: "Analytics Dashboard",
    description: "Real-time analytics dashboard with interactive charts and data visualization.",
    tags: ["Next.js", "Recharts", "PostgreSQL", "WebSocket"],
    link: "#",
    github: "#",
  },
  {
    id: "4",
    title: "E-commerce Platform",
    description: "Full-stack e-commerce solution with payment processing and inventory management.",
    tags: ["Next.js", "Stripe", "Supabase", "React"],
    link: "#",
    github: "#",
  },
]

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: "easeOut",
    },
  },
}

export default function ProjectsView() {
  return (
    <motion.div className="space-y-3 md:space-y-4" variants={container} initial="hidden" animate="show">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
        {projects.map((project) => (
          <motion.a
            key={project.id}
            href={project.link}
            variants={item}
            whileHover={{ scale: 1.02 }}
            /* Replace glass-hover class with inline styles using CSS variables */
            className="group p-3 md:p-6 rounded-lg cursor-pointer border border-[#1e293b] transition-all backdrop-blur-md hover:border-[#00d9ff]/50"
            style={{
              background: "var(--glass-bg)",
              backdropFilter: "blur(10px)",
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget
              el.style.background = "var(--glass-bg-hover)"
              el.style.borderColor = "var(--glass-border-hover)"
              el.style.boxShadow = "0 0 20px var(--glass-glow-hover)"
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget
              el.style.background = "var(--glass-bg)"
              el.style.borderColor = "var(--glass-border)"
              el.style.boxShadow = "none"
            }}
          >
            <h3 className="text-sm md:text-lg font-semibold text-[#e0e7ff] group-hover:text-[#00d9ff] transition-colors mb-2 line-clamp-2">
              {project.title}
            </h3>
            <p className="text-xs md:text-sm text-[#94a3b8] mb-3 md:mb-4 line-clamp-2">{project.description}</p>
            <div className="flex flex-wrap gap-1.5 md:gap-2 mb-3 md:mb-4">
              {project.tags.map((tag, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.05 }}
                  className="text-xs bg-[#1a1f3a] text-[#00d9ff] px-1.5 py-0.5 md:px-2 md:py-1 rounded border border-[#00d9ff]/20"
                >
                  {tag}
                </motion.span>
              ))}
            </div>
            <div className="flex gap-3">
              <motion.div whileHover={{ scale: 1.2 }} className="cursor-pointer">
                <ExternalLink size={16} className="text-[#94a3b8]" />
              </motion.div>
              {project.github && (
                <motion.div whileHover={{ scale: 1.2 }} className="cursor-pointer">
                  <Github size={16} className="text-[#94a3b8]" />
                </motion.div>
              )}
            </div>
          </motion.a>
        ))}
      </div>
    </motion.div>
  )
}
