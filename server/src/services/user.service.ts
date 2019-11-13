import mongoose from 'mongoose'

const User = mongoose.model('User');

export function getAllUsers() {
	return User.find();
}