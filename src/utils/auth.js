import jwt from 'jsonwebtoken';
import { getEnvVar } from './getEnvVar.js';
import { SessionsCollection } from '../db/models/session.js';

const JWT_SECRET = getEnvVar('JWT_SECRET');
const JWT_REFRESH_SECRET = getEnvVar('JWT_REFRESH_SECRET');
const ACCESS_TOKEN_EXPIRES = '24h';
const REFRESH_TOKEN_EXPIRES = '7d';

export const createSessionForUser = async (user) => {
  const accessToken = jwt.sign({ userId: user._id }, JWT_SECRET, {
    expiresIn: ACCESS_TOKEN_EXPIRES,
  });

  const refreshToken = jwt.sign({ userId: user._id }, JWT_REFRESH_SECRET, {
    expiresIn: REFRESH_TOKEN_EXPIRES,
  });

  await SessionsCollection.deleteOne({ userId: user._id });

  const session = await SessionsCollection.create({
    userId: user._id,
    accessToken,
    accessTokenValidUntil: new Date(Date.now() + 3600000),
    refreshToken,
  });

  return { accessToken, refreshToken, sessionId: session._id };
};
