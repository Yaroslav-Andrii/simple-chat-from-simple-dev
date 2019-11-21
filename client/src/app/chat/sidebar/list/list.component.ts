import { Component, OnInit, EventEmitter, Output } from '@angular/core';

import IChat from 'src/app/interfaces/chat.interface';
import { ChatService } from 'src/app/shared/chat.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  private chatsList: IChat[];
  private active: string;

  constructor(private chatService: ChatService ) {
    this.chatService.loadGroupChatsList()
      .subscribe(data => {
        this.chatsList = data;
      });
  }

  public activate(id: string) {
    this.chatService.chatActivated.emit( this.chatsList.find(chat => chat._id === id) );
  }

  ngOnInit() {
    console.log(this.chatsList, 'herer')
  }
}