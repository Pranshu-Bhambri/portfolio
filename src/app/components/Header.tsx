// import { useState, useEffect } from "react"
// import { useSidebar } from "../context/SidebarContext";
// import LogoLink from "./LogoLink";
// import MenuIcon from "@mui/icons-material/Menu"; 

// const Header = () => {
//     const { sidebarOpen, toggleSidebar } = useSidebar(); // Use Global Sidebar State
//       // const [isFixed, setIsFixed] = useState(false);
//       // const [lastScrollY, setLastScrollY] = useState(0);
    
//       // useEffect(() => {
//       //   const handleScroll = () => {
//       //     const scrollY = window.scrollY;
    
//       //     // Check if user has scrolled past 105px
//       //     // const shouldFixHeader = scrollY > 105 && scrollY < lastScrollY; 
//       //     const shouldFixHeader = scrollY > 105; 
    
//       //     setIsFixed(shouldFixHeader);
//       //     // setLastScrollY(scrollY);
//       //   };
    
//       //   window.addEventListener("scroll", handleScroll);
//       //   return () => window.removeEventListener("scroll", handleScroll);
//       // }, [lastScrollY]);

//   return (
//     <header className={`fixed top-0 left-0 w-full px-6 md:px-16 py-[12px] flex justify-between items-center z-[100]`}>
//         {/* Background Layer for Blur & Transparency */}
//         {/* <div className={`absolute inset-0 ${sidebarOpen ? 'bg-transparent' : (isFixed ? 'bg-[#00000075] backdrop-blur-[5px]' : '')} -z-10`} /> */}
//         <div className={`absolute inset-0 ${sidebarOpen ? 'bg-transparent' : 'bg-[#0f121400] dark:bg-[#0f121440] backdrop-blur-[6px]'} -z-10`} />

//         <div className="flex justify-between items-center w-full h-full">
//           <LogoLink place="header" />

//           <button
//             className={`${sidebarOpen ? "opacity-0 pointer-events-none" : "opacity-100"} scale-[1.5] text-black dark:text-white rounded-md transition-opacity duration-300`}
//             onClick={toggleSidebar}
//           >
//             <MenuIcon />
//           </button>

//           {/* <button
//             className={`${sidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"} fixed top-[30px] left-[30px] scale-[1.5] text-white rounded-md transition-opacity duration-300`}
//             onClick={toggleSidebar}
//           >
//             <CloseIcon />
//           </button> */}
//         </div>
//       </header>
//   )
// }

// export default Header

"use client"

import { useState, useEffect } from "react";
import { useSidebar } from "../context/SidebarContext";
import { useMain } from "../context/MainContext";
import { useTheme } from "../context/ThemeContext";
import ThemeToggler from "./ThemeToggler";
import LogoLink from "./LogoLink";
import MenuIcon from "@mui/icons-material/Menu";
import { motion } from "framer-motion";

const Header = () => {
  const { isMediumWidth } = useMain();
  const { sidebarOpen, toggleSidebar } = useSidebar(); // Sidebar Context
  const { theme, toggleTheme } = useTheme();

  // const [theme, setTheme] = useState<"light" | "dark">(() => {
  //   if (typeof window !== "undefined") {
  //     const storedTheme = localStorage.getItem("theme") as "light" | "dark";
  //     if (storedTheme) return storedTheme;
  //     return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  //   }
  //   return "light";
  // });

  // Function to update CSS variables
  // const updateThemeVariables = (newTheme: "light" | "dark") => {
  //   const root = document.documentElement;
  //   if (newTheme === "dark") {
  //     root.style.setProperty("--background", "#0a0a0a");
  //     root.style.setProperty("--foreground", "#ededed");
  //   } else {
  //     root.style.setProperty("--background", "#ffffff");
  //     root.style.setProperty("--foreground", "#171717");
  //   }
  // };

  // Apply theme & update CSS variables
  // useEffect(() => {
  //   if (theme === "dark") {
  //     document.documentElement.classList.add("dark");
  //   } else {
  //     document.documentElement.classList.remove("dark");
  //   }

  //   // updateThemeVariables(theme);
  //   localStorage.setItem("theme", theme);
  // }, [theme]);

  // // Toggle Theme Function
  // const toggleTheme = () => {
  //   setTheme((prev) => (prev === "light" ? "dark" : "light"));
  // };

  return (
    <header className={`fixed top-0 left-0 w-full ${isMediumWidth ? 'px-16' : 'px-6'} py-[12px] flex justify-between items-center z-[100] ${!sidebarOpen ? 'border-b border-gray-950/5 dark:border-white/10' : ''}`}>
      <div className={`absolute inset-0 ${sidebarOpen ? "bg-transparent" : "bg-[#0f121400] dark:bg-[#0f121440] backdrop-blur-[6px]"} -z-10`} />

      <div className="flex justify-between items-center w-full h-full">
        <LogoLink place="header" />

        <div className="flex items-center gap-4">
          {/* Dark Mode Toggle */}
          <ThemeToggler type="header"/>

          {/* Sidebar Toggle Button */}
          <button
            className={`${sidebarOpen ? "opacity-0 pointer-events-none" : "opacity-100"} scale-[1.5] text-black dark:text-white rounded-md transition-opacity duration-300`}
            onClick={toggleSidebar}
          >
            <MenuIcon />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
