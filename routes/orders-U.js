const express = require("express");
const { ViewOrders, AddOrder, changeStatus } = require("../models/orders-A");
const router = express.Router();

router.get("/view", ViewOrders);
router.post("/add", AddOrder);
router.put("/update/:id", changeStatus);

module.exports = router;
