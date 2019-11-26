import IFriend from './friend.interface';
import Chat from './chat.interface';

export default interface IUser {
	_id: string;
	name?: string;
	password: string;
	email: string;
	avatar?: string;
	friends?: IFriend[];
	chats?: string[];
}