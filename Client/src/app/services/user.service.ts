import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import {Usuario} from '../models/usuario'
import {Login} from '../models/login'
import { stringify } from 'querystring';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  API_URI = 'http://localhost:3000/api';
  usuarios:any=[];
  sesion = false;
  images;
  bandera:boolean;
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
        console.log(this.usuarios[0]);
        if((Array.isArray(this.usuarios)&&this.usuarios.length)){
          if(this.usuarios.length>0){
            console.log('si es array >0');
            this.bandera = true;
            
            }
          else {
            console.log('si es array pero no es mayor a 0');
            this.bandera = false;
          }
        }else{
          console.log('No es arreglo');
          this.bandera =  false;
        }
      },
      err=>{
        console.error(err);
        this.bandera=false;
      }
    )
    console.log('la bandera del verificado de usuario es='+this.bandera)
    return this.bandera;
  }
  getUser(pcorreo:String):Usuario{
    let user = new Usuario;
    this.getOneUser(pcorreo).subscribe(
      res=>{
        this.usuarios=res;
        if(Array.isArray(this.usuarios)&&this.usuarios.length){
          user.id=this.usuarios[0]['ID_USUARIO']
          user.nombre= this.usuarios[0]['NOMBRE'];
          user.apellidos= this.usuarios[0]['APELLIDOS'];
          user.correo= this.usuarios[0]['CORREO'];
          user.contrasena= this.usuarios[0]['CONTRASENA'];
          user.credito= this.usuarios[0]['CREDITO'];
          user.direccion= this.usuarios[0]['DIRECCION'];
          user.estado= this.usuarios[0]['ESTADO'];
          user.rol= this.usuarios[0]['ID_ROL'];
          user.pathFoto=this.usuarios[0]['FOTOGRAFIA'];
          user.ganancia = this.usuarios[0]['GANANCIA'];
        }else{
          return null;
        }
      }
    )
    return user;
  }
  updateContrasena(pcorreo:String,pcontrasena:String){
    var login = new Login();
    login.contrasena=pcontrasena;
    login.correo=pcorreo;
    return this.http.post(`${this.API_URI}/updateContrasena`,login).subscribe();
  }
}


