// backend/controllers/questionController.js
const fs = require("fs");
const path = require("path");

exports.getQuestions = (req, res) => {
  try {
    const { filename } = req.params;

    // Security: Prevent directory traversal
    if (filename.includes("..") || filename.includes("/")) {
      return res.status(400).json({ error: "Invalid filename" });
    }

    const filePath = path.join(__dirname, "../data/questions", filename);

    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ error: "Question file not found" });
    }

    const content = fs.readFileSync(filePath, "utf8");
    res.send(content);
  } catch (error) {
    res.status(500).json({ error: "Failed to load questions" });
  }
};
