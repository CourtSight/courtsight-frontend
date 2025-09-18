import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import Navigation from "@/components/Navigation";
import ChatWidget from "@/components/ChatWidget";
import { Search as SearchIcon, Filter, Calendar, FileText, ExternalLink, BookOpen, Stars, AlertCircle,Loader2 } from "lucide-react";
import { searchService } from "@/lib/api";
import aseanImage from "@/assets/asean.png";
import type { SearchRequest, SearchResponse, SearchResult, SourceDocument } from "@/lib/api";

const Search = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResponse, setSearchResponse] = useState<SearchResponse | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    
    setIsSearching(true);
    setError(null);
    
    try {
      // Prepare search request
      const searchRequest: SearchRequest = {
        query: searchQuery,
      };

      // Call API search service
      const response = await searchService.globalSearch(searchRequest);
      
      setSearchResponse(response);
    } catch (error) {
      console.error('Search error:', error);
      setError('Terjadi kesalahan saat melakukan pencarian. Silakan coba lagi.');
      setSearchResponse(null);
      
      // Fallback to mock data for development
      if (process.env.NODE_ENV === 'development') {
        console.log('Using mock data as fallback');
        // You can add mock response here if needed
      }
    } finally {
      setIsSearching(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  // Clear summary when search query is cleared
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    if (!value.trim()) {
      setSearchResponse(null);
      setError(null);
    }
  };

  return (
    <div className="min-h-screen">
      <Navigation />
      <div className="absolute inset-0 -z-10">
        <img src={aseanImage} alt="ASEAN" className="w-full h-full object-cover" />
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="relative overflow-hidden text-center mb-8">
          <div className="absolute inset-0 opacity-10 pointer-events-none">
            <div
              className="w-full h-48"
              style={{
                backgroundImage: `url(${aseanImage})`,
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                backgroundSize: "contain",
              }}
            ></div>
          </div>
          <div className="relative">
          <h1 className="text-xl font-bold text-foreground mt-4">
            Search Public Court Rulings
          </h1>
          </div>
        </div>

        {/* Search Interface */}
        <Card className="mb-8 shadow-md">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <SearchIcon className="h-5 w-5" />
              <span className="text-base">Search Court Rulings</span>
            </CardTitle>
            <CardDescription>
              Enter a legal question to retrieve the most relevant public rulings and precedents
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex space-x-4">
                <div className="flex-1">
                  <Input
                    placeholder="Type a legal question (e.g., 'legal basis for land dispute decisions')"
                    value={searchQuery}
                    onChange={handleInputChange}
                    onKeyPress={handleKeyPress}
                    className="text-base"
                  />
                </div>
                <Button 
                  onClick={handleSearch}
                  disabled={isSearching || !searchQuery.trim()}
                  variant="hero"
                  size="lg"
                  className="flex items-center gap-2"
                >
                  {isSearching ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Searching...
                    </>
                  ) : (
                    <>
                      <SearchIcon className="h-4 w-4" />
                      Search
                    </>
                  )}
                </Button>
              </div>
              
            </div>
          </CardContent>
        </Card>

        {/* Error Display */}
        {error && (
          <Card className="mb-8 shadow-md border-l-4 border-l-red-500">
            <CardContent className="p-6">
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0">
                  <AlertCircle className="h-5 w-5 text-red-500" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-red-700 dark:text-red-400 mb-2">Search Error</h3>
                  <p className="text-red-600 dark:text-red-300">{error}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* AI Summary Card */}
        {searchResponse && searchResponse.results.length > 0 && (
          <Card className="mb-8 shadow-md border-l-4 border-l-blue-500">
            <CardContent className="p-6">
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                    <Stars className="h-4 w-4 text-white" />
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <h3 className="text-lg font-semibold text-foreground">AI Summary</h3>
                    <Badge variant="secondary" className="text-xs">
                      <Stars className="h-3 w-3 mr-1" />
                      AI Generated
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      {Math.round(searchResponse.results[0].confidence_score * 100)}% confidence
                    </Badge>
                  </div>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    {searchResponse.results[0].summary}
                  </p>
                  
                  {/* Key Points */}
                  {searchResponse.results[0].key_points.length > 0 && (
                    <div className="mt-4">
                      <h4 className="font-semibold mb-2">Key Points:</h4>
                      <ul className="space-y-2">
                        {searchResponse.results[0].key_points.map((point, index) => (
                          <li key={index} className="flex items-start space-x-2">
                            <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                            <span className="text-sm text-muted-foreground">{point}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  {/* Legal Areas */}
                  {searchResponse.results[0].legal_areas.length > 0 && (
                    <div className="mt-4">
                      <h4 className="font-semibold mb-2">Legal Areas:</h4>
                      <div className="flex flex-wrap gap-2">
                        {searchResponse.results[0].legal_areas.map((area, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {area}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Search Results */}
        {searchResponse && searchResponse.results.length > 0 && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Source Documents ({searchResponse.results[0].source_documents.length} found)</h2>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <BookOpen className="h-4 w-4" />
                <span>Sorted by relevance</span>
              </div>
            </div>

            <div className="grid gap-6">
              {searchResponse.results[0].source_documents.map((document, index) => (
                <Card key={index} className="shadow-sm hover:shadow-md transition-shadow duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="text-lg font-semibold text-primary">
                            {document.title}
                          </h3>
                          <Badge variant="outline" className="flex items-center space-x-1">
                            <Calendar className="h-3 w-3" />
                            <span>{document.case_number || "N/A"}</span>
                          </Badge>
                          <Badge variant="secondary" className="text-xs">
                            {Math.round(document.relevance_score * 100)}% relevance
                          </Badge>
                        </div>
                        <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-3">
                          <span className="font-medium">Court Ruling</span>
                          <span>•</span>
                          <span>{document.validation_status}</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button variant="outline" size="sm" asChild>
                          {/* <Link> */}
                            <FileText className="h-4 w-4 mr-1" />
                            Details
                          {/* </Link> */}
                        </Button>
                        <Button variant="ghost" size="sm" asChild>
                          <a href={document.source} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="h-4 w-4" />
                          </a>
                        </Button>
                      </div>
                    </div>

                    <p className="text-muted-foreground mb-4 leading-relaxed">
                      {document.excerpt}
                    </p>

                    {/* Legal Areas */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {document.legal_areas.map((area, areaIndex) => (
                        <Badge key={areaIndex} variant="outline" className="text-xs">
                          {area}
                        </Badge>
                      ))}
                      <Badge variant="outline" className="text-xs">
                        {document.validation_status}
                      </Badge>
                    </div>

                    <div className="text-xs text-muted-foreground">
                      <div className="flex items-center justify-between">
                        <span>Relevance: {Math.round(document.relevance_score * 100)}%</span>
                        <span>Status: {document.validation_status}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            {/* Metrics */}
            {searchResponse.metrics && (
              <Card className="mt-6">
                <CardContent className="p-4">
                  <h4 className="font-semibold mb-2">Search Metrics</h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Query Time:</span>
                      <div className="font-medium">{searchResponse.metrics.query_time.toFixed(2)}s</div>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Documents Retrieved:</span>
                      <div className="font-medium">{searchResponse.metrics.documents_retrieved}</div>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Total Results:</span>
                      <div className="font-medium">{searchResponse.total_results}</div>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Cache Hit:</span>
                      <div className="font-medium">{searchResponse.metrics.cache_hit ? "Yes" : "No"}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        )}

        {/* {!searchResponse && searchQuery && !isSearching && (
          <Card className="text-center py-12">
            <CardContent>
              <FileText className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">No results found</h3>
              <p className="text-muted-foreground">Refine your question or try different keywords</p>
            </CardContent>
          </Card>
        )} */}

        {/* {!searchQuery && !searchResponse && (
          <Card className="text-center py-12">
            <CardContent>
              <SearchIcon className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">Search Court Rulings</h3>
              <p className="text-muted-foreground">Enter a legal question above to find relevant rulings and precedents</p>
            </CardContent>
          </Card>
        )} */}
      </div>

      <ChatWidget />
    </div>
  );
};

export default Search;