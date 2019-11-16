import IUserFriend from './user-friend.interface';

export default interface IUser {
	id: string;
	name: string;
	avatarUrl: string;
	chats: [];
	friends: IUserFriend[];
}