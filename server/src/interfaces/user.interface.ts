import Friend from './friend.interface';
import Chat from './chat.interface';

export default interface User {
	id?: string;
	name?: string;
	password: string;
	email: string;
	avatar?: string;
	friends?: Friend[];
	chats?: Chat[];
}