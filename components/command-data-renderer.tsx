"use client"

import { motion } from "framer-motion"
import { useMemo } from "react"
import ProjectsView from "./projects-view"
import StackView from "./stack-view"
import ExperienceView from "./experience-view"
import TimelineView from "./timeline-view"

interface CommandDataRendererProps {
  command: string
  data: any
}

/**
 * Dynamic component renderer for command responses
 * Renders appropriate component based on command type
 */
export default function CommandDataRenderer({
  command,
  data,
}: CommandDataRendererProps) {
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
      {command === "projects" && Array.isArray(data) && data.length > 0 && (
        <motion.div className="space-y-4" variants={container} initial="hidden" animate="show">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {data.map((project: any, idx: number) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="group p-6 rounded-lg cursor-pointer border border-[#1e293b] transition-all backdrop-blur-md hover:border-[#00d9ff]/50"
                style={{
                  background: "var(--glass-bg)",
                  backdropFilter: "blur(10px)",
                }}
              >
                <h3 className="text-lg font-display font-bold text-[#e0e7ff] group-hover:text-[#00d9ff] transition-colors mb-2">
                  {project.title}
                </h3>
                {project.subtitle && (
                  <p className="text-xs text-[#00d9ff] mb-2">{project.subtitle}</p>
                )}
                <p className="text-sm text-[#94a3b8] mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.tags?.map((tag: string, i: number) => (
                    <span
                      key={i}
                      className="text-xs bg-[#1a1f3a] text-[#00d9ff] px-2 py-1 rounded border border-[#00d9ff]/20"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {command === "stack" && Array.isArray(data) && data.length > 0 && (
        <motion.div className="space-y-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          {data.map((category: any, i: number) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <h3 className="text-sm font-display font-bold text-[#00d9ff] mb-3">
                {category.name}
              </h3>
              <div className="flex flex-wrap gap-2">
                {category.tools?.map((tool: string, j: number) => (
                  <span
                    key={j}
                    className="px-3 py-2 text-sm bg-[#1a1f3a] text-[#e0e7ff] border border-[#1e293b] rounded-lg hover:border-[#00d9ff]/50 hover:text-[#00d9ff] transition-all cursor-default"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}

      {command === "experience" && Array.isArray(data) && data.length > 0 && (
        <motion.div className="space-y-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          {data.map((exp: any, i: number) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className="p-4 rounded-lg border border-[#1e293b] backdrop-blur-md"
              style={{
                background: "var(--glass-bg)",
                backdropFilter: "blur(10px)",
              }}
            >
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h3 className="text-base font-display font-bold text-[#e0e7ff]">
                    {exp.title}
                  </h3>
                  <p className="text-xs text-[#00d9ff]">{exp.company}</p>
                  <p className="text-xs text-[#94a3b8]">{exp.duration}</p>
                </div>
              </div>
              <p className="text-sm text-[#94a3b8] mb-3">{exp.description}</p>
              {exp.technologies && (
                <div className="flex flex-wrap gap-2 mb-3">
                  {exp.technologies.map((tech: string, j: number) => (
                    <span
                      key={j}
                      className="text-xs bg-[#1a1f3a] text-[#00d9ff] px-2 py-1 rounded"
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
        <motion.div className="space-y-8" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          {data.map((item: any, i: number) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className="flex gap-4"
            >
              <div className="flex flex-col items-center">
                <div className="w-3 h-3 bg-[#00d9ff] rounded-full mt-2"></div>
                {i !== data.length - 1 && (
                  <div className="w-0.5 h-20 bg-linear-to-b from-[#00d9ff]/50 to-[#00d9ff]/0 mt-1"></div>
                )}
              </div>
              <div className="pb-8">
                <span className="text-xs font-mono text-[#00d9ff] font-semibold">
                  {item.date}
                </span>
                <h3 className="text-base font-display font-bold text-[#e0e7ff] mt-1">
                  {item.title}
                </h3>
                {item.subtitle && (
                  <p className="text-xs text-[#94a3b8]">{item.subtitle}</p>
                )}
                <p className="text-sm text-[#94a3b8] mt-2">{item.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}

      {!["projects", "stack", "experience", "timeline"].includes(command) && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 rounded-lg border border-[#1e293b] bg-[#1a1f3a]/50 text-[#94a3b8]"
        >
          <p className="text-sm">
            Data received for: <span className="text-[#00d9ff]">{command}</span>
          </p>
        </motion.div>
      )}
    </motion.div>
  )
}
