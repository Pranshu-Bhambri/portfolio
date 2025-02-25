'use client'

import { useState, useEffect } from "react"
import styles from '../css/CursorEffect.module.css';

const CursorEffect = () => {

    const [cursorPos, setCursorPos] = useState({ x: -30, y: -30 });

    useEffect(() => {
      const handleMouseMove = (e: MouseEvent) => {
        setCursorPos({ x: e.clientX, y: e.clientY });
      };
  
      window.addEventListener("mousemove", handleMouseMove);
      return () => window.removeEventListener("mousemove", handleMouseMove);
    }, []);

    return (
        <div className={styles.cursorGlow} 
        style={{ top: cursorPos.y - 30, left: cursorPos.x - 30 }}>
        </div>
    );
}

export default CursorEffect;