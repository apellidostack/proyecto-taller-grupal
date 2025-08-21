import { Cita } from '@/models/cita';
import { Especialidad } from '@/models/especialidad';
import { Horario, MedicoHorarios } from '@/models/horario';
import { CitaService } from '@/services/cita-service';
import { EspecialidadesService } from '@/services/especialidades-service';
import { HorariosService } from '@/services/horarios-service';
import { LoginService } from '@/services/login-service';
import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DatePickerModule } from 'primeng/datepicker';
import { CalendarIcon } from 'primeng/icons';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { TableModule } from 'primeng/table';
import { TextareaModule } from 'primeng/textarea';
import { ToastModule } from 'primeng/toast';
import { InformacionCita } from "../informacion-cita/informacion-cita";
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-reservar-cita',
  imports: [InputTextModule, ButtonModule, SelectModule, TableModule,
    CommonModule, FormsModule, ToastModule, CardModule, ReactiveFormsModule,
    DatePickerModule, TextareaModule],
  templateUrl: './reservar-cita.html',
  styleUrl: './reservar-cita.scss',
  providers: [MessageService]
})
export class ReservarCita{
  idTipoUsuario:any;
  formCita!: FormGroup;
  horarios: MedicoHorarios[] = [];
  horarioSeleccionado!: any;

  constructor(
    private fb: FormBuilder,
    private horarioService: HorariosService,
    private especialidadService: EspecialidadesService,
    private citaService: CitaService,
    private loginService: LoginService,
    private messageService: MessageService,
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.idTipoUsuario=this.loginService.token()?.id;
    this.formCita = this.fb.group({
      fecha: [null, Validators.required],
      razon: ['', Validators.required],
      tiempo_inicio: ['', Validators.required],
      tiempo_final: ['',Validators.required],
      especialidad_id: [null,Validators.required],
      horario_id: ['',Validators.required],
      paciente_id: ['']
    });
    this.cargarEspecialidad();
    
    this.route.data.subscribe(({ citaActual }) => {
    if (citaActual) {
      // si existe cita, redirige
      this.router.navigate(['/pages/paciente/reporte'], { state: { cita: citaActual } });
    } 
    // sino, se queda en esta página, sin loop
  });
  }

  cargarHorarios(fecha:string,especialidad_id:number) {
    this.horarioService.verHorarios(fecha,especialidad_id).subscribe({
      next: (data) => {
        this.horarios = data;
        console.log(data);
        
      },
      error: (err) => this.messageService.add({severity:'error', summary:'Error', detail:'No se pudieron cargar los horarios'})
    });
  }

  especialidades:Especialidad[]=[];
  cargarEspecialidad(){
    this.especialidadService.listarEspecialidades('').subscribe(d=>{
      this.especialidades=d;
    })
  }

  seleccionado(){
    if(!this.formCita.get("fecha")?.value || !this.formCita.get("especialidad_id")?.value) return;
    const fechaISO = new Date(this.formCita.value.fecha);
    const fechaFormateada = fechaISO.toISOString().split('T')[0];
    console.log("seleccionado");
    
    this.cargarHorarios(fechaFormateada,this.formCita.get("especialidad_id")?.value);
  }

  

  onHorarioSeleccionado(horario: any) {
  this.horarioSeleccionado = horario;
  this.formCita.get("horario_id")?.setValue(horario.id);

  if (this.formCita.get('fecha')?.value) {
    // usa el inicio por defecto del horario
    const h_inicio=this.formCita.get('tiempo_inicio')?.value;
    this.calcularHoras(h_inicio);
    //this.formCita.get("tiempo_inicio")?.setValue('');
  }
  console.log(this.formCita.value);
}

// nuevo
onHoraInicioSeleccionada(horaInicio: Date) {
  if (!this.horarioSeleccionado) return;
  // ahora llamamos a calcularHoras pasándole la hora elegida
  this.calcularHoras(horaInicio);
  console.log(this.formCita.value);
}

calcularHoras(fechaInicioManual: Date) {
  const fecha = this.formCita.get('fecha')?.value;
  if (!fecha || !this.horarioSeleccionado?.duracion_cita || !fechaInicioManual) return;

  const duracion = this.horarioSeleccionado.duracion_cita.split(':').map(Number);

  // usar siempre la fecha/hora de inicio manual
  const fechaInicio = new Date(fechaInicioManual);

  // calcular fecha fin
  const fechaFin = new Date(fechaInicio);
  fechaFin.setHours(
    fechaInicio.getHours() + duracion[0],
    fechaInicio.getMinutes() + duracion[1]
  );

  // actualizar formulario
  this.formCita.patchValue({
    tiempo_inicio: fechaInicio.toTimeString().substring(0, 5),
    tiempo_final: fechaFin.toTimeString().substring(0, 5)
  });
}



  reservarCita() {
    const id= this.loginService.token()?.id;
    console.log(id);
    
    if (!this.formCita.valid || !this.horarioSeleccionado || !id) return;

  const fechaISO = new Date(this.formCita.value.fecha);
  const fechaFormateada = fechaISO.toISOString().split('T')[0];
    const cita: Cita = {
      fecha: fechaFormateada,
      tiempo_inicio: this.formCita.value.tiempo_inicio,
      tiempo_final: this.formCita.value.tiempo_final,
      razon: this.formCita.value.razon,
      horario_id: this.horarioSeleccionado.id,
      paciente_id: this.idTipoUsuario
    };
    
    this.citaService.reservarCita(cita).subscribe({
      next:d=>{
      console.log(d);
      
      this.messageService.add({severity:'success', summary:'Éxito', detail:'Cita reservada correctamente'});
    },
    error:e=>{
        this.messageService.add({severity:'error', summary:'Error', detail:e.error.message});

      }
    });

    console.log('Cita a reservar:', cita);
  }

  


}
