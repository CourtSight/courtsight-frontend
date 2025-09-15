// Example usage of the API configuration in your components
import { recordingService, transcriptionService, analysisService } from '@/lib/api';
import type { StartRecordingRequest, AnalysisRequest } from '@/lib/api';

// Example: Updated Recorder component with API integration
export const useRecordingAPI = () => {
  const startRecording = async (data: StartRecordingRequest) => {
    try {
      const response = await recordingService.startRecording(data);
      return response.data;
    } catch (error) {
      console.error('Failed to start recording:', error);
      throw error;
    }
  };

  const stopRecording = async (recordingId: string) => {
    try {
      await recordingService.stopRecording(recordingId);
    } catch (error) {
      console.error('Failed to stop recording:', error);
      throw error;
    }
  };

  const processTranscription = async (recordingId: string) => {
    try {
      const response = await transcriptionService.processTranscription(recordingId);
      return response.data;
    } catch (error) {
      console.error('Failed to process transcription:', error);
      throw error;
    }
  };

  const generateAnalysis = async (transcriptId: string) => {
    try {
      const analysisRequest: AnalysisRequest = {
        transcriptId,
        analysisType: 'detailed',
        includeActionItems: true,
      };
      const response = await analysisService.generateAnalysis(analysisRequest);
      return response.data;
    } catch (error) {
      console.error('Failed to generate analysis:', error);
      throw error;
    }
  };

  return {
    startRecording,
    stopRecording,
    processTranscription,
    generateAnalysis,
  };
};
