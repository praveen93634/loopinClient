import { Component } from '@angular/core';
import { RequestService } from '../dashboard/service/request-service';
import { UserService } from '../dashboard/service/user-service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-requests',
  imports: [CommonModule],
  templateUrl: './requests.html',
  styleUrl: './requests.scss',
})
export class Requests {
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
        this.usersList = res.result;
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
