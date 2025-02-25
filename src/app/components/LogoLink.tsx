"use client"

import { useState, useEffect } from "react";
import Link from "next/link";
import { useSidebar } from "../context/SidebarContext";
import { useMain } from "../context/MainContext";
import styles from "../css/Layout.module.css";

const LogoLink = (props: any) => {
  const { sidebarOpen, toggleSidebar } = useSidebar(); // Use Global Sidebar State
  const [isXsWidth, setIsXsWidth] = useState(false);

  useEffect(() => {
      const handleResize = () => {
        setIsXsWidth(window.innerWidth < 300);
      };
  
      handleResize(); // Check initially
      window.addEventListener("resize", handleResize); // Listen for window resize events
      
      return () => {
        window.removeEventListener("resize", handleResize); // Cleanup on unmount
      };
    }, []);

  return props.place !== "loading" ? (
    ((props.place === "header" && !isXsWidth) || (props.place === "sidebar")) && <Link
      href="/"
      className={`${styles.logo} relative top-[5px] font-agustina font-bold ${
        !sidebarOpen
          ? ""
          : props.place === "header"
          ? "opacity-0 pointer-events-none"
          : ""
      } transition-opacity duration-300`}
    >
      {/* <Link href="/" className={`${styles.logo} ${classNames} font-agustina font-bold ${!sidebarOpen ? 'absolute top-[30px] left-[30px]' : ''} transition-all duration-300`}> */}

      {/* <span className={`${styles.logoTag} ${styles.logoTagOpen}`}>{`<`}</span>
      <span className="text-[26px] p-2">Pranshu Bhambri</span>
      <span className={`${styles.logoTag} ${styles.logoTagClose}`}>{`/>`}</span> */}

      <span
        className={`${styles.logoTag} ${styles.logoTagOpen} ${
          props.place === "sidebar"
            ? "text-lg sm:text-xl md:text-lg lg:text-xl"
            : "text-lg sm:text-xl"
        }`}
      >{`<`}</span>
      <span
        className={`${
          props.place === "sidebar"
            ? "text-[22px] sm:text-[26px] md:text-2xl lg:text-[26px]"
            : "text-[20px] sm:text-[26px]"
        } p-2`}
      >
        Pranshu Bhambri
      </span>
      <span
        className={`${styles.logoTag} ${styles.logoTagClose} ${
          props.place === "sidebar"
            ? "text-lg sm:text-xl md:text-lg lg:text-xl"
            : "text-lg sm:text-xl"
        }`}
      >{`/>`}</span>

      {/* <span className={`${styles.logoTag} ${styles.logoTagOpen} ${props.place === 'sidebar' ? 'xl:text-lg' : ''}`}>{`<`}</span>
      <span className={`${props.place === 'sidebar' ? '2xl:text-[26px] xl:text-[24px]' : 'text-[26px]'} p-2`}>Pranshu Bhambri</span>
      <span className={`${styles.logoTag} ${styles.logoTagClose} ${props.place === 'sidebar' ? 'xl:text-lg' : ''}`}>{`/>`}</span> */}
    </Link>
  ) : (
    <span
      className={`${styles.logo} relative top-[5px] font-agustina font-bold ${
        !sidebarOpen
          ? ""
          : props.place === "header"
          ? "opacity-0 pointer-events-none"
          : ""
      } cursor-default transition-opacity duration-300`}
    >
      <span
        className={`${styles.logoTag} ${styles.logoTagOpen} text-xl sm:text-2xl md:text-3xl`}
      >{`<`}</span>
      <span
        className={`text-xl sm:text-2xl md:text-3xl p-2`}
      >
        Pranshu Bhambri
      </span>
      <span
        className={`${styles.logoTag} ${styles.logoTagClose} text-xl sm:text-2xl md:text-3xl`}
      >{`/>`}</span>
    </span>
  );
};

export default LogoLink;
