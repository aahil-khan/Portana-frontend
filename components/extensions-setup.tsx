"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Download, Copy, Check } from "lucide-react"
import { API_URL } from "@/lib/config"

export default function ExtensionsSetup() {
  const [copiedMac, setCopiedMac] = useState(false)
  const [copiedWindows, setCopiedWindows] = useState(false)

  const macCommand = "cat ~/Downloads/aahil-vscode-extensions.txt | xargs -I {} code --install-extension {}"
  const windowsCommand = '$content = Get-Content $env:USERPROFILE\\Downloads\\aahil-vscode-extensions.txt; $content | ForEach-Object { code --install-extension $_ }'

  const handleCopy = (text: string, setFunc: (val: boolean) => void) => {
    navigator.clipboard.writeText(text)
    setFunc(true)
    setTimeout(() => setFunc(false), 2000)
  }

  const handleDownload = () => {
    window.location.href = `${API_URL}/api/misc/extensions`
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6 mt-4"
    >
      {/* Download Section */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="p-4 md:p-6 rounded-lg border border-[#1e293b] backdrop-blur-md"
        style={{
          background: "var(--glass-bg)",
          backdropFilter: "blur(10px)",
        }}
      >
        <h3 className="text-sm md:text-base font-display font-bold text-[#e0e7ff] mb-3">
          Step 1: Download Extensions List
        </h3>
        <p className="text-xs md:text-sm text-[#94a3b8] mb-4">
          Click the button below to download my VS Code extensions configuration file.
        </p>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleDownload}
          className="w-full px-4 py-3 md:py-4 bg-linear-to-r from-[#00d9ff] to-[#a78bfa] text-[#0b0d10] font-semibold rounded-lg transition-all hover:shadow-lg hover:shadow-[#00d9ff]/50 flex items-center justify-center gap-2"
        >
          <Download size={18} />
          Download Extensions List
        </motion.button>
      </motion.div>

      {/* macOS Instructions */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="p-4 md:p-6 rounded-lg border border-[#1e293b] backdrop-blur-md"
        style={{
          background: "var(--glass-bg)",
          backdropFilter: "blur(10px)",
        }}
      >
        <h3 className="text-sm md:text-base font-display font-bold text-[#e0e7ff] mb-3">
          macOS Installation
        </h3>
        <ol className="space-y-3 text-xs md:text-sm text-[#94a3b8]">
          <li className="flex gap-3">
            <span className="text-[#00d9ff] font-semibold min-w-fit">1.</span>
            <span>Move the downloaded file to your home directory or remember its location</span>
          </li>
          <li className="flex gap-3">
            <span className="text-[#00d9ff] font-semibold min-w-fit">2.</span>
            <span>Open Terminal and paste the command below</span>
          </li>
          <li className="flex gap-3">
            <span className="text-[#00d9ff] font-semibold min-w-fit">3.</span>
            <span>Press Enter and wait for all extensions to install</span>
          </li>
        </ol>

        <div className="mt-4 p-3 bg-[#1a1f3a] border border-[#1e293b] rounded-lg font-mono text-xs md:text-sm text-[#e0e7ff] break-all whitespace-pre-wrap">
          {macCommand}
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => handleCopy(macCommand, setCopiedMac)}
          className="mt-3 w-full px-4 py-2 bg-[#1a1f3a] border border-[#00d9ff]/30 text-[#00d9ff] font-semibold rounded-lg transition-all hover:bg-[#1e293b] flex items-center justify-center gap-2"
        >
          {copiedMac ? (
            <>
              <Check size={16} />
              Copied!
            </>
          ) : (
            <>
              <Copy size={16} />
              Copy Command
            </>
          )}
        </motion.button>
      </motion.div>

      {/* Windows Instructions */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="p-4 md:p-6 rounded-lg border border-[#1e293b] backdrop-blur-md"
        style={{
          background: "var(--glass-bg)",
          backdropFilter: "blur(10px)",
        }}
      >
        <h3 className="text-sm md:text-base font-display font-bold text-[#e0e7ff] mb-3">
          Windows Installation
        </h3>
        <ol className="space-y-3 text-xs md:text-sm text-[#94a3b8]">
          <li className="flex gap-3">
            <span className="text-[#00d9ff] font-semibold min-w-fit">1.</span>
            <span>Move the downloaded file to your Downloads folder</span>
          </li>
          <li className="flex gap-3">
            <span className="text-[#00d9ff] font-semibold min-w-fit">2.</span>
            <span>Open PowerShell as Administrator</span>
          </li>
          <li className="flex gap-3">
            <span className="text-[#00d9ff] font-semibold min-w-fit">3.</span>
            <span>Paste the command below and press Enter</span>
          </li>
          <li className="flex gap-3">
            <span className="text-[#00d9ff] font-semibold min-w-fit">4.</span>
            <span>Wait for all extensions to install</span>
          </li>
        </ol>

        <div className="mt-4 p-3 bg-[#1a1f3a] border border-[#1e293b] rounded-lg font-mono text-xs md:text-sm text-[#e0e7ff] break-all whitespace-pre-wrap">
          {windowsCommand}
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => handleCopy(windowsCommand, setCopiedWindows)}
          className="mt-3 w-full px-4 py-2 bg-[#1a1f3a] border border-[#00d9ff]/30 text-[#00d9ff] font-semibold rounded-lg transition-all hover:bg-[#1e293b] flex items-center justify-center gap-2"
        >
          {copiedWindows ? (
            <>
              <Check size={16} />
              Copied!
            </>
          ) : (
            <>
              <Copy size={16} />
              Copy Command
            </>
          )}
        </motion.button>
      </motion.div>
    </motion.div>
  )
}
