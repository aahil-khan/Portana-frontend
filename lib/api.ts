/**
 * Central API Service Layer
 * All backend API calls go through here
 */

import { API_URL, getAuthHeader } from "./config";
import type {
  Step1Data,
  Step1Response,
  Step3Data,
  Step4Data,
  Step5Data,
  DeployResponse,
  ChatQuery,
  ChatSSEEvent,
  AdminStatus,
} from "./types";

/**
 * Generic fetch wrapper with error handling
 */
async function fetchAPI(endpoint: string, options?: RequestInit) {
  const url = `${API_URL}${endpoint}`;

  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...options?.headers,
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `API Error ${response.status}: ${errorText || response.statusText}`
      );
    }

    const data = await response.json();
    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error("Unknown API error");
  }
}

/**
 * Transform SkillMap API response to Portana format
 * SkillMap returns technical_skills as array of objects with category and skills array
 * We need to flatten this to SkillEntry[] with name, category, proficiency
 */
function transformSkillmapResponse(skillmapData: any): any {
  const transformed: any = {};

  // Transform skills from SkillMap format to our SkillEntry format
  if (skillmapData.technical_skills && Array.isArray(skillmapData.technical_skills)) {
    transformed.skills = skillmapData.technical_skills
      .flatMap((categoryObj: any) => {
        const category = categoryObj.category || "Other";
        const skills = Array.isArray(categoryObj.skills) ? categoryObj.skills : [];
        
        return skills.map((skill: any) => {
          if (typeof skill === "string") {
            return {
              name: skill,
              category: category,
              proficiency: "Intermediate", // Default - user will set this
            };
          } else if (skill && typeof skill === "object") {
            return {
              name: skill.name || skill.skill_name || String(skill),
              category: category,
              proficiency: "Intermediate", // Default - user will set this
            };
          }
          return null;
        }).filter(Boolean);
      });
  }

  // Transform experience
  if (skillmapData.experience && Array.isArray(skillmapData.experience)) {
    transformed.experience = skillmapData.experience.map((exp: any) => ({
      title: exp.title || exp.role || "Position",
      company: exp.company || "Company",
      duration: exp.duration || undefined,
      description: exp.description || undefined,
    }));
  } else if (skillmapData.work_experience && Array.isArray(skillmapData.work_experience)) {
    transformed.experience = skillmapData.work_experience.map((exp: any) => ({
      title: exp.job_title || exp.title || "Position",
      company: exp.company || "Company",
      duration: exp.duration || undefined,
      description: exp.description || undefined,
    }));
  }

  // Transform education
  if (skillmapData.education && Array.isArray(skillmapData.education)) {
    transformed.education = skillmapData.education.map((edu: any) => ({
      degree: edu.degree || "Degree",
      institution: edu.institution || edu.school || "Institution",
      field: edu.field || edu.field_of_study || undefined,
      graduationYear: edu.graduationYear || edu.graduation_year || undefined,
    }));
  }

  // Transform summary
  if (skillmapData.summary) {
    transformed.summary = skillmapData.summary;
  } else if (skillmapData.inferred_areas_of_strength && Array.isArray(skillmapData.inferred_areas_of_strength)) {
    transformed.summary = skillmapData.inferred_areas_of_strength.join(", ");
  }

  return transformed;
}

/**
 * Onboarding API endpoints
 */
export const onboardingApi = {
  /**
   * Step 1: Start onboarding and collect basic profile info
   */
  async start(data: Step1Data): Promise<Step1Response> {
    return fetchAPI("/api/onboarding/start", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },

  /**
   * Step 2: Upload resume file to SkillMap API for parsing
   * Uses the SkillMap backend at api.aahil-khan.tech
   * POST /upload-resume with multipart/form-data
   */
  async uploadResume(file: File, sessionToken: string): Promise<any> {
    const skillmapApiUrl = process.env.NEXT_PUBLIC_SKILLMAP_API_URL || "https://api.aahil-khan.tech";
    
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch(`${skillmapApiUrl}/upload-resume`, {
        method: "POST",
        body: formData,
        headers: {
          ...getAuthHeader(sessionToken),
        },
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
          `SkillMap API Error ${response.status}: ${errorText || response.statusText}`
        );
      }

      const data = await response.json();
      
      // Transform SkillMap response to match our expected format
      const transformed = transformSkillmapResponse(data);
      console.log("[Step2] SkillMap API Response (transformed):", transformed);
      
      return transformed;
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error("Failed to parse resume with SkillMap API");
    }
  },

  /**
   * Step 2: Get parsed resume data for review
   */
  async getResumeParsed(sessionToken: string): Promise<any> {
    const userId = localStorage.getItem("user_id");
    if (!userId) {
      throw new Error("User ID not found in localStorage");
    }

    return fetchAPI(`/api/onboarding/${userId}`, {
      method: "GET",
      headers: getAuthHeader(sessionToken),
    });
  },

  /**
   * Step 2: Confirm parsed resume data and proceed
   */
  async confirmResume(data: any, sessionToken: string): Promise<any> {
    const userId = localStorage.getItem("user_id");
    if (!userId) {
      throw new Error("User ID not found in localStorage");
    }

    return fetchAPI(`/api/onboarding/${userId}/step/2`, {
      method: "POST",
      headers: getAuthHeader(sessionToken),
      body: JSON.stringify(data),
    });
  },

  /**
   * Step 3: Connect data sources (GitHub, Medium, LinkedIn)
   */
  async connectSources(data: Step3Data, sessionToken: string): Promise<any> {
    return fetchAPI("/api/onboarding/sources", {
      method: "POST",
      headers: getAuthHeader(sessionToken),
      body: JSON.stringify(data),
    });
  },

  /**
   * Step 4: Configure AI persona (tone, verbosity, formality)
   */
  async configurePersona(data: Step4Data, sessionToken: string): Promise<any> {
    return fetchAPI("/api/onboarding/persona", {
      method: "POST",
      headers: getAuthHeader(sessionToken),
      body: JSON.stringify(data),
    });
  },

  /**
   * Step 5: Complete deployment configuration and get JWT
   */
  async deploy(data: Step5Data, sessionToken: string): Promise<DeployResponse> {
    return fetchAPI("/api/onboarding/deploy", {
      method: "POST",
      headers: getAuthHeader(sessionToken),
      body: JSON.stringify(data),
    });
  },
};

/**
 * Chat API endpoints
 */
export const chatApi = {
  /**
   * Send a chat message and receive SSE stream
   * Usage:
   *   for await (const event of chatApi.ask({ query: "..." })) {
   *     console.log(event);
   *   }
   */
  async *ask(
    query: ChatQuery,
    sessionToken?: string
  ): AsyncGenerator<ChatSSEEvent> {
    const url = `${API_URL}/api/chat/ask`;

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...getAuthHeader(sessionToken),
        },
        body: JSON.stringify(query),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Chat API error: ${response.status} - ${errorText}`);
      }

      if (!response.body) {
        throw new Error("No response body from chat API");
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value);
        const lines = buffer.split("\n");

        // Keep the last incomplete line in buffer
        buffer = lines[lines.length - 1];

        // Process complete lines
        for (let i = 0; i < lines.length - 1; i++) {
          const line = lines[i].trim();

          if (line.startsWith("data: ")) {
            try {
              const jsonData = JSON.parse(line.slice(6));
              yield jsonData as ChatSSEEvent;
            } catch (e) {
              console.error("Failed to parse SSE data:", line, e);
            }
          }
        }
      }
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error("Unknown chat API error");
    }
  },
};

/**
 * Admin API endpoints
 */
export const adminApi = {
  /**
   * Get system status and health
   */
  async getStatus(sessionToken: string): Promise<AdminStatus> {
    return fetchAPI("/api/admin/status", {
      method: "GET",
      headers: getAuthHeader(sessionToken),
    });
  },

  /**
   * Update admin settings
   */
  async updateSettings(
    path: string,
    value: any,
    sessionToken: string
  ): Promise<any> {
    return fetchAPI("/api/admin/settings", {
      method: "PATCH",
      headers: getAuthHeader(sessionToken),
      body: JSON.stringify({ path, value }),
    });
  },
};

/**
 * Health check endpoint (no auth required)
 */
export const healthApi = {
  async check(): Promise<any> {
    return fetchAPI("/health", {
      method: "GET",
    });
  },
};
