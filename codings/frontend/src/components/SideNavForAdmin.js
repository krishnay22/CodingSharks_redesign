import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  FaHome,
  FaUser,
  FaClipboardList,
  FaArchive,
  FaTachometerAlt,
  FaMedal,
  FaProjectDiagram,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";

const SideNavforadmin = () => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="sidenavforadmin-container">
      <div className={`sidebar ${isOpen ? "open" : "closed"}`}>
        <div className="logo">
          <img
            src="https://www.thecodingsharks.in/image/Coding-Sharks-Logo.png"
            alt="Coding Sharks Logo"
            className="logo-img"
          />
        </div>

        <nav>
          <ul className="nav-list">
            <li className="nav-item">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive ? "nav-link active" : "nav-link"
                }
                end
              >
                <FaHome className="nav-icon" />
                {isOpen && <span className="nav-text">Home</span>}
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink
                to="/AdminLayout/CreateUserPage"
                className={({ isActive }) =>
                  isActive ? "nav-link active" : "nav-link"
                }
              >
                <FaUser className="nav-icon" />
                {isOpen && <span className="nav-text">CreateUserPage</span>}
              </NavLink>
            </li>

            <li className="nav-item"> 
              <NavLink
                to="/AdminLayout/Dailyquestions"
                className={({ isActive }) =>
                  isActive ? "nav-link active" : "nav-link"
                }
              >
                <FaUser className="nav-icon" />
                {isOpen && <span className="nav-text">Dailyquestions</span>}
              </NavLink>
            </li>
          </ul>
        </nav>

        {/* Arrow toggle button on the right side */}
        <button
          className="toggle-button"
          onClick={toggleSidebar}
          aria-label={isOpen ? "Collapse sidebar" : "Expand sidebar"}
        >
          {isOpen ? <FaChevronLeft /> : <FaChevronRight />}
        </button>
      </div>

      {/* Styles */}
      <style jsx>{`
        .sidenavforadmin-container {
          position: relative;
          height: 100%;
        }

        /* Sidebar styles */
        .sidebar {
          width: ${isOpen ? "250px" : "70px"};
          height: 100vh;
          background-color: #fff;
          color: #333;
          position: fixed;
          top: 0;
          left: 0;
          box-shadow: 0 0 15px rgba(0, 0, 0, 0.05);
          border-right: 1px solid #eee;
          transition: width 0.3s ease;
          display: flex;
          flex-direction: column;
          overflow-y: auto;
          overflow-x: hidden; /* Prevent horizontal scrollbar */
          z-index: 999; /* Higher z-index to ensure it's above content */
          padding: 0;
        }

        /* Logo area */
        .logo {
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 20px 0;
          border-bottom: 2px solid #ff6600;
          overflow: hidden; /* Prevent logo overflow */
        }

        .logo-img {
          width: auto;
          height: 40px;
          max-width: 80%;
        }

        /* Toggle button */
        .toggle-button {
          position: absolute;
          top: 50%;
          right: -12px;
          transform: translateY(-50%);
          width: 24px;
          height: 24px;
          background-color: #ff6600;
          color: white;
          border: none;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 2px 5px rgba(0, 0, 0, 0.15);
          z-index: 1000; /* Even higher z-index to ensure button stays on top */
        }

        .toggle-button:hover {
          background-color: #e65c00;
          transform: translateY(-50%) scale(1.1);
        }

        /* Navigation */
        nav {
          flex: 1;
          overflow-y: auto;
          overflow-x: hidden; /* Prevent horizontal scrollbar */
          padding: 10px 0;
        }

        .nav-list {
          list-style: none;
          padding: 0;
          margin: 0;
          width: 100%;
        }

        .nav-item {
          margin: 5px 10px;
          width: calc(
            100% - 20px
          ); /* Ensure items don't cause horizontal overflow */
        }

        .nav-link {
          display: flex;
          align-items: center;
          padding: 12px 15px;
          text-decoration: none;
          color: #555;
          border-radius: 8px;
          transition: all 0.2s ease;
          overflow: hidden; /* Prevent text overflow */
        }

        .nav-icon {
          font-size: 20px;
          min-width: 25px;
          flex-shrink: 0;
        }

        .nav-text {
          margin-left: 12px;
          font-size: 16px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .nav-link:hover {
          background-color: #fff0e8;
          color: #ff6600;
          transform: translateX(3px);
        }

        .nav-link.active {
          background-color: #ff6600;
          color: white;
          transform: none;
        }

        /* Responsive styles */
        @media (max-width: 768px) {
          .sidebar {
            width: ${isOpen ? "250px" : "0"};
          }

          .sidebar.closed {
            width: 0;
            padding: 0;
          }

          .sidebar.open {
            width: 250px;
          }

          .toggle-button {
            right: ${isOpen ? "-12px" : "12px"};
          }
        }
      `}</style>
    </div>
  );
};

export default SideNavforadmin;
