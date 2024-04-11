import { Component, ElementRef, ViewChild } from '@angular/core';
import { ChatMessage } from '../chat-message';
import { MessagesService } from '../../services/messages.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent {
  @ViewChild('messageContainer') messageContainer!: ElementRef;

  constructor(private messageService: MessagesService) { }

  model = new ChatMessage('');
  messageList: any[] = [];

  sendMessage(): void {
    let mensaje = this.model.msg;
    if (mensaje.trim() !== '') {
      this.messageService.sendMessage(this.model.msg);
      this.model.msg = '';
      this.scrollToBottom();
    }
  }

  ngOnInit(): void {
    this.messageService.getMessage().subscribe((data: any) => {
      this.messageList.push(data);
      this.scrollToBottom();
    });
  }

  scrollToBottom(): void {
    try {
      this.messageContainer.nativeElement.scrollTop = this.messageContainer.nativeElement.scrollHeight;
    } catch(err) { }
  }

  onSubmit() {
    this.sendMessage();
  }
}
