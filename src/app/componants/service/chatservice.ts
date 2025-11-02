import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class Chatservice {
  private url=environment.apiUrl+"/chat";
  constructor(private http:HttpClient){}
  getAllchat(id:any){
    return this.http.get(`${this.url}/get/${id}`)
  } 
}
