import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ChatMessageService, Message } from 'src/app/service/chat-message.service';
import { DataServiceService } from 'src/app/service/data-service.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  messages: Observable<Message[]>;
  newMessage: string = '';
  username: string = '';

  constructor(private chatService: ChatMessageService, private dataSrv: DataServiceService) {
    this.messages = this.chatService.getMessages();
  }

  ngOnInit(): void {
    this.dataSrv.getUserLogged().subscribe(user => {
      this.username = user.username; 
    });
  }

  sendMessage() {
    if (this.newMessage.trim() && this.username) {
      const msg: Message = {
        content: this.newMessage,
        sender: this.username,
        timestamp: Date.now(),
        id: ''
        
      };
      console.log(msg);
      this.chatService.sendMessage(msg);
      this.newMessage = '';
    }
  }
  deleteMessage(message: Message) {
    this.chatService.deleteMessage(message);
  }
}
