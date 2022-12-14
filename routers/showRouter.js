// import modules express, express-validator, show db
const express = require("express");
const {check, validationResult} = require("express-validator");
const {Show,User} = require(".././models/index");

// creating router that has merges with parent router(userRouter)
const showRouter = express.Router({mergeParams:true});


// GET all shows
showRouter.get("/", async (req,res) =>{
    let id = req.params.userId;
    res.json(await User.findByPk(id, {include: Show}));
})

// GET one show


// GET shows of genre


// PUT update rating of show that has been watched


// PUT update the status of a show


// DELETE a show


// export module
module.exports = {showRouter}