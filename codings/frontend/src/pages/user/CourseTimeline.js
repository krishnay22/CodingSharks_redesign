import React, { useState, useEffect, useCallback } from "react";

const API_BASE_URL = "http://localhost:5000/api"; // Your backend API base URL

const CourseProgressPage = () => {
  const [courses, setCourses] = useState([]);
  const [selectedCourseId, setSelectedCourseId] = useState("");
  const [userProgress, setUserProgress] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [authToken, setAuthToken] = useState(null);
  const [userId, setUserId] = useState(null);
  const [message, setMessage] = useState(""); // For success/error messages

  // --- Authentication Check ---
  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUserId = localStorage.getItem("userId");
    if (token && storedUserId) {
      setAuthToken(token);
      setUserId(storedUserId);
    } else {
      setError("You must be logged in to view course progress.");
      setLoading(false);
    }
  }, []);

  // --- Fetch Courses ---
  const fetchCourses = useCallback(async () => {
    if (!authToken) return;

    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_BASE_URL}/courses`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.message || "Failed to fetch courses.");
      }
      const data = await response.json();
      setCourses(data.courses);
      if (data.courses.length > 0 && !selectedCourseId) {
        setSelectedCourseId(data.courses[0]._id); // Auto-select the first course
      }
    } catch (err) {
      console.error("Error fetching courses:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [authToken, selectedCourseId]);

  // --- Fetch User Progress for Selected Course ---
  const fetchUserProgress = useCallback(async () => {
    if (!authToken || !userId || !selectedCourseId) return;

    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `${API_BASE_URL}/user-progress/${selectedCourseId}`,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.message || "Failed to fetch user progress.");
      }
      const data = await response.json();
      setUserProgress(data.progress);
    } catch (err) {
      console.error("Error fetching user progress:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [authToken, userId, selectedCourseId]);

  // --- Effects to trigger data fetching ---
  useEffect(() => {
    if (authToken && userId) {
      fetchCourses();
    }
  }, [authToken, userId, fetchCourses]);

  useEffect(() => {
    if (selectedCourseId) {
      fetchUserProgress();
    }
  }, [selectedCourseId, fetchUserProgress]);

  // --- Handle Marking Subtopic Complete ---
  const handleMarkSubtopicComplete = async (subtopicMongoId) => {
    if (!authToken || !userId || !selectedCourseId) {
      setMessage("Error: Not authenticated or course not selected.");
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
            courseId: selectedCourseId,
            subtopicMongoId: subtopicMongoId,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to mark subtopic complete.");
      }

      setMessage(data.message || "Subtopic marked as completed!");
      fetchUserProgress(); // Re-fetch progress to update UI
    } catch (err) {
      console.error("Error marking subtopic complete:", err);
      setMessage(`Error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  // Helper to check if a subtopic is completed
  const isSubtopicCompleted = (subtopicMongoId) => {
    // FIX: Add optional chaining for completed_subtopics
    return userProgress?.completed_subtopics?.some(
      (item) => item.subtopic_mongoose_id === subtopicMongoId
    );
  };

  // Get the currently selected course object
  const currentCourse = courses.find(
    (course) => course._id === selectedCourseId
  );

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-6 lg:p-8 font-inter antialiased">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-6 sm:p-8 lg:p-10">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-center text-blue-800 mb-8">
          My Course Progress
        </h1>

        {loading && (
          <div className="text-center text-blue-600 font-semibold text-lg py-4">
            Loading...
          </div>
        )}

        {error && (
          <div
            className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg relative mb-4"
            role="alert"
          >
            <strong className="font-bold">Error!</strong>
            <span className="block sm:inline ml-2">{error}</span>
          </div>
        )}

        {message && (
          <div
            className={`px-4 py-3 rounded-lg relative mb-4 ${
              message.includes("Error")
                ? "bg-red-100 border-red-400 text-red-700"
                : "bg-green-100 border-green-400 text-green-700"
            }`}
            role="alert"
          >
            <span className="block sm:inline">{message}</span>
          </div>
        )}

        {!authToken && !loading && (
          <p className="text-center text-gray-600 text-lg">
            Please log in to view your course progress.
          </p>
        )}

        {authToken && !loading && !error && (
          <>
            {/* Course Selection Dropdown */}
            <div className="mb-6">
              <label
                htmlFor="course-select"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Select Course:
              </label>
              <select
                id="course-select"
                className="block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
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

            {currentCourse && userProgress ? (
              <>
                {/* Progress Bar */}
                <div className="mb-8">
                  <h2 className="text-xl font-semibold text-gray-800 mb-2">
                    Overall Progress:{" "}
                    {userProgress.progress_percentage.toFixed(0)}%
                  </h2>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div
                      className="bg-green-500 h-3 rounded-full transition-all duration-500 ease-out"
                      style={{ width: `${userProgress.progress_percentage}%` }}
                    ></div>
                  </div>
                  {userProgress.is_completed && (
                    <p className="text-green-600 text-sm mt-2 font-medium">
                      Congratulations! You have completed this course.
                    </p>
                  )}
                </div>

                {/* Course Topics and Subtopics */}
                <div className="space-y-6">
                  {currentCourse.topics.map((topic) => (
                    <div
                      key={topic._id}
                      className="bg-blue-50 rounded-lg p-4 shadow-sm border border-blue-100"
                    >
                      <h3 className="text-lg font-bold text-blue-700 mb-3">
                        {topic.name}
                      </h3>
                      <ul className="space-y-3">
                        {topic.subtopics.map((subtopic) => (
                          <li
                            key={subtopic._id}
                            className={`flex items-center justify-between p-3 rounded-md transition-colors duration-200 ${
                              isSubtopicCompleted(subtopic._id)
                                ? "bg-green-50 border border-green-200 text-green-800"
                                : "bg-white border border-gray-200 text-gray-800 hover:bg-gray-50"
                            }`}
                          >
                            <span className="flex items-center text-base font-medium">
                              {isSubtopicCompleted(subtopic._id) ? (
                                <svg
                                  className="w-5 h-5 text-green-500 mr-2"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                  ></path>
                                </svg>
                              ) : (
                                <svg
                                  className="w-5 h-5 text-gray-400 mr-2"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                                  ></path>
                                </svg>
                              )}
                              {subtopic.name}
                            </span>
                            {!isSubtopicCompleted(subtopic._id) && (
                              <button
                                onClick={() =>
                                  handleMarkSubtopicComplete(subtopic._id)
                                }
                                className="px-4 py-2 bg-blue-600 text-white text-sm font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200"
                                disabled={loading}
                              >
                                {loading ? "Marking..." : "Mark Complete"}
                              </button>
                            )}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              !loading &&
              !error &&
              courses.length > 0 && (
                <p className="text-center text-gray-600 text-lg">
                  Select a course from the dropdown to view your progress.
                </p>
              )
            )}
            {!loading && !error && courses.length === 0 && (
              <p className="text-center text-gray-600 text-lg">
                No courses available to display.
              </p>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default CourseProgressPage;
