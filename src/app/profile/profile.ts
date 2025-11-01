import { Component, OnInit } from '@angular/core';
import { SecureStorageService } from '../shared/service/secure-storage-service';
import { CommonModule, DatePipe } from '@angular/common';
import { UserService } from '../dashboard/service/user-service';
import { User } from './model/user.model';
import { FormsModule } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-profile',
  imports: [CommonModule, FormsModule],
  templateUrl: './profile.html',
  styleUrl: './profile.scss',
})
export class Profile implements OnInit {
  user: any;
  userId:any;
  updateuser: User = new User()
  image = 'assets/images/blank-profile-picture-973460_1280.webp'
  constructor(private stogrageservice: SecureStorageService, private userservice: UserService, private modelservice: NgbModal) {
    this.userId = this.stogrageservice.getItem('user');
    console.log(this.userId._id);
  }
  ngOnInit(): void {
    this.getSingleUser()
  }
  
  editprofile(model: any) {
    this.modelservice.open(model, { size: 'lg' });
    this.getSingleUser()
  }
  updateProfile() {
      this.userservice.updateUser(this.updateuser).subscribe((res:any)=>{
      console.log(res);
      this.modelservice.dismissAll()
     this.getSingleUser()
    },(err=>{
      console.log(err);
    } ))
  }
  getSingleUser(){
    this.userservice.getUserById().subscribe((res:any)=>{
      console.log(res);
      this.user=res.result;
      this.updateuser=res.result;
    },(err=>{
      console.log(err);
    } ))
  }
}
