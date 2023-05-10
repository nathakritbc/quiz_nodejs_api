const express = require("express");
const router = express.Router();

const controller = require("../controllers/calculate.quotation.controller");

router.get("/", controller.calculateQuotation);

module.exports = router;
