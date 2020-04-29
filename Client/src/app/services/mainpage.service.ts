import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import {MainPage} from '../models/mainPage'
@Injectable({
  providedIn: 'root'
})
export class MainpageService {
  API_URI = 'http://localhost:3000'
  constructor(private http: HttpClient) { }
  getMainPage(){
    return this.http.get(`${this.API_URI}/home`);
  }
  getFile(nombre:String){
    return this.http.get(`${this.API_URI}/uploads/${nombre}`);
  }
  uploadFile(images:File){
    const formData = new FormData();
    formData.append('file',images);
    return this.http.post<any>(`${this.API_URI}/api/uploadFile`,formData).subscribe(
      (res)=>console.log(res),
      (err)=>console.error(err)
    )
  }
}
