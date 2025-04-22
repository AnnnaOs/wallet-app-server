import { model, Schema } from 'mongoose';
import bcrypt from 'bcrypt';

const usersSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    balance: { type: Number, default: 0 },
    avatarUrl: { type: String, default: null },
  },
  { timestamps: true, versionKey: false },
);

usersSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

usersSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

usersSchema.methods.checkPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

export const UsersCollection = model('users', usersSchema);
