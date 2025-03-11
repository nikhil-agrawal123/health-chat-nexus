
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import PatientLogin from "./pages/PatientLogin";
import ProviderLogin from "./pages/ProviderLogin";
import PatientDashboard from "./pages/PatientDashboard";
import ProviderDashboard from "./pages/ProviderDashboard";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/patient-login" element={<PatientLogin />} />
          <Route path="/provider-login" element={<ProviderLogin />} />
          <Route path="/patient-dashboard" element={<PatientDashboard />} />
          <Route path="/provider-dashboard" element={<ProviderDashboard />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
