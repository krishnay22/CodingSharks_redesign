"use client";

import { useState, useRef } from "react";

export default function PythonCourseDetails() {
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
          <h1>Python Developer Course</h1>
          <p>
            Master Python programming and build real-world applications with
            industry best practices
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

          <div className="python-icon">
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
          </div>
        </div>
      </div>

      <section className="what-you-learn">
        <h2>What You Will Learn</h2>
        <div className="learning-grid">
          <div className="learning-item">
            <div className="icon">🐍</div>
            <h3>Python Fundamentals</h3>
            <p>
              Master core Python concepts, data structures, and object-oriented
              programming
            </p>
          </div>
          <div className="learning-item">
            <div className="icon">🔍</div>
            <h3>Data Analysis</h3>
            <p>
              Learn data manipulation with NumPy, Pandas, and visualization with
              Matplotlib
            </p>
          </div>
          <div className="learning-item">
            <div className="icon">🤖</div>
            <h3>Machine Learning</h3>
            <p>
              Build intelligent systems with scikit-learn, TensorFlow, and
              PyTorch
            </p>
          </div>
          <div className="learning-item">
            <div className="icon">🌐</div>
            <h3>Web Development</h3>
            <p>Create web applications with Django and Flask frameworks</p>
          </div>
        </div>
      </section>

      <section className="how-you-learn">
        <h2>How You Will Learn</h2>
        <div className="learning-method">
          <div className="method-item">
            <h3>Interactive Coding</h3>
            <p>
              Practice Python in our interactive coding environment with
              real-time feedback and guidance from expert instructors.
            </p>
          </div>
          <div className="method-item">
            <h3>Project-Based Learning</h3>
            <p>
              Apply your knowledge by building real-world projects that solve
              actual problems and showcase your skills to potential employers.
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
              Join a community of Python enthusiasts to collaborate on projects,
              participate in code reviews, and network with peers.
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
                "This Python course transformed my career. I went from knowing
                nothing about programming to landing a job as a data analyst in
                just 6 months."
              </p>
            </div>
            <div className="testimonial-author">
              <div className="author-avatar">JS</div>
              <div className="author-info">
                <h4>Jennifer S.</h4>
                <p>Data Analyst at TechCorp</p>
              </div>
            </div>
          </div>
          <div className="testimonial-card">
            <div className="testimonial-content">
              <p>
                "The project-based approach helped me build a portfolio that
                impressed employers. The instructors were incredibly supportive
                throughout my learning journey."
              </p>
            </div>
            <div className="testimonial-author">
              <div className="author-avatar">MR</div>
              <div className="author-info">
                <h4>Michael R.</h4>
                <p>Python Developer at InnovateSoft</p>
              </div>
            </div>
          </div>
          <div className="testimonial-card">
            <div className="testimonial-content">
              <p>
                "I was able to automate repetitive tasks at my job after just
                the first few modules. By the end of the course, I had developed
                a machine learning model that's now used by my company."
              </p>
            </div>
            <div className="testimonial-author">
              <div className="author-avatar">AT</div>
              <div className="author-info">
                <h4>Alex T.</h4>
                <p>ML Engineer at DataDrive</p>
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
          background: linear-gradient(135deg, #ff996e 0%, #ff7e47 100%);
          color: white;
          border-radius: 16px;
          margin-bottom: 60px;
          overflow: hidden;
          box-shadow: 0 15px 30px rgba(255, 153, 110, 0.3);
          transition: all 0.3s ease;
        }

        .course-header:hover {
          box-shadow: 0 20px 40px rgba(255, 153, 110, 0.4);
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
          color: #ff996e;
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

        .python-icon {
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
          background-color: #ff996e;
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
          border-bottom: 5px solid #ff996e;
        }

        .icon {
          font-size: 3rem;
          margin-bottom: 25px;
        }

        .learning-item h3 {
          font-size: 1.4rem;
          margin-bottom: 15px;
          color: #ff996e;
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
          background-color: #ff996e;
          transition: all 0.3s ease;
        }

        .method-item:hover:before {
          width: 10px;
        }

        .method-item h3 {
          font-size: 1.4rem;
          margin-bottom: 15px;
          color: #ff996e;
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
          background-color: #ff996e;
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
          border-color: transparent transparent transparent #ff996e;
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
          color: #ff996e;
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
          background-color: #ff996e;
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
          color: #ff996e;
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
          background-color: #ff996e;
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

          .python-icon {
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
    title: "Module 1: Python Fundamentals",
    duration: "3 weeks",
    topics: [
      "Setting up your Python development environment",
      "Python syntax, variables, and data types",
      "Control flow: conditionals and loops",
      "Functions and modules",
      "Error handling and debugging",
      "Working with files and directories",
    ],
  },
  {
    title: "Module 2: Data Structures & Algorithms",
    duration: "4 weeks",
    topics: [
      "Lists, tuples, sets, and dictionaries",
      "Comprehensions and generators",
      "Object-oriented programming in Python",
      "Algorithm design and analysis",
      "Recursion and dynamic programming",
      "Sorting and searching algorithms",
    ],
  },
  {
    title: "Module 3: Data Analysis & Visualization",
    duration: "4 weeks",
    topics: [
      "Introduction to NumPy for numerical computing",
      "Data manipulation with Pandas",
      "Data visualization with Matplotlib and Seaborn",
      "Statistical analysis in Python",
      "Working with different data formats (CSV, JSON, Excel)",
      "Data cleaning and preprocessing techniques",
    ],
  },
  {
    title: "Module 4: Web Development with Python",
    duration: "5 weeks",
    topics: [
      "Web development fundamentals (HTML, CSS, JavaScript)",
      "Building web applications with Flask",
      "Creating robust web applications with Django",
      "RESTful API development",
      "Database integration (SQL and NoSQL)",
      "Authentication and authorization",
      "Deployment and scaling",
    ],
  },
  {
    title: "Module 5: Machine Learning with Python",
    duration: "6 weeks",
    topics: [
      "Introduction to machine learning concepts",
      "Supervised learning algorithms",
      "Unsupervised learning algorithms",
      "Feature engineering and selection",
      "Model evaluation and hyperparameter tuning",
      "Natural language processing",
      "Computer vision basics",
      "Introduction to deep learning with TensorFlow and PyTorch",
    ],
  },
  {
    title: "Module 6: Capstone Project",
    duration: "4 weeks",
    topics: [
      "Project planning and requirements gathering",
      "System design and architecture",
      "Implementation using Python and relevant frameworks",
      "Testing and quality assurance",
      "Deployment to production",
      "Documentation and presentation",
      "Code review and feedback",
    ],
  },
];
