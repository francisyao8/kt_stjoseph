import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LogsService {

  apiUrl = environment.apiUrl

  constructor(private http: HttpClient) { }


  get_logs(body: any) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        Authorization: ''
      }),
      body: JSON.stringify(body)
    };
    return this.http.get(this.apiUrl+"api/log/getlogs", httpOptions)
  }
}
