import { CommonModule } from '@angular/common';
import { Component, OnInit, signal, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
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
        ConfirmDialogModule],
  templateUrl: './crud-citas.html',
  styleUrl: './crud-citas.scss',
  providers: [MessageService, ConfirmationService]
})
export class CrudCitas implements OnInit{

 citas: any[] = [];
  selectedCita!: any | null;
  mostrarDialogo = false;
  nombrePaciente = '';

  @ViewChild('dt') dt!: Table;

  constructor(
    private citaService: CitaService,
    private usuariosService: UsuariosService
  ) {}

  ngOnInit() {
    this.cargarCitas();
  }

  cargarCitas() {
    this.citaService.verCitas().subscribe(d => {
      console.log(d);
      
      this.citas = d;
    });
  }

  verDetalle(cita: any) {
    this.selectedCita = cita;
    this.mostrarDialogo = true;
    this.citaService.citaPorId(cita.paciente_id).subscribe(d=>{
      this.nombrePaciente=d.paciente.user.name;
    })
  }

  cerrarDialogo() {
    this.mostrarDialogo = false;
    this.selectedCita = null;
    this.nombrePaciente = '';
  }
    

    
}
