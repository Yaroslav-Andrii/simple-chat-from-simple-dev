export interface UserFriend {
	id: string;
	name: string;
	status: boolean;
	avatarUrl: string;
	lastMessage: {
	  from: string;
	  text: string;
	}
}