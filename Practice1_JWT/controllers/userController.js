import jwt from 'jsonwebtoken';
import bcrypt from "bcrypt";
import validator from "validator";
const tempUserArr = [];

export const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.json({ success: false, message: " Missing Details " })
        }

        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Please enter a valid email " });
        }

        if (password.length < 8) {
            return res.json({ success: false, message: "Password length should be greater than 8" });
        }

        //hash password 
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const userData = {
            name,
            email,
            password: hashedPassword
        }

        tempUserArr.push(userData);
        const token = jwt.sign({ id: email }, process.env.JWT_SECRET)

        res.json({ success: true, token });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}
export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = tempUserArr.find(u => u.email === email);

        if (!user) {
            return res.json({ success: false, message: "User Not Found" });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            res.json({ success: false, message: "Wrong Password" });
        }
        const token = jwt.sign({ id: email }, process.env.JWT_SECRET);
        return res.json({ success: true, token });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

export const getUserProfile = async (req, res) => {
    try {
        const email = req.user.id;
        const user = tempUserArr.find(u => u.email === email);

        const { password, ...safeUser } = user;
        return res.json({ success: true, user: safeUser });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: error.message });
    }
}