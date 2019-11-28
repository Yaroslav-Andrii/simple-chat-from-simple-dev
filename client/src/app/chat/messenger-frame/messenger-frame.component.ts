import { Component, OnInit } from '@angular/core';
import IMessage from '../../interfaces/message.interface';
import { ChatService } from '../../shared/chat.service';
import { UserService } from 'src/app/shared/user.service';
import IChat from 'src/app/interfaces/chat.interface';

@Component({
  selector: 'app-messenger-frame',
  templateUrl: './messenger-frame.component.html',
  styleUrls: ['./messenger-frame.component.scss']
})
export class MessengerFrameComponent implements OnInit {

  private messages: IMessage[] = [];
  private messagesHistory: IMessage[] = [];
  private activeChat: IChat;
  private messageText: string;
  private ownId: string;
  public status: boolean = true;

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

    this.newActivated
      .subscribe((chat: IChat) => {
        this.messages = [];
        this.activeChat = chat;
        this.chatService.joinTo(chat._id);

        this.chatService.getMessagesByChatId(chat._id)
          .subscribe((messages: IMessage[]) => {
            this.messagesHistory = messages;
          })
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
    event.preventDefault();
    this.message.text = this.messageText;
    this.chatService.send(this.message);
    this.messageText = null;

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