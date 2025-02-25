"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import styles from "../css/Projects.module.css";
import amazonCloneImage from "../../../public/images/projects/amazon_clone.png";
import crimeHotspotsDetectionImage from "../../../public/images/projects/crime_hotspots_detection.png";
import basicBankingSystemImage from "../../../public/images/projects/basic_banking_system.png";
import { useSidebar } from "../context/SidebarContext";
import { useMain } from "../context/MainContext";

const projects = [
  {
    id: 1,
    title: "Crime Data Analysis & Hotspot Detection",
    description:
      "Automated crime data extraction using Selenium, OCR, Regex, and Pandas, combined with DBSCAN clustering to identify high-crime zones and trends.",
    image: crimeHotspotsDetectionImage,
    technologies: ["Python", "Selenium", "OCR", "Regex", "Pandas", "DBSCAN"],
    buttonText: "View on GitHub",
    href: "https://github.com/Pranshu-Bhambri/Crime-Data-Analysis-Hotspot-Detection",
  },
  {
    id: 2,
    title: "The Amazon Clone",
    description:
      "A fully functional e-commerce platform with an end-to-end implementation, including user authentication, cart management, checkout, and order management.",
    image: amazonCloneImage,
    technologies: [
      "React.js",
      "Redux",
      "Node.js",
      "Express.js",
      "MongoDB",
      "JWT",
      "Redis",
    ],
    buttonText: "View Live Project",
    href: "https://the-amazon-clone-by-pb.vercel.app/",
  },
  {
    id: 3,
    title: "Basic Banking System",
    description:
      "An interactive banking platform allowing users to transfer money, check balances, and track transactions.",
    image: basicBankingSystemImage,
    technologies: ["JavaScript", "EJS", "Node.js", "Express.js", "MongoDB"],
    buttonText: "View on GitHub",
    href: "https://github.com/Pranshu-Bhambri/Banking-System",
  },
];

const Projects = () => {
  const { sidebarOpen } = useSidebar();
  const {
    contentWidth,
    contentHeight,
    isSmallWidth,
    isMediumWidth,
    isLargeWidth,
  } = useMain();

  const projectsRef = useRef<HTMLDivElement | null>(null);
  const [inViewAmount, setInViewAmount] = useState(0.5);
  const [isTallEnough, setIsTallEnough] = useState(false);

  const isProjectsInView = useInView(projectsRef, {
    amount: inViewAmount,
    once: true,
  });

  useEffect(() => {
    const handleResize = () => {
      if (projectsRef.current) {
        const height = projectsRef.current.offsetHeight;
        setIsTallEnough(height > window.innerHeight * 0.8); // Check if height is greater than 80vh
      }
    };

    handleResize(); // Check initially
    window.addEventListener("resize", handleResize); // Listen for window resize events

    return () => {
      window.removeEventListener("resize", handleResize); // Cleanup on unmount
    };
  }, []);

  // Dynamically adjust amount based on screen height
  useEffect(() => {
    const updateAmount = () => {
      const screenWidth = window.innerWidth;

      if (sidebarOpen) {
        setInViewAmount(
          contentWidth < 640 ? 0.125 : contentWidth < 1024 ? 0.25 : 0.5
        );

        // contentWidth instead of screenWidth
        // if (screenWidth < 640) {
        //   setInViewAmount(0.2);
        // } else if (screenWidth < 1024) {
        //   setInViewAmount(0.3);
        // } else {
        //   setInViewAmount(0.5);
        // }
      } else {
        setInViewAmount(
          screenWidth < 640 ? 0.2 : contentWidth < 1024 ? 0.3 : 0.5
        );
      }
    };

    updateAmount(); // Set amount on load
    window.addEventListener("resize", updateAmount);

    return () => window.removeEventListener("resize", updateAmount);
  }, [contentWidth]);

  return (
    <section
      ref={projectsRef}
      id="projects"
      // className={`flex flex-col justify-center items-center min-h-screen px-6 ${(contentWidth < 1024 || contentHeight < 575) ? 'pt-[120px]' : ''} ${(isTallEnough && contentWidth >= 1024 && contentHeight >= 575) ? 'pb-[120px]' : ''} ${isMediumWidth ? 'px-16' : ''}`}

      className={`flex flex-col justify-center items-center pt-[120px] ${
        isMediumWidth ? "px-16" : "px-6"
      }`}

      // className={`flex flex-col justify-center items-center px-6 ${(contentWidth < 1024 || contentHeight < 575) ? 'pt-[120px]' : ''} ${(isTallEnough && contentWidth >= 1024 && contentHeight >= 575) ? 'pb-[120px]' : ''} ${isMediumWidth ? 'px-16' : ''}`}
    >
      {/* Animated Heading */}
      <motion.h2
        className="text-4xl font-bold text-center"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={
          isProjectsInView
            ? { opacity: 1, scale: 1 }
            : { opacity: 0, scale: 0.5 }
        }
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <motion.span
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: 1, ease: "easeInOut" }}
          className="inline-block overflow-hidden"
        >
          Projects
        </motion.span>
      </motion.h2>

      {/* Project Cards */}
      {/* <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12 w-full max-w-6xl"> */}
      <div
        className={`grid ${
          isLargeWidth
            ? "grid-cols-3"
            : isSmallWidth
            ? "grid-cols-2"
            : "grid-cols-1"
        } gap-6 mt-12 w-full max-w-6xl`}
      >
        {projects.map((project, index) => (
          <motion.div
            key={project.id}
            className={`${styles.projectCard} ${
              isSmallWidth ? "static" : projects.length > 1 ? "sticky" : ""
            } bg-white dark:bg-gray-800 rounded-md shadow-lg overflow-hidden transform transition-all duration-500 hover:shadow-2xl flex flex-col h-full select-none `}
            style={{
              top: `${100 + index * 40}px`,
            }}
            initial={{ opacity: 0, y: 50 }}
            animate={isProjectsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: index * 0.3 }}
          >
            <Image
              src={project.image}
              alt={project.title}
              width={400}
              height={250}
              className="w-full h-56 object-cover"
              draggable="false"
            />
            <div className="p-6 flex flex-col flex-grow">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                {project.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mt-2 flex-grow">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-2 mt-3">
                {project.technologies.map((tech, i) => (
                  <span
                    key={i}
                    className="bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white text-xs font-medium px-3 py-1 rounded-full"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <div className="mt-auto">
                <a
                  href={project.href}
                  className="inline-block"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <button
                    className={`${styles.visitBtn} mt-4 flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md font-medium text-sm hover:bg-blue-700 transition relative overflow-hidden`}
                  >
                    {project.buttonText}
                    <span className={`${styles.arrowIcon} inline-block`}>
                      <ArrowForwardIcon />
                    </span>
                  </button>
                </a>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Projects;
