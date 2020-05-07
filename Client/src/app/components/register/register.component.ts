import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario';
import { UserService } from 'src/app/services/user.service';
import {MainpageService} from 'src/app/services/mainpage.service'
import {Router} from '@angular/router'
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  user:Usuario;
  constructor(private userService:UserService,
              private router:Router,
              private mainPage:MainpageService) { 
    if(true /* Está loggeado*/){
      //this.router.navigate(['accesoDenegado']);
    }
  }
  patina:any=[];
  fileData:File = null;
  ngOnInit() {
    
  }

  processFile(fileInput:any){
    this.fileData=fileInput.target.files[0] as File;
  }
  registrar(nombre:String, apellidos:String,correo:String,contrasena:String,telefono:String,
    direccion:String,fecha:String,genero:String){
      const usuario = new Usuario();
      usuario.nombre = nombre;
      usuario.apellidos = apellidos;
      usuario.correo = correo;
      usuario.contrasena = contrasena;
      usuario.telefono = telefono;
      usuario.direccion = direccion;
      usuario.pathFoto = 'Alie_'+this.fileData.name.replace(/\s+/g, '');
      usuario.fecha = fecha;
      if(genero=='Masculino'){
        usuario.genero=1;
      }
      else if(genero=='Femenino')
        usuario.genero=2;
      else
        usuario.genero=3;
      usuario.rol=3;
      usuario.credito=this.randomCredit();
      //console.log(usuario);
      let bandera;
      this.userService.getOneUser(usuario.correo).subscribe(
        res=>{
          this.patina=res;
          if((Array.isArray(this.patina)&&this.patina.length)){
            if(this.patina.length>0){
              bandera = true;
              console.log('verdadero'+this.patina.length);
            }
            else {
              bandera = false;
              console.log('falso'+this.patina.length);
            }
          }else{
            bandera=false;
            console.log('no es array');
          }
        }
      )
      if(Array.isArray(this.patina)&&this.patina.length&&this.patina.length>0){
        this.router.navigate(['home'])
      }else{
        this.userService.addUser(usuario);
        this.mainPage.uploadFile(this.fileData);
        this.router.navigate(['login']);
      }
  }
  
  randomCredit():number{
    
    switch(Math.floor(Math.random() * 5) + 1){
      case 1:
        return 1000;
      case 2:
        return 5000
      case 3:
        return 10000
      case 4:
        return 25000
      case 5:
        return 50000
      default:
        return 1000;
    }
  }
}
