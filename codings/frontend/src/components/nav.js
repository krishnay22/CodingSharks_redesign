import { Container, Nav, Navbar, Button } from "react-bootstrap";
import { NavLink } from "react-router-dom";

function Homenav() {
  return (
    <>
      <Navbar className="homenav" expand="lg">
        {/* Move brand/logo to the far left */}
        <Navbar.Brand as={NavLink} to="/" className="brand-logo">
          Coding Sharks
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          {/* Align navigation links to center-left */}
          <Nav className="nav-links">
            <Nav.Link as={NavLink} to="/" exact>
              Home
            </Nav.Link>
            <Nav.Link as={NavLink} to="/dashboard">
              Dashboard
            </Nav.Link>
            <Nav.Link as={NavLink} to="/courses">
              Courses
            </Nav.Link>
            <Nav.Link as={NavLink} to="/students-work">
              Students Work
            </Nav.Link>
            <Nav.Link as={NavLink} to="/about">
              About us
            </Nav.Link>
          </Nav>

          {/* Keep login button on the far right */}
          <Nav className="ms-auto">
            <Button as={NavLink} to="/login" className="login-btn">
              Login
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <div className="nav-underline"></div>

      {/* Inline CSS at the bottom */}
      <style>
        {`
         .homenav {
            padding: 2px 15px !important; /* 3px top & bottom, 5px left & right */
          }

          .nav-links {
            padding: 3px !important;
          }

          .navbar-nav {
            padding: 3px !important;
          }

          .navbar-brand {
            padding: 3px !important;
          }

          .navbar-collapse {
            padding: 3px !important;
          }

          .login-btn {
            padding: 5px 15px !important; /* Keep minimal padding for button */
          }

s
        `}
      </style>
    </>
  );
}

export default Homenav;
