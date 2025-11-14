import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class SecureStorageService {
  private secretKey = 'praveen@123'; 

  // Encrypt and store data
  setItem(key: string, value: any): void {
    const encrypted = CryptoJS.AES.encrypt(JSON.stringify(value), this.secretKey).toString();
    localStorage.setItem(key, encrypted);
  }

  // Decrypt and get data
  getItem(key: string): any {
    const data = localStorage.getItem(key);
    if (!data) return null;

    try {
      const bytes = CryptoJS.AES.decrypt(data, this.secretKey);
      const decrypted = bytes.toString(CryptoJS.enc.Utf8);
      return JSON.parse(decrypted);
    } catch (e) {
      console.error('Error decrypting data', e);
      return null;
    }
  }

  // Remove item
  removeItem(key: string): void {
    localStorage.removeItem(key);
  }

  // Clear all storage
  clear(): void {
    localStorage.clear();
  }
}
