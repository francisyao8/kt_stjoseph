import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CatechisteService {

  constructor(private http: HttpClient) { }

  create_catechiste_api_url= 'api/catechiste/CreateCatechiste'

  read_single_catechiste_api_url= 'api/catechiste/ReadSingleCatechiste'

  update_catechiste_api_url= 'api/catechiste/UpdateCatechiste'



  createCatechiste(formData: FormData) {
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: '' 
      })
    };
    return this.http.post(this.create_catechiste_api_url, formData, httpOptions);
  }
  
  
  readSingleCatechiste(body: any) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        Authorization: ''
      })
    };
    return this.http.post(this.read_single_catechiste_api_url, body, httpOptions);
  }
  


// updateCatechiste(formData: FormData){
//   const httpOptions = {
//     headers: new HttpHeaders({
//       'Content-Type':  'application/json',
//       Authorization: ''
//     })
//   };
//   return this.http.patch(this.update_catechiste_api_url, formData,httpOptions)
// }

updateCatechiste(formData: FormData){
 
  return this.http.patch(this.update_catechiste_api_url, formData)
}

}

