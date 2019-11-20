import { Component, OnInit, Input } from '@angular/core';
import IMessage from '../../interfaces/message.interface'

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit {

  @Input() data: IMessage;

  private ownId; // Get from somoewere

  constructor() { }

  ngOnInit() {
  }

}

