import React from "react";
import { NavLink } from "react-router-dom";
import {
  FaHome,
  FaUser,
  FaClipboardList,
  FaMedal,
  FaProjectDiagram,
} from "react-icons/fa";
import { FaTimeline } from "react-icons/fa6";
import { TbLayoutDashboardFilled } from "react-icons/tb";

const SideNav = () => {
  return (
    <div className="sidenav-container">
      <div className="sidebar">
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
                <TbLayoutDashboardFilled className="nav-icon" />
                <span className="nav-text">Dashboard</span>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/dashboard/Profile"
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
                to="/dashboard/Dailyquestions"
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
                to="/dashboard/CourseTimeline"
                className={({ isActive }) =>
                  isActive ? "nav-link active" : "nav-link"
                }
              >
                <FaTimeline className="nav-icon" />
                <span className="nav-text">Course Timeline</span>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/dashboard/LeagueBoard"
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
                to="/dashboard/Projects"
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
      </div>

      {/* Styles */}
      <style jsx>{`
        .sidenav-container {
          position: relative;
          height: 100%;
        }

        /* Sidebar styles */
        .sidebar {
          width: 230px;
          height: 100vh;
          background-color: #fff;
          color: #333;
          position: fixed;
          top: 0;
          left: 0;
          box-shadow: 0 0 15px rgba(0, 0, 0, 0.05);
          border-right: 1px solid #eee;
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
          padding: 14px 0;
          border-bottom: 2px solid #ff996e; /* Updated border color */
          overflow: hidden; /* Prevent logo overflow */
        }

        .logo-img {
          width: auto;
          height: 40px;
          max-width: 80%;
          opacity: 0.9;
        }

        /* Navigation */
        nav {
          flex: 1;
          overflow-y: auto;
          overflow-x: hidden; /* Prevent horizontal scrollbar */
          padding: 2px 0;
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
          color: #777;
          border-radius: 8px;
          transition: all 0.2s ease;
          overflow: hidden; /* Prevent text overflow */
        }

        .nav-icon {
          font-size: 16px;
          min-width: 20px;
          flex-shrink: 0;
          opacity: 0.75;
        }

        .nav-text {
          margin-left: 12px;
          font-size: 14px;
          font-weight: 400;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          letter-spacing: 0.2px;
        }

        .nav-link:hover {
          background-color: #f9f9f9;
          color: #ff6600;
          transform: translateX(3px);
        }

        .nav-link.active {
          background-color: #fff0e8;
          color: #ff6600;
          font-weight: 500;
          transform: none;
        }

        .nav-link.active .nav-icon {
          opacity: 1;
        }

        /* Responsive styles */
        @media (max-width: 768px) {
          .sidebar {
            width: 220px;
          }
        }
      `}</style>
    </div>
  );
};

export default SideNav;
