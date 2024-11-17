const express = require("express");
const router = express.Router();

const { saveScore, getScore } = require("../controllers/userController");
router.post("/", saveScore);
router.get("/", getScore);

module.exports = router;
