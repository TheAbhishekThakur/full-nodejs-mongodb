const express = require("express");
const router = express.Router();
const CourseController = require("../controllers/course");

router.post("/create-course", CourseController.createUserCourse);
router.get(
  "/get-user-course-details",
  CourseController.getUserWithCoursDetails
);

module.exports = router;
