import type React from "react"
import type { Metadata } from "next"
import { Space_Mono, Orbitron } from "next/font/google"
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
  icons: {
    icon: "/portana.svg",
    apple: "/portana.svg",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${spaceMono.variable} ${orbitron.variable}`}>
      <head>
        <script defer src="https://cloud.umami.is/script.js" data-website-id="a19609f1-9816-41e9-87d5-f1ec6fb7a6d8"></script>
      </head>
      <body className={`${spaceMono.className} antialiased overflow-hidden`}>
        {children}
        <EasterEgg />
      </body>
    </html>
  )
}
