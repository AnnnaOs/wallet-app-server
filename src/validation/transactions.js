import Joi from 'joi';

export const addTransactionsSchema = Joi.object({
  date: Joi.date(),
  type: Joi.string().valid('Income', 'Expense').required(),
  category: Joi.string().required(),
  comment: Joi.string(),
  sum: Joi.number().min(0).required(),
});

export const editTransactionsSchema = Joi.object({
  date: Joi.date(),
  type: Joi.string().valid('Income', 'Expense'),
  category: Joi.string(),
  comment: Joi.string(),
  sum: Joi.number().min(0),
});
