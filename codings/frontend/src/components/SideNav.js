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
  FaBars,
  FaTimes,
} from "react-icons/fa";

const SideNavbar = () => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Mobile menu toggle button */}
      <button
        className="mobile-toggle"
        onClick={toggleSidebar}
        aria-label={isOpen ? "Close menu" : "Open menu"}
      >
        {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
      </button>

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
                <span className="nav-text">Home</span>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/dashboard"
                className={({ isActive }) =>
                  isActive ? "nav-link active" : "nav-link"
                }
                end
              >
                <FaHome className="nav-icon" />
                <span className="nav-text">Dashboard</span>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/profile"
                className={({ isActive }) =>
                  isActive ? "nav-link active" : "nav-link"
                }
              >
                <FaUser className="nav-icon" />
                <span className="nav-text">Profile</span>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/daily-questions"
                className={({ isActive }) =>
                  isActive ? "nav-link active" : "nav-link"
                }
              >
                <FaClipboardList className="nav-icon" />
                <span className="nav-text">Daily Questions</span>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/archive"
                className={({ isActive }) =>
                  isActive ? "nav-link active" : "nav-link"
                }
              >
                <FaArchive className="nav-icon" />
                <span className="nav-text">Archive</span>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/dashboard/CourseTimeline"
                className={({ isActive }) =>
                  isActive ? "nav-link active" : "nav-link"
                }
              >
                <FaTachometerAlt className="nav-icon" />
                <span className="nav-text">Course Timeline</span>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/league-board"
                className={({ isActive }) =>
                  isActive ? "nav-link active" : "nav-link"
                }
              >
                <FaMedal className="nav-icon" />
                <span className="nav-text">League Board</span>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/projects"
                className={({ isActive }) =>
                  isActive ? "nav-link active" : "nav-link"
                }
              >
                <FaProjectDiagram className="nav-icon" />
                <span className="nav-text">Projects</span>
              </NavLink>
            </li>
          </ul>
        </nav>

        <style jsx>{`
          /* Mobile toggle button */
          .mobile-toggle {
            position: fixed;
            top: 15px;
            left: 15px;
            z-index: 1000;
            background-color: #ff6600;
            color: white;
            border: none;
            border-radius: 5px;
            width: 40px;
            height: 40px;
            display: none;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            transition: background-color 0.3s;
          }

          .mobile-toggle:hover {
            background-color: #e65c00;
          }

          /* Sidebar styles */
          .sidebar {
            width: 250px;
            height: 100vh;
            background-color: #fff;
            color: #333;
            position: fixed;
            top: 0;
            left: 0;
            box-shadow: 0 0 15px rgba(0, 0, 0, 0.05);
            border-right: 1px solid #eee;
            transition: all 0.3s ease;
            display: flex;
            flex-direction: column;
            padding: 0;
            overflow-y: auto;
            z-index: 100;
          }

          /* Logo area */
          .logo {
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 20px 0;
            border-bottom: 2px solid #ff6600;
          }

          .logo-img {
            width: auto;
            height: 40px;
            max-width: 80%;
          }

          /* Navigation */
          nav {
            flex: 1;
            overflow-y: auto;
            padding: 10px 0;
          }

          .nav-list {
            list-style: none;
            padding: 0;
            margin: 0;
          }

          .nav-item {
            margin: 5px 10px;
          }

          .nav-link {
            display: flex;
            align-items: center;
            padding: 12px 15px;
            text-decoration: none;
            color: #555;
            border-radius: 8px;
            transition: all 0.2s ease;
          }

          .nav-icon {
            font-size: 20px;
            min-width: 25px;
          }

          .nav-text {
            margin-left: 12px;
            font-size: 16px;
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
            .mobile-toggle {
              display: flex;
            }

            .sidebar {
              width: 250px;
              transform: translateX(0);
            }

            .sidebar.closed {
              transform: translateX(-100%);
            }

            .sidebar.open {
              transform: translateX(0);
            }

            /* When sidebar is closed, show only icons in narrow mode */
            .sidebar.closed .nav-text {
              display: none;
            }

            .sidebar.closed {
              width: 70px;
            }

            .sidebar.closed .logo-img {
              width: 40px;
            }
          }

          /* For very small screens */
          @media (max-width: 576px) {
            .sidebar.open {
              width: 100%;
            }
          }
        `}</style>
      </div>
    </>
  );
};

export default SideNavbar;
