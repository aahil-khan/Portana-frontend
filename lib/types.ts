/**
 * Type Definitions for API Requests and Responses
 */

// ==================== ONBOARDING TYPES ====================

export interface Step1Data {
  full_name: string;
  bio: string;
  email: string;
  location?: string;
  timezone?: string;
  profile_image?: string;
}

export interface Step1Response {
  success: boolean;
  user_id: string;
  session_token: string;
  next_step: string;
}

export interface ResumeData {
  personal?: any;
  experience?: any[];
  projects?: any[];
  skills?: any[];
  education?: any[];
  certifications?: any[];
}

export interface Step3Data {
  githubUsername?: string;
  githubAccessToken?: string;
  githubIncludeRepos?: "all" | "public" | "selected";
  githubSelectedRepos?: string[];
  githubAutoSync?: boolean;
  mediumUsername?: string;
  mediumCustomDomain?: string;
  mediumAutoSync?: boolean;
  mediumCheckInterval?: "6h" | "12h" | "24h";
}

export interface Step4Data {
  personaName?: string;
  personaDescription?: string;
  tone: "professional" | "casual" | "technical" | "friendly";
  verbosity: "concise" | "balanced" | "detailed";
  formality: "formal" | "neutral" | "informal";
  citeSource?: boolean;
  showConfidence?: boolean;
  askClarifyingQuestions?: boolean;
  suggestRelatedContent?: boolean;
  customInstructions?: string;
}

export interface Step5Data {
  publicUrl: string;
  adminEmail: string;
  emailNotifications?: boolean;
  telegramEnabled?: boolean;
  telegramBotToken?: string;
  telegramChatId?: string;
  discordEnabled?: boolean;
  discordWebhookUrl?: string;
  telemetry?: boolean;
  trackQueries?: boolean;
}

export interface DeployResponse {
  success: boolean;
  setup_complete: boolean;
  access_info?: {
    api_base_url: string;
    chat_endpoint: string;
    webhook_endpoint: string;
  };
}

// ==================== CHAT TYPES ====================

export interface ChatFilters {
  types?: string[];
  tags?: string[];
  date_range?: {
    from: string;
    to: string;
  };
}

export interface ChatOptions {
  top_k?: number;
  stream?: boolean;
}

export interface ChatQuery {
  query: string;
  session_id?: string;
  filters?: ChatFilters;
  options?: ChatOptions;
}

export interface ChatSource {
  id: string;
  type: string;
  title: string;
  url?: string;
  tags?: string[];
  relevance_score?: number;
}

export interface ChatSSEEvent {
  type: "sources" | "token" | "done";
  sources?: ChatSource[];
  content?: string;
  total_tokens?: number;
  response_time_ms?: number;
  session_id?: string;
}

export interface ChatMessage {
  role: "user" | "ai";
  content: string;
  sources?: ChatSource[];
  timestamp?: Date;
}

// ==================== ADMIN TYPES ====================

export interface AdminStatus {
  system: {
    version: string;
    uptime_seconds: number;
    uptime_human: string;
    setup_completed_at: string;
    environment: "production" | "development";
  };
  services: {
    qdrant: {
      status: "healthy" | "down";
      latency_ms: number;
      collection_size: number;
      collection_size_mb: number;
    };
    openai: {
      status: "healthy" | "down";
      latency_ms: number;
      daily_requests: number;
      daily_tokens_used: number;
    };
  };
}

// ==================== ERROR TYPES ====================

export interface APIError {
  message: string;
  status?: number;
  details?: string;
}
