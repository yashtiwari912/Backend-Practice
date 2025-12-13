import express from 'express';
import dotenv from "dotenv"
import userRouter from './routes/userRoute.js';

const app = express();
const PORT = 3000;

app.use(express.json());
dotenv.config();
app.use("/user", userRouter);

app.get('/', (req, res) => {
    res.send('Hello, World!');
});


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
})