"use client";

import { useState, useRef } from "react";

export default function MERNStackCourseDetails() {
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

  return (
    <div className="course-container">
      <div
        className="course-header"
        ref={headerRef}
        onMouseMove={handleMouseMove}
      >
        <div className="header-content">
          <div className="badge">Professional Certification</div>
          <h1>MERN Stack Developer Course</h1>
          <p>
            Master full-stack JavaScript development and build modern web
            applications with industry best practices
          </p>
          <button className="enroll-button">Enroll Now</button>

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

          <div className="mern-icon">
            <svg
              viewBox="0 0 128 128"
              style={{
                transform: `translate(${mousePosition.x * 0.01}px, ${
                  mousePosition.y * 0.01
                }px) rotate(${mousePosition.x * 0.01}deg)`,
              }}
            >
              <path
                fill="#83CD29"
                d="M112.771 30.334L68.674 4.729c-2.781-1.584-6.402-1.584-9.205 0L14.901 30.334C12.031 31.985 10 35.088 10 38.407v51.142c0 3.319 2.084 6.423 4.954 8.083l11.775 6.688c5.628 2.772 7.617 2.772 10.178 2.772 8.333 0 13.093-5.039 13.093-13.828v-50.49c0-.713-.371-1.774-1.071-1.774h-5.623C42.594 41 41 42.061 41 42.773v50.49c0 3.896-3.524 7.773-10.11 4.48L18.723 90.73c-.424-.23-.723-.693-.723-1.181V38.407c0-.482.555-.966.982-1.213l44.424-25.561c.415-.235 1.025-.235 1.439 0l43.882 25.555c.42.253.272.722.272 1.219v51.142c0 .488.183.963-.232 1.198l-44.086 25.576c-.378.227-.847.227-1.261 0l-11.307-6.749c-.341-.198-.746-.269-1.073-.086-3.146 1.783-3.726 2.02-6.677 3.043-.726.253-1.797.692.41 1.929l14.798 8.754a9.294 9.294 0 004.647 1.246c1.642 0 3.25-.426 4.667-1.246l43.885-25.582c2.87-1.672 4.23-4.764 4.23-8.083V38.407c0-3.319-1.36-6.414-4.229-8.073zM77.91 81.445c-11.726 0-14.309-3.235-15.17-9.066-.1-.628-.633-1.379-1.272-1.379h-5.731c-.709 0-1.279.86-1.279 1.566 0 7.466 4.059 16.512 23.453 16.512 14.039 0 22.088-5.455 22.088-15.109 0-9.572-6.467-12.084-20.082-13.886-13.762-1.819-15.16-2.738-15.16-5.962 0-2.658 1.184-6.203 11.374-6.203 9.105 0 12.461 1.954 13.842 8.091.118.577.645.991 1.24.991h5.754c.354 0 .692-.143.94-.396.24-.272.367-.613.335-.979-.891-10.568-7.912-15.493-22.112-15.493-12.631 0-20.166 5.334-20.166 14.275 0 9.698 7.497 12.378 19.622 13.577 14.505 1.422 15.633 3.542 15.633 6.395 0 4.955-3.978 7.066-13.309 7.066z"
              ></path>
            </svg>
          </div>
        </div>
      </div>

      <section className="what-you-learn">
        <h2>What You Will Learn</h2>
        <div className="learning-grid">
          <div className="learning-item">
            <div className="icon">⚛️</div>
            <h3>Frontend Development</h3>
            <p>
              Master React.js, modern JavaScript (ES6+), state management, and
              responsive UI design
            </p>
          </div>
          <div className="learning-item">
            <div className="icon">🛢️</div>
            <h3>Database Management</h3>
            <p>
              Learn MongoDB schema design, aggregation pipelines, and data
              modeling best practices
            </p>
          </div>
          <div className="learning-item">
            <div className="icon">🔌</div>
            <h3>Backend Development</h3>
            <p>
              Build robust APIs with Node.js, Express, authentication, and
              authorization systems
            </p>
          </div>
          <div className="learning-item">
            <div className="icon">🚀</div>
            <h3>Deployment & DevOps</h3>
            <p>
              Master CI/CD, containerization with Docker, and cloud deployment
              on AWS and Heroku
            </p>
          </div>
        </div>
      </section>

      <section className="how-you-learn">
        <h2>How You Will Learn</h2>
        <div className="learning-method">
          <div className="method-item">
            <h3>Interactive Coding</h3>
            <p>
              Practice MERN stack development in our interactive coding
              environment with real-time feedback and guidance from expert
              instructors.
            </p>
          </div>
          <div className="method-item">
            <h3>Project-Based Learning</h3>
            <p>
              Apply your knowledge by building real-world full-stack
              applications that solve actual problems and showcase your skills
              to potential employers.
            </p>
          </div>
          <div className="method-item">
            <h3>Mentorship</h3>
            <p>
              Get personalized guidance from industry professionals who will
              review your code and provide feedback to accelerate your growth.
            </p>
          </div>
          <div className="method-item">
            <h3>Community Learning</h3>
            <p>
              Join a community of JavaScript developers to collaborate on
              projects, participate in code reviews, and network with peers.
            </p>
          </div>
        </div>
      </section>

      <section className="modules">
        <h2>Course Modules</h2>
        <div className="modules-container">
          <div className="modules-list">
            {modules.map((module, index) => (
              <div
                key={index}
                className={`module-item ${
                  activeModule === index ? "active" : ""
                }`}
                onClick={() => setActiveModule(index)}
              >
                <h3>{module.title}</h3>
                <span className="duration">{module.duration}</span>
              </div>
            ))}
          </div>
          <div className="module-details">
            <h3>{modules[activeModule].title}</h3>
            <p className="duration">{modules[activeModule].duration}</p>
            <ul>
              {modules[activeModule].topics.map((topic, index) => (
                <li key={index}>{topic}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="testimonials">
        <h2>Student Success Stories</h2>
        <div className="testimonial-grid">
          <div className="testimonial-card">
            <div className="testimonial-content">
              <p>
                "This MERN stack course transformed my career. I went from
                knowing basic JavaScript to landing a job as a full-stack
                developer in just 6 months."
              </p>
            </div>
            <div className="testimonial-author">
              <div className="author-avatar">JS</div>
              <div className="author-info">
                <h4>Jennifer S.</h4>
                <p>Full-Stack Developer at TechCorp</p>
              </div>
            </div>
          </div>
          <div className="testimonial-card">
            <div className="testimonial-content">
              <p>
                "The project-based approach helped me build a portfolio that
                impressed employers. I created a complete e-commerce platform
                during the course that I actually launched as a business."
              </p>
            </div>
            <div className="testimonial-author">
              <div className="author-avatar">MR</div>
              <div className="author-info">
                <h4>Michael R.</h4>
                <p>MERN Developer at InnovateSoft</p>
              </div>
            </div>
          </div>
          <div className="testimonial-card">
            <div className="testimonial-content">
              <p>
                "I was able to modernize our company's legacy system after just
                the first few modules. By the end of the course, I had
                completely rebuilt our application using the MERN stack which
                significantly improved performance."
              </p>
            </div>
            <div className="testimonial-author">
              <div className="author-avatar">AT</div>
              <div className="author-info">
                <h4>Alex T.</h4>
                <p>Lead Engineer at AppWorks</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        .course-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 20px;
          margin-top: 1px;
          color: #333;
          background-color: rgb(255, 255, 255);
        }

        .course-header {
          position: relative;
          text-align: center;
          padding: 80px 20px;
          background: linear-gradient(135deg, #61dafb 0%, #764abc 100%);
          color: white;
          border-radius: 16px;
          margin-bottom: 60px;
          overflow: hidden;
          box-shadow: 0 15px 30px rgba(97, 218, 251, 0.3);
          transition: all 0.3s ease;
        }

        .course-header:hover {
          box-shadow: 0 20px 40px rgba(97, 218, 251, 0.4);
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
          color: #764abc;
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
        }

        .circle-1 {
          width: 300px;
          height: 300px;
          background-color: white;
          top: -100px;
          right: -100px;
        }

        .circle-2 {
          width: 200px;
          height: 200px;
          background-color: white;
          bottom: -50px;
          left: -50px;
        }

        .circle-3 {
          width: 150px;
          height: 150px;
          background-color: white;
          top: 50%;
          left: 20%;
        }

        .mern-icon {
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
          color: #333;
        }

        h2:after {
          content: "";
          position: absolute;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 80px;
          height: 4px;
          background-color: #61dafb;
          border-radius: 2px;
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
          border-bottom: 5px solid #61dafb;
        }

        .icon {
          font-size: 3rem;
          margin-bottom: 25px;
        }

        .learning-item h3 {
          font-size: 1.4rem;
          margin-bottom: 15px;
          color: #764abc;
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

        .method-item:before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          width: 5px;
          height: 100%;
          background-color: #61dafb;
          transition: all 0.3s ease;
        }

        .method-item:hover:before {
          width: 10px;
        }

        .method-item h3 {
          font-size: 1.4rem;
          margin-bottom: 15px;
          color: #764abc;
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
          background-color: #764abc;
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
          border-color: transparent transparent transparent #764abc;
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
          color: #764abc;
        }

        .module-details ul {
          margin-top: 25px;
          padding-left: 20px;
        }

        .module-details li {
          margin-bottom: 15px;
          position: relative;
          padding-left: 20px;
          line-height: 1.6;
        }

        .module-details li:before {
          content: "";
          position: absolute;
          left: 0;
          top: 10px;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background-color: #61dafb;
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
          color: #61dafb;
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
          background-color: #764abc;
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

          .mern-icon {
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

// Course module data
const modules = [
  {
    title: "Module 1: JavaScript Fundamentals",
    duration: "3 weeks",
    topics: [
      "Modern JavaScript (ES6+) concepts",
      "Asynchronous JavaScript with Promises and async/await",
      "Functional programming concepts",
      "Arrow functions, destructuring, and spread/rest operators",
      "Error handling and debugging",
      "Working with local storage and browser APIs",
    ],
  },
  {
    title: "Module 2: React.js Frontend Development",
    duration: "4 weeks",
    topics: [
      "React components and JSX syntax",
      "State management with hooks and Context API",
      "Routing with React Router",
      "Form handling and validation",
      "Performance optimization techniques",
      "Testing React applications with Jest and React Testing Library",
    ],
  },
  {
    title: "Module 3: MongoDB & Database Design",
    duration: "3 weeks",
    topics: [
      "NoSQL database concepts and MongoDB setup",
      "CRUD operations in MongoDB",
      "Schema design and data modeling",
      "Indexing and query optimization",
      "MongoDB Atlas and cloud deployment",
      "Aggregation pipelines and advanced queries",
    ],
  },
  {
    title: "Module 4: Node.js & Express Backend",
    duration: "4 weeks",
    topics: [
      "Node.js architecture and core modules",
      "Building RESTful APIs with Express",
      "Authentication and authorization with JWT",
      "Middleware development and implementation",
      "Error handling and logging",
      "API security best practices",
      "Real-time communication with Socket.io",
    ],
  },
  {
    title: "Module 5: Full-Stack Integration",
    duration: "4 weeks",
    topics: [
      "Connecting React frontend with Express API",
      "State management with Redux or Redux Toolkit",
      "HTTP requests with Axios or Fetch API",
      "File uploads and media handling",
      "Payment gateway integration",
      "User authentication flows",
      "Performance optimization across the stack",
    ],
  },
  {
    title: "Module 6: Deployment & DevOps",
    duration: "2 weeks",
    topics: [
      "CI/CD pipeline setup with GitHub Actions",
      "Containerization with Docker",
      "Cloud deployment with AWS, Heroku, or Vercel",
      "Environment configuration and security",
      "Monitoring and logging in production",
      "Performance testing and optimization",
      "Scaling MERN applications",
    ],
  },
  {
    title: "Module 7: Capstone Project",
    duration: "6 weeks",
    topics: [
      "Planning and requirements gathering",
      "System architecture design",
      "Full-stack implementation with MERN",
      "Testing and quality assurance",
      "Deployment to production",
      "Documentation and presentation",
      "Code review and feedback",
    ],
  },
];
