import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import { Categoria } from 'src/app/models/categoria';

@Component({
  selector: 'app-crearcategoria',
  templateUrl: './crearcategoria.component.html',
  styleUrls: ['./crearcategoria.component.css']
})
export class CrearcategoriaComponent implements OnInit {
  categorias:any=[];
  constructor(private categoriaService:CategoryService) { }
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
      this.categoriaService.getCategoria(categoria.padre);
      categoria.padre = this.categoriaService.categoriaBusacada[0]['ID_CATEGORIA'];
    }
    this.categoriaService.agregarCategoria(categoria).subscribe();
    this.categoriaService.getCategorias().subscribe(
      res=>{
        this.categorias=res;
      }
    )
  }
}
