import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReportesService {
  private url = environment.ruta;
  private http = inject(HttpClient);

  boletaReserva(id:number):Observable<any>{
    return this.http.get<any>(this.url+"reportes/boleta/"+id);
  }
  reporteCitas(data:any):Observable<any>{
    return this.http.post<any>(this.url+"reportes/citas",data);
  }
}
