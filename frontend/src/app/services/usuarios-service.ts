import { User } from '@/models/user';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  private url = environment.ruta+"registrarusuario";
  private http = inject(HttpClient);
  registrarUsuario(user:User):Observable<any>{
    return this.http.post<any>(this.url,user);
  }

  verUsuarios(param?:string):Observable<any[]>{
    return this.http.get<any[]>(environment.ruta+"usuarios/buscar?busqueda="+param);
  }
  usuarioPorId(id:string):Observable<any>{
    return this.http.get<any>(environment.ruta+"usuarios/"+id);
  }
  editarUsuario(id:number,user:User):Observable<any[]>{
    return this.http.put<any[]>(environment.ruta+"usuarios/"+id,user);
  }
  eliminarUsuario(id:number):Observable<any[]>{
    return this.http.delete<any[]>(environment.ruta+"usuarios/"+id);
  }

  
  listarMedicos():Observable<any[]>{
    return this.http.get<any[]>(environment.ruta+"medicos");
  }
  
  
}
