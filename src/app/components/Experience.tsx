"use client";

import { useState, useEffect, useRef } from "react";
import { useMain } from "../context/MainContext";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import accentureLogo from "../../../public/images/logos/accenture_logo2.png";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import styles from "../css/Experience.module.css";

const Experience = () => {
  const { contentWidth, contentHeight, isMediumWidth } = useMain();

  const experienceRef = useRef<HTMLDivElement | null>(null);
  const [isTallEnough, setIsTallEnough] = useState(false);

  const experienceInfoRef = useRef(null);
  const isExperienceInfoInView = useInView(experienceInfoRef, {
    amount: 0.5,
    once: true,
  });
  
  const experienceAnimationRef = useRef(null);
  const isExperienceAnimationInView = useInView(experienceAnimationRef, {
    amount: 0.5,
    once: true,
  });

  const experienceData = [
    {
      id: 1,
      company: "Accenture",
      location: "Gurugram, India",
      title: "Associate Software Engineer",
      duration: "July, 2024 - Present",
      logo: accentureLogo,
    },
  ];

  useEffect(() => {
      const handleResize = () => {
        if (experienceRef.current) {
          const height = experienceRef.current.offsetHeight;
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
      ref={experienceRef}
      id="experience"
      // className={`flex flex-col justify-center items-center min-h-screen px-6 ${(contentWidth < 1024 || contentHeight < 575) ? 'pt-[120px]' : ''} ${isMediumWidth ? 'px-16' : ''}`}

      className={`flex flex-col justify-center items-center pt-[120px] ${isMediumWidth ? 'px-16' : 'px-6'}`}

      // className={`flex flex-col justify-center items-center px-6 ${(contentWidth < 1024 || contentHeight < 575) ? 'pt-[120px]' : ''} ${(isTallEnough && contentWidth >= 1024 && contentHeight >= 575) ? 'pb-[120px]' : ''} ${isMediumWidth ? 'px-16' : ''}`}
    >
      {/* Animated Heading */}
      <motion.h1
        className="text-4xl font-bold"
        initial="hidden"
        animate={isExperienceInfoInView ? "visible" : "hidden"}
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
        {Array.from("Experience").map((char, index) => (
          <motion.span
            key={index}
            className="inline-block"
            variants={{
              hidden: { opacity: 0, x: 50 },
              visible: { opacity: 1, x: 0 },
            }}
          >
            {char}
          </motion.span>
        ))}
      </motion.h1>

      <div className={`flex ${isMediumWidth ? 'flex-row' : 'flex-col'} mt-8 items-center justify-between text-left w-full`}>
        {/* Left Content - Appears with Animation */}
        <motion.div
          ref={experienceInfoRef}
          className="relative flex flex-col items-center"
          initial={{ opacity: 0, y: 50 }}
          animate={
            isExperienceInfoInView
              ? { opacity: 1, y: 0 }
              : { opacity: 0, y: 50 }
          }
          transition={{ duration: 0.8 }}
        >
          {/* Vertical Timeline */}
          <motion.div
            className="absolute w-1 h-full bg-blue-500 dark:bg-blue-400 rounded-lg left-1/2"
            initial={{ scaleY: 0, translateX: "-50%" }}
            animate={
              isExperienceInfoInView
                ? { scaleY: 1, translateX: "-50%" }
                : { scaleY: 0, translateX: "-50%" }
            }
            transition={{ duration: 1.5, ease: "easeInOut" }}
          ></motion.div>

          {/* Experience Stops */}
          {experienceData.map((exp, index) => (
            <div
              key={exp.id}
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
                animate={isExperienceInfoInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.8, delay: index * 0.5 }}
              >
                <h3 className="text-lg font-semibold">{exp.company}</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  {exp.title}
                </p>
                <p className="text-gray-500 dark:text-gray-400 text-xs">
                  {exp.duration}
                </p>
              </motion.div>

              {/* Stop Circle with Ripple Effect */}
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

              {/* Stop Circle (Only Last One has Ripple) */}
              <div className="absolute w-5 h-5 bg-blue-500 dark:bg-blue-400 border-white dark:border-gray-800 shadow-md left-1/2 rounded-full transform -translate-x-1/2">
                {index === experienceData.length - 1 && ( // 👈 Only apply ripple to the last stop
                  <motion.div
                    className="absolute inset-0 bg-blue-300 dark:bg-blue-600 drop-shadow-[0_0_0.3rem_#ffffff70] rounded-full opacity-50"
                    animate={{ scale: [1, 2, 1] }}
                    transition={{
                      duration: 1.8,
                      ease: "easeInOut",
                      repeat: Infinity,
                    }}
                  />
                )}
              </div>

              {/* Right Side Logo (Alternating Position) */}
              <motion.div
                className={`${index % 2 === 0 ? "ml-6" : "mr-6"}`}
                initial={{ opacity: 0, x: index % 2 === 0 ? 50 : -50 }}
                animate={isExperienceInfoInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.8, delay: index * 0.5 }}
              >
                <Image
                  src={exp.logo}
                  alt={exp.company}
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
          ref={experienceAnimationRef}
          className={`${isMediumWidth ? 'mt-0 w-1/2' : 'mt-10'} flex justify-center`}
          initial={{ opacity: 0, x: 50 }}
          animate={
            isExperienceAnimationInView
              ? { opacity: 1, x: 0 }
              : { opacity: 0, x: 50 }
          }
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          {isExperienceAnimationInView && (
            <DotLottieReact
              src="https://lottie.host/e2644900-18a3-47b1-a1fd-5dd311f97ce7/hvCyyTRoTD.lottie"
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

export default Experience;
