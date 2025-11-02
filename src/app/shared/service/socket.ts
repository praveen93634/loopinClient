import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { io } from 'socket.io-client';
import type { Socket as SocketIO } from 'socket.io-client';
import { Observable, Subscriber } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Socket {
   private socket!: SocketIO;
   private SERVER_URL = environment.apiUrl;
   constructor(){
    this.connect()
   }
   connect():void{
    this.socket = io(this.SERVER_URL,{
      transports:['websocket'],
    })
   }
   emit(event:string,data:any){   
    return this.socket.emit(event,data)
   }
   listen(event: string): Observable<any> {
    return new Observable((subscriber) => {
      this.socket.on(event, (data) => {
        subscriber.next(data);
      });
    });
  }
   disconnect():void{
    if(this.socket){
      this.socket.disconnect()
    }
   }
}
