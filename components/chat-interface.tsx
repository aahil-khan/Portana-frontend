"use client"

import type React from "react"

import { useState, useRef, useEffect, forwardRef, useImperativeHandle } from "react"
import { Send } from "lucide-react"
import TopBar from "./top-bar"
import ChatMessage from "./chat-message"
import ContentCard from "./content-card"
import Citations from "./citations"
import CommandSuggestion from "./command-suggestion"
import CommandDataRenderer from "./command-data-renderer"
import { CommandHandler } from "@/lib/command-handler"
import { parseBackendResponse, type BackendResponse } from "@/lib/response-types"

interface Message {
  id: string
  content: string
  sender: "user" | "assistant"
  timestamp: Date
  isStreaming?: boolean
  component?: any
  response?: BackendResponse
}

interface ChatInterfaceHandle {
  sendMessage: (message: string) => void
}

const ChatInterface = forwardRef<ChatInterfaceHandle>((_, ref) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content:
        "Hey! I'm Portana, Aahil's AI portfolio assistant. Ask me about projects, experience, tech stack, or use commands like /projects, /experience, /stack, and more!",
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

  const handleCommandSuggestion = async (command: string) => {
    try {
      const response = await fetch(
        `https://portana-api.aahil-khan.tech/api/commands/${command}`
      )
      if (!response.ok) throw new Error("Failed to fetch command data")

      const data = await response.json()

      const commandMessage: Message = {
        id: Date.now().toString(),
        content: data.content,
        sender: "assistant",
        timestamp: new Date(),
        response: data,
      }

      setMessages((prev) => [...prev, commandMessage])
    } catch (error) {
      console.error("Error fetching command:", error)
    }
  }

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

    try {
      // First, check if it's a direct command
      const isCommand = textToSend.trim().startsWith("/")
      const commandMatch = textToSend.match(/^\/(\w+)/)
      
      if (isCommand && commandMatch) {
        const command = commandMatch[1]
        
        // Fetch from command endpoint
        const response = await fetch(
          `https://portana-api.aahil-khan.tech/api/commands/${command}`
        )
        
        if (response.ok) {
          const data = await response.json()
          const assistantMessage: Message = {
            id: (Date.now() + 1).toString(),
            content: data.content,
            sender: "assistant",
            timestamp: new Date(),
            response: data,
          }
          setMessages((prev) => [...prev, assistantMessage])
        } else {
          // Fallback to mock handler for unknown commands
          const result = CommandHandler.handleCommand(textToSend)
          const assistantMessage: Message = {
            id: (Date.now() + 1).toString(),
            content: result.response,
            sender: "assistant",
            timestamp: new Date(),
            component: result.component,
          }
          setMessages((prev) => [...prev, assistantMessage])
        }
      } else {
        // Natural language query - send to chat API
        const response = await fetch(
          "https://portana-api.aahil-khan.tech/api/chat/message",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              sessionId: "visitor-session",
              message: textToSend,
            }),
          }
        )

        if (!response.ok) throw new Error("Chat API error")

        const data = await response.json()
        
        // Parse the response JSON string
        const parsedResponse = parseBackendResponse(data.response)

        if (parsedResponse) {
          const assistantMessage: Message = {
            id: (Date.now() + 1).toString(),
            content: parsedResponse.content,
            sender: "assistant",
            timestamp: new Date(),
            response: parsedResponse,
          }
          setMessages((prev) => [...prev, assistantMessage])
        } else {
          // Fallback message if parsing fails
          const assistantMessage: Message = {
            id: (Date.now() + 1).toString(),
            content: data.response || "I couldn't process that request.",
            sender: "assistant",
            timestamp: new Date(),
          }
          setMessages((prev) => [...prev, assistantMessage])
        }
      }
    } catch (error) {
      console.error("Error:", error)
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: "Sorry, I encountered an error. Please try again.",
        sender: "assistant",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    handleSendMessage()
  }

  return (
    <div className="flex flex-col min-h-dvh bg-background" style={{ minHeight: "100dvh" }}>
      <div className="sticky z-50" style={{ top: "env(safe-area-inset-top, 0px)" }}>
        <TopBar onNavigate={handleSendMessage} />
      </div>

      <div
        className="flex-1 overflow-y-auto px-3 md:px-8 py-4 md:py-6 space-y-4 md:space-y-6 overscroll-contain"
        style={{ paddingBottom: "calc(env(safe-area-inset-bottom, 0px) + 6rem)" }}
      >
        <div className="max-w-4xl mx-auto w-full space-y-4 md:space-y-6">
          {messages.map((msg, index) => (
            <div key={msg.id} className="space-y-2">
              <ChatMessage message={msg} />

              {/* Handle different response types */}
              {msg.response?.type === "text" && (
                <>
                  {msg.response.citations && (
                    <Citations citations={msg.response.citations} />
                  )}
                </>
              )}

              {msg.response?.type === "hybrid" && (
                <>
                  {msg.response.citations && (
                    <Citations citations={msg.response.citations} />
                  )}
                  {"suggestedCommand" in msg.response &&
                    msg.response.showSuggestion &&
                    msg.response.suggestedCommand && (
                      <CommandSuggestion
                        command={msg.response.suggestedCommand}
                        onExecute={() => {
                          const command = (msg.response as any).suggestedCommand
                          handleCommandSuggestion(command)
                        }}
                      />
                    )}
                </>
              )}

              {msg.response?.type === "command" && (
                <CommandDataRenderer
                  command={msg.response.command}
                  data={msg.response.data}
                />
              )}

              {/* Fallback for legacy component rendering */}
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

      <div
        className="border-t border-[#1e293b] bg-background/95 backdrop-blur px-3 md:px-8 py-4 md:py-6 sticky z-40"
        style={{
          bottom: "env(safe-area-inset-bottom, 0px)",
          paddingBottom: "calc(env(safe-area-inset-bottom, 0px) + 1rem)",
        }}
      >
        <div className="max-w-4xl mx-auto w-full">
          <form onSubmit={handleFormSubmit} className="flex gap-2 md:gap-3">
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
