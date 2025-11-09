"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

export default function Step1BasicProfile({ onComplete }: { onComplete: (data: any) => void }) {
  const [formData, setFormData] = useState({
    full_name: "",
    bio: "",
    email: "",
    location: "",
    timezone: "",
  })
  const [errors, setErrors] = useState<Record<string, string>>({})

  const validateForm = () => {
    const newErrors: Record<string, string> = {}
    if (!formData.full_name || formData.full_name.length < 2) newErrors.full_name = "Name must be at least 2 characters"
    if (!formData.bio || formData.bio.length < 50) newErrors.bio = "Bio must be at least 50 characters"
    if (!formData.email || !formData.email.includes("@")) newErrors.email = "Please enter a valid email"
    return newErrors
  }

  const handleSubmit = () => {
    const newErrors = validateForm()
    if (Object.keys(newErrors).length === 0) {
      onComplete(formData)
    } else {
      setErrors(newErrors)
    }
  }

  return (
    <div className="space-y-6 fade-in">
      <div>
        <h2 className="text-2xl font-bold mb-2">Let's get started!</h2>
        <p className="text-muted-foreground">Tell us about yourself</p>
      </div>

      <div className="space-y-4 bg-background/40 backdrop-blur-md border border-border rounded-xl p-6">
        <div>
          <Label htmlFor="full_name">Full Name *</Label>
          <Input
            id="full_name"
            placeholder="Your full name"
            value={formData.full_name}
            onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
            className="mt-2"
          />
          {errors.full_name && <p className="text-red-400 text-sm mt-1">{errors.full_name}</p>}
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
          <Label htmlFor="location">Location</Label>
          <Input
            id="location"
            placeholder="City, Country"
            value={formData.location}
            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
            className="mt-2"
          />
        </div>

        <div>
          <Label htmlFor="timezone">Timezone</Label>
          <Input
            id="timezone"
            placeholder="e.g., America/New_York"
            value={formData.timezone}
            onChange={(e) => setFormData({ ...formData, timezone: e.target.value })}
            className="mt-2"
          />
        </div>
      </div>

      <Button
        onClick={handleSubmit}
        className="w-full bg-gradient-to-r from-cyan-500 to-violet-500 hover:from-cyan-600 hover:to-violet-600 text-white font-semibold py-2"
      >
        Continue
      </Button>
    </div>
  )
}
