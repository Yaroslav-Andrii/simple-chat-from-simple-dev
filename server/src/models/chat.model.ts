import mongoose from 'mongoose';

const chatSchema = new mongoose.Schema({
	id: String,
	name: String,
	users: Array,
});

const ChatModel = mongoose.model("Chat", chatSchema);

export default ChatModel;