"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Upload } from "lucide-react"

export default function Step2ResumeUpload({
  onComplete,
  onBack,
}: { onComplete: (data: any) => void; onBack: () => void }) {
  const [file, setFile] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)
  const [parsedData, setParsedData] = useState<any>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

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
    if (!file) return
    setLoading(true)
    // TODO: Call API to upload resume and get parsed data
    // For now, mock the response
    setTimeout(() => {
      setParsedData({
        experience: [{ company: "Tech Corp", role: "Engineer", duration: "2 years" }],
        skills: ["React", "TypeScript", "Node.js"],
        education: [{ school: "University", degree: "BS" }],
      })
      setLoading(false)
    }, 2000)
  }

  return (
    <div className="space-y-6 fade-in">
      <div>
        <h2 className="text-2xl font-bold mb-2">Upload Your Resume</h2>
        <p className="text-muted-foreground">We'll extract your experience automatically</p>
      </div>

      {!parsedData ? (
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
              className="flex-1 bg-gradient-to-r from-cyan-500 to-violet-500"
            >
              {loading ? "Parsing..." : "Upload & Parse"}
            </Button>
          </div>
        </div>
      ) : (
        <div className="space-y-4 bg-background/40 backdrop-blur-md border border-border rounded-xl p-6">
          <p className="text-sm text-green-400">✓ Resume parsed successfully</p>
          <div className="space-y-2">
            <p className="text-sm">
              <strong>Skills:</strong> {parsedData.skills.join(", ")}
            </p>
            <p className="text-sm">
              <strong>Experience:</strong> {parsedData.experience.length} roles found
            </p>
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              onClick={() => {
                setParsedData(null)
                setFile(null)
              }}
              variant="outline"
              className="flex-1"
            >
              Re-upload
            </Button>
            <Button
              onClick={() => onComplete(parsedData)}
              className="flex-1 bg-gradient-to-r from-cyan-500 to-violet-500"
            >
              Confirm & Continue
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
