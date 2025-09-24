import User from '../models/user.js';

export const protect= async (req, res, next) => {
    const {UserId} = req.auth;
    if (!UserId) {
        return res.status(401).json({ success: false, message: "Unauthorized" });
    }else{
        const user = await User.findById(UserId).select('-__v -createdAt -updatedAt');
        req.user = user;
        next();
    }
};

