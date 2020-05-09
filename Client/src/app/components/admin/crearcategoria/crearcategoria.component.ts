import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import { Categoria } from 'src/app/models/categoria';
import { Router } from '@angular/router';

@Component({
  selector: 'app-crearcategoria',
  templateUrl: './crearcategoria.component.html',
  styleUrls: ['./crearcategoria.component.css']
})
export class CrearcategoriaComponent implements OnInit {
  categorias:any=[];
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
  categoriaUnic:any=[]
  ngOnInit() {
    this.categoriaService.getCategorias().subscribe(
      res=>{
        this.categorias=res;
      }
    )
  }
  
  agregarCategoria(padre:String,nombre:String,descripcion:String){
    
    var categoria = new Categoria();
    categoria.descripcion=descripcion;
    categoria.nombre = nombre;
    categoria.padre = padre;
    if(categoria.nombre=="null"){
      
    }else{
      this.categoriaService.getCategoria(categoria.padre).then(
        ()=>{
          categoria.padre = this.categoriaService.categoriaBusacada[0]['ID_CATEGORIA'];
          console.log(categoria.padre);
          this.categoriaService.agregarCategoria(categoria).subscribe();
          this.categoriaService.getCategorias().subscribe(
            res=>{
              this.categorias=res;
            }
          )
        }
      );
    }
    
  }
}
