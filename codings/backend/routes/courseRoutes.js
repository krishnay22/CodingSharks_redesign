// backend/routes/courseRoutes.js
const express = require("express");
const { getCourseData } = require("../controllers/courseController");

const router = express.Router();

router.get("/", getCourseData);

module.exports = router;
