import { useEffect, useRef } from "react";
import gsap from "gsap";

const AnimatedButton = ({ label }) => {
  const buttonRef = useRef(null);
  const flairRef = useRef(null);

  useEffect(() => {
    const button = buttonRef.current;
    const flair = flairRef.current;

    if (!button || !flair) return;

    const xSet = gsap.quickSetter(flair, "xPercent");
    const ySet = gsap.quickSetter(flair, "yPercent");

    const getXY = (e) => {
      const { left, top, width, height } = button.getBoundingClientRect();

      return {
        x: ((e.clientX - left) / width) * 100,
        y: ((e.clientY - top) / height) * 100,
      };
    };

    const onMouseEnter = (e) => {
      const { x, y } = getXY(e);
      xSet(x);
      ySet(y);
      gsap.to(flair, { scale: 1, duration: 0.4, ease: "power2.out" });
    };

    const onMouseLeave = (e) => {
      gsap.to(flair, { scale: 0, duration: 0.3, ease: "power2.out" });
    };

    const onMouseMove = (e) => {
      const { x, y } = getXY(e);
      gsap.to(flair, {
        xPercent: x,
        yPercent: y,
        duration: 0.4,
        ease: "power2",
      });
    };

    button.addEventListener("mouseenter", onMouseEnter);
    button.addEventListener("mouseleave", onMouseLeave);
    button.addEventListener("mousemove", onMouseMove);

    return () => {
      button.removeEventListener("mouseenter", onMouseEnter);
      button.removeEventListener("mouseleave", onMouseLeave);
      button.removeEventListener("mousemove", onMouseMove);
    };
  }, []);

  // Styles
  const buttonStyle = {
    position: "relative",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "15px 30px",
    borderRadius: "50px",
    fontSize: "18px",
    fontWeight: "bold",
    cursor: "pointer",
    textDecoration: "none",
    color: "#fff",
    backgroundColor: "transparent",
    border: "2px solid white",
    overflow: "hidden",
  };

  const flairStyle = {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "white",
    borderRadius: "50%",
    transform: "scale(0)",
    transition: "transform 0.3s ease-out",
  };

  return (
    <a href="#" ref={buttonRef} style={buttonStyle}>
      <span ref={flairRef} style={flairStyle}></span>
      <span style={{ position: "relative", zIndex: 1 }}>{label}</span>
    </a>
  );
};

export default AnimatedButton;
