"use client";

import React, { useState, useEffect, useCallback } from "react";

const API_BASE_URL = "http://localhost:5000/api"; // Your backend API base URL

const CourseTimeline = () => {
  const [expandedTopics, setExpandedTopics] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState("");
  const [modalTitle, setModalTitle] = useState("");

  // Backend Integration States
  // 'courses' state is still used to fetch all courses initially, but not for dropdown
  const [courses, setCourses] = useState([]);
  const [displayCourse, setDisplayCourse] = useState(null); // The full course object to display
  const [userProgress, setUserProgress] = useState(null); // Progress for the displayCourse
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [authToken, setAuthToken] = useState(null);
  const [userId, setUserId] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [message, setMessage] = useState("");

  // State for Admin Question Upload Form
  const [uploadFile, setUploadFile] = useState(null);
  const [uploadMessage, setUploadMessage] = useState("");

  // --- Authentication Check ---
  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUserId = localStorage.getItem("userId");
    const storedIsAdmin = localStorage.getItem("isAdmin") === "true";

    if (token && storedUserId) {
      setAuthToken(token);
      setUserId(storedUserId);
      setIsAdmin(storedIsAdmin);
    } else {
      setError("You must be logged in to view course progress.");
      setLoading(false);
    }
  }, []);

  // --- Fetch User's Enrolled Course and Progress ---
  const fetchUserEnrolledCourseAndProgress = useCallback(async () => {
    if (!authToken || !userId) {
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);
    try {
      // Step 1: Fetch all user progress records for the logged-in user
      // Note: Your backend doesn't have a direct route to get ALL progress for a user across courses.
      // We'll simulate by fetching all courses and then checking if the user has progress for them.
      // A more efficient backend would have a /api/user-progress route that returns all progress for a user.
      // For now, we'll fetch all courses and then try to find the first one with progress.

      const allCoursesResponse = await fetch(`${API_BASE_URL}/courses`, {
        headers: { Authorization: `Bearer ${authToken}` },
      });
      if (!allCoursesResponse.ok) {
        const errData = await allCoursesResponse.json();
        throw new Error(
          errData.message || "Failed to fetch available courses."
        );
      }
      const allCoursesData = await allCoursesResponse.json();
      setCourses(allCoursesData.courses); // Keep this for potential future use or admin view

      let foundCourseId = null;
      // Try to find a course for which the user has progress
      for (const course of allCoursesData.courses) {
        const progressResponse = await fetch(
          `${API_BASE_URL}/user-progress/${course._id}`,
          {
            headers: { Authorization: `Bearer ${authToken}` },
          }
        );
        if (progressResponse.ok) {
          const progressData = await progressResponse.json();
          if (
            progressData.progress &&
            progressData.progress.completed_subtopics
          ) {
            // Found a course with existing progress, use this one
            foundCourseId = course._id;
            setUserProgress(progressData.progress);
            setDisplayCourse(course); // Set the full course object
            break; // Stop after finding the first one
          }
        }
      }

      if (!foundCourseId) {
        // If no progress found, but there are courses,
        // you might want to default to the first available course
        // or show a specific message. For now, we'll show "No progress".
        if (allCoursesData.courses.length > 0) {
          // If no progress, but courses exist, display the first course
          // but with 0% progress.
          const firstCourse = allCoursesData.courses[0];
          setDisplayCourse(firstCourse);
          setUserProgress({
            user_id: userId,
            course_id: firstCourse._id,
            completed_subtopics: [],
            progress_percentage: 0,
            is_completed: false,
          });
          setMessage(
            `No progress found for ${firstCourse.name} yet. Start learning!`
          );
        } else {
          setMessage(
            "No courses available or no progress found for any course."
          );
        }
      }
    } catch (err) {
      console.error("Error fetching user course or progress:", err);
      setError(err.message);
      setDisplayCourse(null);
      setUserProgress(null);
    } finally {
      setLoading(false);
    }
  }, [authToken, userId]);

  // --- Effect to trigger initial data fetching ---
  useEffect(() => {
    if (authToken && userId) {
      fetchUserEnrolledCourseAndProgress();
    }
  }, [authToken, userId, fetchUserEnrolledCourseAndProgress]); // Dependencies to re-run on auth change

  // Function to fetch and display question content
  const showQuestions = async (subtopicName, questionsFile) => {
    if (!questionsFile) {
      setModalContent(
        `No specific questions file provided for ${subtopicName}.`
      );
      setModalTitle(`${subtopicName} Questions`);
      setIsModalOpen(true);
      return;
    }

    try {
      const response = await fetch(
        `${API_BASE_URL}/questions/${questionsFile}`
      );

      if (response.ok) {
        const questionText = await response.text();
        setModalContent(questionText);
      } else {
        const errorData = await response.json();
        setModalContent(
          `Failed to load questions: ${
            errorData.message || response.statusText
          }`
        );
      }

      setModalTitle(`${subtopicName} Questions`);
      setIsModalOpen(true);
    } catch (error) {
      console.error("Error loading questions:", error);
      setModalContent(
        "Unable to load questions at this time due to a network error."
      );
      setModalTitle("Error");
      setIsModalOpen(true);
    }
  };

  // Toggle expansion of a topic
  const toggleTopicExpansion = (topicId) => {
    setExpandedTopics((prev) => ({
      ...prev,
      [topicId]: !prev[topicId],
    }));
  };

  // --- Handle Marking Subtopic Complete (API Call) ---
  const handleToggleSubtopicCompletion = async (subtopicMongoId) => {
    if (!authToken || !userId || !displayCourse?._id) {
      setMessage("Error: Not authenticated or no course selected.");
      return;
    }

    setLoading(true);
    setMessage("");
    try {
      const response = await fetch(
        `${API_BASE_URL}/user-progress/complete-subtopic`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
          body: JSON.stringify({
            courseId: displayCourse._id, // Use the ID of the currently displayed course
            subtopicMongoId: subtopicMongoId,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to toggle subtopic completion."
        );
      }

      setMessage(data.message);
      // After toggling, re-fetch the specific user progress for the current course
      // This will update the `userProgress` state and re-render the UI
      fetchUserEnrolledCourseAndProgress(); // Re-fetch all to ensure consistency
    } catch (err) {
      console.error("Error toggling subtopic completion:", err);
      setMessage(`Error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  // Helper to check if a subtopic is completed (based on userProgress state)
  const isSubtopicCompleted = (subtopicMongoId) => {
    return userProgress?.completed_subtopics?.some(
      (item) => item.subtopic_mongoose_id === subtopicMongoId
    );
  };

  // --- Admin Question Upload Handler ---
  const handleQuestionFileChange = (e) => {
    setUploadFile(e.target.files[0]);
  };

  const handleQuestionUpload = async (e) => {
    e.preventDefault();
    if (!uploadFile) {
      setUploadMessage("Please select a file to upload.");
      return;
    }

    setUploadMessage("Uploading...");
    const formData = new FormData();
    formData.append("questionsFile", uploadFile);

    try {
      const response = await fetch(`${API_BASE_URL}/admin/questions/upload`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to upload file.");
      }

      setUploadMessage(`Success: ${data.message}. Filename: ${data.filename}`);
      setUploadFile(null);
      e.target.reset();
    } catch (err) {
      console.error("Error uploading file:", err);
      setUploadMessage(`Error: ${err.message}`);
    }
  };

  // Circular progress component (as provided)
  const CircularProgress = ({ progress }) => {
    const radius = 30;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (progress / 100) * circumference;

    return (
      <div className="circular-progress">
        <svg width="80" height="80" viewBox="0 0 100 100">
          <circle
            className="progress-background"
            cx="50"
            cy="50"
            r={radius}
            strokeWidth="4"
            fill="transparent"
          />
          <circle
            className="progress-bar"
            cx="50"
            cy="50"
            r={radius}
            strokeWidth="4"
            fill="transparent"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            transform="rotate(-90 50 50)"
          />
        </svg>
        <div className="progress-text">{progress}%</div>
      </div>
    );
  };

  // Questions Modal Component (as provided)
  const QuestionsModal = () => {
    if (!isModalOpen) return null;

    return (
      <div className="modal-overlay">
        <div className="modal-content">
          <div className="modal-header">
            <h3>{modalTitle}</h3>
            <button
              className="close-button"
              onClick={() => setIsModalOpen(false)}
            >
              ×
            </button>
          </div>
          <div className="modal-body">
            <pre>{modalContent}</pre>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div
      style={{
        padding: "clamp(10px, 2vw, 20px)",
        borderRadius: "20px",
        position: "relative",
        minHeight: "clamp(400px, 80vh, 650px)",
        background: "#F8F8F8",
        width: "100%",
        boxSizing: "border-box",
      }}
    >
      <div className="learning-tracker">
        <div className="main-container">
          <h1 className="main-title">
            {displayCourse ? displayCourse.name : "Course Progress"}
          </h1>

          {loading && (
            <div
              style={{ textAlign: "center", padding: "20px", color: "#666" }}
            >
              Loading course data...
            </div>
          )}

          {error && (
            <div
              style={{
                backgroundColor: "#fee2e2",
                color: "#dc2626",
                padding: "10px",
                borderRadius: "5px",
                marginBottom: "15px",
              }}
            >
              Error: {error}
            </div>
          )}

          {message && (
            <div
              style={{
                backgroundColor: message.includes("Error")
                  ? "#fee2e2"
                  : "#d1fae5",
                color: message.includes("Error") ? "#dc2626" : "#10b981",
                padding: "10px",
                borderRadius: "5px",
                marginBottom: "15px",
              }}
            >
              {message}
            </div>
          )}

          {!authToken && !loading && (
            <p style={{ textAlign: "center", color: "#666" }}>
              Please log in to view your course progress.
            </p>
          )}

          {authToken && !loading && !error && displayCourse && userProgress ? (
            <>
              <div className="progress-bar-container">
                <div className="progress-bar">
                  <div
                    className="progress-fill"
                    style={{ width: `${userProgress.progress_percentage}%` }}
                  ></div>
                </div>
                <div className="progress-text">
                  {userProgress.progress_percentage.toFixed(0)}% completed
                </div>
              </div>

              <div className="topics-list">
                {displayCourse.topics.map((topic) => (
                  <div key={topic._id} className="topic-container">
                    <div
                      className="topic-item"
                      onClick={() => toggleTopicExpansion(topic._id)}
                    >
                      <span
                        className={`topic-indicator ${
                          topic.subtopics.every((sub) =>
                            isSubtopicCompleted(sub._id)
                          )
                            ? "completed"
                            : ""
                        }`}
                      ></span>
                      <span className="topic-name">{topic.name}</span>
                      <span className="expand-icon">
                        {expandedTopics[topic._id] ? "−" : "+"}
                      </span>
                    </div>

                    {expandedTopics[topic._id] && (
                      <div className="subtopics-list">
                        {topic.subtopics.map((subtopic) => (
                          <div
                            key={subtopic._id}
                            className="subtopic-item"
                            onClick={() =>
                              handleToggleSubtopicCompletion(subtopic._id)
                            }
                          >
                            <span
                              className={`subtopic-indicator ${
                                isSubtopicCompleted(subtopic._id)
                                  ? "completed"
                                  : ""
                              }`}
                            ></span>
                            <span className="subtopic-name">
                              {subtopic.name}
                            </span>
                            <a
                              href="#"
                              className="questions-link"
                              onClick={(e) => {
                                e.stopPropagation();
                                e.preventDefault();
                                showQuestions(
                                  subtopic.name,
                                  subtopic.questionsFile
                                );
                              }}
                            >
                              Questions
                            </a>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </>
          ) : (
            !loading &&
            !error && (
              <p style={{ textAlign: "center", color: "#666" }}>
                {courses.length === 0
                  ? "No courses available. Please create a course as an admin."
                  : "No progress found for you yet. Start learning!"}
              </p>
            )
          )}
        </div>
      </div>

      {/* Admin Question Upload Section */}
      {isAdmin && (
        <div
          style={{
            marginTop: "40px",
            padding: "20px",
            border: "1px solid #e0e0e0",
            borderRadius: "15px",
            backgroundColor: "#fff",
          }}
        >
          <h2
            style={{
              fontSize: "20px",
              fontWeight: "bold",
              marginBottom: "15px",
              textAlign: "center",
            }}
          >
            Admin: Upload Question File
          </h2>
          <form
            onSubmit={handleQuestionUpload}
            style={{ display: "flex", flexDirection: "column", gap: "10px" }}
          >
            <input
              type="file"
              onChange={handleQuestionFileChange}
              required
              style={{
                padding: "8px",
                border: "1px solid #ccc",
                borderRadius: "5px",
              }}
            />
            <button
              type="submit"
              disabled={loading}
              style={{
                padding: "10px 15px",
                backgroundColor: "#4CAF50",
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
                fontSize: "16px",
                opacity: loading ? 0.7 : 1,
              }}
            >
              {loading ? "Uploading..." : "Upload Questions File"}
            </button>
          </form>
          {uploadMessage && (
            <p
              style={{
                marginTop: "10px",
                color: uploadMessage.includes("Error") ? "red" : "green",
                textAlign: "center",
              }}
            >
              {uploadMessage}
            </p>
          )}
          <p
            style={{
              fontSize: "12px",
              color: "#888",
              marginTop: "10px",
              textAlign: "center",
            }}
          >
            Uploads will be saved to the `backend/uploads/questions/` directory.
            You'll need to manually update the `questionsFile` field in your
            Course document (via PUT API) to link a subtopic to an uploaded
            file.
          </p>
        </div>
      )}

      {/* Render Questions Modal */}
      <QuestionsModal />

      {/* Inline Styles */}
      <style jsx>{`
        .learning-tracker {
          font-family: "Arial", sans-serif;
          color: #333;
          max-width: 1000px;
          margin: 0 auto;
          padding: 20px;
        }

        .main-container {
          border: 1px solid #e0e0e0;
          border-radius: 15px;
          padding: 20px;
          background-color: #fff;
        }

        .main-title {
          text-align: center;
          font-size: 24px;
          font-weight: 500;
        }

        .progress-bar-container {
          margin: 20px 0;
          text-align: center;
        }

        .progress-bar {
          height: 4px;
          background-color: #f0f0f0;
          border-radius: 3px;
          overflow: hidden;
          margin: 0 auto;
          max-width: 400px;
        }

        .progress-fill {
          height: 100%;
          background-color: #ff9a70;
          border-radius: 3px;
          transition: width 0.3s ease;
        }

        .progress-text {
          margin-top: 5px;
          font-size: 14px;
          color: #ff9a70;
        }

        .topics-list {
          margin-top: 20px;
          padding: 0 20px;
        }

        .topic-container {
          margin-bottom: 10px;
          border: 1px solid #e0e0e0;
          border-radius: 10px;
          padding: 10px 15px;
          background-color: #fdfdfd;
        }

        .topic-item {
          display: flex;
          align-items: center;
          padding: 8px 0;
          cursor: pointer;
        }

        .topic-indicator,
        .subtopic-indicator {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          margin-right: 10px;
          border: 1px solid #e0e0e0;
          flex-shrink: 0;
        }

        .topic-indicator.completed,
        .subtopic-indicator.completed {
          background-color: #ff9a70;
          border-color: #ff9a70;
        }

        .topic-name,
        .subtopic-name {
          font-size: 16px;
          flex-grow: 1;
        }

        .expand-icon {
          margin-left: 10px;
          font-size: 18px;
          color: #999;
          width: 20px;
          text-align: center;
        }

        .subtopics-list {
          margin-left: 22px;
          border-left: 1px solid #e0e0e0;
          padding-left: 15px;
          margin-top: 5px;
        }

        .subtopic-item {
          display: flex;
          align-items: center;
          padding: 8px 0;
          cursor: pointer;
        }

        .questions-link {
          margin-left: auto;
          color: #0066ff;
          text-decoration: none;
        }

        .questions-link:hover {
          text-decoration: underline;
        }

        /* Modal Styles */
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(0, 0, 0, 0.5);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 1000;
        }

        .modal-content {
          background-color: white;
          border-radius: 10px;
          width: 80%;
          max-width: 600px;
          max-height: 80vh;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          overflow: hidden;
          display: flex;
          flex-direction: column;
        }

        .modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 15px 20px;
          border-bottom: 1px solid #e0e0e0;
        }

        .modal-header h3 {
          margin: 0;
          font-size: 18px;
        }

        .close-button {
          background: none;
          border: none;
          font-size: 24px;
          cursor: pointer;
          color: #999;
        }

        .modal-body {
          padding: 20px;
          overflow-y: auto;
          flex-grow: 1;
        }

        .modal-body pre {
          white-space: pre-wrap;
          font-family: inherit;
          margin: 0;
        }

        /* CircularProgress component styles */
        .circular-progress {
          position: relative;
          width: 80px;
          height: 80px;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .progress-background {
          stroke: #f0f0f0;
        }

        .progress-bar {
          stroke: #ff9a70;
          transition: stroke-dashoffset 0.3s ease;
        }

        .circular-progress .progress-text {
          position: absolute;
          font-size: 14px;
          font-weight: bold;
        }
      `}</style>
    </div>
  );
};

export default CourseTimeline;
