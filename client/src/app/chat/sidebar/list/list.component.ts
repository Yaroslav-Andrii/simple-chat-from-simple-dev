import { Component, OnInit, Input } from '@angular/core';

import IChat from 'src/app/interfaces/chat.interface';
import { ChatService } from 'src/app/shared/chat.service';
import ISearchParams from 'src/app/interfaces/search-params.interface';
import IUserFriend from 'src/app/interfaces/user-friend.interface';
import { UserService } from 'src/app/shared/user.service';
import { ChatComponent } from '../../chat.component'
import { AuthService } from 'src/app/shared/auth.service';

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
  private friendsList: IUserFriend[];
  private tmpFriendsList: IUserFriend[];
  private ownId: string;

  constructor(
    private chatService: ChatService,
    private userService: UserService,
    private authService: AuthService
  ) {

    this.ownId = this.userService.getOwnId();

    this.chatService.loadPublicChatsList()
      .subscribe(data => {
        this.chatsList = data;
      });
  
    this.friendsList = this.userService.getFriends();
  }

  private getLinkList(searchParams: ISearchParams = this.defaultSearchParams): IChat[] | IUserFriend[] {

    if (searchParams.type === 'public') {
      if (!this.chatsList) return;

      const chats = this.chatsList.filter(chat => chat.type === searchParams.type);

      return chats.filter(chat => {
        return chat.name.toLowerCase().includes( searchParams.string.trim().toLowerCase() );
      });

    } else {
      this.tmpFriendsList = this.friendsList.filter(friend => {
        return friend.name.toLowerCase().includes( searchParams.string.trim().toLowerCase() );
      });
  
      if (searchParams.deepResult && searchParams.deepResult.length) {

        const readyTmpFriends = this.tmpFriendsList.map(friend => friend._id); 
        searchParams.deepResult = searchParams.deepResult.filter(user => !readyTmpFriends.includes(user._id) && user._id !== this.ownId);

        this.tmpFriendsList.push(...searchParams.deepResult);
      }
  
      return this.tmpFriendsList;
    }
  }

  public activate(id: string): void {

    try {

      if (this.searchParams && this.searchParams.type === 'friend') {

        // Get object of selected friend
        let selectedFriend: IUserFriend;
  
        selectedFriend = this.friendsList.find(friend => friend._id === id);
  
        if (this.searchParams.deepResult && !selectedFriend) {
          selectedFriend = this.tmpFriendsList.find(tmpFriend => tmpFriend._id === id);
        }
  
        if (!selectedFriend) throw new Error('Something is wrong, Selected user has wrong data');
  
        // Get object of chat with selected friend
        if (selectedFriend.chatId) {
          
          this.chatService.getChatById(selectedFriend.chatId)
            .subscribe(selectedChat => {
              selectedChat.name = selectedFriend.name;
              this.chatService.chatActivated.emit(selectedChat);
            });

        } else {

          this.chatService.createPrivateChat(this.ownId, selectedFriend._id)
            .subscribe(createdChat => {

              //Pipe friend from tmpFriendsList to friendsList
              const index = this.tmpFriendsList.findIndex(friend => friend._id === selectedFriend._id);
              this.tmpFriendsList.splice(index, 1);

              selectedFriend.chatId = createdChat._id;
              this.friendsList.push(selectedFriend);

              //Set correct name for chat
              createdChat.name = selectedFriend.name;

              this.chatService.chatActivated.emit(createdChat);
            });
        }
  
      } else {
        this.chatService.chatActivated.emit( this.chatsList.find(chat => chat._id === id) );
      }

    } catch (error) {
      console.error(error);
    }
  }

  ngOnInit() { }
}