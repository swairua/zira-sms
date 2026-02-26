import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

type PortalMode = "tenant" | "admin";

interface PortalContextType {
  portalMode: PortalMode;
  setPortalMode: (mode: PortalMode) => void;
  switchPortal: (mode: PortalMode) => void;
}

const PortalContext = createContext<PortalContextType | undefined>(undefined);

export function PortalProvider({ children }: { children: React.ReactNode }) {
  const [portalMode, setPortalModeState] = useState<PortalMode>(() => {
    const stored = localStorage.getItem("portalMode");
    return (stored === "admin" ? "admin" : "tenant") as PortalMode;
  });

  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem("portalMode", portalMode);
  }, [portalMode]);

  const setPortalMode = (mode: PortalMode) => {
    setPortalModeState(mode);
  };

  const switchPortal = (mode: PortalMode) => {
    setPortalModeState(mode);
    navigate(mode === "admin" ? "/admin" : "/");
  };

  return (
    <PortalContext.Provider value={{ portalMode, setPortalMode, switchPortal }}>
      {children}
    </PortalContext.Provider>
  );
}

export function usePortal() {
  const context = useContext(PortalContext);
  if (!context) throw new Error("usePortal must be used within PortalProvider");
  return context;
}
