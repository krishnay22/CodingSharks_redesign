import { Container, Nav, Navbar } from "react-bootstrap";
import { NavLink, Link } from "react-router-dom";
import CustomButton from "./homecomponents/Landingbutoon";
import { useState, useEffect } from "react";
import UserMenu from "./UserMenu";

function Homenav() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    // Check if user is logged in based on the actual localStorage structure
    const checkLoginStatus = () => {
      const username = localStorage.getItem("username");
      const token = localStorage.getItem("token");
      const adminStatus = localStorage.getItem("isAdmin");

      if (username && token) {
        setIsLoggedIn(true);
        setUserName(username);

        // Set admin status if available
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
        {/* Move brand/logo to the far left */}
        <Navbar.Brand as={NavLink} to="/" className="brand-logo">
          <img
            src="https://www.thecodingsharks.in/image/Coding-Sharks-Logo.png"
            style={{ width: "115px", height: "auto" }}
            alt="Coding Sharks Logo"
          />
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          {/* Align navigation links to center-left */}
          <Nav className="nav-links">
            <Nav.Link as={NavLink} to="/" exact activeClassName="active">
              Home
            </Nav.Link>
            {isLoggedIn && (
              <Nav.Link as={NavLink} to="/dashboard" activeClassName="active">
                Dashboard
              </Nav.Link>
            )}
            {isAdmin && (
              <Nav.Link as={NavLink} to="/AdminLayout" activeClassName="active">
                Admin Panel
              </Nav.Link>
            )}
            <Nav.Link as={NavLink} to="/courses" activeClassName="active">
              Courses
            </Nav.Link>
            <Nav.Link
              as={NavLink}
              to="/StudentWorkPage"
              activeClassName="active"
            >
              Students Work
            </Nav.Link>
            <Nav.Link as={NavLink} to="/AboutUsPage" activeClassName="active">
              About us
            </Nav.Link>
          </Nav>

          {/* Keep login button on the far right */}
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

      {/* CSS Styles */}
      <style>
        {`
          .homenav {
            background-color: #ffffff !important; /* White background */
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
            color: lightgray !important; /* Default inactive color */
            transition: color 0.3s ease-in-out;
          }

          .nav-links a.active {
            color:rgb(0, 0, 0) !important; /* Active link color */
          }

          .nav-links a:hover {
            color: #ff9a70 !important; /* Hover effect */
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
