"use client"

import type React from "react"

import { useState, useRef, useEffect, forwardRef, useImperativeHandle } from "react"
import { Send } from "lucide-react"
import TopBar from "./top-bar"
import ChatMessage from "./chat-message"
import ContentCard from "./content-card"
import { CommandHandler } from "@/lib/command-handler"

interface Message {
  id: string
  content: string
  sender: "user" | "assistant"
  timestamp: Date
  isStreaming?: boolean
  component?: any
}

interface ChatInterfaceHandle {
  sendMessage: (message: string) => void
}

const ChatInterface = forwardRef<ChatInterfaceHandle>((_, ref) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content:
        "Hey! I'm Aahil's AI persona. Ask me about projects, blog posts, tech stack, or use commands like /projects, /blog, /timeline, and more.",
      sender: "assistant",
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useImperativeHandle(ref, () => ({
    sendMessage: (message: string) => {
      handleSendMessage(message)
    },
  }))

  const handleSendMessage = async (messageText?: string) => {
    const textToSend = messageText || input
    if (!textToSend.trim() || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      content: textToSend,
      sender: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    const result = CommandHandler.handleCommand(textToSend)

    const assistantMessage: Message = {
      id: (Date.now() + 1).toString(),
      content: result.response,
      sender: "assistant",
      timestamp: new Date(),
      isStreaming: true,
      component: result.component,
    }

    await new Promise((resolve) => setTimeout(resolve, 300))
    setMessages((prev) => [...prev, assistantMessage])
    setIsLoading(false)
  }

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    handleSendMessage()
  }

  return (
    <div className="flex flex-col h-screen bg-background">
      <TopBar />

      <div className="flex-1 overflow-y-auto px-4 md:px-8 py-6 space-y-6">
        <div className="max-w-3xl mx-auto w-full space-y-6">
          {messages.map((msg, index) => (
            <div key={msg.id} className="space-y-2">
              <ChatMessage message={msg} />
              {msg.component && <ContentCard component={msg.component} />}
            </div>
          ))}
          {isLoading && (
            <div className="flex gap-2">
              <div className="w-2 h-2 bg-[#00d9ff] rounded-full animate-pulse"></div>
              <div className="w-2 h-2 bg-[#00d9ff] rounded-full animate-pulse delay-100"></div>
              <div className="w-2 h-2 bg-[#00d9ff] rounded-full animate-pulse delay-200"></div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      <div className="border-t border-[#1e293b] bg-background/95 backdrop-blur px-4 md:px-8 py-6">
        <div className="max-w-3xl mx-auto w-full">
          <form onSubmit={handleFormSubmit} className="flex gap-3">
            <div className="flex-1 relative">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="> Ask me anything or use /help"
                className="w-full bg-[#1a1f3a] text-foreground placeholder-[#94a3b8] border border-[#1e293b] rounded-lg px-4 py-3 font-mono text-sm focus:outline-none focus:border-[#00d9ff] focus:ring-2 focus:ring-[#00d9ff]/20 transition-all"
                disabled={isLoading}
              />
            </div>
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="bg-[#00d9ff] hover:bg-[#00b8cc] disabled:opacity-50 disabled:cursor-not-allowed text-[#0a0e27] font-semibold px-4 py-3 rounded-lg transition-all duration-200 flex items-center gap-2"
            >
              <Send size={18} />
            </button>
          </form>
        </div>
      </div>
    </div>
  )
})

ChatInterface.displayName = "ChatInterface"

export default ChatInterface
