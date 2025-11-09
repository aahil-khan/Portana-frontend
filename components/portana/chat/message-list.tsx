import type React from "react"
import { MessageCircle, User } from "lucide-react"

export default function MessageList({
  messages,
  messagesEndRef,
}: { messages: any[]; messagesEndRef: React.RefObject<HTMLDivElement> }) {
  return (
    <div className="flex-1 overflow-y-auto p-6 space-y-4">
      {messages.map((msg, idx) => (
        <div key={idx} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
          <div
            className={`max-w-md rounded-lg px-4 py-3 ${
              msg.role === "user"
                ? "bg-gradient-to-r from-cyan-500/20 to-violet-500/20 border border-cyan-500/30 text-foreground"
                : "bg-background/40 border border-border text-foreground backdrop-blur-md"
            }`}
          >
            <div className="flex items-start gap-3">
              {msg.role === "ai" && <MessageCircle size={18} className="text-cyan-400 flex-shrink-0 mt-1" />}
              <p className="text-sm leading-relaxed">{msg.content}</p>
              {msg.role === "user" && <User size={18} className="text-violet-400 flex-shrink-0 mt-1" />}
            </div>
          </div>
        </div>
      ))}
      <div ref={messagesEndRef} />
    </div>
  )
}
