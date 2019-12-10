import { Component, OnInit, Input } from '@angular/core';
import IUserFriend from '../../../../interfaces/user-friend.interface';
import IChat from 'src/app/interfaces/chat.interface';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent implements OnInit {

  @Input() data: IChat | IUserFriend;

  constructor() { }

  ngOnInit() { }

}
