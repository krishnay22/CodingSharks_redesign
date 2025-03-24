import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

/**
 * Custom hook for heading text splitting animations that repeat when scrolling down
 * @param {Object} options - Configuration options
 * @param {number} options.threshold - Intersection threshold (0 to 1)
 * @param {number} options.headingStagger - Stagger time between heading characters
 * @param {number} options.headingDuration - Duration of heading animation
 * @param {string} options.headingEase - GSAP easing for heading animation
 * @returns {Object} - Ref objects to attach to your elements
 */
const useHeadingTextSplitting = ({
  threshold = 0.1,
  headingStagger = 0.03,
  headingDuration = 1,
  headingEase = "power4.out",
} = {}) => {
  const headingContainerRef = useRef(null);
  const [headingVisible, setHeadingVisible] = useState(false);
  const lastHeadingY = useRef(0); // Track the Y position of the heading
  const headingTimeline = useRef(null);
  const headingPrepared = useRef(false);

  // Prepare heading elements (split text) when component mounts
  useEffect(() => {
    prepareHeadingElements();

    return () => {
      // Clean up any animations
      if (headingTimeline.current) headingTimeline.current.kill();
    };
  }, []);

  // Function to prepare heading elements by splitting text
  const prepareHeadingElements = () => {
    if (!headingContainerRef.current || headingPrepared.current) return;

    const headings = headingContainerRef.current.querySelectorAll(
      "h1, h2, h3, h4, h5, h6"
    );

    headings.forEach((heading) => {
      const headingText = heading.innerText;
      heading.innerHTML = "";

      const words = headingText.split(" ");
      words.forEach((word, wordIndex) => {
        const wordSpan = document.createElement("span");
        wordSpan.className = "heading-word";
        wordSpan.style.display = "inline-block";

        [...word].forEach((char) => {
          const charWrapper = document.createElement("span");
          charWrapper.className = "char-wrapper";
          charWrapper.style.overflow = "hidden";

          const charSpan = document.createElement("span");
          charSpan.className = "heading-char";
          charSpan.innerText = char;
          charSpan.style.display = "inline-block";
          charSpan.style.transform = "translateY(100%)";

          charWrapper.appendChild(charSpan);
          wordSpan.appendChild(charWrapper);
        });

        heading.appendChild(wordSpan);

        // Add space between words
        if (wordIndex < words.length - 1) {
          const spaceSpan = document.createElement("span");
          spaceSpan.innerHTML = "&nbsp;";
          spaceSpan.style.display = "inline-block";
          heading.appendChild(spaceSpan);
        }
      });
    });

    headingPrepared.current = true;
  };

  // Animate the heading elements
  const animateHeading = () => {
    if (!headingContainerRef.current || !headingPrepared.current) return;

    // Reset any previous animation
    if (headingTimeline.current) {
      headingTimeline.current.kill();
    }

    const headings = headingContainerRef.current.querySelectorAll(
      "h1, h2, h3, h4, h5, h6"
    );
    headingTimeline.current = gsap.timeline();

    headings.forEach((heading, index) => {
      const chars = heading.querySelectorAll(".heading-char");

      // Reset chars position first
      gsap.set(chars, { y: "100%" });

      // Animate them in
      headingTimeline.current.to(
        chars,
        {
          y: 0,
          duration: headingDuration,
          stagger: headingStagger,
          ease: headingEase,
        },
        index * 0.1
      );
    });
  };

  // Set up intersection observer
  useEffect(() => {
    const headingObserver = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;

        if (entry.isIntersecting) {
          // Check if we're scrolling down by comparing current Y with last Y
          const currentY = entry.boundingClientRect.y;
          const isScrollingDown = currentY < lastHeadingY.current;

          // Update the last Y position
          lastHeadingY.current = currentY;

          // Only animate if scrolling down
          if (isScrollingDown || lastHeadingY.current === 0) {
            setHeadingVisible(true);
          }
        } else {
          setHeadingVisible(false);
          // Update the last Y position when leaving view too
          lastHeadingY.current = entry.boundingClientRect.y;
        }
      },
      { threshold }
    );

    if (headingContainerRef.current) {
      headingObserver.observe(headingContainerRef.current);
    }

    return () => {
      if (headingContainerRef.current) {
        headingObserver.unobserve(headingContainerRef.current);
      }
    };
  }, [threshold]);

  // Run animation when visibility changes
  useEffect(() => {
    if (headingVisible) {
      animateHeading();
    }
  }, [headingVisible, headingDuration, headingStagger, headingEase]);

  return { headingContainerRef };
};

export default useHeadingTextSplitting;
