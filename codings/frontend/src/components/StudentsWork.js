"use client";

export default function StudentWorkPage() {
  // Sample project data
  const projects = [
    {
      id: 1,
      title: "Aerpace",
      description:
        "Experience travel that will take your breath away. A fully autonomous, integrated and frictionless transport system that is closer to you than ever.",
      image:
        "https://sattaexpress.co.in/wp-content/uploads/2024/04/image-2-23-1024x576-1.jpg",
      date: "March 15, 2023",
      url: "https://www.aerpace.com/",
    },
    {
      id: 2,
      title: "Tennisshop E-commerce Platform",
      description:
        "Shop all of them at a single place on www.tennisshop.ae. Dig in for the best tennis products in our online as well as offline stores.",
      image:
        "https://about.me/cdn-cgi/image/q=80,dpr=1,f=auto,fit=cover,w=1200,h=630,gravity=auto/https://assets.about.me/background/users/t/e/n/tennisshopuae_1674907087_228.jpg",
      date: "June 22, 2023",
      url: "https://www.tennisshop.ae/",
    },
    {
      id: 3,
      title: "Movies-review",
      description: "A site to check reviews of the latest movies.",
      image:
        "https://s.tmimgcdn.com/scr/800x500/358900/movies-movie-review-film-wordpress-theme_358953-original.jpg",
      date: "September 10, 2023",
      url: "https://movies-review-eosin.vercel.app/",
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
