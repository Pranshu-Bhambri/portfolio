"use client";

import { useRef } from "react";
import { useRouter } from "next/navigation";
import { useSidebar } from "../context/SidebarContext";
import { useMain } from "../context/MainContext";
import { ReactTyped } from "react-typed";
// import { useHeader } from "./context/HeaderContext";
import { motion, useInView } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import styles from "../css/Home.module.css";

const Home = () => {
  const { sidebarOpen } = useSidebar();
  const { contentWidth, contentHeight, isSmallWidth, isMediumWidth } = useMain();
  const router = useRouter();

  const HomeInfoRef = useRef(null);
  const isHomeInfoInView = useInView(HomeInfoRef, { amount: 0.5, once: true });

  const HomeAnimationRef = useRef(null);
  const isHomeAnimationInView = useInView(HomeAnimationRef, {
    amount: 0.5,
    once: true,
  });

  // const { setShouldFixHeader } = useHeader(); // Access context to update header state
  // const homeRef = useRef<HTMLDivElement | null>(null); // Create a ref to track the Home section

  // useEffect(() => {
  //   if (!homeRef.current) return; // Exit if homeRef is null

  //   const observer = new IntersectionObserver(
  //     ([entry]) => {
  //       setShouldFixHeader(!entry.isIntersecting); // Fix header when Home div goes out of view
  //     },
  //     { root: null, threshold: 0.1 } // root=null (viewport), threshold=0.1 (10% visibility)
  //   );

  //   observer.observe(homeRef.current); // Start observing Home div

  //   return () => observer.disconnect(); // Cleanup observer when component unmounts
  // }, [setShouldFixHeader]);

  return (
    // <section
    //   id="home"
    //   className="flex flex-col md:flex-row items-center justify-between min-h-screen px-6 md:px-16"
    // >
    <section
      id="home"
      className={`flex ${isMediumWidth ? "flex-row px-16" : "flex-col px-6"} ${
        contentWidth < 1024 || contentHeight < 600 ? sidebarOpen ? "pt-[40px]" : "pt-[120px]" : ""} items-center justify-between min-h-screen`}
    >
      {/* Left Content - Appears with Animation */}
      <motion.div
        ref={HomeInfoRef}
        className={`${styles.homeInfo} text-center sm:text-left w-full`}
        initial={{ opacity: 0, y: 50 }}
        animate={
          isHomeInfoInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }
        }
        transition={{ duration: 0.8 }}
      >
        {/* Name & Greeting */}
        {/* <h1 className="text-5xl font-bold">
          Hi there, I am <span className="tracking-[2px]">PRANSHU</span>!
          <span className={`${styles.animateWave} text-6xl drop-shadow-none`}>
            👋
          </span>
        </h1> */}
        <motion.h1
          className={`${isSmallWidth ? 'text-5xl' : 'text-4xl'} font-bold`}
          initial="hidden"
          animate="visible"
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
          {/* {Array.from("Hi there, I am PRANSHU!").map((char, index) => {
            const isName = "PRANSHU".includes(char);
            return (
              <motion.span
                key={index}
                className={`${isName ? "tracking-[2px]" : ""} inline-block`}
                variants={{
                  hidden: { opacity: 0, y: 10 },
                  visible: { opacity: 1, y: 0 },
                }}
              >
                {char === " " ? "\u00A0" : char}
              </motion.span>
            );
          })} */}
          {Array.from("Hi, this is PRANSHU BHAMBRI!".split(" ")).map(
            (word, wordIndex, words) => (
              <span key={wordIndex} className="inline-block">
                {Array.from(word).map((char, index) => {
                  const isName = "PRANSHU".includes(char);
                  return (
                    <motion.span
                      key={`${wordIndex}-${index}`}
                      className={`${
                        isName ? "tracking-[2px]" : ""
                      } inline-block`}
                      variants={{
                        hidden: { opacity: 0, y: 10 },
                        visible: { opacity: 1, y: 0 },
                      }}
                    >
                      {char}
                    </motion.span>
                  );
                })}
                {/* &nbsp;  */}
                {wordIndex !== words.length - 1 && <>&nbsp;</>}
              </span>
            )
          )}

          <motion.span
            className={`${styles.animateWave} ${isSmallWidth ? 'text-6xl' : 'text-4xl'} select-none`}
            initial={{ rotate: 0, opacity: 0 }}
            animate={{
              rotate: [0, -10, 12, -10, 9, 0, 0], // Waving effect
              opacity: [0, 1, 1, 1, 1, 1, 1], // Ensures opacity never flickers
            }}
            transition={{
              duration: 2.5,
              ease: "easeInOut",
              times: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 1], // Even timing
              delay: 2.5,
            }}
          >
            👋
          </motion.span>
        </motion.h1>

        {/* Typed.js Effect */}
        {isHomeInfoInView && (
          <ReactTyped
            className={`inline-block ${isSmallWidth ? 'text-3xl' : 'text-2xl'} mt-6`}
            strings={[
              "I am a Software Developer 🚀",
              "Crafting solutions across full stack ⚙️",
              "Always learning and growing 📚",
            ]}
            typeSpeed={60}
            backSpeed={50}
            backDelay={1000}
            loop
          />
        )}

        {/* Subtle Divider */}
        <div className="w-24 h-[3px] bg-[#0141ff] dark:bg-gray-200 mx-auto sm:mx-0 my-8 opacity-60" />

        <div
          className={`flex ${isMediumWidth ? "flex-row items-center" : "flex-col"} justify-between`}
        >
          <div className="flex flex-col">
            <p
              className={`text-lg ${
                isMediumWidth ? "text-xl" : ""
              } text-gray-600 dark:text-gray-400 max-w-[36rem] leading-relaxed`}
            >
              Exploring endless possibilities in technology and innovation as a
              passionate full-stack developer. I build scalable, adaptable
              applications that make a difference.
              <br />
              Let’s create something impactful together! 🚀
            </p>

            <div className="flex flex-col mx-auto sm:mx-0 mt-6 space-y-6 max-w-[180px]">
              {/* Social Icons */}
              <div className="flex justify-around space-x-6">
                {/* LinkedIn */}
                <a
                  href="https://www.linkedin.com/in/pranshu-bhambri-136695219/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-200 transition-colors duration-300 text-3xl"
                >
                  <FontAwesomeIcon icon={faLinkedin} />
                </a>

                {/* GitHub */}
                <a
                  href="https://github.com/Pranshu-Bhambri"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors duration-300 text-3xl"
                >
                  <FontAwesomeIcon icon={faGithub} />
                </a>

                {/* Email */}
                <a
                  href="mailto:pranshu.bhambri@gmail.com"
                  className="text-red-500 dark:text-red-400 hover:text-red-700 dark:hover:text-red-200 transition-colors duration-300 text-3xl"
                >
                  <FontAwesomeIcon icon={faEnvelope} />
                </a>
              </div>

              <a href="#contact">
                <button className="px-6 py-3 text-lg font-semibold bg-blue-600 text-white rounded-xl shadow-md dark:bg-gray-800 dark:text-gray-200 hover:bg-blue-700 dark:hover:bg-gray-700 transition w-full">
                  Contact Me
                </button>
              </a>
              {/* <button className="px-6 py-3 text-lg font-semibold bg-blue-600 text-white rounded-xl shadow-md dark:bg-gray-800 dark:text-gray-200 hover:bg-blue-700 dark:hover:bg-gray-700 transition" onClick={() => router.push('/#contact')}>
              Contact Me
            </button> */}
            </div>
          </div>

          {/* Right Side - GIF with Animation */}
          <motion.div
            ref={HomeAnimationRef}
            className={`${
              isMediumWidth ? "mt-0 w-1/2" : "mt-10"
            } flex justify-center`}
            initial={{ opacity: 0, y: 50 }}
            animate={
              isHomeAnimationInView
                ? { opacity: 1, y: 0 }
                : { opacity: 0, y: 50 }
            }
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            {isHomeAnimationInView && (
              <DotLottieReact
                src="https://lottie.host/8f94e225-c07c-4e6a-b20f-b6e87e965ce3/Z7gzIzYkIX.lottie"
                loop
                autoplay
                // className="w-[400px] md:w-[500px]"
                className={`${isMediumWidth ? "w-[600px]" : "w-[400px]"}`}
              />
            )}
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default Home;
