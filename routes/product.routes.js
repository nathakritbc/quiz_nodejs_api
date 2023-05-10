const express = require("express");
const router = express.Router();

const controller = require("../controllers/product.controller");

router.post("/", controller.create);

router.get("/findAllFormatCustoms", controller.findAllFormatCustom);

router.get(
  "/findByAttributesAndSubQueries",
  controller.findByAttributesAndSubQuery
);

router.get("/", controller.findAll);

router.get("/:id", controller.findOne);

router.get("/findByShopName/:shop_name", controller.findByShopName);

router.put(
  "/updateProductByShopNameAndStatus/:shop_name",
  controller.updateProductByShopNameAndStatus
);

router.put("/:id", controller.update);

router.delete("/:id", controller.delete);

module.exports = router;
