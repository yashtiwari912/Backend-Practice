import jwt from "jsonwebtoken"

const userAuth = async (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];
    try {
        if (!token) {
            res.json({ success: false, message: 'Not Authorized Login Again' })
        }
        const decode = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decode;
        next();
    } catch (error) {
        if (error.name === "TokenExpiredError") {
            return res.json({ success: false, message: "Token expired. Please login again." });
        }
        console.log(error)
        res.json({ success: false, message: error.message });
    }
}
export default userAuth