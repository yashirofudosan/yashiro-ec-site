"use client";

import { useEffect, useState } from "react";

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName.toLowerCase() === 'a' || 
        target.tagName.toLowerCase() === 'button' ||
        target.closest('a') ||
        target.closest('button')
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, []);

  return (
    <>
      <div 
        className={`custom-cursor-dot ${isHovering ? 'hovering' : ''}`}
        style={{ left: `${position.x}px`, top: `${position.y}px` }}
      />
      <div 
        className={`custom-cursor-ring ${isHovering ? 'hovering' : ''}`}
        style={{ left: `${position.x}px`, top: `${position.y}px` }}
      />
      <style jsx global>{`
        body {
          cursor: none; /* Hide default cursor */
        }
        
        /* Ensure normal cursor on mobile */
        @media (max-width: 768px) {
          body { cursor: auto; }
          .custom-cursor-dot, .custom-cursor-ring { display: none !important; }
        }

        .custom-cursor-dot {
          position: fixed;
          width: 6px;
          height: 6px;
          background-color: var(--text-primary);
          border-radius: 50%;
          transform: translate(-50%, -50%);
          pointer-events: none;
          z-index: 10000;
          transition: width 0.3s cubic-bezier(0.16, 1, 0.3, 1), height 0.3s cubic-bezier(0.16, 1, 0.3, 1), background-color 0.3s ease;
        }

        .custom-cursor-ring {
          position: fixed;
          width: 30px;
          height: 30px;
          border: 1px solid rgba(255, 255, 255, 0.3);
          border-radius: 50%;
          transform: translate(-50%, -50%);
          pointer-events: none;
          z-index: 9999;
          transition: width 0.4s cubic-bezier(0.16, 1, 0.3, 1), height 0.4s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.4s ease;
          transition-property: width, height, border-color;
        }

        /* Hover states */
        .custom-cursor-dot.hovering {
          width: 0;
          height: 0;
          background-color: transparent;
        }

        .custom-cursor-ring.hovering {
          width: 50px;
          height: 50px;
          border-color: var(--text-primary);
          background-color: rgba(255, 255, 255, 0.05); /* very subtle fill */
          backdrop-filter: invert(10%);
        }
      `}</style>
    </>
  );
}
