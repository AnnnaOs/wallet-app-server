export const logoutUser = async (sessionId) => {
  return await SessionsCollection.deleteOne({ _id: sessionId });
};
