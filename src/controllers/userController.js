const User = require("../models/User");

const saveScore = async (req, res) => {
  const { name, score } = req.body;
  const user = await User.create({ name, score });
  res.status(200).json({ message: "success" });
};

const getScore = async (req, res) => {
  const users = await User.find();
  res.status(200).json({ users });
};

module.exports = { saveScore, getScore };
