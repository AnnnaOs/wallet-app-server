import { TransactionsCollection } from '../db/models/transaction.js';

export const getTransactionCategories = async (req, res) => {
  try {
    const userId = req.user._id;

    const incomeCategories = await TransactionsCollection.distinct('category', {
      userId,
      type: 'Income',
    });

    const expenseCategories = await TransactionsCollection.distinct(
      'category',
      {
        userId,
        type: 'Expense',
      },
    );

    const categories = {
      income: incomeCategories,
      expense: expenseCategories,
    };

    res.status(200).json({
      status: 200,
      data: categories,
    });
  } catch (error) {
    console.error("Can't get transaction categories:", error.message);
    res.status(500).json({
      message: error.message || 'Server error',
    });
  }
};
