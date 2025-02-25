"use client";

import { useState, useEffect, useRef } from "react";
import { useMain } from "../context/MainContext";
import { motion, useInView } from "framer-motion";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Contact = () => {
  const { contentWidth, contentHeight, isMediumWidth, isLargeWidth } = useMain();

  const contactRef = useRef<HTMLDivElement | null>(null);
  const [isTallEnough, setIsTallEnough] = useState(false);

  const contactInfoRef = useRef(null);
  const isContactInfoInView = useInView(contactInfoRef, {
    amount: 0.5,
    once: true,
  });

  const contactAnimationRef = useRef(null);
  const isContactAnimationInView = useInView(contactAnimationRef, {
    amount: 0.5,
    once: true,
  });

  const [formData, setFormData] = useState<{
    name: string;
    email: string;
    subject: string;
    message: string;
  }>({ name: "", email: "", subject: "", message: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setFormData({ name: "", email: "", subject: "", message: "" });
        toast.success("Message sent successfully!");
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    } catch (error) {
      toast.error("Failed to send message");
    }

    setLoading(false);
  };

  useEffect(() => {
      const handleResize = () => {
        if (contactRef.current) {
          const height = contactRef.current.offsetHeight;
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
      ref={contactRef}
      id="contact"
      // className={`flex flex-col justify-center items-center min-h-screen px-6 ${(contentWidth < 1024 || contentHeight < 575) ? 'pt-[120px]' : ''} ${(isTallEnough && contentWidth >= 1024 && contentHeight >= 575) ? 'pb-[120px]' : ''} ${isLargeWidth ? 'px-16' : ''}`}

      className={`flex flex-col justify-center items-center pt-[120px] ${isLargeWidth ? 'px-16' : 'px-6'}`}

      // className={`flex flex-col justify-center items-center px-6 ${(contentWidth < 1024 || contentHeight < 575) ? 'pt-[120px]' : ''} ${(isTallEnough && contentWidth >= 1024 && contentHeight >= 575) ? 'pb-[120px]' : ''} ${isLargeWidth ? 'px-16' : ''}`}
    >
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
      <motion.h2
        className="text-4xl font-bold text-center"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={
          isContactInfoInView
            ? { opacity: 1, scale: 1 }
            : { opacity: 0, scale: 0.5 }
        }
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <motion.span
          initial={{ height: "0%" }}
          animate={{ height: "100%" }}
          transition={{ duration: 1, ease: "easeInOut" }}
          className="inline-block overflow-hidden"
        >
          Contact
        </motion.span>
      </motion.h2>

      <motion.p
        className="text-lg text-center mt-6 max-w-2xl"
        initial={{ opacity: 0, y: 20 }}
        animate={isContactInfoInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        Feel free to reach out for collaborations, inquiries, or just a chat!
      </motion.p>

      <div className={`mt-8 flex ${isLargeWidth ? 'flex-row' : 'flex-col'} items-center justify-between text-left w-full`}>
        <motion.div
          ref={contactInfoRef}
          className="w-full max-w-lg flex flex-col"
          initial={{ opacity: 0, y: 50 }}
          animate={
            isContactInfoInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }
          }
          transition={{ duration: 0.8 }}
        >
          <form
            onSubmit={handleSubmit}
            className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md"
          >
            <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              Get in touch
            </h3>
            <div className="grid gap-4">
              {["name", "email", "subject", "message"].map((field) =>
                field === "message" ? (
                  <textarea
                    key={field}
                    name={field}
                    value={formData[field as keyof typeof formData]}
                    onChange={handleChange}
                    required
                    placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                    className="w-full p-3 border rounded-md text-gray-900 dark:text-white bg-gray-100 dark:bg-gray-700 focus:ring focus:ring-blue-500 focus:outline-none h-32"
                  />
                ) : (
                  <input
                    key={field}
                    type={field === "email" ? "email" : "text"}
                    name={field}
                    value={formData[field as keyof typeof formData]}
                    onChange={handleChange}
                    required
                    placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                    className="w-full p-3 border rounded-md text-gray-900 dark:text-white bg-gray-100 dark:bg-gray-700 focus:ring focus:ring-blue-500 focus:outline-none"
                  />
                )
              )}
            </div>

            <button
              type="submit"
              className="w-full mt-4 bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition disabled:bg-gray-400"
              disabled={loading}
            >
              {loading ? "Sending..." : "Send Message"}
            </button>
          </form>
        </motion.div>

        <motion.div
          ref={contactAnimationRef}
          className={`${isLargeWidth ? 'mt-0 w-1/2' : 'mt-10'} flex justify-center`}
          initial={{ opacity: 0, x: 50 }}
          animate={
            isContactAnimationInView
              ? { opacity: 1, x: 0 }
              : { opacity: 0, x: 50 }
          }
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          {isContactAnimationInView && (
            <DotLottieReact
              src="https://lottie.host/8c91579f-3f13-4a6e-aab1-3c1887dbf6fe/gcUsozTHmx.lottie"
              loop
              autoplay
              className={`${isLargeWidth ? 'w-[600px]' : isMediumWidth ? 'w-[500px]' : 'w-[400px]'}`}
            />
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
