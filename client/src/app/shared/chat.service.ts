import { Injectable } from '@angular/core';
import * as io from 'socket.io-client'

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private url = 'http://localhost:3000';
  private socket: SocketIOClient.Socket; 
  private ownId: string;

  constructor() {
    this.socket = io(this.url);
  }

  public send(message) {
    this.socket.emit('message', message);
  }
}
