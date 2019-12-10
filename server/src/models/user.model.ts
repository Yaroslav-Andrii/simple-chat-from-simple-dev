import mongoose from 'mongoose';
import url from 'url';

const userSchema = new mongoose.Schema({
	id: String,
	name: String,
	password: String,
	email: String,
	avatar: { type: String, default: url.resolve(__dirname, process.env.PUBLIC_ROUTE + 'incognito.png' )},
	friends: Array,
	chats: Array,
});

const UserModel = mongoose.model("User", userSchema);

export default UserModel;