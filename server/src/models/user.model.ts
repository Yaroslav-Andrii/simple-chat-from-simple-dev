import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
	id: String,
	name: String,
	password: String,
	email: String,
	avatar: String,
	friends: Array,
	chats: Array,
})

const User = mongoose.model("User", userSchema);