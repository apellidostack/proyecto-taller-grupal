import { EspecialidadesService } from '@/services/especialidades-service';
import { HorariosService } from '@/services/horarios-service';
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Input, Output, SimpleChanges } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroupDirective } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { FluidModule } from 'primeng/fluid';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-horario-form',
  imports: [FluidModule, SelectModule, InputTextModule, FormsModule, ButtonModule,
    ReactiveFormsModule,CommonModule,ToastModule],
  templateUrl: './horario-form.html',
  styleUrl: './horario-form.scss',
  providers:[MessageService]

})
export class HorarioForm {

  @Input() edit?:any;
  @Output() nuevoRegistro=new EventEmitter();
  @Output() registroEditado=new EventEmitter();

  private formBuilder=inject(FormBuilder);
  private horariosService=inject(HorariosService);
  private messageService=inject(MessageService);
  formGroup=this.formBuilder.nonNullable.group({
    dia_semana: '',
    tiempo_inicio: '',
    tiempo_final: '',
    duracion_cita: '',
    medico_id: '',
  });
  ngOnChanges(changes: SimpleChanges): void {
    if(changes['edit']){
      if(this.edit){
      
      this.formGroup.controls.dia_semana.setValue(this.edit.dia_semana!);
      this.formGroup.controls.tiempo_inicio.setValue(this.edit.tiempo_inicio!);
      this.formGroup.controls.tiempo_final.setValue(this.edit.tiempo_final!);
      this.formGroup.controls.duracion_cita.setValue(this.edit.duracion_cita!);
      this.formGroup.controls.medico_id.setValue(this.edit.medico_id!);
    console.log(this.formGroup.value);
    
    }
    }
  }
  ngOnInit(): void {
    
  }
  


  registrarEspecialidad(f:FormGroupDirective){
    console.log(this.formGroup.value);
    
    if(this.formGroup.valid){
    this.horariosService.registrarHorarios(this.formGroup).subscribe({
      next:(d)=>{
        console.log(d);
        f.resetForm();
        this.messageService.add({severity:'success', summary:'Éxito', detail:'Registro exitoso'});
        this.nuevoRegistro.emit();
        
      },
      error:e=>{
        this.messageService.add({severity:'error', summary:'Error', detail:e.error.message});

      }
    })
    }
  }

  editarEspecialidad(){
    if(this.formGroup.valid){
    
    this.horariosService.editarHorarios(this.edit.id,this.formGroup).subscribe({
      next:(d)=>{
        console.log(d);
        this.messageService.add({severity:'success', summary:'Éxito', detail:'Actualizado exitosamente'});
        this.registroEditado.emit();
      },
      error:e=>{
        this.messageService.add({severity:'error', summary:'Error', detail:e.error.message});

      }
    })
    }
  }

}
