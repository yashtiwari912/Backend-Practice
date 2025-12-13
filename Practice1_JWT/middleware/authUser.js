import jwt from 'jsonwebtoken';

const authUser = (req, res, next) => {

    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
        res.json({ success: false, message: 'Not Authorized Login Again' })
    }
    try {
        const decode = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decode;

        next();
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }

}
export default authUser;