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
          <motion.div
            key={index}
            className="logo-item"
            initial="hidden"
            animate={controls}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            variants={{
              hidden: { opacity: 0, x: -50 },
              visible: { opacity: 1, x: 0 },
            }}
          >
            <img
              src={logo}
              alt={`Company Logo ${index + 1}`}
              className="logo-img"
            />
          </motion.div>
        ))}
      </div>

      <style jsx>{`
        .logo-display-container {
          text-align: center;
          margin: 60px 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          width: 100%;
          padding: 0 20px;
          box-sizing: border-box;
        }

        /* Title container with responsive padding */
        .title-container {
          width: 100%;
          text-align: left;
          padding-left: 3%;
          margin-bottom: 40px;
        }

        .logo-display-title {
          font-size: 65px;
          font-weight: 100;
          margin-bottom: 30px;
          line-height: 1.2;
        }

        .logo-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          justify-content: center;
          align-items: center;
          gap: 40px;
          width: 100%;
          max-width: 1200px;
        }

        .logo-item {
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 15px;
          transition: transform 0.3s ease;
        }

        .logo-item:hover {
          transform: scale(1.05);
        }

        .logo-img {
          height: 73px;
          width: auto;
          max-width: 100%;
          object-fit: contain;
        }

        /* Large Devices (laptops/desktops) */
        @media (max-width: 1200px) {
          .logo-display-title {
            font-size: 55px;
          }

          .logo-grid {
            gap: 30px;
            max-width: 90%;
          }

          .logo-img {
            height: 65px;
          }
        }

        /* Medium Devices (tablets) */
        @media (max-width: 992px) {
          .logo-display-container {
            margin: 50px 0;
          }

          .title-container {
            margin-bottom: 30px;
          }

          .logo-display-title {
            font-size: 40px;
            margin-bottom: 20px;
          }

          .logo-grid {
            grid-template-columns: repeat(3, 1fr);
            gap: 25px;
          }

          .logo-img {
            height: 60px;
          }
        }

        /* Small Devices (landscape phones) */
        @media (max-width: 768px) {
          .logo-display-container {
            margin: 40px 0;
          }

          .title-container {
            padding-left: 5%;
          }

          .logo-display-title {
            font-size: 30px;
          }

          .logo-grid {
            grid-template-columns: repeat(3, 1fr);
            gap: 20px;
          }

          .logo-item {
            padding: 10px;
          }

          .logo-img {
            height: 45px;
          }
        }

        /* Extra Small Devices (portrait phones) */
        @media (max-width: 576px) {
          .logo-display-container {
            margin: 30px 0;
            padding: 0 15px;
          }

          .title-container {
            margin-bottom: 20px;
          }

          .logo-display-title {
            font-size: 24px;
            margin-bottom: 15px;
          }

          .logo-grid {
            grid-template-columns: repeat(3, 1fr);
            gap: 15px;
            width: 100%;
          }

          .logo-img {
            height: 35px;
          }
        }

        /* Very Small Devices */
        @media (max-width: 400px) {
          .logo-display-title {
            font-size: 20px;
          }

          .logo-grid {
            grid-template-columns: repeat(3, 1fr);
            gap: 10px;
          }

          .logo-img {
            height: 30px;
          }
        }
      `}</style>
    </div>
  );
}

export default LogoDisplay;
