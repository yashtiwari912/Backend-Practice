import express from "express";
import dotenv from "dotenv";
import connectDb from "./config/mongodb.js";
import connectCloudinary from "./config/cloudinary.js";
import userRouter from "./routes/userRoute.js";

const app = express();
const PORT = 3000;

app.use(express.json());
dotenv.config();
connectDb();
connectCloudinary();
app.use("/user", userRouter);

app.get("/", (req, res) => {
    res.send("API Working")
})

app.listen(PORT, () => {
    console.log(`Server Listening at port : ${PORT}`);
})