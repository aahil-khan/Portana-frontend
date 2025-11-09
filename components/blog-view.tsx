"use client"

import { motion } from "framer-motion"
import { ExternalLink, Calendar, Clock } from "lucide-react"

interface BlogPost {
  id: string
  title: string
  summary: string
  readTime: number
  date: string
  link: string
}

const blogPosts: BlogPost[] = [
  {
    id: "1",
    title: "Building AI-Powered Applications with React",
    summary: "Exploring how to integrate AI models into React applications for intelligent user experiences.",
    readTime: 8,
    date: "Nov 2024",
    link: "#",
  },
  {
    id: "2",
    title: "Modern Next.js Patterns and Best Practices",
    summary: "Deep dive into the latest Next.js 15 features and architectural patterns for scalable applications.",
    readTime: 12,
    date: "Oct 2024",
    link: "#",
  },
  {
    id: "3",
    title: "Designing Beautiful Glassmorphic UIs",
    summary: "Creating stunning glass-effect interfaces with modern CSS and design principles.",
    readTime: 6,
    date: "Sep 2024",
    link: "#",
  },
  {
    id: "4",
    title: "TypeScript Advanced Types Explained",
    summary: "Master advanced TypeScript concepts to write more robust and maintainable code.",
    readTime: 10,
    date: "Aug 2024",
    link: "#",
  },
]

export default function BlogView() {
  return (
    <motion.div className="space-y-3" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
      {blogPosts.map((post, i) => (
        <motion.a
          key={post.id}
          href={post.link}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.05 }}
          /* Replace glass-hover class with inline styles using CSS variables */
          className="block p-4 rounded-lg border border-[#1e293b] group transition-all backdrop-blur-md hover:border-[#00d9ff]/50"
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
          <div className="flex items-start justify-between mb-2">
            <h3 className="text-base font-semibold text-[#e0e7ff] group-hover:text-[#00d9ff] transition-colors flex-1">
              {post.title}
            </h3>
            <ExternalLink size={16} className="text-[#94a3b8] mt-1" />
          </div>
          <p className="text-sm text-[#94a3b8] mb-3">{post.summary}</p>
          <div className="flex gap-4 text-xs text-[#475569]">
            <span className="flex items-center gap-1">
              <Calendar size={14} />
              {post.date}
            </span>
            <span className="flex items-center gap-1">
              <Clock size={14} />
              {post.readTime} min read
            </span>
          </div>
        </motion.a>
      ))}
    </motion.div>
  )
}
