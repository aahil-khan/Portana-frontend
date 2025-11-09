"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Send, Loader } from "lucide-react"

export default function ChatBox({
  onSendMessage,
  isStreaming,
}: { onSendMessage: (msg: string) => void; isStreaming: boolean }) {
  const [input, setInput] = useState("")
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const handleSubmit = () => {
    if (input.trim() && !isStreaming) {
      onSendMessage(input)
      setInput("")
      if (textareaRef.current) {
        textareaRef.current.style.height = "auto"
      }
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSubmit()
    }
  }

  return (
    <div className="p-6 border-t border-border bg-background/50 backdrop-blur-md">
      <div className="flex gap-3 items-end">
        <textarea
          ref={textareaRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask me about this portfolio..."
          className="flex-1 bg-background/40 border border-border rounded-lg px-4 py-2 text-foreground placeholder-muted-foreground focus:outline-none focus:border-cyan-500/50 resize-none max-h-24"
          rows={1}
        />
        <Button
          onClick={handleSubmit}
          disabled={isStreaming || !input.trim()}
          className="bg-gradient-to-r from-cyan-500 to-violet-500 hover:from-cyan-600 hover:to-violet-600 text-white px-4 py-2 rounded-lg"
        >
          {isStreaming ? <Loader className="animate-spin" size={20} /> : <Send size={20} />}
        </Button>
      </div>
    </div>
  )
}
