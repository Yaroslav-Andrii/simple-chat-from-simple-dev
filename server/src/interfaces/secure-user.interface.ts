import IFriend from './friend.interface';
import Chat from './chat.interface';

export default interface ISecureUser {
	id: string;
	name: string;
	avatar: string;
	friends: IFriend[];
	chats: Chat[];
}
