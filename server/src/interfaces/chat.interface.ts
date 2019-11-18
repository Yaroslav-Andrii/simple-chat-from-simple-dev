import IFriend from "./friend.interface";
import IMessage from "./message.interface";

export default interface IChat {
	id: string;
	name: string;
	users: IFriend[];
	massages: IMessage[];
}