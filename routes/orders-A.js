const express = require("express");
const { AddOrder } = require("../models/orders-U");
const router = express.Router();

router.post("/add", AddOrder);

module.exports = router;
