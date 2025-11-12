"use client"

import { motion } from "framer-motion"
import { Link2 } from "lucide-react"

interface Citation {
  source: string
  snippet?: string
}

interface CitationsProps {
  citations?: Citation[]
}

export default function Citations({ citations = [] }: CitationsProps) {
  if (!citations || citations.length === 0) {
    return null
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
      className="mt-4 pt-4 border-t border-[#1e293b]"
    >
      <div className="flex items-center gap-2 mb-3">
        <Link2 size={14} className="text-[#00d9ff]" />
        <p className="text-xs text-[#94a3b8] font-semibold">Sources</p>
      </div>

      <div className="space-y-2">
        {citations.map((citation, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 + idx * 0.1 }}
            className="text-xs bg-[#1a1f3a] border border-[#1e293b] rounded p-2 hover:border-[#00d9ff]/30 transition-colors"
          >
            <p className="text-[#00d9ff] font-semibold mb-1">{citation.source}</p>
            {citation.snippet && (
              <p className="text-[#94a3b8] line-clamp-2">{citation.snippet}</p>
            )}
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}
