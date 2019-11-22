import { Component, OnInit, Input } from '@angular/core';

import IChat from 'src/app/interfaces/chat.interface';
import { ChatService } from 'src/app/shared/chat.service';
import ISearchParams from 'src/app/interfaces/search-params.interface';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  @Input() searchParams: ISearchParams;

  private defaultSearchParams: ISearchParams = { 
    flag: 'public',
    string: '' 
  }

  private chatsList: IChat[];
  private active: string;

  constructor(private chatService: ChatService ) {
    this.chatService.loadGroupChatsList()
      .subscribe(data => {
        this.chatsList = data;
      });
  }

  private getChatList(searchParams: ISearchParams = this.defaultSearchParams): IChat[] {
    
    if (!this.chatsList) return;

    const chats = this.chatsList.filter(chat => chat.type === searchParams.flag);

    return chats.filter(chat => {
      return chat.name.toLowerCase().includes( searchParams.string.trim().toLowerCase() );
    });
  }

  public activate(id: string): void {
    this.chatService.chatActivated.emit( this.chatsList.find(chat => chat._id === id) );
  }

  ngOnInit() { }
}