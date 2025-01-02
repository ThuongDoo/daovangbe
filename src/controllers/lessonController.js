const User = require("../models/User");
const Lesson = require("../models/Lesson");
const Question = require("../models/Question");

const createLesson = async (req, res) => {
  const lesson = await Lesson.create({});
  res.status(200).json({ lesson });
};

const getLesson = async (req, res) => {
  const lessons = await Lesson.find({});
  res.status(200).json({ lessons });
};

const deleteLesson = async (req, res) => {
  const { lessonId } = req.params;
  const lesson = await Lesson.findByIdAndDelete(lessonId);
  console.log(lesson);

  res.status(200).json({ lesson });
};

const createQuestion = async (req, res) => {
  const { lessonId, questions, lessonName } = req.body;
  const newQuestions = questions.map((ques) => {
    return { ...ques, lesson: lessonId };
  });
  await Question.deleteMany({ lesson: lessonId });
  if (lessonName) {
    const lesson = await Lesson.findById(lessonId);
    lesson.name = lessonName;
    await lesson.save();
  }
  const question = await Question.insertMany(newQuestions);
  res.status(200).json({ question });
};

const getQuestions = async (req, res) => {
  const { lessonId } = req.params;

  const questions = await Question.find({ lesson: lessonId });
  res.status(200).json({ questions });
};

const getAllQuestions = async (req, res) => {
  try {
    const questions = await Question.find();

    // Sử dụng một đối tượng tạm thời để nhóm câu hỏi theo lesson
    const lessonMap = {};

    questions.forEach((ques) => {
      if (!lessonMap[ques.lesson]) {
        lessonMap[ques.lesson] = []; // Khởi tạo mảng nếu chưa tồn tại
      }
      lessonMap[ques.lesson].push(ques); // Thêm câu hỏi vào mảng tương ứng
    });

    // Chuyển đổi lessonMap từ object thành mảng
    const lessons = Object.keys(lessonMap).map((lesson) => ({
      lesson,
      questions: lessonMap[lesson],
    }));
    // console.log(questions);

    console.log(lessons);

    res.status(200).json({ lessons });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch questions" });
  }
};

module.exports = {
  createLesson,
  getLesson,
  createQuestion,
  getQuestions,
  deleteLesson,
  getAllQuestions,
};
