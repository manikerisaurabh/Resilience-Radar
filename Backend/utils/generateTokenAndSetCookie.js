import jwt from 'jsonwebtoken';

const generateTokenAndSetCookie = (userId, res) => {
    const payload = { userId };
    const privateKey = process.env.JWT_SECRET || "uylHsXKaNUDPTybBVwC9/jqo4+QX8W+7JW+b1eMlrdk=";
    const token = jwt.sign(payload, privateKey, {
        expiresIn: '15d'
    });

    res.cookie("jwt", token, {
        maxAge: 15 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: "strict"
    });
};

export default generateTokenAndSetCookie;