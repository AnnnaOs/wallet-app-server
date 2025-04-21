import { registerUser, loginUser, logoutUser } from '../services/auth.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';

export const registerUserController = async (req, res) => {
    const user = await registerUser(req.body);

    res.status(201).json({
        status: 201,
        message: 'Successfully registered a user!',
        data: user,
    });
};

export const loginUserController = async (req, res) => {
  const { email, password } = req.body;
  const { user, accessToken, sessionId } = await loginUser({ email, password });

  res.cookie('sessionId', sessionId, {
    httpOnly: true,
    maxAge: 3600000,
    secure: process.env.NODE_ENV === 'production'
  });

  res.json({
    user: {
      email: user.email,
      name: user.name,
      balance: user.balance
    },
    accessToken
  });
};

export const logoutUserController = async (req, res) => {
  if (req.cookies.sessionId) {
    await logoutUser(req.cookies.sessionId);
  }

  res.clearCookie('sessionId');

  res.status(204).send();
};
