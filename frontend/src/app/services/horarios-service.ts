import { Horario, HorarioConMedico, MedicoHorarios } from '@/models/horario';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HorariosService {
  private http =inject(HttpClient);
  private url=environment.ruta+"horarios";

  listarHorarios():Observable<any[]>{
    return this.http.get<any[]>(this.url);
  }
  registrarHorarios(horario:AbstractControl):Observable<any>{
    return this.http.post<any>(this.url,horario.value);
  }
  editarHorarios(id:number,horario:AbstractControl):Observable<any>{
    return this.http.put<any>(this.url+"/"+id,horario.value);
  }
  eliminarHorarios(id:number):Observable<any>{
    return this.http.delete<any>(this.url+"/"+id);
  }

  verHorarios(fecha:string,especialidad_id:number):Observable<any[]>{
    return this.http.get<MedicoHorarios[]>(`${this.url}/disponibles?fecha=${fecha}&especialidad_id=${especialidad_id}`)
    .pipe(
      map((medicos: MedicoHorarios[]) =>
        medicos.flatMap(medico =>
          medico.horarios.map(horario => ({
            id: horario.id,
            dia_semana: horario.dia_semana,
            tiempo_inicio: horario.tiempo_inicio,
            tiempo_final: horario.tiempo_final,
            duracion_cita: horario.duracion_cita,
            estado: horario.estado,
            medico_id: horario.medico_id,
            created_at: horario.created_at,
            updated_at: horario.updated_at,
            medicoNombre: medico.user.name,
            medicoReg: medico.reg_profesional
          }))
        )
      )
    );
  }

  horarioPoId(id:number):Observable<Horario>{
    return this.http.get<Horario>(`${this.url}/${id}`);
  }
}
