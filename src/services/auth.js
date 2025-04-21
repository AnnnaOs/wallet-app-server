import bcrypt from 'bcrypt';
import createHttpError from 'http-errors';
import { randomBytes } from 'crypto';
import { UsersCollection } from '../db/models/user.js';
import { SessionsCollection } from '../db/models/session.js';
import jwt from 'jsonwebtoken';
import { getEnvVar } from '../utils/getEnvVar.js';

const JWT_SECRET = getEnvVar('JWT_SECRET');
const ACCESS_TOKEN_EXPIRES = '24h';

export const registerUser = async (payload) => {};

export const loginUser = async ({ email, password }) => {
  const user = await UsersCollection.findOne({ email });
  if (!user) throw createHttpError(401, 'Invalid credentials');

  const isPasswordValid = await user.checkPassword(password);
  if (!isPasswordValid) throw createHttpError(401, 'Invalid credentials');

  const accessToken = jwt.sign({ userId: user._id }, JWT_SECRET, {
    expiresIn: ACCESS_TOKEN_EXPIRES
  });

  const session = await SessionsCollection.create({
    userId: user._id,
    accessToken,
    accessTokenValidUntil: new Date(Date.now() + 3600000)
  });

  return { user, accessToken, sessionId: session._id };
};

export const logoutUser = async (sessionId) => {
  return await SessionsCollection.deleteOne({ _id: sessionId });
};
