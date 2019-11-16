import Friend from './friend.interface';
import Chat from './chat.interface';

export interface ISafeUser {
	id: string;
	name: string;
	avatar: string;
	friends: Friend[];
	chats: Chat[];
}
