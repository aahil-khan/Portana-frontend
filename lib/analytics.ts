/**
 * Umami Analytics Event Tracking
 * Tracks key user interactions: commands, downloads, form submissions
 */

declare global {
  interface Window {
    umami?: {
      track: (name: string, data?: Record<string, any>) => void
    }
  }
}

export const trackEvent = (eventName: string, data?: Record<string, any>) => {
  if (typeof window !== "undefined" && window.umami?.track) {
    window.umami.track(eventName, data)
  }
}

// Command tracking
export const trackCommand = (command: string) => {
  trackEvent("command_used", { command })
}

// Resume download tracking
export const trackResumeDownload = () => {
  trackEvent("resume_downloaded")
}

// Contact form submission tracking
export const trackContactSubmission = (status: "success" | "error") => {
  trackEvent("contact_form_submitted", { status })
}

// Chat message tracking
export const trackChatMessage = (type: "command" | "natural_language") => {
  trackEvent("chat_message", { type })
}

// Easter egg tracking
export const trackEasterEgg = (easterEgg: string) => {
  trackEvent("easter_egg_triggered", { egg: easterEgg })
}
