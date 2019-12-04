export default interface IUserFriend {
	_id: string;
	name: string;
	avatar?: string;
	status: boolean;
	chatId: string;
	lastMessage: {
		from: string;
		text: string;
	}
}