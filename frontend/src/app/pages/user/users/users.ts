import { Component, signal, ViewChild } from '@angular/core';
import { UserForm } from "../components/user-form/user-form";
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
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
import { MessageService, ConfirmationService } from 'primeng/api';
import { UsuariosService } from '@/services/usuarios-service';

@Component({
  selector: 'app-users',
  imports: [UserForm,
    CommonModule,
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
        ConfirmDialogModule
  ],
  templateUrl: './users.html',
  styleUrl: './users.scss',
  providers: [MessageService, ConfirmationService]
})
export class Users {
  display=false;
  display2=false;

  users: any[] = [];         // aquí cargas el JSON del backend
selectedUsers: any[] = []; // para selección múltiple
  usuario:any;
  constructor(
      private messageService: MessageService,
      private confirmationService: ConfirmationService,
      private usuariosService: UsuariosService
  ) {}
  exportCSV() {
      //this.dt.exportCSV();
  }
  ngOnInit() {
    this.cargarUsuarios();
  }

  cargarUsuarios(){
    this.usuariosService.verUsuarios().subscribe(d=>{
      console.log(d);
      
      this.users=d;
    })
  }

  open() {
    this.usuario=null;
  this.display = true;
}

editUser(user: any) {
  this.usuario=user;
  
  this.display2 = true;
  // puedes pasar "user" al <app-user-form> con @Input()
}

deleteUser(user: any) {
  console.log(user.id);
  
  this.usuariosService.eliminarUsuario(user.id).subscribe({
    next:d=>{
      this.messageService.add({severity:'success', summary:'Éxito', detail:'se elimino el usuario'});
      this.cargarUsuarios();
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
