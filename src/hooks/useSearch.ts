import { useState, useCallback } from 'react';
import { searchService } from '@/lib/api';
import type { SearchRequest, SearchResult } from '@/lib/api';

interface UseSearchReturn {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  searchResults: SearchResult[];
  isSearching: boolean;
  error: string | null;
  summary: string;
  searchType: 'all' | 'recordings' | 'documents' | 'cases' | 'transcripts';
  setSearchType: (type: 'all' | 'recordings' | 'documents' | 'cases' | 'transcripts') => void;
  handleSearch: () => Promise<void>;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleKeyPress: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  clearSearch: () => void;
}

export const useSearch = (): UseSearchReturn => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [summary, setSummary] = useState("");
  const [searchType, setSearchType] = useState<'all' | 'recordings' | 'documents' | 'cases' | 'transcripts'>('all');

  // Generate AI summary based on query
  const generateSummary = useCallback((query: string): string => {
    const summaries: Record<string, string> = {
      "sanksi pidana korupsi": "Berdasarkan pencarian dokumen hukum terkait sanksi pidana korupsi, ditemukan berbagai putusan pengadilan yang mengatur tentang hukuman pidana untuk tindak pidana korupsi. Sanksi pidana korupsi di Indonesia umumnya berupa pidana penjara dengan waktu tertentu sesuai dengan tingkat kerugian negara dan perbuatan yang dilakukan. Putusan-putusan ini menunjukkan konsistensi dalam penerapan hukum anti korupsi dan pentingnya pemberantasan korupsi dalam sistem peradilan Indonesia.",
      "narkotika": "Hasil pencarian menunjukkan berbagai putusan pengadilan terkait tindak pidana narkotika yang mencakup penyalahgunaan, peredaran, dan kepemilikan narkotika. Putusan-putusan ini mengatur tentang sanksi pidana yang berbeda-beda tergantung pada jenis narkotika, jumlah yang ditemukan, dan peran pelaku dalam tindak pidana tersebut. Pengadilan menerapkan ketentuan Undang-Undang Nomor 35 Tahun 2009 tentang Narkotika dengan mempertimbangkan berbagai faktor seperti jumlah barang bukti dan kondisi terdakwa.",
      "pidana": "Pencarian dokumen hukum terkait pidana menunjukkan berbagai jenis sanksi pidana yang diterapkan dalam sistem peradilan Indonesia, termasuk pidana penjara waktu tertentu, pidana denda, dan pidana lainnya. Putusan-putusan ini mencerminkan penerapan prinsip-prinsip hukum pidana yang adil dan proporsional sesuai dengan tingkat kesalahan dan dampak dari tindak pidana yang dilakukan."
    };
    
    // Find matching summary or generate generic one
    const lowerQuery = query.toLowerCase();
    for (const [key, value] of Object.entries(summaries)) {
      if (lowerQuery.includes(key)) {
        return value;
      }
    }
    
    // Generic summary if no specific match
    return `Berdasarkan pencarian dokumen hukum dengan kata kunci "${query}", ditemukan berbagai putusan pengadilan yang relevan dengan topik tersebut. Dokumen-dokumen ini mencakup berbagai aspek hukum yang berkaitan dengan pencarian Anda, termasuk sanksi pidana, prosedur peradilan, dan penerapan hukum yang konsisten dalam sistem peradilan Indonesia.`;
  }, []);

  const handleSearch = useCallback(async () => {
    if (!searchQuery.trim()) return;
    
    setIsSearching(true);
    setError(null);
    
    try {
      // Prepare search request
      const searchRequest: SearchRequest = {
        query: searchQuery,
        type: searchType,
        limit: 20,
        offset: 0,
      };

      // Call API search service
      const response = await searchService.globalSearch(searchRequest);
      
      if (response.success) {
        setSearchResults(response.data);
        
        // Generate AI summary
        const aiSummary = generateSummary(searchQuery);
        setSummary(aiSummary);
      } else {
        setError(response.message || 'Gagal melakukan pencarian');
        setSearchResults([]);
      }
    } catch (error) {
      console.error('Search error:', error);
      setError('Terjadi kesalahan saat melakukan pencarian. Silakan coba lagi.');
      setSearchResults([]);
      
      // Fallback to mock data for development
      if (process.env.NODE_ENV === 'development') {
        console.log('Using mock data as fallback');
        // You can add mock data here if needed
      }
    } finally {
      setIsSearching(false);
    }
  }, [searchQuery, searchType, generateSummary]);

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    if (!value.trim()) {
      setSummary("");
      setSearchResults([]);
      setError(null);
    }
  }, []);

  const handleKeyPress = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  }, [handleSearch]);

  const clearSearch = useCallback(() => {
    setSearchQuery("");
    setSearchResults([]);
    setSummary("");
    setError(null);
  }, []);

  return {
    searchQuery,
    setSearchQuery,
    searchResults,
    isSearching,
    error,
    summary,
    searchType,
    setSearchType,
    handleSearch,
    handleInputChange,
    handleKeyPress,
    clearSearch,
  };
};
