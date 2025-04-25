import React from "react";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <img
            src="https://www.thecodingsharks.in/image/Coding-Sharks-Logo.png"
            alt="Logo"
            style={{
              width: "200px",
              height: "auto",
              display: "block",
              marginLeft: "0",
            }}
          />
        </div>

        <div className="footer-sections">
          <div className="footer-section">
            <h3>CONTACT US</h3>
            <ul className="footer-links">
              <li>
                <a href="#general-enquiries">Phone: +91 7747004451</a>
              </li>
              <li>
                <a href="#contact-admissions">
                  {" "}
                  Email: info@thecodingsharks.in
                </a>
              </li>
            </ul>
          </div>

          <div className="footer-section">
            <h3>DIRECTIONS</h3>
            <ul className="footer-links">
              <li>
                <a href="#find-us">Google Location</a>
              </li>
              <li></li>
            </ul>
          </div>
          <div className="footer-section">
            <h3>COURSES</h3>
            <ul className="footer-links">
              <li>
                <a href="#find-us">MERN stack development</a>
              </li>
              <li>
                <a href="#find-us">PYTHON Developer</a>
              </li>
              <li>
                <a href="#find-us">Data Analyst</a>
              </li>
            </ul>
          </div>

          <div className="footer-section">
            <h3>FOR THE PUBLIC</h3>
            <ul className="footer-links">
              <li>
                <a href="#visit-us">Students Work</a>
              </li>
              <li>
                <a href="#guided-tours">About Us </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="social-icons">
            <a href="#facebook" aria-label="Facebook">
              <i className="social-icon facebook"></i>
            </a>
            <a href="#twitter" aria-label="Twitter">
              <i className="social-icon twitter"></i>
            </a>
            <a href="#instagram" aria-label="Instagram">
              <i className="social-icon instagram"></i>
            </a>
            <a href="#linkedin" aria-label="LinkedIn">
              <i className="social-icon linkedin"></i>
            </a>
          </div>

          <div className="copyright">
            <p>© 2025 Coding Sharks. All rights reserved.</p>
          </div>

          <div className="policies">
            <a href="#cookie-policy">COOKIE POLICY</a>
            <a href="#privacy-policy">PRIVACY POLICY</a>
            <a href="https://www.linkedin.com/in/krishna-yadav-0585682a6/">
              BY KRISHNA YADAV
            </a>
          </div>
        </div>
      </div>

      <style jsx>{`
        .footer {
          background-color: rgb(255, 255, 255);
          color: rgb(0, 0, 0);
          padding: 40px 0 20px;
          border-top: 1px solid #ff996e;
          font-family: "Arial", sans-serif;
        }

        .footer-content {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 20px;
        }

        .footer-sections {
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
          margin-bottom: 40px;
        }

        .footer-section {
          margin-bottom: 30px;
          flex: 1 1 15%;
          min-width: 160px;
        }

        .footer-section h3 {
          color: black;
          font-weight: normal;
          font-size: 23px;
          letter-spacing: 0.5px;
          margin-bottom: 20px;
          margin-top: 0;
        }

        .diaries-heading {
          margin-top: 40px !important;
        }

        .footer-links {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .footer-links li {
          margin-bottom: 10px;
        }

        .footer-links a {
          color: rgb(123, 123, 123);
          text-decoration: none;
          font-size: 15px;
          transition: color 0.3s;
        }

        .footer-links a:hover {
          color: #ff996e;
        }

        .footer-bottom {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-top: 20px;
          border-top: 1px solid #ff996e;
          flex-wrap: wrap;
        }

        .social-icons {
          display: flex;
          gap: 15px;
        }

        .social-icon {
          display: inline-block;
          width: 24px;
          height: 24px;
          background-color: black;
          mask-size: contain;
          mask-repeat: no-repeat;
          mask-position: center;
          cursor: pointer;
        }

        .facebook {
          mask-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 320 512'%3E%3Cpath d='M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z'/%3E%3C/svg%3E");
        }

        .twitter {
          mask-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'%3E%3Cpath d='M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z'/%3E%3C/svg%3E");
        }

        .instagram {
          mask-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 448 512'%3E%3Cpath d='M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z'/%3E%3C/svg%3E");
        }

        .linkedin {
          mask-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 448 512'%3E%3Cpath d='M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z'/%3E%3C/svg%3E");
        }

        .copyright {
          font-size: 12px;
          text-align: center;
        }

        .copyright p {
          margin: 5px 0;
        }

        .policies {
          display: flex;
          gap: 20px;
        }

        .policies a {
          color: rgb(0, 0, 0);
          text-decoration: none;
          font-size: 12px;
          transition: color 0.3s;
        }

        .policies a:hover {
          color: #ff996e;
        }

        @media (max-width: 768px) {
          .footer-section {
            flex: 1 1 40%;
          }

          .footer-bottom {
            flex-direction: column;
            gap: 20px;
            text-align: center;
          }

          .social-icons {
            justify-content: center;
          }

          .policies {
            justify-content: center;
          }
        }

        @media (max-width: 480px) {
          .footer-section {
            flex: 1 1 100%;
          }
        }
      `}</style>
    </footer>
  );
};

export default Footer;
