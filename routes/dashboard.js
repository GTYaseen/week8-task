const express = require("express");
const { AdminRegister, AdminLogin } = require("../models/dashboard/admins");
const { ViewOrders, changeStatus } = require("../models/dashboard/orders-A");
const {
  ViewProducts,
  AddProduct,
  UpdateProduct,
  DeleteProduct,
} = require("../models/dashboard/products-A");
const { AcheckAuth } = require("../middleware");
const router = express.Router();

//admin
router.post("/register", AdminRegister);
router.post("/login", AdminLogin);

//order
router.get("/order/view", AcheckAuth, ViewOrders);
router.put("/order/changeStatus/:id", AcheckAuth, changeStatus);

//product
router.get("/product/view", AcheckAuth, ViewProducts);
router.post("/product/add", AcheckAuth, AddProduct);
router.put("/product/update/:id", AcheckAuth, UpdateProduct);
router.delete("/delete/:id", AcheckAuth, DeleteProduct);

module.exports = router;
