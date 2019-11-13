import mongoose from 'mongoose';

const Chat = mongoose.model('Chat');

export function getAllChats() {
	return Chat.find();
}