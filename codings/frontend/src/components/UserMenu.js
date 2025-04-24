import React from "react";
import { Link } from "react-router-dom";

function UserMenu({ userName, isAdmin }) {
  const handleLogout = () => {
    // Clear all user-related data from localStorage
    localStorage.removeItem("username");
    localStorage.removeItem("token");
    localStorage.removeItem("isAdmin");

    // Refresh the page to update the UI state
    window.location.reload();
  };

  return (
    <div className="user-menu">
      <div className="user-dropdown">
        <Link to="/profile" style={{ textDecoration: "none" }}>
          <button className="menu-btn">{userName}</button>
        </Link>
        {isAdmin && (
          <Link to="/AdminLayout" style={{ textDecoration: "none" }}>
            <button className="menu-btn admin-btn">Admin</button>
          </Link>
        )}
        <button className="menu-btn logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>

      {/* CSS Styles */}
      <style>
        {`
          .user-menu {
            display: flex;
            align-items: center;
            position: relative;
            gap: 10px;
          }
          
          .welcome-text {
            color: #000;
            font-weight: 500;
          }
          
          .user-dropdown {
            display: flex;
            flex-direction: row;
            gap: 8px;
          }
          
          .menu-btn {
            background-color: white;
            color: black;
            border-radius: 50px;
            padding: 5px 15px;
            font-weight: bold;
            border: 0.1px solid black;
            transition: background-color 0.3s ease-in-out, border-color 0.3s ease-in-out;
            cursor: pointer;
          }
          
          .menu-btn:hover {
            background-color: #FF9A70;
            color: white;
            border-color: #FF9A70;
          }
          
          .admin-btn {
            background-color: #f0f0f0;
          }
          
          .logout-btn {
            background-color: #f8f8f8;
          }
        `}
      </style>
    </div>
  );
}

export default UserMenu;
