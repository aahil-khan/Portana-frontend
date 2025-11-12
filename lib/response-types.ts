/**
 * Response types from backend API
 */

export type ChatResponseType = "text" | "hybrid" | "command"

export interface Citation {
  source: string
  snippet?: string
}

export interface TextResponse {
  type: "text"
  content: string
  citations?: Citation[]
}

export interface HybridResponse {
  type: "hybrid"
  content: string
  suggestedCommand?: string
  showSuggestion?: boolean
  citations?: Citation[]
}

export interface CommandResponse {
  type: "command"
  command: string
  content: string
  data: any
}

export type BackendResponse = TextResponse | HybridResponse | CommandResponse

/**
 * Parse backend response string to typed response object
 */
export function parseBackendResponse(responseStr: string): BackendResponse | null {
  try {
    // Handle escaped JSON from API response
    const parsed = JSON.parse(responseStr)
    
    if (!parsed.type) {
      return null
    }

    // Validate required fields based on type
    if (parsed.type === "text" || parsed.type === "hybrid") {
      return {
        type: parsed.type,
        content: parsed.content || "",
        citations: parsed.citations || [],
        ...(parsed.type === "hybrid" && {
          suggestedCommand: parsed.suggestedCommand,
          showSuggestion: parsed.showSuggestion !== false,
        }),
      }
    }

    if (parsed.type === "command") {
      return {
        type: "command",
        command: parsed.command || "",
        content: parsed.content || "",
        data: parsed.data || {},
      }
    }

    return null
  } catch (error) {
    console.error("Failed to parse backend response:", error)
    return null
  }
}

/**
 * Determine which component to render based on command type
 */
export function getComponentForCommand(command: string) {
  const componentMap: Record<string, string> = {
    projects: "ProjectsView",
    stack: "StackView",
    experience: "ExperienceView",
    education: "EducationView",
    timeline: "TimelineView",
    summary: "SummaryView",
    achievements: "AchievementsView",
  }

  return componentMap[command] || null
}

/**
 * Format command data for component rendering
 */
export function formatCommandData(command: string, data: any) {
  switch (command) {
    case "projects":
      return {
        projects: Array.isArray(data) ? data : [],
      }
    case "stack":
      return {
        stack: Array.isArray(data) ? data : [],
      }
    case "experience":
      return {
        experiences: Array.isArray(data) ? data : [],
      }
    case "education":
      return {
        educations: Array.isArray(data) ? data : [],
      }
    case "timeline":
      return {
        items: Array.isArray(data) ? data : [],
      }
    case "summary":
      return data
    case "achievements":
      return {
        achievements: Array.isArray(data) ? data : [],
      }
    default:
      return data
  }
}
