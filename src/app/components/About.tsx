"use client";

import { useState, useEffect, useRef } from "react";
import { useMain } from "../context/MainContext";
import { motion, useInView } from "framer-motion";
import styles from "../css/About.module.css";

const aboutPoints = [
  "Develop responsive, user-friendly interfaces that ensure a seamless web experience.",
  "Build scalable applications that adapt to evolving requirements and incorporate modern technologies.",
  "Work effectively both in team settings and independently to deliver quality solutions.",
  "Focus on building practical applications that are useful and effective.",
];

const About = () => {
  const { contentWidth, contentHeight, isMediumWidth } = useMain();

  const aboutRef = useRef<HTMLDivElement | null>(null);
  const [isTallEnough, setIsTallEnough] = useState(false);
  const [hasPaddingTop, setHasPaddingTop] = useState(false);

  const isAboutInView = useInView(aboutRef, { amount: 0.5, once: true });

  const contentVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.1, staggerChildren: 0.1 },
    },
  };

  const pointVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: { opacity: 1, x: 0 },
  };

  useEffect(() => {
    const handleResize = () => {
      if (aboutRef.current) {
        const height = aboutRef.current.offsetHeight;
        setIsTallEnough(height > window.innerHeight * 0.8); // Check if height is greater than 80vh
      }
    };

    handleResize(); // Check initially
    window.addEventListener("resize", handleResize); // Listen for window resize events

    return () => {
      window.removeEventListener("resize", handleResize); // Cleanup on unmount
    };
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (aboutRef.current) {
        const computedStyle = window.getComputedStyle(aboutRef.current);
        const paddingTop = parseFloat(computedStyle.paddingTop); // Get the padding-top value

        // Check if padding-top is greater than 0
        setHasPaddingTop(paddingTop > 0);
      }
    };

    handleResize(); // Check initially
    window.addEventListener("resize", handleResize); // Listen for window resize events

    return () => {
      window.removeEventListener("resize", handleResize); // Cleanup on unmount
    };
  }, []);

  return (
    <section
      ref={aboutRef}
      id="about"
      // className={`flex flex-col justify-center items-center min-h-screen px-6 ${(contentWidth < 1024 || contentHeight < 575) ? 'pt-[120px]' : ''} ${isMediumWidth ? 'px-16' : ''}`}
      className={`flex flex-col justify-center items-center pt-[120px] ${
        isMediumWidth ? "px-16" : "px-6"
      }`}

      // className={`flex flex-col justify-center items-center px-6 ${(contentWidth < 1024 || contentHeight < 575) ? 'pt-[120px]' : ''} ${(isTallEnough && contentWidth >= 1024 && contentHeight >= 575) ? 'pb-[120px]' : ''} ${isMediumWidth ? 'px-16' : ''}`}
    >
      {/* Heading with Stagger Effect */}
      <motion.h2
        className="text-4xl font-bold text-center"
        initial="hidden"
        animate={isAboutInView ? "visible" : "hidden"}
        variants={contentVariants}
      >
        {/* {Array.from("Unveiling the Journey").map((char, index) => (
          <motion.span
            key={index}
            className="inline-block"
            variants={{ hidden: { opacity: 0, y: 100 }, visible: { opacity: 1, y: 0 } }}
          >
            {char === " " ? "\u00A0" : char}
          </motion.span>
        ))} */}

        {Array.from("About Me".split(" ")).map((word, wordIndex) => (
          <span key={wordIndex} className="inline-block">
            {Array.from(word).map((char, index) => (
              <motion.span
                key={`${wordIndex}-${index}`}
                className="inline-block"
                variants={{
                  hidden: { opacity: 0, y: -50 },
                  visible: { opacity: 1, y: 0 },
                }}
              >
                {char}
              </motion.span>
            ))}
            &nbsp;
          </span>
        ))}
      </motion.h2>

      {/* Overview */}
      <motion.p
        className="mt-6 text-lg text-gray-600 dark:text-gray-400 max-w-2xl text-center leading-relaxed"
        initial="hidden"
        animate={isAboutInView ? "visible" : "hidden"}
        variants={contentVariants}
      >
        I’m passionate about software development and creating impactful
        solutions. With a strong foundation in full-stack development, I
        continuously strive to learn and innovate.
      </motion.p>

      {/* Detailed Points */}
      <motion.div
        className="mt-8 space-y-4 max-w-2xl"
        initial="hidden"
        animate={isAboutInView ? "visible" : "hidden"}
        variants={contentVariants}
      >
        {aboutPoints.map((point, index) => (
          <motion.p
            key={index}
            className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg shadow-md hover:scale-[1.02] transition-transform duration-300"
            variants={pointVariants}
          >
            {point}
          </motion.p>
        ))}
      </motion.div>
    </section>
  );
};

export default About;
