import { Component, OnInit, inject } from '@angular/core';
import { FirebaseAuth } from '../service/firebase-auth';
import { AuthenticationService } from '../service/auth';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ConfirmationResult, getAuth, RecaptchaVerifier } from 'firebase/auth';
import { Authentication } from '../model/auth.model';
import { Auth, GoogleAuthProvider, signInWithPopup } from '@angular/fire/auth';
import { NgZone } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { SecureStorageService } from '../../shared/service/secure-storage-service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './login.html',
  styleUrls: ['./login.scss']
})
export class Login implements OnInit {
  login: Authentication = new Authentication()
  showPassword?:Boolean
  constructor(private authService: AuthenticationService, private auth: Auth, private router: Router, private fireAuth: FirebaseAuth,private storageservice:SecureStorageService) { }

  ngOnInit(): void {

  }
  googleSignIn() {
    this.fireAuth.googleSignin().then((res) => {
      if (res.user) {
        res.user.getIdToken().then((token) => {
          console.log('Google sign-in successful:', token);
          this.authService.sendId({ token: token }).subscribe((response: any) => {
            console.log(response);
            localStorage.setItem('token', response.result.token)
            this.storageservice.setItem('user', response.result.user)
            this.router.navigate(['/home'])
          }, (err => {
            console.log(err);
          }))
        }).catch((err) => {
          console.error('Failed to get ID token:', err);
        });
      } else {
        console.log('Google sign-in successful: no user returned');
      }

    }).catch((error) => {
      console.error('Google sign-in failed:', error);
    });
  }
  onsubmit() {
    this.authService.login(this.login).subscribe((res: any) => {
      console.log(res);
      localStorage.setItem('token', res.result.token)
      this.storageservice.setItem('user', res.result.user)
      this.router.navigate(['/home'])
    }, (err => {
      console.log(err);
    }))
  }
   togglePassword(){
      this.showPassword = !this.showPassword;
   }
}
