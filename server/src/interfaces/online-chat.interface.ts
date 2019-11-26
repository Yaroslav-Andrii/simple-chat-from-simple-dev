import IChat from "./chat.interface";
import ISecureUser from "./secure-user.interface";
import IMessage from "./message.interface";

export default interface IOnlineChat {
	chat: IChat;
	usersOnline: ISecureUser[];
	buffer: IMessage[];
}