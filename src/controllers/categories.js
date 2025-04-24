import { TransactionsCollection } from '../db/models/transaction.js';

export const getCategoriesController = async (req, res) => {
  const categories = TransactionsCollection.schema.path('category').enumValues;

  const income = categories.filter((c) => c === 'Income');
  const expenses = categories.filter((c) => c !== 'Income');

  res.json({ income, expenses });
};
