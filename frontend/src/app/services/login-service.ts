import { Sesion } from '@/models/sesion';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private ruta=environment.ruta+"login";
  private http=inject(HttpClient);
  private router=inject(Router);

  private session?:Sesion;
  constructor(){
    const json=localStorage.getItem('sesion');
    if(json){
      this.session=JSON.parse(json);
      
    }
  }

  login(body:AbstractControl):Observable<any>{
    console.log(body.value);
    
    return this.http.post<any>(this.ruta,body.value);
  }

  guardarToken(user:Sesion){
    this.session=user;
    const json=JSON.stringify(user);
    localStorage.setItem('sesion',json);
  }
  token():Sesion|undefined{
    console.log("xd");
    
    return this.session;
  }
  cerraSesion(){
    this.session=undefined;
    localStorage.removeItem("sesion");
    this.router.navigateByUrl("/auth/login");
  }
}
