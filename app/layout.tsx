import type React from "react"
import type { Metadata } from "next"
import { Space_Mono, Orbitron } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import EasterEgg from "@/components/easter-egg"
import "./globals.css"

const spaceMono = Space_Mono({ 
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-space-mono"
})

const orbitron = Orbitron({ 
  weight: ["400", "700", "900"],
  subsets: ["latin"],
  variable: "--font-orbitron"
})

export const metadata: Metadata = {
  title: "Portana",
  description: "An AI-powered futuristic portfolio with glassmorphism and terminal aesthetics",
  generator: "v0.app",
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${spaceMono.variable} ${orbitron.variable}`}>
      <body className={`${spaceMono.className} antialiased overflow-hidden`}>
        {children}
        <EasterEgg />
        <Analytics />
      </body>
    </html>
  )
}
