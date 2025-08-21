import { Cita } from '@/models/cita';
import { Medico } from '@/models/medico';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { map, Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CitaService {
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

  verCitas(id:number):Observable<any[]>{
    return this.http.get<any[]>(this.apiUrl+"citas/medico/"+id).pipe(map((d:any)=>d["data"]));
  }
  citaPorId(id:number):Observable<any>{
    return this.http.get<any>(this.apiUrl+"citas/"+id);
  }
  eliminarCita(id:number):Observable<any>{
    return this.http.delete(this.apiUrl+"citas/"+id);
  }
  citaActual(id:any):Observable<any>{
    return this.http.get<any>(this.apiUrl+"citas/usuario/"+id+"/actual");
  }
  actualizarHistorial(id:number, historial:AbstractControl):Observable<any>{
    console.log(historial.value);
    
    return this.http.put<any>(this.apiUrl+"citas/"+id+"/historial",historial.value);
  }

  
}
