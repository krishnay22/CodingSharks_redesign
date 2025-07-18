"use client";

import React, { useState, useEffect, useCallback } from "react";
import { FaUserGraduate } from "react-icons/fa"; // Assuming you have react-icons installed

const API_BASE_URL = "http://localhost:5000/api"; // Your backend API base URL

const ProfilePage = () => {
  const [profileData, setProfileData] = useState(null);
  const [courseProgressData, setCourseProgressData] = useState(null); // Will hold a single course's progress or null
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [authToken, setAuthToken] = useState(null);
  const [userId, setUserId] = useState(null);

  // --- Authentication Check ---
  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUserId = localStorage.getItem("userId");

    if (token && storedUserId) {
      setAuthToken(token);
      setUserId(storedUserId);
    } else {
      setError("You must be logged in to view your profile.");
      setLoading(false);
    }
  }, []);

  // --- Fetch User Profile and Associated Course Progress Data ---
  const fetchProfileAndProgress = useCallback(async () => {
    // Ensure userId is a valid non-empty string before proceeding
    if (
      !authToken ||
      !userId ||
      typeof userId !== "string" ||
      userId.trim() === ""
    ) {
      console.warn("Skipping fetch: authToken or userId is missing/invalid.", {
        authToken,
        userId,
      });
      setLoading(false);
      setError("Authentication token or User ID is missing. Please log in.");
      return;
    }

    setLoading(true);
    setError(null);
    try {
      // 1. Fetch User Profile Data from /api/users/:id
      const userResponse = await fetch(`${API_BASE_URL}/users/${userId}`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      if (!userResponse.ok) {
        const errData = await userResponse.json();
        throw new Error(errData.message || "Failed to fetch user profile.");
      }
      const userData = await userResponse.json();
      const user = userData.user; // Get the user object from the response

      // Map backend user data to frontend profileData state, aligning with your User model
      setProfileData({
        name: user.username || "N/A",
        bio: "Student | Web Developer", // Static default as 'bio' is not in your User model
        joinDate: user.joinedDate
          ? new Date(user.joinedDate).toLocaleDateString()
          : user.createdAt
          ? new Date(user.createdAt).toLocaleDateString()
          : "N/A",
        phoneno: user.phone || "N/A", // Using 'phone' from your User model
        email: user.email || "N/A",
        location: user.address || "N/A", // Using 'address' from your User model
      });

      // 2. Fetch User's Course Progress for their assigned course_id
      // The backend's /users/:id route should populate 'course_id' if it exists.
      if (user.course_id) {
        // user.course_id could be a populated object ({_id, name, ...}) or just the ID string if not populated
        const courseIdToFetch = user.course_id._id || user.course_id;
        const courseNameForDisplay = user.course_id.name || "Assigned Course"; // Use populated name, or fallback

        const progressResponse = await fetch(
          `${API_BASE_URL}/user-progress/${courseIdToFetch}`,
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          }
        );

        if (progressResponse.ok) {
          const progressData = await progressResponse.json();
          setCourseProgressData({
            course: courseNameForDisplay,
            progress: progressData.progress?.progress_percentage || 0,
          });
        } else {
          // If no specific progress record found for this assigned course, treat as 0%
          setCourseProgressData({
            course: courseNameForDisplay,
            progress: 0,
          });
          console.warn(
            `No specific progress record found for assigned course ${courseIdToFetch}. Displaying 0% progress.`
          );
        }
      } else {
        // If user is not associated with any course_id in their User model
        setCourseProgressData(null); // No course progress to display
        console.log("User is not associated with any course_id.");
      }
    } catch (err) {
      console.error("Error fetching data:", err);
      setError(err.message);
      setProfileData(null);
      setCourseProgressData(null);
    } finally {
      setLoading(false);
    }
  }, [authToken, userId]); // Re-run fetch when authToken or userId changes

  // --- Effect to trigger initial data fetching ---
  useEffect(() => {
    if (authToken && userId) {
      fetchProfileAndProgress();
    }
  }, [authToken, userId, fetchProfileAndProgress]); // Dependencies to re-run on auth state change

  // Media query implementation for React inline styles (as provided)
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

      // FIX: Iterate over styleObj, not the outer 'styles'
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

  const styles = {
    container: {
      display: "flex",

      padding: "20px",
      borderRadius: "20px",
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
      // This style is for the <img> tag, but we're using FaUserGraduate
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

  const responsiveStyles = useResponsiveStyles(styles);

  // Conditional rendering based on loading, error, and data presence
  if (loading) {
    return (
      <div style={responsiveStyles.container}>
        <div
          style={{
            textAlign: "center",
            padding: "50px",
            fontSize: "20px",
            color: "#666",
          }}
        >
          Loading profile data...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={responsiveStyles.container}>
        <div
          style={{
            backgroundColor: "#fee2e2",
            color: "#dc2626",
            padding: "20px",
            borderRadius: "10px",
            textAlign: "center",
          }}
        >
          Error: {error}
        </div>
      </div>
    );
  }

  if (!profileData) {
    return (
      <div style={responsiveStyles.container}>
        <div
          style={{
            textAlign: "center",
            padding: "50px",
            fontSize: "20px",
            color: "#666",
          }}
        >
          Please log in to view your profile.
        </div>
      </div>
    );
  }

  return (
    <div style={responsiveStyles.container}>
      <div style={responsiveStyles.card}>
        {/* Left Section */}
        <div style={responsiveStyles.leftSection}>
          {/* Using FaUserGraduate for avatar as provided */}
          <FaUserGraduate style={responsiveStyles.avatarIcon} />
          <h1 style={responsiveStyles.name}>{profileData.name}</h1>
          <p style={responsiveStyles.bio}>{profileData.bio}</p>
        </div>

        {/* Right Section */}
        <div style={responsiveStyles.rightSection}>
          {/* Personal Info */}
          <div>
            <h2 style={responsiveStyles.sectionTitle}>Personal Info</h2>
            <p style={responsiveStyles.infoItem}>
              <strong>Email:</strong> {profileData.email}
            </p>
            <p style={responsiveStyles.infoItem}>
              <strong>Location:</strong> {profileData.location}
            </p>
            <p style={responsiveStyles.infoItem}>
              <strong>Joined:</strong> {profileData.joinDate}
            </p>
            <p style={responsiveStyles.infoItem}>
              <strong>Phone no.:</strong> {profileData.phoneno}
            </p>
          </div>

          {/* Course Progress */}
          <div>
            <h2 style={responsiveStyles.sectionTitle}>Course Progress</h2>
            {courseProgressData ? (
              <div>
                <p style={responsiveStyles.courseText}>{`${
                  courseProgressData.course
                } (${courseProgressData.progress.toFixed(0)}%)`}</p>
                <div style={responsiveStyles.progressBarContainer}>
                  <div
                    style={responsiveStyles.progressBar(
                      courseProgressData.progress
                    )}
                  ></div>
                </div>
              </div>
            ) : (
              <p style={responsiveStyles.infoItem}>
                Not enrolled in a course or no progress found yet.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
