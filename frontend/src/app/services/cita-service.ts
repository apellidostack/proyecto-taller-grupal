import { Cita } from '@/models/cita';
import { Medico } from '@/models/medico';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CitaService {
  private medicos: any[] = [
    { id: 1, nombre: 'Dr. Pérez', especialidadId: 1 },
    { id: 2, nombre: 'Dra. López', especialidadId: 3 },
    { id: 3, nombre: 'Dr. García', especialidadId: 2 },
  ];

  getMedicosByEspecialidad(especialidadId: number): Observable<Medico[]> {
    return of(this.medicos.filter(m => m.especialidadId === especialidadId));
  }
  private apiUrl = environment.ruta;

  constructor(private http: HttpClient) {}


  getEspecialidades(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/especialidades`);
  }

  getMedicosPorEspecialidad(id: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/medicos/${id}`);
  }

  getHorariosPorMedico(id: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/horarios/${id}`);
  }

  reservarCita(cita: Cita): Observable<any> {
    return this.http.post(`${this.apiUrl}citas`, cita);
  }

  verCitas():Observable<any[]>{
    return this.http.get<any[]>(this.apiUrl+"citas");
  }
  citaPorId(id:number):Observable<any>{
    return this.http.get<any>(this.apiUrl+"citas/"+id);
  }
  
}
