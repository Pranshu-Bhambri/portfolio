"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useSidebar } from "../context/SidebarContext";
import ThemeToggler from "./ThemeToggler";
import Header from "./Header";
import LogoLink from "./LogoLink";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { motion } from "framer-motion";
// import CloseIcon from "@mui/icons-material/ArrowBackIos";
import styles from "../css/Layout.module.css";


const Sidebar = () => {
  const { sidebarOpen, toggleSidebar } = useSidebar(); // Use Global Sidebar State

  const [isFixed, setIsFixed] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  const navItems = [
    { label: "Home", href: "#home" },
    { label: "About", href: "#about" },
    { label: "Skills", href: "#skills" },
    { label: "Projects", href: "#projects" },
    { label: "Work Experience", href: "#experience" },
    { label: "Education", href: "#education" },
    { label: "Contact", href: "#contact" },
  ];

  useEffect(() => {
    const handleResize = () => {
      // Check if the sidebar is open and the screen width is medium or lesser
      if (sidebarOpen && window.innerWidth < 768) {
        // Disable scrolling on the <html> or <body> element
        document.body.style.overflow = 'hidden';
      } else {
        // Enable scrolling again
        document.body.style.overflow = 'auto';
      }
    };

    handleResize();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [sidebarOpen]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;

      // Check if user has scrolled past 105px
      // const shouldFixHeader = scrollY > 105 && scrollY < lastScrollY;
      const shouldFixHeader = scrollY > 105;

      setIsFixed(shouldFixHeader);
      // setLastScrollY(scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  // Define the logo link JSX structure that can be reused
  const logoLink = (classNames: string) => (
    // <Link href="/" className={`${styles.logo} ${classNames} font-agustina font-bold ${!sidebarOpen ? 'top-[300px] left-[300px]' : 'top-0 left-0'} transition-all duration-300`}>
    <Link
      href="/"
      className={`${
        styles.logo
      } font-agustina font-bold top-[30px] left-[30px] ${
        !sidebarOpen
          ? ""
          : classNames.includes("fixed")
          ? "opacity-0 pointer-events-none"
          : ""
      } transition-opacity duration-300`}
    >
      {/* <Link href="/" className={`${styles.logo} ${classNames} font-agustina font-bold ${!sidebarOpen ? 'absolute top-[30px] left-[30px]' : ''} transition-all duration-300`}> */}
      <span className={`${styles.logoTag} ${styles.logoTagOpen}`}>{`<`}</span>
      <span className={`text-[26px] p-2`}>Pranshu Bhambri</span>
      <span className={`${styles.logoTag} ${styles.logoTagClose}`}>{`/>`}</span>
    </Link>
  );

  return (
    <>
      {/* <header className={`fixed top-0 left-0 w-screen h-[100px] ${sidebarOpen ? 'bg-transparent' : 'bg-[var(--background)] opacity-60 backdrop-blur-[12px]'} flex justify-between items-center z-[100]`}> */}

      {/* <Header /> */}

      {/* <aside
        className={`fixed flex-shrink-0 w-[20vw] ${sidebarOpen ? `${styles.sidebar} left-[0]` : "-left-[20vw]"} h-full top-0 p-4 z-[100] transition-all duration-300`}
      > */}

      {/* <aside id="sidebar"
        className={`fixed w-full md:w-auto bg-gradient-to-b from-transparent to-gray-200 dark:to-gray-900 md:bg-none flex-shrink-0 ${sidebarOpen ? `${styles.sidebar} left-0` : "transform -translate-x-full"} h-full top-0 p-4 z-[200] transition-all duration-300`}
      > */}
      <aside id="sidebar"
        className={`fixed w-full md:w-auto bg-gradient-to-b from-[#eceef0] to-[#d1d5db] dark:from-[#0d1118] dark:to-[#161b22] md:bg-none flex-shrink-0 ${sidebarOpen ? `${styles.sidebar} left-0` : "transform -translate-x-full"} h-full top-0 p-4 z-[200] transition-all duration-300`}
      >

        {/* <aside className={`h-screen bg-black-200 p-4 transition-all ${sidebarOpen ? "w-[20vw]" : "w-0"} overflow-hidden`}> */}

        <div className="relative flex items-center justify-between gap-4">
          <ThemeToggler type="sidebar" />

          <button
            className={`${
              sidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"
            } top-[30px] right-[30px] scale-[1.5] text-black dark:text-white rounded-md transition-opacity duration-300 z-[100]`}
            onClick={toggleSidebar}
          >
            <CloseIcon />
          </button>
        </div>

        <nav className="h-full flex flex-col justify-center items-center text-xl">
          {/* <Link href="/" className={`${styles.logo} font-agustina font-bold`}>
            <span
              className={`${styles.logoTag} ${styles.logoTagOpen}`}
            >{`<`}</span>
            <span className={`text-[26px] p-2`}>Pranshu Bhambri</span>
            <span
              className={`${styles.logoTag} ${styles.logoTagClose}`}
            >{`/>`}</span>
          </Link> */}

          {/* {logoLink('')} */}
          <LogoLink place="sidebar"/>

          <ul className={`${styles.sidebarTabs} text-center`}>
            {navItems.map((item) => (
              <li key={item.href}>
                {/* <a href={item.href} className="xl:text-lg" onClick={toggleSidebar}>
                  {item.label}
                </a> */}
                <a href={item.href} className="text-lg sm:text-xl md:text-lg lg:text-xl" onClick={toggleSidebar}>
                  {item.label}
                </a>
              </li>
            ))}
            {/* <li>
              <a href="#home">Home</a>
            </li>
            <li>
              <a href="#about">About</a>
            </li>
            <li>
              <a href="#skills">Skills</a>
            </li>
            <li>
              <a href="#projects">Projects</a>
            </li>
            <li>
              <a href="#experience">Work Experience</a>
            </li>
            <li>
              <a href="#education">Education</a>
            </li>
            <li>
              <a href="#contact">Contact</a>
            </li> */}
          </ul>
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
