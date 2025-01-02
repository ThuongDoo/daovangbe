const express = require("express");
const router = express.Router();

const {
  createLesson,
  getLesson,
  createQuestion,
  getQuestions,
  deleteLesson,
  getAllQuestions,
} = require("../controllers/lessonController");

router.post("/", createLesson);
router.get("/", getLesson);
router.delete("/:lessonId", deleteLesson);
router.post("/question", createQuestion);
router.get("/question/:lessonId", getQuestions);
router.get("/all", getAllQuestions);

module.exports = router;
