"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { onboardingApi } from "@/lib/api"
import { Loader } from "lucide-react"

export default function Step1BasicProfile({ onComplete }: { onComplete: (data: any) => void }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    bio: "",
    website: "",
    githubUrl: "",
    linkedinUrl: "",
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isLoading, setIsLoading] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)

  // Check localStorage on mount
  useEffect(() => {
    console.log("[Step1] Component mounted. Testing localStorage access...")
    console.log("[Step1] localStorage available:", typeof localStorage !== "undefined")
    try {
      localStorage.setItem("_test", "1")
      const test = localStorage.getItem("_test")
      console.log("[Step1] localStorage test write/read successful:", test === "1")
      localStorage.removeItem("_test")
    } catch (e) {
      console.error("[Step1] localStorage error:", e)
    }
  }, [])

  const validateForm = () => {
    const newErrors: Record<string, string> = {}
    if (!formData.name || formData.name.length < 2) newErrors.name = "Name must be at least 2 characters"
    if (!formData.bio || formData.bio.length < 50) newErrors.bio = "Bio must be at least 50 characters"
    if (!formData.email || !formData.email.includes("@")) newErrors.email = "Please enter a valid email"
    return newErrors
  }

  const handleSubmit = async () => {
    // Clear previous errors
    setSubmitError(null)
    setErrors({})

    // Validate form
    const newErrors = validateForm()
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    // Submit to backend
    setIsLoading(true)
    try {
      console.log("[Step1] Calling onboardingApi.start with data:", {
        name: formData.name,
        bio: formData.bio,
        email: formData.email,
      })

      const response = await onboardingApi.start({
        name: formData.name,
        bio: formData.bio,
        email: formData.email,
        website: formData.website,
        githubUrl: formData.githubUrl,
        linkedinUrl: formData.linkedinUrl,
      })

      console.log("[Step1] API Response:", response)

      // Support both new (user_id/session_token) and old (sessionId) response formats
      const userId = response.user_id || response.sessionId
      const sessionToken = response.session_token || response.sessionId

      console.log("[Step1] Extracted userId:", userId, "sessionToken:", sessionToken)

      if (!userId || !sessionToken) {
        throw new Error("API response missing user_id/session_token")
      }

      // Store session token and user ID in localStorage
      console.log("[Step1] Storing in localStorage...")
      localStorage.setItem("session_token", sessionToken)
      localStorage.setItem("user_id", userId)

      console.log("[Step1] Verification - localStorage.getItem('session_token'):", localStorage.getItem("session_token"))
      console.log("[Step1] Verification - localStorage.getItem('user_id'):", localStorage.getItem("user_id"))

      // Wait a moment to ensure localStorage is persisted before advancing
      await new Promise(resolve => setTimeout(resolve, 500))

      // Proceed to next step
      console.log("[Step1] Calling onComplete...")
      onComplete(formData)
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Failed to start onboarding"
      console.error("[Step1] Error:", error)
      setSubmitError(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-6 fade-in">
      <div>
        <h2 className="text-2xl font-bold mb-2">Let's get started!</h2>
        <p className="text-muted-foreground">Tell us about yourself</p>
      </div>

      {submitError && (
        <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-4 text-red-300 text-sm">
          <p className="font-semibold mb-1">Error</p>
          <p>{submitError}</p>
        </div>
      )}

      <div className="space-y-4 bg-background/40 backdrop-blur-md border border-border rounded-xl p-6">
        <div>
          <Label htmlFor="name">Full Name *</Label>
          <Input
            id="name"
            placeholder="Your full name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="mt-2"
          />
          {errors.name && <p className="text-red-400 text-sm mt-1">{errors.name}</p>}
        </div>

        <div>
          <Label htmlFor="email">Email *</Label>
          <Input
            id="email"
            type="email"
            placeholder="your@email.com"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="mt-2"
          />
          {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email}</p>}
        </div>

        <div>
          <Label htmlFor="bio">Bio *</Label>
          <Textarea
            id="bio"
            placeholder="Tell us about yourself (minimum 50 characters)"
            value={formData.bio}
            onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
            className="mt-2 resize-none"
            rows={4}
          />
          {errors.bio && <p className="text-red-400 text-sm mt-1">{errors.bio}</p>}
        </div>

        <div>
          <Label htmlFor="website">Website</Label>
          <Input
            id="website"
            placeholder="https://yourwebsite.com"
            value={formData.website}
            onChange={(e) => setFormData({ ...formData, website: e.target.value })}
            className="mt-2"
          />
        </div>

        <div>
          <Label htmlFor="githubUrl">GitHub Profile</Label>
          <Input
            id="githubUrl"
            placeholder="https://github.com/yourprofile"
            value={formData.githubUrl}
            onChange={(e) => setFormData({ ...formData, githubUrl: e.target.value })}
            className="mt-2"
          />
        </div>

        <div>
          <Label htmlFor="linkedinUrl">LinkedIn Profile</Label>
          <Input
            id="linkedinUrl"
            placeholder="https://linkedin.com/in/yourprofile"
            value={formData.linkedinUrl}
            onChange={(e) => setFormData({ ...formData, linkedinUrl: e.target.value })}
            className="mt-2"
          />
        </div>
      </div>

      <Button
        onClick={handleSubmit}
        disabled={isLoading}
        className="w-full bg-linear-to-r from-cyan-500 to-violet-500 hover:from-cyan-600 hover:to-violet-600 text-white font-semibold py-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {isLoading ? (
          <>
            <Loader size={18} className="animate-spin" />
            Processing...
          </>
        ) : (
          "Continue"
        )}
      </Button>
    </div>
  )
}
