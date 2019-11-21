import { Injectable, EventEmitter } from '@angular/core';
import * as io from 'socket.io-client'
import IChat from '../interfaces/chat.interface';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import IMessage from '../interfaces/message.interface';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private url = 'http://localhost:3000';
  private socket: SocketIOClient.Socket; 
  private ownId: string;

  public incomingMessage: EventEmitter<IMessage> = new EventEmitter();
  public chatActivated: EventEmitter<IChat> = new EventEmitter();

  constructor(
    private httpClient: HttpClient
  ) {

    // Connect to web socket
    this.socket = io(this.url);

    this.socket.on('incoming', data => {
      this.incomingMessage.emit(data);
    })
  }

  public loadGroupChatsList(): Observable<IChat[]> {
    return this.httpClient.get<IChat[]>(`${this.url}/chats`)
  }

  public joinTo(id) {
    this.socket.emit('joinTo', id);
  }

  public send(message) {
    this.socket.emit('message', message);
  }
}
