import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import {Usuario} from '../models/usuario'
import {Login} from '../models/login'

@Injectable({
  providedIn: 'root'
})
export class UserService {
  API_URI = 'http://localhost:3000/api';
  usuarios:any=[];
  sesion = false;
  images;
  constructor(private http:HttpClient) { }
  verifyUser(login:Login){
    return this.http.post(`${this.API_URI}/verifyUser`,login);
  }
  addUser(usuario:Usuario){
    return this.http.post(`${this.API_URI}/addUser`,usuario).subscribe(
      res=>console.log(res),
      err=>console.log(err)
    );
  }
  getOneUser(pcorreo:String){
    return this.http.post(`${this.API_URI}/getUser`,{correo:pcorreo});
  }
}


