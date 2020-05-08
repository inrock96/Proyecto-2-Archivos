import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/app/services/storage.service';
import { Usuario } from 'src/app/models/usuario';
import { Router } from '@angular/router';
import { parse } from 'querystring';

@Component({
  selector: 'app-home-admin',
  templateUrl: './home-admin.component.html',
  styleUrls: ['./home-admin.component.css']
})
export class HomeAdminComponent implements OnInit {
  usuario:Usuario;
  products:any=[];
  objeto:any;
  nombre:String;
  apellidos:String;
  correo:String;
  telefono:String;
  pathFoto:String;
  constructor(private storageService:StorageService,
              private router:Router) { 
                console.log(JSON.parse(sessionStorage.getItem('current'))[0]['ID_ROL'])
                if(JSON.parse(sessionStorage.getItem('current'))[0]['ID_ROL']===1){
                  this.usuario = this.storageService.getCurrentSession();
                  if(JSON.parse(sessionStorage.getItem('current'))[0]['ID_ROL']===2||JSON.parse(sessionStorage.getItem('current'))[0]['ID_ROL']===3){
                    this.router.navigate(['home-user']);
                  }
                }else{
                  console.log('entro a admin')
                  this.router.navigate(['accessdenied']);
                }
            }

  ngOnInit() {
    this.objeto = JSON.parse(sessionStorage.getItem('current'))[0];
    this.nombre=this.objeto['NOMBRE'];
    this.apellidos=this.objeto['APELLIDOS'];
    this.correo=this.objeto['CORREO'];
    this.pathFoto='http://192.168.1.26:3000/uploads/'+this.objeto['FOTOGRAFIA'];
    this.telefono=this.objeto['TELEFONO']
    console.log(this.pathFoto);
  }
  buscar(busqueda:String){
    
  }
  irAProfile(){
    this.router.navigate(['/profile']);
  }
}
