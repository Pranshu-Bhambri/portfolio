"use client";
import { createContext, useContext, useState, ReactNode } from "react";

// Define the shape of the context
interface HeaderContextType {
  shouldFixHeader: boolean;
  setShouldFixHeader: (value: boolean) => void;
}

// Create Context with TypeScript types
const HeaderContext = createContext<HeaderContextType | null>(null);

// Header Provider
export const HeaderProvider = ({ children }: { children: ReactNode }) => {
  const [shouldFixHeader, setShouldFixHeader] = useState(false);

  return (
    <HeaderContext.Provider value={{ shouldFixHeader, setShouldFixHeader }}>
      {children}
    </HeaderContext.Provider>
  );
};

// Custom Hook to Use Header Context
export const useHeader = () => {
  const context = useContext(HeaderContext);
  if (!context) throw new Error("useHeader must be used within HeaderProvider");
  return context;
};
