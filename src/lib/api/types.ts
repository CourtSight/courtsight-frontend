// Base API Response Types
export interface ApiResponse<T = any> {
  success: boolean;
  data: T;
  message?: string;
  errors?: string[];
  timestamp: string;
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

export interface ApiError {
  message: string;
  code?: string;
  details?: any;
  timestamp: string;
}

// Authentication Types
export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  user: User;
  token: string;
  refreshToken: string;
  expiresIn: number;
}

export interface RegisterRequest {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  firmName?: string;
}

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  firmName?: string;
  role: 'attorney' | 'paralegal' | 'admin';
  createdAt: string;
  updatedAt: string;
}

// Recording Types
export interface Recording {
  id: string;
  userId: string;
  fileName: string;
  duration: number;
  fileSize: number;
  status: 'recording' | 'completed' | 'processing' | 'failed';
  createdAt: string;
  updatedAt: string;
  transcript?: Transcript;
  analysis?: Analysis;
}

export interface StartRecordingRequest {
  caseId?: string;
  participants?: string[];
  metadata?: Record<string, any>;
}

export interface StartRecordingResponse {
  recordingId: string;
  sessionId: string;
  status: string;
}

// Transcription Types
export interface Transcript {
  id: string;
  recordingId: string;
  content: string;
  confidence: number;
  language: string;
  speakers: Speaker[];
  segments: TranscriptSegment[];
  createdAt: string;
  updatedAt: string;
}

export interface Speaker {
  id: string;
  name?: string;
  role?: string;
  confidence: number;
}

export interface TranscriptSegment {
  id: string;
  speakerId: string;
  text: string;
  startTime: number;
  endTime: number;
  confidence: number;
}

export interface TranscriptionRequest {
  recordingId: string;
  language?: string;
  speakers?: string[];
}

// Analysis Types
export interface Analysis {
  id: string;
  recordingId: string;
  transcriptId: string;
  summary: string;
  keyIssues: string[];
  actionItems: ActionItem[];
  participants: string[];
  duration: string;
  confidence: number;
  legalTopics: LegalTopic[];
  createdAt: string;
  updatedAt: string;
}

export interface ActionItem {
  id: string;
  description: string;
  priority: 'low' | 'medium' | 'high';
  dueDate?: string;
  assignedTo?: string;
  status: 'pending' | 'in_progress' | 'completed';
}

export interface LegalTopic {
  name: string;
  confidence: number;
  relevance: number;
}

export interface AnalysisRequest {
  transcriptId: string;
  analysisType?: 'summary' | 'detailed' | 'legal_focus';
  includeActionItems?: boolean;
}

// Document Types
export interface Document {
  id: string;
  userId: string;
  caseId?: string;
  fileName: string;
  fileType: string;
  fileSize: number;
  mimeType: string;
  content?: string;
  metadata: DocumentMetadata;
  createdAt: string;
  updatedAt: string;
}

export interface DocumentMetadata {
  title?: string;
  description?: string;
  tags?: string[];
  category?: string;
  confidential?: boolean;
  version?: string;
}

export interface DocumentUploadRequest {
  file: File;
  caseId?: string;
  metadata?: Partial<DocumentMetadata>;
}

export interface DocumentSearchRequest {
  query: string;
  caseId?: string;
  fileType?: string;
  tags?: string[];
  dateRange?: {
    start: string;
    end: string;
  };
}

// Case Types
export interface Case {
  id: string;
  userId: string;
  title: string;
  description?: string;
  status: 'active' | 'closed' | 'archived';
  caseNumber?: string;
  clientName?: string;
  practiceArea?: string;
  priority: 'low' | 'medium' | 'high';
  createdAt: string;
  updatedAt: string;
  documents?: Document[];
  recordings?: Recording[];
}

export interface CreateCaseRequest {
  title: string;
  description?: string;
  clientName?: string;
  practiceArea?: string;
  priority?: 'low' | 'medium' | 'high';
}

// Settings Types
export interface UserSettings {
  id: string;
  userId: string;
  theme: 'light' | 'dark' | 'system';
  notifications: NotificationSettings;
  privacy: PrivacySettings;
  audio: AudioSettings;
  createdAt: string;
  updatedAt: string;
}

export interface NotificationSettings {
  email: boolean;
  push: boolean;
  recordingComplete: boolean;
  analysisReady: boolean;
  documentShared: boolean;
}

export interface PrivacySettings {
  dataRetention: number; // days
  autoDelete: boolean;
  shareAnalytics: boolean;
}

export interface AudioSettings {
  quality: 'low' | 'medium' | 'high';
  noiseReduction: boolean;
  autoTranscribe: boolean;
}

// Search Types - Updated to match actual API structure
export interface SearchRequest {
  query: string;
}

export interface SearchResponse {
  query: string;
  results: SearchResult[];
  metrics: SearchMetrics;
  timestamp: string;
  filters_applied: any;
  total_results: number;
  has_more: boolean;
}

export interface SearchResult {
  summary: string;
  key_points: string[];
  source_documents: SourceDocument[];
  validation_status: string;
  confidence_score: number;
  legal_areas: string[];
}

export interface SourceDocument {
  title: string;
  case_number: string;
  excerpt: string;
  source: string;
  link_pdf: string;
  validation_status: string;
  relevance_score: number;
  legal_areas: string[];
}

export interface SearchMetrics {
  query_time: number;
  retrieval_time: number;
  generation_time: number;
  validation_time: number;
  documents_retrieved: number;
  tokens_used: number;
  cache_hit: boolean;
}

// Legacy types for backward compatibility
export interface SearchFilters {
  dateRange?: {
    start: string;
    end: string;
  };
  caseId?: string;
  fileType?: string;
  tags?: string[];
  participants?: string[];
}

// File Upload Types
export interface FileUploadProgress {
  loaded: number;
  total: number;
  percentage: number;
}

export interface UploadResponse {
  fileId: string;
  fileName: string;
  fileSize: number;
  mimeType: string;
  url?: string;
}

// Chat Types
export interface ChatStreamRequest {
  message: string;
  conversation_id?: string | null;
  include_reasoning?: boolean;
  max_tokens?: number;
}

export type ChatStreamEvent =
  | { type: 'status'; message: string }
  | { type: 'partial_response'; content: string }
  | { type: 'final_response'; content: string }
  | { type: 'complete'; conversation_id?: string; response_time: number; tools_used: unknown[]; workflow_used?: boolean }
  | { type: 'error'; message: string };