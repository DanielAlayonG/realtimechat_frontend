import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Observable, Observer} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {

  constructor(private socket: Socket) { }

  sendMessage(msg:string){
    let user = localStorage.getItem("nombre")
    let type = localStorage.getItem("type")
    this.socket.emit('message', { message: msg, user, type });
  }


  getMessage(): Observable<{ username: string, message: string }> {
    return new Observable((observer) => {
      this.socket.on('message', (data: { username: string, message: string, type: string}) => {
        observer.next(data);
      });
    });
  }

}