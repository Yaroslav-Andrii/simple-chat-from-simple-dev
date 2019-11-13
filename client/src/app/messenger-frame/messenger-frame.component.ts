import { Component, OnInit } from '@angular/core';
import { Message } from '../shared/message.interface';
import { UserFriend } from '../shared/user-friend.interface';

@Component({
  selector: 'app-messenger-frame',
  templateUrl: './messenger-frame.component.html',
  styleUrls: ['./messenger-frame.component.scss']
})
export class MessengerFrameComponent implements OnInit {

  private messages: Message[];
  private interlocutor: UserFriend;

  constructor() { }

  ngOnInit() {
  }

}

/*
const friend = {
  id: '12345',
  name: 'Petro',
  status: false,
  avatarUrl: 'string',
  lastMessage: {
    from: "string",
    text: "string",
  }
}

const data = [
  {
    date: "2012-02-02 12:45",
    senderId: "12345",
    text: "alskdhhhhhhhhhhhhhhhhhffslkdfjahskdlfhjalskdfjhlaskdhjgflkasjdbngkajbsdkvjbnasdalskdhhhhhhhhhhhhhhhhhffslkdfjahskdlfhjalskdfjhlaskdhjgflkasjdbngkajbsdkvjbnasdalskdhhhhhhhhhhhhhhhhhffslkdfjahskdlfhjalskdfjhlaskdhjgflkasjdbngkajbsdkvjbnasdalskdhhhhhhhhhhhhhhhhhffslkdfjahskdlfhjalskdfjhlaskdhjgflkasjdbngkajbsdkvjbnasdalskdhhhhhhhhhhhhhhhhhffslkdfjahskdlfhjalskdfjhlaskdhjgflkasjdbngkajbsdkvjbnasd",
    rank: 1,
  },
  {
    date: "2012-02-02 12:46",
    senderId: "12211",
    text: "alsaskdhjgflkasjdbngkajbsdkvjbnasd",
    rank: 2,
  },
  {
    date: "2012-02-02 12:45",
    senderId: "12211",
    text: "ffslkdfjahskdlfhjalskdfjhlaskdhjgflkasjdbngkajbsdkvjbnasd",
    rank: 3,
  },
  {
    date: "2012-02-02 12:45",
    senderId: "12211",
    text: "alskdhhhhhhhhhhhhhhhhhffslkdfjahskdlfhjalskdfjbngkajbsdkvjbnasd",
    rank: 4,
  },
  {
    date: "2012-02-02 12:45",
    senderId: "12345",
    text: "alskhhhhffslkdfjahskdlfhjalskdfjhlaskdhjgflkasjdbngkajbsdkvjbnasd",
    rank: 8,
  },
  {
    date: "2012-02-02 12:45",
    senderId: "12345",
    text: "alskdhhhhhhhskdlfhjalskdfjhlaskdhjgflkasjdbngkajbsdkvjbnasd",
    rank: 6,
  },
  {
    date: "2012-02-02 12:45",
    senderId: "12211",
    text: "hhhhhhhhhffslkdfjahskdlfhjalskdfjhlaskdhjgflkasjdbngkajbsdkvjbnasd",
    rank: 7,
  },
  {
    date: "2012-02-02 12:45",
    senderId: "12345",
    text: "alskdhhhhhhhhhhhhhkdfjhlaskdhjgflkasjdbngkajbsdkvjbnasd",
    rank: 9,
  },
  {
    date: "2012-02-02 12:45",
    senderId: "12345",
    text: "alskdhhhhhhhhhhhhhhhhhffslkdfjahskdlfhjalskdfjhlaskdhjgflkasjdbngkajbsdkvjbnasdalskdhhhhhhhhhhhhhhhhhffslkdfjahskdlfhjalskdfjhlaskdhjgflkasjdbngkajbsdkvjbnasdalskdhhhhhhhhhhhhhhhhhffslkdfjahskdlfhjalskdfjhlaskdhjgflkasjdbngkajbsdkvjbnasdalskdhhhhhhhhhhhhhhhhhffslkdfjahskdlfhjalskdfjhlaskdhjgflkasjdbngkajbsdkvjbnasdalskdhhhhhhhhhhhhhhhhhffslkdfjahskdlfhjalskdfjhlaskdhjgflkasjdbngkajbsdkvjbnasd",
    rank: 1,
  },
  {
    date: "2012-02-02 12:46",
    senderId: "12211",
    text: "alsaskdhjgflkasjdbngkajbsdkvjbnasd",
    rank: 2,
  },
  {
    date: "2012-02-02 12:45",
    senderId: "12211",
    text: "ffslkdfjahskdlfhjalskdfjhlaskdhjgflkasjdbngkajbsdkvjbnasd",
    rank: 3,
  },
  {
    date: "2012-02-02 12:45",
    senderId: "12211",
    text: "alskdhhhhhhhhhhhhhhhhhffslkdfjahskdlfhjalskdfjbngkajbsdkvjbnasd",
    rank: 4,
  },
  {
    date: "2012-02-02 12:45",
    senderId: "12345",
    text: "alskhhhhffslkdfjahskdlfhjalskdfjhlaskdhjgflkasjdbngkajbsdkvjbnasd",
    rank: 8,
  },
  {
    date: "2012-02-02 12:45",
    senderId: "12345",
    text: "alskdhhhhhhhskdlfhjalskdfjhlaskdhjgflkasjdbngkajbsdkvjbnasd",
    rank: 6,
  },
  {
    date: "2012-02-02 12:45",
    senderId: "12211",
    text: "hhhhhhhhhffslkdfjahskdlfhjalskdfjhlaskdhjgflkasjdbngkajbsdkvjbnasd",
    rank: 7,
  },
  {
    date: "2012-02-02 12:45",
    senderId: "12345",
    text: "alskdhhhhhhhhhhhhhkdfjhlaskdhjgflkasjdbngkajbsdkvjbnasd",
    rank: 9,
  },
]*/