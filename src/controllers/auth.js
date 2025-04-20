import bcrypt from 'bcrypt';
import { UsersCollection } from '../db/models/user.js';

const register = async (req, res, next) => {
  try {
    const { email, password, name } = req.body;


    const userExists = await UsersCollection.findOne({ email });
    if (userExists) {
      return res.status(409).json({ message: 'Email already in use' });
    }


    const hashedPassword = await bcrypt.hash(password, 10);


    const newUser = await UsersCollection.create({
      email,
      password: hashedPassword,
      name,
    });


    res.status(201).json({
      user: {
        name: newUser.name,
        email: newUser.email,
      },
    });
  } catch (err) {
    next(err);
  }
};

export { register };
