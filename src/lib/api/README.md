# API Configuration

This directory contains the complete API configuration for the CourtSight application using Axios.

## Files Overview

### `config.ts`
- Main Axios instance configuration
- Base URL setup with environment variable support
- Request/Response interceptors for authentication and error handling
- Automatic token management
- Request/Response logging for debugging

### `endpoints.ts`
- Centralized endpoint definitions
- HTTP methods constants
- API status codes
- Organized by feature (auth, recording, transcription, analysis, documents, etc.)

### `types.ts`
- TypeScript type definitions for all API requests and responses
- Comprehensive type safety for the entire API layer
- Includes pagination, error handling, and all domain models

### `services.ts`
- Service functions for each API endpoint
- Organized by feature area (authService, recordingService, etc.)
- Type-safe function signatures
- Consistent error handling

### `index.ts`
- Main export file for clean imports
- Re-exports all services and types

## Usage Examples

### Basic Import
```typescript
import { authService, recordingService } from '@/lib/api';
```

### Authentication
```typescript
// Login
const loginResponse = await authService.login({
  email: 'user@example.com',
  password: 'password123'
});

// Get user profile
const profile = await authService.getProfile();
```

### Recording Management
```typescript
// Start recording
const recording = await recordingService.startRecording({
  caseId: 'case-123',
  participants: ['Attorney Smith', 'Client Johnson']
});

// Upload audio file
const uploadResponse = await recordingService.uploadRecording(audioFile);
```

### Document Management
```typescript
// Upload document
const document = await documentService.uploadDocument({
  file: pdfFile,
  caseId: 'case-123',
  metadata: { title: 'Contract Review' }
});

// Search documents
const results = await documentService.searchDocuments({
  query: 'contract dispute',
  caseId: 'case-123'
});
```

## Environment Variables

Set the following environment variable in your `.env` file:

```env
VITE_API_BASE_URL=http://localhost:8000/api
```

## Error Handling

All API calls include automatic error handling with:
- 401 Unauthorized: Automatic token refresh or redirect to login
- 403 Forbidden: Access denied logging
- 500+ Server errors: Server error logging
- Network errors: Connection error handling

## Features

- ✅ TypeScript support with full type safety
- ✅ Automatic authentication token management
- ✅ Request/Response interceptors
- ✅ Error handling and logging
- ✅ File upload support
- ✅ Pagination support
- ✅ Search functionality
- ✅ Environment-based configuration
- ✅ Comprehensive API coverage for legal AI features
