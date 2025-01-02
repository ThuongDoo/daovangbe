const mongoose = require("mongoose");

const QuestionSchema = new mongoose.Schema(
  {
    ques: {
      type: String,
      required: true,
    },
    ans: {
      type: [String],
      validate: {
        validator: (arr) => arr.length === 4,
        message: "The ans array must contain exactly 4 options.",
      },
      required: true,
    },
    correct: {
      type: Number,
      required: true,
      min: 0,
      max: 3, // Ensures the correct index is valid within the ans array
    },
    lesson: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Lesson",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Question", QuestionSchema);
