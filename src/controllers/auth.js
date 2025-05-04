import createHttpError from 'http-errors';
import jwt from 'jsonwebtoken';
import { ONE_DAY } from '../constants/index.js';
import { registerUser, loginUser, logoutUser } from '../services/auth.js';
import { SessionsCollection } from '../db/models/session.js';
import { getEnvVar } from '../utils/getEnvVar.js';

const JWT_REFRESH_SECRET = getEnvVar('JWT_REFRESH_SECRET');

export const registerUserController = async (req, res) => {
  const { user, accessToken, refreshToken, sessionId } = await registerUser(
    req.body,
  );

  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    maxAge: ONE_DAY * 7,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'Strict',
  });

  res.cookie('sessionId', sessionId, {
    httpOnly: true,
    maxAge: ONE_DAY,
    secure: process.env.NODE_ENV === 'production',
  });

  res.status(201).json({
    status: 201,
    message: 'Successfully registered and logged in!',
    user,
    accessToken,
  });
};

export const loginUserController = async (req, res) => {
  const { email, password } = req.body;
  const { user, accessToken, refreshToken, sessionId } = await loginUser({
    email,
    password,
  });

  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    maxAge: ONE_DAY * 7,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'Strict',
  });

  res.cookie('sessionId', sessionId, {
    httpOnly: true,
    maxAge: ONE_DAY,
    secure: process.env.NODE_ENV === 'production',
  });

  res.status(200).json({
    status: 200,
    message: 'Successfully logged in!',
    user,
    accessToken,
  });
};

export const logoutUserController = async (req, res) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: 'No authorization header' });
  }

  const token = authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'No token found' });
  }

  await logoutUser(token);

  res.clearCookie('sessionId');
  res.clearCookie('refreshToken');

  res.status(204).send();
};

export const refreshTokenController = async (req, res) => {
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) {
    throw createHttpError(400, 'Refresh token is required');
  }

  try {
    const decoded = jwt.verify(refreshToken, JWT_REFRESH_SECRET);
    const session = await SessionsCollection.findOne({ refreshToken });

    if (!session) {
      throw createHttpError(404, 'Session not found');
    }

    if (decoded.userId.toString() !== session.userId.toString()) {
      throw createHttpError(401, 'Invalid refresh token');
    }

    const newAccessToken = jwt.sign(
      { userId: session.userId },
      getEnvVar('JWT_SECRET'),
      { expiresIn: '24h' },
    );

    res.status(200).json({ accessToken: newAccessToken });
  } catch (error) {
    console.error(error);
    throw createHttpError(401, 'Invalid or expired refresh token');
  }
};
