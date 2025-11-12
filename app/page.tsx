"use client"

import { useEffect, useState, useRef } from "react"
import BootScreen from "@/components/boot-screen"
import ChatInterface from "@/components/chat-interface"
import Sidebar from "@/components/sidebar"
import BackgroundEffects from "@/components/background-effects"

export default function Home() {
  const [showBoot, setShowBoot] = useState(true)
  const [bootComplete, setBootComplete] = useState(false)
  const chatInterfaceRef = useRef<{ sendMessage: (message: string) => void } | null>(null)

  useEffect(() => {
    const timer = setTimeout(() => {
      setBootComplete(true)
    }, 3500)

    const fadeTimer = setTimeout(() => {
      setShowBoot(false)
    }, 4000)

    return () => {
      clearTimeout(timer)
      clearTimeout(fadeTimer)
    }
  }, [])

  const handleSidebarNavigate = (command: string) => {
    chatInterfaceRef.current?.sendMessage(command)
  }

  return (
    <>
      <BackgroundEffects />

      <main className="min-h-screen bg-background relative">
        {showBoot && <BootScreen complete={bootComplete} />}
        {!showBoot && (
          <>
            <Sidebar onNavigate={handleSidebarNavigate} />
            {/* Main content with padding for sidebar (only on desktop) */}
            <div className="lg:ml-20">
              <ChatInterface ref={chatInterfaceRef} />
            </div>
          </>
        )}
      </main>
    </>
  )
}
