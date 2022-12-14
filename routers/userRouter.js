const express = require("express");
const {check, validationResult} = require("express-validator");
const {User, Show} = require(".././models/index")


const userRouter = express.Router();

// nesting showrouter into User Router
// userRouter.use("/:userId/show", showRouter)
userRouter.use(express.json());
userRouter.use(express.urlencoded())

// GET All Users
userRouter.get("/", async (req,res) => {
    res.json(await User.findAll())
})

// GET Users by ID
userRouter.get("/:id", async (req,res) => {
    res.json(await User.findByPk(req.params.id))
})


// GET shows for User
userRouter.get("/:id/shows", async (req,res) => {
    let currentUser = req.params.id; 
    let chosenUser = await User.findByPk(currentUser)
    res.json(await chosenUser.getShows())
})


// PUT update and add show if user has watched (Use validation status not empty and length min 5, max 25)

userRouter.put("/:userId/shows/:showId", async (req,res) => {
    let showId = req.params.showId;
    let userId = req.params.userId;

    // getting show and user
    let chosenUser = await User.findByPk(userId)
    let chosenShow = await Show.findByPk(showId)

    // assigning relationship to User
    await chosenUser.addShow(chosenShow);

    // returning updated chosen User
    let returnUser = await User.findByPk(userId)

    res.json(returnUser);

})


module.exports = userRouter;