import { UsersCollection } from "../db/models/user"


export const getCurrentUser = async (userId) => {
    const currentUser = await UsersCollection.findOne({ _id: userId });
    return currentUser;
}