import React, { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

// Array of logo images (replace with actual paths)
const logos = [
  "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg",
  "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg",
  "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg",
  "https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg",
  "https://upload.wikimedia.org/wikipedia/commons/0/05/Facebook_Logo_%282019%29.png",
  "https://upload.wikimedia.org/wikipedia/commons/b/bd/Tesla_Motors.svg",
];

function LogoDisplay() {
  const controls = useAnimation();
  const { ref, inView } = useInView({ triggerOnce: false, threshold: 0.1 });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    } else {
      controls.start("hidden");
    }
  }, [controls, inView]);

  return (
    <div className="logo-display-container" ref={ref}>
      {/* Wrapped the title inside a div to apply full width and proper alignment */}
      <div className="title-container">
        <h4 className="logo-display-title">Our students got placed at :</h4>
      </div>

      <div className="logo-grid">
        {logos.map((logo, index) => (
          <motion.img
            key={index}
            src={logo}
            alt="Company Logo"
            className="logo-img"
            initial="hidden"
            animate={controls}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            variants={{
              hidden: { opacity: 0, x: -50 },
              visible: { opacity: 1, x: 0 },
            }}
          />
        ))}
      </div>

      <style jsx>{`
        .logo-display-container {
          text-align: center;
          margin: 100px 0;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        /* New container to make sure the title aligns properly */
        .title-container {
          width: 100%; /* Ensures it spans the full width */
          text-align: left; /* Forces left alignment */
          padding-left: 3%; /* Adjusts positioning from the left */
        }

        .logo-display-title {
          font-size: 65px;
          font-weight: 100;
          margin-bottom: 80px;
          /* Removed text-align: left since it's now handled in .title-container */
        }

        .logo-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          justify-content: center;
          align-items: center;
          gap: 40px;
          padding: 10px;
          max-width: 80%;
        }

        .logo-img {
          height: 73px;
          width: auto;
          max-width: 100%;
        }

        @media (max-width: 992px) {
          .logo-display-title {
            font-size: 22px;
          }
          .logo-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 576px) {
          .logo-display-title {
            font-size: 18px;
          }
          .logo-grid {
            grid-template-columns: repeat(1, 1fr);
          }
        }
      `}</style>
    </div>
  );
}

export default LogoDisplay;
