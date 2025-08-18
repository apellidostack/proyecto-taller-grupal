import { Especialidad } from '@/models/especialidad';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EspecialidadesService {
  private http=inject(HttpClient);
  private url=environment.ruta+"especialidades";
  listarEspecialidades():Observable<Especialidad[]>{
    return this.http.get<Especialidad[]>(this.url).pipe(map((d)=>d as Especialidad[]));
  }
}
