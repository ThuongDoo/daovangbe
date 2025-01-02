const mongoose = require("mongoose");

const LessonSchema = mongoose.Schema(
  {
    name: {
      type: String,
    },
  },
  {
    timestamps: true, // Bật timestamps
  }
);

LessonSchema.pre("save", function (next) {
  if (this.isNew && !this.name) {
    this.name = `Lesson ID ${this._id}`;
  }
  next();
});

module.exports = mongoose.model("Lesson", LessonSchema);
