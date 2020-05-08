import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {Sesion} from "../models/sesion";
import {Usuario} from "../models/usuario";
@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private sessionStorageService;
  private currentSession:Usuario=null;
  constructor(private router:Router) {
    this.sessionStorageService=sessionStorage;
    this.currentSession = this.loadSessionData();
  }
  setCurrentSession(sesion:Usuario){
    this.currentSession=sesion;
    this.sessionStorageService.setItem('currentUser',JSON.stringify(sesion));
  }
  removeCurrentSession():void{
    this.sessionStorageService.removeItem('currentUser');
  }
  loadSessionData():Usuario{
    var sessionStr=this.sessionStorageService.getItem('currentUser');
    return (sessionStr)?<Usuario>JSON.parse(sessionStr):null;
  }
  getCurrentSession():Usuario{
    var sessionStr = this.sessionStorageService.getItem('currentUser');
    return (sessionStr)?<Usuario>JSON.parse(sessionStr):null;
  }
  isAuthenticated(): boolean {
    return (this.getCurrentSession() != null) ? true : false;
  };

  logout(): void{
    this.removeCurrentSession();
    this.router.navigate(['/login']);
  }
}
