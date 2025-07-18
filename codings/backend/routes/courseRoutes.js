const express = require("express");
const router = express.Router();
const Course = require("../models/Course");
const UserCourseProgress = require("../models/UserCourseProgress");
const { protect } = require("../middleware/authMiddleware");
// --- Course Management Routes (Admin Only) ---
const checkAdmin = (req, res, next) => {
  if (!req.user || !req.user.isAdmin) {
    return res.status(403).json({ message: "Not authorized as an admin" });
  }
  next();
};

// POST /api/courses - Create a new course
router.post("/courses", protect, checkAdmin, async (req, res) => {
  // checkAdmin middleware
  try {
    const { name, description, topics } = req.body; // Changed 'modules' to 'topics'

    if (!name || !description || !topics || !Array.isArray(topics)) {
      return res.status(400).json({
        message: "Course name, description, and topics array are required.", // Changed 'modules' to 'topics'
      });
    }

    // Basic validation for topics and subtopics structure
    for (const topic of topics) {
      // Changed 'module' to 'topic'
      // Ensure topic has id_string and name, and subtopics is an array
      if (!topic.id_string || !topic.name || !Array.isArray(topic.subtopics)) {
        // Changed module_name to name, added id_string, lessons to subtopics
        return res.status(400).json({
          message:
            "Each topic must have an id_string, name, and a subtopics array.", // Changed 'module' to 'topic', 'lessons' to 'subtopics'
        });
      }
      for (const subtopic of topic.subtopics) {
        // Changed 'lesson' to 'subtopic'
        // Ensure subtopic has id_string and name (questionsFile is optional)
        if (!subtopic.id_string || !subtopic.name) {
          // Changed lesson_name to name, added id_string, removed order check (as it's not strictly required by model, but you can add if needed)
          return res.status(400).json({
            message: "Each subtopic must have an id_string and a name.",
          }); // Changed 'lesson' to 'subtopic'
        }
      }
    }

    const newCourse = new Course({
      name,
      description,
      topics, // Changed 'modules' to 'topics'
      created_by: req.user.id, // Link to the admin who created it
    });

    const savedCourse = await newCourse.save();
    res
      .status(201)
      .json({ message: "Course created successfully", course: savedCourse });
  } catch (error) {
    console.error("Error creating course:", error);
    if (error.code === 11000) {
      // Duplicate key error for unique name
      return res
        .status(400)
        .json({ message: "A course with this name already exists." });
    }
    res.status(500).json({ message: "Server error", error: error.message });
  }
});
// GET /api/courses - Get all courses (Admin can see all, users can see available)
router.get("/courses", protect, async (req, res) => {
  try {
    let query = {};
    // If you want to differentiate, e.g., only active courses for non-admins
    // if (!req.user.isAdmin) {
    //   query = { is_active: true }; // Assuming Course has an is_active field
    // }
    const courses = await Course.find(query).sort({ createdAt: -1 });
    res.status(200).json({ courses });
  } catch (error) {
    console.error("Error fetching courses:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// GET /api/courses/:id - Get a single course by ID
router.get("/courses/:id", protect, async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).json({ message: "Course not found." });
    }
    res.status(200).json({ course });
  } catch (error) {
    console.error("Error fetching course:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// PUT /api/courses/:id - Update a course (Admin Only)
router.put("/courses/:id", protect, checkAdmin, async (req, res) => {
  try {
    const updatedCourse = await Course.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedCourse) {
      return res.status(404).json({ message: "Course not found." });
    }
    res
      .status(200)
      .json({ message: "Course updated successfully", course: updatedCourse });
  } catch (error) {
    console.error("Error updating course:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// DELETE /api/courses/:id - Delete a course (Admin Only)
router.delete("/courses/:id", protect, checkAdmin, async (req, res) => {
  try {
    const deletedCourse = await Course.findByIdAndDelete(req.params.id);
    if (!deletedCourse) {
      return res.status(404).json({ message: "Course not found." });
    }
    // OPTIONAL: Also delete associated groups and user progress for this course
    await Group.deleteMany({ course_id: req.params.id });
    await UserCourseProgress.deleteMany({ course_id: req.params.id });

    res.status(200).json({ message: "Course deleted successfully." });
  } catch (error) {
    console.error("Error deleting course:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// --- Group Management Routes (Admin Only) ---

// POST /api/groups - Create a new group
router.post("/groups", protect, checkAdmin, async (req, res) => {
  try {
    const { group_name, description, course_id, members } = req.body;

    if (!group_name || !course_id) {
      return res
        .status(400)
        .json({ message: "Group name and course ID are required." });
    }

    // Optional: Validate if course_id and member_ids exist
    const courseExists = await Course.findById(course_id);
    if (!courseExists) {
      return res.status(400).json({ message: "Course not found." });
    }
    if (members && Array.isArray(members) && members.length > 0) {
      const existingMembers = await User.find({ _id: { $in: members } });
      if (existingMembers.length !== members.length) {
        return res
          .status(400)
          .json({ message: "One or more member IDs are invalid." });
      }
    }

    const newGroup = new Group({
      group_name,
      description,
      course_id,
      members: members || [],
      created_by: req.user.id,
    });

    const savedGroup = await newGroup.save();
    res
      .status(201)
      .json({ message: "Group created successfully", group: savedGroup });
  } catch (error) {
    console.error("Error creating group:", error);
    if (error.code === 11000) {
      // Duplicate key error for unique group_name
      return res
        .status(400)
        .json({ message: "A group with this name already exists." });
    }
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// GET /api/groups - Get all groups (Admin can see all, users can see their own)
router.get("/groups", protect, async (req, res) => {
  try {
    let query = {};
    if (!req.user.isAdmin) {
      // If not admin, only show groups the user is a member of
      query = { members: req.user.id };
    }
    const groups = await Group.find(query)
      .populate("course_id", "name description total_lessons_count") // Populate course details
      .populate("members", "username email"); // Populate member details

    res.status(200).json({ groups });
  } catch (error) {
    console.error("Error fetching groups:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// GET /api/groups/:id - Get a single group by ID
router.get("/groups/:id", protect, async (req, res) => {
  try {
    const group = await Group.findById(req.params.id)
      .populate("course_id", "name description total_lessons_count")
      .populate("members", "username email");

    if (!group) {
      return res.status(404).json({ message: "Group not found." });
    }
    // Ensure non-admin users can only view groups they are members of
    if (
      !req.user.isAdmin &&
      !group.members.some(
        (member) => member._id.toString() === req.user.id.toString()
      )
    ) {
      return res
        .status(403)
        .json({ message: "Not authorized to view this group." });
    }
    res.status(200).json({ group });
  } catch (error) {
    console.error("Error fetching group:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// PUT /api/groups/:id - Update a group (Admin Only)
router.put("/groups/:id", protect, checkAdmin, async (req, res) => {
  try {
    const updatedGroup = await Group.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedGroup) {
      return res.status(404).json({ message: "Group not found." });
    }
    res
      .status(200)
      .json({ message: "Group updated successfully", group: updatedGroup });
  } catch (error) {
    console.error("Error updating group:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// DELETE /api/groups/:id - Delete a group (Admin Only)
router.delete("/groups/:id", protect, checkAdmin, async (req, res) => {
  try {
    const deletedGroup = await Group.findByIdAndDelete(req.params.id);
    if (!deletedGroup) {
      return res.status(404).json({ message: "Group not found." });
    }
    res.status(200).json({ message: "Group deleted successfully." });
  } catch (error) {
    console.error("Error deleting group:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// --- User Course Progress Routes ---

// GET /api/user-progress/:courseId - Get user's progress for a specific course
router.get("/user-progress/:courseId", protect, async (req, res) => {
  try {
    const { courseId } = req.params;
    const userId = req.user.id;

    const progress = await UserCourseProgress.findOne({
      user_id: userId,
      course_id: courseId,
    })
      .populate("user_id", "username email")
      .populate("course_id", "name description total_lessons_count modules"); // Populate course details for calculation

    if (!progress) {
      // If no progress document exists, return a default one (0% completed)
      return res.status(200).json({
        message: "No progress found for this course yet.",
        progress: {
          user_id: userId,
          course_id: courseId,
          completed_lessons: [],
          progress_percentage: 0,
          is_completed: false,
        },
      });
    }
    res.status(200).json({ progress });
  } catch (error) {
    console.error("Error fetching user course progress:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// POST /api/user-progress/complete-lesson - Mark a lesson as completed
router.post("/user-progress/complete-lesson", protect, async (req, res) => {
  try {
    const { courseId, lessonId } = req.body; // lessonId should be the unique ID of the lesson
    const userId = req.user.id;

    if (!courseId || !lessonId) {
      return res
        .status(400)
        .json({ message: "Course ID and Lesson ID are required." });
    }

    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: "Course not found." });
    }

    // Find the specific lesson within the course's modules
    let foundLesson = null;
    for (const module of course.modules) {
      foundLesson = module.lessons.find(
        (lesson) => lesson._id.toString() === lessonId
      );
      if (foundLesson) break;
    }

    if (!foundLesson) {
      return res
        .status(404)
        .json({ message: "Lesson not found in this course." });
    }

    let userProgress = await UserCourseProgress.findOne({
      user_id: userId,
      course_id: courseId,
    });

    if (!userProgress) {
      // Create new progress document if it doesn't exist
      userProgress = new UserCourseProgress({
        user_id: userId,
        course_id: courseId,
        completed_lessons: [],
        progress_percentage: 0,
        is_completed: false,
      });
    }

    // Check if lesson is already completed
    const isLessonAlreadyCompleted = userProgress.completed_lessons.some(
      (item) => item.lesson_id === lessonId
    );

    if (isLessonAlreadyCompleted) {
      return res
        .status(400)
        .json({ message: "Lesson already marked as completed." });
    }

    // Add the completed lesson
    userProgress.completed_lessons.push({
      lesson_id: lessonId,
      completed_at: new Date(),
    });

    // Recalculate progress percentage
    const totalLessons = course.total_lessons_count;
    userProgress.progress_percentage =
      totalLessons > 0
        ? (userProgress.completed_lessons.length / totalLessons) * 100
        : 0;

    if (userProgress.progress_percentage >= 100) {
      userProgress.is_completed = true;
    }
    userProgress.last_progress_update = new Date();

    const updatedProgress = await userProgress.save();
    res.status(200).json({
      message: "Lesson marked as completed!",
      progress: updatedProgress,
    });
  } catch (error) {
    console.error("Error marking lesson completed:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// In your router file:

// GET /api/group-progress/:groupId - Get aggregated progress for a group (Admin or Group Member)
router.get("/group-progress/:groupId", protect, async (req, res) => {
  try {
    const { groupId } = req.params;
    const group = await Group.findById(groupId)
      .populate("members", "username email")
      .populate("course_id", "name total_subtopics_count topics"); // Populate course_id with topics and total_subtopics_count

    if (!group) {
      return res.status(404).json({ message: "Group not found." });
    }

    // Authorization: Admin can view any group, members can view their own group
    if (
      !req.user.isAdmin &&
      !group.members.some(
        (member) => member._id.toString() === req.user.id.toString()
      )
    ) {
      return res
        .status(403)
        .json({ message: "Not authorized to view this group's progress." });
    }

    const memberIds = group.members.map((member) => member._id);
    const courseId = group.course_id._id;
    const totalSubtopicsInCourse = group.course_id.total_subtopics_count; // Use the correct count

    // Fetch progress for all members of this group for this specific course
    const membersProgress = await UserCourseProgress.find({
      user_id: { $in: memberIds },
      course_id: courseId,
    }).populate("user_id", "username");

    let totalProgressSum = 0;
    let completedMembers = 0;
    const detailedProgress = group.members.map((member) => {
      const memberProg = membersProgress.find(
        (p) => p.user_id._id.toString() === member._id.toString()
      );
      const progressPercentage = memberProg
        ? memberProg.progress_percentage
        : 0;
      totalProgressSum += progressPercentage;
      if (memberProg && memberProg.is_completed) {
        completedMembers++;
      }
      return {
        user_id: member._id,
        username: member.username,
        email: member.email,
        progress_percentage: progressPercentage,
        is_completed: memberProg ? memberProg.is_completed : false,
        completed_subtopics_count: memberProg
          ? memberProg.completed_subtopics.length
          : 0, // Adjusted name
      };
    });

    const averageGroupProgress =
      memberIds.length > 0 ? totalProgressSum / memberIds.length : 0;
    const allMembersCompleted =
      completedMembers === memberIds.length && memberIds.length > 0;

    res.status(200).json({
      group_name: group.group_name,
      course_name: group.course_id.name,
      total_members: group.members.length,
      average_progress: parseFloat(averageGroupProgress.toFixed(2)),
      all_members_completed: allMembersCompleted,
      detailed_member_progress: detailedProgress,
    });
  } catch (error) {
    console.error("Error fetching group progress:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// ... (keep all your existing DailyQuestion and DailyQuestionSubmission routes here) ...

module.exports = router;
// POST /api/courses - Create a new course (Admin Only)
router.post("/courses", protect, checkAdmin, async (req, res) => {
  try {
    const { name, description, topics } = req.body; // 'topics' instead of 'modules'

    if (!name || !description || !topics || !Array.isArray(topics)) {
      return res.status(400).json({
        message: "Course name, description, and topics array are required.",
      });
    }

    // Basic validation for topics and subtopics structure
    for (const topic of topics) {
      if (!topic.id_string || !topic.name || !Array.isArray(topic.subtopics)) {
        return res.status(400).json({
          message:
            "Each topic must have an id_string, name, and a subtopics array.",
        });
      }
      for (const subtopic of topic.subtopics) {
        if (!subtopic.id_string || !subtopic.name) {
          return res.status(400).json({
            message: "Each subtopic must have an id_string and a name.",
          });
        }
      }
    }

    const newCourse = new Course({
      name,
      description,
      topics, // Store the nested topics structure
      created_by: req.user.id,
    });

    const savedCourse = await newCourse.save();
    res
      .status(201)
      .json({ message: "Course created successfully", course: savedCourse });
  } catch (error) {
    console.error("Error creating course:", error);
    if (error.code === 11000) {
      // Duplicate key error for unique name
      return res
        .status(400)
        .json({ message: "A course with this name already exists." });
    }
    res.status(500).json({ message: "Server error", error: error.message });
  }
});
// ... (keep all your existing DailyQuestion and DailyQuestionSubmission routes here) ...
// In your router file:

// POST /api/user-progress/complete-subtopic - Mark a subtopic as completed
router.post("/user-progress/complete-subtopic", protect, async (req, res) => {
  try {
    const { courseId, subtopicMongoId } = req.body; // subtopicMongoId is the _id from the Course's nested subtopic document
    const userId = req.user.id;

    if (!courseId || !subtopicMongoId) {
      return res
        .status(400)
        .json({ message: "Course ID and Subtopic Mongoose ID are required." });
    }

    // Find the course to get its structure and total subtopics count
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: "Course not found." });
    }

    // Verify if the subtopicMongoId actually exists within this course
    let subtopicExists = false;
    for (const topic of course.topics) {
      if (
        topic.subtopics.some((sub) => sub._id.toString() === subtopicMongoId)
      ) {
        subtopicExists = true;
        break;
      }
    }
    if (!subtopicExists) {
      return res
        .status(404)
        .json({ message: "Subtopic not found in this course or invalid ID." });
    }

    let userProgress = await UserCourseProgress.findOne({
      user_id: userId,
      course_id: courseId,
    });

    if (!userProgress) {
      // Create new progress document if it doesn't exist
      userProgress = new UserCourseProgress({
        user_id: userId,
        course_id: courseId,
        completed_subtopics: [],
        progress_percentage: 0,
        is_completed: false,
      });
    }

    // Check if subtopic is already completed
    const isSubtopicAlreadyCompleted = userProgress.completed_subtopics.some(
      (item) => item.subtopic_mongoose_id.toString() === subtopicMongoId
    );

    if (isSubtopicAlreadyCompleted) {
      return res
        .status(400)
        .json({ message: "Subtopic already marked as completed." });
    }

    // Add the completed subtopic's Mongoose ID
    userProgress.completed_subtopics.push({
      subtopic_mongoose_id: subtopicMongoId,
      completed_at: new Date(),
    });

    // Recalculate progress percentage
    const totalSubtopics = course.total_subtopics_count;
    userProgress.progress_percentage =
      totalSubtopics > 0
        ? (userProgress.completed_subtopics.length / totalSubtopics) * 100
        : 0;

    if (userProgress.progress_percentage >= 100) {
      userProgress.is_completed = true;
    }
    userProgress.last_progress_update = new Date();

    const updatedProgress = await userProgress.save();
    res.status(200).json({
      message: "Subtopic marked as completed!",
      progress: updatedProgress,
    });
  } catch (error) {
    console.error("Error marking subtopic completed:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// GET /api/user-progress/:courseId - Get user's progress for a specific course (no change needed here, it fetches the UserCourseProgress document)
router.get("/user-progress/:courseId", protect, async (req, res) => {
  try {
    const { courseId } = req.params;
    const userId = req.user.id;

    const progress = await UserCourseProgress.findOne({
      user_id: userId,
      course_id: courseId,
    })
      .populate("user_id", "username email")
      .populate("course_id", "name description total_subtopics_count topics"); // Populate topics to enable frontend to match completed_subtopics

    if (!progress) {
      // If no progress document exists, return a default one (0% completed)
      return res.status(200).json({
        message: "No progress found for this course yet.",
        progress: {
          user_id: userId,
          course_id: courseId,
          completed_subtopics: [], // Changed from completed_lessons
          progress_percentage: 0,
          is_completed: false,
        },
      });
    }
    res.status(200).json({ progress });
  } catch (error) {
    console.error("Error fetching user course progress:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

module.exports = router;
