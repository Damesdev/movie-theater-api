const express = require("express");
const {check, validationResult} = require("express-validator");
const { showRouter } = require("./routers/showRouter");
const userRoute = require("./routers/userRouter")

const app = express();
const PORT = 3000;

app.use(express.urlencoded());
app.use(express.json());
app.use("/users", userRoute)
app.use("/shows", showRouter)


app.listen(PORT, () => {
    console.log("Server is Successfully Running, and App is listening on port "+ PORT)
})