"use client";

import { useState, useEffect } from "react";
import {
  Edit,
  Trash2,
  Eye,
  X,
  UserPlus,
  HelpCircle,
  Users,
} from "lucide-react";

const CourseGroup = () => {
  // State for topics and sections
  const [expandedTopics, setExpandedTopics] = useState({});
  const [expandedSections, setExpandedSections] = useState({
    frontEnd: false,
    backEnd: false,
  });

  // State for question modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState("");
  const [modalTitle, setModalTitle] = useState("");

  // State for groups and students
  const [groups, setGroups] = useState([]);
  const [isGroupModalOpen, setIsGroupModalOpen] = useState(false);
  const [currentGroup, setCurrentGroup] = useState(null);
  const [newStudentName, setNewStudentName] = useState("");
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [isGroupProgressModalOpen, setIsGroupProgressModalOpen] =
    useState(false);

  // State to control visibility of course content
  const [showCourseContent, setShowCourseContent] = useState(false);

  // Available courses
  const [availableCourses, setAvailableCourses] = useState([
    {
      id: "webDevelopment",
      name: "Web Development",
    },
    {
      id: "dataScience",
      name: "Data Science",
    },
    {
      id: "mobileDevelopment",
      name: "Mobile Development",
    },
  ]);

  // Selected course for new group
  const [selectedCourse, setSelectedCourse] = useState("webDevelopment");

  // Initial data structure with simplified topics
  const [topics, setTopics] = useState({
    webDevelopment: {
      name: "Web Development",
      progress: 0,
      sections: {
        frontEnd: {
          name: "Front End",
          progress: 0,
          topics: [
            {
              id: "html",
              name: "HTML",
              completed: false,
              subtopics: [
                { id: "html-basics", name: "HTML Basics", completed: false },
                { id: "html-forms", name: "HTML Forms", completed: false },
              ],
            },
            {
              id: "css",
              name: "CSS",
              completed: false,
              subtopics: [
                {
                  id: "css-selectors",
                  name: "CSS Selectors",
                  completed: false,
                },
                { id: "css-box-model", name: "Box Model", completed: false },
              ],
            },
            {
              id: "js-basics",
              name: "JavaScript Basics",
              completed: false,
              subtopics: [
                {
                  id: "variables",
                  name: "Variables & Data Types",
                  completed: false,
                },
                { id: "conditionals", name: "Conditionals", completed: false },
              ],
            },
          ],
        },
        backEnd: {
          name: "Back End",
          progress: 0,
          topics: [
            {
              id: "nodejs",
              name: "Node.js",
              completed: false,
              subtopics: [
                { id: "node-basics", name: "Node.js Basics", completed: false },
                { id: "express", name: "Express.js", completed: false },
              ],
            },
            {
              id: "databases",
              name: "Databases",
              completed: false,
              subtopics: [
                { id: "sql", name: "SQL", completed: false },
                { id: "mongodb", name: "MongoDB", completed: false },
              ],
            },
          ],
        },
      },
    },
    dataScience: {
      name: "Data Science",
      progress: 0,
      sections: {
        basics: {
          name: "Basics",
          progress: 0,
          topics: [
            {
              id: "python",
              name: "Python",
              completed: false,
              subtopics: [
                {
                  id: "python-basics",
                  name: "Python Basics",
                  completed: false,
                },
                {
                  id: "data-structures",
                  name: "Data Structures",
                  completed: false,
                },
              ],
            },
            {
              id: "statistics",
              name: "Statistics",
              completed: false,
              subtopics: [
                {
                  id: "descriptive",
                  name: "Descriptive Statistics",
                  completed: false,
                },
                {
                  id: "inferential",
                  name: "Inferential Statistics",
                  completed: false,
                },
              ],
            },
          ],
        },
        advanced: {
          name: "Advanced",
          progress: 0,
          topics: [
            {
              id: "ml",
              name: "Machine Learning",
              completed: false,
              subtopics: [
                {
                  id: "supervised",
                  name: "Supervised Learning",
                  completed: false,
                },
                {
                  id: "unsupervised",
                  name: "Unsupervised Learning",
                  completed: false,
                },
              ],
            },
            {
              id: "visualization",
              name: "Data Visualization",
              completed: false,
              subtopics: [
                { id: "matplotlib", name: "Matplotlib", completed: false },
                { id: "tableau", name: "Tableau", completed: false },
              ],
            },
          ],
        },
      },
    },
    mobileDevelopment: {
      name: "Mobile Development",
      progress: 0,
      sections: {
        crossPlatform: {
          name: "Cross-Platform",
          progress: 0,
          topics: [
            {
              id: "react-native",
              name: "React Native",
              completed: false,
              subtopics: [
                {
                  id: "rn-basics",
                  name: "React Native Basics",
                  completed: false,
                },
                { id: "rn-navigation", name: "Navigation", completed: false },
              ],
            },
            {
              id: "flutter",
              name: "Flutter",
              completed: false,
              subtopics: [
                {
                  id: "flutter-basics",
                  name: "Flutter Basics",
                  completed: false,
                },
                { id: "dart", name: "Dart Programming", completed: false },
              ],
            },
          ],
        },
        native: {
          name: "Native",
          progress: 0,
          topics: [
            {
              id: "ios",
              name: "iOS Development",
              completed: false,
              subtopics: [
                { id: "swift", name: "Swift", completed: false },
                { id: "uikit", name: "UIKit", completed: false },
              ],
            },
            {
              id: "android",
              name: "Android Development",
              completed: false,
              subtopics: [
                { id: "kotlin", name: "Kotlin", completed: false },
                {
                  id: "android-studio",
                  name: "Android Studio",
                  completed: false,
                },
              ],
            },
          ],
        },
      },
    },
  });

  // Function to create initial group progress structure
  const createGroupProgressStructure = (courseId) => {
    return JSON.parse(JSON.stringify(topics[courseId]));
  };

  // Function to show questions modal
  const showQuestions = (subtopicName, e) => {
    e.preventDefault();
    e.stopPropagation();

    setModalContent(`
1. What is ${subtopicName}?
2. How do you implement ${subtopicName} in a project?
3. What are the best practices for ${subtopicName}?
4. Why is ${subtopicName} important in web development?
5. Give an example of ${subtopicName} in action.
    `);
    setModalTitle(`${subtopicName} Questions`);
    setIsModalOpen(true);
  };

  // Toggle expansion of a section
  const toggleSectionExpansion = (sectionKey) => {
    setExpandedSections((prev) => ({
      ...prev,
      [sectionKey]: !prev[sectionKey],
    }));
  };

  // Toggle expansion of a topic
  const toggleTopicExpansion = (sectionKey, topicId, e) => {
    e.stopPropagation();
    setExpandedTopics((prev) => ({
      ...prev,
      [`${sectionKey}-${topicId}`]: !prev[`${sectionKey}-${topicId}`],
    }));
  };

  // Toggle completion status of a subtopic for a group
  const toggleGroupSubtopicCompletion = (
    groupId,
    sectionKey,
    topicId,
    subtopicId
  ) => {
    setGroups((currentGroups) => {
      const updatedGroups = [...currentGroups];
      const groupIndex = updatedGroups.findIndex(
        (group) => group.id === groupId
      );

      if (groupIndex !== -1) {
        const group = updatedGroups[groupIndex];
        const courseId = group.courseId;
        const updatedProgress = { ...group.progress };
        const section = updatedProgress.sections[sectionKey];
        const topicIndex = section.topics.findIndex(
          (topic) => topic.id === topicId
        );

        if (topicIndex !== -1) {
          const topic = section.topics[topicIndex];
          const subtopicIndex = topic.subtopics.findIndex(
            (subtopic) => subtopic.id === subtopicId
          );

          if (subtopicIndex !== -1) {
            // Toggle completion
            topic.subtopics[subtopicIndex].completed =
              !topic.subtopics[subtopicIndex].completed;

            // Update topic completion status
            topic.completed = topic.subtopics.every(
              (subtopic) => subtopic.completed
            );

            // Update progress percentages
            updateProgress(updatedProgress);

            // Update group progress
            group.progress = updatedProgress;
          }
        }
      }

      return updatedGroups;
    });
  };

  // Calculate progress for each section and overall progress
  const updateProgress = (courseData) => {
    // Calculate progress for each section
    Object.keys(courseData.sections).forEach((sectionKey) => {
      const section = courseData.sections[sectionKey];
      const totalSubtopics = section.topics.reduce(
        (acc, topic) => acc + topic.subtopics.length,
        0
      );
      const completedSubtopics = section.topics.reduce(
        (acc, topic) =>
          acc + topic.subtopics.filter((subtopic) => subtopic.completed).length,
        0
      );

      section.progress =
        totalSubtopics > 0
          ? Math.round((completedSubtopics / totalSubtopics) * 100)
          : 0;
    });

    // Calculate overall progress
    const sections = Object.values(courseData.sections);
    const totalSubtopics = sections.reduce(
      (acc, section) =>
        acc +
        section.topics.reduce(
          (topicAcc, topic) => topicAcc + topic.subtopics.length,
          0
        ),
      0
    );
    const completedSubtopics = sections.reduce(
      (acc, section) =>
        acc +
        section.topics.reduce(
          (topicAcc, topic) =>
            topicAcc +
            topic.subtopics.filter((subtopic) => subtopic.completed).length,
          0
        ),
      0
    );

    courseData.progress =
      totalSubtopics > 0
        ? Math.round((completedSubtopics / totalSubtopics) * 100)
        : 0;
  };

  // Initialize progress on component mount
  useEffect(() => {
    const updatedTopicsData = { ...topics };

    // Update progress for each course
    Object.keys(updatedTopicsData).forEach((courseId) => {
      updateProgress(updatedTopicsData[courseId]);
    });

    setTopics(updatedTopicsData);
  }, []);

  // Group management functions
  const openGroupModal = (group = null) => {
    setCurrentGroup(group);
    setSelectedCourse(group ? group.courseId : "webDevelopment");
    setIsGroupModalOpen(true);
  };

  const closeGroupModal = () => {
    setCurrentGroup(null);
    setIsGroupModalOpen(false);
    setNewStudentName("");
  };

  const createOrUpdateGroup = () => {
    const groupName = document.getElementById("groupName").value;

    if (!groupName.trim()) {
      alert("Please enter a group name");
      return;
    }

    if (!currentGroup) {
      // Creating a new group
      const newGroup = {
        id: Date.now().toString(),
        name: groupName,
        courseId: selectedCourse,
        students: [],
        progress: createGroupProgressStructure(selectedCourse),
      };
      setGroups([...groups, newGroup]);
    } else {
      // Updating existing group
      setGroups(
        groups.map((group) =>
          group.id === currentGroup.id
            ? {
                ...group,
                name: groupName,
                courseId: selectedCourse,
                // If course changed, reset progress
                progress:
                  group.courseId !== selectedCourse
                    ? createGroupProgressStructure(selectedCourse)
                    : group.progress,
              }
            : group
        )
      );
    }
    closeGroupModal();
  };

  const addStudentToGroup = (groupId) => {
    if (!newStudentName.trim()) return;

    setGroups(
      groups.map((group) => {
        if (group.id === groupId) {
          return {
            ...group,
            students: [
              ...group.students,
              {
                id: Date.now().toString(),
                name: newStudentName,
              },
            ],
          };
        }
        return group;
      })
    );

    setNewStudentName("");
  };

  const removeStudent = (groupId, studentId) => {
    setGroups(
      groups.map((group) => {
        if (group.id === groupId) {
          return {
            ...group,
            students: group.students.filter(
              (student) => student.id !== studentId
            ),
          };
        }
        return group;
      })
    );
  };

  const deleteGroup = (groupId) => {
    setGroups(groups.filter((group) => group.id !== groupId));
  };

  const openGroupProgressModal = (group) => {
    setSelectedGroup(group);
    setIsGroupProgressModalOpen(true);
  };

  // Circular progress component
  const CircularProgress = ({ progress }) => {
    const radius = 30;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (progress / 100) * circumference;

    return (
      <div className="circular-progress">
        <svg
          width="70"
          height="70"
          viewBox="0 0 100 100"
          className="progress-circle"
        >
          <circle
            cx="50"
            cy="50"
            r={radius}
            strokeWidth="8"
            fill="transparent"
            className="progress-background"
          />
          <circle
            cx="50"
            cy="50"
            r={radius}
            strokeWidth="8"
            fill="transparent"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            className="progress-indicator"
            style={{ strokeDashoffset }}
          />
        </svg>
        <div className="progress-text">{progress}%</div>
      </div>
    );
  };

  // Questions Modal Component
  const QuestionsModal = () => {
    if (!isModalOpen) return null;

    return (
      <div className="modal-overlay">
        <div className="modal-container">
          <div className="modal-header">
            <h3>{modalTitle}</h3>
            <button
              className="close-button"
              onClick={() => setIsModalOpen(false)}
            >
              <X className="icon-small" />
            </button>
          </div>
          <div className="modal-content">
            <pre>{modalContent}</pre>
          </div>
        </div>
      </div>
    );
  };

  // Group Management Modal
  const GroupModal = () => {
    if (!isGroupModalOpen) return null;

    return (
      <div className="modal-overlay">
        <div className="modal-container">
          <div className="modal-header">
            <h3>{currentGroup ? "Edit Group" : "Create New Group"}</h3>
            <button className="close-button" onClick={closeGroupModal}>
              <X className="icon-small" />
            </button>
          </div>
          <div className="modal-content">
            <div className="form-group">
              <label htmlFor="groupName">Group Name:</label>
              <input
                type="text"
                id="groupName"
                defaultValue={currentGroup ? currentGroup.name : ""}
                placeholder="Enter group name"
              />
            </div>

            <div className="form-group">
              <label htmlFor="courseName">Select Course:</label>
              <select
                id="courseName"
                value={selectedCourse}
                onChange={(e) => setSelectedCourse(e.target.value)}
              >
                {availableCourses.map((course) => (
                  <option key={course.id} value={course.id}>
                    {course.name}
                  </option>
                ))}
              </select>
            </div>

            <button
              className="primary-button full-width"
              onClick={createOrUpdateGroup}
            >
              {currentGroup ? "Update Group" : "Create Group"}
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Group Progress Modal
  const GroupProgressModal = () => {
    if (!isGroupProgressModalOpen || !selectedGroup) return null;

    const groupProgress = selectedGroup.progress;
    const courseId = selectedGroup.courseId;

    return (
      <div className="modal-overlay">
        <div className="modal-container modal-large">
          <div className="modal-header sticky">
            <h3>
              {selectedGroup.name} - {topics[courseId].name} Progress
            </h3>
            <button
              className="close-button"
              onClick={() => setIsGroupProgressModalOpen(false)}
            >
              <X className="icon-small" />
            </button>
          </div>

          <div className="modal-content">
            <div className="progress-overview">
              <CircularProgress progress={groupProgress.progress} />
              <h4>Overall Progress: {groupProgress.progress}%</h4>
            </div>

            {Object.keys(groupProgress.sections).map((sectionKey) => {
              const section = groupProgress.sections[sectionKey];

              return (
                <div key={sectionKey} className="section-card">
                  <div className="section-header">
                    <h4>{section.name}</h4>
                    <span className="progress-badge">
                      {section.progress}% Complete
                    </span>
                  </div>

                  <div className="section-content">
                    {section.topics.map((topic) => (
                      <div key={topic.id} className="topic-item">
                        <div className="topic-header">
                          <div
                            className={`indicator ${
                              topic.completed ? "completed" : ""
                            }`}
                          ></div>
                          <h5>{topic.name}</h5>
                        </div>

                        <div className="subtopics-list">
                          {topic.subtopics.map((subtopic) => (
                            <div
                              key={subtopic.id}
                              className="subtopic-item"
                              onClick={() =>
                                toggleGroupSubtopicCompletion(
                                  selectedGroup.id,
                                  sectionKey,
                                  topic.id,
                                  subtopic.id
                                )
                              }
                            >
                              <div
                                className={`indicator small ${
                                  subtopic.completed ? "completed" : ""
                                }`}
                              ></div>
                              <span>{subtopic.name}</span>
                              <button
                                className="questions-button"
                                onClick={(e) => showQuestions(subtopic.name, e)}
                              >
                                <HelpCircle className="icon-tiny" />
                                Questions
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <div className="course-timeline">
        <div className="container">
          {/* Main Header */}
          <div className="main-header">
            <h1>Course Tracker</h1>
            <button className="primary-button" onClick={() => openGroupModal()}>
              <UserPlus className="icon-small" />
              Create New Group
            </button>
          </div>

          {/* Groups Section */}
          <div className="groups-section">
            <h2>Student Groups</h2>

            {groups.length === 0 ? (
              <div className="empty-state">
                <p>
                  No groups created yet. Click "Create New Group" to get
                  started.
                </p>
              </div>
            ) : (
              <div className="groups-grid">
                {groups.map((group) => (
                  <div key={group.id} className="group-card">
                    <div className="group-header">
                      <div>
                        <h3>{group.name}</h3>
                        <p className="course-name">
                          {topics[group.courseId].name}
                        </p>
                      </div>
                      <div className="action-buttons">
                        <button
                          className="icon-button"
                          onClick={() => openGroupModal(group)}
                          aria-label="Edit group"
                        >
                          <Edit className="icon-small" />
                        </button>
                        <button
                          className="icon-button"
                          onClick={() => deleteGroup(group.id)}
                          aria-label="Delete group"
                        >
                          <Trash2 className="icon-small" />
                        </button>
                      </div>
                    </div>

                    <div className="group-content">
                      <div className="group-progress">
                        <CircularProgress progress={group.progress.progress} />
                        <div>
                          <p className="progress-label">Course Progress</p>
                          <p className="progress-value">
                            {group.progress.progress}%
                          </p>
                        </div>
                        <button
                          className="secondary-button"
                          onClick={() => openGroupProgressModal(group)}
                        >
                          <Eye className="icon-small" />
                          View Progress
                        </button>
                      </div>

                      <div className="add-student">
                        <input
                          type="text"
                          placeholder="New student name"
                          value={newStudentName}
                          onChange={(e) => setNewStudentName(e.target.value)}
                        />
                        <button
                          className="primary-button"
                          onClick={() => addStudentToGroup(group.id)}
                          disabled={!newStudentName.trim()}
                        >
                          <UserPlus className="icon-small" />
                          Add
                        </button>
                      </div>

                      <div className="students-section">
                        <div className="students-header">
                          <Users className="icon-small" />
                          <h4>Students ({group.students.length})</h4>
                        </div>
                        {group.students.length === 0 ? (
                          <p className="empty-students">
                            No students in this group yet
                          </p>
                        ) : (
                          <ul className="students-list">
                            {group.students.map((student) => (
                              <li key={student.id} className="student-item">
                                <span className="student-name">
                                  {student.name}
                                </span>
                                <button
                                  className="remove-button"
                                  onClick={() =>
                                    removeStudent(group.id, student.id)
                                  }
                                >
                                  <X className="icon-tiny" />
                                  Remove
                                </button>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Render Modals */}
        <QuestionsModal />
        <GroupModal />
        <GroupProgressModal />
      </div>
      <style jsx>{`
        /* Base Styles */
        :root {
          --primary-color: #ff9a70;
          --primary-hover: #ff8a60;
          --primary-light: #ffe5dc;
          --text-color: #333333;
          --text-light: #666666;
          --text-lighter: #999999;
          --background-color: #ffffff;
          --white: #ffffff;
          --gray-100: #f8f9fa;
          --gray-200: #e9ecef;
          --gray-300: #dee2e6;
          --gray-400: #ced4da;
          --gray-500: #adb5bd;
          --gray-600: #6c757d;
          --gray-700: #495057;
          --gray-800: #343a40;
          --gray-900: #212529;
          --red: #dc3545;
          --red-light: #f8d7da;
          --green: #28a745;
          --green-light: #d4edda;
          --border-radius: 8px;
          --border-radius-lg: 12px;
          --border-radius-sm: 4px;
          --box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          --transition: all 0.2s ease-in-out;
        }

        /* Reset and Base Styles */
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
            Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
          color: var(--text-color);
          background-color: var(--background-color);
          line-height: 1.5;
        }

        h1,
        h2,
        h3,
        h4,
        h5,
        h6 {
          margin-bottom: 0.5rem;
          font-weight: 600;
          line-height: 1.2;
        }

        h1 {
          font-size: 2rem;
        }

        h2 {
          font-size: 1.75rem;
          margin-bottom: 1rem;
        }

        h3 {
          font-size: 1.5rem;
        }

        h4 {
          font-size: 1.25rem;
        }

        h5 {
          font-size: 1.1rem;
        }

        p {
          margin-bottom: 1rem;
        }

        button {
          cursor: pointer;
          font-family: inherit;
          border: none;
          background: none;
        }

        input,
        select {
          font-family: inherit;
          font-size: 1rem;
        }

        ul {
          list-style: none;
        }

        /* Layout */
        .course-timeline {
          min-height: 100vh;
          background-color: var(--background-color);
          color: var(--text-color);
        }

        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 2rem 1rem;
        }

        .main-header {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 2.5rem;
          gap: 1rem;
        }

        @media (min-width: 768px) {
          .main-header {
            flex-direction: row;
            align-items: center;
          }
        }

        .groups-section {
          margin-bottom: 2rem;
        }

        .groups-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1.5rem;
        }

        @media (min-width: 768px) {
          .groups-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        /* Cards and Containers */
        .empty-state {
          background-color: var(--white);
          border-radius: var(--border-radius-lg);
          padding: 2rem;
          text-align: center;
          box-shadow: var(--box-shadow);
        }

        .group-card {
          background-color: var(--white);
          border-radius: var(--border-radius-lg);
          overflow: hidden;
          box-shadow: var(--box-shadow);
        }

        .group-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          padding: 1rem;
          background-color: var(--gray-100);
          border-bottom: 1px solid var(--gray-300);
        }

        .group-content {
          padding: 1rem;
        }

        .course-name {
          font-size: 0.875rem;
          color: var(--text-light);
          margin-top: 0.25rem;
        }

        .action-buttons {
          display: flex;
          gap: 0.5rem;
        }

        .section-card {
          border: 1px solid var(--gray-300);
          border-radius: var(--border-radius);
          overflow: hidden;
          margin-bottom: 1.5rem;
        }

        .section-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0.75rem 1rem;
          background-color: var(--gray-100);
        }

        .section-content {
          padding: 0.5rem 0;
        }

        /* Progress Components */
        .group-progress {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 1rem;
          flex-wrap: wrap;
          gap: 1rem;
        }

        .progress-overview {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 1rem;
          background-color: var(--gray-100);
          border-radius: var(--border-radius);
          margin-bottom: 1.5rem;
        }

        .progress-label {
          font-size: 0.875rem;
          color: var(--text-light);
          margin-bottom: 0.25rem;
        }

        .progress-value {
          font-size: 1.25rem;
          font-weight: 700;
        }

        .progress-badge {
          display: inline-block;
          padding: 0.25rem 0.5rem;
          font-size: 0.75rem;
          font-weight: 600;
          background-color: var(--primary-light);
          color: var(--primary-color);
          border-radius: 9999px;
        }

        .circular-progress {
          position: relative;
          display: inline-flex;
          align-items: center;
          justify-content: center;
        }

        .progress-circle {
          transform: rotate(-90deg);
        }

        .progress-background {
          stroke: var(--gray-200);
        }

        .progress-indicator {
          stroke: var(--primary-color);
          transition: stroke-dashoffset 0.3s ease;
        }

        .progress-text {
          position: absolute;
          font-size: 0.875rem;
          font-weight: 600;
        }

        /* Topic and Subtopic Styles */
        .topic-item {
          padding: 1rem;
          border-bottom: 1px solid var(--gray-200);
        }

        .topic-item:last-child {
          border-bottom: none;
        }

        .topic-header {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin-bottom: 0.5rem;
        }

        .subtopics-list {
          margin-left: 1.25rem;
        }

        .subtopic-item {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.5rem;
          border-radius: var(--border-radius-sm);
          cursor: pointer;
          transition: var(--transition);
        }

        .subtopic-item:hover {
          background-color: var(--gray-100);
        }

        .indicator {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background-color: var(--gray-300);
          flex-shrink: 0;
        }

        .indicator.small {
          width: 8px;
          height: 8px;
        }

        .indicator.completed {
          background-color: var(--primary-color);
        }

        /* Form Elements */
        .add-student {
          display: flex;
          gap: 0.5rem;
          margin-bottom: 1rem;
        }

        .add-student input {
          flex-grow: 1;
          padding: 0.5rem 0.75rem;
          border: 1px solid var(--gray-300);
          border-radius: var(--border-radius-sm);
          outline: none;
          transition: var(--transition);
        }

        .add-student input:focus {
          border-color: var(--primary-color);
          box-shadow: 0 0 0 2px var(--primary-light);
        }

        .form-group {
          margin-bottom: 1rem;
        }

        .form-group label {
          display: block;
          margin-bottom: 0.5rem;
          font-weight: 500;
        }

        .form-group input,
        .form-group select {
          width: 100%;
          padding: 0.5rem 0.75rem;
          border: 1px solid var(--gray-300);
          border-radius: var(--border-radius-sm);
          outline: none;
          transition: var(--transition);
        }

        .form-group input:focus,
        .form-group select:focus {
          border-color: var(--primary-color);
          box-shadow: 0 0 0 2px var(--primary-light);
        }

        /* Buttons */
        .primary-button {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          padding: 0.5rem 1rem;
          background-color: var(--primary-color);
          color: white;
          border-radius: var(--border-radius-sm);
          font-weight: 500;
          transition: var(--transition);
        }

        .primary-button:hover {
          background-color: var(--primary-hover);
        }

        .primary-button:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .secondary-button {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          padding: 0.5rem 1rem;
          background-color: var(--primary-light);
          color: var(--primary-color);
          border-radius: var(--border-radius-sm);
          font-weight: 500;
          transition: var(--transition);
        }

        .secondary-button:hover {
          background-color: var(--primary-light);
          opacity: 0.9;
        }

        .icon-button {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 0.25rem;
          border-radius: var(--border-radius-sm);
          color: var(--gray-600);
          transition: var(--transition);
        }

        .icon-button:hover {
          background-color: var(--gray-200);
          color: var(--gray-800);
        }

        .questions-button {
          display: inline-flex;
          align-items: center;
          gap: 0.25rem;
          margin-left: auto;
          font-size: 0.75rem;
          color: var(--primary-color);
          transition: var(--transition);
        }

        .questions-button:hover {
          color: var(--primary-hover);
        }

        .remove-button {
          display: inline-flex;
          align-items: center;
          gap: 0.25rem;
          padding: 0.25rem 0.5rem;
          font-size: 0.75rem;
          background-color: var(--red-light);
          color: var(--red);
          border-radius: var(--border-radius-sm);
          transition: var(--transition);
        }

        .remove-button:hover {
          opacity: 0.9;
        }

        .close-button {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 0.25rem;
          border-radius: 50%;
          color: var(--gray-600);
          transition: var(--transition);
        }

        .close-button:hover {
          background-color: var(--gray-200);
          color: var(--gray-800);
        }

        .full-width {
          width: 100%;
        }

        /* Students Section */
        .students-section {
          margin-top: 1rem;
        }

        .students-header {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin-bottom: 0.5rem;
        }

        .empty-students {
          font-size: 0.875rem;
          color: var(--text-lighter);
          padding: 0.5rem 0;
        }

        .students-list {
          border-top: 1px solid var(--gray-200);
        }

        .student-item {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0.75rem 0;
          border-bottom: 1px solid var(--gray-200);
        }

        .student-name {
          font-weight: 500;
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
          align-items: center;
          justify-content: center;
          z-index: 1000;
        }

        .modal-container {
          width: 100%;
          max-width: 500px;
          max-height: 90vh;
          overflow-y: auto;
          background-color: var(--white);
          border-radius: var(--border-radius-lg);
          box-shadow: var(--box-shadow);
        }

        .modal-large {
          max-width: 700px;
        }

        .modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1rem;
          border-bottom: 1px solid var(--gray-300);
          background-color: var(--white);
        }

        .modal-header.sticky {
          position: sticky;
          top: 0;
          z-index: 10;
        }

        .modal-content {
          padding: 1rem;
        }

        .modal-content pre {
          white-space: pre-wrap;
          font-family: monospace;
          background-color: var(--gray-100);
          padding: 1rem;
          border-radius: var(--border-radius-sm);
        }

        /* Icons */
        .icon-small {
          width: 16px;
          height: 16px;
        }

        .icon-tiny {
          width: 12px;
          height: 12px;
        }
      `}</style>
    </>
  );
};

export default CourseGroup;
