import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-chat-window',
  imports: [FormsModule],
  templateUrl: './chat-window.html',
  styleUrl: './chat-window.scss',
})
export class ChatWindow {
  newMessage: string = '';
sendMessage(){

}
selectedUser: any = null;
messages: any[] = [];
}
