import mongoose from 'mongoose';
import UserModel from '../models/user.model';
import IUser from '../interfaces/user.interface';
import ISafeUser from '../interfaces/safe-user.interface';

export function getUserByEmail(email: string) {
	return UserModel.findOne({ email });
}

export async function getUserById(id: string): Promise<ISafeUser> {
	
	const result: any = await UserModel.findById(id);

	if (!result) {
		throw new Error(`User with id ${id} not found`);
	}

	return {
		id: result._id,
		name: result.name,
		avatar: result.avatar,
		friends: result.friends,
		chats: result.chats,
	}
}

export async function createUser(newUser: IUser): Promise<IUser> {
	const result: any = await UserModel.create(<IUser>newUser);
	return result;
}

export function clear() {
	return UserModel.remove({});
}

export function getAll() {
	return UserModel.find({});
}