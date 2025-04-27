import { getSummaryService } from '../services/summary.js';

export const getSummary = async (req, res) => {
  try {
    const { period } = req.query;
    const userId = req.user._id;

    const summary = await getSummaryService(userId, period);

    res.status(200).json({
      status: 200,
      data: summary,
    });
  } catch (error) {
    console.error('Ошибка получения сводки:', error.message);
    res.status(error.status || 500).json({
      message: error.message || 'Server error',
    });
  }
};
