import IFriend from "./friend.interface";
import IMessage from "./message.interface";

export default interface IChat {
	_id?: string;
	name: string;
	users: IFriend[];
	messages: IMessage[];
	type: string;
}