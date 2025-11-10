"use client"

import type React from "react"

import { useState, useRef, useEffect, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Upload, Loader, X, Plus } from "lucide-react"
import { onboardingApi } from "@/lib/api"

export interface SkillEntry {
  name: string
  category: string
  proficiency?: 'Beginner' | 'Intermediate' | 'Advanced'
}

interface ParsedResumeData {
  skills?: SkillEntry[]
  experience?: Array<{
    title: string
    company: string
    duration?: string
    description?: string
    startYear?: number
    endYear?: number
  }>
  education?: Array<{
    degree: string
    institution: string
    field?: string
    graduationYear?: number
  }>
  summary?: string
}

export default function Step2ResumeUpload({
  onComplete,
  onBack,
}: { onComplete: (data: any) => void; onBack: () => void }) {
  const [file, setFile] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [stage, setStage] = useState<"upload" | "review">("upload")
  const [parsedData, setParsedData] = useState<ParsedResumeData | null>(null)
  const [sessionToken, setSessionToken] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Get session token from localStorage on mount
  useEffect(() => {
    const token = localStorage.getItem("session_token")
    console.log("[Step2] Retrieved session_token from localStorage:", token)
    setSessionToken(token)
    if (!token) {
      setError("Session token not found. Please start from Step 1.")
    }
  }, [])

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    const droppedFile = e.dataTransfer.files[0]
    if (
      droppedFile &&
      (droppedFile.type === "application/pdf" ||
        droppedFile.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document")
    ) {
      setFile(droppedFile)
    }
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.currentTarget.files?.[0]
    if (selectedFile) {
      setFile(selectedFile)
    }
  }

  const handleUpload = async () => {
    if (!file || !sessionToken) {
      setError("Missing file or session token")
      return
    }

    setLoading(true)
    setError(null)

    try {
      console.log("[Step2] Uploading resume file:", file.name)
      
      const response = await onboardingApi.uploadResume(file, sessionToken)
      console.log("[Step2] Parse response:", response)

      setParsedData(response?.data || response)
      setStage("review")
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to parse resume"
      console.error("[Step2] Error:", err)
      setError(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  const updateParsedData = (updates: Partial<ParsedResumeData>) => {
    setParsedData((prev) => (prev ? { ...prev, ...updates } : updates))
  }

  const addSkill = () => {
    setParsedData((prev) => ({
      ...prev,
      skills: [
        ...(prev?.skills || []),
        { name: '', category: 'Other', proficiency: 'Intermediate' },
      ],
    }))
  }

  const removeSkill = (index: number) => {
    setParsedData((prev) => ({
      ...prev,
      skills: prev?.skills?.filter((_, i) => i !== index) || [],
    }))
  }

  const updateSkill = (
    index: number,
    field: keyof SkillEntry,
    value: string
  ) => {
    setParsedData((prev) => {
      if (!prev?.skills) return prev
      const newSkills = [...prev.skills]
      ;(newSkills[index] as any)[field] = value
      return { ...prev, skills: newSkills }
    })
  }

  // Group skills by category
  const groupedSkills = useMemo(() => {
    const groups: Record<string, SkillEntry[]> = {}
    parsedData?.skills?.forEach((skill) => {
      const category = skill.category || 'Other'
      if (!groups[category]) {
        groups[category] = []
      }
      groups[category].push(skill)
    })
    return groups
  }, [parsedData?.skills])

  if (stage === "upload") {
    return (
      <div className="space-y-6 fade-in">
        <div>
          <h2 className="text-2xl font-bold mb-2">Upload Your Resume</h2>
          <p className="text-muted-foreground">We'll extract and parse your professional data</p>
        </div>

        {error && (
          <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-4 text-red-300 text-sm">
            <p className="font-semibold mb-1">Error</p>
            <p>{error}</p>
          </div>
        )}

        <div className="space-y-4">
          <div
            onDrop={handleDrop}
            onDragOver={(e) => e.preventDefault()}
            onClick={() => fileInputRef.current?.click()}
            className="border-2 border-dashed border-cyan-500/30 rounded-xl p-12 text-center cursor-pointer hover:border-cyan-500/50 transition-colors bg-background/40 backdrop-blur-md"
          >
            <Upload className="mx-auto mb-3 text-cyan-500" size={32} />
            <p className="font-semibold text-foreground">Drop your resume here</p>
            <p className="text-sm text-muted-foreground">or click to select (PDF or DOCX)</p>
            {file && <p className="text-sm text-cyan-400 mt-2">{file.name}</p>}
          </div>
          <input ref={fileInputRef} type="file" accept=".pdf,.docx" onChange={handleFileSelect} className="hidden" />

          <div className="flex gap-3">
            <Button onClick={onBack} variant="outline" className="flex-1 bg-transparent">
              Back
            </Button>
            <Button
              onClick={handleUpload}
              disabled={!file || loading}
              className="flex-1 bg-linear-to-r from-cyan-500 to-violet-500 disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader size={18} className="animate-spin" />
                  Parsing...
                </>
              ) : (
                "Upload & Parse"
              )}
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6 fade-in">
      <div>
        <h2 className="text-2xl font-bold mb-2">Review & Edit Your Data</h2>
        <p className="text-muted-foreground">Verify and refine your professional information</p>
      </div>

      <div className="space-y-6 bg-background/40 backdrop-blur-md border border-border rounded-xl p-6 max-h-[600px] overflow-y-auto">
        {/* Skills Section - Grouped by Category */}
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Technical Skills</h3>
            <Button
              onClick={addSkill}
              size="sm"
              variant="outline"
              className="gap-1 text-xs"
            >
              <Plus size={14} /> Add Skill
            </Button>
          </div>

          {Object.keys(groupedSkills).length > 0 ? (
            <div className="space-y-4">
              {Object.entries(groupedSkills).map(([category, skills]) => (
                <div key={category} className="space-y-2">
                  <div className="px-3 py-2 bg-background/60 rounded border border-border/50">
                    <p className="text-sm font-medium text-muted-foreground mb-2">
                      {category}
                    </p>
                    <div className="space-y-2">
                      {skills.map((skill, skillIdx) => {
                        // Find the actual index in the full skills array
                        const fullIndex = parsedData?.skills?.findIndex(
                          (s) => s.name === skill.name && s.category === skill.category
                        ) ?? -1

                        return (
                          <div
                            key={skillIdx}
                            className="flex gap-2 items-center bg-background/40 p-2 rounded border border-border/30"
                          >
                            <Input
                              value={skill.name}
                              onChange={(e) =>
                                fullIndex >= 0 &&
                                updateSkill(fullIndex, 'name', e.target.value)
                              }
                              placeholder="Skill name"
                              className="flex-1 text-sm"
                            />
                            <select
                              value={skill.proficiency || 'Intermediate'}
                              onChange={(e) =>
                                fullIndex >= 0 &&
                                updateSkill(
                                  fullIndex,
                                  'proficiency',
                                  e.target.value
                                )
                              }
                              className="px-3 py-2 bg-background border border-border rounded text-sm min-w-[120px]"
                            >
                              <option value="Beginner">Beginner</option>
                              <option value="Intermediate">
                                Intermediate
                              </option>
                              <option value="Advanced">Advanced</option>
                            </select>
                            <button
                              onClick={() =>
                                fullIndex >= 0 && removeSkill(fullIndex)
                              }
                              className="text-red-400 hover:text-red-300 transition-colors p-1"
                            >
                              <X size={18} />
                            </button>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground italic">
              No skills extracted. Try uploading a different resume or add skills manually.
            </p>
          )}
        </div>

        {/* Experience */}
        <div className="space-y-3 border-t border-border pt-4">
          <h3 className="text-lg font-semibold">Experience</h3>
          {parsedData?.experience?.map((exp, idx) => (
            <div key={idx} className="space-y-2 p-3 bg-background/50 rounded border border-border/50">
              <Input
                value={exp.title}
                placeholder="Job Title"
                onChange={(e) => {
                  const newExp = [...(parsedData.experience || [])]
                  newExp[idx].title = e.target.value
                  updateParsedData({ experience: newExp })
                }}
              />
              <Input
                value={exp.company}
                placeholder="Company"
                onChange={(e) => {
                  const newExp = [...(parsedData.experience || [])]
                  newExp[idx].company = e.target.value
                  updateParsedData({ experience: newExp })
                }}
              />
              <Input
                value={exp.duration}
                placeholder="Duration (e.g., 01/2020 - 12/2022)"
                onChange={(e) => {
                  const newExp = [...(parsedData.experience || [])]
                  newExp[idx].duration = e.target.value
                  updateParsedData({ experience: newExp })
                }}
              />
              <Textarea
                value={exp.description || ""}
                placeholder="Description"
                onChange={(e) => {
                  const newExp = [...(parsedData.experience || [])]
                  newExp[idx].description = e.target.value
                  updateParsedData({ experience: newExp })
                }}
                rows={2}
              />
            </div>
          ))}
        </div>

        {/* Education */}
        <div className="space-y-3 border-t border-border pt-4">
          <h3 className="text-lg font-semibold">Education</h3>
          {parsedData?.education?.map((edu, idx) => (
            <div key={idx} className="space-y-2 p-3 bg-background/50 rounded border border-border/50">
              <Input
                value={edu.degree}
                placeholder="Degree"
                onChange={(e) => {
                  const newEdu = [...(parsedData.education || [])]
                  newEdu[idx].degree = e.target.value
                  updateParsedData({ education: newEdu })
                }}
              />
              <Input
                value={edu.institution}
                placeholder="Institution/University"
                onChange={(e) => {
                  const newEdu = [...(parsedData.education || [])]
                  newEdu[idx].institution = e.target.value
                  updateParsedData({ education: newEdu })
                }}
              />
              <div className="grid grid-cols-2 gap-2">
                <Input
                  value={edu.field || ""}
                  placeholder="Field of Study"
                  onChange={(e) => {
                    const newEdu = [...(parsedData.education || [])]
                    newEdu[idx].field = e.target.value
                    updateParsedData({ education: newEdu })
                  }}
                />
                <Input
                  type="number"
                  value={edu.graduationYear || ""}
                  placeholder="Graduation Year"
                  onChange={(e) => {
                    const newEdu = [...(parsedData.education || [])]
                    newEdu[idx].graduationYear = parseInt(e.target.value) || undefined
                    updateParsedData({ education: newEdu })
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex gap-3">
        <Button onClick={() => setStage("upload")} variant="outline" className="flex-1 bg-transparent">
          Re-upload
        </Button>
        <Button
          onClick={() => onComplete(parsedData)}
          className="flex-1 bg-linear-to-r from-cyan-500 to-violet-500"
        >
          Confirm & Continue
        </Button>
      </div>
    </div>
  )
}
