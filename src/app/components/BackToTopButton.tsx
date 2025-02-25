"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHandPointUp } from "@fortawesome/free-solid-svg-icons";

const BackToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 100) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo(0, 0);
  };

  return (
    <button
      onClick={scrollToTop}
      className={`fixed bottom-6 right-6 p-4 z-[150] rounded-xl transition duration-300 ${ isVisible ? "opacity-100" : "opacity-0 pointer-events-none"} text-white shadow-md bg-blue-600 dark:bg-gray-800 dark:text-gray-200 hover:bg-blue-700 dark:hover:bg-gray-700`}
    >
      <motion.div className="text-2xl"
        animate={{ y: [0, -5, 0] }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
        }}
      >
        <FontAwesomeIcon icon={faHandPointUp} size="lg" />
      </motion.div>
    </button>
  );
};

export default BackToTopButton;
