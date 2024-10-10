import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CatechisteService {

  apiUrl = environment.apiUrl

  constructor(private http: HttpClient) { }




  createCatechiste(formData: FormData) {
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: ''
      })
    };
    return this.http.post(this.apiUrl+"api/catechiste/CreateCatechiste", formData, httpOptions);
  }

  readSingleCatechiste(body: any) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        Authorization: ''
      })
    };
    return this.http.post(this.apiUrl+"api/catechiste/ReadSingleCatechiste", body, httpOptions);
  }

  readAllCatechiste(body: any) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        Authorization: ''
      })
    };
    return this.http.post(this.apiUrl+"api/catechiste/ReadAllCatchiste",body, httpOptions);
  }

  readCatechisteBysection(body: any) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        Authorization: ''
      })
    };
    return this.http.post(this.apiUrl+"api/catechiste/ReadCatechisteBysection", body, httpOptions);
  }


  updateCatechiste(formData: FormData){

    return this.http.patch(this.apiUrl+"api/catechiste/UpdateCatechiste", formData)
  }

deleteCatechiste(body: any) {
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      Authorization: ''
    }),
    body: JSON.stringify(body)
  };
  return this.http.delete(this.apiUrl+"api/catechiste/DeleteCatechiste", httpOptions);
}
}

