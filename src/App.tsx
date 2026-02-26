import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { PortalProvider } from "@/contexts/PortalContext";
import Dashboard from "./pages/Dashboard";
import Campaigns from "./pages/Campaigns";
import Contacts from "./pages/Contacts";
import SenderIds from "./pages/SenderIds";
import Shortcodes from "./pages/Shortcodes";
import PremiumSms from "./pages/PremiumSms";
import Reports from "./pages/Reports";
import AdminPortal from "./pages/AdminPortal";
import AdminTenants from "./pages/AdminTenants";
import AdminUsers from "./pages/AdminUsers";
import AdminAudit from "./pages/AdminAudit";
import AdminSettings from "./pages/AdminSettings";
import SettingsPage from "./pages/Settings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <PortalProvider>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/campaigns" element={<Campaigns />} />
            <Route path="/contacts" element={<Contacts />} />
            <Route path="/sender-ids" element={<SenderIds />} />
            <Route path="/shortcodes" element={<Shortcodes />} />
            <Route path="/premium-sms" element={<PremiumSms />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/admin" element={<AdminPortal />} />
            <Route path="/admin/tenants" element={<AdminTenants />} />
            <Route path="/admin/users" element={<AdminUsers />} />
            <Route path="/admin/audit" element={<AdminAudit />} />
            <Route path="/admin/settings" element={<AdminSettings />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </PortalProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
