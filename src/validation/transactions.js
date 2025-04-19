import Joi from 'joi';

export const addTransactionsSchema = Joi.object({
  date: Joi.date().required(),
  type: Joi.string().valid('income', 'expense').required(),
  category: Joi.string().required(),
  comment: Joi.string(),
  sum: Joi.number().min(0).required(),
});

export const editTransactionsSchema = Joi.object({
  date: Joi.date(),
  type: Joi.string().valid('income', 'expense'),
  category: Joi.string(),
  comment: Joi.string(),
  sum: Joi.number().min(0),
});
