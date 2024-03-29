import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {UserService} from 'src/app/services/user.service'
import { StorageService } from 'src/app/services/storage.service';
import { Usuario } from 'src/app/models/usuario';
import { Login } from 'src/app/models/login';
import { Sesion } from 'src/app/models/sesion';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  usuario:any=[];
  log:Login;
  
  constructor(private router:Router, 
              private userService:UserService,
              private storageService:StorageService) { }
  ngOnInit() {
    if(this.storageService.isAuthenticated()){
      this.router.navigate(['accessdenied']);
    }
  }

  login(correo:string,contrasena:string){
    const login = new Login();
    login.correo = correo;
    login.contrasena = contrasena;
    console.log(login);
    sessionStorage.setItem('current',JSON.stringify(this.userService.getUser(login.correo)));
    console.log(JSON.parse(sessionStorage.getItem('current')))
    if(this.userService.autenticarUsuario(login)){
      console.log('cocos feo');
      this.usuario = this.userService.getUser(login.correo);
      console.log(this.usuario);
      //this.storageService.setCurrentSession(this.usuario);
      //console.log(JSON.parse(sessionStorage.getItem('current')));
      if( JSON.parse(sessionStorage.getItem('current'))['ID_ROL'] !== 1){
        this.router.navigate(['home-admin']);
      }else{
        this.router.navigate(['home-user']);
      }
    }else{
      this.router.navigate(['home']);
    }
  }

  

}
