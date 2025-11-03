import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { BooksProvider } from "@/contexts/BooksContext";
import { AuthProvider } from "@/contexts/AuthContext";
import { Header } from "./components/Header";
import Index from "./pages/Index";
import { Forum } from "./pages/Forum";
import { Admin } from "./pages/Admin";
import { Auth } from "./pages/Auth";
import { MyBooks } from "./pages/MyBooks";
import { Settings } from "./pages/Settings";
import EventDetail from "./pages/EventDetail";
import AlmanacCategory from "./pages/AlmanacCategory";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <BooksProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <div className="min-h-screen bg-background">
              <Header />
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/forum" element={<Forum />} />
                <Route path="/admin" element={<Admin />} />
                <Route path="/auth" element={<Auth />} />
                <Route path="/my-books" element={<MyBooks />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/chronology/:eventId" element={<EventDetail />} />
                <Route path="/almanac/:categoryId" element={<AlmanacCategory />} />
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </div>
          </BrowserRouter>
        </BooksProvider>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
