import { Component, OnInit, Input } from '@angular/core';
import { Message } from '../../shared/message.interface'

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit {

  @Input() data: Message;

  private ownId; // Get from somoewere

  constructor() { }

  ngOnInit() {
  }

}
