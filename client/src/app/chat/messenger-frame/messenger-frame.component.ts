import { Component, OnInit } from '@angular/core';
import IMessage from '../../interfaces/message.interface';
import { ChatService } from '../../shared/chat.service';
import { UserService } from 'src/app/shared/user.service';
import IChat from 'src/app/interfaces/chat.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-messenger-frame',
  templateUrl: './messenger-frame.component.html',
  styleUrls: ['./messenger-frame.component.scss']
})
export class MessengerFrameComponent implements OnInit {

  private messages: IMessage[] = [];
  private messagesHistory: IMessage[] = [];
  private activeChat: IChat;
  private chatJoined: boolean = false;

  private messageText: string;
  private ownId: string;
  private ownName: string;

  constructor(
    private userService: UserService,
    private chatService: ChatService,
    private _router: Router,
  ) {
    this.ownId = this.userService.getOwnId();
    this.ownName = this.userService.getOwnName();

    this.chatService.chatJoined
      .subscribe((flag: boolean) => {
        this.chatJoined = flag;
      })

    this.chatService.chatActivated
      .subscribe((chat: IChat) => {
        this.messages = [];
        this.activeChat = chat;
        
        this.chatJoined = false;
        this.chatService.joinTo(chat._id);

        this.chatService.getMessagesByChatId(chat._id)
          .subscribe((messages: IMessage[]) => {
            this.messagesHistory = messages;
          })
      })

    this.chatService.incomingMessage
      .subscribe(data => {
        this.showMessage(data);
      })
  }

  private showMessage(message: IMessage) {
    this.messages.push(message);
  }

  private sendMessage() {

    event.preventDefault();

    // Create message object
    const message: IMessage = {
      date: new Date(),
      text: this.messageText,
      senderId: this.ownId,
      senderName: this.ownName,
      rank: null,
    }

    // Send message
    this.chatService.send(message);

    // Show message in messenger frame
    this.showMessage(message);

    // Clear message text variable
    this.messageText = null;
  }

  private exitAlert() {
    if (confirm("Are you sure that you want to leave us?")) {
      localStorage.clear();
      this._router.navigate(['/login']);
    }
  }

  ngOnInit() {
  }
}