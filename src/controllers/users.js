import createHttpError from 'http-errors';
import { getCurrentUser } from '../services/users.js';
// import path from 'path';
// import fs from 'fs/promises';

export const getCurrentUserController = async (req, res) => {
  const userId = req.user._id;
  const currentUser = await getCurrentUser(userId);

  if (!currentUser) {
    throw createHttpError(404, 'User not found');
  }

  res.status(200).json({
    status: 200,
    message: `User found`,
    data: currentUser,
  });
};

// export const updateAvatarController = async (req, res) => {
//   const userId = req.user._id;
//   if (!req.file) {
//     throw createHttpError(400, 'No file uploaded');
//   }

//   const { path: tempPath, originalname } = req.file;
//   const filename = `${userId}_${originalname}`;
//   const avatarsDir = path.resolve('public', 'avatars');
//   const finalPath = path.join(avatarsDir, filename);

//   await fs.rename(tempPath, finalPath);

//   const avatarUrl = `/avatars/${filename}`;
//   const updatedUser = await updateUserAvatar(userId, avatarUrl);

//   res.json({
//     status: 200,
//     message: 'Avatar updated',
//     data: updatedUser,
//   });
// };

// export const updateUserController = async (req, res) => {
//   const userId = req.user._id;

//   const allowedFields = ['name', 'email', 'balance', 'avatarUrl'];
//   const updateData = {};

//   for (const field of allowedFields) {
//     if (req.body[field] !== undefined) {
//       updateData[field] = req.body[field];
//     }
//   }

//   if (Object.keys(updateData).length === 0) {
//     throw createHttpError(400, 'No valid fields provided for update');
//   }

//   const updatedUser = await updateUser(userId, updateData);

//   if (!updatedUser) {
//     throw createHttpError(404, 'User not found');
//   }

//   res.status(200).json({
//     status: 200,
//     message: 'User updated successfully',
//     data: updatedUser,
//   });
// };
