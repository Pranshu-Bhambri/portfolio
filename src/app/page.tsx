import CursorEffect from './components/CursorEffect';
import Header from './components/Header';
import MainHome from './components/Home';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Education from './components/Education';
import Contact from './components/Contact';
import Footer from './components/Footer';
import BackToTopButton from './components/BackToTopButton';


export default function Home() {
  return (
    <div>
      {/* Subtle Background Effect - Now Global */}
      <div className="fixed top-0 left-0 w-full h-full -z-10 bg-gradient-to-b from-transparent to-gray-200 dark:to-gray-900 opacity-50" />
      <CursorEffect />
      <Header />
      <MainHome />
      <About />
      <Skills />
      <Projects />
      <Experience />
      <Education />
      <Contact />
      <Footer />
      <BackToTopButton />
    </div>
  );
}
