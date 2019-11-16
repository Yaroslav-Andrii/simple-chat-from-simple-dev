import { Component, OnInit } from '@angular/core';
import IMessage from '../interfaces/message.interface';
import IUserFriend from '../interfaces/user-friend.interface';

@Component({
  selector: 'app-messenger-frame',
  templateUrl: './messenger-frame.component.html',
  styleUrls: ['./messenger-frame.component.scss']
})
export class MessengerFrameComponent implements OnInit {

  private messages: IMessage[];
  private interlocutor: IUserFriend;

  constructor() { }

  ngOnInit() {
  }

}