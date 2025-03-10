import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import "bootstrap/dist/css/bootstrap.min.css";

const RecruitmentStoriesSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const stories = [
    {
      id: 1,
      title: "From Intern to Team Lead",
      content:
        "After joining as a summer intern, Maria showed exceptional problem-solving skills. We offered her a full-time position, and within 3 years, she was leading our product development team.",
      author: "Michael Chen, HR Director",
      color: "bg-primary",
    },
    {
      id: 2,
      title: "Career Switcher Success",
      content:
        "James was a former teacher looking to break into tech. Our training program helped him transition, and he's now one of our most valuable developers.",
      author: "Sarah Johnson, Talent Acquisition",
      color: "bg-secondary",
    },
    {
      id: 3,
      title: "Remote Recruitment Win",
      content:
        "We found Aisha through a virtual career fair. Despite being 5000 miles away, she's integrated perfectly with our team and brings unique perspectives to our global projects.",
      author: "David Rodriguez, CTO",
      color: "bg-success",
    },
    {
      id: 4,
      title: "Unconventional Background",
      content:
        "With no formal degree but an impressive portfolio, Alex challenged our traditional hiring criteria. Two years later, he's revolutionized our design approach.",
      author: "Patricia Williams, Design Director",
      color: "bg-warning",
    },
  ];

  return (
    <div className="container my-5">
      <h2 className="text-center mb-4">Recruitment Stories</h2>
      <div
        id="storyCarousel"
        className="carousel slide"
        data-bs-ride="carousel"
      >
        <div className="carousel-inner">
          {stories.map((story, index) => (
            <div
              key={story.id}
              className={`carousel-item ${
                index === currentSlide ? "active" : ""
              }`}
            >
              <div className={`card text-white ${story.color} p-4`}>
                <div className="card-body">
                  <h3 className="card-title">{story.title}</h3>
                  <p className="card-text">{story.content}</p>
                  <p className="text-white-50 text-end">— {story.author}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Buttons */}
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#storyCarousel"
          data-bs-slide="prev"
          onClick={() =>
            setCurrentSlide((prev) =>
              prev === 0 ? stories.length - 1 : prev - 1
            )
          }
        >
          <span className="carousel-control-prev-icon"></span>
        </button>

        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#storyCarousel"
          data-bs-slide="next"
          onClick={() =>
            setCurrentSlide((prev) =>
              prev === stories.length - 1 ? 0 : prev + 1
            )
          }
        >
          <span className="carousel-control-next-icon"></span>
        </button>
      </div>

      {/* Indicators */}
      <div className="d-flex justify-content-center mt-3">
        {stories.map((_, index) => (
          <button
            key={index}
            className={`mx-1 btn ${
              index === currentSlide ? "btn-dark" : "btn-light"
            }`}
            onClick={() => setCurrentSlide(index)}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default RecruitmentStoriesSlider;
