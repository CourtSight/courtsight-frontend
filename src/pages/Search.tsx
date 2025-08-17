import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import Navigation from "@/components/Navigation";
import ChatWidget from "@/components/ChatWidget";
import { Search as SearchIcon, Filter, Calendar, FileText, ExternalLink, BookOpen } from "lucide-react";

const Search = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  // Mock search results
  const mockResults = [
    {
      id: 1,
      title: "Brown v. Board of Education",
      year: "1954",
      court: "Supreme Court",
      citation: "347 U.S. 483",
      summary: "Landmark civil rights case that declared state laws establishing separate public schools for black and white students to be unconstitutional.",
      relevance: 95,
      keyTopics: ["Civil Rights", "Education", "Equal Protection", "Constitutional Law"]
    },
    {
      id: 2,
      title: "Miranda v. Arizona", 
      year: "1966",
      court: "Supreme Court",
      citation: "384 U.S. 436",
      summary: "Established that suspects must be informed of their rights before interrogation, including the right to remain silent and right to an attorney.",
      relevance: 88,
      keyTopics: ["Criminal Law", "Constitutional Rights", "Police Procedure", "Fifth Amendment"]
    },
    {
      id: 3,
      title: "Roe v. Wade",
      year: "1973", 
      court: "Supreme Court",
      citation: "410 U.S. 113",
      summary: "Established a constitutional right to abortion in the first trimester of pregnancy under the Due Process Clause of the Fourteenth Amendment.",
      relevance: 82,
      keyTopics: ["Privacy Rights", "Constitutional Law", "Due Process", "Reproductive Rights"]
    }
  ];

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    
    setIsSearching(true);
    // Simulate API call
    setTimeout(() => {
      setSearchResults(mockResults);
      setIsSearching(false);
    }, 1500);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-4">
            Supreme Court Document Search
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Search through Supreme Court decisions using AI-powered semantic search 
            to find relevant cases and legal precedents.
          </p>
        </div>

        {/* Search Interface */}
        <Card className="mb-8 shadow-md">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <SearchIcon className="h-5 w-5" />
              <span>Search Supreme Court Cases</span>
            </CardTitle>
            <CardDescription>
              Enter your legal query to find relevant cases and precedents
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex space-x-4">
              <div className="flex-1">
                <Input
                  placeholder="Enter your legal query (e.g., 'civil rights education discrimination')"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="text-base"
                />
              </div>
              <Button 
                onClick={handleSearch}
                disabled={isSearching || !searchQuery.trim()}
                variant="hero"
                size="lg"
              >
                {isSearching ? "Searching..." : "Search"}
              </Button>
              <Button variant="outline" size="lg">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Search Results */}
        {searchResults.length > 0 && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">
                Search Results ({searchResults.length} cases found)
              </h2>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <BookOpen className="h-4 w-4" />
                <span>Sorted by relevance</span>
              </div>
            </div>

            <div className="grid gap-6">
              {searchResults.map((result) => (
                <Card key={result.id} className="shadow-sm hover:shadow-md transition-shadow duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="text-lg font-semibold text-primary">
                            {result.title}
                          </h3>
                          <Badge variant="outline" className="flex items-center space-x-1">
                            <Calendar className="h-3 w-3" />
                            <span>{result.year}</span>
                          </Badge>
                        </div>
                        <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-3">
                          <span className="font-medium">{result.court}</span>
                          <span>•</span>
                          <span>{result.citation}</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant={result.relevance > 90 ? "default" : "secondary"}>
                          {result.relevance}% match
                        </Badge>
                        <Button variant="ghost" size="sm">
                          <ExternalLink className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    <p className="text-muted-foreground mb-4 leading-relaxed">
                      {result.summary}
                    </p>

                    <div className="flex flex-wrap gap-2">
                      {result.keyTopics.map((topic, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {topic}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {searchResults.length === 0 && searchQuery && !isSearching && (
          <Card className="text-center py-12">
            <CardContent>
              <FileText className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">No results found</h3>
              <p className="text-muted-foreground">
                Try refining your search query or using different keywords
              </p>
            </CardContent>
          </Card>
        )}

        {!searchQuery && searchResults.length === 0 && (
          <Card className="text-center py-12">
            <CardContent>
              <SearchIcon className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">Search Supreme Court Cases</h3>
              <p className="text-muted-foreground">
                Enter a legal query above to find relevant Supreme Court decisions and precedents
              </p>
            </CardContent>
          </Card>
        )}
      </div>

      <ChatWidget />
    </div>
  );
};

export default Search;