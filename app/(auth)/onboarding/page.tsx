"use client"

import { useState, useEffect } from "react"
import Step1BasicProfile from "@/components/portana/onboarding/step-1-basic-profile"
import Step2ResumeUpload from "@/components/portana/onboarding/step-2-resume-upload"
import Step3DataSources from "@/components/portana/onboarding/step-3-data-sources"
import Step4AIPersona from "@/components/portana/onboarding/step-4-ai-persona"
import Step5Deployment from "@/components/portana/onboarding/step-5-deployment"
import OnboardingProgress from "@/components/portana/onboarding/progress"
import { onboardingApi } from "@/lib/api"

export default function OnboardingPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [sessionToken, setSessionToken] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    basic: {},
    resume: {},
    sources: {},
    persona: {},
    deployment: {},
  })

  // On mount, check if user has session token
  useEffect(() => {
    const token = localStorage.getItem("session_token")
    setSessionToken(token)
    // Note: Checkpoint recovery disabled for now - test basic flow first
  }, [])

  const handleStepComplete = (stepData: any) => {
    const stepKey = ["basic", "resume", "sources", "persona", "deployment"][currentStep - 1]
    setFormData((prev) => ({
      ...prev,
      [stepKey]: stepData,
    }))

    // Move to next step (don't auto-advance on last step)
    if (currentStep < 5) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleFinalize = async () => {
    if (!sessionToken) {
      setError("Session token missing")
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      // Format data for finalize endpoint
      const allSteps = {
        step1: {
          name: (formData.basic as any).name || "",
          email: (formData.basic as any).email || "",
          bio: (formData.basic as any).bio || "",
          website: (formData.basic as any).website,
          githubUrl: (formData.basic as any).githubUrl,
          linkedinUrl: (formData.basic as any).linkedinUrl,
        },
        step2: {
          resumeText: (formData.resume as any).resumeText || "",
        },
        step3: {
          githubUsername: (formData.sources as any).githubUsername,
          mediumUsername: (formData.sources as any).mediumUsername,
          githubRepos: (formData.sources as any).githubRepos || [],
          mediumArticles: (formData.sources as any).mediumArticles || [],
        },
        step4: {
          personaName: (formData.persona as any).personaName || "",
          personaDescription: (formData.persona as any).personaDescription || "",
          tonality: (formData.persona as any).tonality || "professional",
          responseLength: (formData.persona as any).responseLength || "medium",
        },
        step5: {
          deploymentPlatform: (formData.deployment as any).deploymentPlatform || "vercel",
          apiKey: (formData.deployment as any).apiKey,
          webhookUrl: (formData.deployment as any).webhookUrl,
          allowWebhooks: (formData.deployment as any).allowWebhooks ?? true,
        },
      }

      const response = await onboardingApi.finalize(allSteps, sessionToken)

      if (!response.success) {
        setError(response.error || "Finalization failed")
        return
      }

      // Success! Redirect to dashboard or show success screen
      window.location.href = "/dashboard"
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Finalization failed"
      console.error("[Onboarding] Finalization error:", err)
      setError(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }

  const handleReset = async () => {
    if (!sessionToken) {
      console.warn("No session token to reset")
      return
    }

    try {
      await onboardingApi.deleteSession(sessionToken)
      // Clear localStorage
      localStorage.removeItem("session_token")
      localStorage.removeItem("user_id")
      // Reset form
      setFormData({
        basic: {},
        resume: {},
        sources: {},
        persona: {},
        deployment: {},
      })
      setCurrentStep(1)
    } catch (err) {
      console.error("[Onboarding] Failed to reset:", err)
    }
  }

  return (
    <div className="min-h-screen bg-linear-to-b from-[#1a1f2e] to-[#0f1218] text-foreground">
      <OnboardingProgress currentStep={currentStep} totalSteps={5} />

      <div className="max-w-2xl mx-auto px-4 py-12">
        {error && (
          <div className="mb-4 bg-red-500/20 border border-red-500/50 rounded-lg p-4 text-red-300 text-sm">
            <p className="font-semibold mb-1">Error</p>
            <p>{error}</p>
          </div>
        )}

        {currentStep === 1 && <Step1BasicProfile onComplete={handleStepComplete} />}
        {currentStep === 2 && (
          <Step2ResumeUpload onComplete={handleStepComplete} onBack={handlePreviousStep} />
        )}
        {currentStep === 3 && (
          <Step3DataSources onComplete={handleStepComplete} onBack={handlePreviousStep} />
        )}
        {currentStep === 4 && (
          <Step4AIPersona onComplete={handleStepComplete} onBack={handlePreviousStep} />
        )}
        {currentStep === 5 && (
          <Step5Deployment
            onComplete={handleStepComplete}
            onBack={handlePreviousStep}
            onFinalize={handleFinalize}
            onReset={handleReset}
            isLoading={isLoading}
            formData={formData}
          />
        )}
      </div>
    </div>
  )
}
