import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private url=environment.apiUrl+'/auth';
  constructor(private http:HttpClient){}
  public sendId(data:any){
    return this.http.post((this.url+'/sessionLogin'),data)
  }
  public login(data:any){
    return this.http.put((this.url+'/login'),data)
  }
  public sigup(data:any){
    return this.http.post((this.url+'/signup'),data)
  }
}
