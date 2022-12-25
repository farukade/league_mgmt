const express = require("express");
const router = express.Router();

//connect Routes
const indexRouter = require("./index");
const userRouter = require("./user");

// Register routes
router.use("/", indexRouter);
router.use("/users", userRouter);

module.exports = router;
