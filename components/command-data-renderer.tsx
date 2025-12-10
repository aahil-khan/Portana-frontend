"use client"

import { motion } from "framer-motion"
import { useMemo } from "react"
import { ExternalLink, Github, Calendar } from "lucide-react"
import ProjectsView from "./projects-view"
import StackView from "./stack-view"
import ExperienceView from "./experience-view"
import TimelineView from "./timeline-view"
import StartView from "./start-view"
import AboutView from "./about-view"
import LinkRenderer from "./link-renderer"
import ContactForm from "./contact-form"
import ResumeDownload from "./resume-download"
import ExtensionsSetup from "./extensions-setup"

interface CommandDataRendererProps {
  command: string
  data: any
  onNavigate?: (command: string) => void
}

/**
 * Dynamic component renderer for command responses
 * Renders appropriate component based on command type
 */
export default function CommandDataRenderer({
  command,
  data,
  onNavigate,
}: CommandDataRendererProps) {
  // Guard against undefined command (data can be null for some commands like contact and resume)
  if (!command) {
    return null
  }
  // Store data in a context/state that components can access
  // For now, we'll render placeholder content since existing components use mock data
  
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  }

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="mt-4"
    >
      {command === "start" && (
        <StartView onNavigate={onNavigate} />
      )}

      {command === "about" && (
        <AboutView onNavigate={onNavigate} />
      )}

      {command === "projects" && Array.isArray(data) && data.length > 0 && (
        <motion.div className="space-y-3 md:space-y-4" variants={container} initial="hidden" animate="show">
          <div className="grid grid-cols-1 gap-3 md:gap-4">
            {data.map((project: any, idx: number) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.02 }}
                className="group p-3 md:p-6 rounded-lg border border-[#1e293b] transition-all backdrop-blur-md hover:border-[#00d9ff]/50"
                style={{
                  background: "var(--glass-bg)",
                  backdropFilter: "blur(10px)",
                }}
              >
                <h3 className="text-sm md:text-lg font-display font-bold text-[#e0e7ff] group-hover:text-[#00d9ff] transition-colors mb-2 line-clamp-2">
                  {project.title}
                </h3>
                {project.subtitle && (
                  <p className="text-xs text-[#00d9ff] mb-2">{project.subtitle}</p>
                )}
                <p className="text-xs md:text-sm text-[#94a3b8] mb-3 md:mb-4 line-clamp-2">{project.description}</p>
                <div className="flex flex-wrap gap-1.5 md:gap-2 mb-3">
                  {project.tags?.map((tag: string, i: number) => (
                    <span
                      key={i}
                      className="text-xs bg-[#1a1f3a] text-[#00d9ff] px-1.5 py-0.5 md:px-2 md:py-1 rounded border border-[#00d9ff]/20"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex items-center justify-between gap-3">
                  <div className="flex gap-3">
                    {project.link && project.link !== "#" && (
                      <motion.button
                        whileHover={{ scale: 1.2 }}
                        onClick={() => window.open(project.link, "_blank")}
                        className="cursor-pointer hover:text-[#00d9ff] transition-colors"
                        type="button"
                      >
                        <ExternalLink size={16} className="text-[#94a3b8]" />
                      </motion.button>
                    )}
                    {project.github && project.github !== "#" && (
                      <motion.button
                        whileHover={{ scale: 1.2 }}
                        onClick={() => window.open(project.github, "_blank")}
                        className="cursor-pointer hover:text-[#00d9ff] transition-colors"
                        type="button"
                      >
                        <Github size={16} className="text-[#94a3b8]" />
                      </motion.button>
                    )}
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05, x: 5 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => onNavigate?.(`Tell me more about ${project.title}`)}
                    className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md bg-[#00d9ff]/10 border border-[#00d9ff]/30 hover:bg-[#00d9ff]/20 hover:border-[#00d9ff]/50 transition-all text-[#00d9ff] text-xs font-medium"
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
          </div>
        </motion.div>
      )}

      {command === "stack" && Array.isArray(data) && data.length > 0 && (
        <motion.div className="space-y-3" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          {data.map((category: any, i: number) => {
            // Logo mapping to local files
            const logoMap: Record<string, { file: string; invert: boolean }> = {
              "React.js": { file: "react-original.svg", invert: false },
              "Next.js": { file: "nextjs-original.svg", invert: true },
              "TypeScript": { file: "javascript-original.svg", invert: false },
              "Tailwind CSS": { file: "tailwindcss-original.svg", invert: false },
              "Framer Motion": { file: "react-original.svg", invert: false },
              "Node.js": { file: "nodejs-original.svg", invert: false },
              "Fastify": { file: "nodejs-original.svg", invert: false },
              "PostgreSQL": { file: "postgresql-original.svg", invert: false },
              "PostgreSQL FTS" : { file: "postgresql-original.svg", invert: false },
              "Python": { file: "python-original.svg", invert: false },
              "OpenAI Embeddings": { file: "openai.png", invert: true },
              "OpenAI Chat Completions Endpoint": { file: "openai.png", invert: true },
              "OpenAI Assistants API": { file: "openai.png", invert: true },
              "Prompt Engineering": { file: "openai.png", invert: true },
              "GPT-4o": { file: "python-original.svg", invert: false },
              "Vercel": { file: "vercel-original.svg", invert: true },
              "Git": { file: "git-original.svg", invert: false },
              "GitHub": { file: "github-original.svg", invert: true },
              "Github Actions": { file: "github-original.svg", invert: true },
              "VS Code": { file: "javascript-original.svg", invert: false },
              "Docker": { file: "docker-original.svg", invert: false },
              "Figma": { file: "react-original.svg", invert: false },
              "Express.js": { file: "express-original.svg", invert: true },
              "Redis": { file: "redis-original.svg", invert: false },
              "AWS (EC2)": { file: "amazonwebservices-original-wordmark.svg", invert: true },
              "Amazon Web Services": { file: "amazonwebservices-original-wordmark.svg", invert: false },
              "GraphQL": { file: "graphql-plain.svg", invert: false },
              "MySQL": { file: "mysql-original.svg", invert: true },
              "Flask": { file: "flask-original.svg", invert: true },
              "Jest (unit testing)": { file: "jest-plain.svg", invert: false },
              "Prisma": { file: "prisma-original.svg", invert: false },
              "HTML": { file: "html5-original.svg", invert: false },
              "CSS": { file: "css3-original.svg", invert: false },
              "JavaScript": { file: "javascript-original.svg", invert: false },
              "Java": { file: "java-original.svg", invert: false },
              "C": { file: "c-original.svg", invert: false },
              "C++": { file: "cplusplus-original.svg", invert: false },
              "Vue": { file: "vuejs-original.svg", invert: false },
              "Vue.js": { file: "vuejs-original.svg", invert: false },
              "Elasticsearch": { file: "elasticsearch-original.svg", invert: true },
              "SQLAlchemy": { file: "sqlalchemy-original.svg", invert: true },
              "Heroku": { file: "heroku-original.svg", invert: false },
              "Cloudflare Tunnels": { file: "cloudflare-original.svg", invert: false },
              "Postman": { file: "postman-original.svg", invert: false },
              "Bootstrap": { file: "bootstrap-original.svg", invert: false },
              "Kali": { file: "kalilinux-original.svg", invert: false },
              "Kali Linux": { file: "kalilinux-original.svg", invert: false },
              "SQLite": { file: "sqlite-original.svg", invert: false },
              "LangChain": { file: "langchain.png", invert: true },
              "Qdrant": { file: "qdrant.png", invert: false },
              "CI/CD pipelines": { file: "cicd.png", invert: true },
              "WSL": { file: "wsl.png", invert: false },
              "REST APIs": { file: "rest.png", invert: true },
              "Jinja2": { file: "jinja.png", invert: true },
              "MUI": { file: "mui.png", invert: true }
            }

            return (
              <motion.div
                key={category.name}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="p-3 rounded-lg border border-[#1e293b] hover:border-[#00d9ff]/30 transition-all backdrop-blur-sm"
                style={{
                  background: "rgba(26, 31, 58, 0.4)"
                }}
              >
                <h3 className="text-sm font-display font-bold text-[#00d9ff] mb-2.5">
                  {category.name}
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                  {category.tools?.map((tool: string, j: number) => {
                    const logoInfo = logoMap[tool]
                    
                    return (
                      <motion.div
                        key={j}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        whileHover={{ scale: 1.05 }}
                        className="flex items-center gap-2 px-2.5 py-2 rounded-md bg-[#0f1419]/80 border border-[#1e293b] hover:border-[#00d9ff]/40 hover:bg-[#0f1419] transition-all cursor-default group"
                      >
                        {logoInfo ? (
                          <img
                            src={`/Logos/${logoInfo.file}`}
                            alt={tool}
                            className="w-4 h-4 shrink-0 object-contain"
                            style={{
                              filter: logoInfo.invert ? "invert(1) brightness(2)" : "none"
                            }}
                          />
                        ) : (
                          <div className="w-4 h-4 shrink-0 flex items-center justify-center text-[#00d9ff] text-xs">●</div>
                        )}
                        <span className="text-xs text-[#94a3b8] group-hover:text-[#00d9ff] transition-colors truncate">
                          {tool}
                        </span>
                      </motion.div>
                    )
                  })}
                </div>
              </motion.div>
            )
          })}
        </motion.div>
      )}

      {command === "experience" && Array.isArray(data) && data.length > 0 && (
        <motion.div className="space-y-3 md:space-y-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          {data.map((exp: any, i: number) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className="p-3 md:p-4 rounded-lg border border-[#1e293b] backdrop-blur-md"
              style={{
                background: "var(--glass-bg)",
                backdropFilter: "blur(10px)",
              }}
            >
              <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-2">
                <div>
                  <h3 className="text-sm md:text-base font-display font-bold text-[#e0e7ff]">
                    {exp.title}
                  </h3>
                  <p className="text-xs text-[#00d9ff]">{exp.company}</p>
                  <p className="text-xs text-[#94a3b8] md:hidden">{exp.duration}</p>
                </div>
                <p className="hidden md:block text-xs text-[#94a3b8]">{exp.duration}</p>
              </div>
              <p className="text-xs md:text-sm text-[#94a3b8] mb-3 line-clamp-3">{exp.description}</p>
              {exp.technologies && (
                <div className="flex flex-wrap gap-1.5 md:gap-2 mb-3">
                  {exp.technologies.map((tech: string, j: number) => (
                    <span
                      key={j}
                      className="text-xs bg-[#1a1f3a] text-[#00d9ff] px-1.5 py-0.5 md:px-2 md:py-1 rounded"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              )}
            </motion.div>
          ))}
        </motion.div>
      )}

      {command === "timeline" && Array.isArray(data) && data.length > 0 && (
        <motion.div className="space-y-4 md:space-y-8" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          {data.map((item: any, i: number) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className="flex gap-2 md:gap-4"
            >
              <div className="flex flex-col items-center">
                <div className="w-2 h-2 md:w-3 md:h-3 bg-[#00d9ff] rounded-full mt-1 md:mt-2"></div>
                {i !== data.length - 1 && (
                  <div className="w-0.5 h-12 md:h-20 bg-linear-to-b from-[#00d9ff]/50 to-[#00d9ff]/0 mt-1"></div>
                )}
              </div>
              <div className="pb-4 md:pb-8">
                <span className="text-xs font-mono text-[#00d9ff] font-semibold">
                  {item.date}
                </span>
                <h3 className="text-sm md:text-base font-display font-bold text-[#e0e7ff] mt-1">
                  {item.title}
                </h3>
                {item.subtitle && (
                  <p className="text-xs text-[#94a3b8]">{item.subtitle}</p>
                )}
                <p className="text-xs md:text-sm text-[#94a3b8] mt-2 line-clamp-2">{item.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}

      {command === "blog" && Array.isArray(data) && data.length > 0 && (
        <motion.div className="space-y-3 md:space-y-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          {data.map((article: any, idx: number) => (
            <motion.a
              key={article.id}
              href={article.link}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ scale: 1.02 }}
              className="block p-3 md:p-4 rounded-lg border border-[#1e293b] transition-all backdrop-blur-md hover:border-[#00d9ff]/50 group"
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
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm md:text-base font-semibold text-[#e0e7ff] group-hover:text-[#00d9ff] transition-colors line-clamp-2">
                    {article.title}
                  </h3>
                  <p className="text-xs md:text-sm text-[#94a3b8] mt-1 line-clamp-2">{article.description}</p>

                  <div className="flex flex-wrap gap-1.5 md:gap-2 mt-2 mb-2">
                    {article.tags?.map((tag: string, i: number) => (
                      <span key={i} className="text-xs bg-[#1a1f3a] text-[#00d9ff] px-1.5 py-0.5 rounded border border-[#00d9ff]/20">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-2 text-xs text-[#94a3b8]">
                    <Calendar size={12} />
                    <span>{new Date(article.publishedAt).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })}</span>
                    {article.readTime && <span>• {article.readTime} min read</span>}
                  </div>
                </div>

                <motion.div whileHover={{ scale: 1.2 }} className="shrink-0 mt-1">
                  <ExternalLink size={16} className="text-[#94a3b8] group-hover:text-[#00d9ff] transition-colors" />
                </motion.div>
              </div>
            </motion.a>
          ))}
        </motion.div>
      )}

      {command === "resume" && (
        <ResumeDownload />
      )}

      {command === "contact" && (
        <ContactForm />
      )}

      {command === "misc" && (
        <ExtensionsSetup />
      )}

      {!["start", "about", "projects", "stack", "experience", "timeline", "blog", "resume", "contact", "misc"].includes(command) && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 rounded-lg border border-[#1e293b] bg-[#1a1f3a]/50 text-[#94a3b8]"
        >
        </motion.div>
      )}
    </motion.div>
  )
}
