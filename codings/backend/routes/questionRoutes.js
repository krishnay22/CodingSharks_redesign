// backend/routes/questionRoutes.js
const express = require("express");
const { getQuestions } = require("../controllers/questionController");
const path = require("path");

const router = express.Router();

router.get("/:filename", getQuestions);

module.exports = router;
