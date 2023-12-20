const express = require("express");
const { AdminRegister, AdminLogin } = require("../models/admins");
const router = express.Router();

router.post("/register", AdminRegister);
router.post("/login", AdminLogin);

module.exports = router;