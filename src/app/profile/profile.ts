import { Component } from '@angular/core';
import { SecureStorageService } from '../shared/service/secure-storage-service';
import { CommonModule, DatePipe } from '@angular/common';

@Component({
  selector: 'app-profile',
  imports: [CommonModule],
  templateUrl: './profile.html',
  styleUrl: './profile.scss',
})
export class Profile {
  user:any
  constructor(private stogrageservice: SecureStorageService) { 
    this.user=this.stogrageservice.getItem('user');
    console.log(this.user);
  }
}
