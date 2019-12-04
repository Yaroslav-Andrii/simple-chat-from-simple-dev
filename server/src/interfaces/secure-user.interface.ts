import IFriend from './friend.interface';
import Chat from './chat.interface';

export default interface ISecureUser {
	_id: string;
	name: string;
	avatar: string;
	friends: IFriend[];
	chats: string[];
}
