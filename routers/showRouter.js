// import modules express, express-validator, show db
const express = require("express");
const {check, validationResult} = require("express-validator");
const {Show,User} = require(".././models/index");

// creating router that has merges with parent router(userRouter)
const showRouter = express.Router();


// GET all shows
showRouter.get("/", async (req,res) =>{
    res.json(await Show.findAll());
})

// GET one show
showRouter.get("/:id", async (req,res) => {
    let id = req.params.id
    res.json( await Show.findByPk(id))
})


// GET shows of genre
showRouter.get("/genre/:genre", async (req,res)=> {
    let chosenGenre = req.params.genre
    
    res.json(await Show.findAll({where: {genre: chosenGenre}}))
})


// PUT update rating of show that has been watched
showRouter.put("/:id/rating", check("rating").trim().notEmpty() ,async (req,res) => {
    let errors = validationResult(req)

    if(!errors.isEmpty()){
        res.json({Error: errors.array()})
    } else{
        let chosenShow = req.params.id
        let newRating = req.body

        await Show.update(newRating, {where: {id: chosenShow}})

        res.json(await Show.findByPk(chosenShow))
    }
    
})

// PUT update the status of a show
showRouter.put("/:id/status", check("status").trim().notEmpty().isLength({min:5,max:25}) , async (req,res) => {
    let errors = validationResult(req)

    if(!errors.isEmpty()){
        res.json({Error: errors.array()})
    }else {
        let chosenShow = req.params.id
        let newStatus = req.body

        console.log(req.body)
    
        await Show.update(newStatus, {where: {id: chosenShow}})
    
        res.json(await Show.findByPk(chosenShow))
    }
    
})

// DELETE a show
showRouter.delete("/:id", async (req,res) => {
    let chosenShow = req.params.id

    await Show.destroy({where: {id: chosenShow}})

    res.json(await Show.findAll())
})


// export module
module.exports = {showRouter}