"use client";

export default function StudentWorkPage() {
  // Sample project data
  const projects = [
    {
      id: 1,
      title: "Portfolio Website",
      description:
        "A personal portfolio website showcasing my skills and projects. Built with React and custom animations.",
      image:
        "https://mir-s3-cdn-cf.behance.net/projects/404/4f56ea188636359.Y3JvcCwxNjEyLDEyNjAsMCww.png",
      date: "March 15, 2023",
      url: "https://media.licdn.com/dms/image/v2/D4D22AQFnGP0qILKGWQ/feedshare-shrink_800/feedshare-shrink_800/0/1713691873187?e=2147483647&v=beta&t=0UiBnm0U8CwZZVZ9YIeKdocVq8ciPRomT036gIykQa4",
    },
    {
      id: 2,
      title: "E-commerce Platform",
      description:
        "A fully functional e-commerce platform with product listings, cart functionality, and checkout process.",
      image:
        "https://mir-s3-cdn-cf.behance.net/projects/404/e7a7ba212082353.Y3JvcCwyNTMwLDE5NzksNDMsMA.jpg",
      date: "June 22, 2023",
      url: "https://example.com/ecommerce",
    },
    {
      id: 3,
      title: "Weather Application",
      description:
        "A weather application that provides real-time weather updates based on location. Includes 5-day forecast.",
      image:
        "https://mir-s3-cdn-cf.behance.net/projects/404/a09357217932295.Y3JvcCw4MDgsNjMyLDAsMA.png",
      date: "September 10, 2023",
      url: "https://example.com/weather",
    },
    {
      id: 4,
      title: "Task Management System",
      description:
        "A comprehensive task management system with features like task creation, assignment, and progress tracking.",
      image:
        "https://mir-s3-cdn-cf.behance.net/projects/404/30794f214336445.Y3JvcCwxMjEyLDk0OCwwLDA.png",
      date: "December 5, 2023",
      url: "https://example.com/tasks",
    },
    {
      id: 5,
      title: "Social Media Dashboard",
      description:
        "A dashboard that aggregates and displays social media metrics and analytics from multiple platforms.",
      image:
        "https://mir-s3-cdn-cf.behance.net/projects/404/30794f214336445.Y3JvcCwxMjEyLDk0OCwwLDA.png",
      date: "February 18, 2024",
      url: "https://example.com/dashboard",
    },
  ];

  return (
    <div className="student-work-container">
      <h1>What Our Students Have Created:</h1>
      <div className="projects-container">
        {projects.map((project) => (
          <div className="project-card" key={project.id}>
            <div className="project-image">
              <img
                src={project.image || "/placeholder.svg"}
                alt={project.title}
              />
            </div>
            <div className="project-details">
              <h2>{project.title}</h2>
              <p className="project-description">{project.description}</p>
              <p className="project-date">Created on: {project.date}</p>
              <a
                href={project.url}
                className="view-site-btn"
                target="_blank"
                rel="noopener noreferrer"
              >
                View Site
              </a>
            </div>
          </div>
        ))}
      </div>

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
          height: 30%; /* Maintaining 30% for details section */
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
