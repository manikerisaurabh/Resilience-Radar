import User from "../models/user.js";

export const isValidUser = async (req, res, next) => {
    let { id } = req.params;
    let isValidUser = await User.findById(id);
    if (!isValidUser) {
        return res.status(200).json({ error: "invalid user" });
    }
    if (isValidUser.length == 0) {
        return res.status(200).json({ error: "invalid user" });
    }

    next();
}