import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Home, ArrowLeft } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="flex items-center justify-center min-h-[calc(100vh-4rem)]">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="mb-8">
            <h1 className="text-8xl font-bold text-primary mb-4">404</h1>
            <h2 className="text-2xl font-semibold text-foreground mb-2">Halaman Tidak Ditemukan</h2>
            <p className="text-muted-foreground mb-8">
              Maaf, halaman yang Anda cari tidak ditemukan. Mungkin halaman tersebut telah dipindahkan atau tidak ada.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild>
              <Link to="/">
                <Home className="h-4 w-4 mr-2" />
                Kembali ke Beranda
              </Link>
            </Button>
            <Button variant="outline" onClick={() => window.history.back()}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Kembali
            </Button>
          </div>
          
          <div className="mt-8 text-sm text-muted-foreground">
            <p>URL yang dicoba: <code className="bg-muted px-2 py-1 rounded text-xs">{location.pathname}</code></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
