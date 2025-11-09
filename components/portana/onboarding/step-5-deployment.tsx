"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Check } from "lucide-react"

export default function Step5Deployment({
  onComplete,
  onBack,
  formData,
}: { onComplete: (data: any) => void; onBack: () => void; formData: any }) {
  const [deployment, setDeployment] = useState({
    public_url: "",
    admin_email: formData.basic?.email || "",
    notifications: { email: true, telegram: false, discord: false },
    analytics: true,
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isComplete, setIsComplete] = useState(false)

  const handleSubmit = async () => {
    setIsSubmitting(true)
    // TODO: Call API to complete onboarding
    setTimeout(() => {
      setIsSubmitting(false)
      setIsComplete(true)
      setTimeout(() => onComplete(deployment), 2000)
    }, 2000)
  }

  if (isComplete) {
    return (
      <div className="space-y-6 fade-in text-center">
        <div className="flex justify-center mb-4">
          <div className="bg-green-500/20 border border-green-500/50 rounded-full p-4">
            <Check size={32} className="text-green-400" />
          </div>
        </div>
        <h2 className="text-2xl font-bold">Setup Complete!</h2>
        <p className="text-muted-foreground">Your portfolio is ready to share. Redirecting...</p>
      </div>
    )
  }

  return (
    <div className="space-y-6 fade-in">
      <div>
        <h2 className="text-2xl font-bold mb-2">Final Configuration</h2>
        <p className="text-muted-foreground">Almost there! Let's set up your deployment</p>
      </div>

      <div className="space-y-4 bg-background/40 backdrop-blur-md border border-border rounded-xl p-6">
        <div>
          <Label htmlFor="url">Public URL (Optional)</Label>
          <Input
            id="url"
            placeholder="portfolio.example.com"
            value={deployment.public_url}
            onChange={(e) => setDeployment({ ...deployment, public_url: e.target.value })}
            className="mt-2"
          />
        </div>

        <div>
          <Label htmlFor="admin_email">Admin Email</Label>
          <Input id="admin_email" type="email" value={deployment.admin_email} disabled className="mt-2 opacity-50" />
        </div>

        <div>
          <Label className="text-sm font-semibold mb-3 block">Notifications</Label>
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" checked={deployment.notifications.email} disabled className="w-4 h-4" />
              <span>Email notifications (enabled)</span>
            </label>
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={deployment.notifications.telegram}
                onChange={(e) =>
                  setDeployment({
                    ...deployment,
                    notifications: { ...deployment.notifications, telegram: e.target.checked },
                  })
                }
                className="w-4 h-4"
              />
              <span>Telegram updates</span>
            </label>
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={deployment.notifications.discord}
                onChange={(e) =>
                  setDeployment({
                    ...deployment,
                    notifications: { ...deployment.notifications, discord: e.target.checked },
                  })
                }
                className="w-4 h-4"
              />
              <span>Discord webhooks</span>
            </label>
          </div>
        </div>

        <div className="border-t border-border pt-4">
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={deployment.analytics}
              onChange={(e) => setDeployment({ ...deployment, analytics: e.target.checked })}
              className="w-4 h-4"
            />
            <span>Enable usage analytics</span>
          </label>
        </div>
      </div>

      <div className="flex gap-3">
        <Button onClick={onBack} variant="outline" className="flex-1 bg-transparent">
          Back
        </Button>
        <Button
          onClick={handleSubmit}
          disabled={isSubmitting}
          className="flex-1 bg-gradient-to-r from-cyan-500 to-violet-500 text-white font-semibold"
        >
          {isSubmitting ? "Setting up..." : "Complete Setup"}
        </Button>
      </div>
    </div>
  )
}
