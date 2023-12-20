const express = require("express");
const { UserRegister, UserLogin } = require("../models/users");
const router = express.Router();

router.post("/register", UserRegister);
router.post("/login", UserLogin);

module.exports = router;