import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
    private url=environment.apiUrl+'/user';
  constructor(private http:HttpClient) { }
  getAllUsers(data:any){
    return this.http.put((this.url+'/getAllUsers'),data);
  }
  getPendingRequests(){
    return this.http.get((this.url+'/requests/received'));
  }
  getUserById(id:string){
    return this.http.get((`this.url+/getUser/${id}`));
  }
  updateUser(data:any){
    return this.http.put((this.url+'/updateUser'),data);
  }
}
