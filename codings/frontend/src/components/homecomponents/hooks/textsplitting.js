import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

const useRepeatScrollTextSplitting = ({
  threshold = 0.1,
  headingStagger = 0.03,
  headingDuration = 1,
  headingEase = "power4.out",
} = {}) => {
  const headingContainerRef = useRef(null);
  const textRef = useRef(null);
  const [isAnimationComplete, setIsAnimationComplete] = useState(false);
  const [headingVisible, setHeadingVisible] = useState(false);
  const lastHeadingY = useRef(0);
  const headingTimeline = useRef(null);
  const headingPrepared = useRef(false);

  // Prepare heading elements
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

    // Reset animation complete state
    setIsAnimationComplete(false);

    const headings = headingContainerRef.current.querySelectorAll(
      "h1, h2, h3, h4, h5, h6"
    );
    headingTimeline.current = gsap.timeline({
      onComplete: () => {
        // Set animation complete when timeline finishes
        setIsAnimationComplete(true);
      },
    });

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

  // Prepare elements on mount
  useEffect(() => {
    prepareHeadingElements();

    return () => {
      // Clean up any animations
      if (headingTimeline.current) headingTimeline.current.kill();
    };
  }, []);

  // Intersection observer for headings
  useEffect(() => {
    const headingObserver = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;

        if (entry.isIntersecting) {
          const currentY = entry.boundingClientRect.y;
          const isScrollingDown = currentY < lastHeadingY.current;

          lastHeadingY.current = currentY;

          if (isScrollingDown || lastHeadingY.current === 0) {
            setHeadingVisible(true);
          }
        } else {
          setHeadingVisible(false);
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

  // Trigger animation when visible
  useEffect(() => {
    if (headingVisible) {
      animateHeading();
    }
  }, [headingVisible]);

  return {
    headingContainerRef,
    textRef,
    isAnimationComplete,
  };
};

export default useRepeatScrollTextSplitting;
