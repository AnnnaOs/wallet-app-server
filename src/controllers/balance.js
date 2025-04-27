import { findBalanceByUserId } from '../services/balanceService.js';

export const getBalance = async (req, res) => {
  const { _id: userId } = req.user;
  const balance = await findBalanceByUserId(userId);

  if (!balance) {
    return res.status(404).json({ message: 'Balance not found' });
  }

  res.status(200).json(balance);
};
