"use client";
import { createContext, useContext, useState } from "react";

interface OnboardingContextProps {
  roles: string[];
  toggleRole: (role: string) => void;
  reset: () => void;
}

const OnboardingContext = createContext<OnboardingContextProps | null>(null);

export function OnboardingProvider({ children }: { children: React.ReactNode }) {
  const [roles, setRoles] = useState<string[]>([]);

  const toggleRole = (role: string) => {
    setRoles((prev) =>
      prev.includes(role) ? prev.filter((r) => r !== role) : [...prev, role]
    );
  };

  const reset = () => setRoles([]);

  return (
    <OnboardingContext.Provider value={{ roles, toggleRole, reset }}>
      {children}
    </OnboardingContext.Provider>
  );
}

export const useOnboarding = () => {
  const ctx = useContext(OnboardingContext);
  if (!ctx) throw new Error("useOnboarding must be inside provider");
  return ctx;
};
