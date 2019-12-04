import { Component, OnInit, Input } from '@angular/core';

import IChat from 'src/app/interfaces/chat.interface';
import { ChatService } from 'src/app/shared/chat.service';
import ISearchParams from 'src/app/interfaces/search-params.interface';
import IUserFriend from 'src/app/interfaces/user-friend.interface';
import { UserService } from 'src/app/shared/user.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  @Input() searchParams: ISearchParams;

  private defaultSearchParams: ISearchParams = { 
    type: 'public',
    string: '',
    deepResult: null,
  }

  private chatsList: IChat[];
  private active: string;
  private friendList: IUserFriend[];

  constructor(
    private chatService: ChatService,
    private userService: UserService
  ) {
    this.chatService.loadGroupChatsList()
      .subscribe(data => {
        this.chatsList = data;
      });

    this.friendList = this.userService.getFriends();
  }

  private getLinkList(searchParams: ISearchParams = this.defaultSearchParams): IChat[] | IUserFriend[] {
    
    if (searchParams.type === 'public') {
      if (!this.chatsList) return;

      const chats = this.chatsList.filter(chat => chat.type === searchParams.type);

      return chats.filter(chat => {
        return chat.name.toLowerCase().includes( searchParams.string.trim().toLowerCase() );
      });
    } 

    const friends: IUserFriend[] = this.friendList.filter(friend => friend.name === searchParams.string);

    if (searchParams.deepResult) {
      friends.push(...searchParams.deepResult);
      return friends;
    }

    return friends
  }

  public activate(id: string): void {

    if (this.searchParams && this.searchParams.type === 'public') {
      this.chatService.chatActivated.emit( this.chatsList.find(chat => chat._id === id) );
    } else {
      // TODO private activating
      console.log('pivate activate');
    }
  }

  ngOnInit() {
    console.log(this.active);
    
   }
}