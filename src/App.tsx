
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import Offer from "./pages/Offer";
import NotFound from "./pages/NotFound";
import Blog from "./pages/Blog";
import Article from "./pages/Article";
import Cabinet from "./pages/Cabinet";
import Login from "./pages/Login";
import VkCallback from "./pages/VkCallback";
import PartnerHelp from "./pages/PartnerHelp";
import IntellektualnaySobstvennost from "./pages/IntellektualnaySobstvennost";
import CookieBanner from "./components/CookieBanner";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <CookieBanner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/offer" element={<Offer />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<Article />} />
          <Route path="/cabinet" element={<Cabinet />} />
          <Route path="/login" element={<Login />} />
          <Route path="/auth/vk/callback" element={<VkCallback />} />
          <Route path="/partner-help" element={<PartnerHelp />} />
          <Route path="/intellektualnaya-sobstvennost" element={<IntellektualnaySobstvennost />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;