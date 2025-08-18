import { Horario } from '@/models/horario';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HorariosService {
  private http =inject(HttpClient);
  private url=environment.ruta+"horarios";

  verHorarios():Observable<Horario[]>{
    return this.http.get<Horario[]>(this.url);
  }

  horarioPoId(id:number):Observable<Horario>{
    return this.http.get<Horario>(`${this.url}/${id}`);
  }
}
