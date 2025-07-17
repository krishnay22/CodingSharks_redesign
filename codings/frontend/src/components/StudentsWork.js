"use client"; // Keep this if you're using Next.js App Router and need client-side rendering

import { useState, useEffect } from "react"; // Import useState and useEffect

export default function StudentWorkPage() {
  const [studentWorks, setStudentWorks] = useState([]); // State to store fetched student works
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  useEffect(() => {
    const fetchStudentWorks = async () => {
      try {
        setLoading(true); // Start loading
        setError(null); // Clear previous errors

        const response = await fetch("http://localhost:5000/api/student-work"); // Your API endpoint
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Failed to fetch student work.");
        }

        const data = await response.json();
        setStudentWorks(data.works); // Set the fetched works to state
      } catch (err) {
        console.error("Error fetching student work:", err);
        setError(err.message || "An unexpected error occurred.");
      } finally {
        setLoading(false); // End loading
      }
    };

    fetchStudentWorks(); // Call the fetch function when component mounts
  }, []); // Empty dependency array ensures this runs only once on mount

  // Function to format date (optional, but good for display)
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="student-work-container">
      <h1>What Our Students Have Created:</h1>

      {loading && <p className="loading-message">Loading student works...</p>}
      {error && <p className="error-message">Error: {error}</p>}
      {!loading && studentWorks.length === 0 && !error && (
        <p className="no-works-message">No student works available yet.</p>
      )}

      {!loading && studentWorks.length > 0 && (
        <div className="projects-container">
          {studentWorks.map((project) => (
            <div className="project-card" key={project._id}>
              {" "}
              {/* Use _id from MongoDB */}
              <div className="project-image">
                <img
                  // Construct the full image URL.
                  // Assumes your backend serves static files from '/uploads'
                  // and your backend is at http://localhost:5000
                  src={
                    project.imageUrl
                      ? `http://localhost:5000${project.imageUrl}`
                      : "/placeholder.svg"
                  }
                  alt={project.title}
                />
              </div>
              <div className="project-details">
                <h2>{project.title}</h2>
                {/* Display student's username if available */}
                {project.user && project.user.username && (
                  <p className="student-name">
                    By: {project.user.username} ({project.user.email})
                  </p>
                )}
                <p className="project-description">{project.description}</p>
                <p className="project-date">
                  Created on: {formatDate(project.date)}
                </p>
                {project.url && ( // Only show button if URL exists
                  <a
                    href={project.url}
                    className="view-site-btn"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View Site
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Styles remain the same, adding some for loading/error messages */}
      <style jsx>{`
        .student-work-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 20px;
          font-family: "Arial", sans-serif;
        }

        h1 {
          color: #333;
          margin-bottom: 30px;
          font-size: 2.5rem;
          font-weight: 100;
        }

        .loading-message,
        .error-message,
        .no-works-message {
          text-align: center;
          font-size: 1.2rem;
          color: #555;
          margin-top: 50px;
        }

        .error-message {
          color: red;
        }

        .projects-container {
          display: flex;
          flex-direction: column;
          gap: 40px;
          padding: 10px 0;
        }

        .project-card {
          display: flex;
          flex-direction: column;
          width: 100%;
          height: 600px; /* Increased from 450px to 550px */
          background-color: white;
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .project-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
        }

        .project-image {
          width: 100%;
          height: 70%; /* Maintaining 70% for image section */
          overflow: hidden;
        }

        .project-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s ease;
        }

        .project-card:hover .project-image img {
          transform: scale(1.05);
        }

        .project-details {
          height: 35%; /* Maintaining 30% for details section */
          padding: 15px;
          display: flex;
          flex-direction: column;
        }

        h2 {
          margin-top: 0;
          margin-bottom: 8px;
          color: #333;
          font-size: 1.6rem;
        }

        .student-name {
          color: #888; /* Style for student name */
          font-size: 0.9rem;
          margin-bottom: 5px;
        }

        .project-description {
          flex-grow: 1;
          margin-bottom: 10px;
          color: #555;
          line-height: 1.5;
          font-size: 1rem;
        }

        .project-date {
          color: #777;
          margin-bottom: 12px;
          font-size: 0.9rem;
        }

        .view-site-btn {
          display: inline-block;
          background-color: #ff9a70;
          color: white;
          padding: 10px 20px;
          border-radius: 40px;
          text-decoration: none;
          font-weight: 600;
          align-self: flex-start;
          transition: background-color 0.3s ease;
          font-size: 0.95rem;
        }

        .view-site-btn:hover {
          background-color: #ff8a57;
        }

        @media (max-width: 768px) {
          .project-card {
            height: auto;
            min-height: 600px; /* Increased from 500px to 600px */
          }

          .project-image {
            height: 350px; /* Increased from 280px to 350px */
          }

          .project-details {
            height: auto;
            padding: 12px;
          }
        }
      `}</style>
    </div>
  );
}
