const express = require("express");
const router = express.Router();

const products = require("../controllers/product.controller");

router.post("/", products.create);

router.get("/", products.findAll);

router.get("/:id", products.findOne);

router.get("/findByShopName/:shop_name", products.findByShopName);

router.put(
  "/updateProductByShopNameAndStatus/:shop_name",
  products.updateProductByShopNameAndStatus
);

router.put("/:id", products.update);

router.delete("/:id", products.delete);

module.exports = router;
