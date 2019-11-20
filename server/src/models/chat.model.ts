import mongoose from 'mongoose';

const chatSchema = new mongoose.Schema({
	name: String,
	users: Array,
	messages: Array,
});

const ChatModel = mongoose.model("Chat", chatSchema);

export default ChatModel;