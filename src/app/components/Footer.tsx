import styles from '../css/Layout.module.css';
// import { useSidebar } from '../context/SidebarContext';
// import { useMain } from '../context/MainContext';

const Footer = () => {
  // const { sidebarOpen } = useSidebar();
  // const { contentWidth, contentHeight } = useMain();

  return (
    // <footer className={`p-4 mt-auto text-center ${!sidebarOpen ? 'border-t border-gray-950/5 dark:border-white/10' : ''} ${(contentWidth < 1024 || contentHeight < 575) ? 'mt-[120px]' : ''}`}>
    // <footer className={`p-4 mt-[120px] text-center ${!sidebarOpen ? 'border-t border-gray-950/5 dark:border-white/10' : ''}`}>
    <footer className={`p-4 mt-[120px] text-center border-t border-gray-950/5 dark:border-white/10`}>
        <p>Created by <span className={`${styles.logoText} font-agustina px-2`}>Pranshu Bhambri</span> | © All Rights Reserved</p>
    </footer>
  )
}

export default Footer
