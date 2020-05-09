import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-cproductousuario',
  templateUrl: './cproductousuario.component.html',
  styleUrls: ['./cproductousuario.component.css']
})
export class CproductousuarioComponent implements OnInit {
  categorias:any = [];
  constructor(private categoriaService:CategoryService) { }

  ngOnInit() {
    this.categoriaService.getCategorias().subscribe(
      res=>{
        this.categorias=res;
      }
    );
  }

}
