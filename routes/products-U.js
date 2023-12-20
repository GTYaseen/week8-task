const express = require("express");
const { ViewProducts} = require("../models/products-U");
const router = express.Router();

router.get("/view", ViewProducts);

module.exports = router;