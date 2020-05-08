import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-crearproducto',
  templateUrl: './crearproducto.component.html',
  styleUrls: ['./crearproducto.component.css']
})
export class CrearproductoComponent implements OnInit {
  categorias : any = [];
  constructor(private categoriaService:CategoryService) { }

  ngOnInit() {
    this.categoriaService.getCategorias().subscribe(
      res=>{
        this.categorias=res;
      }
    );
  }

}
