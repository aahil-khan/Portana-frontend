"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Github, BookOpen } from "lucide-react"

export default function Step3DataSources({
  onComplete,
  onBack,
}: { onComplete: (data: any) => void; onBack: () => void }) {
  const [sources, setSources] = useState({
    github: { connected: false, username: "", access_token: "", include_repos: true, auto_sync: true },
    medium: { connected: false, username: "", auto_sync: true },
  })

  const handleSourceChange = (source: string, field: string, value: any) => {
    setSources((prev) => ({
      ...prev,
      [source]: { ...prev[source as keyof typeof sources], [field]: value },
    }))
  }

  const handleSkip = () => {
    onComplete({ sources })
  }

  const handleConnect = () => {
    onComplete({ sources })
  }

  return (
    <div className="space-y-6 fade-in">
      <div>
        <h2 className="text-2xl font-bold mb-2">Connect Data Sources</h2>
        <p className="text-muted-foreground">Optional: Link your GitHub and Medium for auto-indexing</p>
      </div>

      <div className="space-y-4">
        {/* GitHub */}
        <div className="bg-background/40 backdrop-blur-md border border-border rounded-xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <Github size={20} className="text-foreground" />
            <h3 className="font-semibold">GitHub</h3>
            <Checkbox
              checked={sources.github.connected}
              onCheckedChange={(checked) => handleSourceChange("github", "connected", checked)}
              className="ml-auto"
            />
          </div>

          {sources.github.connected && (
            <div className="space-y-3">
              <div>
                <Label htmlFor="gh_username">GitHub Username</Label>
                <Input
                  id="gh_username"
                  placeholder="your-username"
                  value={sources.github.username}
                  onChange={(e) => handleSourceChange("github", "username", e.target.value)}
                  className="mt-2"
                />
              </div>
              <div>
                <Label htmlFor="gh_token">Access Token (Optional)</Label>
                <Input
                  id="gh_token"
                  type="password"
                  placeholder="ghp_..."
                  value={sources.github.access_token}
                  onChange={(e) => handleSourceChange("github", "access_token", e.target.value)}
                  className="mt-2"
                />
              </div>
              <label className="flex items-center gap-2 text-sm">
                <Checkbox
                  checked={sources.github.auto_sync}
                  onCheckedChange={(checked) => handleSourceChange("github", "auto_sync", checked)}
                />
                <span>Auto-sync repositories</span>
              </label>
            </div>
          )}
        </div>

        {/* Medium */}
        <div className="bg-background/40 backdrop-blur-md border border-border rounded-xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <BookOpen size={20} className="text-foreground" />
            <h3 className="font-semibold">Medium</h3>
            <Checkbox
              checked={sources.medium.connected}
              onCheckedChange={(checked) => handleSourceChange("medium", "connected", checked)}
              className="ml-auto"
            />
          </div>

          {sources.medium.connected && (
            <div className="space-y-3">
              <div>
                <Label htmlFor="md_username">Medium Username</Label>
                <Input
                  id="md_username"
                  placeholder="@your-username"
                  value={sources.medium.username}
                  onChange={(e) => handleSourceChange("medium", "username", e.target.value)}
                  className="mt-2"
                />
              </div>
              <label className="flex items-center gap-2 text-sm">
                <Checkbox
                  checked={sources.medium.auto_sync}
                  onCheckedChange={(checked) => handleSourceChange("medium", "auto_sync", checked)}
                />
                <span>Auto-sync articles</span>
              </label>
            </div>
          )}
        </div>
      </div>

      <div className="flex gap-3 pt-4">
        <Button onClick={onBack} variant="outline" className="flex-1 bg-transparent">
          Back
        </Button>
        <Button onClick={handleSkip} variant="outline" className="flex-1 bg-transparent">
          Skip Sources
        </Button>
        <Button onClick={handleConnect} className="flex-1 bg-gradient-to-r from-cyan-500 to-violet-500">
          Continue
        </Button>
      </div>
    </div>
  )
}
