import mongoose from 'mongoose';

const chatSchema = new mongoose.Schema({
	id: String,
	name: String,
	users: Array,
})

const Chat = mongoose.model("Chat", chatSchema);