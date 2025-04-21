import bcrypt from 'bcrypt';
import createHttpError from 'http-errors';
import { randomBytes } from 'crypto';
import UsersCollection from '../models/userSchema.js';
import SessionsCollection from '../models/sessionSchema.js';

export const registerUser = async (payload) => {};

export const loginUser = async (payload) => {};

export const logoutUser = async (sessionId) => {};
