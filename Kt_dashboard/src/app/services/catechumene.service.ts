import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CatechumeneService {

  apiUrl = environment.apiUrl

  constructor(private http: HttpClient) { }




  createCatechumene(formData: FormData) {
    return this.http.post(this.apiUrl+"api/catechumene/CreateCatechumene", formData);
}


  readSingleCatechumene(body: any) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: ''
      })
    };
    return this.http.post(this.apiUrl+"api/catechumene/ReadAllCatechumene",body, httpOptions)
}

readAllCatechumene(body: any) {
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: ''
    }),
    body: JSON.stringify(body)
  };
  return this.http.get(this.apiUrl+"api/catechumene/ReadSingleCatechumene", httpOptions)
}

readCatechumeneBySectionAndLevel(body: any) {
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: ''
    })
  };
  return this.http.post(this.apiUrl+"api/catechumene/ReadCatechumeneBySectionAndLevel",body, httpOptions)
}

updateCatechumene(formData: FormData){
  return this.http.patch(this.apiUrl+"api/catechumene/UpdateCatechumene", formData)
}

deleteCatechumene(body: any) {
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      Authorization: ''
    }),
    body: JSON.stringify(body)
  };
  return this.http.delete(this.apiUrl+"api/catechumene/DeleteCatechumene", httpOptions);
}

}
