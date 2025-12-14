import jwt from "jsonwebtoken";
import validator from "validator";
import bcrypt from "bcrypt";
import userModel from "../model/userModel.js";
import { v2 as cloudinary } from "cloudinary";
export const registerUser = async (req, res) => {

    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            res.json({ success: false, message: "Incomplete Information" });
        }
        if (!validator.isEmail(email)) {
            res.json({ success: false, message: "Invalid Email address" });
        }
        if (password.length < 8) {
            res.json({ success: false, message: "Password<8" });
        }
        const genSalt = bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, genSalt);

        const userData = {
            name,
            email,
            password: hashedPassword
        };
        const newUser = new userModel(userData);
        const user = await newUser.save();

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });
        res.json({ success: true, token: token });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}
export const loginUser = async (req, res) => {
    try {

        const { email, password } = req.body;

        const user = await userModel.findOne({ email });
        if (!user) {
            res.json({ success: false, message: "user does not exists" });
        }
        const isMatch = bcrypt.compare(password, user.password);
        if (isMatch) {
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });
            res.json({ success: true, token: token });
        } else {
            res.json({ success: false, message: "Incorrect password" });
        }

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }

}
export const getUserProfile = async (req, res) => {
    try {
        const id = req.user.id;
        const userData = await userModel.findById(id).select('-password');
        res.json({ success: true, userData: userData });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}
export const uploadUserImage = async (req, res) => {
    try {
        const id = req.user.id;
        const imageFile = req.file;

        if (imageFile) {
            const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: "auto" });
            const imageURL = imageUpload.secure_urll
            await userModel.findByIdAndUpadate(id, { image: imageURL });
        }

        res.json({ success: true, message: "Profile Updated" });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}