import IUserFriend from './user-friend.interface';
import IMessage from './message.interface';

export default interface IChat {
	_id: string,
	name: string,
	users: IUserFriend[],
	messages: IMessage[],
}