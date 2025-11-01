import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RequestService {
  private url = environment.apiUrl + '/request';
  constructor(private http: HttpClient) {
  }
  sendConnectionRequest(data: any) {
    return this.http.post(`${this.url}/send/connect/${data}`, {});
  }
  sendIgnoreRequest(data: any) {
    return this.http.post(`${this.url}/send/ignore/${data}`, {});
  }
  acceptConnectionRequest(data: any) {
    return this.http.post(`${this.url}/review/accepted/${data}`, {});
  }
  rejectConnectionRequest(data: any) {
    return this.http.post(`${this.url}/review/rejected/${data}`, {});
  }
}
