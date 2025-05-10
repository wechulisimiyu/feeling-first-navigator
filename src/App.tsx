
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import OnboardingPage from "./pages/OnboardingPage";
import MoodSelectionPage from "./pages/MoodSelectionPage";
import PHQ9Page from "./pages/PHQ9Page";
import GAD7Page from "./pages/GAD7Page";
import PSQPage from "./pages/PSQPage";
import ResultPage from "./pages/ResultPage";
import ProfessionalsPage from "./pages/ProfessionalsPage";
import SelfCarePage from "./pages/SelfCarePage";
import FirstAidPage from "./pages/FirstAidPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<OnboardingPage />} />
          <Route path="/mood" element={<MoodSelectionPage />} />
          <Route path="/phq9" element={<PHQ9Page />} />
          <Route path="/gad7" element={<GAD7Page />} />
          <Route path="/psq" element={<PSQPage />} />
          <Route path="/result" element={<ResultPage />} />
          <Route path="/professionals" element={<ProfessionalsPage />} />
          <Route path="/self-care" element={<SelfCarePage />} />
          <Route path="/first-aid" element={<FirstAidPage />} />
          <Route path="/index" element={<Navigate to="/" replace />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
