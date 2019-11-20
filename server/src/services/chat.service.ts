import mongoose from 'mongoose';
import ChatModel from '../models/chat.model';
import UserModel from '../models/user.model';
import ISecureUser from '../interfaces/secure-user.interface';
import IFriend from '../interfaces/friend.interface';
import IChat from '../interfaces/chat.interface';

export async function createChat(data: IChat): Promise<IChat> {
	const result: any = await ChatModel.create(<IChat>data);
	return result;
}

export async function getChatById(id: string): Promise<IChat> {
	const result: any = await ChatModel.findById(id);
	return result;
}

export async function getAllChats(): Promise<IChat[]> {
	const roomsList: any = await ChatModel.find();
	return roomsList;
}

export async function getAllContacts(): Promise<IFriend[]> {
	
	// Get all users from DB
	const users: any = await UserModel.find({});

	// Transform users data to secure user data
	const result: IFriend[] = [];
	
	for (let user of users) {
		result.push({
			id: user._id,
			name: user.name,
			avatar: user.avatar,
		});
	}

	// Return Promise of list with secure users data
	return result;
}

export async function remove(): Promise<IChat[]> {
	const result: any = await ChatModel.remove({});
	return result;
}