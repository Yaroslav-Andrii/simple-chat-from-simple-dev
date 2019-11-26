import mongoose from 'mongoose';
import UserModel from '../models/user.model';
import IUser from '../interfaces/user.interface';
import ISecureUser from '../interfaces/secure-user.interface';

export function getUserByEmail(email: string) {
	return UserModel.findOne({ email });
}

export async function getUserById(id: string): Promise<ISecureUser> {
	
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

export async function joinChat(chatId: string, userId: string): Promise<void> {
	
	const user: any = await UserModel.findById(userId);
	user.chats.push(chatId);
	const listOfChats = user.chats;
	
	UserModel.findByIdAndUpdate(userId, { chats: listOfChats }, err => {
		if (err) {
			console.error(err);
		}
	});
}