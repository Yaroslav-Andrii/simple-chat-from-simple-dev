import mongoose from 'mongoose';
import UserModel from '../models/user.model';
import User from '../interfaces/user.interface';

export function getUserByEmail(email: string) {
	return UserModel.findOne({ email });
}

export function createUser(newUser: User) {
	return UserModel.create(newUser);
}