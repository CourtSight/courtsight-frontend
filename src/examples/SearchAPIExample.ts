// Example usage of the updated Search API integration

import { searchService } from '@/lib/api';
import type { SearchRequest, SearchResponse } from '@/lib/api';

// Example search function
export const searchLegalDocuments = async (query: string): Promise<SearchResponse> => {
  const searchRequest: SearchRequest = {
    query: query
  };

  try {
    const response = await searchService.globalSearch(searchRequest);
    return response;
  } catch (error) {
    console.error('Search failed:', error);
    throw error;
  }
};
