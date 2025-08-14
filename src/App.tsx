import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NotFound from "./pages/NotFound.tsx";
import { AuthProvider } from "./contexts/AuthContext";
import Login from "./pages/Login.tsx";
import Dashboard from "./pages/Dashboard.tsx";
import ProtectedRoute from "./components/auth/ProtectedRoute.tsx";
import EquipmentPage from "./pages/Equipment.tsx";
import AddLogPage from "./pages/AddLog.tsx";
import LogsPage from "./pages/Logs.tsx";
import Layout from "./components/Layout.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route element={<ProtectedRoute />}>
              <Route element={<Layout />}>
                <Route path="/" element={<Dashboard />} />
                <Route path="/equipment" element={<EquipmentPage />} />
                <Route path="/add-log" element={<AddLogPage />} />
                <Route path="/logs" element={<LogsPage />} />
              </Route>
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;