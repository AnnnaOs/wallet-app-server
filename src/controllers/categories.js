import { TransactionsCollection } from '../db/models/transaction.js';

export const getTransactionCategories = async (req, res, next) => {
  try {
    // Логируем путь к категории
    const categoryPath = TransactionsCollection.schema.path('category');
    if (!categoryPath) {
      console.error('categoryPath is undefined');
      throw new Error('categoryPath is undefined');
    }

    const categories = categoryPath.enumValues;
    console.log('All categories:', categories);

    // Фильтруем категории по типу
    const income = categories.filter((c) => c === 'Income');
    const expenses = categories.filter((c) => c !== 'Income');

    console.log('Income categories:', income);
    console.log('Expense categories:', expenses);

    // Получаем тип из query параметра
    const { type } = req.query;

    // Проверяем на тип в запросе
    if (type === 'Income') {
      console.log('Returning income categories');
      return res.status(200).json({ income });
    } else if (type === 'Expense') {
      console.log('Returning expense categories');
      return res.status(200).json({ expenses });
    }

    // Если тип не передан, возвращаем все категории
    console.log('Returning all categories');
    res.status(200).json({ income, expenses });
  } catch (error) {
    console.error('Error in getCategoriesController:', error.message);
    next(error); // передаем ошибку дальше, чтобы сервер не упал
  }
};
