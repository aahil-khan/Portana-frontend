"use client"

import { useEffect, useState, useRef } from "react"
import BootScreen from "@/components/boot-screen"
import ChatInterface from "@/components/chat-interface"
import Sidebar from "@/components/sidebar"
import BackgroundEffects from "@/components/background-effects"
import MobileMenu from "@/components/mobile-menu"

export default function Home() {
  const [showBoot, setShowBoot] = useState(true)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const chatInterfaceRef = useRef<{ sendMessage: (message: string) => void } | null>(null)

  const handleGenesisComplete = () => {
    // Wait 300ms for final fade, then hide boot screen
    setTimeout(() => {
      setShowBoot(false)
    }, 300)
  }

  const handleSidebarNavigate = (command: string) => {
    chatInterfaceRef.current?.sendMessage(command)
    setMobileMenuOpen(false)
  }

  return (
    <>
      <BackgroundEffects />

      <main className="min-h-screen bg-background">
        {showBoot && <BootScreen complete={false} onGenesisComplete={handleGenesisComplete} />}
        {!showBoot && (
          <>
            <Sidebar onNavigate={handleSidebarNavigate} />
            <div className="lg:ml-20">
              <ChatInterface ref={chatInterfaceRef} onMenuToggle={() => setMobileMenuOpen(!mobileMenuOpen)} />
            </div>
            <MobileMenu 
              isOpen={mobileMenuOpen} 
              onClose={() => setMobileMenuOpen(false)}
              onNavigate={handleSidebarNavigate}
            />
          </>
        )}
      </main>
    </>
  )
}
