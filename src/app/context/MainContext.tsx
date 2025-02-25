"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { useSidebar } from "./SidebarContext";

interface MainContextType {
  contentWidth: number;
  contentHeight: number;
  isSmallWidth: boolean;
  isMediumWidth: boolean;
  isLargeWidth: boolean;
  isXlWidth: boolean;
}

const MainContext = createContext<MainContextType | null>(null);

export const MainProvider = ({ children }: { children: React.ReactNode }) => {
  const { sidebarOpen, sidebarWidth } = useSidebar();
  const [contentWidth, setContentWidth] = useState(0);
  const [contentHeight, setContentHeight] = useState(0);
  const [isSmallWidth, setIsSmallWidth] = useState(false);
  const [isMediumWidth, setIsMediumWidth] = useState(false);
  const [isLargeWidth, setIsLargeWidth] = useState(false);
  const [isXlWidth, setIsXlWidth] = useState(false);

  useEffect(() => {
    const updateWidth = () => {
      setContentWidth(window.innerWidth - sidebarWidth);
    };

    const checkHeight = () => {
        setContentHeight(window.innerHeight);
    };

    updateWidth(); // Get initial width
    checkHeight(); // Get initial height
    window.addEventListener("resize", updateWidth);
    window.addEventListener("resize", checkHeight);
    return () => window.removeEventListener("resize", updateWidth);
  }, [sidebarWidth]);

  useEffect(() => {

    const checkWidth = () => {
        if((sidebarOpen && contentWidth >= 1280) || (!sidebarOpen && window.innerWidth >= 1280)){
            setIsXlWidth(true);
            setIsLargeWidth(true);
            setIsMediumWidth(true);
            setIsSmallWidth(true);
        }
        else if((sidebarOpen && contentWidth >= 1024) || (!sidebarOpen && window.innerWidth >= 1024)){
            setIsLargeWidth(true);
            setIsMediumWidth(true);
            setIsSmallWidth(true);
            setIsXlWidth(false);
        }
        else if((sidebarOpen && contentWidth >= 768) || (!sidebarOpen && window.innerWidth >= 768)){
            setIsMediumWidth(true);
            setIsSmallWidth(true);
            setIsXlWidth(false);
            setIsLargeWidth(false);
        }
        else if((sidebarOpen && contentWidth >= 640) || (!sidebarOpen && window.innerWidth >= 640)){
            setIsSmallWidth(true);
            setIsXlWidth(false);
            setIsLargeWidth(false);
            setIsMediumWidth(false);
        }
        else{
            setIsSmallWidth(false);
            setIsMediumWidth(false);
            setIsLargeWidth(false);
            setIsXlWidth(false);
        }
    }

    checkWidth();   // call the function initially

    window.addEventListener('resize', checkWidth);

    return () => window.removeEventListener('resize', checkWidth); 
        
    // setIsSmallWidth((window.innerWidth < 640) || (sidebarOpen && contentWidth < 640));
    // setIsMediumWidth((window.innerWidth < 768) || (sidebarOpen && contentWidth < 768));
    // setIsLargeWidth((window.innerWidth < 1024) || (sidebarOpen && contentWidth < 1024));
    // setIsXlWidth((window.innerWidth < 1280) || (sidebarOpen && contentWidth < 1280));
  }, [sidebarOpen, contentWidth]);

  return (
    <MainContext.Provider value={{ contentWidth, contentHeight, isSmallWidth, isMediumWidth, isLargeWidth, isXlWidth }}>
      {children}
    </MainContext.Provider>
  );
};

export const useMain = () => {
  const context = useContext(MainContext);
  if (!context) throw new Error("useMain must be used within MainProvider");
  return context;
};
