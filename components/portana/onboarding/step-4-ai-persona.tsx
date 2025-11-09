"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

export default function Step4AIPersona({
  onComplete,
  onBack,
}: { onComplete: (data: any) => void; onBack: () => void }) {
  const [persona, setPersona] = useState({
    tone: "professional",
    verbosity: "balanced",
    formality: "neutral",
    cite_sources: true,
    show_confidence: true,
    ask_clarifying_questions: true,
    custom_instructions: "",
  })

  return (
    <div className="space-y-6 fade-in">
      <div>
        <h2 className="text-2xl font-bold mb-2">Configure AI Persona</h2>
        <p className="text-muted-foreground">How should the AI talk about you?</p>
      </div>

      <div className="space-y-6 bg-background/40 backdrop-blur-md border border-border rounded-xl p-6">
        {/* Tone */}
        <div>
          <Label className="text-base font-semibold mb-3 block">Tone</Label>
          <RadioGroup value={persona.tone} onValueChange={(value) => setPersona({ ...persona, tone: value })}>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="professional" id="tone-professional" />
              <Label htmlFor="tone-professional" className="font-normal cursor-pointer">
                Professional
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="casual" id="tone-casual" />
              <Label htmlFor="tone-casual" className="font-normal cursor-pointer">
                Casual
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="technical" id="tone-technical" />
              <Label htmlFor="tone-technical" className="font-normal cursor-pointer">
                Technical
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="friendly" id="tone-friendly" />
              <Label htmlFor="tone-friendly" className="font-normal cursor-pointer">
                Friendly
              </Label>
            </div>
          </RadioGroup>
        </div>

        {/* Verbosity */}
        <div>
          <Label className="text-base font-semibold mb-3 block">Verbosity</Label>
          <RadioGroup value={persona.verbosity} onValueChange={(value) => setPersona({ ...persona, verbosity: value })}>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="concise" id="verb-concise" />
              <Label htmlFor="verb-concise" className="font-normal cursor-pointer">
                Concise
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="balanced" id="verb-balanced" />
              <Label htmlFor="verb-balanced" className="font-normal cursor-pointer">
                Balanced
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="detailed" id="verb-detailed" />
              <Label htmlFor="verb-detailed" className="font-normal cursor-pointer">
                Detailed
              </Label>
            </div>
          </RadioGroup>
        </div>

        {/* Formality */}
        <div>
          <Label className="text-base font-semibold mb-3 block">Formality</Label>
          <RadioGroup value={persona.formality} onValueChange={(value) => setPersona({ ...persona, formality: value })}>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="formal" id="form-formal" />
              <Label htmlFor="form-formal" className="font-normal cursor-pointer">
                Formal
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="neutral" id="form-neutral" />
              <Label htmlFor="form-neutral" className="font-normal cursor-pointer">
                Neutral
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="informal" id="form-informal" />
              <Label htmlFor="form-informal" className="font-normal cursor-pointer">
                Informal
              </Label>
            </div>
          </RadioGroup>
        </div>

        {/* Options */}
        <div className="space-y-3 pt-4 border-t border-border">
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={persona.cite_sources}
              onChange={(e) => setPersona({ ...persona, cite_sources: e.target.checked })}
              className="w-4 h-4"
            />
            <span>Always cite sources</span>
          </label>
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={persona.show_confidence}
              onChange={(e) => setPersona({ ...persona, show_confidence: e.target.checked })}
              className="w-4 h-4"
            />
            <span>Show confidence levels</span>
          </label>
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={persona.ask_clarifying_questions}
              onChange={(e) => setPersona({ ...persona, ask_clarifying_questions: e.target.checked })}
              className="w-4 h-4"
            />
            <span>Ask clarifying questions</span>
          </label>
        </div>

        {/* Custom Instructions */}
        <div>
          <Label htmlFor="custom">Custom Instructions (Optional)</Label>
          <Textarea
            id="custom"
            placeholder="Any additional context for the AI..."
            value={persona.custom_instructions}
            onChange={(e) => setPersona({ ...persona, custom_instructions: e.target.value })}
            className="mt-2 resize-none"
            rows={4}
          />
        </div>
      </div>

      <div className="flex gap-3">
        <Button onClick={onBack} variant="outline" className="flex-1 bg-transparent">
          Back
        </Button>
        <Button onClick={() => onComplete(persona)} className="flex-1 bg-gradient-to-r from-cyan-500 to-violet-500">
          Continue
        </Button>
      </div>
    </div>
  )
}
