const express = require("express");
const { userController } = require("../controllers/users");
const router = express.Router();

/* CREATE USER. */
router.post("/", userController.create);

/* USER LOGIN. */
router.post("/login", userController.login);

module.exports = router;
