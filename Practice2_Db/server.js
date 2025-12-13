import express from "express"
import dotenv from "dotenv"
import userRouter from "./routes/userRoute.js";
import connectDb from "./config/mongodb.js";
const app = express();
const PORT = 3000;
dotenv.config();
connectDb();


app.use(express.json());
app.use("/user", userRouter);
app.get("/", (req, res) => {
    res.send("API Working");
})

app.listen(PORT, () => {
    console.log(`Server Listening at ${PORT}`);
})
