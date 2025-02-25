// 'use client';
// import { createContext, useState, useContext, ReactNode } from 'react';

// // Define the shape of the context
// interface SidebarContextType {
//   sidebarOpen: boolean;
//   toggleSidebar: () => void;
// }

// // Create Context
// const SidebarContext = createContext<SidebarContextType | null>(null);

// // Sidebar Provider
// export const SidebarProvider = ({ children }: { children: ReactNode }) => {
//   const [sidebarOpen, setSidebarOpen] = useState(false);

//   const toggleSidebar = () => setSidebarOpen((prev) => !prev);

//   return (
//     <SidebarContext.Provider value={{ sidebarOpen, toggleSidebar }}>
//       {children}
//     </SidebarContext.Provider>
//   );
// };

// // Custom Hook to Use Sidebar Context
// export const useSidebar = () => {
//   const context = useContext(SidebarContext);
//   if (!context) throw new Error("useSidebar must be used within SidebarProvider");
//   return context;
// };


"use client";
import { createContext, useState, useContext, useEffect, ReactNode } from "react";

// Define the shape of the context
interface SidebarContextType {
  sidebarOpen: boolean;
  toggleSidebar: () => void;
  sidebarWidth: number; // Track sidebar width
}

// Create Context
const SidebarContext = createContext<SidebarContextType | null>(null);

// Sidebar Provider
export const SidebarProvider = ({ children }: { children: ReactNode }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarWidth, setSidebarWidth] = useState(0);

  const toggleSidebar = () => setSidebarOpen((prev) => !prev);

  useEffect(() => {
    const updateWidth = () => {
      const sidebar = document.getElementById("sidebar");
      if (sidebar) {
        setSidebarWidth(sidebar.offsetWidth);
      }
    };

    updateWidth(); // Get initial width
    window.addEventListener("resize", updateWidth); // Update on resize

    return () => window.removeEventListener("resize", updateWidth);
  }, [sidebarOpen]); // Recalculate when sidebar opens/closes

  return (
    <SidebarContext.Provider value={{ sidebarOpen, toggleSidebar, sidebarWidth }}>
      {children}
    </SidebarContext.Provider>
  );
};

// Custom Hook to Use Sidebar Context
export const useSidebar = () => {
  const context = useContext(SidebarContext);
  if (!context) throw new Error("useSidebar must be used within SidebarProvider");
  return context;
};
