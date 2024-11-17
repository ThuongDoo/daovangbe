const mongoose = require("mongoose");

const UserSchema = mongoose.Schema(
  {
    name: {
      type: String,
    },
    score: {
      type: Number,
    },
  },
  {
    timestamps: true, // Bật timestamps
  }
);

module.exports = mongoose.model("User", UserSchema);
