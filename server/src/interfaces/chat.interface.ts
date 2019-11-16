import IFriend from "./friend.interface";

export default interface IChat {
	id: string;
	name: string;
	users: IFriend[];
}