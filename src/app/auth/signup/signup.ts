import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { FormsModule } from '@angular/forms';
import { Authentication } from '../model/auth.model';
import { AuthenticationService } from '../service/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  imports: [FormsModule, CommonModule],
  templateUrl: './signup.html',
  styleUrl: './signup.scss',
})
export class Signup {
  user:Authentication=new Authentication()
  cPassword:string=''
   constructor(private authService:AuthenticationService,private router:Router) {}

  onSignup() {
    this.authService.sigup(this.user).subscribe((res:any)=>{  
      console.log(res);
      this.router.navigate(['/login'])
    },(err=>{
      console.log(err);
    }) )
  }
}
