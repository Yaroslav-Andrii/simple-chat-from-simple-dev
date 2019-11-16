import { Injectable } from '@angular/core';
import IUserFriend from '../interfaces/user-friend.interface';
import IUser from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private UserInfo: IUser;

  constructor() {}

  public initialUser(userData: IUser): void {
    this.UserInfo = userData;
  }

  public getFriends(): IUserFriend[] {
    return this.UserInfo.friends;
  }
}
