import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Observable, Observer} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {

  constructor(private socket: Socket) {
    this.socket.emit('historial', {});
  }

  sendMessage(msg:string){
    let user = localStorage.getItem("nombre")
    let type = localStorage.getItem("type")
    this.socket.emit('message', { message: msg, user, type });
  }

  limpiarChat(){
    this.socket.emit('limpiarChat');
  }

  getMessage(): Observable<{ username: string, message: string }> {
    return new Observable((observer) => {
      this.socket.on('message', (data: { username: string, message: string, type: string}) => {
        observer.next(data);
      });
    });
  }

  getHistorial(): Observable<any> {
    return new Observable((observer) => {
      this.socket.on('historial', (data: any) => {
        observer.next(data);
      });
    });
  }

  eliminarHistorial(): Observable<any> {
    return new Observable((observer) => {
      this.socket.on('limpiarChat', (data: any) => {
        observer.next(data);
      });
    });
  }


}