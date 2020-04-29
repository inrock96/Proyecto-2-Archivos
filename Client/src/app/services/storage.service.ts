import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {Sesion} from "../models/sesion";
import {Usuario} from "../models/usuario";
@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private sessionStorageService;
  private currentSession:Sesion=null;
  constructor(private router:Router) {
    this.sessionStorageService=sessionStorage;
    this.currentSession = this.loadSessionData();
  }
  setCurrentSession(sesion:Sesion){
    this.currentSession=sesion;
    this.sessionStorageService.setItem('currentUser',JSON.stringify(sesion));
  }
  removeCurrentSession():void{
    this.sessionStorageService.removeItem('currentUser');
  }
  loadSessionData():Sesion{
    var sessionStr=this.sessionStorageService.getItem('currentUser');
    return (sessionStr)?<Sesion>JSON.parse(sessionStr):null;
  }
  getCurrentSession():Sesion{
    return this.currentSession;
  }
  getCurrentUser(): Usuario {
    var session: Sesion = this.getCurrentSession();
    return (session && session.usuario) ? session.usuario : null;
  };
  isAuthenticated(): boolean {
    return (this.getCurrentToken() != null) ? true : false;
  };
  getCurrentToken(): string {
    var session = this.getCurrentSession();
    return (session && session.token) ? session.token : null;
  };
  logout(): void{
    this.removeCurrentSession();
    this.router.navigate(['/login']);
  }

}
