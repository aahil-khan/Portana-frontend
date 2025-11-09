"use client"

import { useState } from "react"
import Step1BasicProfile from "@/components/portana/onboarding/step-1-basic-profile"
import Step2ResumeUpload from "@/components/portana/onboarding/step-2-resume-upload"
import Step3DataSources from "@/components/portana/onboarding/step-3-data-sources"
import Step4AIPersona from "@/components/portana/onboarding/step-4-ai-persona"
import Step5Deployment from "@/components/portana/onboarding/step-5-deployment"
import OnboardingProgress from "@/components/portana/onboarding/progress"

export default function OnboardingPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    basic: {},
    resume: {},
    sources: {},
    persona: {},
    deployment: {},
  })

  const handleStepComplete = (stepData: any) => {
    setFormData((prev) => ({
      ...prev,
      [["basic", "resume", "sources", "persona", "deployment"][currentStep - 1]]: stepData,
    }))
    if (currentStep < 5) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1a1f2e] to-[#0f1218] text-foreground">
      <OnboardingProgress currentStep={currentStep} totalSteps={5} />

      <div className="max-w-2xl mx-auto px-4 py-12">
        {currentStep === 1 && <Step1BasicProfile onComplete={handleStepComplete} />}
        {currentStep === 2 && <Step2ResumeUpload onComplete={handleStepComplete} onBack={handlePreviousStep} />}
        {currentStep === 3 && <Step3DataSources onComplete={handleStepComplete} onBack={handlePreviousStep} />}
        {currentStep === 4 && <Step4AIPersona onComplete={handleStepComplete} onBack={handlePreviousStep} />}
        {currentStep === 5 && (
          <Step5Deployment onComplete={handleStepComplete} onBack={handlePreviousStep} formData={formData} />
        )}
      </div>
    </div>
  )
}
