import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ChatMessage } from '../chat-message';
import { MessagesService } from '../../services/messages.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  @ViewChild('messageContainer') messageContainer!: ElementRef;
  model = new ChatMessage('');
  messageList: any[] = [];

  moderador: boolean = false;

  constructor(private messageService: MessagesService) { 
    let type = localStorage.getItem("type")

    if(type == "1"){
      this.moderador = true
    }
  }

  
  eliminarHistorial(){

    Swal.fire({
      text: '¿Quieres limpiar el chat?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.messageService.limpiarChat()
      }
    });
  }
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

    this.messageService.getHistorial().subscribe((historial: any) => {

      this.messageList = historial; // Asignar el historial al array de mensajes
    });

    this.messageService.eliminarHistorial().subscribe((historial: any) => {
      this.messageList = []; // Asignar el historial al array de mensajes
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
