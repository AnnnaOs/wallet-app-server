import { TransactionsCollection } from '../db/models/transaction.js';

export const findBalanceByUserId = async (userId) => {
  const transactions = await TransactionsCollection.find({ userId });

  if (!transactions || transactions.length === 0) {
    return 0;
  }

  const balance = transactions.reduce((acc, transaction) => {
    if (transaction.type === 'income') {
      return acc + transaction.amount;
    } else if (transaction.type === 'expense') {
      return acc - transaction.amount;
    } else {
      return acc;
    }
  }, 0);

  return balance;
};
