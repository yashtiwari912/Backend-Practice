import express from 'express';
import authUser from '../middleware/authUser.js';
import { getUserProfile, loginUser, registerUser } from '../controllers/userController.js';

const userRouter = express.Router();

userRouter.get("/", (req, res) => {
    res.send("User Route is working");
})
userRouter.post("/login", loginUser);
userRouter.post("/register", registerUser);
userRouter.get("/profile", authUser, getUserProfile);
export default userRouter;
