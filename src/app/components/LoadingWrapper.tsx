"use client";
import { useState, useEffect } from "react";
import LoadingScreen from "../../app/loading";

const LoadingWrapper = ({ children }: { children: React.ReactNode }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Generate a random delay between 1s (1000ms) and 2.5s (2500ms)
    const randomDelay = Math.floor(Math.random() * (2000 - 1000 + 1)) + 1000;

    const timeout = setTimeout(() => setIsLoading(false), randomDelay);
    return () => clearTimeout(timeout);
  }, []);

  return isLoading ? <LoadingScreen /> : <>{children}</>;
};

export default LoadingWrapper;
