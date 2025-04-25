import React from "react";
import { IoIosNotifications } from "react-icons/io";

const Header = () => {
  return (
    <header className="header">
      <div className="notification">
        <IoIosNotifications />
      </div>

      <style jsx>{`
        .header {
          display: flex;
          justify-content: flex-end;

          align-items: center;
          padding: 0.3rem;
          background: #fff;
          border-bottom: 2px solid #ff996e; /* Updated border color */
          position: relative;
        }

        .notification {
          cursor: pointer;
          font-size: 1.8rem;
          color: black;
          padding: 0.5rem;
          border-radius: 50%;
          transition: background-color 0.3s ease;
        }

        .notification:hover {
          background-color: #f0f0f0;
        }

        @media (max-width: 768px) {
          .header {
            padding: 0.8rem 1.5rem;
          }

          .notification {
            font-size: 1.5rem;
          }
        }
      `}</style>
    </header>
  );
};

export default Header;
