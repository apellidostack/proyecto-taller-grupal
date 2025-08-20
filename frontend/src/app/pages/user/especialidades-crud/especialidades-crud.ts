import { EspecialidadesService } from '@/services/especialidades-service';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { RadioButtonModule } from 'primeng/radiobutton';
import { RatingModule } from 'primeng/rating';
import { RippleModule } from 'primeng/ripple';
import { SelectModule } from 'primeng/select';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { TextareaModule } from 'primeng/textarea';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { EspecialidadForm } from "../components/especialidad-form/especialidad-form";

@Component({
  selector: 'app-especialidades-crud',
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
    ConfirmDialogModule, EspecialidadForm],
  templateUrl: './especialidades-crud.html',
  styleUrl: './especialidades-crud.scss',
  providers: [MessageService, ConfirmationService]

})
export class EspecialidadesCrud {

  display=false;
  display2=false;

  especialidades: any[] = [];         // aquí cargas el JSON del backend
selectedUsers: any[] = []; // para selección múltiple
  especialidad:any;
  constructor(
      private messageService: MessageService,
      private confirmationService: ConfirmationService,
      private especialidadService: EspecialidadesService
  ) {}
  exportCSV() {
      //this.dt.exportCSV();
  }
  ngOnInit() {
    this.cargarEspecialidades();
  }

  cargarEspecialidades(){
    this.especialidadService.listarEspecialidades().subscribe(d=>{
      console.log(d);
      
      this.especialidades=d;
    })
  }

  open() {
    this.especialidad=null;
  this.display = true;
}

edit(esp: any) {
  console.log(esp);
  
  this.especialidad=esp;
  
  this.display2 = true;
  // puedes pasar "user" al <app-user-form> con @Input()
}

deleteE(esp: any) {
  console.log(esp.id);
  
  this.especialidadService.eliminarEspecialidad(esp.id).subscribe({
    next:d=>{
      this.messageService.add({severity:'success', summary:'Éxito', detail:'se elimino la especialidad'});
      this.cargarEspecialidades();
    },
    error:e=>{
        this.messageService.add({severity:'error', summary:'Error', detail:e.error.message});

    }
  })
}

deleteSelectedUsers() {
  // eliminar múltiples
}

onGlobalFilter(a:any,x:any){

}
}
