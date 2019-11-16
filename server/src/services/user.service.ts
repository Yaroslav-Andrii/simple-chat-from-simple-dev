import mongoose from 'mongoose';
import UserModel from '../models/user.model';
import { IUser } from '../interfaces/user.interface';

export function getUserByEmail(email: string) {
	return UserModel.findOne({ email });
}

export function createUser(newUser: IUser) {
	return UserModel.create(<IUser>newUser);
}

export function clear() {
	return UserModel.remove({});
}

export function getAll() {
	return UserModel.find({});
}