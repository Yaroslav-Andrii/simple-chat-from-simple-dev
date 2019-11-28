import { Injectable, EventEmitter } from '@angular/core';
import * as io from 'socket.io-client'
import IChat from '../interfaces/chat.interface';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import IMessage from '../interfaces/message.interface';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private url = 'http://localhost:3000';
  private socket: SocketIOClient.Socket; 
  private ownId: string;
  private messagesLength: number = 10;
  private currentChatId: string;

  public incomingMessage: EventEmitter<IMessage> = new EventEmitter();
  public chatActivated: EventEmitter<IChat> = new EventEmitter();

  constructor(
    private httpClient: HttpClient,
    private userService: UserService
  ) {
    this.ownId = userService.getOwnId();
    
    // Connect to web socket
    this.socket = io(this.url);
    this.socket.emit('initializeUser', this.ownId);

    this.socket.on('incoming', (data: IMessage, chatId: string) => {
      if (this.currentChatId === chatId) {
        this.incomingMessage.emit(data);
      } else {
        // TODO show new messages in title
      }
    })
  }

  public loadGroupChatsList(): Observable<IChat[]> {
    return this.httpClient.get<IChat[]>(`${this.url}/chats`)
  }

  public joinTo(id) {
    this.currentChatId = id;
    this.socket.emit('joinTo', id);
  }

  public send(message) {
    this.socket.emit('message', message, this.currentChatId);
  }

  public getMessagesByChatId(id): Observable<IMessage[]> {
    return this.httpClient.get<IMessage[]>(`${this.url}/chats/${id}/messages?length=${this.messagesLength}`);
  }
}