import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/app/services/storage.service';
import { Usuario } from 'src/app/models/usuario';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { ProductComponent } from '../../product/product.component';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-home-user',
  templateUrl: './home-user.component.html',
  styleUrls: ['./home-user.component.css']
})
export class HomeUserComponent implements OnInit {
  products:any=[];
  usuario:Usuario;
  nombre:String;
  apellidos:String;
  correo:String;
  telefono:String;
  constructor(private storageService:StorageService,
              private router:Router,
              private productService:ProductService) {
                if(this.storageService.isAuthenticated()){
                  this.usuario = this.storageService.getCurrentSession();
                  if(this.usuario.rol==1){
                    this.router.navigate(['home-admin'])
                  }
                }else{
                  console.log('entro a user')
                  this.router.navigate(['accessdenied'])
                }
               }

  ngOnInit() {
    
  }
  buscarProductos(busqueda:String){
    
  }
}
