import express from "express"
import userAuth from "../middleware/userAuth.js";
import { getUserProfile, loginUser, registerUser } from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.get("/test", (req, res) => {
    res.send("user Router working");
})
userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.get("/profile", userAuth, getUserProfile);

export default userRouter;