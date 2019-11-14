import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
	id: String,
	name: String,
	password: String,
	email: String,
	avatar: {type: String, default: `${__dirname + process.env.PUBLIC_ROUTE}/incognito.png`},
	friends: Array,
	chats: Array,
});

const UserModel = mongoose.model("User", userSchema);

export default UserModel;