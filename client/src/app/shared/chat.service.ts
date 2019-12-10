import { Injectable, EventEmitter } from '@angular/core';
import * as io from 'socket.io-client'
import IChat from '../interfaces/chat.interface';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import IMessage from '../interfaces/message.interface';
import { UserService } from './user.service';
import IUserFriend from '../interfaces/user-friend.interface';
import ISearchParams from '../interfaces/search-params.interface';

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
  public chatJoined: EventEmitter<boolean> = new EventEmitter();

  constructor(
    private httpClient: HttpClient,
    private userService: UserService
  ) {
    this.ownId = userService.getOwnId();
    
    // Connect to web socket
    this.socket = io(this.url);
    this.socket.emit('initializeUser', this.ownId);

    this.socket.on('joined', flag => {
      this.chatJoined.emit(flag);
    });

    this.socket.on('incoming', (data: IMessage, chatId: string) => {
      if (this.currentChatId === chatId) {
        this.incomingMessage.emit(data);
      }
    });
  }

  public loadPublicChatsList(): Observable<IChat[]> {
    return this.httpClient.get<IChat[]>(`${this.url}/chats`)
  }

  public joinTo(chatId) {
    this.currentChatId = chatId;
    this.socket.emit('joinTo', chatId);
  }

  public send(message) {
    this.socket.emit('message', message, this.currentChatId);
  }

  public getMessagesByChatId(id): Observable<IMessage[]> {
    return this.httpClient.get<IMessage[]>(`${this.url}/chats/${id}/messages?length=${this.messagesLength}`);
  }

  public findUsersByParams(searchParams: ISearchParams): Observable<IUserFriend[]> {
    return this.httpClient.get<IUserFriend[]>(`${this.url}/users?string=${searchParams.string}`);
  }

  public getChatById(id: string): Observable<IChat> {
    return this.httpClient.get<IChat>(`${this.url}/chats/${id}`);
  }

  public createPrivateChat(ownId: string, friendId: string): Observable<IChat> {
    return this.httpClient.post<IChat>(
      `${this.url}/chats/createNew`, 
      {
        users: [ownId, friendId],  
        type: 'friend'
      }
    )
  }
}