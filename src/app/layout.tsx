import type { Metadata } from "next";
import Link from "next/link";
import { SidebarProvider, useSidebar } from "./context/SidebarContext";
import { ThemeProvider } from "./context/ThemeContext";
import MainContent from "./components/MainContent";
import Sidebar from "./components/Sidebar";
// import { HeaderProvider } from "./context/HeaderContext";
import Footer from "./components/Footer";
import CursorEffect from "./components/CursorEffect";
import { Geist, Geist_Mono, Ubuntu } from "next/font/google";
import "./globals.css";
import { MainProvider } from "./context/MainContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const ubuntu = Ubuntu({
  variable: '--font-ubuntu',
  weight: ['400', '700'],
  subsets: ['latin'],
});


export const metadata: Metadata = {
  title: "Pranshu Bhambri | Portfolio",
  description: "Pranshu Bhambri | Portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${ubuntu.variable} antialiased flex flex-col min-h-screen`}
      >
        <ThemeProvider>
          <SidebarProvider>
            <MainProvider>
            {/* <HeaderProvider> */}
            

              <div className="flex">
                <Sidebar />

                <MainContent>{children}</MainContent>
              </div>
            {/* </HeaderProvider> */}
            </MainProvider>
          </SidebarProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
