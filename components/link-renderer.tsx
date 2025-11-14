"use client"

import { motion } from "framer-motion"
import { ExternalLink } from "lucide-react"

interface LinkMatch {
  text: string
  url: string
  isHttp: boolean
}

interface LinkRendererProps {
  content: string
}

export function parseLinkContent(content: string): (string | LinkMatch)[] {
  const urlRegex = /(https?:\/\/[^\s]+|www\.[^\s]+)/gi
  const parts: (string | LinkMatch)[] = []
  let lastIndex = 0

  const matches = Array.from(content.matchAll(urlRegex))

  matches.forEach((match) => {
    const url = match[0]
    const startIndex = match.index || 0

    // Add text before URL
    if (startIndex > lastIndex) {
      parts.push(content.substring(lastIndex, startIndex))
    }

    // Determine display text (show domain or full URL)
    let displayText = url
    try {
      const urlObj = new URL(url.startsWith("http") ? url : `https://${url}`)
      displayText = urlObj.hostname.replace("www.", "")
    } catch {
      displayText = url
    }

    parts.push({
      text: displayText,
      url: url.startsWith("http") ? url : `https://${url}`,
      isHttp: url.startsWith("http"),
    })

    lastIndex = startIndex + url.length
  })

  // Add remaining text
  if (lastIndex < content.length) {
    parts.push(content.substring(lastIndex))
  }

  return parts.length === 0 ? [content] : parts
}

export default function LinkRenderer({ content }: LinkRendererProps) {
  const parts = parseLinkContent(content)

  return (
    <span className="break-words whitespace-pre-wrap">
      {parts.map((part, idx) =>
        typeof part === "string" ? (
          <span key={idx}>{part}</span>
        ) : (
          <motion.a
            key={idx}
            href={part.url}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.02 }}
            className="inline-flex items-center gap-1 text-[#00d9ff] hover:text-[#a78bfa] font-semibold underline transition-colors"
          >
            {part.text}
            <ExternalLink size={12} className="inline" />
          </motion.a>
        )
      )}
    </span>
  )
}
