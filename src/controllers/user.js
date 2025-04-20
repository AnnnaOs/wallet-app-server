import createHttpError from "http-errors";
import { getCurrentUser } from "../services/user.js"


export const getCurrentUserController = async (req, res, next) => {
    const userId = req.user._id;
    const currentUser = await getCurrentUser(userId);
    if(!currentUser) {
        throw createHttpError(404, 'User not found');
    }
    res.status(200).json({
        status: 200,
        message: `Successfully found user with id: ${userId}!`,
        data: currentUser,
    });

}