"use client"

import { motion } from "framer-motion"
import { ExternalLink, Calendar } from "lucide-react"

interface BlogArticle {
  id?: string
  title: string
  description?: string
  summary?: string
  link: string
  tags?: string[]
  publishedAt?: string
  date?: string
}

interface BlogViewProps {
  articles?: BlogArticle[]
}

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

export default function BlogView({ articles = [] }: BlogViewProps) {
  return (
    <motion.div className="space-y-3 md:space-y-4" variants={container} initial="hidden" animate="show">
      <div className="space-y-3 md:space-y-4">
        {articles.length > 0 ? (
          articles.map((article, idx) => (
            <motion.a
              key={article.id || idx}
              href={article.link}
              target="_blank"
              rel="noopener noreferrer"
              variants={item}
              whileHover={{ scale: 1.02 }}
              className="group p-3 md:p-4 rounded-lg cursor-pointer border border-[#1e293b] transition-all backdrop-blur-md hover:border-[#00d9ff]/50 block"
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
              <div className="flex items-start justify-between gap-2 mb-2">
                <h3 className="text-sm md:text-base font-semibold text-[#e0e7ff] group-hover:text-[#00d9ff] transition-colors line-clamp-2 flex-1">
                  {article.title}
                </h3>
                <ExternalLink size={16} className="text-[#94a3b8] mt-0.5 flex-shrink-0" />
              </div>
              <p className="text-xs md:text-sm text-[#94a3b8] mb-2 line-clamp-2">
                {article.description || article.summary || ""}
              </p>
              <div className="flex flex-wrap items-center gap-2">
                {(article.publishedAt || article.date) && (
                  <div className="flex items-center gap-1 text-xs text-[#00d9ff]">
                    <Calendar size={12} />
                    <span>
                      {article.publishedAt
                        ? new Date(article.publishedAt).toLocaleDateString()
                        : article.date}
                    </span>
                  </div>
                )}
                {article.tags && article.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {article.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="text-xs bg-[#1a1f3a] text-[#00d9ff] px-1.5 py-0.5 rounded border border-[#00d9ff]/20"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </motion.a>
          ))
        ) : (
          <motion.div
            variants={item}
            className="p-4 rounded-lg border border-[#1e293b] bg-[#1a1f3a]/50 text-[#94a3b8] text-center"
          >
            <p className="text-sm">No articles found. Check back soon!</p>
          </motion.div>
        )}
      </div>
    </motion.div>
  )
}
