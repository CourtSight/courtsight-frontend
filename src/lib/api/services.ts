import apiClient from './config';
import { API_ENDPOINTS, HTTP_METHODS } from './endpoints';
import type {
  ApiResponse,
  PaginatedResponse,
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  User,
  Recording,
  StartRecordingRequest,
  StartRecordingResponse,
  Transcript,
  TranscriptionRequest,
  Analysis,
  AnalysisRequest,
  Document,
  DocumentUploadRequest,
  DocumentSearchRequest,
  Case,
  CreateCaseRequest,
  UserSettings,
  SearchRequest,
  SearchResponse,
  SearchResult,
  UploadResponse,
} from './types';

// Authentication Services
export const authService = {
  login: async (credentials: LoginRequest): Promise<ApiResponse<LoginResponse>> => {
    const response = await apiClient.post(API_ENDPOINTS.AUTH.LOGIN, credentials);
    return response.data;
  },

  register: async (userData: RegisterRequest): Promise<ApiResponse<LoginResponse>> => {
    const response = await apiClient.post(API_ENDPOINTS.AUTH.REGISTER, userData);
    return response.data;
  },

  refreshToken: async (): Promise<ApiResponse<{ token: string }>> => {
    const response = await apiClient.post(API_ENDPOINTS.AUTH.REFRESH);
    return response.data;
  },

  logout: async (): Promise<ApiResponse<void>> => {
    const response = await apiClient.post(API_ENDPOINTS.AUTH.LOGOUT);
    return response.data;
  },

  getProfile: async (): Promise<ApiResponse<User>> => {
    const response = await apiClient.get(API_ENDPOINTS.AUTH.PROFILE);
    return response.data;
  },
};

// Recording Services
export const recordingService = {
  startRecording: async (data: StartRecordingRequest): Promise<ApiResponse<StartRecordingResponse>> => {
    const response = await apiClient.post(API_ENDPOINTS.RECORDING.START, data);
    return response.data;
  },

  stopRecording: async (recordingId: string): Promise<ApiResponse<void>> => {
    const response = await apiClient.post(API_ENDPOINTS.RECORDING.STOP, { recordingId });
    return response.data;
  },

  pauseRecording: async (recordingId: string): Promise<ApiResponse<void>> => {
    const response = await apiClient.post(API_ENDPOINTS.RECORDING.PAUSE, { recordingId });
    return response.data;
  },

  resumeRecording: async (recordingId: string): Promise<ApiResponse<void>> => {
    const response = await apiClient.post(API_ENDPOINTS.RECORDING.RESUME, { recordingId });
    return response.data;
  },

  uploadRecording: async (file: File, metadata?: any): Promise<ApiResponse<UploadResponse>> => {
    const formData = new FormData();
    formData.append('file', file);
    if (metadata) {
      formData.append('metadata', JSON.stringify(metadata));
    }

    const response = await apiClient.post(API_ENDPOINTS.RECORDING.UPLOAD, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  getRecordingStatus: async (recordingId: string): Promise<ApiResponse<{ status: string; progress?: number }>> => {
    const response = await apiClient.get(`${API_ENDPOINTS.RECORDING.STATUS}/${recordingId}`);
    return response.data;
  },

  getRecordings: async (page = 1, limit = 10): Promise<PaginatedResponse<Recording>> => {
    const response = await apiClient.get(API_ENDPOINTS.RECORDING.LIST, {
      params: { page, limit },
    });
    return response.data;
  },

  deleteRecording: async (recordingId: string): Promise<ApiResponse<void>> => {
    const response = await apiClient.delete(API_ENDPOINTS.RECORDING.DELETE.replace(':id', recordingId));
    return response.data;
  },
};

// Transcription Services
export const transcriptionService = {
  createTranscription: async (data: TranscriptionRequest): Promise<ApiResponse<Transcript>> => {
    const response = await apiClient.post(API_ENDPOINTS.TRANSCRIPTION.CREATE, data);
    return response.data;
  },

  getTranscription: async (transcriptId: string): Promise<ApiResponse<Transcript>> => {
    const response = await apiClient.get(API_ENDPOINTS.TRANSCRIPTION.GET.replace(':id', transcriptId));
    return response.data;
  },

  updateTranscription: async (transcriptId: string, data: Partial<Transcript>): Promise<ApiResponse<Transcript>> => {
    const response = await apiClient.put(API_ENDPOINTS.TRANSCRIPTION.UPDATE.replace(':id', transcriptId), data);
    return response.data;
  },

  deleteTranscription: async (transcriptId: string): Promise<ApiResponse<void>> => {
    const response = await apiClient.delete(API_ENDPOINTS.TRANSCRIPTION.DELETE.replace(':id', transcriptId));
    return response.data;
  },

  getTranscriptions: async (page = 1, limit = 10): Promise<PaginatedResponse<Transcript>> => {
    const response = await apiClient.get(API_ENDPOINTS.TRANSCRIPTION.LIST, {
      params: { page, limit },
    });
    return response.data;
  },

  processTranscription: async (recordingId: string): Promise<ApiResponse<Transcript>> => {
    const response = await apiClient.post(API_ENDPOINTS.TRANSCRIPTION.PROCESS, { recordingId });
    return response.data;
  },
};

// Analysis Services
export const analysisService = {
  generateAnalysis: async (data: AnalysisRequest): Promise<ApiResponse<Analysis>> => {
    const response = await apiClient.post(API_ENDPOINTS.ANALYSIS.GENERATE, data);
    return response.data;
  },

  getAnalysis: async (analysisId: string): Promise<ApiResponse<Analysis>> => {
    const response = await apiClient.get(API_ENDPOINTS.ANALYSIS.GET.replace(':id', analysisId));
    return response.data;
  },

  updateAnalysis: async (analysisId: string, data: Partial<Analysis>): Promise<ApiResponse<Analysis>> => {
    const response = await apiClient.put(API_ENDPOINTS.ANALYSIS.UPDATE.replace(':id', analysisId), data);
    return response.data;
  },

  deleteAnalysis: async (analysisId: string): Promise<ApiResponse<void>> => {
    const response = await apiClient.delete(API_ENDPOINTS.ANALYSIS.DELETE.replace(':id', analysisId));
    return response.data;
  },

  getAnalyses: async (page = 1, limit = 10): Promise<PaginatedResponse<Analysis>> => {
    const response = await apiClient.get(API_ENDPOINTS.ANALYSIS.LIST, {
      params: { page, limit },
    });
    return response.data;
  },

  getSummary: async (transcriptId: string): Promise<ApiResponse<{ summary: string }>> => {
    const response = await apiClient.post(API_ENDPOINTS.ANALYSIS.SUMMARY, { transcriptId });
    return response.data;
  },

  getKeyIssues: async (transcriptId: string): Promise<ApiResponse<{ keyIssues: string[] }>> => {
    const response = await apiClient.post(API_ENDPOINTS.ANALYSIS.KEY_ISSUES, { transcriptId });
    return response.data;
  },

  getActionItems: async (transcriptId: string): Promise<ApiResponse<{ actionItems: any[] }>> => {
    const response = await apiClient.post(API_ENDPOINTS.ANALYSIS.ACTION_ITEMS, { transcriptId });
    return response.data;
  },
};

// Document Services
export const documentService = {
  uploadDocument: async (data: DocumentUploadRequest): Promise<ApiResponse<UploadResponse>> => {
    const formData = new FormData();
    formData.append('file', data.file);
    if (data.caseId) {
      formData.append('caseId', data.caseId);
    }
    if (data.metadata) {
      formData.append('metadata', JSON.stringify(data.metadata));
    }

    const response = await apiClient.post(API_ENDPOINTS.DOCUMENTS.UPLOAD, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  getDocument: async (documentId: string): Promise<ApiResponse<Document>> => {
    const response = await apiClient.get(API_ENDPOINTS.DOCUMENTS.GET.replace(':id', documentId));
    return response.data;
  },

  updateDocument: async (documentId: string, data: Partial<Document>): Promise<ApiResponse<Document>> => {
    const response = await apiClient.put(API_ENDPOINTS.DOCUMENTS.UPDATE.replace(':id', documentId), data);
    return response.data;
  },

  deleteDocument: async (documentId: string): Promise<ApiResponse<void>> => {
    const response = await apiClient.delete(API_ENDPOINTS.DOCUMENTS.DELETE.replace(':id', documentId));
    return response.data;
  },

  getDocuments: async (page = 1, limit = 10): Promise<PaginatedResponse<Document>> => {
    const response = await apiClient.get(API_ENDPOINTS.DOCUMENTS.LIST, {
      params: { page, limit },
    });
    return response.data;
  },

  searchDocuments: async (searchData: DocumentSearchRequest): Promise<ApiResponse<Document[]>> => {
    const response = await apiClient.post(API_ENDPOINTS.DOCUMENTS.SEARCH, searchData);
    return response.data;
  },

  downloadDocument: async (documentId: string): Promise<Blob> => {
    const response = await apiClient.get(API_ENDPOINTS.DOCUMENTS.DOWNLOAD.replace(':id', documentId), {
      responseType: 'blob',
    });
    return response.data;
  },

  shareDocument: async (documentId: string, shareData: { email: string; permissions: string[] }): Promise<ApiResponse<void>> => {
    const response = await apiClient.post(API_ENDPOINTS.DOCUMENTS.SHARE.replace(':id', documentId), shareData);
    return response.data;
  },
};

// Case Services
export const caseService = {
  createCase: async (data: CreateCaseRequest): Promise<ApiResponse<Case>> => {
    const response = await apiClient.post(API_ENDPOINTS.CASES.CREATE, data);
    return response.data;
  },

  getCase: async (caseId: string): Promise<ApiResponse<Case>> => {
    const response = await apiClient.get(API_ENDPOINTS.CASES.GET.replace(':id', caseId));
    return response.data;
  },

  updateCase: async (caseId: string, data: Partial<Case>): Promise<ApiResponse<Case>> => {
    const response = await apiClient.put(API_ENDPOINTS.CASES.UPDATE.replace(':id', caseId), data);
    return response.data;
  },

  deleteCase: async (caseId: string): Promise<ApiResponse<void>> => {
    const response = await apiClient.delete(API_ENDPOINTS.CASES.DELETE.replace(':id', caseId));
    return response.data;
  },

  getCases: async (page = 1, limit = 10): Promise<PaginatedResponse<Case>> => {
    const response = await apiClient.get(API_ENDPOINTS.CASES.LIST, {
      params: { page, limit },
    });
    return response.data;
  },

  searchCases: async (query: string): Promise<ApiResponse<Case[]>> => {
    const response = await apiClient.post(API_ENDPOINTS.CASES.SEARCH, { query });
    return response.data;
  },

  assignCase: async (caseId: string, userId: string): Promise<ApiResponse<void>> => {
    const response = await apiClient.post(API_ENDPOINTS.CASES.ASSIGN.replace(':id', caseId), { userId });
    return response.data;
  },
};

// Search Services
export const searchService = {
  globalSearch: async (searchData: SearchRequest): Promise<SearchResponse> => {
    const response = await apiClient.post(API_ENDPOINTS.SEARCH.GLOBAL, searchData);
    return response.data;
  },
};

// Settings Services
export const settingsService = {
  getSettings: async (): Promise<ApiResponse<UserSettings>> => {
    const response = await apiClient.get(API_ENDPOINTS.SETTINGS.GET);
    return response.data;
  },

  updateSettings: async (data: Partial<UserSettings>): Promise<ApiResponse<UserSettings>> => {
    const response = await apiClient.put(API_ENDPOINTS.SETTINGS.UPDATE, data);
    return response.data;
  },

  updateTheme: async (theme: 'light' | 'dark' | 'system'): Promise<ApiResponse<void>> => {
    const response = await apiClient.put(API_ENDPOINTS.SETTINGS.THEME, { theme });
    return response.data;
  },

  updateNotifications: async (notifications: any): Promise<ApiResponse<void>> => {
    const response = await apiClient.put(API_ENDPOINTS.SETTINGS.NOTIFICATIONS, notifications);
    return response.data;
  },
};

// Health Services
export const healthService = {
  checkHealth: async (): Promise<ApiResponse<{ status: string; timestamp: string }>> => {
    const response = await apiClient.get(API_ENDPOINTS.HEALTH);
    return response.data;
  },

  getStatus: async (): Promise<ApiResponse<{ status: string; services: any }>> => {
    const response = await apiClient.get(API_ENDPOINTS.STATUS);
    return response.data;
  },
};
