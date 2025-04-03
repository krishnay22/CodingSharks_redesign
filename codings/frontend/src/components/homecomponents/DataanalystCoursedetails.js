"use client";

import { useState, useRef } from "react";

export default function DataAnalystCourseDetails() {
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
          <h1>Data Analyst Certification Course</h1>
          <p>
            Master data analysis techniques and build a career in one of today's
            most in-demand fields
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

          <div className="data-icon">
            <svg
              viewBox="0 0 128 128"
              style={{
                transform: `translate(${mousePosition.x * 0.01}px, ${
                  mousePosition.y * 0.01
                }px) rotate(${mousePosition.x * 0.01}deg)`,
              }}
            >
              <path
                fill="#306998"
                d="M63.391 1.988c-4.222.02-8.252.379-11.8 1.007-10.45 1.846-12.346 5.71-12.346 12.837v9.411h24.693v3.137h-33.961c-7.176 0-13.46 4.313-15.426 12.521-2.268 9.405-2.368 15.275 0 25.096 1.755 7.311 5.947 12.519 13.124 12.519h8.491v-11.282c0-8.151 7.051-15.34 15.426-15.34h24.665c6.866 0 12.346-5.654 12.346-12.548v-23.513c0-6.693-5.646-11.72-12.346-12.837-4.244-.706-8.645-1.027-12.866-1.008zm-13.354 7.569c2.55 0 4.634 2.117 4.634 4.721 0 2.593-2.083 4.69-4.634 4.69-2.56 0-4.633-2.097-4.633-4.69-.001-2.604 2.073-4.721 4.633-4.721z"
              ></path>
              <path
                fill="#FFD43B"
                d="M91.682 28.38v10.966c0 8.5-7.208 15.655-15.426 15.655h-24.665c-6.756 0-12.346 5.783-12.346 12.549v23.515c0 6.691 5.818 10.628 12.346 12.547 7.816 2.297 15.312 2.713 24.665 0 6.216-1.801 12.346-5.423 12.346-12.547v-9.412h-24.664v-3.138h37.012c7.176 0 9.852-5.005 12.348-12.519 2.578-7.735 2.467-15.174 0-25.096-1.774-7.145-5.161-12.521-12.348-12.521h-9.268zm-13.873 59.569c2.561 0 4.634 2.097 4.634 4.692 0 2.602-2.074 4.719-4.634 4.719-2.55 0-4.633-2.117-4.633-4.719 0-2.595 2.083-4.692 4.633-4.692z"
              ></path>
            </svg>
          </div>
        </div>
      </div>

      <section className="what-you-learn">
        <h2>What You Will Learn</h2>
        <div className="learning-grid">
          <div className="learning-item">
            <div className="icon">📊</div>
            <h3>Data Analysis Fundamentals</h3>
            <p>
              Master statistical concepts, data preparation techniques, and
              exploratory data analysis
            </p>
          </div>
          <div className="learning-item">
            <div className="icon">🐍</div>
            <h3>Python Programming</h3>
            <p>
              Learn Python for data analysis using pandas, NumPy, and other
              essential libraries
            </p>
          </div>
          <div className="learning-item">
            <div className="icon">📈</div>
            <h3>Data Visualization</h3>
            <p>
              Create compelling visualizations with Matplotlib, Seaborn, and
              interactive dashboards with Tableau
            </p>
          </div>
          <div className="learning-item">
            <div className="icon">🤖</div>
            <h3>Machine Learning Basics</h3>
            <p>
              Implement predictive modeling, clustering, and classification
              algorithms with scikit-learn
            </p>
          </div>
        </div>
      </section>

      <section className="how-you-learn">
        <h2>How You Will Learn</h2>
        <div className="learning-method">
          <div className="method-item">
            <h3>Hands-on Projects</h3>
            <p>
              Apply your knowledge through practical data analysis projects
              using real-world datasets that showcase your skills to potential
              employers.
            </p>
          </div>
          <div className="method-item">
            <h3>Interactive Notebooks</h3>
            <p>
              Practice data analysis and visualization in our interactive
              Jupyter notebook environment with real-time feedback from
              instructors.
            </p>
          </div>
          <div className="method-item">
            <h3>Expert Mentorship</h3>
            <p>
              Get personalized guidance from industry data professionals who
              will review your analysis and provide feedback to accelerate your
              growth.
            </p>
          </div>
          <div className="method-item">
            <h3>Community Learning</h3>
            <p>
              Join a community of data enthusiasts to collaborate on projects,
              participate in data challenges, and network with peers and
              industry experts.
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
                "This data analyst course completely transformed my career. I
                went from having basic Excel skills to landing a job as a data
                analyst at a Fortune 500 company in just 6 months."
              </p>
            </div>
            <div className="testimonial-author">
              <div className="author-avatar">LM</div>
              <div className="author-info">
                <h4>Laura M.</h4>
                <p>Data Analyst at GlobalTech</p>
              </div>
            </div>
          </div>
          <div className="testimonial-card">
            <div className="testimonial-content">
              <p>
                "The project-based approach helped me build an impressive
                portfolio. I used the skills from this course to analyze market
                trends and create a dashboard that helped my company increase
                sales by 23%."
              </p>
            </div>
            <div className="testimonial-author">
              <div className="author-avatar">DJ</div>
              <div className="author-info">
                <h4>David J.</h4>
                <p>Business Intelligence Analyst at DataDrive</p>
              </div>
            </div>
          </div>
          <div className="testimonial-card">
            <div className="testimonial-content">
              <p>
                "I was able to automate our reporting process after just the
                first few modules. By the end of the course, I had built
                predictive models that helped our company reduce customer churn
                by 18%. This course pays for itself!"
              </p>
            </div>
            <div className="testimonial-author">
              <div className="author-avatar">SP</div>
              <div className="author-info">
                <h4>Sarah P.</h4>
                <p>Senior Data Analyst at AnalyticsNow</p>
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
          background: linear-gradient(135deg, #306998 0%, #ffd43b 100%);
          color: white;
          border-radius: 16px;
          margin-bottom: 60px;
          overflow: hidden;
          box-shadow: 0 15px 30px rgba(48, 105, 152, 0.3);
          transition: all 0.3s ease;
        }

        .course-header:hover {
          box-shadow: 0 20px 40px rgba(48, 105, 152, 0.4);
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
          color: #306998;
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

        .data-icon {
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
          background-color: #306998;
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
          border-bottom: 5px solid #306998;
        }

        .icon {
          font-size: 3rem;
          margin-bottom: 25px;
        }

        .learning-item h3 {
          font-size: 1.4rem;
          margin-bottom: 15px;
          color: #306998;
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
          background-color: #306998;
          transition: all 0.3s ease;
        }

        .method-item:hover:before {
          width: 10px;
        }

        .method-item h3 {
          font-size: 1.4rem;
          margin-bottom: 15px;
          color: #306998;
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
          background-color: #306998;
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
          border-color: transparent transparent transparent #306998;
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
          color: #306998;
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
          background-color: #306998;
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
          color: #306998;
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
          background-color: #306998;
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

          .data-icon {
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
    title: "Module 1: Data Analysis Foundations",
    duration: "3 weeks",
    topics: [
      "Introduction to data analysis concepts",
      "Statistical thinking and data types",
      "Descriptive statistics and exploratory analysis",
      "Data cleaning and preparation techniques",
      "Excel for data analysis and pivot tables",
      "Introduction to SQL for data querying",
    ],
  },
  {
    title: "Module 2: Python for Data Analysis",
    duration: "4 weeks",
    topics: [
      "Python programming fundamentals",
      "Working with pandas for data manipulation",
      "NumPy for numerical computing",
      "Data cleaning and preprocessing with Python",
      "Exploratory data analysis with Python",
      "Working with different file formats (CSV, JSON, Excel)",
    ],
  },
  {
    title: "Module 3: Data Visualization",
    duration: "3 weeks",
    topics: [
      "Data visualization principles and best practices",
      "Creating visualizations with Matplotlib and Seaborn",
      "Interactive visualizations with Plotly",
      "Dashboard creation with Tableau",
      "Storytelling with data",
      "Designing effective presentations of findings",
    ],
  },
  {
    title: "Module 4: SQL & Database Analysis",
    duration: "3 weeks",
    topics: [
      "Advanced SQL queries and database concepts",
      "Joining tables and relationship modeling",
      "Aggregation and window functions",
      "Database optimization and performance",
      "ETL processes and data pipelines",
      "Working with big data technologies",
    ],
  },
  {
    title: "Module 5: Statistical Analysis",
    duration: "4 weeks",
    topics: [
      "Probability distributions and sampling",
      "Hypothesis testing and confidence intervals",
      "Regression analysis and correlation",
      "A/B testing for business decisions",
      "Time series analysis and forecasting",
      "Experimental design and causal inference",
      "Statistical analysis with Python (scipy, statsmodels)",
    ],
  },
  {
    title: "Module 6: Machine Learning Fundamentals",
    duration: "4 weeks",
    topics: [
      "Introduction to machine learning concepts",
      "Supervised learning: regression and classification",
      "Unsupervised learning: clustering and dimensionality reduction",
      "Model evaluation and validation techniques",
      "Feature engineering and selection",
      "Implementing models with scikit-learn",
      "Introduction to deep learning concepts",
    ],
  },
  {
    title: "Module 7: Capstone Project",
    duration: "5 weeks",
    topics: [
      "End-to-end data analysis project",
      "Data collection and preparation",
      "Exploratory analysis and visualization",
      "Statistical modeling and insights generation",
      "Creating interactive dashboards",
      "Presenting findings and recommendations",
      "Building a compelling portfolio piece",
    ],
  },
];
