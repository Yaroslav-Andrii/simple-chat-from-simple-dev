import IUserFriend from './user-friend.interface';

export default interface ISearchParams {
	type: string;
	string: string;
	deepResult: IUserFriend[];
}