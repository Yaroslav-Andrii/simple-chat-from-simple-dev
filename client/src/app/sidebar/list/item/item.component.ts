import { Component, OnInit, Input } from '@angular/core';
import IUserFriend from '../../../interfaces/user-friend.interface';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent implements OnInit {

  @Input() data: IUserFriend;

  constructor() { }

  ngOnInit() {
  }

}
