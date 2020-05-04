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

  autenticarUsuario(login:Login):boolean{
    this.verifyUser(login).subscribe(
      res=>{
        this.usuarios=res;
        if((Array.isArray(this.usuarios)&&this.usuarios.length)){
          if(this.usuarios.length>0){
            return  true;
            }
          else {
            return false;
          }
        }else{
          return false;
        }
      }
    )
    return false;
  }
  getUser(pcorreo:String):Usuario{
    let user = new Usuario;
    this.getOneUser(pcorreo).subscribe(
      res=>{
        this.usuarios=res;
        user.id=this.usuarios[0]['ID_USUARIO']
        user.nombre= this.usuarios[0]['NOMBRE'];
        user.apellidos= this.usuarios[0]['APELLIDOS'];
        user.correo= this.usuarios[0]['CORREO'];
        user.contrasena= this.usuarios[0]['CONTRASENA'];
        user.credito= this.usuarios[0]['CREDITO'];
        user.direccion= this.usuarios[0]['DIRECCION'];
        user.estado= this.usuarios[0]['ESTADO'];
        user.rol= this.usuarios[0]['ROL'];
        user.pathFoto=this.usuarios[0]['FOTOGRAFIA'];
        user.ganancia = this.usuarios[0]['GANANCIA'];
      }
    )
    return user;
  }
}


