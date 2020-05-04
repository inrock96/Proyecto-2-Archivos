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
    return this.currentSession;
  }
  getCurrentUser(): Usuario {
    var session: Usuario = this.getCurrentSession();
    return (session) ? session : null;
  };
  isAuthenticated(): boolean {
    return (this.getCurrentToken() != null||this.getCurrentToken() != '0') ? true : false;
  };
  getCurrentToken(): string {
    var session = this.getCurrentSession();
    return (session) ? session.rol.toString() : null;
  };
  logout(): void{
    this.removeCurrentSession();
    this.router.navigate(['/login']);
  }
}
