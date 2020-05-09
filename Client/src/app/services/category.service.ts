import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Categoria } from '../models/categoria';
import { resolve } from 'url';


@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  API_URI = 'http://192.168.1.26:3000/api';
  productos:any=[];
  categoriaBusacada:any=[];
  constructor(private http:HttpClient) { }
  agregarCategoria(categoria:Categoria){
    return this.http.post(`${this.API_URI}/addCategoria`,categoria);
  }
  getCategorias(){
    return this.http.get(`${this.API_URI}/getCategorias`);
  }
  getCategoria(nombre:String){
    const data = {
      nombre:nombre
    }
    //return this.http.post(`${this.API_URI}/getCategoria`,data).subscribe(
    //  res=>{
    //    this.categoriaBusacada=res;
    //  }
    //);
    return new Promise((resolve,reject)=>{
      this.http.post(`${this.API_URI}/getCategoria`,data).subscribe(
        res=>{
          this.categoriaBusacada=res;
          resolve();
        }
      )
    });

  }
}
