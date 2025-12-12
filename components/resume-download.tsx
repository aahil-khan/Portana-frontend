"use client"

import { motion } from "framer-motion"
import { Download, FileText } from "lucide-react"
import { useState, useMemo } from "react"
import { API_URL } from "@/lib/config"
import { trackResumeDownload } from "@/lib/analytics"

interface ResumeDownloadProps {
  downloadUrl?: string
  fileName?: string
}

export default function ResumeDownload({
  downloadUrl,
  fileName = "Aahil Khan.pdf",
}: ResumeDownloadProps) {
  const [isDownloading, setIsDownloading] = useState(false)
  
  const finalDownloadUrl = useMemo(() => {
    const url = downloadUrl || `${API_URL}/api/misc/resume`
    return url
  }, [downloadUrl])

  const handleDownload = async () => {
    try {
      setIsDownloading(true)
      trackResumeDownload()

      const response = await fetch(finalDownloadUrl)
      if (!response.ok) {
        throw new Error(`Download failed with status ${response.status}`)
      }

      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = fileName
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
      document.body.removeChild(a)
    } catch (error) {
      console.error("Download error:", error)
      // Fallback: open in new window
      window.open(finalDownloadUrl, "_blank")
    } finally {
      setIsDownloading(false)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="mt-4 p-4 md:p-6 rounded-lg border border-[#1e293b] backdrop-blur-md"
      style={{
        background: "var(--glass-bg)",
        backdropFilter: "blur(10px)",
      }}
    >
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-lg bg-[#1a1f3a] border border-[#00d9ff]/30">
            <FileText size={24} className="text-[#00d9ff]" />
          </div>
          <div>
            <h4 className="text-sm md:text-base font-semibold text-[#e0e7ff]">{fileName}</h4>
            <p className="text-xs text-[#94a3b8]">Professional resume and background</p>
          </div>
        </div>

        <motion.button
          onClick={handleDownload}
          disabled={isDownloading}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-4 py-2 md:px-6 md:py-3 bg-gradient-to-r from-[#00d9ff] to-[#a78bfa] text-[#0b0d10] font-semibold rounded-lg transition-all hover:shadow-lg hover:shadow-[#00d9ff]/50 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 whitespace-nowrap"
        >
          <Download size={18} />
          {isDownloading ? "Downloading..." : "Download"}
        </motion.button>
      </div>
    </motion.div>
  )
}
