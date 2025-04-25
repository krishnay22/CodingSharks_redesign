"use client";

import { useState, useEffect } from "react";

const CourseTimeline = () => {
  // State to track which topics are expanded
  const [expandedTopics, setExpandedTopics] = useState({});
  // State to track which sections are expanded
  const [expandedSections, setExpandedSections] = useState({
    frontEnd: false,
    backEnd: false,
  });
  // State for question modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState("");
  const [modalTitle, setModalTitle] = useState("");

  // Initial data structure with nested topics and subtopics
  const [topics, setTopics] = useState({
    webDevelopment: {
      name: "Web Development",
      progress: 0,
      sections: {
        frontEnd: {
          name: "Front end",
          progress: 0,
          topics: [
            {
              id: "html",
              name: "HTML",
              completed: false,
              subtopics: [
                {
                  id: "html-basics",
                  name: "HTML Basics",
                  completed: false,
                  questionsFile: "html-basics-questions.txt",
                },
                {
                  id: "html-forms",
                  name: "HTML Forms",
                  completed: false,
                  questionsFile: "html-forms-questions.txt",
                },
                {
                  id: "html-semantics",
                  name: "Semantic HTML",
                  completed: false,
                  questionsFile: "html-semantics-questions.txt",
                },
                {
                  id: "html-media",
                  name: "HTML Media",
                  completed: false,
                  questionsFile: "html-media-questions.txt",
                },
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
                  questionsFile: "css-selectors-questions.txt",
                },
                {
                  id: "css-box-model",
                  name: "Box Model",
                  completed: false,
                  questionsFile: "css-box-model-questions.txt",
                },
                {
                  id: "css-flexbox",
                  name: "Flexbox",
                  completed: false,
                  questionsFile: "css-flexbox-questions.txt",
                },
                {
                  id: "css-grid",
                  name: "CSS Grid",
                  completed: false,
                  questionsFile: "css-grid-questions.txt",
                },
              ],
            },
            {
              id: "responsive",
              name: "Responsive Design",
              completed: false,
              subtopics: [
                {
                  id: "media-queries",
                  name: "Media Queries",
                  completed: false,
                  questionsFile: "media-queries-questions.txt",
                },
                {
                  id: "mobile-first",
                  name: "Mobile First Design",
                  completed: false,
                  questionsFile: "mobile-first-questions.txt",
                },
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
                  questionsFile: "js-variables-questions.txt",
                },
                {
                  id: "operators",
                  name: "Operators",
                  completed: true,
                  questionsFile: "js-operators-questions.txt",
                },
                {
                  id: "conditionals",
                  name: "Conditionals",
                  completed: true,
                  questionsFile: "js-conditionals-questions.txt",
                },
                {
                  id: "loops",
                  name: "Loops",
                  completed: false,
                  questionsFile: "js-loops-questions.txt",
                },
              ],
            },
            {
              id: "js-functions",
              name: "Functions",
              completed: false,
              subtopics: [
                {
                  id: "function-basics",
                  name: "Function Basics",
                  completed: false,
                  questionsFile: "function-basics-questions.txt",
                },
                {
                  id: "arrow-functions",
                  name: "Arrow Functions",
                  completed: false,
                  questionsFile: "arrow-functions-questions.txt",
                },
                {
                  id: "callbacks",
                  name: "Callbacks",
                  completed: false,
                  questionsFile: "callbacks-questions.txt",
                },
              ],
            },
            {
              id: "js-strings",
              name: "String Methods",
              completed: false,
              subtopics: [
                {
                  id: "string-basics",
                  name: "String Basics",
                  completed: true,
                  questionsFile: "string-basics-questions.txt",
                },
                {
                  id: "string-methods",
                  name: "String Methods",
                  completed: true,
                  questionsFile: "string-methods-questions.txt",
                },
                {
                  id: "string-methods-args",
                  name: "String Methods With Arguments",
                  completed: true,
                  questionsFile: "string-methods-args-questions.txt",
                },
              ],
            },
            {
              id: "js-advanced",
              name: "Advanced Concepts",
              completed: false,
              subtopics: [
                {
                  id: "promises",
                  name: "Promises",
                  completed: false,
                  questionsFile: "promises-questions.txt",
                },
                {
                  id: "async-await",
                  name: "Async/Await",
                  completed: false,
                  questionsFile: "async-await-questions.txt",
                },
                {
                  id: "es6-features",
                  name: "ES6+ Features",
                  completed: false,
                  questionsFile: "es6-features-questions.txt",
                },
              ],
            },
          ],
        },
        backEnd: {
          name: "Back end",
          progress: 0,
          topics: [
            {
              id: "nodejs",
              name: "Node.js",
              completed: false,
              subtopics: [
                {
                  id: "node-basics",
                  name: "Node.js Basics",
                  completed: false,
                  questionsFile: "node-basics-questions.txt",
                },
                {
                  id: "npm",
                  name: "NPM",
                  completed: false,
                  questionsFile: "npm-questions.txt",
                },
                {
                  id: "express",
                  name: "Express.js",
                  completed: false,
                  questionsFile: "express-questions.txt",
                },
              ],
            },
            {
              id: "databases",
              name: "Databases",
              completed: false,
              subtopics: [
                {
                  id: "sql",
                  name: "SQL",
                  completed: false,
                  questionsFile: "sql-questions.txt",
                },
                {
                  id: "mongodb",
                  name: "MongoDB",
                  completed: false,
                  questionsFile: "mongodb-questions.txt",
                },
              ],
            },
            {
              id: "apis",
              name: "APIs",
              completed: false,
              subtopics: [
                {
                  id: "rest",
                  name: "REST APIs",
                  completed: false,
                  questionsFile: "rest-apis-questions.txt",
                },
                {
                  id: "graphql",
                  name: "GraphQL",
                  completed: false,
                  questionsFile: "graphql-questions.txt",
                },
              ],
            },
          ],
        },
      },
    },
  });

  // Function to fetch and display question content
  const showQuestions = async (subtopicName, questionsFile) => {
    try {
      // In a real application, you would fetch the file from your server
      // For this example, we'll simulate content based on the filename
      const response = await fetch(`/api/questions/${questionsFile}`);

      if (response.ok) {
        const questionText = await response.text();
        setModalContent(questionText);
      } else {
        // Fallback content if file not found
        setModalContent(`
1. What is ${subtopicName}?
2. How do you implement ${subtopicName} in a project?
3. What are the best practices for ${subtopicName}?
4. Why is ${subtopicName} important in web development?
5. Give an example of ${subtopicName} in action.
        `);
      }

      setModalTitle(`${subtopicName} Questions`);
      setIsModalOpen(true);
    } catch (error) {
      console.error("Error loading questions:", error);
      setModalContent("Unable to load questions at this time.");
      setModalTitle("Error");
      setIsModalOpen(true);
    }
  };

  // Toggle expansion of a section
  const toggleSectionExpansion = (sectionKey) => {
    setExpandedSections((prev) => ({
      ...prev,
      [sectionKey]: !prev[sectionKey],
    }));
  };

  // Toggle expansion of a topic
  const toggleTopicExpansion = (sectionKey, topicId) => {
    setExpandedTopics((prev) => ({
      ...prev,
      [`${sectionKey}-${topicId}`]: !prev[`${sectionKey}-${topicId}`],
    }));
  };

  // Toggle completion status of a subtopic
  const toggleSubtopicCompletion = (sectionKey, topicId, subtopicId) => {
    const updatedTopics = { ...topics };
    const section = updatedTopics.webDevelopment.sections[sectionKey];
    const topicIndex = section.topics.findIndex(
      (topic) => topic.id === topicId
    );

    if (topicIndex !== -1) {
      const topic = section.topics[topicIndex];
      const subtopicIndex = topic.subtopics.findIndex(
        (subtopic) => subtopic.id === subtopicId
      );

      if (subtopicIndex !== -1) {
        // Toggle the subtopic completion
        topic.subtopics[subtopicIndex].completed =
          !topic.subtopics[subtopicIndex].completed;

        // Check if all subtopics are completed to mark the topic as completed
        topic.completed = topic.subtopics.every(
          (subtopic) => subtopic.completed
        );

        // Recalculate section progress
        updateProgress(updatedTopics);

        setTopics(updatedTopics);
      }
    }
  };

  // Calculate progress for each section and overall progress
  const updateProgress = (topicsData) => {
    const webDev = topicsData.webDevelopment;

    // Calculate progress for each section
    Object.keys(webDev.sections).forEach((sectionKey) => {
      const section = webDev.sections[sectionKey];
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
    const sections = Object.values(webDev.sections);
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

    webDev.progress =
      totalSubtopics > 0
        ? Math.round((completedSubtopics / totalSubtopics) * 100)
        : 0;
  };

  // Initialize progress on component mount
  useEffect(() => {
    const updatedTopics = { ...topics };
    updateProgress(updatedTopics);
    setTopics(updatedTopics);
  }, []);

  // Circular progress component
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

  // Questions Modal Component
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
          <h1 className="main-title">{topics.webDevelopment.name}</h1>

          <div className="progress-bar-container">
            <div className="progress-bar">
              <div
                className="progress-fill"
                style={{ width: `${topics.webDevelopment.progress}%` }}
              ></div>
            </div>
            <div className="progress-text">
              {topics.webDevelopment.progress}% completed
            </div>
          </div>

          <div className="sections-container">
            {/* Front End Section */}
            <div className="section-card">
              <div
                className="section-header"
                onClick={() => toggleSectionExpansion("frontEnd")}
              >
                <CircularProgress
                  progress={topics.webDevelopment.sections.frontEnd.progress}
                />
                <h2 className="section-title">
                  {topics.webDevelopment.sections.frontEnd.name}
                </h2>
                <span className="expand-icon section-expand">
                  {expandedSections.frontEnd ? "−" : "+"}
                </span>
              </div>

              {expandedSections.frontEnd && (
                <div className="topics-list">
                  {topics.webDevelopment.sections.frontEnd.topics.map(
                    (topic) => (
                      <div key={topic.id} className="topic-container">
                        <div
                          className="topic-item"
                          onClick={() =>
                            toggleTopicExpansion("frontEnd", topic.id)
                          }
                        >
                          <span
                            className={`topic-indicator ${
                              topic.completed ? "completed" : ""
                            }`}
                          ></span>
                          <span className="topic-name">{topic.name}</span>
                          <span className="expand-icon">
                            {expandedTopics[`frontEnd-${topic.id}`] ? "−" : "+"}
                          </span>
                        </div>

                        {expandedTopics[`frontEnd-${topic.id}`] && (
                          <div className="subtopics-list">
                            {topic.subtopics.map((subtopic) => (
                              <div
                                key={subtopic.id}
                                className="subtopic-item"
                                onClick={() =>
                                  toggleSubtopicCompletion(
                                    "frontEnd",
                                    topic.id,
                                    subtopic.id
                                  )
                                }
                              >
                                <span
                                  className={`subtopic-indicator ${
                                    subtopic.completed ? "completed" : ""
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
                    )
                  )}
                </div>
              )}
            </div>

            {/* Back End Section */}
            <div className="section-card">
              <div
                className="section-header"
                onClick={() => toggleSectionExpansion("backEnd")}
              >
                <CircularProgress
                  progress={topics.webDevelopment.sections.backEnd.progress}
                />
                <h2 className="section-title">
                  {topics.webDevelopment.sections.backEnd.name}
                </h2>
                <span className="expand-icon section-expand">
                  {expandedSections.backEnd ? "−" : "+"}
                </span>
              </div>

              {expandedSections.backEnd && (
                <div className="topics-list">
                  {topics.webDevelopment.sections.backEnd.topics.map(
                    (topic) => (
                      <div key={topic.id} className="topic-container">
                        <div
                          className="topic-item"
                          onClick={() =>
                            toggleTopicExpansion("backEnd", topic.id)
                          }
                        >
                          <span
                            className={`topic-indicator ${
                              topic.completed ? "completed" : ""
                            }`}
                          ></span>
                          <span className="topic-name">{topic.name}</span>
                          <span className="expand-icon">
                            {expandedTopics[`backEnd-${topic.id}`] ? "−" : "+"}
                          </span>
                        </div>

                        {expandedTopics[`backEnd-${topic.id}`] && (
                          <div className="subtopics-list">
                            {topic.subtopics.map((subtopic) => (
                              <div
                                key={subtopic.id}
                                className="subtopic-item"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  toggleSubtopicCompletion(
                                    "backEnd",
                                    topic.id,
                                    subtopic.id
                                  );
                                }}
                              >
                                <span
                                  className={`subtopic-indicator ${
                                    subtopic.completed ? "completed" : ""
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
                    )
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Render Questions Modal */}
      <QuestionsModal />

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

        .sections-container {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .section-card {
          border: 1px solid #e0e0e0;
          border-radius: 15px;
          padding: 20px;
        }

        .section-header {
          display: flex;
          align-items: center;
          margin-bottom: 15px;
          cursor: pointer;
          position: relative;
        }

        .section-title {
          font-size: 20px;
          font-weight: 500;
          margin-left: 15px;
          flex-grow: 1;
        }

        .section-expand {
          position: absolute;
          right: 10px;
        }

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

        .topics-list {
          margin-left: 40px;
        }

        .topic-container {
          margin-bottom: 10px;
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
      `}</style>
    </div>
  );
};

export default CourseTimeline;
