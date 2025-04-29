import { TransactionsCollection } from "../db/models/transaction.js";


export const getSummaryService = async (userId, period) => {
  if (!period || !/^\d{4}-(0[1-9]|1[0-2])$/.test(period)) {
    const error = new Error('Invalid period format');
    error.status = 400;
    throw error;
  }

  const [year, month] = period.split('-').map(Number);
  const startDate = new Date(Date.UTC(year, month - 1, 1));
  const endDate = new Date(Date.UTC(year, month, 1));

  const transactions = await TransactionsCollection.find({
    userId,
    date: { $gte: startDate, $lt: endDate },
  });

  const summary = {
    incomes: [],
    expenses: [],
    totalIncome: 0,
    totalExpense: 0,
  };

  transactions.forEach((tx) => {
    if (tx.type === 'Income') {
      summary.totalIncome += tx.sum;
      const existing = summary.incomes.find((c) => c.category === tx.category);
      if (existing) {
        existing.total += tx.sum;
      } else {
        summary.incomes.push({ category: tx.category, total: tx.sum });
      }
    } else if (tx.type === 'Expense') {
      summary.totalExpense += tx.sum;
      const existing = summary.expenses.find((c) => c.category === tx.category);
      if (existing) {
        existing.total += tx.sum;
      } else {
        summary.expenses.push({ category: tx.category, total: tx.sum });
      }
    }
  });

  return summary;
};
