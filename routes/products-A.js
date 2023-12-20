const express = require("express");
const { ViewProducts, AddProduct, UpdateProduct, DeleteProduct } = require("../models/products-A");
const router = express.Router();

router.get("/view", ViewProducts);
router.post("/add", AddProduct);
router.put("/update/:id", UpdateProduct);
router.delete("/delete/:id", DeleteProduct);


module.exports = router;