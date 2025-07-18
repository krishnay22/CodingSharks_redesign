"use client";

import React, { useState, useEffect, useCallback } from "react";
import { FaUserGraduate } from "react-icons/fa"; // For student avatar icon

const API_BASE_URL = "http://localhost:5000/api"; // Your backend API base URL

const StudentCourseViewForAdmin = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [authToken, setAuthToken] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  const [courses, setCourses] = useState([]); // All available courses for dropdown
  const [selectedCourseId, setSelectedCourseId] = useState(""); // Currently selected course ID
  const [allUsers, setAllUsers] = useState([]); // All users fetched (assuming a /api/users endpoint)
  const [studentsData, setStudentsData] = useState([]); // Filtered students and their progress for the selected course

  // --- Authentication Check ---
  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedIsAdmin = localStorage.getItem("isAdmin") === "true";

    if (token && storedIsAdmin) {
      setAuthToken(token);
      setIsAdmin(storedIsAdmin);
      // If admin, proceed to fetch courses and all users
      fetchCourses(token);
      fetchAllUsers(token); // New fetch for all users
    } else {
      setError(
        "You are not authorized to view this page. Admin access required."
      );
      setLoading(false);
    }
  }, []);

  // --- Fetch All Courses ---
  const fetchCourses = useCallback(async (token) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_BASE_URL}/courses`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.message || "Failed to fetch courses.");
      }
      const data = await response.json();
      setCourses(data.courses);
      if (data.courses.length > 0) {
        setSelectedCourseId(data.courses[0]._id); // Auto-select the first course
      }
    } catch (err) {
      console.error("Error fetching courses:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  // --- NEW: Fetch All Users (Requires backend /api/users endpoint) ---
  const fetchAllUsers = useCallback(async (token) => {
    setLoading(true);
    setError(null);
    try {
      // THIS API ENDPOINT IS ASSUMED TO EXIST IN YOUR BACKEND AND RETURN ALL USERS
      // For example, if you had a route like:
      // router.get("/users", protect, checkAdmin, async (req, res) => {
      //   const users = await User.find().select('-password').populate('course_id', 'name');
      //   res.status(200).json({ users });
      // });
      const response = await fetch(`${API_BASE_URL}/users`, {
        // Assuming /api/users returns ALL users
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        const errData = await response.json();
        // If the endpoint doesn't exist or isn't accessible, this will catch it.
        throw new Error(
          errData.message ||
            "Failed to fetch all users. Ensure /api/users endpoint exists and is accessible by admin."
        );
      }
      const data = await response.json();
      setAllUsers(data.users); // Assuming response structure is { users: [...] }
    } catch (err) {
      console.error("Error fetching all users:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  // --- Filter Students and Fetch Their Progress for the Selected Course ---
  const filterAndFetchProgress = useCallback(async () => {
    if (!authToken || !isAdmin || !selectedCourseId || allUsers.length === 0) {
      setStudentsData([]);
      return;
    }

    setLoading(true);
    setError(null);
    try {
      // Filter users whose course_id matches the selectedCourseId
      const studentsInSelectedCourse = allUsers.filter(
        (user) =>
          user.course_id &&
          (user.course_id._id === selectedCourseId ||
            user.course_id === selectedCourseId)
      );

      // Fetch individual progress for each filtered student
      const studentsWithProgressPromises = studentsInSelectedCourse.map(
        async (student) => {
          try {
            // Use the student's actual ID for the progress fetch
            const progressResponse = await fetch(
              `${API_BASE_URL}/user-progress/${selectedCourseId}`,
              {
                headers: {
                  Authorization: `Bearer ${authToken}`,
                },
              }
            );
            if (progressResponse.ok) {
              const progressData = await progressResponse.json();
              return {
                _id: student._id,
                username: student.username,
                email: student.email,
                progress_percentage:
                  progressData.progress?.progress_percentage || 0,
              };
            } else {
              console.warn(
                `No progress found for student ${student.username} in course ${selectedCourseId}. Defaulting to 0%.`
              );
              return {
                _id: student._id,
                username: student.username,
                email: student.email,
                progress_percentage: 0,
              };
            }
          } catch (innerErr) {
            console.error(
              `Error fetching progress for student ${student.username}:`,
              innerErr
            );
            return {
              _id: student._id,
              username: student.username,
              email: student.email,
              progress_percentage: 0,
            }; // Default to 0% on error
          }
        }
      );

      const studentsWithProgress = await Promise.all(
        studentsWithProgressPromises
      );
      setStudentsData(studentsWithProgress);
    } catch (err) {
      console.error("Error filtering students or fetching progress:", err);
      setError(err.message);
      setStudentsData([]);
    } finally {
      setLoading(false);
    }
  }, [authToken, isAdmin, selectedCourseId, allUsers]); // Depend on allUsers now

  // --- Effects to trigger filtering and progress fetch ---
  useEffect(() => {
    if (authToken && isAdmin && selectedCourseId && allUsers.length > 0) {
      filterAndFetchProgress();
    }
  }, [authToken, isAdmin, selectedCourseId, allUsers, filterAndFetchProgress]);

  // Inline Styles (adapted for this component)
  const styles = {
    container: {
      padding: "clamp(10px, 2vw, 20px)",
      borderRadius: "20px",
      background: "#F8F8F8",
      width: "100%",
      boxSizing: "border-box",
      fontFamily: "Arial, sans-serif",
    },
    header: {
      textAlign: "center",
      fontSize: "28px",
      fontWeight: "bold",
      marginBottom: "30px",
      color: "#333",
    },
    selectContainer: {
      marginBottom: "20px",
      textAlign: "center",
    },
    select: {
      padding: "10px 15px",
      borderRadius: "8px",
      border: "1px solid #ccc",
      fontSize: "16px",
      minWidth: "250px",
      cursor: "pointer",
    },
    studentsGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
      gap: "20px",
      padding: "20px",
      backgroundColor: "#fff",
      borderRadius: "15px",
      boxShadow: "0 4px 15px rgba(0,0,0,0.05)",
    },
    studentCard: {
      backgroundColor: "#fdfdfd",
      borderRadius: "12px",
      padding: "20px",
      boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      textAlign: "center",
      border: "1px solid #eee",
      transition: "transform 0.2s ease-in-out",
    },
    studentCardHover: {
      transform: "translateY(-5px)",
      boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    },
    avatarIcon: {
      fontSize: "60px",
      color: "#ff6b6b",
      marginBottom: "15px",
    },
    studentName: {
      fontSize: "20px",
      fontWeight: "600",
      color: "#333",
      marginBottom: "5px",
    },
    studentEmail: {
      fontSize: "14px",
      color: "#777",
      marginBottom: "15px",
    },
    progressBarContainer: {
      backgroundColor: "#eee",
      borderRadius: "10px",
      overflow: "hidden",
      height: "8px",
      width: "100%",
      marginTop: "10px",
    },
    progressBar: (width) => ({
      height: "100%",
      width: `${width}%`,
      backgroundColor: "#FF9A70",
      transition: "width 0.5s ease-in-out",
    }),
    progressText: {
      fontSize: "13px",
      color: "#FF9A70",
      marginTop: "5px",
      fontWeight: "bold",
    },
    message: {
      textAlign: "center",
      padding: "20px",
      fontSize: "18px",
      color: "#666",
    },
    errorMessage: {
      backgroundColor: "#fee2e2",
      color: "#dc2626",
      padding: "15px",
      borderRadius: "8px",
      textAlign: "center",
      margin: "20px auto",
      maxWidth: "600px",
    },
  };

  // Helper for responsive styles (re-used from your ProfilePage)
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

  if (loading) {
    return (
      <div style={responsiveStyles.container}>
        <div style={responsiveStyles.message}>Loading data...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={responsiveStyles.container}>
        <div style={responsiveStyles.errorMessage}>Error: {error}</div>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div style={responsiveStyles.container}>
        <div style={responsiveStyles.errorMessage}>
          Access Denied: You must be an administrator to view this page.
        </div>
      </div>
    );
  }

  return (
    <div style={responsiveStyles.container}>
      <h1 style={responsiveStyles.header}>Student Progress Overview</h1>

      <div style={responsiveStyles.selectContainer}>
        <label
          htmlFor="course-select"
          style={{ marginRight: "10px", fontWeight: "bold" }}
        >
          Select Course:
        </label>
        <select
          id="course-select"
          style={responsiveStyles.select}
          value={selectedCourseId}
          onChange={(e) => setSelectedCourseId(e.target.value)}
          disabled={courses.length === 0}
        >
          {courses.length === 0 ? (
            <option value="">No courses available</option>
          ) : (
            courses.map((course) => (
              <option key={course._id} value={course._id}>
                {course.name}
              </option>
            ))
          )}
        </select>
      </div>

      {selectedCourseId && studentsData.length === 0 && !loading && (
        <div style={responsiveStyles.message}>
          No students found for this course, or no progress recorded yet.
        </div>
      )}

      {selectedCourseId && studentsData.length > 0 && (
        <div style={responsiveStyles.studentsGrid}>
          {studentsData.map((student) => (
            <div key={student._id} style={responsiveStyles.studentCard}>
              <FaUserGraduate style={responsiveStyles.avatarIcon} />
              <h3 style={responsiveStyles.studentName}>{student.username}</h3>
              <p style={responsiveStyles.studentEmail}>{student.email}</p>
              <div>
                <p style={responsiveStyles.progressText}>
                  Progress: {student.progress_percentage.toFixed(0)}%
                </p>
                <div style={responsiveStyles.progressBarContainer}>
                  <div
                    style={responsiveStyles.progressBar(
                      student.progress_percentage
                    )}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default StudentCourseViewForAdmin;
