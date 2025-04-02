"use client";

import { useState, useRef } from "react";

// This component can now accept course data as props
export default function CourseDetails({
  courseTitle = "PythonDeveloper Course",
  courseSubtitle = "Master Python programming and build real-world applications with industry best practices",
  badgeText = "Professional Certification",
  primaryColor = "#ff996e", // Base color for the course
  secondaryColor = "#ff7e47", // Secondary color for gradients
  icon = "python", // Icon identifier
  learningItems = [],
  learningMethods = [],
  modules = [],
  testimonials = [],
}) {
  const [activeModule, setActiveModule] = useState(0);
  const headerRef = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Handle mouse move effect in the header
  const handleMouseMove = (e) => {
    const header = headerRef.current;
    if (!header) return;

    const rect = header.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setMousePosition({ x, y });
  };

  // Render the appropriate icon based on the course type
  const renderIcon = () => {
    if (icon === "python") {
      return (
        <svg
          viewBox="0 0 128 128"
          style={{
            transform: `translate(${mousePosition.x * 0.01}px, ${
              mousePosition.y * 0.01
            }px) rotate(${mousePosition.x * 0.01}deg)`,
          }}
        >
          <linearGradient
            id="python-original-a"
            gradientUnits="userSpaceOnUse"
            x1="70.252"
            y1="1237.476"
            x2="170.659"
            y2="1151.089"
            gradientTransform="matrix(.563 0 0 -.568 -29.215 707.817)"
          >
            <stop offset="0" stopColor="#5A9FD4" />
            <stop offset="1" stopColor="#306998" />
          </linearGradient>
          <linearGradient
            id="python-original-b"
            gradientUnits="userSpaceOnUse"
            x1="209.474"
            y1="1098.811"
            x2="173.62"
            y2="1149.537"
            gradientTransform="matrix(.563 0 0 -.568 -29.215 707.817)"
          >
            <stop offset="0" stopColor="#FFD43B" />
            <stop offset="1" stopColor="#FFE873" />
          </linearGradient>
          <path
            fill="url(#python-original-a)"
            d="M63.391 1.988c-4.222.02-8.252.379-11.8 1.007-10.45 1.846-12.346 5.71-12.346 12.837v9.411h24.693v3.137H29.977c-7.176 0-13.46 4.313-15.426 12.521-2.268 9.405-2.368 15.275 0 25.096 1.755 7.311 5.947 12.519 13.124 12.519h8.491V67.234c0-8.151 7.051-15.34 15.426-15.34h24.665c6.866 0 12.346-5.654 12.346-12.548V15.833c0-6.693-5.646-11.72-12.346-12.837-4.244-.706-8.645-1.027-12.866-1.008zM50.037 9.557c2.55 0 4.634 2.117 4.634 4.721 0 2.593-2.083 4.69-4.634 4.69-2.56 0-4.633-2.097-4.633-4.69-.001-2.604 2.073-4.721 4.633-4.721z"
            transform="translate(0 10.26)"
          />
          <path
            fill="url(#python-original-b)"
            d="M91.682 28.38v10.966c0 8.5-7.208 15.655-15.426 15.655H51.591c-6.756 0-12.346 5.783-12.346 12.549v23.515c0 6.691 5.818 10.628 12.346 12.547 7.816 2.297 15.312 2.713 24.665 0 6.216-1.801 12.346-5.423 12.346-12.547v-9.412H63.938v-3.138h37.012c7.176 0 9.852-5.005 12.348-12.519 2.578-7.735 2.467-15.174 0-25.096-1.774-7.145-5.161-12.521-12.348-12.521h-9.268zM77.809 87.927c2.561 0 4.634 2.097 4.634 4.692 0 2.602-2.074 4.719-4.634 4.719-2.55 0-4.633-2.117-4.633-4.719 0-2.595 2.083-4.692 4.633-4.692z"
            transform="translate(0 10.26)"
          />
        </svg>
      );
    } else if (icon === "data") {
      return (
        <svg
          viewBox="0 0 128 128"
          style={{
            transform: `translate(${mousePosition.x * 0.01}px, ${
              mousePosition.y * 0.01
            }px) rotate(${mousePosition.x * 0.01}deg)`,
          }}
        >
          <g>
            <circle cx="64" cy="64" r="56" fill="#f9a03c" />
            <path
              fill="#ffffff"
              d="M103.3,64c0,21.7-17.6,39.3-39.3,39.3S24.7,85.7,24.7,64S42.3,24.7,64,24.7S103.3,42.3,103.3,64z"
            />
            <circle cx="64" cy="43" r="9" fill="#f9a03c" />
            <circle cx="43" cy="76" r="9" fill="#f9a03c" />
            <circle cx="85" cy="76" r="9" fill="#f9a03c" />
            <path fill="#f9a03c" d="M67,46l-18,27 M61,46l18,27 M45,73h36" />
          </g>
        </svg>
      );
    } else if (icon === "mern") {
      return (
        <svg
          viewBox="0 0 128 128"
          style={{
            transform: `translate(${mousePosition.x * 0.01}px, ${
              mousePosition.y * 0.01
            }px) rotate(${mousePosition.x * 0.01}deg)`,
          }}
        >
          <g>
            <circle cx="64" cy="64" r="56" fill="#83cd29" />
            <path
              fill="#ffffff"
              d="M64,15.8c-2.5,0-5,0.6-7.1,1.9L36.3,30.9c-4.3,2.5-7.1,7.1-7.1,12.1v28.2c0,5,2.8,9.6,7.1,12.1l20.6,13.2c2.1,1.2,4.6,1.9,7.1,1.9s5-0.6,7.1-1.9l20.6-13.2c4.3-2.5,7.1-7.1,7.1-12.1V43c0-5-2.8-9.6-7.1-12.1L71.1,17.7C69,16.4,66.5,15.8,64,15.8z M67.7,43.6c0.4,0,0.9,0.1,1.3,0.3c1.5,0.8,1.9,2.6,1.2,3.9l-22.1,38.8c-0.3,0.6-0.9,1-1.5,1.2c-0.2,0.1-0.5,0.1-0.7,0.1c-0.4,0-0.9-0.1-1.3-0.3c-0.8-0.4-1.3-1.2-1.4-2.1c-0.1-0.9,0.2-1.8,0.9-2.4l22.1-38.8C66.5,44,67,43.6,67.7,43.6z M57.5,59.7c0-1.7,1.3-3,3-3s3,1.3,3,3v22.6c0,1.7-1.3,3-3,3s-3-1.3-3-3V59.7z M73.5,59.7c0-1.7,1.3-3,3-3s3,1.3,3,3v22.6c0,1.7-1.3,3-3,3s-3-1.3-3-3V59.7z"
            />
          </g>
        </svg>
      );
    }
    // Default icon or placeholder if no match
    return (
      <div
        style={{
          backgroundColor: primaryColor,
          borderRadius: "50%",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
          fontSize: "30px",
          transform: `translate(${mousePosition.x * 0.01}px, ${
            mousePosition.y * 0.01
          }px)`,
        }}
      >
        {courseTitle.charAt(0)}
      </div>
    );
  };

  return (
    <div className="course-container">
      <div
        className="course-header"
        ref={headerRef}
        onMouseMove={handleMouseMove}
        style={{
          background: `linear-gradient(135deg, ${primaryColor} 0%, ${secondaryColor} 100%)`,
        }}
      >
        <div className="header-content">
          <div className="badge">{badgeText}</div>
          <h1>{courseTitle}</h1>
          <p>{courseSubtitle}</p>
          <button className="enroll-button" style={{ color: primaryColor }}>
            Enroll Now
          </button>

          <div
            className="decorative-circle circle-1"
            style={{
              transform: `translate(${mousePosition.x * 0.02}px, ${
                mousePosition.y * 0.02
              }px)`,
            }}
          ></div>
          <div
            className="decorative-circle circle-2"
            style={{
              transform: `translate(${mousePosition.x * -0.01}px, ${
                mousePosition.y * -0.01
              }px)`,
            }}
          ></div>
          <div
            className="decorative-circle circle-3"
            style={{
              transform: `translate(${mousePosition.x * 0.03}px, ${
                mousePosition.y * 0.03
              }px)`,
            }}
          ></div>

          <div className="course-icon">{renderIcon()}</div>
        </div>
      </div>

      {learningItems.length > 0 && (
        <section className="what-you-learn">
          <h2 style={{ color: "#333" }}>
            <span style={{ borderBottom: `4px solid ${primaryColor}` }}>
              What You Will Learn
            </span>
          </h2>
          <div className="learning-grid">
            {learningItems.map((item, index) => (
              <div
                className="learning-item"
                key={index}
                style={{ borderBottomColor: primaryColor }}
              >
                <div className="icon">{item.icon}</div>
                <h3 style={{ color: primaryColor }}>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {learningMethods.length > 0 && (
        <section className="how-you-learn">
          <h2 style={{ color: "#333" }}>
            <span style={{ borderBottom: `4px solid ${primaryColor}` }}>
              How You Will Learn
            </span>
          </h2>
          <div className="learning-method">
            {learningMethods.map((method, index) => (
              <div className="method-item" key={index}>
                <div
                  className="method-marker"
                  style={{ backgroundColor: primaryColor }}
                ></div>
                <h3 style={{ color: primaryColor }}>{method.title}</h3>
                <p>{method.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {modules.length > 0 && (
        <section className="modules">
          <h2 style={{ color: "#333" }}>
            <span style={{ borderBottom: `4px solid ${primaryColor}` }}>
              Course Modules
            </span>
          </h2>
          <div className="modules-container">
            <div className="modules-list">
              {modules.map((module, index) => (
                <div
                  key={index}
                  className={`module-item ${
                    activeModule === index ? "active" : ""
                  }`}
                  onClick={() => setActiveModule(index)}
                  style={
                    activeModule === index
                      ? { backgroundColor: primaryColor }
                      : {}
                  }
                >
                  <h3>{module.title}</h3>
                  <span className="duration">{module.duration}</span>
                </div>
              ))}
            </div>
            <div className="module-details">
              <h3 style={{ color: primaryColor }}>
                {modules[activeModule].title}
              </h3>
              <p className="duration">{modules[activeModule].duration}</p>
              <ul>
                {modules[activeModule].topics.map((topic, index) => (
                  <li key={index} className="topic-item">
                    <span
                      className="topic-marker"
                      style={{ backgroundColor: primaryColor }}
                    ></span>
                    {topic}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      )}

      {testimonials.length > 0 && (
        <section className="testimonials">
          <h2 style={{ color: "#333" }}>
            <span style={{ borderBottom: `4px solid ${primaryColor}` }}>
              Student Success Stories
            </span>
          </h2>
          <div className="testimonial-grid">
            {testimonials.map((testimonial, index) => (
              <div className="testimonial-card" key={index}>
                <div className="testimonial-content">
                  <p>"{testimonial.quote}"</p>
                </div>
                <div className="testimonial-author">
                  <div
                    className="author-avatar"
                    style={{ backgroundColor: primaryColor }}
                  >
                    {testimonial.initials}
                  </div>
                  <div className="author-info">
                    <h4>{testimonial.name}</h4>
                    <p>{testimonial.title}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      <style jsx>{`
        .course-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 20px;
          font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
          color: #333;
          background-color: #f9f9f9;
        }

        .course-header {
          position: relative;
          text-align: center;
          padding: 80px 20px;
          color: white;
          border-radius: 16px;
          margin-bottom: 60px;
          overflow: hidden;
          box-shadow: 0 15px 30px rgba(0, 0, 0, 0.2);
          transition: all 0.3s ease;
        }

        .course-header:hover {
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
        }

        .header-content {
          position: relative;
          z-index: 2;
        }

        .badge {
          display: inline-block;
          background-color: rgba(255, 255, 255, 0.2);
          padding: 8px 16px;
          border-radius: 30px;
          font-size: 0.9rem;
          font-weight: 600;
          margin-bottom: 20px;
          backdrop-filter: blur(5px);
        }

        .course-header h1 {
          font-size: 3rem;
          margin-bottom: 20px;
          font-weight: 800;
          text-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        }

        .course-header p {
          font-size: 1.3rem;
          margin-bottom: 40px;
          max-width: 700px;
          margin-left: auto;
          margin-right: auto;
          line-height: 1.6;
        }

        .enroll-button {
          background-color: white;
          border: none;
          padding: 16px 36px;
          font-size: 1.1rem;
          font-weight: bold;
          border-radius: 50px;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
        }

        .enroll-button:hover {
          transform: translateY(-5px);
          box-shadow: 0 15px 30px rgba(0, 0, 0, 0.15);
        }

        .decorative-circle {
          position: absolute;
          border-radius: 50%;
          opacity: 0.15;
          transition: transform 0.1s ease-out;
          background-color: white;
        }

        .circle-1 {
          width: 300px;
          height: 300px;
          top: -100px;
          right: -100px;
        }

        .circle-2 {
          width: 200px;
          height: 200px;
          bottom: -50px;
          left: -50px;
        }

        .circle-3 {
          width: 150px;
          height: 150px;
          top: 50%;
          left: 20%;
        }

        .course-icon {
          position: absolute;
          width: 180px;
          height: 180px;
          right: 10%;
          bottom: -30px;
          opacity: 0.8;
          transition: transform 0.1s ease-out;
        }

        section {
          margin-bottom: 80px;
          padding: 20px;
        }

        h2 {
          font-size: 2.2rem;
          margin-bottom: 40px;
          text-align: center;
          position: relative;
          padding-bottom: 15px;
        }

        h2 span {
          padding-bottom: 15px;
        }

        .learning-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 30px;
        }

        .learning-item {
          background-color: white;
          padding: 40px 30px;
          border-radius: 16px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
          transition: all 0.3s ease;
          border-bottom: 5px solid transparent;
        }

        .learning-item:hover {
          transform: translateY(-15px);
        }

        .icon {
          font-size: 3rem;
          margin-bottom: 25px;
        }

        .learning-item h3 {
          font-size: 1.4rem;
          margin-bottom: 15px;
        }

        .learning-method {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 30px;
        }

        .method-item {
          background-color: white;
          padding: 40px 30px;
          border-radius: 16px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }

        .method-item .method-marker {
          position: absolute;
          top: 0;
          left: 0;
          width: 5px;
          height: 100%;
          transition: all 0.3s ease;
        }

        .method-item:hover .method-marker {
          width: 10px;
        }

        .method-item h3 {
          font-size: 1.4rem;
          margin-bottom: 15px;
        }

        .modules-container {
          display: grid;
          grid-template-columns: 1fr 2fr;
          gap: 30px;
          background-color: white;
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
        }

        .modules-list {
          background-color: #f8f8f8;
        }

        .module-item {
          padding: 25px;
          border-bottom: 1px solid #eee;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .module-item:hover {
          background-color: #f0f0f0;
        }

        .module-item.active {
          color: white;
          position: relative;
        }

        .module-item.active:after {
          content: "";
          position: absolute;
          right: -15px;
          top: 50%;
          transform: translateY(-50%);
          border-width: 15px 0 15px 15px;
          border-style: solid;
          border-color: transparent transparent transparent currentColor;
        }

        .module-item h3 {
          font-size: 1.2rem;
          margin-bottom: 8px;
        }

        .duration {
          font-size: 0.9rem;
          color: inherit;
          opacity: 0.8;
        }

        .module-details {
          padding: 40px;
        }

        .module-details h3 {
          font-size: 1.6rem;
          margin-bottom: 15px;
        }

        .module-details ul {
          margin-top: 25px;
          padding-left: 20px;
          list-style-type: none;
        }

        .topic-item {
          margin-bottom: 15px;
          position: relative;
          padding-left: 20px;
          line-height: 1.6;
        }

        .topic-marker {
          position: absolute;
          left: 0;
          top: 10px;
          width: 8px;
          height: 8px;
          border-radius: 50%;
        }

        .testimonials {
          padding: 40px 20px;
        }

        .testimonial-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 30px;
        }

        .testimonial-card {
          background-color: white;
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
          transition: all 0.3s ease;
        }

        .testimonial-card:hover {
          transform: translateY(-10px);
          box-shadow: 0 15px 40px rgba(0, 0, 0, 0.1);
        }

        .testimonial-content {
          padding: 30px;
          position: relative;
        }

        .testimonial-content:before {
          content: '"';
          position: absolute;
          top: 10px;
          left: 20px;
          font-size: 5rem;
          opacity: 0.2;
          font-family: Georgia, serif;
        }

        .testimonial-content p {
          position: relative;
          z-index: 1;
          line-height: 1.8;
        }

        .testimonial-author {
          display: flex;
          align-items: center;
          padding: 20px 30px;
          background-color: #f8f8f8;
        }

        .author-avatar {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: bold;
          margin-right: 15px;
        }

        .author-info h4 {
          margin: 0;
          font-size: 1.1rem;
        }

        .author-info p {
          margin: 5px 0 0;
          font-size: 0.9rem;
          opacity: 0.7;
        }

        @media (max-width: 768px) {
          .modules-container {
            grid-template-columns: 1fr;
          }

          .course-header {
            padding: 60px 20px;
          }

          .course-header h1 {
            font-size: 2.2rem;
          }

          .module-item.active:after {
            display: none;
          }

          .course-icon {
            width: 120px;
            height: 120px;
            right: 5%;
            bottom: -20px;
          }
        }
      `}</style>
    </div>
  );
}
