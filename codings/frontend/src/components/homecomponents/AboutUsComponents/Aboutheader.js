import { useState, useEffect } from "react";

export default function AboutUsHeader() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Set a small delay before animations start
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  const handleScroll = () => {
    window.scrollBy({
      top: window.innerHeight,
      behavior: "smooth",
    });
  };

  return (
    <div className="relative flex flex-col h-screen bg-black text-white overflow-hidden">
      {/* Content container */}
      <div className="flex flex-row h-full w-full">
        {/* Left side - Text content */}
        <div className="flex-1 flex flex-col justify-center pl-12 md:pl-24">
          <h1
            className={`text-6xl font-bold mb-4 transition-all duration-1000 transform ${
              isVisible
                ? "translate-x-0 opacity-100"
                : "-translate-x-12 opacity-0"
            }`}
          >
            About Us
          </h1>

          <ul
            className={`mb-12 transition-all duration-1000 delay-300 transform ${
              isVisible
                ? "translate-x-0 opacity-100"
                : "-translate-x-12 opacity-0"
            }`}
          >
            <li className="flex items-center mb-2">
              <div className="w-2 h-2 bg-white rounded-full mr-2"></div>
              <span>Who we are</span>
            </li>
          </ul>

          <h2
            className={`text-4xl font-light mb-12 transition-all duration-1000 delay-500 transform ${
              isVisible
                ? "translate-x-0 opacity-100"
                : "-translate-x-12 opacity-0"
            }`}
          >
            Where passion meets
            <br />
            programming
          </h2>
        </div>

        {/* Right side - Kept empty but maintaining the space */}
        <div className="flex-1"></div>
      </div>

      {/* Scroll indicator with animations */}
      <div
        className={`absolute bottom-12 left-1/2 transform -translate-x-1/2 cursor-pointer transition-all duration-1000 delay-1000 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
        onClick={handleScroll}
      >
        <div className="text-xl mb-2">Scroll</div>
        <div className="relative h-12 flex justify-center">
          {/* Static line */}
          <div className="w-0.5 h-12 bg-white opacity-30"></div>

          {/* Animated line */}
          <div className="absolute top-0 w-0.5 bg-white animate-pulse">
            <div className="w-full animate-scrollDown"></div>
          </div>
        </div>
      </div>

      {/* Adding animation keyframes */}
      <style jsx>{`
        @keyframes scrollDown {
          0% {
            height: 0;
            top: 0;
            opacity: 1;
          }
          100% {
            height: 100%;
            top: 0;
            opacity: 0.5;
          }
        }

        .animate-scrollDown {
          animation: scrollDown 1.5s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
