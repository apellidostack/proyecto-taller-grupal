import { Cita } from '@/models/cita';
import { Especialidad } from '@/models/especialidad';
import { Horario } from '@/models/horario';
import { CitaService } from '@/services/cita-service';
import { EspecialidadesService } from '@/services/especialidades-service';
import { HorariosService } from '@/services/horarios-service';
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
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-reservar-cita',
  imports: [InputTextModule,ButtonModule,SelectModule,TableModule,
    CommonModule,FormsModule,ToastModule,CardModule,ReactiveFormsModule,DatePickerModule],
  templateUrl: './reservar-cita.html',
  styleUrl: './reservar-cita.scss',
  providers: [MessageService]
})
export class ReservarCita{
  
}
