import React from "react";
import { FaUserGraduate } from "react-icons/fa";

const ProfilePage = () => {
  const styles = {
    container: {
      display: "flex",
      flexDirection: "column",
      fontFamily: "Arial, sans-serif",
      maxWidth: "1200px",
      margin: "0 auto",
      padding: "clamp(10px, 2vw, 20px)",
      borderRadius: "20px",
      minHeight: "clamp(400px, 80vh, 650px)",
      background: "#F8F8F8",
      width: "100%",
      boxSizing: "border-box",
      overflow: "hidden",
    },
    card: {
      backgroundColor: "#fff",
      borderRadius: "20px",
      maxWidth: "1200px",
      width: "100%",
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: "40px",
      padding: "40px",
      transition: "transform 0.3s",
      "@media (max-width: 992px)": {
        gridTemplateColumns: "1fr 1fr",
        padding: "30px",
        gap: "30px",
      },
      "@media (max-width: 768px)": {
        gridTemplateColumns: "1fr",
        padding: "25px",
        gap: "25px",
      },
      "@media (max-width: 576px)": {
        padding: "20px",
        gap: "20px",
      },
    },
    leftSection: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      textAlign: "center",
      padding: "20px",
      "@media (max-width: 768px)": {
        padding: "10px",
      },
    },
    rightSection: {
      display: "flex",
      flexDirection: "column",
      gap: "30px",
      "@media (max-width: 768px)": {
        gap: "20px",
      },
    },
    avatarIcon: {
      fontSize: "100px",
      color: "#ff6b6b",
      marginBottom: "20px",
      "@media (max-width: 576px)": {
        fontSize: "80px",
        marginBottom: "15px",
      },
    },
    name: {
      fontSize: "32px",
      fontWeight: "700",
      color: "#333",
      "@media (max-width: 768px)": {
        fontSize: "28px",
      },
      "@media (max-width: 576px)": {
        fontSize: "24px",
      },
    },
    bio: {
      fontSize: "18px",
      color: "#777",
      marginTop: "10px",
      "@media (max-width: 576px)": {
        fontSize: "16px",
      },
    },
    sectionTitle: {
      fontSize: "24px",
      fontWeight: "600",
      color: "#333",
      marginBottom: "15px",
      "@media (max-width: 768px)": {
        fontSize: "22px",
        marginBottom: "12px",
      },
      "@media (max-width: 576px)": {
        fontSize: "20px",
        marginBottom: "10px",
      },
    },
    infoItem: {
      fontSize: "16px",
      color: "#555",
      marginBottom: "10px",
      "@media (max-width: 576px)": {
        fontSize: "14px",
        marginBottom: "8px",
      },
    },
    progressBarContainer: {
      backgroundColor: "#eee",
      borderRadius: "10px",
      overflow: "hidden",
      height: "10px",
      width: "100%",
    },
    progressBar: (width) => ({
      height: "100%",
      width: `${width}%`,
      backgroundColor: "#FF996E",
      transition: "width 0.5s ease-in-out",
    }),
    courseText: {
      fontSize: "16px",
      color: "#333",
      marginBottom: "8px",
      "@media (max-width: 576px)": {
        fontSize: "14px",
        marginBottom: "6px",
      },
    },
    skillsList: {
      display: "flex",
      flexWrap: "wrap",
      gap: "10px",
      listStyle: "none",
      padding: 0,
      margin: 0,
    },
    skillItem: {
      backgroundColor: "#f1f1f1",
      padding: "10px 15px",
      borderRadius: "10px",
      fontSize: "14px",
      color: "#333",
      transition: "all 0.3s",
      "@media (max-width: 576px)": {
        padding: "8px 12px",
        fontSize: "12px",
      },
    },
    avatar: {
      width: "100px",
      height: "100px",
      borderRadius: "50%",
      marginBottom: "20px",
      objectFit: "cover",
      border: "4px solid #ff6b6b",
      backgroundColor: "#fff",
      "@media (max-width: 768px)": {
        width: "90px",
        height: "90px",
      },
      "@media (max-width: 576px)": {
        width: "80px",
        height: "80px",
        border: "3px solid #ff6b6b",
      },
    },
  };

  const studentInfo = {
    name: "Monika Patidar",
    bio: "Student | Web Developer",
    joinDate: "January 15, 2023",
    phoneno: "900768934",
    email: "monika.patidar@example.com",
    location: "Dewas, Madhya Pradesh",
  };

  const courses = [
    { course: "HTML + CSS", progress: 90 },
    { course: "JavaScript", progress: 70 },
    { course: "ReactJS", progress: 50 },
    { course: "NodeJS", progress: 30 },
  ];

  // Media query implementation for React inline styles
  const useResponsiveStyles = (styles) => {
    const [windowWidth, setWindowWidth] = React.useState(
      typeof window !== "undefined" ? window.innerWidth : 992
    );

    React.useEffect(() => {
      if (typeof window === "undefined") return;

      const handleResize = () => {
        setWindowWidth(window.innerWidth);
      };

      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }, []);

    const applyResponsiveStyles = (styleObj) => {
      if (typeof styleObj !== "object" || styleObj === null) return styleObj;

      const baseStyles = {};
      const mediaQueryBreakpoints = {
        576: {},
        768: {},
        992: {},
      };

      Object.entries(styleObj).forEach(([key, value]) => {
        if (key.startsWith("@media")) {
          const breakpointMatch = key.match(/\(max-width: (\d+)px\)/);
          if (breakpointMatch && breakpointMatch[1]) {
            const breakpoint = parseInt(breakpointMatch[1]);
            if (breakpoint in mediaQueryBreakpoints) {
              Object.assign(mediaQueryBreakpoints[breakpoint], value);
            }
          }
        } else {
          baseStyles[key] = value;
        }
      });

      let resultStyles = { ...baseStyles };

      // Apply styles based on current window width
      if (windowWidth <= 576) {
        resultStyles = {
          ...resultStyles,
          ...mediaQueryBreakpoints[992],
          ...mediaQueryBreakpoints[768],
          ...mediaQueryBreakpoints[576],
        };
      } else if (windowWidth <= 768) {
        resultStyles = {
          ...resultStyles,
          ...mediaQueryBreakpoints[992],
          ...mediaQueryBreakpoints[768],
        };
      } else if (windowWidth <= 992) {
        resultStyles = { ...resultStyles, ...mediaQueryBreakpoints[992] };
      }

      return resultStyles;
    };

    const responsiveStyles = {};
    Object.entries(styles).forEach(([key, value]) => {
      if (typeof value === "function") {
        responsiveStyles[key] = value;
      } else {
        responsiveStyles[key] = applyResponsiveStyles(value);
      }
    });

    return responsiveStyles;
  };

  const responsiveStyles = useResponsiveStyles(styles);

  return (
    <div style={responsiveStyles.container}>
      <div style={responsiveStyles.card}>
        {/* Left Section */}
        <div style={responsiveStyles.leftSection}>
          <img
            src="https://cdn-icons-png.flaticon.com/128/64/64572.png"
            alt="Profile Avatar"
            style={responsiveStyles.avatar}
          />
          <h1 style={responsiveStyles.name}>{studentInfo.name}</h1>
          <p style={responsiveStyles.bio}>{studentInfo.bio}</p>
        </div>

        {/* Right Section */}
        <div style={responsiveStyles.rightSection}>
          {/* Personal Info */}
          <div>
            <h2 style={responsiveStyles.sectionTitle}>Personal Info</h2>
            <p style={responsiveStyles.infoItem}>
              <strong>Email:</strong> {studentInfo.email}
            </p>
            <p style={responsiveStyles.infoItem}>
              <strong>Location:</strong> {studentInfo.location}
            </p>
            <p style={responsiveStyles.infoItem}>
              <strong>Joined:</strong> {studentInfo.joinDate}
            </p>
            <p style={responsiveStyles.infoItem}>
              <strong>Phone no.</strong> {studentInfo.phoneno}
            </p>
          </div>

          {/* Course Progress */}
          <div>
            <h2 style={responsiveStyles.sectionTitle}>Course Progress</h2>
            {courses.map((item, index) => (
              <div key={index}>
                <p
                  style={responsiveStyles.courseText}
                >{`${item.course} (${item.progress}%)`}</p>
                <div style={responsiveStyles.progressBarContainer}>
                  <div
                    style={responsiveStyles.progressBar(item.progress)}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
