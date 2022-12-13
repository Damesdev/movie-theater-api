const express = require("express");
const {check, validationResult} = require("express-validator");
const {User} = require(".././models/User")

const userRouter = express.Router();

userRouter.get("/", async (req,res) => {
    res.json(await User.findAll())
})

module.exports = userRouter;