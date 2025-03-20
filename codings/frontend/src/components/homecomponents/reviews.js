import React from "react";
import { Star } from "lucide-react";

export default function Review() {
  return (
    <div className="review-card">
      <img
        className="profile-pic"
        src="https://static.vecteezy.com/system/resources/previews/039/334/802/large_2x/ai-generated-indian-female-student-free-photo.jpg"
        alt="Profile"
      />
      <div className="review-content">
        <h3>John Doe</h3>
        <div className="stars">
          {[...Array(5)].map((_, i) => (
            <Star key={i} size={18} fill="currentColor" stroke="none" />
          ))}
        </div>
        <p>
          "Amazing experience! The service was excellent, and I highly recommend
          it."
        </p>
        <a
          href="https://www.google.com/search?q=google+reviews"
          target="_blank"
          rel="noopener noreferrer"
          className="review-link"
        >
          View in Google Reviews
        </a>
      </div>
      <style jsx>{`
        .review-card {
          display: flex;
          align-items: center;
          background: white;
          padding: 16px;
          border-radius: 12px;
          box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
          max-width: 600px;
        }
        .profile-pic {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          border: 2px solid #ddd;
          margin-right: 16px;
        }
        .review-content {
          flex: 1;
        }
        .stars {
          display: flex;
          color: #facc15;
          margin: 8px 0;
        }
        .review-link {
          color: #1d4ed8;
          text-decoration: none;
          font-weight: 500;
        }
        .review-link:hover {
          text-decoration: underline;
        }
      `}</style>
    </div>
  );
}
