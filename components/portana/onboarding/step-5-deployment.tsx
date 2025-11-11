"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Check, ChevronDown } from "lucide-react"
import { onboardingApi } from "@/lib/api"

export default function Step5Deployment({
  onComplete,
  onBack,
  onFinalize,
  onReset,
  isLoading,
  formData,
}: {
  onComplete: (data: any) => void
  onBack: () => void
  onFinalize: () => Promise<void>
  onReset: () => Promise<void>
  isLoading: boolean
  formData: any
}) {
  const [deployment, setDeployment] = useState({
    deploymentPlatform: "vercel" as "vercel" | "netlify" | "aws" | "self-hosted",
    apiKey: "",
    webhookUrl: "",
    allowWebhooks: true,
  })
  const [isComplete, setIsComplete] = useState(false)
  const [showTestingPanel, setShowTestingPanel] = useState(false)
  const [testError, setTestError] = useState<string | null>(null)
  const [testSuccess, setTestSuccess] = useState<string | null>(null)

  const handleFinalize = async () => {
    // Save step 5 data then finalize all steps
    onComplete(deployment)
    await onFinalize()
  }

  const handleTestStep = async (stepNum: number) => {
    setTestError(null)
    setTestSuccess(null)

    try {
      let data: any
      const sessionId = localStorage.getItem("user_id") || `test-${Date.now()}`

      switch (stepNum) {
        case 1:
          data = {
            name: "Test User",
            email: "test@example.com",
            bio: "This is a test bio for testing purposes.",
          }
          await onboardingApi.testStep.step1(data, sessionId)
          break
        case 2:
          data = {
            resumeText: `
            Professional Summary: Experienced software engineer with 5 years in full-stack development.
            
            Skills: JavaScript, React, Node.js, TypeScript, Python, PostgreSQL
            
            Experience:
            Senior Developer at TechCorp (2022-2024)
            - Led team of 5 engineers
            - Architected microservices using Node.js
            
            Junior Developer at StartupXYZ (2020-2022)
            - Built React frontends
            - Implemented REST APIs
            
            Education: BS in Computer Science from State University (2020)
          `,
          }
          const res = await onboardingApi.testStep.step2(data, sessionId)
          setTestSuccess(`Step 2 test passed. Extracted ${res.parsed?.skills?.length || 0} skills`)
          return
        case 3:
          data = {
            githubUsername: "testuser",
            mediumUsername: "testuser",
            githubRepos: [],
            mediumArticles: [],
          }
          await onboardingApi.testStep.step3(data, sessionId)
          break
        case 4:
          data = {
            personaName: "The Advisor",
            personaDescription: "A professional AI advisor",
            tonality: "professional",
            responseLength: "medium",
          }
          await onboardingApi.testStep.step4(data, sessionId)
          break
        case 5:
          data = {
            deploymentPlatform: "vercel",
            apiKey: "",
            webhookUrl: "",
            allowWebhooks: true,
          }
          await onboardingApi.testStep.step5(data, sessionId)
          break
      }

      setTestSuccess(`Step ${stepNum} test passed!`)
    } catch (err) {
      const message = err instanceof Error ? err.message : `Step ${stepNum} test failed`
      setTestError(message)
    }
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
          <Label htmlFor="platform">Deployment Platform</Label>
          <select
            id="platform"
            value={deployment.deploymentPlatform}
            onChange={(e) =>
              setDeployment({ ...deployment, deploymentPlatform: e.target.value as any })
            }
            className="w-full mt-2 px-3 py-2 bg-background border border-border rounded-lg"
          >
            <option value="vercel">Vercel</option>
            <option value="netlify">Netlify</option>
            <option value="aws">AWS</option>
            <option value="self-hosted">Self-hosted</option>
          </select>
        </div>

        <div>
          <Label htmlFor="apiKey">API Key (Optional)</Label>
          <Input
            id="apiKey"
            type="password"
            placeholder="Your deployment API key"
            value={deployment.apiKey}
            onChange={(e) => setDeployment({ ...deployment, apiKey: e.target.value })}
            className="mt-2"
          />
        </div>

        <div>
          <Label htmlFor="webhook">Webhook URL (Optional)</Label>
          <Input
            id="webhook"
            placeholder="https://your-domain.com/webhook"
            value={deployment.webhookUrl}
            onChange={(e) => setDeployment({ ...deployment, webhookUrl: e.target.value })}
            className="mt-2"
          />
        </div>

        <div className="border-t border-border pt-4">
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={deployment.allowWebhooks}
              onChange={(e) => setDeployment({ ...deployment, allowWebhooks: e.target.checked })}
              className="w-4 h-4"
            />
            <span>Allow webhook communications</span>
          </label>
        </div>
      </div>

      {/* Testing Panel - Dev Only */}
      <div className="bg-background/40 backdrop-blur-md border border-border/50 rounded-xl overflow-hidden">
        <button
          onClick={() => setShowTestingPanel(!showTestingPanel)}
          className="w-full px-6 py-3 flex items-center justify-between hover:bg-background/60 transition-colors"
        >
          <span className="text-sm font-semibold text-muted-foreground">Developer Testing</span>
          <ChevronDown size={18} className={`transition-transform ${showTestingPanel ? "rotate-180" : ""}`} />
        </button>

        {showTestingPanel && (
          <div className="border-t border-border/50 px-6 py-4 space-y-3">
            {testError && (
              <div className="bg-red-500/20 border border-red-500/50 rounded p-2 text-red-300 text-xs">
                {testError}
              </div>
            )}
            {testSuccess && (
              <div className="bg-green-500/20 border border-green-500/50 rounded p-2 text-green-300 text-xs">
                {testSuccess}
              </div>
            )}
            <p className="text-xs text-muted-foreground mb-2">
              Test individual steps independently (no prerequisites required):
            </p>
            <div className="grid grid-cols-5 gap-2">
              {[1, 2, 3, 4, 5].map((step) => (
                <Button
                  key={step}
                  onClick={() => handleTestStep(step)}
                  size="sm"
                  variant="outline"
                  className="text-xs h-8"
                >
                  Step {step}
                </Button>
              ))}
            </div>
            <Button
              onClick={onReset}
              size="sm"
              variant="outline"
              className="w-full text-xs h-8 text-red-400 hover:text-red-300"
            >
              Reset Session
            </Button>
          </div>
        )}
      </div>

      <div className="flex gap-3">
        <Button onClick={onBack} variant="outline" className="flex-1 bg-transparent">
          Back
        </Button>
        <Button
          onClick={handleFinalize}
          disabled={isLoading}
          className="flex-1 bg-gradient-to-r from-cyan-500 to-violet-500 text-white font-semibold"
        >
          {isLoading ? "Finalizing..." : "Complete & Deploy"}
        </Button>
      </div>
    </div>
  )
}
