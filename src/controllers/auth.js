import { ONE_DAY } from '../constants/index.js';
import { registerUser, loginUser, logoutUser } from '../services/auth.js';

export const registerUserController = async (req, res) => {
  const { user, accessToken, sessionId } = await registerUser(req.body);

  res.cookie('sessionId', sessionId, {
    httpOnly: true,
    maxAge: ONE_DAY,
    secure: process.env.NODE_ENV === 'production',
  });

  res.status(201).json({
    status: 201,
    message: 'User successfully registered and logged in',
    user,
    accessToken,
  });

  res.status(201).json({
    status: 201,
    message: 'Successfully registered and logged in!',
    user: {
      email: user.email,
      name: user.name,
      balance: user.balance,
    },
    accessToken,
  });
};

export const loginUserController = async (req, res) => {
  const { email, password } = req.body;
  const { user, accessToken, sessionId } = await loginUser({ email, password });

  res.cookie('sessionId', sessionId, {
    httpOnly: true,
    maxAge: ONE_DAY,
    secure: process.env.NODE_ENV === 'production',
  });

  res.status(200).json({
    status: 200,
    message: 'Successfully logged in an user!',
    user: {
      email: user.email,
      name: user.name,
      balance: user.balance,
    },
    accessToken,
  });
};

export const logoutUserController = async (req, res) => {
  if (req.cookies.sessionId) {
    await logoutUser(req.cookies.sessionId);
  }

  res.clearCookie('sessionId');

  res.status(204).send();
};
