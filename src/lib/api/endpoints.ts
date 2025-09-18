export const API_ENDPOINTS = {
  // Search
  SEARCH: {
    GLOBAL: '/api/v1/search/',
  },
  // Chat
  CHAT: {
    STREAM: '/api/v1/chat/stream',
  },
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