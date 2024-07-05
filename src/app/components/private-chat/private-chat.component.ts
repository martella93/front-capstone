import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { DataServiceService } from 'src/app/service/data-service.service';
import { ActivatedRoute } from '@angular/router';
import { PrivateChatMessageService } from 'src/app/service/private-chat-message.service';
import { Message } from 'src/app/service/private-chat-message.service';

@Component({
  selector: 'app-private-chat',
  templateUrl: './private-chat.component.html',
  styleUrls: ['./private-chat.component.scss']
})
export class PrivateChatComponent implements OnInit {

  messages: Observable<Message[]> | undefined;
  newMessage: string = '';
  username: string = '';
  recipient: string = '';

  constructor(
    private chatService: PrivateChatMessageService, 
    private dataSrv: DataServiceService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.dataSrv.getUserLogged().subscribe(user => {
      this.username = user.username;
      this.recipient = this.route.snapshot.paramMap.get('recipient') || '';
      if (this.recipient) {
        this.messages = this.chatService.getMessagesForConversation(this.username, this.recipient);
      }
    });
  }

  sendMessage() {
    if (this.newMessage.trim() && this.username && this.recipient) {
      const msg: Message = {
        content: this.newMessage,
        sender: this.username,
        recipient: this.recipient,
        timestamp: Date.now(),
        id: ''
      };
      this.chatService.sendMessage(msg);
      this.newMessage = '';
    }
  }

  deleteMessage(message: Message) {
    this.chatService.deleteMessage(message);
  }
}
