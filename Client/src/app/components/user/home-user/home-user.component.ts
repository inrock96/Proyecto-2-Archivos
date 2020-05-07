import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/app/services/storage.service';
import { Usuario } from 'src/app/models/usuario';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-user',
  templateUrl: './home-user.component.html',
  styleUrls: ['./home-user.component.css']
})
export class HomeUserComponent implements OnInit {
  usuario:Usuario;
  nombre:String;
  apellidos:String;
  correo:String;
  telefono:String;
  constructor(private storageService:StorageService,
              private router:Router) { }

  ngOnInit() {
    if(this.storageService.isAuthenticated()){
      this.usuario = this.storageService.getCurrentSession();
      if(this.usuario.rol==1){
        this.router.navigate(['home-admin'])
      }
    }else{
      this.router.navigate(['accessdenied'])
    }
  }
}
