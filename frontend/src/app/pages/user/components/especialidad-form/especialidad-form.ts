import { EspecialidadesService } from '@/services/especialidades-service';
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroupDirective, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { DatePicker } from 'primeng/datepicker';
import { FluidModule } from 'primeng/fluid';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-especialidad-form',
  imports: [FluidModule, SelectModule, InputTextModule, FormsModule, ButtonModule,
    ReactiveFormsModule,CommonModule,ToastModule],
  templateUrl: './especialidad-form.html',
  styleUrl: './especialidad-form.scss',
  providers:[MessageService]
  
})
export class EspecialidadForm implements OnInit,OnChanges{

  @Input() edit?:any;
  @Output() nuevoRegistro=new EventEmitter();
  @Output() registroEditado=new EventEmitter();

  private formBuilder=inject(FormBuilder);
  private especialidadService=inject(EspecialidadesService);
  private messageService=inject(MessageService);
  formGroup=this.formBuilder.nonNullable.group({
    nombre: ['',[Validators.required,Validators.maxLength(20)]],
    descripcion: '',
  });
  ngOnChanges(changes: SimpleChanges): void {
    if(changes['edit']){
      if(this.edit){
      
      this.formGroup.controls.nombre.setValue(this.edit.nombre!);
      this.formGroup.controls.descripcion.setValue(this.edit.descripcion!);
    console.log(this.formGroup.value);
    
    }
    }
  }
  ngOnInit(): void {
    
  }
  


  registrarEspecialidad(f:FormGroupDirective){
    console.log(this.formGroup.value);
    
    if(this.formGroup.valid){
    this.especialidadService.registrarEspecialidad(this.formGroup).subscribe({
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
    
    this.especialidadService.editarEspecialidad(this.edit.id,this.formGroup).subscribe({
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
