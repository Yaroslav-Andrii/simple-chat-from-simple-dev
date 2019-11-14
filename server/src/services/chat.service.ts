import mongoose from 'mongoose';
import ChatModel from '../models/chat.model';

export function getAllChats() {
	return ChatModel.find();
}