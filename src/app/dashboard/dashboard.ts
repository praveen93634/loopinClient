import { Component, OnInit } from '@angular/core';
import { ChatList } from "../componants/chat-list/chat-list";
import { TopBar } from "../componants/top-bar/top-bar";
import { RouterOutlet } from "@angular/router";
import { SecureStorageService } from '../shared/service/secure-storage-service';
import { user } from '@angular/fire/auth';
import { CommonModule } from '@angular/common';
import { UserService } from './service/user-service';
import { skip } from 'rxjs';
import { RequestService } from './service/request-service';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard implements OnInit {
  usersList: any[] = []
  currentPage = 1;
  limit = 10;
  constructor(private storageservice: SecureStorageService, private userservice: UserService, private requestservice: RequestService) { }
  ngOnInit(): void {
    const user = this.storageservice.getItem('user');
    console.log('Logged in user:', user);
    this.getAllUsers();
  }
  connect(id: string) {
    this.requestservice.sendConnectionRequest(id).subscribe((res: any) => {
      console.log(res);
      this.getAllUsers();
    }, (err => {
      console.log(err);
    }))
  }
  ignore(id: string) {
    this.requestservice.sendIgnoreRequest(id).subscribe((res: any) => {
      console.log(res);
      this.getAllUsers();
    }, (err => {
      console.log(err);
    }))
  }
  getAllUsers() {
    let data = {
      limit: this.limit,
      skip: (this.currentPage - 1) * this.limit
    }
    this.userservice.getAllUsers(data).subscribe((res: any) => {
      console.log(res);
      this.usersList = res.result.users;
    }, (err => {
      console.log(err);
    }))
  }
}
