import { createSessionForUser } from './auth.js';

export const autoLoginUser = async (user) => {
  const { accessToken, refreshToken, sessionId } = await createSessionForUser(
    user,
  );

  return {
    user: {
      email: user.email,
      name: user.name,
      balance: user.balance,
    },
    accessToken,
    refreshToken,
    sessionId,
  };
};
