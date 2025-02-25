import React from 'react'
import { useSidebar } from '../context/SidebarContext';
import { useTheme } from '../context/ThemeContext';
import { motion } from 'framer-motion';

const ThemeToggler = ({ type }: { type: "header" | "sidebar" }) => {
    const { sidebarOpen, toggleSidebar } = useSidebar();
    const { theme, toggleTheme } = useTheme();

  return (
    <button
        onClick={toggleTheme}
        className={`${sidebarOpen && type === "header" ? "opacity-0 pointer-events-none" : "opacity-100"} ${type === "header" ? 'hidden sm:block' : ''} relative w-[52px] h-[28px] bg-gray-300 dark:bg-gray-700 rounded-full p-1 flex items-center transition-all duration-300`}
        >
        {/* Sliding Circle */}
        <motion.div
            className="w-[20px] h-[20px] bg-white dark:bg-yellow-400 rounded-full shadow-md"
            animate={{ x: theme === "dark" ? 24 : 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
        />
    </button>
  )
}

export default ThemeToggler
