import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Scale, Mic, Search, Menu } from "lucide-react";
import { useState } from "react";

const Navigation = () => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-card border-b border-border shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <Scale className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold text-primary">LexiScribe</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className={`text-sm font-medium transition-colors hover:text-primary ${
                isActive("/") ? "text-primary" : "text-muted-foreground"
              }`}
            >
              Home
            </Link>
            <Link
              to="/recorder"
              className={`flex items-center space-x-1 text-sm font-medium transition-colors hover:text-primary ${
                isActive("/recorder") ? "text-primary" : "text-muted-foreground"
              }`}
            >
              <Mic className="h-4 w-4" />
              <span>Recorder</span>
            </Link>
            <Link
              to="/search"
              className={`flex items-center space-x-1 text-sm font-medium transition-colors hover:text-primary ${
                isActive("/search") ? "text-primary" : "text-muted-foreground"
              }`}
            >
              <Search className="h-4 w-4" />
              <span>Search</span>
            </Link>
            <Button variant="hero" size="sm">
              Get Started
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-border pt-4 pb-4">
            <div className="flex flex-col space-y-4">
              <Link
                to="/"
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  isActive("/") ? "text-primary" : "text-muted-foreground"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/recorder"
                className={`flex items-center space-x-1 text-sm font-medium transition-colors hover:text-primary ${
                  isActive("/recorder") ? "text-primary" : "text-muted-foreground"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                <Mic className="h-4 w-4" />
                <span>Recorder</span>
              </Link>
              <Link
                to="/search"
                className={`flex items-center space-x-1 text-sm font-medium transition-colors hover:text-primary ${
                  isActive("/search") ? "text-primary" : "text-muted-foreground"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                <Search className="h-4 w-4" />
                <span>Search</span>
              </Link>
              <Button variant="hero" size="sm" className="w-full">
                Get Started
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;