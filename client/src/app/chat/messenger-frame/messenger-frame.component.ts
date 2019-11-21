import { Component, OnInit } from '@angular/core';
import IMessage from '../../interfaces/message.interface';
import IUserFriend from '../../interfaces/user-friend.interface';
import { ChatService } from '../../shared/chat.service';
import { UserService } from 'src/app/shared/user.service';

@Component({
  selector: 'app-messenger-frame',
  templateUrl: './messenger-frame.component.html',
  styleUrls: ['./messenger-frame.component.scss']
})
export class MessengerFrameComponent implements OnInit {

  private messages: IMessage[];
  private interlocutor: IUserFriend;
  private messageText: string;
  private ownId: string;

  private message: IMessage = {
    date: new Date(),
    senderId: this.ownId,
    text: null,
    rank: null,
  };

  constructor(
    private userService: UserService,
    private chatService: ChatService,
  ) {
    this.ownId = this.userService.getOwnId();
  }

  private sendMessage() {
    this.message.text = this.messageText;
    this.chatService.send(this.message);
  }

  ngOnInit() {
  }

}