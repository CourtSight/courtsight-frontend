// Main API export file - provides a clean interface for all API operations
export { default as apiClient } from './config';
export * from './endpoints';
export * from './types';
export * from './services';

// Re-export all services for easy importing
export {
  authService,
  recordingService,
  transcriptionService,
  analysisService,
  documentService,
  caseService,
  searchService,
  settingsService,
  healthService,
} from './services';
