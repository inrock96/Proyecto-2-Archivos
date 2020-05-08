import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Producto } from '../models/producto';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  API_URI = 'http://192.168.1.26:3000/api';
  productos:any=[];
  constructor(private http:HttpClient) { }

  addProducto(producto:Producto){
    return this.http.post(`${this.API_URI}/addProducto`,producto);
  }
  busquedaProductos(busqueda:String){
    return this.http.post(`${this.API_URI}/busquedaProducto`,busqueda);
  }
}
