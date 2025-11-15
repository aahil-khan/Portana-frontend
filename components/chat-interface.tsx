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

interface ChatInterfaceProps {
  onMenuToggle?: () => void
}

const ChatInterface = forwardRef<ChatInterfaceHandle, ChatInterfaceProps>(({ onMenuToggle }, ref) => {
  // Generate or retrieve unique session ID
  const [sessionId] = useState(() => {
    if (typeof window !== 'undefined') {
      let id = localStorage.getItem('portana_session_id')
      if (!id) {
        id = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
        localStorage.setItem('portana_session_id', id)
      }
      return id
    }
    return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
  })

  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content:
        "Hey! I'm Portana, Aahil's AI portfolio assistant. Type /start to get a complete introduction, or explore using commands like /projects, /experience, /stack, /blog, /resume, /contact, and more!",
      sender: "assistant",
      timestamp: new Date(),
    },
  ])
  const [hasUsedStart, setHasUsedStart] = useState(false)
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [showCommands, setShowCommands] = useState(false)
  const [selectedCommandIndex, setSelectedCommandIndex] = useState(0)
  const [showScrollButton, setShowScrollButton] = useState(false)
  const [isUserScrolling, setIsUserScrolling] = useState(false)
  const [topBarOffset, setTopBarOffset] = useState(0)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const lastUserMessageRef = useRef<HTMLDivElement>(null)
  const topBarRef = useRef<HTMLDivElement>(null)
  const commandMenuRef = useRef<HTMLDivElement>(null)
  const commandItemsRef = useRef<(HTMLButtonElement | null)[]>([])

  const availableCommands = [
    { command: "/start", description: "Welcome introduction & usage guide" },
    { command: "/projects", description: "View portfolio projects" },
    { command: "/blog", description: "Latest blog posts" },
    { command: "/stack", description: "Tech stack and specialties" },
    { command: "/experience", description: "Professional experience" },
    { command: "/timeline", description: "Professional timeline" },
    { command: "/resume", description: "Download my resume" },
    { command: "/contact", description: "Contact form" },
    { command: "/misc", description: "Miscellaneous tools" },
    { command: "/help", description: "Show available commands" },
  ]

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    setShowScrollButton(false)
  }

  const scrollUserMessageToTop = () => {
    requestAnimationFrame(() => {
      if (!lastUserMessageRef.current) return
      lastUserMessageRef.current.scrollIntoView({ behavior: "smooth", block: "start" })
    })
  }

  const checkScrollPosition = () => {
    const container = scrollContainerRef.current
    if (!container) return

    const { scrollTop, scrollHeight, clientHeight } = container
    const distanceFromBottom = scrollHeight - scrollTop - clientHeight
    
    // Show button if user scrolled up more than 100px from bottom
    setShowScrollButton(distanceFromBottom > 100)
  }

  // Don't auto-scroll on new messages - let user control their position
  useEffect(() => {
    // Just check scroll position when messages change
    checkScrollPosition()
    
    // If last message is from user, scroll it to top
    if (messages.length > 0 && messages[messages.length - 1].sender === "user") {
      scrollUserMessageToTop()
    }
  }, [messages])

  useEffect(() => {
    // Show commands when input starts with /
    if (input.startsWith("/") && input.length > 0) {
      setShowCommands(true)
      setSelectedCommandIndex(0)
    } else {
      setShowCommands(false)
    }
  }, [input])

  useEffect(() => {
    // Global keyboard shortcut: Ctrl+/ to focus input
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === "/") {
        e.preventDefault()
        inputRef.current?.focus()
      }
    }

    window.addEventListener("keydown", handleGlobalKeyDown)
    return () => window.removeEventListener("keydown", handleGlobalKeyDown)
  }, [])

  useEffect(() => {
    const container = scrollContainerRef.current
    if (!container) return

    container.addEventListener("scroll", checkScrollPosition)
    return () => container.removeEventListener("scroll", checkScrollPosition)
  }, [])

  useEffect(() => {
    const topBarEl = topBarRef.current
    if (!topBarEl) return

    const updateOffset = () => {
      const rect = topBarEl.getBoundingClientRect()
      setTopBarOffset(rect.height + 16) // add a small breathing room below the bar
    }

    updateOffset()

    if (typeof ResizeObserver !== "undefined") {
      const observer = new ResizeObserver(updateOffset)
      observer.observe(topBarEl)
      return () => observer.disconnect()
    } else {
      window.addEventListener("resize", updateOffset)
      return () => window.removeEventListener("resize", updateOffset)
    }
  }, [])

  useEffect(() => {
    const container = scrollContainerRef.current
    if (!container || !topBarOffset) return

    container.style.scrollPaddingTop = `${topBarOffset}px`
    return () => {
      container.style.scrollPaddingTop = ""
    }
  }, [topBarOffset])

  useImperativeHandle(ref, () => ({
    sendMessage: (message: string) => {
      handleSendMessage(message)
    },
  }))

  const handleCommandSuggestion = async (command: string) => {
    try {
      // Check if /start has been used already
      if (command === "start" && hasUsedStart) {
        const warningMessage: Message = {
          id: Date.now().toString(),
          content: "You've already used /start for this session! You can explore the other commands or ask me anything.",
          sender: "assistant",
          timestamp: new Date(),
        }
        setMessages((prev) => [...prev, warningMessage])
        return
      }

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
      
      // Mark /start as used
      if (command === "start") {
        setHasUsedStart(true)
      }
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
        
        // Check if /start has been used already
        if (command === "start" && hasUsedStart) {
          const warningMessage: Message = {
            id: (Date.now() + 1).toString(),
            content: "You've already used /start for this session! You can explore the other commands or ask me anything.",
            sender: "assistant",
            timestamp: new Date(),
          }
          setMessages((prev) => [...prev, warningMessage])
          setIsLoading(false)
          return
        }
        
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
          
          // Mark /start as used
          if (command === "start") {
            setHasUsedStart(true)
          }
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
              sessionId: sessionId,
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

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!showCommands) return

    const filteredCommands = availableCommands.filter(cmd =>
      cmd.command.toLowerCase().startsWith(input.toLowerCase())
    )

    if (e.key === "ArrowDown") {
      e.preventDefault()
      setSelectedCommandIndex(prev => {
        const newIndex = prev < filteredCommands.length - 1 ? prev + 1 : prev
        // Scroll selected item into view after state update
        setTimeout(() => {
          commandItemsRef.current[newIndex]?.scrollIntoView({ behavior: "smooth", block: "nearest" })
        }, 0)
        return newIndex
      })
    } else if (e.key === "ArrowUp") {
      e.preventDefault()
      setSelectedCommandIndex(prev => {
        const newIndex = prev > 0 ? prev - 1 : 0
        // Scroll selected item into view after state update
        setTimeout(() => {
          commandItemsRef.current[newIndex]?.scrollIntoView({ behavior: "smooth", block: "nearest" })
        }, 0)
        return newIndex
      })
    } else if (e.key === "Tab" || e.key === "Enter") {
      if (filteredCommands.length > 0) {
        e.preventDefault()
        setInput(filteredCommands[selectedCommandIndex].command)
        setShowCommands(false)
        if (e.key === "Enter") {
          handleSendMessage(filteredCommands[selectedCommandIndex].command)
        }
      }
    } else if (e.key === "Escape") {
      setShowCommands(false)
    }
  }

  const handleCommandClick = (command: string) => {
    setInput(command)
    setShowCommands(false)
    inputRef.current?.focus()
  }

  return (
    <div className="flex flex-col min-h-dvh bg-background" style={{ minHeight: "100dvh" }}>
      <div
        ref={topBarRef}
        className="sticky z-50"
        style={{ top: "env(safe-area-inset-top, 0px)" }}
      >
        <TopBar onNavigate={handleSendMessage} onMenuToggle={onMenuToggle} />
      </div>

      <div
        ref={scrollContainerRef}
        className="flex-1 overflow-y-auto px-3 md:px-8 py-4 md:py-6 space-y-4 md:space-y-6 overscroll-contain"
        style={{ paddingBottom: "calc(100vh - 12rem)" }}
      >
        <div className="max-w-4xl mx-auto w-full space-y-4 md:space-y-6">
          {messages.map((msg, index) => (
            <div 
              key={msg.id} 
              className="space-y-2"
              ref={msg.sender === "user" && index === messages.length - 1 ? lastUserMessageRef : null}
              style={msg.sender === "user" ? { scrollMarginTop: `${topBarOffset}px` } : undefined}
            >
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

      {/* Scroll to Bottom Button */}
      {showScrollButton && (
        <button
          onClick={scrollToBottom}
          className="fixed bottom-24 right-4 md:right-8 bg-[#00d9ff] hover:bg-[#00b8cc] text-[#0a0e27] rounded-full p-3 shadow-lg transition-all duration-200 z-30 animate-in fade-in slide-in-from-bottom-2"
          aria-label="Scroll to bottom"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 5v14M19 12l-7 7-7-7" />
          </svg>
        </button>
      )}

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
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="> Ask me anything or use /help"
                className="w-full bg-[#1a1f3a] text-foreground placeholder-[#94a3b8] border border-[#1e293b] rounded-lg px-4 py-3 font-mono text-sm focus:outline-none focus:border-[#00d9ff] focus:ring-2 focus:ring-[#00d9ff]/20 transition-all"
                disabled={isLoading}
              />
              
              {/* Command Suggestions Dropdown */}
              {showCommands && (
                <div ref={commandMenuRef} className="absolute bottom-full left-0 right-0 mb-2 bg-[#1a1f3a] border border-[#00d9ff]/30 rounded-lg shadow-lg overflow-hidden z-50 max-h-64 overflow-y-auto">
                  {availableCommands
                    .filter(cmd => cmd.command.toLowerCase().startsWith(input.toLowerCase()))
                    .map((cmd, index) => (
                      <button
                        key={cmd.command}
                        ref={(el) => { commandItemsRef.current[index] = el }}
                        type="button"
                        onClick={() => handleCommandClick(cmd.command)}
                        className={`w-full text-left px-4 py-3 transition-colors ${
                          index === selectedCommandIndex
                            ? "bg-[#00d9ff]/10 border-l-2 border-[#00d9ff]"
                            : "hover:bg-[#1e293b]"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-[#00d9ff] font-mono font-semibold text-sm">
                            {cmd.command}
                          </span>
                          <span className="text-[#94a3b8] text-xs">{cmd.description}</span>
                        </div>
                      </button>
                    ))}
                </div>
              )}
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
