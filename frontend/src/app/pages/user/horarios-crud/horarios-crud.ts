import { HorariosService } from '@/services/horarios-service';
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
import { HorarioForm } from "../components/horario-form/horario-form";
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';

@Component({
  selector: 'app-horarios-crud',
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
    ConfirmDialogModule, HorarioForm],
  templateUrl: './horarios-crud.html',
  styleUrl: './horarios-crud.scss',
  providers: [MessageService, ConfirmationService]

})
export class HorariosCrud {

  private searchSubject = new Subject<string>();
  display=false;
  display2=false;

  horarios: any[] = [];         // aquí cargas el JSON del backend
selectedUsers: any[] = []; // para selección múltiple
  horario:any;
  constructor(
      private messageService: MessageService,
      private confirmationService: ConfirmationService,
      private horariosService: HorariosService
  ) {}
  exportCSV() {
      //this.dt.exportCSV();
  }
  ngOnInit() {
    this.cargarHorarios();
    this.searchSubject.pipe(
          debounceTime(400),
          distinctUntilChanged()
        ).subscribe(term => {
          this.cargarHorarios(term);
        });
  }

  cargarHorarios(param?:string){
    this.horariosService.listarHorarios(param??'').subscribe(d=>{
      console.log(d);
      
      this.horarios=d;
    })
  }

  onGlobalFilter(event: any) {
    const value = (event.target as HTMLInputElement).value;
    
    this.searchSubject.next(value);
  }

  open() {
    this.horario=null;
  this.display = true;
}

edit(esp: any) {
  console.log(esp);
  
  this.horario=esp;
  
  this.display2 = true;
  // puedes pasar "user" al <app-user-form> con @Input()
}

deleteE(h: any) {
  console.log(h.id);
  
  this.horariosService.eliminarHorarios(h.id).subscribe({
    next:d=>{
      this.messageService.add({severity:'success', summary:'Éxito', detail:'se elimino la especialidad'});
      this.cargarHorarios();
    },
    error:e=>{
        this.messageService.add({severity:'error', summary:'Error', detail:e.error.message});

    }
  })
}

deleteSelectedUsers() {
  // eliminar múltiples
}


}
