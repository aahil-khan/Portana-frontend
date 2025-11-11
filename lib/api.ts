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
   * Step 2: Upload resume file for parsing
   * Sends multipart/form-data to our backend
   */
  async uploadResume(file: File, sessionToken: string): Promise<any> {
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch(`${API_URL}/api/onboarding/upload-resume`, {
        method: "POST",
        body: formData,
        headers: {
          ...getAuthHeader(sessionToken),
        },
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
          `Resume parsing error ${response.status}: ${errorText || response.statusText}`
        );
      }

      const data = await response.json();
      console.log("[Step2] Resume parsed successfully:", data);
      
      return data;
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error("Failed to parse resume");
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
   * Checkpoint: Save partial progress at any step
   */
  async checkpoint(
    sessionToken: string,
    step: number,
    data: any
  ): Promise<any> {
    const userId = localStorage.getItem("user_id");
    if (!userId) {
      throw new Error("User ID not found in localStorage");
    }

    return fetchAPI(`/api/onboarding/${userId}/checkpoint`, {
      method: "POST",
      headers: getAuthHeader(sessionToken),
      body: JSON.stringify({ step, data }),
    });
  },

  /**
   * Resume Checkpoint: Get last saved progress
   */
  async resumeCheckpoint(sessionToken: string): Promise<any> {
    const userId = localStorage.getItem("user_id");
    if (!userId) {
      throw new Error("User ID not found in localStorage");
    }

    return fetchAPI(`/api/onboarding/${userId}/checkpoint-resume`, {
      method: "GET",
      headers: getAuthHeader(sessionToken),
    });
  },

  /**
   * Finalize: Process all 5 steps and complete onboarding
   */
  async finalize(allSteps: any, sessionToken: string): Promise<any> {
    const userId = localStorage.getItem("user_id");
    if (!userId) {
      throw new Error("User ID not found in localStorage");
    }

    return fetchAPI(`/api/onboarding/${userId}/finalize`, {
      method: "POST",
      headers: getAuthHeader(sessionToken),
      body: JSON.stringify(allSteps),
    });
  },

  /**
   * Delete: Reset session and cleanup
   */
  async deleteSession(sessionToken: string): Promise<any> {
    const userId = localStorage.getItem("user_id");
    if (!userId) {
      throw new Error("User ID not found in localStorage");
    }

    return fetchAPI(`/api/onboarding/${userId}`, {
      method: "DELETE",
      headers: getAuthHeader(sessionToken),
    });
  },

  /**
   * Test endpoints: Test individual steps in isolation (development only)
   */
  testStep: {
    async step1(data: any, sessionId?: string): Promise<any> {
      const id = sessionId || `test-${Date.now()}`;
      return fetchAPI(`/api/onboarding/${id}/test/step/1`, {
        method: "POST",
        body: JSON.stringify(data),
      });
    },

    async step2(data: any, sessionId?: string): Promise<any> {
      const id = sessionId || `test-${Date.now()}`;
      return fetchAPI(`/api/onboarding/${id}/test/step/2`, {
        method: "POST",
        body: JSON.stringify(data),
      });
    },

    async step3(data: any, sessionId?: string): Promise<any> {
      const id = sessionId || `test-${Date.now()}`;
      return fetchAPI(`/api/onboarding/${id}/test/step/3`, {
        method: "POST",
        body: JSON.stringify(data),
      });
    },

    async step4(data: any, sessionId?: string): Promise<any> {
      const id = sessionId || `test-${Date.now()}`;
      return fetchAPI(`/api/onboarding/${id}/test/step/4`, {
        method: "POST",
        body: JSON.stringify(data),
      });
    },

    async step5(data: any, sessionId?: string): Promise<any> {
      const id = sessionId || `test-${Date.now()}`;
      return fetchAPI(`/api/onboarding/${id}/test/step/5`, {
        method: "POST",
        body: JSON.stringify(data),
      });
    },
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
