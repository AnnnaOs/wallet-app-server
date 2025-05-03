import { TransactionsCollection } from '../db/models/transaction.js';

export const getTransactionCategories = async (req, res, next) => {
  try {
    const categoryPath = TransactionsCollection.schema.path('category');

    if (!categoryPath) {
      console.error('categoryPath is undefined');
      throw new Error('categoryPath is undefined');
    }

    const categories = categoryPath.enumValues;

    // Фільтрація по типу категорії
    const income = categories.filter((c) => c === 'Income');
    const expenses = categories.filter((c) => c !== 'Income');

    // Отримання типу з query параметра
    const { type } = req.query;

    // Перевірка на тип в запиті
    if (type === 'Income') {
      return res.status(200).json({ income });
    } else if (type === 'Expense') {
      return res.status(200).json({ expenses });
    }

    // Якщо тип не передано, повертаємо всі категорії
    res.status(200).json({ income, expenses });
  } catch (error) {
    console.error('Error in getCategoriesController:', error.message);
    next(error);
  }
};
