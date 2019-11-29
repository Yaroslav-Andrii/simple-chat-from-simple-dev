import IFriend from "./friend.interface";

export default interface IMessage {
	date: string;
	senderId: string;
	text: string;
	rank: number;
	senderName: string;
}