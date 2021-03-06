import mongoose from 'mongoose';
import ChatModel from '../models/chat.model';
import UserModel from '../models/user.model';
import ISecureUser from '../interfaces/secure-user.interface';
import IFriend from '../interfaces/friend.interface';
import IChat from '../interfaces/chat.interface';
import IMessage from '../interfaces/message.interface';

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
			_id: user._id,
			name: user.name,
			avatar: user.avatar,
			chatId: user.chatId
		});
	}

	// Return Promise of list with secure users data
	return result;
}

export async function remove(): Promise<IChat[]> {
	const result: any = await ChatModel.remove({});
	return result;
}

export async function pushMessages(buffer: IMessage[], chatId: string): Promise<void> {

	try {
		// Get chat data
		const chat: any = await ChatModel.findById(chatId);

		if (!chat) throw new Error('Chat not found!')

		// Get array of messages
		const chatMeassages: IMessage[] = chat.messages;

		// Add message from buffer to messages array
		let runk = chatMeassages.length;

		for (let message of buffer) {
			message.rank = runk++;
			chatMeassages.push(message);
		}

		// Update chat date
		await ChatModel.findByIdAndUpdate(chatId, {messages: chatMeassages}, err => {
			if (err) throw err;

			console.log(`Chat with id ${chatId} updated`)
		})

	} catch (error) {
		console.log(error.message);
	}
}

export async function getRoomNameById(chatId: string): Promise<string | undefined> {
	try {
		// Get chat data
		const chat: any = await ChatModel.findById(chatId);
		let roomName: string = chat.name;
		
		if (!roomName) throw new Error("Chat not found")

		return roomName;
	} catch (error) {
		console.log(error.message);
	}
}

export async function getUserChats(chatsList: string[]): Promise<IChat[]> {
	const result = [];

	for (let chatId of chatsList) {
		let chat: any = await ChatModel.findById(chatId);

		if (!chat) {
			console.error(`chat with ${chatId} not found`);
			continue;
		}

		result.push(chat as IChat);
	}

	return result;
}

export async function joinUser(userId: string, chatId: string): Promise<void> {
	
	const chat: any = await ChatModel.findById(chatId);
	
	const listOfUsers: string[] = chat.users;
	listOfUsers.push(userId);

	if ( !chat.users.includes((value: string) => value === userId) ) {

		ChatModel.findByIdAndUpdate(chatId, { users: listOfUsers }, err => {
			if (err) {
				console.error(err);
			}
		});
	}
}