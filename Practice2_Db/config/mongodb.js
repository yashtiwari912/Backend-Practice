import mongoose from "mongoose";

const connectDb = async () => {
    mongoose.connection.on("connection", () => console.log("Database Connected"));
    await mongoose.connect(`${process.env.MONGODB_URI}/practice`)
}
export default connectDb;