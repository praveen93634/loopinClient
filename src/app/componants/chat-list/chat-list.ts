import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-chat-list',
  imports: [FormsModule,CommonModule],
  templateUrl: './chat-list.html',
  styleUrl: './chat-list.scss',
})
export class ChatList {
  searchTerm: string = '';
  filteredChats: any[] = [];
  openChat(data: any) {
    console.log('Opening chat with data:', data);
  }
}
