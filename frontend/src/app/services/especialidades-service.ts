import { Especialidad } from '@/models/especialidad';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EspecialidadesService {
  private http=inject(HttpClient);
  private url=environment.ruta+"especialidades";
  listarEspecialidades(param?:string):Observable<Especialidad[]>{
    return this.http.get<Especialidad[]>(this.url+"/buscar?busqueda="+param).pipe(map((d)=>d as Especialidad[]));
  }
  registrarEspecialidad(especialidad:AbstractControl):Observable<Especialidad>{
    return this.http.post<Especialidad>(this.url,especialidad.value).pipe(map((d)=>d as Especialidad));
  }
  editarEspecialidad(id:number,especialidad:AbstractControl):Observable<Especialidad>{
    return this.http.put<Especialidad>(this.url+"/"+id,especialidad.value).pipe(map((d)=>d as Especialidad));
  }
  eliminarEspecialidad(id:number):Observable<any>{
    return this.http.delete<any>(this.url+"/"+id);
  }
}
