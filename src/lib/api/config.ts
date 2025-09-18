import axios, { AxiosInstance, InternalAxiosRequestConfig, AxiosResponse } from 'axios';

// API Configuration
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';
const API_TIMEOUT = 60000; // 30 seconds

// Create axios instance
const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: API_TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // Add auth token if available
    const token = localStorage.getItem('authToken');
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    // Add request timestamp for debugging
    console.log(`[API Request] ${config.method?.toUpperCase()} ${config.url}`, {
      timestamp: new Date().toISOString(),
      data: config.data,
    });
    
    return config;
  },
  (error) => {
    console.error('[API Request Error]', error);
    return Promise.reject(error);
  }
);

// Response interceptor
apiClient.interceptors.response.use(
  (response: AxiosResponse) => {
    console.log(`[API Response] ${response.config.method?.toUpperCase()} ${response.config.url}`, {
      status: response.status,
      timestamp: new Date().toISOString(),
      data: response.data,
    });
    return response;
  },
  (error) => {
    console.error('[API Response Error]', {
      status: error.response?.status,
      message: error.message,
      url: error.config?.url,
      timestamp: new Date().toISOString(),
    });

    // Handle specific error cases
    if (error.response?.status === 401) {
      // Unauthorized - redirect to login or refresh token
      localStorage.removeItem('authToken');
      window.location.href = '/login';
    } else if (error.response?.status === 403) {
      // Forbidden
      console.error('Access forbidden');
    } else if (error.response?.status >= 500) {
      // Server error
      console.error('Server error occurred');
    }

    return Promise.reject(error);
  }
);

export default apiClient;

// Helper to build absolute API URLs (useful for fetch streaming calls)
export const buildApiUrl = (path: string): string => {
  if (!path) return API_BASE_URL;
  const needsSlash = !API_BASE_URL.endsWith('/') && !path.startsWith('/');
  const noDoubleSlash = API_BASE_URL.endsWith('/') && path.startsWith('/')
    ? path.substring(1)
    : path;
  return needsSlash ? `${API_BASE_URL}/${path}` : `${API_BASE_URL}${noDoubleSlash.startsWith('/') ? '' : '/'}${noDoubleSlash}`;
};
