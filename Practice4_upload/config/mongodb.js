import mongoose from "mongoose";

const connectDb = async () => {
    mongoose.connection.on("Connection", () => {
        console.log("Database Connected");
    })
    mongoose.connect(`${process.env.MONGODB_URI}/practice`);
}
export default connectDb;