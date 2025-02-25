"use client";

import { useState, useEffect, useRef } from "react";
import { useSidebar } from "../context/SidebarContext";
import { useMain } from "../context/MainContext";
import { motion, useInView } from "framer-motion";

// import { FaHtml5, FaCss3Alt, FaJs, FaReact, FaNodeJs, FaPython, FaJava, FaDatabase } from "react-icons/fa";
import {
  FaHtml5,
  FaCss3Alt,
  FaJs,
  FaReact,
  FaNodeJs,
  FaPython,
  FaJava,
  FaGitAlt,
} from "react-icons/fa";
import {
  SiNextdotjs,
  SiMongodb,
  SiMysql,
  SiRedis,
  SiEjs,
  SiExpress,
  SiFlask,
  SiBootstrap,
  SiCplusplus,
  SiJsonwebtokens,
  SiTailwindcss,
} from "react-icons/si";
import styles from "../css/Skills.module.css";

// Define the skill type
interface Skill {
  name: string;
  icon: React.ReactNode;
}

// const skills = [
//   { name: "HTML", icon: <FaHtml5 className="text-orange-500" /> },
//   { name: "CSS", icon: <FaCss3Alt className="text-blue-500" /> },
//   { name: "JavaScript", icon: <FaJs className="text-yellow-500" /> },
//   { name: "React.js", icon: <FaReact className="text-blue-400" /> },
//   { name: "Node.js", icon: <FaNodeJs className="text-green-500" /> },
//   { name: "Express.js", icon: <SiExpress className="text-green-600" /> },
//   { name: "Git", icon: <FaGitAlt className="text-orange-600" /> },
//   { name: "Python", icon: <FaPython className="text-blue-600" /> },
//   { name: "Java", icon: <FaJava className="text-red-500" /> },
//   { name: "Next.js", icon: <SiNextdotjs className="text-gray-600" /> },
//   { name: "C++", icon: <SiCplusplus className="text-blue-600" /> }, // C++ programming language
//   { name: "MySQL", icon: <SiMysql className="text-blue-600" /> }, // MySQL database
//   { name: "Bootstrap", icon: <SiBootstrap className="text-purple-500" /> }, // Bootstrap
//   { name: "EJS", icon: <SiEjs className="text-yellow-500" /> }, // EJS
//   { name: "Redis", icon: <SiRedis className="text-red-600" /> }, // Redis
//   { name: "JWT", icon: <SiJsonwebtokens className="text-green-500" /> }, // JWT
//   { name: "MongoDB", icon: <SiMongodb className="text-green-600" /> }, // MongoDB
//   { name: "Tailwind", icon: <SiTailwindcss className="text-sky-500" /> },
// ];

const skills: Skill[] = [
  { name: "C++", icon: <SiCplusplus className="text-blue-600" /> },
  { name: "Python", icon: <FaPython className="text-yellow-400" /> },
  { name: "Java", icon: <FaJava className="text-red-500" /> },
  { name: "Git", icon: <FaGitAlt className="text-orange-600" /> },

  // Frontend
  { name: "HTML", icon: <FaHtml5 className="text-orange-500" /> },
  { name: "CSS", icon: <FaCss3Alt className="text-blue-500" /> },
  { name: "Tailwind", icon: <SiTailwindcss className="text-sky-500" /> },
  { name: "Bootstrap", icon: <SiBootstrap className="text-purple-500" /> },
  { name: "JavaScript", icon: <FaJs className="text-yellow-500" /> },
  { name: "EJS", icon: <SiEjs className="text-yellow-500" /> },
  { name: "React.js", icon: <FaReact className="text-blue-400" /> },
  { name: "Next.js", icon: <SiNextdotjs className="text-gray-600" /> },

  // Backend (Full Stack)
  { name: "Node.js", icon: <FaNodeJs className="text-green-500" /> },
  { name: "Express.js", icon: <SiExpress className="text-green-600" /> },
  { name: "MongoDB", icon: <SiMongodb className="text-green-600" /> },
  { name: "MySQL", icon: <SiMysql className="text-blue-600" /> },
  { name: "Flask", icon: <SiFlask className="text-teal-500" /> },
  { name: "Redis", icon: <SiRedis className="text-red-600" /> },
  { name: "JWT", icon: <SiJsonwebtokens className="text-green-500" /> },
];

const Skills = () => {
  const { sidebarOpen } = useSidebar();
  const { contentWidth, contentHeight, isSmallWidth, isMediumWidth, isLargeWidth, isXlWidth } = useMain();

  const skillsRef = useRef<HTMLDivElement | null>(null);
  const [inViewAmount, setInViewAmount] = useState(0.5);
  const [sectionWidth, setSectionWidth] = useState(0);
  
  const isSkillsInView = useInView(skillsRef, {
    amount: inViewAmount,
    once: true,
  });

  const [sliderLayout, setSliderLayout] = useState(false);

  // const [isMediumScreen, setIsMediumScreen] = useState<boolean>(
  //   window.innerWidth < 768
  // );
  const [skills1, setSkills1] = useState<Skill[]>([]);
  const [skills2, setSkills2] = useState<Skill[]>([]);

  // // Dynamically adjust amount based on screen height
  // useEffect(() => {
  //   const updateAmount = () => {
  //     const screenWidth = window.innerWidth;

  //     if (screenWidth < 1024) {
  //       setInViewAmount(0.3);
  //     } else {
  //       setInViewAmount(0.5); // Default for larger screens
  //     }
  //   };

  //   updateAmount(); // Set amount on load
  //   window.addEventListener("resize", updateAmount);

  //   return () => window.removeEventListener("resize", updateAmount);
  // }, []);

  // Effect to handle screen size and split skills
  // useEffect(() => {
  //   const updateScreenSize = () => {
  //     const screenWidth = window.innerWidth;
  //     setIsMediumScreen(screenWidth < 768);

  //     // Dynamically update `inViewAmount`
  //     setInViewAmount(screenWidth < 1024 ? 0.3 : 0.5);

  //     // Only split skills if it's a medium screen
  //     if (screenWidth < 768) {
  //       const midIndex = Math.ceil(skills.length / 2);
  //       setSkills1(skills.slice(0, midIndex));
  //       setSkills2(skills.slice(midIndex));
  //     } else {
  //       setSkills1([]);
  //       setSkills2([]);
  //     }
  //   };

  //   updateScreenSize(); // Initial setup
  //   window.addEventListener("resize", updateScreenSize);

  //   return () => window.removeEventListener("resize", updateScreenSize);
  // }, []);

  useEffect(() => {
    const handleResize = () => {
      setSectionWidth(window.innerWidth);
    };

    handleResize(); // Check initially
    window.addEventListener("resize", handleResize); // Listen for window resize events
    
    return () => {
      window.removeEventListener("resize", handleResize); // Cleanup on unmount
    };
  }, []);

  // Effect to handle screen size and split skills
  useEffect(() => {
    const updateSkillsLayout = () => {
      const screenWidth = window.innerWidth;

      // Dynamically update `inViewAmount`
      if(sidebarOpen){
        setInViewAmount(contentWidth < 1024 ? 0.25 : 0.5);
      }
      else{
        setInViewAmount(screenWidth < 1024 ? 0.25 : 0.5);
      }

      // Only split skills if it's a medium screen
      if ((sidebarOpen && contentWidth < 768) || (!sidebarOpen && screenWidth < 768)) {
        const midIndex = Math.ceil(skills.length / 2);
        setSkills1(skills.slice(0, midIndex));
        setSkills2(skills.slice(midIndex)); 

        // change the layout to slider
        setSliderLayout(true);
      } else {
        setSkills1([]);
        setSkills2([]);

        // change back the layout to normal
        setSliderLayout(false);
      }
    };

    updateSkillsLayout(); // Initial setup
  }, [contentWidth, isMediumWidth, sidebarOpen]);

  return (
    <section
      ref={skillsRef}
      id="skills"
      // className={`flex flex-col justify-center items-center min-h-screen px-6 ${(contentWidth < 1024 || contentHeight < 575) ? 'pt-[120px]' : ''} ${(isTallEnough && contentWidth >= 1024 && contentHeight >= 575) ? 'pb-[120px]' : ''} ${isMediumWidth ? "px-16" : ""}`}

      className={`relative flex flex-col justify-center items-center pt-[120px] ${isMediumWidth ? "px-16" : "px-6"} w-full`}

      // className={`flex flex-col justify-center items-center px-6 ${(contentWidth < 1024 || contentHeight < 575) ? 'pt-[120px]' : ''} ${(isTallEnough && contentWidth >= 1024 && contentHeight >= 575) ? 'pb-[120px]' : ''} ${isMediumWidth ? "px-16" : ""}`}

      // style={{width: sidebarOpen ? contentWidth : sectionWidth}}
    >
      {/* Heading with Stagger Effect */}
      <motion.h2
        className="text-4xl font-bold text-center"
        initial="hidden"
        animate={isSkillsInView ? "visible" : "hidden"}
        variants={{
          hidden: { opacity: 0, y: 50 },
          visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.1, staggerChildren: 0.1 },
          },
        }}
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

        {/* {Array.from("Mastering the Craft".split(" ")).map((word, wordIndex) => ( */}
        {Array.from("Tech Stack & Tools".split(" ")).map((word, wordIndex) => (
          <span key={wordIndex} className="inline-block">
            {Array.from(word).map((char, index) => (
              <motion.span
                key={`${wordIndex}-${index}`}
                className="inline-block"
                variants={{
                  hidden: { opacity: 0, y: 50 },
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

      <motion.p
        className="text-lg text-center mt-6 max-w-2xl"
        initial={{ opacity: 0, y: 20 }}
        animate={isSkillsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        A glimpse into the technologies I work with, from frontend to backend,
        and beyond.
      </motion.p>

      {/* <div className="mt-10 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
        {skills.map((skill, index) => (
          <motion.div
            key={index}
            className={`${styles.skillBox} relative flex flex-col items-center justify-center w-28 h-28 bg-gray-200 dark:bg-gray-800 rounded-xl shadow-lg p-5 transition duration-300 hover:shadow-2xl`}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={
              isSkillsInView
                ? { opacity: 1, scale: 1 }
                : { opacity: 0, scale: 0.5 }
            }
            transition={{ duration: 0.3, delay: 0.1 * index }}
          >
            <div className="text-5xl">{skill.icon}</div>
            <span className="mt-2 text-sm font-semibold">{skill.name}</span>
          </motion.div>
        ))}
      </div> */}

      {!sliderLayout && (
        <div className="mt-8 flex flex-wrap justify-center gap-6 max-w-[72%]">
          {skills.map((skill, index) => (
            <motion.div
              key={index}
              // className={`${styles.skillBox} flex flex-col items-center justify-center w-[40%] sm:w-[30%] md:w-[22%] lg:w-[18%] xl:w-[15%] h-28 bg-gray-200 dark:bg-gray-800 rounded-xl shadow-lg p-5 select-none transition duration-300 hover:shadow-2xl`}
              className={`${
                styles.skillBox
              } flex flex-col items-center justify-center ${isXlWidth ? "w-[15%]" : isLargeWidth ? "w-[18%]" : isMediumWidth
                ? "w-[22%]" : isSmallWidth ? "w-[15%]" : "w-[40%]"} h-28 bg-gray-200 dark:bg-gray-800 rounded-xl shadow-lg p-5 select-none transition duration-300 hover:shadow-2xl`}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={
                isSkillsInView
                  ? { opacity: 1, scale: 1 }
                  : { opacity: 0, scale: 0.5 }
              }
              transition={{ duration: 0.3, delay: 0.1 * index }}
            >
              <div className="text-5xl">{skill.icon}</div>
              <span className="mt-2 text-sm font-semibold">{skill.name}</span>
            </motion.div>
          ))}
        </div>
      )}

      {/* <motion.div
        ref={skillsContainerRef}
        className={`${styles.skillsContainer} relative overflow-hidden flex-col w-full px-6 md:px-16 gap-6`}
        initial={{ opacity: 0 }}
        animate={isSkillsInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        {isSkillsInView && (
          <>
          <div className="flex gap-6">
            <div className={`${styles.skillsSlider} flex gap-6 py-8`}>
              {skills.map((skill, index) => (
                <div
                  key={index}
                  className={`${styles.skillBox} flex flex-col shrink-0 items-center justify-center w-28 h-28 bg-gray-200 dark:bg-gray-800 rounded-xl shadow-lg p-5 select-none transition duration-300 hover:shadow-2xl`}
                >
                  <div className="text-5xl">{skill.icon}</div>
                  <span className="mt-2 text-sm font-semibold">
                    {skill.name}
                  </span>
                </div>
              ))}
            </div>

            <div className={`${styles.skillsSlider} flex gap-6 py-8`}>
              {skills.map((skill, index) => (
                <div
                  key={index}
                  className={`${styles.skillBox} flex flex-col shrink-0 items-center justify-center w-28 h-28 bg-gray-200 dark:bg-gray-800 rounded-xl shadow-lg p-5 select-none transition duration-300 hover:shadow-2xl`}
                >
                  <div className="text-5xl">{skill.icon}</div>
                  <span className="mt-2 text-sm font-semibold">
                    {skill.name}
                  </span>
                </div>
              ))}
            </div>

            <div className={`${styles.skillsSlider} flex gap-6 py-8`}>
              {skills.map((skill, index) => (
                <div
                  key={index}
                  className={`${styles.skillBox} flex flex-col shrink-0 items-center justify-center w-28 h-28 bg-gray-200 dark:bg-gray-800 rounded-xl shadow-lg p-5 select-none transition duration-300 hover:shadow-2xl`}
                >
                  <div className="text-5xl">{skill.icon}</div>
                  <span className="mt-2 text-sm font-semibold">
                    {skill.name}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex gap-6">
            <div className={`${styles.skillsSlider2} flex gap-6 py-8`}>
              {skills2.map((skill, index) => (
                <div
                  key={index}
                  className={`${styles.skillBox} flex flex-col shrink-0 items-center justify-center w-28 h-28 bg-gray-200 dark:bg-gray-800 rounded-xl shadow-lg p-5 select-none transition duration-300 hover:shadow-2xl`}
                >
                  <div className="text-5xl">{skill.icon}</div>
                  <span className="mt-2 text-sm font-semibold">
                    {skill.name}
                  </span>
                </div>
              ))}
            </div>

            <div className={`${styles.skillsSlider2} flex gap-6 py-8`}>
              {skills2.map((skill, index) => (
                <div
                  key={index}
                  className={`${styles.skillBox} flex flex-col shrink-0 items-center justify-center w-28 h-28 bg-gray-200 dark:bg-gray-800 rounded-xl shadow-lg p-5 select-none transition duration-300 hover:shadow-2xl`}
                >
                  <div className="text-5xl">{skill.icon}</div>
                  <span className="mt-2 text-sm font-semibold">
                    {skill.name}
                  </span>
                </div>
              ))}
            </div>

            <div className={`${styles.skillsSlider2} flex gap-6 py-8`}>
              {skills2.map((skill, index) => (
                <div
                  key={index}
                  className={`${styles.skillBox} flex flex-col shrink-0 items-center justify-center w-28 h-28 bg-gray-200 dark:bg-gray-800 rounded-xl shadow-lg p-5 select-none transition duration-300 hover:shadow-2xl`}
                >
                  <div className="text-5xl">{skill.icon}</div>
                  <span className="mt-2 text-sm font-semibold">
                    {skill.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
          </>
          
        )}
      </motion.div> */}

      {sliderLayout && (
        <motion.div
          className={`${
            styles.skillsContainer
          } relative overflow-hidden flex flex-col justify-start items-center w-full px-6 ${
            isMediumWidth ? "px-16" : ""
          } gap-6`}
          initial={{ opacity: 0 }}
          animate={isSkillsInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {isSkillsInView && (
            <>
                <div className="flex gap-6">
                  {Array(3)
                    .fill(null)
                    .map((_, i) => (
                      <div
                        key={i}
                        className={`${styles.skillsSlider1} flex gap-6 py-4`}
                      >
                        {skills1.map((skill, index) => (
                          <div
                            key={index}
                            className={`${styles.skillBox} flex flex-col shrink-0 items-center justify-center w-28 h-28 bg-gray-200 dark:bg-gray-800 rounded-xl shadow-lg p-5 select-none transition duration-300 hover:shadow-2xl`}
                          >
                            <div className="text-5xl">{skill.icon}</div>
                            <span className="mt-2 text-sm font-semibold">
                              {skill.name}
                            </span>
                          </div>
                        ))}
                      </div>
                    ))}
                </div>

                <div className="flex gap-6">
                  {Array(3)
                    .fill(null)
                    .map((_, i) => (
                      <div
                        key={i}
                        className={`${styles.skillsSlider2} flex gap-6 py-4`}
                      >
                        {skills2.map((skill, index) => (
                          <div
                            key={index}
                            className={`${styles.skillBox} flex flex-col shrink-0 items-center justify-center w-28 h-28 bg-gray-200 dark:bg-gray-800 rounded-xl shadow-lg p-5 select-none transition duration-300 hover:shadow-2xl`}
                          >
                            <div className="text-5xl">{skill.icon}</div>
                            <span className="mt-2 text-sm font-semibold">
                              {skill.name}
                            </span>
                          </div>
                        ))}
                      </div>
                    ))}
                </div>
            </>
          )}
        </motion.div>
      )}

      {/* <motion.div
        className={`${styles.skillsContainer} relative overflow-hidden w-full px-6 md:px-16 gap-6`}
        initial={{ opacity: 0 }}
        animate={isSkillsInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        {isSkillsInView &&
          Array(2)
            .fill(null)
            .map((_, i) => (
              <div
                key={i}
                className={`${styles.skillsSlider} flex gap-6 py-8`}
              >
                {skills.map((skill, index) => (
                  <div
                    key={`${i}-${index}`}
                    className={`${styles.skillBox} flex flex-col shrink-0 items-center justify-center w-28 h-28 bg-gray-200 dark:bg-gray-800 rounded-xl shadow-lg p-5 select-none transition duration-300 hover:shadow-2xl`}
                  >
                    <div className="text-5xl">{skill.icon}</div>
                    <span className="mt-2 text-sm font-semibold">
                      {skill.name}
                    </span>
                  </div>
                ))}
              </div>
            ))}
      </motion.div> */}
    </section>
  );
};

export default Skills;
