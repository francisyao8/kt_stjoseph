import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class UsersService {

  apiUrl = environment.apiUrl

  constructor(private http: HttpClient) { }




cretaUser(body: any) {
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      Authorization: ''
    })
  };
  return this.http.post(this.apiUrl+"api/user/CreateUser", body, httpOptions)
}

readAllUsers() {
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      Authorization: ''
    })
  };
  return this.http.get(this.apiUrl+"api/user/ReadAllUsers", httpOptions)
}

readSingleUser(body: any) {
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      Authorization: ''
    })
  };
  return this.http.post(this.apiUrl+"api/user/ReadSingleUser", body, httpOptions)
}
updateUser(body:any) {
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      Authorization: ''
    })
  };
  return this.http.patch(this.apiUrl+"api/user/UpdateUser", body, httpOptions)
}

deleteUser(body: any) {
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      Authorization: ''
    }),
    body: JSON.stringify(body)
  };
  return this.http.delete(this.apiUrl+"api/user/DeleteUser", httpOptions);
}


}
