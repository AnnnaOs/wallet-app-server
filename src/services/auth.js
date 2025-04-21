import { SessionsCollection } from '../db/models/session.js';

export const logoutUser = async (sessionId) => {
  return await SessionsCollection.deleteOne({ _id: sessionId });
};
