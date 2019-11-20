import { Component, OnInit } from '@angular/core';

import IUserFriend from '../../../interfaces/user-friend.interface'
import { UserService } from 'src/app/shared/user.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  private active: string;

  private FriendsList: IUserFriend[];

  constructor(private userService: UserService ) {}

  ngOnInit() {
    this.FriendsList = this.userService.getFriends();
  }
}