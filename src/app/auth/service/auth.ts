import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { SecureStorageService } from '../../shared/service/secure-storage-service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private url=environment.apiUrl+'/auth';
  constructor(private http:HttpClient,private stogrageservice:SecureStorageService){}
  public sendId(data:any){
    return this.http.post((this.url+'/sessionLogin'),data)
  }
  public login(data:any){
    return this.http.put((this.url+'/login'),data)
  }
  public sigup(data:any){
    return this.http.post((this.url+'/signup'),data)
  }
  public logout(){
    this.stogrageservice.clear();
  }
}
