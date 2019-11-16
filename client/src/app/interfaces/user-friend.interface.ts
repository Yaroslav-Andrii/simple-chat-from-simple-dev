export default interface IUserFriend {
	id: string;
	name: string;
	avatarUrl: string;
	lastMessage: {
		from: string;
		text: string;
	}
}