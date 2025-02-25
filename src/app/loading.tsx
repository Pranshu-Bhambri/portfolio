// "use client";
// import { motion } from "framer-motion";
// import { DotLottieReact } from "@lottiefiles/dotlottie-react";
// import LogoLink from "./components/LogoLink";

// export default function Loading() {
//   return (
//     <div className="fixed inset-0 flex items-center justify-center bg-white dark:bg-gray-900 text-gray-900 dark:text-white z-50">
//         <div className="flex flex-col justify-between items-center h-[65vh] mt-[30vh]">
//             <DotLottieReact
//                 src="https://lottie.host/9b69be9b-5378-46e1-991c-b25973a020b8/JmJoF4IX8v.lottie"
//                 loop
//                 autoplay
//                 className="w-[200px] sm:w-[300px]"
//             />
            
//             <LogoLink place="loading"/>
//         </div>
//     </div>
//   );
// }


"use client";
import { motion } from "framer-motion";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import LogoLink from "./components/LogoLink";

export default function Loading() {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-white dark:bg-gray-900 text-gray-900 dark:text-white z-50">
      {/* Wrapper to center Lottie */}
      <div className="flex flex-col items-center flex-grow justify-center">
        <DotLottieReact
          src="https://lottie.host/9b69be9b-5378-46e1-991c-b25973a020b8/JmJoF4IX8v.lottie"
          loop
          autoplay
          className="w-[200px] sm:w-[300px]"
        />
      </div>

      {/* Spacing for Logo */}
      <div className="mb-6"> 
        <LogoLink place="loading" />
      </div>
    </div>
  );
}
