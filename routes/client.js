const express = require("express");
const { AddOrder } = require("../models/client/orders-U");
const { ViewProducts} = require("../models/client/products-U");
const { UserRegister, UserLogin } = require("../models/client/users");
const { UcheckAuth } = require("../middleware");
const router = express.Router();

//users
router.post("/register", UserRegister);
router.post("/login", UserLogin);

//order
router.post("/add",UcheckAuth, AddOrder);

//product
router.get("/view",UcheckAuth,  ViewProducts);

module.exports = router;
