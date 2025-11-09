/**
 * API Configuration
 * Central place for all API-related configuration
 */

export const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
export const API_TIMEOUT = 30000; // 30 seconds

/**
 * Get authorization header for authenticated requests
 */
export function getAuthHeader(sessionToken?: string): Record<string, string> {
  if (!sessionToken) {
    return {};
  }
  return {
    Authorization: `Bearer ${sessionToken}`,
  };
}
