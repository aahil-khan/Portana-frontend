import ProjectsView from "@/components/projects-view"
import BlogView from "@/components/blog-view"
import StackView from "@/components/stack-view"
import ExperienceView from "@/components/experience-view"
import TimelineView from "@/components/timeline-view"
import MiscView from "@/components/misc-view"

export class CommandHandler {
  static getCommandComponent(command: string) {
    switch (command) {
      case "projects":
        return ProjectsView
      case "blog":
        return BlogView
      case "stack":
        return StackView
      case "experience":
        return ExperienceView
      case "timeline":
        return TimelineView
      case "misc":
        return MiscView
      default:
        return null
    }
  }

  static handleCommand(input: string): { response: string; component?: any } {
    const trimmed = input.trim().toLowerCase()

    if (trimmed.startsWith("/")) {
      const command = trimmed.split(" ")[0].slice(1)
      const component = this.getCommandComponent(command)

      switch (command) {
        case "projects":
          return {
            response: "Here are my recent projects:",
            component: ProjectsView,
          }
        case "blog":
          return {
            response: "Check out my latest blog posts:",
            component: BlogView,
          }
        case "stack":
          return {
            response: "My tech stack and specialties:",
            component: StackView,
          }
        case "experience":
          return {
            response: "My professional experience:",
            component: ExperienceView,
          }
        case "timeline":
          return {
            response: "My professional timeline:",
            component: TimelineView,
          }
        case "misc":
          return {
            response: "Miscellaneous tools and experiments:",
            component: MiscView,
          }
        case "start":
          return {
            response: "Welcome! Let me introduce myself:",
          }
        case "help":
          return {
            response:
              "Available commands: /start, /projects, /blog, /stack, /experience, /timeline, /misc, /theme. Or just ask me anything!",
          }
        case "theme":
          return {
            response: "Theme toggling feature coming soon! Currently in dark mode.",
          }
        case "sudo":
          if (trimmed.includes("rm -rf")) {
            return {
              response: "Error: Permission denied. Nice try though!",
            }
          }
          return { response: "Command not found. Did you mean /help?" }
        default:
          return {
            response: `Command /${command} not recognized. Type /help for available commands.`,
          }
      }
    }

    if (trimmed.includes("hello") || trimmed.includes("hi")) {
      return {
        response: "Hey! Welcome to my portfolio. Ask me about projects, experience, or tech stack.",
      }
    }

    if (trimmed.includes("project")) {
      return {
        response: "Type /projects to see all my projects!",
      }
    }

    if (trimmed.includes("blog") || trimmed.includes("article")) {
      return {
        response: "Type /blog to check out my latest articles on Medium!",
      }
    }

    if (trimmed.includes("tech") || trimmed.includes("stack")) {
      return {
        response: "Type /stack to see my current tech arsenal!",
      }
    }

    if (trimmed.includes("experience") || trimmed.includes("work")) {
      return {
        response: "Type /experience to learn about my professional journey!",
      }
    }

    return {
      response: `I'm not sure about that. Type /help for commands or ask me anything!`,
    }
  }
}
