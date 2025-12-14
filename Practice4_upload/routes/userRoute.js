import express from "express";
import userAuth from "../middleware/userAuth.js";
import { getUserProfile, loginUser, registerUser, uploadUserImage } from "../controllers/userController.js";
import upload from "../middleware/multer.js";

const userRouter = express.Router();

userRouter.post("/login", loginUser);
userRouter.post("/register", registerUser);
userRouter.get("/profile", userAuth, getUserProfile);
userRouter.post("/upload", upload.single('image'), userAuth, uploadUserImage);

export default userRouter;