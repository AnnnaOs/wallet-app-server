import { TransactionsCollection } from '../db/models/transaction.js';

export const createTransaction = async (data) => {
  return await TransactionsCollection.create(data);
};

export const getAllTransactions = async (userId) => {
  return await TransactionsCollection.find({ userId });
};

export const updateTransaction = async (id, data) => {
  return await TransactionsCollection.findByIdAndUpdate(id, data, {
    new: true,
  });
};

export const deleteTransaction = async (id) => {
  return await TransactionsCollection.findByIdAndDelete(id);
};
