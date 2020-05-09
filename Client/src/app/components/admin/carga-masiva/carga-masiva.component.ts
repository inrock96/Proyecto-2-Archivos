import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-carga-masiva',
  templateUrl: './carga-masiva.component.html',
  styleUrls: ['./carga-masiva.component.css']
})
export class CargaMasivaComponent implements OnInit {

  constructor(private router:Router) { 
    if(JSON.parse(sessionStorage.getItem('current'))[0]['ID_ROL']!==1){
      if(JSON.parse(sessionStorage.getItem('current'))[0]['ID_ROL']===2||JSON.parse(sessionStorage.getItem('current'))[0]['ID_ROL']===3){
        this.router.navigate(['home-user']);
      }else{
        console.log('entro a admin')
        this.router.navigate(['accessdenied']);
      }
    }
  }

  ngOnInit() {
  }

}
