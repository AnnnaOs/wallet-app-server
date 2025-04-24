import { model, Schema } from 'mongoose';

const transactionsSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'users',
      required: true,
    },
    date: {
      type: Date,
      required: true,
      default: Date.now,
    },
    type: {
      type: String,
      required: true,
      enum: ['Income', 'Expense'],
      default: 'Income',
    },
    category: {
      type: String,
      required: true,
      enum: [
        'Income',
        'Main expenses',
        'Products',
        'Car',
        'Self care',
        'Child care',
        'Household products',
        'Education',
        'Leisure',
        'Other expenses',
        'Entertainment',
      ],
    },
    comment: {
      type: String,
      default: '',
    },
    sum: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const TransactionsCollection = model('Transactions', transactionsSchema);
