"use client";

import { useEffect, useRef, useState } from "react";
import { useScrollAnimation } from "./fadeuptext";

// A simple Star component to replace the Lucide-React Star
const Star = ({ filled }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill={filled ? "#FFCA28" : "none"}
      stroke={filled ? "#FFCA28" : "#e0e0e0"}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ marginRight: "2px" }}
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
};

const GoogleReviewsSlider = () => {
  const sliderRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const headingRef = useScrollAnimation({
    startTrigger: 1.2, // Start animation before element enters viewport
  });

  // Define the missing variables
  const headingPadding = isMobile ? "1rem 0.5rem" : "1.5rem 1rem";
  const headingFontSize = isMobile ? "1.5rem" : "3rem";
  const subtitlePadding = isMobile ? "0 0.5rem 1rem" : "0 1rem 1.5rem";

  // Check for mobile device on mount
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Review data
  const reviews = [
    {
      id: 1,
      name: "Om Javia",
      rating: 5,
      time: "7 months ago",
      reviewCount: "2 reviews·1 photo",
      text: "I recently completed a course at Coding Sharks, and It was an incredible experience",
      profilePicture: "/placeholder.svg",
      reviewUrl: "https://g.co/kgs/example1",
    },
    {
      id: 2,
      name: "Mayur Panchal",
      rating: 5,
      time: "7 months ago",
      reviewCount: "2 reviews",
      text: "I had a great experience at Coding Sharks...",
      profilePicture: "/placeholder.svg",
      reviewUrl: "https://g.co/kgs/example2",
    },
    {
      id: 3,
      name: "Seenu Ydv",
      rating: 5,
      time: "7 months ago",
      reviewCount: "2 reviews",
      text: "Fantastic Learning Experience at Coding Sharks...",
      profilePicture: "/placeholder.svg",
      reviewUrl: "https://g.co/kgs/example3",
    },
    {
      id: 4,
      name: "Ishan",
      rating: 5,
      time: "7 months ago",
      reviewCount: "2 reviews",
      text: "Amazing Place to learn Python and Data Analytics...",
      profilePicture: "/placeholder.svg",
      reviewUrl: "https://g.co/kgs/example4",
    },
    {
      id: 5,
      name: "Atharva Mehta",
      rating: 5,
      time: "3 months ago",
      reviewCount: "Local Guide·35 reviews·7 photos",
      text: "Love the way of teaching. Live projects live learning...",
      profilePicture: "/placeholder.svg",
      reviewUrl: "https://g.co/kgs/example5",
    },
  ];

  // Clone reviews for infinite scrolling effect
  const allReviews = [...reviews, ...reviews, ...reviews];

  // Improved animation using requestAnimationFrame with proper performance considerations
  useEffect(() => {
    if (!sliderRef.current || isHovered) return;

    const slider = sliderRef.current;
    let animationId;
    let startTime;
    let position = 0;

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;

      // Move 30px per second
      position = -(elapsed * 0.03) % (reviews.length * 344); // 320px card width + 24px gap

      if (slider) {
        slider.style.transform = `translateX(${position}px)`;
      }

      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, [isHovered, reviews.length]);

  const ReviewCard = ({ review }) => {
    return (
      <div className="review-card">
        <div className="profile-container">
          <div className="profile-image">
            <img
              src={review.profilePicture}
              alt={review.name}
              width={40}
              height={40}
              style={{ objectFit: "cover", width: "100%", height: "100%" }}
            />
          </div>
          <div className="name-container">
            <h3 className="name">{review.name}</h3>
            <p className="review-count">{review.reviewCount}</p>
          </div>
        </div>

        <div className="rating-container">
          {[...Array(5)].map((_, i) => (
            <Star key={i} filled={i < review.rating} />
          ))}
          <span className="review-time">{review.time}</span>
        </div>

        <div className="review-content">
          <p>{review.text}</p>
        </div>

        <a
          href={review.reviewUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="review-link"
        >
          View in Google Reviews
        </a>
      </div>
    );
  };

  return (
    <>
      <div
        ref={headingRef}
        style={{
          opacity: 0,
          transform: "translateY(200px)",
          transition: "transform 0.2s ease-out, opacity 0.8s ease-out",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
        }}
      >
        <h2
          style={{
            padding: headingPadding,
            fontSize: headingFontSize,
            fontWeight: "lighter",
          }}
        >
          What Our Alumni Say About Us:
        </h2>
        <p
          style={{
            padding: subtitlePadding,
            fontWeight: "lighter",
            fontSize: isMobile ? "14px" : "16px",
          }}
        >
          Why Students Choose Coding Sharks
        </p>
      </div>
      <div className="slider-container">
        {/* Inline CSS */}
        <style>{`
        .slider-container {
          width: 100%;
          overflow: hidden;
          position: relative;
          padding: 1rem 0;
        }
        .left-fade, .right-fade {
          position: absolute;
          top: 0;
          bottom: 0;
          width: 96px;
          z-index: 10;
          pointer-events: none;
        }
        .left-fade {
          left: 0;
          background: linear-gradient(to right, white, transparent);
        }
        .right-fade {
          right: 0;
          background: linear-gradient(to left, white, transparent);
        }
        .slider-track {
          display: flex;
          gap: 24px;
          padding: 16px 0;
          transition: transform 300ms linear;
          will-change: transform;
        }
        .review-card {
          min-width: 520px;
          max-width: 520px;
          height: 180px;
          background-color: white;
          border-radius: 8px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          padding: 16px;
          display: flex;
          flex-direction: column;
          gap: 8px;
          overflow: hidden;
        }
        .profile-container {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .profile-image {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background-color: #f1f1f1;
          overflow: hidden;
          flex-shrink: 0;
        }
        .name-container {
          min-width: 0;
        }
        .name {
          font-weight: bold;
          font-size: 14px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          margin: 0;
        }
        .review-count {
          font-size: 12px;
          color: #666;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          margin: 0;
        }
        .rating-container {
          display: flex;
          align-items: center;
        }
        .review-time {
          margin-left: 8px;
          font-size: 12px;
          color: #666;
        }
        .review-content {
          font-size: 12px;
          color: #333;
          flex-grow: 1;
          overflow: auto;
          margin: 0;
        }
        .review-content p {
          margin: 0;
        }
        .review-content::-webkit-scrollbar {
          width: 4px;
        }
        .review-content::-webkit-scrollbar-thumb {
          background-color: #ddd;
          border-radius: 4px;
        }
        .review-link {
          color: #4285f4;
          font-size: 12px;
          margin-top: auto;
          text-decoration: none;
          display: inline-block;
        }
        .review-link:hover {
          text-decoration: underline;
        }
        @media (max-width: 768px) {
          .review-card {
            min-width: 280px;
            max-width: 280px;
          }
          .left-fade, .right-fade {
            width: 48px;
          }
        }
      `}</style>

        <div className="left-fade"></div>

        <div
          className="slider-track"
          ref={sliderRef}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {allReviews.map((review, index) => (
            <ReviewCard key={`${review.id}-${index}`} review={review} />
          ))}
        </div>

        <div className="right-fade"></div>
      </div>
    </>
  );
};

export default GoogleReviewsSlider;
