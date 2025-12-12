"use client"

import { useState, useMemo, useEffect } from "react"
import { motion } from "framer-motion"
import { Send, CheckCircle, AlertCircle, Loader, Lock } from "lucide-react"
import { API_URL } from "@/lib/config"
import { trackContactSubmission } from "@/lib/analytics"

interface ContactFormState {
  name: string
  email: string
  message: string
  honeypot: string
}

interface FormStatus {
  type: "idle" | "loading" | "success" | "error"
  message?: string
}

interface ContactFormProps {
  formEndpoint?: string
}

const CONTACT_FORM_STORAGE_KEY = "portana_contact_form_submitted"

export default function ContactForm({ formEndpoint }: ContactFormProps) {
  const [formData, setFormData] = useState<ContactFormState>({
    name: "",
    email: "",
    message: "",
    honeypot: "",
  })
  const [status, setStatus] = useState<FormStatus>({ type: "idle" })
  const [hasSubmitted, setHasSubmitted] = useState(false)
  
  // Check if form has already been submitted in this session
  useEffect(() => {
    if (typeof window !== "undefined") {
      const submitted = localStorage.getItem(CONTACT_FORM_STORAGE_KEY) === "true"
      setHasSubmitted(submitted)
    }
  }, [])
  
  const finalFormEndpoint = useMemo(() => {
    return formEndpoint || `${API_URL}/api/misc/contact`
  }, [formEndpoint])

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    // Prevent submission if already submitted
    if (hasSubmitted) {
      setStatus({
        type: "error",
        message: "You have already sent a contact request in this session. Please try again later.",
      })
      return
    }

    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setStatus({
        type: "error",
        message: "Please fill in all required fields",
      })
      return
    }

    setStatus({ type: "loading" })

    try {
      const response = await fetch(finalFormEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      const result = await response.json()

      if (response.ok && result.success) {
        // Mark form as submitted in localStorage
        localStorage.setItem(CONTACT_FORM_STORAGE_KEY, "true")
        setHasSubmitted(true)
        trackContactSubmission("success")
        
        setStatus({
          type: "success",
          message: result.message || "Thank you! Your message has been sent successfully.",
        })
        setFormData({
          name: "",
          email: "",
          message: "",
          honeypot: "",
        })
      } else {
        trackContactSubmission("error")
        setStatus({
          type: "error",
          message: result.error || "Failed to send message. Please try again.",
        })
      }
    } catch (error) {
      trackContactSubmission("error")
      setStatus({
        type: "error",
        message: "An error occurred. Please try again later.",
      })
      console.error("Contact form error:", error)
      console.error("Final endpoint:", finalFormEndpoint)
      console.error("API_URL:", API_URL)
    }
  }

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-4 mt-4 p-4 md:p-6 rounded-lg border border-[#1e293b] backdrop-blur-md"
      style={{
        background: "var(--glass-bg)",
        backdropFilter: "blur(10px)",
      }}
    >
      {/* Honeypot field - hidden from users */}
      <input
        type="text"
        name="honeypot"
        value={formData.honeypot}
        onChange={handleChange}
        style={{ display: "none" }}
        tabIndex={-1}
        autoComplete="off"
      />

      {/* Name field */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <label htmlFor="name" className="block text-sm font-medium text-[#e0e7ff] mb-2">
          Your Name
        </label>
        <input
          id="name"
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Enter your name"
          className="w-full px-3 py-2 md:px-4 md:py-3 bg-[#1a1f3a] border border-[#1e293b] rounded-lg text-[#e0e7ff] placeholder-[#64748b] focus:border-[#00d9ff] focus:outline-none transition-colors"
          required
        />
      </motion.div>

      {/* Email field */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
      >
        <label htmlFor="email" className="block text-sm font-medium text-[#e0e7ff] mb-2">
          Your Email
        </label>
        <input
          id="email"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="your@email.com"
          className="w-full px-3 py-2 md:px-4 md:py-3 bg-[#1a1f3a] border border-[#1e293b] rounded-lg text-[#e0e7ff] placeholder-[#64748b] focus:border-[#00d9ff] focus:outline-none transition-colors"
          required
        />
      </motion.div>

      {/* Message field */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <label htmlFor="message" className="block text-sm font-medium text-[#e0e7ff] mb-2">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder="Your message here..."
          rows={5}
          className="w-full px-3 py-2 md:px-4 md:py-3 bg-[#1a1f3a] border border-[#1e293b] rounded-lg text-[#e0e7ff] placeholder-[#64748b] focus:border-[#00d9ff] focus:outline-none transition-colors resize-none"
          required
        />
      </motion.div>

      {/* Status messages */}
      {status.type === "success" && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-2 p-3 md:p-4 rounded-lg bg-[#1a3a2a] border border-[#00d9ff]/50 text-[#00d9ff]"
        >
          <CheckCircle size={20} />
          <p className="text-sm">{status.message}</p>
        </motion.div>
      )}

      {status.type === "error" && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-2 p-3 md:p-4 rounded-lg bg-[#3a1a1a] border border-[#ff6b6b]/50 text-[#ff6b6b]"
        >
          <AlertCircle size={20} />
          <p className="text-sm">{status.message}</p>
        </motion.div>
      )}

      {/* Submit button */}
      <motion.button
        type="submit"
        disabled={status.type === "loading" || hasSubmitted}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25 }}
        whileHover={!hasSubmitted ? { scale: 1.02 } : {}}
        whileTap={!hasSubmitted ? { scale: 0.98 } : {}}
        className="w-full px-4 py-3 md:py-4 bg-linear-to-r from-[#00d9ff] to-[#a78bfa] text-[#0b0d10] font-semibold rounded-lg transition-all hover:shadow-lg hover:shadow-[#00d9ff]/50 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {status.type === "loading" ? (
          <>
            <Loader size={18} className="animate-spin" />
            Sending...
          </>
        ) : hasSubmitted ? (
          <>
            <Lock size={18} />
            Message Already Sent
          </>
        ) : (
          <>
            <Send size={18} />
            Send Message
          </>
        )}
      </motion.button>
    </motion.form>
  )
}
