// backend/controllers/courseController.js
const courseData = require("../data/courseData.json");

exports.getCourseData = (req, res) => {
  try {
    // Calculate initial progress if needed
    const dataWithProgress = calculateProgress(courseData);
    res.json(dataWithProgress);
  } catch (error) {
    res.status(500).json({ error: "Failed to load course data" });
  }
};

function calculateProgress(data) {
  // Implement your progress calculation logic here
  // Similar to what you had in your frontend
  return data;
}
