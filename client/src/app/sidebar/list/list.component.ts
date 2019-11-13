import { Component, OnInit } from '@angular/core';

import { UserFriend } from '../../shared/user-friend.interface'

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  private active: string;

  private FrindsList: UserFriend[];

  constructor() { }

  ngOnInit() {
  }

}
/*
const USERS: UserFriend[] = [
  { id: '12345', name: 'Dizio', status: true, avatarUrl: "assets/1.png", lastMessage: { from: "11111", text: 'hellsadddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd'} },
  { id: '22345', name: 'Lesuk', status: true, avatarUrl: "assets/1.png", lastMessage: { from: "11111", text: 'hello2'} },
  { id: '32345', name: 'Julic', status: true, avatarUrl: "assets/1.png", lastMessage: { from: "32345", text: 'hello3'} },
  { id: '42345', name: 'Mama', status: true, avatarUrl: "assets/1.png", lastMessage: { from: "42345", text: 'hello4'} },
  { id: '52345', name: 'Kolega', status: true, avatarUrl: "assets/1.png", lastMessage: { from: "52345", text: 'hello5'} },
  { id: '22345', name: 'Lesuk', status: true, avatarUrl: "assets/1.png", lastMessage: { from: "11111", text: 'hello2'} },
  { id: '42345', name: 'Mama', status: true, avatarUrl: "assets/1.png", lastMessage: { from: "42345", text: 'hello4'} },
  { id: '52345', name: 'Kolega', status: true, avatarUrl: "assets/1.png", lastMessage: { from: "52345", text: 'hello5'} },
  { id: '22345', name: 'Lesuk', status: true, avatarUrl: "assets/1.png", lastMessage: { from: "11111", text: 'hello2'} },
  { id: '22345', name: 'Lesuk', status: true, avatarUrl: "assets/1.png", lastMessage: { from: "11111", text: 'hello2'} },
  { id: '42345', name: 'Mama', status: true, avatarUrl: "assets/1.png", lastMessage: { from: "42345", text: 'hello4'} },
  { id: '52345', name: 'Kolega', status: true, avatarUrl: "assets/1.png", lastMessage: { from: "52345", text: 'hello5'} },
  { id: '22345', name: 'Lesuk', status: true, avatarUrl: "assets/1.png", lastMessage: { from: "11111", text: 'hellas'} },
]
*/
