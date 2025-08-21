import { LoginService } from '@/services/login-service';
import { ReportesService } from '@/services/reportes-service';
import { UsuariosService } from '@/services/usuarios-service';
import { DatePipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { DatePickerModule } from 'primeng/datepicker';
import { FluidModule } from 'primeng/fluid';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-reporte-citas',
  imports: [DatePickerModule,ButtonModule,ReactiveFormsModule,FluidModule,TableModule,DatePipe,ToastModule],
  templateUrl: './reporte-citas.html',
  styleUrl: './reporte-citas.scss',
  providers:[MessageService]
})
export class ReporteCitas implements OnInit{
  private formBuilder=inject(FormBuilder);
  private usuarioService=inject(UsuariosService);
  private reportesService=inject(ReportesService);
  private loginService=inject(LoginService);
  idMed:any;
  ngOnInit(): void {
    const id=this.loginService.token()?.id;
    
    this.buscarIdMed(id);
  }
  formGroup=this.formBuilder.group({
    fecha_inicio:"",
    fecha_fin:"",
    medico_id:"",
  });
  
  listaCitas:any[]=[];
  reportes(){
    if(!this.formGroup.valid){return;}
    const fechaInicioISO = new Date(this.formGroup.value.fecha_inicio??"");
    const fechaInicioFormateada = fechaInicioISO.toISOString().split('T')[0];
    const fechaFinISO = new Date(this.formGroup.value.fecha_fin??"");
    const fechaFinFormateada = fechaFinISO.toISOString().split('T')[0];
    const ob={
      fecha_inicio:fechaInicioFormateada,
      fecha_fin:fechaFinFormateada,
      medico_id:this.idMed,
    }
    this.reportesService.reporteCitas(ob).subscribe({
      next:d=>{
        console.log(d.citas);
        
        this.listaCitas=d.citas;
      }
    })
  }

  buscarIdMed(id:any){
    //console.log(id);
    
    this.usuarioService.usuarioPorId(id).subscribe(d=>{
      this.idMed=d.perfil_medico.id;
      console.log(d);
      
    });
  }

}
