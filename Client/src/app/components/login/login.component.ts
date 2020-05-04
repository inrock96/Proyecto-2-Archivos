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
  usuario:Usuario;
  log:Login;
  
  constructor(private router:Router, 
              private userService:UserService,
              private storageService:StorageService) { }
  ngOnInit() {
    if(this.storageService.isAuthenticated){
      this.router.navigate(['accessDenied']);
    }
  }

  login(correo:String,contrasena:string){
    this.log.correo=correo;
    this.log.contrasena = contrasena;
    if(this.userService.autenticarUsuario(this.log)){
      this.usuario = this.userService.getUser(this.log.correo);
      this.storageService.setCurrentSession(this.usuario)
      if(this.usuario.rol=1){
        this.router.navigate(['home-admin']);
      }else{
        this.router.navigate(['home-user']);
      }
    }else{
      this.router.navigate(['home']);
    }
  }

  

}
