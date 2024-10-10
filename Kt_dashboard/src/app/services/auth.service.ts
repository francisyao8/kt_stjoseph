import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
declare var $: any;


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  postlogin(body: any) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(this.apiUrl + 'api/auth/login', body, { headers });
  }

  GetConnectedAdmins(body: any) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: ''
      }),
      body: JSON.stringify(body)
    };
    return this.http.get(this.apiUrl + 'api/auth/GetConnectedAdmins', httpOptions);
  }

  isLoggedinUser() {
    return !!$.cookie('isLoggedIn');
  }
}

