import { Injectable } from '@angular/core';
import IUserFriend from '../interfaces/user-friend.interface';
import IUser from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private UserInfo: IUser;

  constructor() {}

  public initialUser(data: IUser) {
    this.UserInfo = data;
  }

  public getFriends(): IUserFriend[] {
    return this.UserInfo.friends;
  }

  public getOwnId(): string {
    return this.UserInfo.id;
  }

  public getOwnName(): string {
    return this.UserInfo.name;
  }
}
