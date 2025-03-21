// useScrollAnimation.js
import { useEffect, useRef } from "react";

export function useScrollAnimation(options = {}) {
  const elementRef = useRef(null);

  const {
    startTrigger = 0.9, // 90% down the viewport
    endTrigger = 0.4, // 40% down the viewport
    startY = 200, // Starting Y offset
    endY = 0, // Ending Y offset
  } = options;

  useEffect(() => {
    const targetElement = elementRef.current;
    if (!targetElement) return;

    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const triggerStart = windowHeight * startTrigger;
      const triggerEnd = windowHeight * endTrigger;

      const elementTop = targetElement.getBoundingClientRect().top;

      let progress = 0;

      if (elementTop <= triggerStart && elementTop >= triggerEnd) {
        progress = (triggerStart - elementTop) / (triggerStart - triggerEnd);
        progress = Math.min(1, Math.max(0, progress));
      } else if (elementTop < triggerEnd) {
        progress = 1;
      }

      const yValue = startY - progress * (startY - endY);
      targetElement.style.transform = `translateY(${yValue}px)`;
      targetElement.style.opacity = progress;
    };

    // Initial calculation
    handleScroll();

    // Add scroll listener
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [startTrigger, endTrigger, startY, endY]);

  return elementRef;
}
