import { Injectable } from '@angular/core';
import IUserFriend from '../interfaces/user-friend.interface';
import IUser from '../interfaces/user.interface';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private UserInfo: IUser;
  private url = 'http://localhost:3000';

  constructor(
    private httpClient: HttpClient
  ) {}

  public initialUser(data: IUser) {
    this.UserInfo = data;
  }

  public getFriends(): IUserFriend[] {
    return this.UserInfo.friends;
  }

  public getUsers(searchString: string): Observable<IUserFriend[]> {
    return this.httpClient.get<IUserFriend[]>(`${this.url}/users?searchString=${searchString}`);
  }

  public getOwnId(): string {
    return this.UserInfo._id;
  }

  public getOwnName(): string {
    return this.UserInfo.name;
  }
}
