import { UsersCollection } from '../db/models/user.js';

export const getCurrentUser = async (userId) => {
  return await UsersCollection.findById(userId);
};

// export const updateUserAvatar = async (userId, avatarUrl) => {
//   return await UsersCollection.findByIdAndUpdate(
//     userId,
//     { avatarUrl },
//     { new: true },
//   ).select('-password');
// };
