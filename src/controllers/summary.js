import { TransactionsCollection } from '../db/models/transaction.js';
import { getSummaryService } from '../services/summary.js';

export const getSummary = async (req, res) => {
  try {
    const { period, year, month } = req.query;
    const userId = req.user._id;

    let formattedPeriod;

    if (period) {
      formattedPeriod = period;
    } else if (year) {
      const monthValue = month ? parseInt(month, 10) : 1;
      formattedPeriod = `${year}-${
        monthValue < 10 ? '0' + monthValue : monthValue
      }`;
    } else {
      const now = new Date();
      formattedPeriod = `${now.getFullYear()}-${(now.getMonth() + 1)
        .toString()
        .padStart(2, '0')}`;
    }

    const summary = await getSummaryService(userId, formattedPeriod);

    res.status(200).json({
      status: 200,
      data: summary,
    });
  } catch (error) {
    console.error("Can't get summary:", error.message);
    res.status(error.status || 500).json({
      message: error.message || 'Server error',
    });
  }
};

export const getExpenseSummaryByCategories = async (req, res) => {
  try {
    const { year, month } = req.query;
    const userId = req.user._id;

    const monthValue = month ? parseInt(month, 10) : 1;
    const formattedPeriod = `${year}-${
      monthValue < 10 ? '0' + monthValue : monthValue
    }`;

    const summary = await getSummaryService(userId, formattedPeriod);

    res.status(200).json({
      status: 200,
      data: summary.expenses,
    });
  } catch (error) {
    console.error("Can't get expense summary:", error.message);
    res.status(error.status || 500).json({
      message: error.message || 'Server error',
    });
  }
};

export const getIncomeAndExpenseSummaryByPeriod = async (req, res) => {
  try {
    const { year, month } = req.query;
    const userId = req.user._id;

    const monthValue = month ? parseInt(month, 10) : 1;
    const formattedPeriod = `${year}-${
      monthValue < 10 ? '0' + monthValue : monthValue
    }`;

    const summary = await getSummaryService(userId, formattedPeriod);

    res.status(200).json({
      status: 200,
      data: {
        incomeSummaryByPeriod: summary.totalIncome,
        expenseSummaryByPeriod: summary.totalExpense,
      },
    });
  } catch (error) {
    console.error("Can't get income and expense summary:", error.message);
    res.status(error.status || 500).json({
      message: error.message || 'Server error',
    });
  }
};

export const getSummaryCategories = async (req, res) => {
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
