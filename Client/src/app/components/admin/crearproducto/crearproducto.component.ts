import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-crearproducto',
  templateUrl: './crearproducto.component.html',
  styleUrls: ['./crearproducto.component.css']
})
export class CrearproductoComponent implements OnInit {
  categorias : any = [];
  constructor(private categoriaService:CategoryService,
              private router:Router) {
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
    this.categoriaService.getCategorias().subscribe(
      res=>{
        this.categorias=res;
      }
    );
  }

}
