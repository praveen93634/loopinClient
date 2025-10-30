import { inject, Injectable } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { ConfirmationResult, getAuth, RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
import { GoogleAuthProvider } from '@angular/fire/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class FirebaseAuth {
  private firebaseConfig = {
    apiKey: "AIzaSyAFt7ig7yETMJlixYGxz_yaA5euuZFoy70",
    authDomain: "loopin-a446c.firebaseapp.com",
    projectId: "loopin-a446c",
    storageBucket: "loopin-a446c.firebasestorage.app",
    messagingSenderId: "1048832349921",
    appId: "1:1048832349921:web:4709bd37e1281b997909a0",
    measurementId: "G-Q517M5V921"
  };

  private app = initializeApp(this.firebaseConfig);
  private auth = getAuth(this.app);
  private fireAuth=inject(AngularFireAuth);
  private router=inject(Router);
  private confirmationResult?: ConfirmationResult;
  // constructor(private fireAuth:AngularFireAuth,private router:Router) { }

  //Sigup in with Google
  googleSignin() {
    return this.fireAuth.signInWithPopup(new GoogleAuthProvider())
  }

} 
