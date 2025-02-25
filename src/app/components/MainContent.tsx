// 'use client';
// import { useSidebar } from "../context/SidebarContext";
// import Footer from "./Footer";

// const MainContent = ({ children }: { children: React.ReactNode }) => {
//   const { sidebarOpen } = useSidebar();

//   return (
//     // <main className={`flex flex-col flex-grow pt-[180px] px-[30px] transition-all duration-300
//     //     ${sidebarOpen ? "" : "-ml-[20vw]"}`}>
//     <main className={`w-full flex flex-col flex-grow transition-all duration-300
//       ${sidebarOpen ? "md:ml-[20%]" : "ml-0"}`}>
//       {children}
//       <Footer />
//     </main>
//   );
// };

// export default MainContent;


"use client";
import { useState, useEffect } from "react";
import { useSidebar } from "../context/SidebarContext";
import LoadingWrapper from "./LoadingWrapper";

const MainContent = ({ children }: { children: React.ReactNode }) => {
  const { sidebarOpen, sidebarWidth } = useSidebar(); // Get sidebar width

  return (
    <LoadingWrapper>
      <main
        className="flex-grow flex flex-col overflow-x-hidden transition-all duration-300"
        // className="flex-grow flex flex-col transition-all duration-300"
        style={{
          marginLeft: (sidebarOpen && window.innerWidth >= 768) ? `${sidebarWidth}px` : "0",
        }}
      >
        {children}
      </main>
    </LoadingWrapper>
  );
};

export default MainContent;
