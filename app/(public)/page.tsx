"use client"

import { useState, useRef, useEffect } from "react"
import ChatBox from "@/components/portana/chat/chat-box"
import MessageList from "@/components/portana/chat/message-list"
import SourcePanel from "@/components/portana/chat/source-panel"

export default function PortfolioPage() {
  const [messages, setMessages] = useState<Array<{ role: "user" | "ai"; content: string; sources?: any[] }>>([
    {
      role: "ai",
      content: "Hi! I'm Aahil's AI assistant. Ask me anything about their experience, projects, or skills.",
    },
  ])
  const [isStreaming, setIsStreaming] = useState(false)
  const [sources, setSources] = useState<any[]>([])
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = async (query: string) => {
    // Add user message
    setMessages((prev) => [...prev, { role: "user", content: query }])
    setIsStreaming(true)

    try {
      // TODO: Call /api/chat/ask endpoint with SSE
      const response = await fetch("https://portana-api.aahil-khan.tech/api/chat/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query, session_id: "temp-session" }),
      })

      const reader = response.body?.getReader()
      const decoder = new TextDecoder()
      let aiResponse = ""
      let currentSources: any[] = []

      while (reader) {
        const { done, value } = await reader.read()
        if (done) break

        const chunk = decoder.decode(value)
        const lines = chunk.split("\n")

        for (const line of lines) {
          if (line.startsWith("data: ")) {
            const data = JSON.parse(line.slice(6))

            if (data.type === "sources") {
              currentSources = data.sources
              setSources(data.sources)
            } else if (data.type === "token") {
              aiResponse += data.content
              setMessages((prev) => {
                const updated = [...prev]
                if (updated[updated.length - 1].role === "ai") {
                  updated[updated.length - 1].content = aiResponse
                } else {
                  updated.push({ role: "ai", content: aiResponse, sources: currentSources })
                }
                return updated
              })
            } else if (data.type === "done") {
              setMessages((prev) => {
                const updated = [...prev]
                updated[updated.length - 1].sources = currentSources
                return updated
              })
            }
          }
        }
      }
    } catch (error) {
      console.error("Error sending message:", error)
    }

    setIsStreaming(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1a1f2e] to-[#0f1218] flex flex-col">
      <div className="flex-1 overflow-hidden flex">
        <div className="flex-1 flex flex-col overflow-hidden">
          <MessageList messages={messages} messagesEndRef={messagesEndRef} />
          <ChatBox onSendMessage={handleSendMessage} isStreaming={isStreaming} />
        </div>
        <SourcePanel sources={sources} />
      </div>
    </div>
  )
}
