// API Endpoints Configuration
export const API_ENDPOINTS = {
  // Authentication
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    REFRESH: '/auth/refresh',
    LOGOUT: '/auth/logout',
    PROFILE: '/auth/profile',
  },

  // Recording & Audio
  RECORDING: {
    START: '/recording/start',
    STOP: '/recording/stop',
    PAUSE: '/recording/pause',
    RESUME: '/recording/resume',
    UPLOAD: '/recording/upload',
    STATUS: '/recording/status',
    LIST: '/recording/list',
    DELETE: '/recording/:id',
  },

  // Transcription
  TRANSCRIPTION: {
    CREATE: '/transcription/create',
    GET: '/transcription/:id',
    UPDATE: '/transcription/:id',
    DELETE: '/transcription/:id',
    LIST: '/transcription/list',
    PROCESS: '/transcription/process',
  },

  // AI Analysis
  ANALYSIS: {
    GENERATE: '/analysis/generate',
    GET: '/analysis/:id',
    UPDATE: '/analysis/:id',
    DELETE: '/analysis/:id',
    LIST: '/analysis/list',
    SUMMARY: '/analysis/summary',
    KEY_ISSUES: '/analysis/key-issues',
    ACTION_ITEMS: '/analysis/action-items',
  },

  // Documents
  DOCUMENTS: {
    UPLOAD: '/documents/upload',
    GET: '/documents/:id',
    UPDATE: '/documents/:id',
    DELETE: '/documents/:id',
    LIST: '/documents/list',
    SEARCH: '/documents/search',
    DOWNLOAD: '/documents/:id/download',
    SHARE: '/documents/:id/share',
  },

  // Cases
  CASES: {
    CREATE: '/cases/create',
    GET: '/cases/:id',
    UPDATE: '/cases/:id',
    DELETE: '/cases/:id',
    LIST: '/cases/list',
    SEARCH: '/cases/search',
    ASSIGN: '/cases/:id/assign',
  },

  // Users & Teams
  USERS: {
    GET: '/users/:id',
    UPDATE: '/users/:id',
    DELETE: '/users/:id',
    LIST: '/users/list',
    INVITE: '/users/invite',
  },

  // Settings
  SETTINGS: {
    GET: '/settings',
    UPDATE: '/settings',
    THEME: '/settings/theme',
    NOTIFICATIONS: '/settings/notifications',
  },

  // Search
  SEARCH: {
    GLOBAL: '/api/v1/search/',
  },

  // Chat
  CHAT: {
    STREAM: '/api/v1/chat/stream',
  },

  // Health & Status
  HEALTH: '/health',
  STATUS: '/status',
} as const;

// HTTP Methods
export const HTTP_METHODS = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  PATCH: 'PATCH',
  DELETE: 'DELETE',
} as const;

// API Response Status Codes
export const API_STATUS = {
  SUCCESS: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  UNPROCESSABLE_ENTITY: 422,
  INTERNAL_SERVER_ERROR: 500,
  SERVICE_UNAVAILABLE: 503,
} as const;

export type ApiEndpoint = typeof API_ENDPOINTS;
export type HttpMethod = typeof HTTP_METHODS[keyof typeof HTTP_METHODS];
export type ApiStatus = typeof API_STATUS[keyof typeof API_STATUS];
