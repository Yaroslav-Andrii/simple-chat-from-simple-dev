import Friend from "./friend.interface";

export default interface Chat {
	id: string;
	name: string;
	users: Friend[];
}