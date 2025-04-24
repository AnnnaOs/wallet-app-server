import * as service from '../services/transactions.js';

export const createTransactionController = async (req, res) => {
  const userId = req.user._id;
  const result = await service.createTransaction({ ...req.body, userId });
  res.status(201).json(result);
};

export const getAllTransactionsController = async (req, res) => {
  const userId = req.user?._id;
  const result = await service.getAllTransactions(userId);
  res.status(200).json(result);
};

export const updateTransactionController = async (req, res) => {
  const { id } = req.params;
  const result = await service.updateTransaction(id, req.body);
  res.status(200).json(result);
};

export const deleteTransactionController = async (req, res) => {
  const { id } = req.params;
  await service.deleteTransaction(id);
  res.status(204).send();
};
