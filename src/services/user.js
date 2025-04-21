import { UsersCollection } from '../db/models/user.js';

export const getCurrentUser = async (userId) => {
  const currentUser = await UsersCollection.findOne({ _id: userId });
  return currentUser;
};

export const updateUser = async (userId, payload, options = {}) => {
  const updateUser = await UsersCollection.findByIdAndUpdate(userId, payload, {
    new: true,
    ...options,
  });

  if (!updateUser) return null;

  return {
    user: updateUser,
  };
};
