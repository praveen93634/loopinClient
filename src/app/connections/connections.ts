import { Component, OnInit } from '@angular/core';
import { RequestService } from '../dashboard/service/request-service';
import { UserService } from '../dashboard/service/user-service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-connections',
  imports: [CommonModule],
  templateUrl: './connections.html',
  styleUrl: './connections.scss',
})
export class Connections implements OnInit {
  usersList: any[] = []
  currentPage = 1;
  limit = 10;
  constructor(private userservice: UserService, private requestservice: RequestService) { }

  ngOnInit(): void {
    this.getPendingRequests();
  }
  getPendingRequests() {
    this.userservice.getPendingRequests().subscribe((res: any) => {
      console.log(res);
      this.usersList = res.result.requests;
    }, (err => {
      console.log(err);
    }
    ))
  }
   Accpet(id: string) {
    this.requestservice.acceptConnectionRequest(id).subscribe((res: any) => {
      console.log(res);
      this.getPendingRequests();
    }, (err => {
      console.log(err);
    })) 
  }
  Reject(id: string) {
    this.requestservice.rejectConnectionRequest(id).subscribe((res: any) => {
      console.log(res);
      this.getPendingRequests();
    }, (err => {
      console.log(err);
    }))
  }
}
