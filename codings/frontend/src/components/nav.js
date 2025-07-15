import { Container, Nav, Navbar } from "react-bootstrap";
import { NavLink, Link } from "react-router-dom";
import CustomButton from "./homecomponents/Landingbutoon";
import { useState, useEffect } from "react";
import UserMenu from "./UserMenu";
import logo from "../images/images for project/Coding-Sharks-Logo.png";

function Homenav() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const checkLoginStatus = () => {
      const username = localStorage.getItem("username");
      const token = localStorage.getItem("token");
      const adminStatus = localStorage.getItem("isAdmin");

      if (username && token) {
        setIsLoggedIn(true);
        setUserName(username);

        if (adminStatus === "true") {
          setIsAdmin(true);
        }
      }
    };

    checkLoginStatus();
  }, []);

  return (
    <>
      <Navbar className="homenav" expand="lg">
        <Navbar.Brand as={NavLink} to="/" className="brand-logo">
          <img
            src={logo}
            style={{ width: "115px", height: "auto" }}
            alt="Coding Sharks Logo"
          />
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="nav-links">
            <Nav.Link
              as={NavLink}
              to="/"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              Home
            </Nav.Link>
            {isLoggedIn && (
              <Nav.Link
                as={NavLink}
                to="/dashboard"
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                Dashboard
              </Nav.Link>
            )}
            {isAdmin && (
              <Nav.Link
                as={NavLink}
                to="/AdminLayout"
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                Admin Panel
              </Nav.Link>
            )}
            <Nav.Link
              as={NavLink}
              to="/courses"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              Courses
            </Nav.Link>
            <Nav.Link
              as={NavLink}
              to="/StudentWorkPage"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              Students Work
            </Nav.Link>
            <Nav.Link
              as={NavLink}
              to="/AboutUsPage"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              About us
            </Nav.Link>
          </Nav>

          <Nav className="ms-auto">
            {isLoggedIn ? (
              <UserMenu userName={userName} />
            ) : (
              <Link to="/LoginPage" style={{ textDecoration: "none" }}>
                <CustomButton
                  text="Login"
                  accentColor="#FF9A70"
                  primaryColor="#ffffff"
                />
              </Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <div className="nav-underline"></div>

      <style>
        {`
          .homenav {
            background-color: #ffffff !important;
            padding: 5px 20px !important;
            font-size: 18px;
          }

          .brand-logo {
            font-size: 24px;
            font-weight: bold;
            color: rgb(0, 0, 0) !important;
          }

          .nav-underline {
            height: 0.1px;
            background-color: #ff9a70;
            width: 100%;
          }

          .nav-links {
            display: flex;
            gap: 20px;
          }

          .nav-links a {
            text-decoration: none;
            font-size: 18px;
            color: lightgray !important;
            transition: color 0.3s ease-in-out;
          }

          .nav-links a.active {
            color: rgb(0, 0, 0) !important;
          }

          .nav-links a:hover {
            color: #ff9a70 !important;
          }

          .login-btn {
            background-color: white !important;
            color: black !important;
            border-radius: 50px !important;
            padding: 5px 15px;
            font-weight: bold;
            border: 0.1px solid black !important;
            transition: background-color 0.3s ease-in-out, border-color 0.3s ease-in-out;
          }

          .login-btn:hover {
            background-color: #ff9a70 !important;
            color: white !important;
            border-color: #ff9a70 !important;
          }
        `}
      </style>
    </>
  );
}

export default Homenav;
