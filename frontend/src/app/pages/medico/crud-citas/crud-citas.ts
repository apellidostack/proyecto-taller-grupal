import { CommonModule, DatePipe, registerLocaleData } from '@angular/common';
import { Component, LOCALE_ID, OnInit, signal, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MessageService, ConfirmationService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { RadioButtonModule } from 'primeng/radiobutton';
import { RatingModule } from 'primeng/rating';
import { RippleModule } from 'primeng/ripple';
import { SelectModule } from 'primeng/select';
import { Table, TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { TextareaModule } from 'primeng/textarea';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { Cita } from '@/models/cita';
import { CitaService } from '@/services/cita-service';
import { UsuariosService } from '@/services/usuarios-service';
import { LoginService } from '@/services/login-service';
import localeEs from '@angular/common/locales/es';

registerLocaleData(localeEs);
@Component({
  selector: 'app-crud-citas',
  imports: [CommonModule,
        TableModule,
        FormsModule,
        ButtonModule,
        RippleModule,
        ToastModule,
        ToolbarModule,
        RatingModule,
        InputTextModule,
        TextareaModule,
        SelectModule,
        RadioButtonModule,
        InputNumberModule,
        DialogModule,
        TagModule,
        InputIconModule,
        IconFieldModule,
        ConfirmDialogModule,
      ReactiveFormsModule,DatePipe],
  templateUrl: './crud-citas.html',
  styleUrl: './crud-citas.scss',
  providers: [MessageService, ConfirmationService,{ provide: LOCALE_ID, useValue: 'es-ES' }]
})
export class CrudCitas implements OnInit{
  
  idMedico:any;
 citas: any[] = [];
  selectedCita!: any | null;
  mostrarDialogo = false;
  nombrePaciente = '';
  paciente:any;

  @ViewChild('dt') dt!: Table;

  constructor(
    private citaService: CitaService,
    private usuariosService: UsuariosService,
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    private messageService: MessageService,

  ) {}

  formGroup!: FormGroup;

  ngOnInit() {
    this.idMedico=this.loginService.token()?.id;
    this.cargarCitas();
    this.formGroup=this.formBuilder.group({
      historial_medico:['',Validators.required],
    });
  }

  cargarCitas() {
    this.citaService.verCitas(this.idMedico).subscribe(d => {
      console.log(d);
      
      this.citas = d;
    });
  }

  verDetalle(cita: any) {
    this.selectedCita = cita;
    this.mostrarDialogo = true;
    this.citaService.citaPorId(cita.paciente_id).subscribe(d=>{
      this.nombrePaciente=d.paciente.user.name;
      this.paciente=d;
      this.formGroup.get("historial_medico")?.setValue(d.paciente.historial_medico);
      console.log(this.formGroup.get("historial_medico")?.value);
      
    });
  }

  editarHistorial(){
    if(this.paciente){
      this.citaService.actualizarHistorial(this.paciente.paciente.id,this.formGroup).subscribe({
        next:d=>{
          this.messageService.add({severity:'success', summary:'Éxito', detail:'Se actualizo el historial medico'});
          this.cerrarDialogo();

        },
        error: (err) => this.messageService.add({severity:'error', summary:'Error', detail:'No se pudieron cargar los horarios'})
      });

    }
  }

  cerrarDialogo() {
    this.mostrarDialogo = false;
    this.selectedCita = null;
    this.nombrePaciente = '';
  }
    

    
}
