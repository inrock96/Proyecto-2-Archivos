import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import {MainpageService} from 'src/app/services/mainpage.service'
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  pagina: any=[];
  nombre: string;
  eslogan: string;
  pathLogo: string;
  pathVideo: string;
  mision: string;
  vision: string;
  acercaDe: string;
  constructor(public mainpageservice:MainpageService) { 
    
  }

  ngOnInit() {
    this.getMainPage();

  }

  getMainPage(){
    this.mainpageservice.getMainPage().
    subscribe(
      res=>{
        this.pagina=res;
        this.nombre=this.pagina[0]['NOMBRE'];
        this.eslogan=this.pagina[0]['ESLOGAN'];
        this.pathLogo='http://192.168.1.26:3000/uploads/'+this.pagina[0]['IMAGEN'];
        this.pathVideo='http://192.168.1.26:3000/uploads/'+encodeURIComponent(this.pagina[0]['VIDEO'].trim());
        console.log(this.pathVideo);
        this.vision=this.pagina[0]['VISION'];
        this.mision=this.pagina[0]['MISION'];
        this.acercaDe=this.pagina[0]['ABOUT'];
      },
      err=>console.error(err)
    );
  }
}
