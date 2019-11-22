import mongoose from 'mongoose';

const chatSchema = new mongoose.Schema({
	name: String,
	users: Array,
	messages: Array,
	type: String,
});

const ChatModel = mongoose.model("Chat", chatSchema);

export default ChatModel;