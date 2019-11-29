import { Component, OnInit, Input } from '@angular/core';
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
  private chatJoined: boolean = false;

  private messageText: string;
  private ownId: string;
  private ownName: string;

  public status: boolean = true;
  //private searchString = ''

  constructor(
    private userService: UserService,
    private chatService: ChatService,
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

  private findeMessage() {
    /* TODO */
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

  ngOnInit() {
  }
}