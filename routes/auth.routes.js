const express = require("express");
const router = express.Router();
const auth = require("../controllers/auth.controller");

// register in routes
router.post("/register", auth.register);

// register in login

router.post("/login", auth.login);

module.exports = router;
