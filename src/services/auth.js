// import bcrypt from 'bcrypt';
import createHttpError from 'http-errors';
import { UsersCollection } from '../db/models/user.js';
import { SessionsCollection } from '../db/models/session.js';
import { autoLoginUser } from '../utils/autoLoginUser.js';

export const registerUser = async (payload) => {
  const { email } = payload;

  const userExists = await UsersCollection.findOne({ email });
  if (userExists) {
    throw createHttpError(409, 'Email already in use');
  }

  const user = await UsersCollection.create(payload);
  return await autoLoginUser(user);
};

export const loginUser = async ({ email, password }) => {
  const user = await UsersCollection.findOne({ email });

  if (!user) {
    throw createHttpError(401, 'Invalid credentials');
  }

  const isPasswordValid = await user.checkPassword(password);
  if (!isPasswordValid) {
    throw createHttpError(401, 'Invalid password');
  }

  return await autoLoginUser(user);
};

export const logoutUser = async (sessionId) => {
  return await SessionsCollection.deleteOne({ _id: sessionId });
};
