import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Recorder from "./pages/Recorder";
import Search from "./pages/Search";
// import DocumentList from "./pages/document/DocumentList";
// import DocumentDetail from "./pages/document/DocumentDetail";
import NotFound from "./pages/NotFound";
import Chat from "./pages/Chat";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/recorder" element={<Recorder />} />
          <Route path="/search" element={<Search />} />
          <Route path="/chat" element={<Chat />} />
          {/* <Route path="/document" element={<DocumentList />} /> */}
          {/* <Route path="/document/:id" element={<DocumentDetail />} /> */}
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
