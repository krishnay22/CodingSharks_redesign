import React from "react";
import { NavLink } from "react-router-dom"; // Using NavLink for active styling
import {
  FaHome,
  FaUser,
  FaClipboardList,
  FaArchive,
  FaTachometerAlt,
  FaMedal,
  FaProjectDiagram,
} from "react-icons/fa";

const SideNavbar = () => {
  return (
    <div className="sidebar">
      <div className="logo">
        {/* Add logo here */}
        <img
          src="https://www.thecodingsharks.in/image/Coding-Sharks-Logo.png"
          alt="Logo"
          style={{ width: "80px", height: "40px" }}
        />
      </div>
      <ul className="nav-list">
        <li className="nav-item">
          <NavLink to="/" className="nav-link" activeClassName="active">
            <FaHome size={20} />
            <span>Home</span>
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/profile" className="nav-link" activeClassName="active">
            <FaUser size={20} />
            <span>Profile</span>
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink
            to="/daily-questions"
            className="nav-link"
            activeClassName="active"
          >
            <FaClipboardList size={20} />
            <span>Daily Questions</span>
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/archive" className="nav-link" activeClassName="active">
            <FaArchive size={20} />
            <span>Archive</span>
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink
            to="/course-timeline"
            className="nav-link"
            activeClassName="active"
          >
            <FaTachometerAlt size={20} />
            <span>Course Timeline</span>
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink
            to="/league-board"
            className="nav-link"
            activeClassName="active"
          >
            <FaMedal size={20} />
            <span>League Board</span>
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/projects" className="nav-link" activeClassName="active">
            <FaProjectDiagram size={20} />
            <span>Projects</span>
          </NavLink>
        </li>
      </ul>

      <style jsx>{`
        .sidebar {
          width: 250px;
          height: 100vh;
          background-color: #fff;
          color: #333;
          padding: 20px;
          position: fixed;
          top: 0;
          left: 0;
          box-shadow: none; /* Removed raised effect */
          display: flex;
          flex-direction: column;
          border-right: 5px solid #f8f8f8;
        }

        .logo {
          display: flex;
          justify-content: center;
          align-items: center;
          margin-bottom: 20px;
          border-bottom: 2px solid #ff6600; /* Adding a line BELOW the logo */
          padding-bottom: 10px; /* Optional: Adds spacing between the logo and the line */
        }

        .nav-list {
          list-style-type: none;
          padding-left: 0;
          margin: 0;
        }

        .nav-item {
          margin-bottom: 10px; /* Reduced the gap between items */
        }

        .nav-link {
          color: #333;
          text-decoration: none;
          display: flex;
          align-items: center;
          font-size: 18px;
          padding: 10px 20px;
          border-radius: 5px;
          transition: background-color 0.3s, color 0.3s;
        }

        .nav-link span {
          margin-left: 10px;
        }

        .nav-link:hover {
          background-color: #ff996e;
          color: #fff; /* White text on hover */
        }

        .active {
          background-color: #ff996e;
          color: #fff; /* White text when active */
          font-weight: bold;
        }

        .active span {
          font-weight: bold;
        }
      `}</style>
    </div>
  );
};

export default SideNavbar;
