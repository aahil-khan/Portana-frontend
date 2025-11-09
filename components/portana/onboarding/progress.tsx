export default function OnboardingProgress({ currentStep, totalSteps }: { currentStep: number; totalSteps: number }) {
  return (
    <div className="bg-background/50 backdrop-blur-md border-b border-border sticky top-0 z-50">
      <div className="max-w-2xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-xl font-bold text-foreground">Setup Your Portfolio</h1>
          <span className="text-sm text-muted-foreground">
            Step {currentStep} of {totalSteps}
          </span>
        </div>
        <div className="w-full bg-secondary/20 rounded-full h-2">
          <div
            className="bg-gradient-to-r from-cyan-500 to-violet-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${(currentStep / totalSteps) * 100}%` }}
          />
        </div>
      </div>
    </div>
  )
}
