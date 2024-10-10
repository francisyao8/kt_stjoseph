import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CatechumeneService {

  constructor(private http: HttpClient) { }

  create_catechumene_api_url = 'api/catechumene/CreateCatechumene'

  read_single_catechumene_api_url = 'api/catechumene/ReadSingleCatechumene'

  update_catechumene_api_url = 'api/catechumene/UpdateCatechumene'

  validation_api_url = 'api/catechumene/validateRegistration'


  // createCatechumene(formData: FormData) {
  //   const httpOptions = {
  //     headers: new HttpHeaders({
  //       'Content-Type': 'application/json',
  //       Authorization: ''
  //     })
  //   };
  //   return this.http.post(this.create_catechumene_api_url,formData, httpOptions)
  // }

  createCatechumene(formData: FormData) {
    return this.http.post(this.create_catechumene_api_url, formData);
}


  readSingleCatechumene(body: any) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: ''
      })
    };
    return this.http.post(this.read_single_catechumene_api_url,body, httpOptions)
}


// updateCatechumene(formData: FormData){
//   const httpOptions = {
//     headers: new HttpHeaders({
//       'Content-Type': 'application/json',
//       Authorization: ''
//     })
//   };
//   return this.http.patch(this.update_catechumene_api_url, formData, httpOptions)
// }


updateCatechumene(formData: FormData){
  return this.http.patch(this.update_catechumene_api_url, formData)
}

validateRegistration(body: any) {
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: ''
    })
  };
  return this.http.post(this.validation_api_url,body, httpOptions)
}

}
