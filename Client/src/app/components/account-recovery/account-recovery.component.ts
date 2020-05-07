import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { MainpageService } from 'src/app/services/mainpage.service';
@Component({
  selector: 'app-account-recovery',
  templateUrl: './account-recovery.component.html',
  styleUrls: ['./account-recovery.component.css']
})


export class AccountRecoveryComponent implements OnInit {

  constructor(private userServ:UserService,private mainPageService:MainpageService) { }

  ngOnInit() {
  }
  enviarCorreo(email:String){
    let i=0;
    var caracteres = "abcdefghijkmnpqrtuvwxyzABCDEFGHIJKLMNPQRTUVWXYZ012346789";
    var contrasena = "";
    for (i=0; i<8; i++) contrasena += caracteres.charAt(Math.floor(Math.random()*caracteres.length));
    
    this.userServ.updateContrasena(email,contrasena);
    this.mainPageService.sendMail(email,contrasena);
  }
}
