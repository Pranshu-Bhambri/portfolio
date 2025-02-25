"use client";

import { useState, useEffect, useRef } from "react";
import { useMain } from "../context/MainContext";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import maitLogo from "../../../public/images/logos/mait_logo.jpeg";
import bbpsLogo from "../../../public/images/logos/bbps_logo.jpeg";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import styles from "../css/Experience.module.css";

const Education = () => {
  const { contentWidth, contentHeight, isMediumWidth } = useMain();
  
  const educationRef = useRef<HTMLDivElement | null>(null);
  const [isTallEnough, setIsTallEnough] = useState(false);

  const educationInfoRef = useRef(null);
  const isEducationInfoInView = useInView(educationInfoRef, {
    amount: 0.5,
    once: true,
  });
  const educationAnimationRef = useRef(null);
  const isEducationAnimationInView = useInView(educationAnimationRef, {
    amount: 0.5,
    once: true,
  });

  const educationData = [
    {
      id: 1,
      institution: "Maharaja Agrasen Institute of Technology",
      location: "Delhi, India",
      degree: "B.Tech in Information Technology",
      score: "CGPA: 9.37",
      year: "2020 - 2024",
      logo: maitLogo,
    },
    {
      id: 2,
      institution: "Bal Bharati Public School, Rohini",
      location: "Delhi, India",
      degree: "AISSCE (Class XII)",
      score: "94.2%",
      year: "Completed: 2020",
      logo: bbpsLogo,
    },
  ];

  useEffect(() => {
    const handleResize = () => {
      if (educationRef.current) {
        const height = educationRef.current.offsetHeight;
        setIsTallEnough(height > window.innerHeight * 0.8); // Check if height is greater than 80vh
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
      ref={educationRef}
      id="education"
      // className={`flex flex-col justify-center items-center min-h-screen px-6 ${(contentWidth < 1024 || contentHeight < 575) ? 'pt-[120px]' : ''} ${(isTallEnough && contentWidth >= 1024 && contentHeight >= 575) ? 'pb-[120px]' : ''} ${isMediumWidth ? 'px-16' : ''}`}

      className={`flex flex-col justify-center items-center pt-[120px] ${isMediumWidth ? 'px-16' : 'px-6'}`}

      // className={`flex flex-col justify-center items-center px-6 ${(contentWidth < 1024 || contentHeight < 575) ? 'pt-[120px]' : ''} ${(isTallEnough && contentWidth >= 1024 && contentHeight >= 575) ? 'pb-[120px]' : ''} ${isMediumWidth ? 'px-16' : ''}`}
    >
      {/* Animated Heading */}
      <motion.h1
        className="text-4xl font-bold"
        initial="hidden"
        animate={isEducationInfoInView ? "visible" : "hidden"}
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: {
              staggerChildren: 0.1, // Each character animates separately
            },
          },
        }}
      >
        {Array.from("Education").map((char, index) => (
          <motion.span
            key={index}
            className="inline-block"
            variants={{
              hidden: { opacity: 0, x: -50 },
              visible: { opacity: 1, x: 0 },
            }}
          >
            {char}
          </motion.span>
        ))}
      </motion.h1>
      {/* <motion.h2
        className="text-4xl font-bold text-center mb-10"
        initial={{ opacity: 0, y: -50, scale: 0.8 }}
        animate={isEducationInfoInView ? { opacity: 1, y: 0, scale: 1 } : {}}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <span className="bg-gradient-to-r from-blue-500 to-purple-500 text-transparent bg-clip-text">
          Education
        </span>
      </motion.h2> */}

      <div className={`flex ${isMediumWidth ? 'flex-row' : 'flex-col'} mt-8 items-center justify-between text-left w-full`}>
        {/* Left Content - Appears with Animation */}
        <motion.div
          ref={educationInfoRef}
          className="relative flex flex-col items-center"
          initial={{ opacity: 0, y: 50 }}
          animate={
            isEducationInfoInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }
          }
          transition={{ duration: 0.8 }}
        >
          {/* Vertical Timeline */}
          <motion.div
            className="absolute w-1 h-full bg-blue-500 dark:bg-blue-400 rounded-lg left-1/2"
            initial={{ scaleY: 0, translateX: "-50%" }}
            animate={
              isEducationInfoInView
                ? { scaleY: 1, translateX: "-50%" }
                : { scaleY: 0, translateX: "-50%" }
            }
            transition={{ duration: 1.5, ease: "easeInOut" }}
          ></motion.div>

          {/* Education Stops */}
          {educationData.map((edu, index) => (
            <div
              key={edu.id}
              className={`relative flex items-center ${
                index % 2 === 0 ? "" : "flex-row-reverse"
              } w-full my-6`}
            >
              {/* Left Side Text (Alternating Position) */}
              <motion.div
                className={`w-1/2 pr-6 pl-6 ${
                  index % 2 === 0 ? "text-right" : "text-left"
                }`}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                animate={isEducationInfoInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.8, delay: index * 0.5 }}
              >
                <h3 className="text-lg font-semibold">{edu.institution}</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  {edu.degree}
                </p>
                <p className="text-gray-500 dark:text-gray-400 text-xs">
                  {edu.score} | {edu.year}
                </p>
              </motion.div>

              {/* Stop Circle with Ripple effect */}
              {/* <motion.div
                className="absolute w-6 h-6 bg-blue-500 dark:bg-blue-400 rounded-full border-4 border-white dark:border-gray-800 shadow-md left-1/2"
                initial={{ scale: 0, translateX: "-50%" }}
                animate={
                  isEducationInfoInView
                    ? { scale: 1, translateX: "-50%" }
                    : { scale: 0, translateX: "-50%" }
                }
                transition={{ duration: 0.5, delay: index * 0.5 }}
              >
                </motion.div> */}
              {/* <div className="absolute w-5 h-5 bg-blue-500 dark:bg-blue-400 border-white dark:border-gray-800 shadow-md left-1/2 rounded-full transform -translate-x-1/2">
                <motion.div
                  className="absolute inset-0 bg-blue-300 dark:bg-blue-600 drop-shadow-[0_0_0.3rem_#ffffff70] rounded-full opacity-50"
                  animate={{ scale: [1, 2, 1] }}
                  transition={{
                    duration: 1.8,
                    ease: "easeInOut",
                    repeat: Infinity,
                  }}
                />
              </div> */}

              {/* Stop Circle (No stop has Ripple) */}
              <div className="absolute w-5 h-5 bg-blue-500 dark:bg-blue-400 border-white dark:border-gray-800 shadow-md left-1/2 rounded-full transform -translate-x-1/2">
              </div>

              {/* Right Side Logo (Alternating Position) */}
              <motion.div
                className={`${index % 2 === 0 ? "ml-6" : "mr-6"}`}
                initial={{ opacity: 0, x: index % 2 === 0 ? 50 : -50 }}
                animate={isEducationInfoInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.8, delay: index * 0.5 }}
              >
                <Image
                  src={edu.logo}
                  alt={edu.institution}
                  width={56} // 14 x 4
                  height={56}
                  className={`${styles.logoImage} rounded-lg border-1 border-gray-500 shadow-lg transition-all duration-300`}
                  draggable="false"
                />
              </motion.div>
            </div>
          ))}
        </motion.div>

        {/* Right Side - GIF with Animation */}
        <motion.div
          ref={educationAnimationRef}
          className={`${isMediumWidth ? 'mt-0 w-1/2' : 'mt-10'} flex justify-center`}
          initial={{ opacity: 0, x: 50 }}
          animate={
            isEducationAnimationInView
              ? { opacity: 1, x: 0 }
              : { opacity: 0, x: 50 }
          }
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          {isEducationAnimationInView && (
            <DotLottieReact
              src="https://lottie.host/eb572cba-0936-468c-b103-0d7841598d8a/nYB2R8le9A.lottie"
              loop
              autoplay
              className={`${isMediumWidth ? 'w-[600px]' : 'w-[400px]'}`}
            />
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default Education;
