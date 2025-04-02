"use client";

import { useState } from "react";

export default function CourseDetails() {
  const [activeModule, setActiveModule] = useState(0);

  return (
    <div className="course-container">
      <div className="course-header">
        <h1>MERN Stack Development</h1>
        <p>
          Become a full-stack developer with MongoDB, Express, React, and
          Node.js
        </p>
        <button className="enroll-button">Enroll Now</button>
      </div>

      <section className="what-you-learn">
        <h2>What You Will Learn</h2>
        <div className="learning-grid">
          <div className="learning-item">
            <div className="icon">📊</div>
            <h3>MongoDB</h3>
            <p>Learn to design and implement NoSQL databases with MongoDB</p>
          </div>
          <div className="learning-item">
            <div className="icon">⚡</div>
            <h3>Express.js</h3>
            <p>Build robust APIs and server-side applications with Express</p>
          </div>
          <div className="learning-item">
            <div className="icon">⚛️</div>
            <h3>React</h3>
            <p>Create dynamic and responsive user interfaces with React</p>
          </div>
          <div className="learning-item">
            <div className="icon">🚀</div>
            <h3>Node.js</h3>
            <p>Develop scalable server-side JavaScript applications</p>
          </div>
        </div>
      </section>

      <section className="how-you-learn">
        <h2>How You Will Learn</h2>
        <div className="learning-method">
          <div className="method-item">
            <h3>Project-Based Learning</h3>
            <p>
              Build real-world applications that solve actual problems. You'll
              create a portfolio of projects that demonstrate your skills to
              potential employers.
            </p>
          </div>
          <div className="method-item">
            <h3>Hands-On Exercises</h3>
            <p>
              Reinforce concepts through practical coding exercises and
              challenges that test your understanding and problem-solving
              abilities.
            </p>
          </div>
          <div className="method-item">
            <h3>Code Reviews</h3>
            <p>
              Receive feedback on your code from experienced developers who will
              help you write cleaner, more efficient code.
            </p>
          </div>
          <div className="method-item">
            <h3>Collaborative Learning</h3>
            <p>
              Work with other students on group projects to simulate real-world
              development environments and improve your teamwork skills.
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

      <style jsx>{`
        .course-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 20px;
          font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
          color: #333;
        }

        .course-header {
          text-align: center;
          padding: 60px 20px;
          background: linear-gradient(135deg, #ff996e 0%, #ff7e47 100%);
          color: white;
          border-radius: 12px;
          margin-bottom: 40px;
        }

        .course-header h1 {
          font-size: 2.5rem;
          margin-bottom: 16px;
        }

        .course-header p {
          font-size: 1.2rem;
          margin-bottom: 30px;
          max-width: 600px;
          margin-left: auto;
          margin-right: auto;
        }

        .enroll-button {
          background-color: white;
          color: #ff996e;
          border: none;
          padding: 12px 30px;
          font-size: 1rem;
          font-weight: bold;
          border-radius: 30px;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .enroll-button:hover {
          transform: translateY(-3px);
          box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
        }

        section {
          margin-bottom: 60px;
        }

        h2 {
          font-size: 2rem;
          margin-bottom: 30px;
          text-align: center;
          position: relative;
          padding-bottom: 15px;
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
          padding: 30px;
          border-radius: 12px;
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
          transition: transform 0.3s ease;
        }

        .learning-item:hover {
          transform: translateY(-10px);
        }

        .icon {
          font-size: 2rem;
          margin-bottom: 20px;
        }

        .learning-item h3 {
          font-size: 1.3rem;
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
          padding: 30px;
          border-radius: 12px;
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
        }

        .method-item h3 {
          font-size: 1.3rem;
          margin-bottom: 15px;
          color: #ff996e;
        }

        .modules-container {
          display: grid;
          grid-template-columns: 1fr 2fr;
          gap: 30px;
          background-color: white;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
        }

        .modules-list {
          background-color: #f8f8f8;
        }

        .module-item {
          padding: 20px;
          border-bottom: 1px solid #eee;
          cursor: pointer;
          transition: background-color 0.3s ease;
        }

        .module-item:hover {
          background-color: #f0f0f0;
        }

        .module-item.active {
          background-color: #ff996e;
          color: white;
        }

        .module-item h3 {
          font-size: 1.1rem;
          margin-bottom: 5px;
        }

        .duration {
          font-size: 0.9rem;
          color: inherit;
          opacity: 0.8;
        }

        .module-details {
          padding: 30px;
        }

        .module-details h3 {
          font-size: 1.5rem;
          margin-bottom: 10px;
          color: #ff996e;
        }

        .module-details ul {
          margin-top: 20px;
          padding-left: 20px;
        }

        .module-details li {
          margin-bottom: 10px;
          position: relative;
          padding-left: 15px;
        }

        .module-details li:before {
          content: "";
          position: absolute;
          left: 0;
          top: 10px;
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background-color: #ff996e;
        }

        @media (max-width: 768px) {
          .modules-container {
            grid-template-columns: 1fr;
          }

          .course-header {
            padding: 40px 20px;
          }

          .course-header h1 {
            font-size: 2rem;
          }
        }
      `}</style>
    </div>
  );
}

// Course module data
const modules = [
  {
    title: "Module 1: Introduction to MERN Stack",
    duration: "2 weeks",
    topics: [
      "Overview of MERN stack architecture",
      "Setting up your development environment",
      "Introduction to Git and GitHub",
      "JavaScript ES6+ features essential for MERN",
      "Building your first simple MERN application",
    ],
  },
  {
    title: "Module 2: MongoDB Fundamentals",
    duration: "3 weeks",
    topics: [
      "NoSQL database concepts",
      "MongoDB installation and setup",
      "CRUD operations in MongoDB",
      "Data modeling and schema design",
      "MongoDB Atlas and cloud deployment",
      "Indexing and performance optimization",
    ],
  },
  {
    title: "Module 3: Express.js & Node.js Backend",
    duration: "4 weeks",
    topics: [
      "Node.js fundamentals and event loop",
      "Creating RESTful APIs with Express",
      "Middleware implementation",
      "Authentication and authorization (JWT)",
      "Error handling and validation",
      "Testing Express applications",
    ],
  },
  {
    title: "Module 4: React Frontend Development",
    duration: "5 weeks",
    topics: [
      "React fundamentals and component architecture",
      "State management with hooks and context API",
      "Routing with React Router",
      "Forms and user input handling",
      "API integration and data fetching",
      "Styling in React applications",
    ],
  },
  {
    title: "Module 5: Full Stack Integration",
    duration: "3 weeks",
    topics: [
      "Connecting React frontend with Express backend",
      "State management with Redux",
      "Handling file uploads",
      "Real-time applications with Socket.io",
      "Performance optimization techniques",
      "Deployment strategies for MERN applications",
    ],
  },
  {
    title: "Module 6: Capstone Project",
    duration: "4 weeks",
    topics: [
      "Project planning and architecture design",
      "Implementing advanced MERN features",
      "Authentication and authorization",
      "Testing and debugging",
      "Deployment to production",
      "Project presentation and code review",
    ],
  },
];
