import { Component } from '@angular/core';
import { UserForm } from "../components/user-form/user-form";
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-users',
  imports: [UserForm,DialogModule,ButtonModule],
  templateUrl: './users.html',
  styleUrl: './users.scss'
})
export class Users {
  display=false;
  open(){
    this.display=true;
  }
  close(){
    this.display=false;
  }
}
