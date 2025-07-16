const express = require("express");
const router = express.Router();
const Course = require("../models/Course");
const SubCourse = require("../models/SubCourse");
const CourseTopic = require("../models/CourseTopic");
const Question = require("../models/Question"); // Added for cascading deletes
const { protect } = require("../middleware/authMiddleware");

// --- Course Routes ---

// POST /api/courses - Create a new course (Admin only)
router.post("/courses", protect, async (req, res) => {
  try {
    if (!req.user.isAdmin) {
      return res.status(403).json({ message: "Not authorized as an admin" });
    }
    const { course_name, description } = req.body;
    const newCourse = new Course({ course_name, description });
    const savedCourse = await newCourse.save();
    res.status(201).json({
      message: "Course created successfully",
      course: savedCourse,
    });
  } catch (error) {
    console.error("Error creating course:", error);
    if (error.code === 11000) {
      return res.status(400).json({ message: "Course name already exists" });
    }
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// GET /api/courses - Get all courses (now populates sub_course_ids)
router.get("/courses", async (req, res) => {
  try {
    // Populate sub_course_ids to get sub-course names and descriptions
    const courses = await Course.find({}).populate(
      "sub_course_ids",
      "sub_course_name description"
    );
    res.status(200).json({ courses });
  } catch (error) {
    console.error("Error fetching courses:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// GET /api/courses/:id - Get a single course by ID (now populates sub_course_ids)
router.get("/courses/:id", async (req, res) => {
  try {
    const course = await Course.findById(req.params.id).populate(
      "sub_course_ids",
      "sub_course_name description"
    ); // Populate desired fields
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }
    res.status(200).json({ course });
  } catch (error) {
    console.error("Error fetching course by ID:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// PUT /api/courses/:id - Update a course (Admin only)
router.put("/courses/:id", protect, async (req, res) => {
  try {
    if (!req.user.isAdmin) {
      return res.status(403).json({ message: "Not authorized as an admin" });
    }
    const updatedCourse = await Course.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedCourse) {
      return res.status(404).json({ message: "Course not found" });
    }
    res.status(200).json({
      message: "Course updated successfully",
      course: updatedCourse,
    });
  } catch (error) {
    console.error("Error updating course:", error);
    if (error.code === 11000) {
      return res.status(400).json({ message: "Course name already exists" });
    }
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// DELETE /api/courses/:id - Delete a course (Admin only)
router.delete("/courses/:id", protect, async (req, res) => {
  try {
    if (!req.user.isAdmin) {
      return res.status(403).json({ message: "Not authorized as an admin" });
    }
    const courseId = req.params.id;

    // --- IMPORTANT: Cascading Delete for SubCourses, Topics, Questions ---
    // 1. Find all sub-courses associated with this course
    const subCoursesToDelete = await SubCourse.find({ course_id: courseId });
    const subCourseIdsToDelete = subCoursesToDelete.map((sc) => sc._id);

    // 2. Delete all topics associated with these sub-courses
    const topicsToDelete = await CourseTopic.find({
      sub_course_id: { $in: subCourseIdsToDelete },
    });
    const topicIdsToDelete = topicsToDelete.map((t) => t._id);
    await CourseTopic.deleteMany({
      sub_course_id: { $in: subCourseIdsToDelete },
    });

    // 3. Delete all questions associated with these topics
    await Question.deleteMany({ course_topic_id: { $in: topicIdsToDelete } });

    // 4. Delete the sub-courses themselves
    await SubCourse.deleteMany({ course_id: courseId });

    // 5. Delete the course itself
    const deletedCourse = await Course.findByIdAndDelete(courseId);
    if (!deletedCourse) {
      return res.status(404).json({ message: "Course not found" });
    }
    res
      .status(200)
      .json({ message: "Course and its associated data deleted successfully" });
  } catch (error) {
    console.error("Error deleting course:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// --- SubCourse Routes ---

// POST /api/sub-courses - Create a new sub-course (Admin only)
router.post("/sub-courses", protect, async (req, res) => {
  try {
    if (!req.user.isAdmin) {
      return res.status(403).json({ message: "Not authorized as an admin" });
    }
    const { course_id, sub_course_name, description } = req.body;

    // Check if the parent course exists
    const parentCourse = await Course.findById(course_id);
    if (!parentCourse) {
      return res.status(404).json({ message: "Parent course not found" });
    }

    const newSubCourse = new SubCourse({
      course_id,
      sub_course_name,
      description,
    });
    const savedSubCourse = await newSubCourse.save();

    // --- IMPORTANT: Update the parent Course's sub_course_ids array ---
    parentCourse.sub_course_ids.push(savedSubCourse._id);
    await parentCourse.save();
    // --- End important update ---

    res.status(201).json({
      message: "Sub-course created successfully",
      subCourse: savedSubCourse,
    });
  } catch (error) {
    console.error("Error creating sub-course:", error);
    if (error.code === 11000) {
      return res
        .status(400)
        .json({ message: "Sub-course name already exists for this course" });
    }
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// GET /api/sub-courses - Get all sub-courses (optionally by course_id)
router.get("/sub-courses", async (req, res) => {
  try {
    const { course_id } = req.query;
    let query = {};
    if (course_id) {
      query.course_id = course_id;
    }
    const subCourses = await SubCourse.find(query).populate(
      "course_id",
      "course_name"
    );
    res.status(200).json({ subCourses });
  } catch (error) {
    console.error("Error fetching sub-courses:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// GET /api/sub-courses/:id - Get a single sub-course by ID
router.get("/sub-courses/:id", async (req, res) => {
  try {
    const subCourse = await SubCourse.findById(req.params.id).populate(
      "course_id",
      "course_name"
    );
    if (!subCourse) {
      return res.status(404).json({ message: "Sub-course not found" });
    }
    res.status(200).json({ subCourse });
  } catch (error) {
    console.error("Error fetching sub-course by ID:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// PUT /api/sub-courses/:id - Update a sub-course (Admin only)
router.put("/sub-courses/:id", protect, async (req, res) => {
  try {
    if (!req.user.isAdmin) {
      return res.status(403).json({ message: "Not authorized as an admin" });
    }
    const subCourseId = req.params.id;
    const updates = req.body;

    // --- IMPORTANT: Handle change of parent course_id ---
    if (updates.course_id && updates.course_id !== subCourseId) {
      const oldSubCourse = await SubCourse.findById(subCourseId);
      if (
        oldSubCourse &&
        oldSubCourse.course_id.toString() !== updates.course_id
      ) {
        // Remove from old parent's sub_course_ids array
        await Course.findByIdAndUpdate(oldSubCourse.course_id, {
          $pull: { sub_course_ids: subCourseId },
        });
        // Add to new parent's sub_course_ids array
        await Course.findByIdAndUpdate(updates.course_id, {
          $push: { sub_course_ids: subCourseId },
        });
      }
    }
    // --- End important update ---

    const updatedSubCourse = await SubCourse.findByIdAndUpdate(
      subCourseId,
      updates,
      { new: true, runValidators: true }
    );
    if (!updatedSubCourse) {
      return res.status(404).json({ message: "Sub-course not found" });
    }
    res.status(200).json({
      message: "Sub-course updated successfully",
      subCourse: updatedSubCourse,
    });
  } catch (error) {
    console.error("Error updating sub-course:", error);
    if (error.code === 11000) {
      return res
        .status(400)
        .json({ message: "Sub-course name already exists for this course" });
    }
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// DELETE /api/sub-courses/:id - Delete a sub-course (Admin only)
router.delete("/sub-courses/:id", protect, async (req, res) => {
  try {
    if (!req.user.isAdmin) {
      return res.status(403).json({ message: "Not authorized as an admin" });
    }
    const subCourseId = req.params.id;

    // Find the sub-course to get its parent_course_id before deleting
    const subCourseToDelete = await SubCourse.findById(subCourseId);
    if (!subCourseToDelete) {
      return res.status(404).json({ message: "Sub-course not found" });
    }

    // --- IMPORTANT: Remove from the parent Course's sub_course_ids array ---
    await Course.findByIdAndUpdate(subCourseToDelete.course_id, {
      $pull: { sub_course_ids: subCourseId },
    });
    // --- End important update ---

    // Optional: Delete related topics and questions
    const topicsToDelete = await CourseTopic.find({
      sub_course_id: subCourseId,
    });
    const topicIdsToDelete = topicsToDelete.map((t) => t._id);

    await Question.deleteMany({ course_topic_id: { $in: topicIdsToDelete } });
    await CourseTopic.deleteMany({ sub_course_id: subCourseId });

    const deletedSubCourse = await SubCourse.findByIdAndDelete(subCourseId);
    if (!deletedSubCourse) {
      return res.status(404).json({ message: "Sub-course not found" });
    }
    res
      .status(200)
      .json({
        message: "Sub-course and its associated data deleted successfully",
      });
  } catch (error) {
    console.error("Error deleting sub-course:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// --- CourseTopic Routes ---

// POST /api/topics - Create a new course topic (Admin only)
router.post("/topics", protect, async (req, res) => {
  try {
    if (!req.user.isAdmin) {
      return res.status(403).json({ message: "Not authorized as an admin" });
    }
    const { sub_course_id, course_topic_name, description, is_completed } =
      req.body; // <-- Added is_completed

    // Check if the parent sub-course exists
    const parentSubCourse = await SubCourse.findById(sub_course_id);
    if (!parentSubCourse) {
      return res.status(404).json({ message: "Parent sub-course not found" });
    }

    const newTopic = new CourseTopic({
      sub_course_id,
      course_topic_name,
      description,
      is_completed: is_completed === "true", // <-- Handle boolean conversion
    });
    const savedTopic = await newTopic.save();
    res.status(201).json({
      message: "Course topic created successfully",
      topic: savedTopic,
    });
  } catch (error) {
    console.error("Error creating course topic:", error);
    if (error.code === 11000) {
      return res.status(400).json({
        message: "Course topic name already exists for this sub-course",
      });
    }
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// GET /api/topics - Get all course topics (optionally by sub_course_id)
router.get("/topics", async (req, res) => {
  try {
    const { sub_course_id } = req.query;
    let query = {};
    if (sub_course_id) {
      query.sub_course_id = sub_course_id;
    }
    const topics = await CourseTopic.find(query).populate(
      "sub_course_id",
      "sub_course_name"
    );
    res.status(200).json({ topics });
  } catch (error) {
    console.error("Error fetching course topics:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// GET /api/topics/:id - Get a single course topic by ID
router.get("/topics/:id", async (req, res) => {
  try {
    const topic = await CourseTopic.findById(req.params.id).populate(
      "sub_course_id",
      "sub_course_name"
    );
    if (!topic) {
      return res.status(404).json({ message: "Course topic not found" });
    }
    res.status(200).json({ topic });
  } catch (error) {
    console.error("Error fetching course topic by ID:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// PUT /api/topics/:id - Update a course topic (Admin only, or maybe student for their completion status)
router.put("/topics/:id", protect, async (req, res) => {
  try {
    // Decide who can update 'is_completed': only admin, or also the user themselves?
    // For now, let's assume admin or the user themselves for their progress.
    // If only admin, keep `if (!req.user.isAdmin)` check only.
    if (!req.user.isAdmin && !req.body.is_completed) {
      // If not admin, only allow updates to is_completed
      // Add logic here if you want to restrict who can change other topic fields
      return res
        .status(403)
        .json({ message: "Not authorized to update this topic" });
    }

    const updates = req.body;
    if (typeof updates.is_completed === "string") {
      // Handle boolean conversion for is_completed
      updates.is_completed = updates.is_completed === "true";
    }

    const updatedTopic = await CourseTopic.findByIdAndUpdate(
      req.params.id,
      updates, // Pass updates object
      { new: true, runValidators: true }
    );
    if (!updatedTopic) {
      return res.status(404).json({ message: "Course topic not found" });
    }
    res.status(200).json({
      message: "Course topic updated successfully",
      topic: updatedTopic,
    });
  } catch (error) {
    console.error("Error updating course topic:", error);
    if (error.code === 11000) {
      return res.status(400).json({
        message: "Course topic name already exists for this sub-course",
      });
    }
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// DELETE /api/topics/:id - Delete a course topic (Admin only)
router.delete("/topics/:id", protect, async (req, res) => {
  try {
    if (!req.user.isAdmin) {
      return res.status(403).json({ message: "Not authorized as an admin" });
    }
    const topicId = req.params.id;

    // Optional: Delete related questions
    await Question.deleteMany({ course_topic_id: topicId });

    const deletedTopic = await CourseTopic.findByIdAndDelete(topicId);
    if (!deletedTopic) {
      return res.status(404).json({ message: "Course topic not found" });
    }
    res.status(200).json({ message: "Course topic deleted successfully" });
  } catch (error) {
    console.error("Error deleting course topic:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

module.exports = router;
