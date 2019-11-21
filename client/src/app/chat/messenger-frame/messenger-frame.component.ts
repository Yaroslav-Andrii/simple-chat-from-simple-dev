import { Component, OnInit, Input } from '@angular/core';
import IMessage from '../../interfaces/message.interface';
import IUserFriend from '../../interfaces/user-friend.interface';
import { ChatService } from '../../shared/chat.service';
import { UserService } from 'src/app/shared/user.service';
import { EventEmitter } from 'events';
import IChat from 'src/app/interfaces/chat.interface';
import { ListComponent } from '../sidebar/list/list.component';

@Component({
  selector: 'app-messenger-frame',
  templateUrl: './messenger-frame.component.html',
  styleUrls: ['./messenger-frame.component.scss']
})
export class MessengerFrameComponent implements OnInit {

  private messages: IMessage[] = [];
  private activeChat: IChat;
  private messageText: string;
  private ownId: string;
  public status: boolean = true;
  private roomName = 'Public';

  private newIncoming = this.chatService.incomingMessage;
  private newActivated = this.chatService.chatActivated;
 
  //private searchString = ''

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
    this.message.senderId = this.ownId;

    this.newActivated.subscribe(data => {
      this.activeChat = data;
      this.chatService.joinTo(data._id);
    })

    this.newIncoming.subscribe(data => {
      this.incomingMessage(data);
    })
  }

  private findeMessage() {
    /* TODO */
  }

  private showMessage(message: IMessage) {
    this.messages.push(message);
  }

  private incomingMessage(message: IMessage) {
    this.showMessage(message);
  }

  private sendMessage() {
    this.message.text = this.messageText;
    this.chatService.send(this.message);

    this.showMessage({
      date: this.message.date,
      senderId: this.message.senderId,
      text: this.message.text,
      rank: this.message.rank,
    });

    this.message = {
      date: new Date(),
      senderId: this.ownId,
      text: null,
      rank: null,
    }
  }

  ngOnInit() {
  }
}