import React from "react";

const Footer = () => {
  // Inline CSS styles
  const styles = {
    footer: {
      backgroundColor: "#333",
      color: "white",
      padding: "20px 0",
      textAlign: "center",
    },
    footerContent: {
      maxWidth: "1200px",
      margin: "0 auto",
      padding: "0 20px",
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "space-between",
    },
    footerSection: {
      marginBottom: "20px",
      flex: "1 1 30%", // Default width of 30% for each section
      minWidth: "200px", // Minimum width for smaller screens
    },
    footerLinks: {
      marginTop: "10px",
    },
    link: {
      color: "white",
      textDecoration: "none",
      display: "block",
      margin: "5px 0",
      fontSize: "14px",
    },
    linkHover: {
      textDecoration: "underline",
    },
    coursesList: {
      listStyleType: "none",
      padding: "0",
      margin: "10px 0",
    },
    courseItem: {
      fontSize: "14px",
    },
    contactInfo: {
      fontSize: "14px",
    },
    contactDetails: {
      margin: "5px 0",
    },
  };

  return (
    <footer style={styles.footer}>
      <div style={styles.footerContent}>
        {/* About Us & Links Section */}
        <div style={styles.footerSection}>
          <p>&copy; 2025 Coding Sharks. All Rights Reserved.</p>
          <div style={styles.footerLinks}>
            <a
              href="#about"
              style={styles.link}
              onMouseEnter={(e) =>
                (e.target.style.textDecoration =
                  styles.linkHover.textDecoration)
              }
              onMouseLeave={(e) => (e.target.style.textDecoration = "none")}
            >
              About Us
            </a>
            <a
              href="#contact"
              style={styles.link}
              onMouseEnter={(e) =>
                (e.target.style.textDecoration =
                  styles.linkHover.textDecoration)
              }
              onMouseLeave={(e) => (e.target.style.textDecoration = "none")}
            >
              Contact
            </a>
            <a
              href="#privacy"
              style={styles.link}
              onMouseEnter={(e) =>
                (e.target.style.textDecoration =
                  styles.linkHover.textDecoration)
              }
              onMouseLeave={(e) => (e.target.style.textDecoration = "none")}
            >
              Privacy Policy
            </a>
          </div>
        </div>

        {/* Courses Section */}
        <div style={styles.footerSection}>
          <h3>Courses</h3>
          <ul style={styles.coursesList}>
            <li style={styles.courseItem}>MERN Stack Development</li>
            <li style={styles.courseItem}>Python</li>
            <li style={styles.courseItem}>Data Analytics & Visualization</li>
          </ul>
        </div>

        {/* Contact Information Section */}
        <div style={styles.footerSection}>
          <h3>Contact Us</h3>
          <div style={styles.contactInfo}>
            <div style={styles.contactDetails}>
              <p>Phone: +91 9424586286</p>
              <p>Email: info@thecodingsharks.in</p>
              <p>
                Address: Orange Business Park, 102, Bhawarkua Main Rd, above
                McDonald's, Indore, Madhya Pradesh 452001
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
