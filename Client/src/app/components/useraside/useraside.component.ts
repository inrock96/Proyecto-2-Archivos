import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { StorageService } from 'src/app/services/storage.service';
import { Usuario } from 'src/app/models/usuario';

@Component({
  selector: 'app-useraside',
  templateUrl: './useraside.component.html',
  styleUrls: ['./useraside.component.css']
})
export class UserasideComponent implements OnInit {

  constructor(private storageService:StorageService) {
    if(this.storageService.isAuthenticated()){
      this.usuario = this.storageService.getCurrentSession();
      this.usuario.pathFoto = 'http://192.168.1.26:3000/uploads/'+this.usuario.pathFoto;
      console.log(this.usuario);
    }
    
  }
  public usuario:Usuario;
  public nombreCompleto:String; 
  ngOnInit() {
    
  }
  

}
