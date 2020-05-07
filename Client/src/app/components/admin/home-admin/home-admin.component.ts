import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/app/services/storage.service';
import { Usuario } from 'src/app/models/usuario';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-admin',
  templateUrl: './home-admin.component.html',
  styleUrls: ['./home-admin.component.css']
})
export class HomeAdminComponent implements OnInit {
  usuario:Usuario;
  constructor(private storageService:StorageService,
              private router:Router) { }

  ngOnInit() {
    if(this.storageService.isAuthenticated()){
      this.usuario = this.storageService.getCurrentSession();
      if(this.usuario.rol==2||this.usuario.rol==3){
        this.router.navigate(['home-user']);
      }
    }else{
      this.router.navigate(['accessdenied']);
    }
  }

}
