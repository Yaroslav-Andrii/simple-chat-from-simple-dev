export default interface IFriend {
	id: string;
	name: string;
	avatar: string;
	lastMessage: {
		from: string;
		text: string;
	}
}