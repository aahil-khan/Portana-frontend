"use client"

import { motion } from "framer-motion"

export default function ContentCard({ component: Component, onComplete }: { component: any; onComplete?: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      /* Replace glass class with inline styles using CSS variables */
      className="rounded-lg p-6 border border-[#00d9ff]/20 backdrop-blur-md"
      style={{
        background: "var(--glass-bg)",
        backdropFilter: "blur(10px)",
        borderColor: "var(--glass-border)",
      }}
    >
      <Component onComplete={onComplete} />
    </motion.div>
  )
}
