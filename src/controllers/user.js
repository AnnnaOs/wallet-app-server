import createHttpError from 'http-errors';
import { getCurrentUser, updateUser } from '../services/user.js';

export const getCurrentUserController = async (req, res, next) => {
  const userId = req.user._id;
  const currentUser = await getCurrentUser(userId);
  if (!currentUser) {
    throw createHttpError(404, 'User not found');
  }
  res.status(200).json({
    status: 200,
    message: `Successfully found user with id: ${userId}!`,
    data: currentUser,
  });
};

export const patchUserController = async (req, res) => {
  const userId = req.user._id;
  const result = await updateUser(userId, req.body);
  if (!result) {
    throw createHttpError(404, 'User not found');
  }

  res.json({
    status: 200,
    message: `Successfully patched a user!`,
    data: result.user,
  });
};
